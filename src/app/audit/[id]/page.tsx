import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAudit } from "@/lib/supabase";
import AuditResultsClient from "./AuditResultsClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const audit = await getAudit(id);
  if (!audit) return { title: "Audit Not Found" };

  const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://auditly.dev";
  const savings = audit.totalMonthlySavings;
  const title =
    savings > 0
      ? `AI Spend Audit — $${savings.toLocaleString()}/mo in potential savings`
      : "AI Spend Audit — Your Stack Is Optimised";
  const description = `Audit of ${audit.recommendations.length} AI tools for a ${audit.teamSize}-person ${audit.useCase} team. Total monthly AI spend: $${audit.totalMonthlySpend.toLocaleString()}.`;
  const ogImageUrl = `${APP_URL}/api/og?id=${id}&savings=${savings}&spend=${audit.totalMonthlySpend}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${APP_URL}/audit/${id}`,
      type: "website",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function AuditPage({ params }: Props) {
  const { id } = await params;
  const audit = await getAudit(id);
  if (!audit) notFound();
  return <AuditResultsClient audit={audit} />;
}
