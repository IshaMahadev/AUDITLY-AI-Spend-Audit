import { NextResponse } from 'next/server';
import { AuditReport } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const { report } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      // Graceful fallback
      return NextResponse.json({ 
        summary: `Based on your audit, you have a potential savings of $${report.totalMonthlySavings}/month. Our analysis shows opportunities to optimize your current AI stack by switching redundant subscriptions and downgrading oversized plans.` 
      });
    }

    const prompt = `You are a financial analyst specializing in SaaS spend. Review the following AI tool audit report and write a brutal, concise, ~100-word personalized summary of their spend. Be direct. Do not use corporate speak.
    
    Total Savings: $${report.totalMonthlySavings}/mo
    Details: ${JSON.stringify(report.results.map((r: any) => ({tool: r.subscription.toolName, action: r.recommendedAction, savings: r.monthlySavings})))}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 150,
        messages: [{ role: "user", content: prompt }]
      })
    });

    if (!response.ok) {
        throw new Error("Anthropic API failed");
    }

    const data = await response.json();
    return NextResponse.json({ summary: data.content[0].text });

  } catch (e) {
    console.error("Summary Generation Error", e);
    // Graceful fallback
    return NextResponse.json({ 
        summary: `Based on your audit, you have a potential savings of $... Our analysis shows opportunities to optimize your current AI stack by switching redundant subscriptions and downgrading oversized plans.` 
    });
  }
}
