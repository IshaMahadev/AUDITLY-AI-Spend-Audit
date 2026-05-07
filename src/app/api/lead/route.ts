import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { saveLead, getAudit } from "@/lib/supabase";
import { sendAuditConfirmationEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/ratelimit";

const schema = z.object({
  auditId: z.string().min(1).max(50),
  email: z.string().email().max(300),
  companyName: z.string().max(200).optional(),
  role: z.string().max(100).optional(),
  teamSize: z.number().int().min(1).max(100_000).optional(),
  // Honeypot field — must be empty
  website: z.string().max(0).optional(),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (!checkRateLimit(`lead:${ip}`, 3, 60_000)) {
    return NextResponse.json(
      { error: "Too many requests." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // Honeypot check — bots fill the website field
  if (parsed.data.website && parsed.data.website.length > 0) {
    // Silent accept — don't tell bots they've been caught
    return NextResponse.json({ ok: true });
  }

  const { auditId, email, companyName, role, teamSize } = parsed.data;

  // Rate-limit per email too
  if (!checkRateLimit(`lead:email:${email}`, 2, 3_600_000)) {
    return NextResponse.json(
      { error: "This email has already been submitted." },
      { status: 429 }
    );
  }

  try {
    await saveLead({ auditId, email, companyName, role, teamSize });
  } catch (err: unknown) {
    console.error("Lead save failed:", err);
    return NextResponse.json(
      { error: "Failed to save lead." },
      { status: 500 }
    );
  }

  // Fire-and-forget email + audit update
  try {
    const audit = await getAudit(auditId);
    if (audit) {
      await sendAuditConfirmationEmail(email, audit, companyName);
    }
  } catch (err: unknown) {
    console.error("Email send failed:", err);
    // Non-fatal — lead is saved, just email didn't send
  }

  return NextResponse.json({ ok: true });
}
