import { UserInputData, ToolAuditResult, AuditReport } from './types';

export function runAudit(data: UserInputData): AuditReport {
  const results: ToolAuditResult[] = [];
  let totalMonthlySavings = 0;

  for (const sub of data.subscriptions) {
    let savings = 0;
    let action = "Keep as is";
    let reason = "Your plan is optimal for your usage.";

    // Logic for Cursor
    if (sub.toolName === 'Cursor') {
      if (data.primaryUseCase !== 'coding') {
        action = "Switch to Claude Pro or ChatGPT Plus";
        savings = sub.spend - (20 * sub.seats);
        reason = "Cursor is optimized for coding. For general usage, a standard LLM chat interface is more cost-effective.";
      } else if (sub.plan === 'Business' && data.teamSize < 3) {
        action = "Downgrade to Cursor Pro";
        savings = sub.spend - (20 * sub.seats);
        reason = "Cursor Business requires centralized billing, but for small teams (<3), individual Pro plans offer the same features for half the price.";
      }
    }

    // Logic for Copilot
    if (sub.toolName === 'GitHub Copilot') {
      if (data.primaryUseCase === 'coding') {
        action = "Switch to Cursor Pro";
        savings = sub.spend - (20 * sub.seats);
        reason = "Cursor Pro provides superior code-generation capabilities (Claude 3.5 Sonnet) at a similar price point, often eliminating the need for a separate ChatGPT subscription.";
      }
    }

    // Logic for Claude
    if (sub.toolName === 'Claude') {
      if (sub.plan === 'Team' && data.teamSize < 5) {
        action = "Downgrade to Claude Pro";
        // Team is $30/user, Pro is $20/user
        savings = sub.spend - (20 * sub.seats);
        reason = "Claude Team has a minimum seat requirement and higher cost per user. For small teams, individual Pro accounts save 33%.";
      } else if (sub.plan === 'API direct' && sub.spend > 100 && data.teamSize <= 2) {
        action = "Switch to Claude Pro";
        savings = sub.spend - (20 * sub.seats);
        reason = "High API spend for a small team indicates power-usage that would be cheaper on a flat-rate Pro subscription.";
      }
    }

    // Logic for ChatGPT
    if (sub.toolName === 'ChatGPT') {
      if (sub.plan === 'Team' && data.teamSize < 2) {
        action = "Downgrade to ChatGPT Plus";
        savings = sub.spend - 20;
        reason = "ChatGPT Team is $30/user/month. Solo users get the exact same model access on the $20 Plus plan.";
      } else if (sub.plan === 'Enterprise') {
        action = "Evaluate ChatGPT Team or API";
        savings = sub.spend * 0.4; // Estimate 40% savings
        reason = "Enterprise has a massive premium for compliance. If you don't have strict HIPAA/SOC2 requirements, Team is significantly cheaper.";
      }
    }

    // Default catching if they are paying retail for something Credex can discount
    if (savings <= 0 && sub.spend > 1000) {
        action = "Procure via Credex Credits";
        savings = sub.spend * 0.15; // 15% discount assumption
        reason = "You are paying retail prices for high-volume usage. Credex can source the exact same credits at a substantial discount.";
    }

    if (savings < 0) savings = 0;
    
    totalMonthlySavings += savings;

    results.push({
      subscription: sub,
      recommendedAction: action,
      monthlySavings: savings,
      reason
    });
  }

  const isOptimal = totalMonthlySavings < 50;

  return {
    results,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    isOptimal
  };
}
