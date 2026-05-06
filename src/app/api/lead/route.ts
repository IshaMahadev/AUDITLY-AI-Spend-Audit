import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, companyName, role, teamSize, reportData, honeypot } = await req.json();

    // Basic abuse protection: Honeypot field
    if (honeypot) {
      // If the hidden field is filled, it's a bot. Silently return success.
      return NextResponse.json({ success: true, message: "Caught by honeypot" });
    }

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Save the audit report first
    const audit = await prisma.audit.create({
      data: {
        data: JSON.stringify(reportData),
        summary: reportData.summaryParagraph || null,
      }
    });

    // Save the lead
    const lead = await prisma.lead.create({
      data: {
        email,
        companyName,
        role,
        teamSize: teamSize?.toString(),
        auditId: audit.id
      }
    });

    // In a real scenario, we'd trigger Resend / Postmark here.
    // e.g., await resend.emails.send({ to: email, subject: 'Your AI Spend Audit', ... })

    return NextResponse.json({ 
        success: true, 
        auditId: audit.id,
        shareUrl: `/audit/${audit.id}`
    });

  } catch (error) {
    console.error("Lead Capture Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
