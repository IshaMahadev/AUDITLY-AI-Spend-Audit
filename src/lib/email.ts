/**
 * Email stub — logs to console instead of sending.
 * In production, replace with Resend, SendGrid, or AWS SES.
 */
export async function sendAuditConfirmationEmail(
  email: string,
  audit: { id: string; totalMonthlySavings: number },
  companyName?: string
): Promise<void> {
  console.log(
    `[Email Stub] Would send audit confirmation to ${email}` +
      (companyName ? ` (${companyName})` : "")
  );
  console.log(
    `[Email Stub] Audit ID: ${audit.id}, Savings: $${audit.totalMonthlySavings}/mo`
  );
}
