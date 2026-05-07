import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { updateAuditSummary } from "@/lib/supabase";
import { checkRateLimit } from "@/lib/ratelimit";

const schema = z.object({
  auditId: z.string().min(1).max(50),
  totalMonthlySavings: z.number(),
  totalMonthlySpend: z.number(),
  useCase: z.enum(["coding", "writing", "data", "research", "mixed"]),
  teamSize: z.number(),
  recommendations: z.array(
    z.object({
      toolName: z.string(),
      recommendation: z.string(),
      monthlySavings: z.number(),
      reasoning: z.string(),
    })
  ),
});

/**
 * Build a templated summary when no AI provider is available.
 * This produces a perfectly usable CFO-style summary without any API costs.
 */
function buildTemplatedSummary(
  totalMonthlySavings: number,
  totalMonthlySpend: number,
  useCase: string,
  teamSize: number
): string {
  const savingsPct =
    totalMonthlySpend > 0
      ? Math.round((totalMonthlySavings / totalMonthlySpend) * 100)
      : 0;

  if (totalMonthlySavings < 50) {
    return `Your AI stack is already well-optimised. You're spending $${totalMonthlySpend}/mo across ${teamSize} team member${teamSize > 1 ? "s" : ""} primarily for ${useCase} work — and the tooling matches those needs. The only marginal gains available are minor plan-level tweaks. Keep an eye on usage as your team grows; the calculus changes quickly at 5× current scale.`;
  }

  return `Your team of ${teamSize} is spending $${totalMonthlySpend}/mo on AI tools for ${useCase} work — ${savingsPct > 0 ? `${savingsPct}% of that` : "a meaningful portion"} ($${totalMonthlySavings}/mo, $${totalMonthlySavings * 12}/yr) could be recaptured without changing what you ship. The key findings: plan mismatches and tool overlap are the two biggest levers. Acting on these recommendations this week recovers budget you could redirect into infrastructure, headcount, or simply better AI tooling for the use cases that actually matter to your roadmap.`;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (!checkRateLimit(`summary:${ip}`, 5, 60_000)) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const {
    auditId,
    totalMonthlySavings,
    totalMonthlySpend,
    useCase,
    teamSize,
  } = parsed.data;

  // Use templated summary (no API key required).
  // To enable AI-generated summaries, install @anthropic-ai/sdk,
  // set ANTHROPIC_API_KEY in .env, and add the API call here.
  const summary = buildTemplatedSummary(
    totalMonthlySavings,
    totalMonthlySpend,
    useCase,
    teamSize
  );

  // Persist async — don't block response
  updateAuditSummary(auditId, summary).catch((err: unknown) =>
    console.error("Failed to persist summary:", err)
  );

  return NextResponse.json({ summary });
}
