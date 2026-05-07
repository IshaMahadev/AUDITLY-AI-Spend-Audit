/**
 * Database abstraction layer.
 *
 * Named "supabase" to match the import paths from the Claude-generated routes,
 * but actually backed by Prisma 7 + SQLite (via better-sqlite3 adapter) for local/demo use.
 * Swap the internals for a real Supabase client when deploying to production.
 */

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";
import type { AuditResult } from "@/types";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/* ------------------------------------------------------------------ */
/*  Audit CRUD                                                        */
/* ------------------------------------------------------------------ */

export async function saveAudit(audit: AuditResult): Promise<void> {
  await prisma.audit.create({
    data: {
      id: audit.id,
      data: JSON.stringify(audit),
    },
  });
}

export async function getAudit(id: string): Promise<AuditResult | null> {
  const record = await prisma.audit.findUnique({ where: { id } });
  if (!record) return null;

  const data = JSON.parse(record.data) as AuditResult;
  data.aiSummary = record.summary ?? undefined;
  data.createdAt = record.createdAt.toISOString();
  return data;
}

export async function updateAuditSummary(
  id: string,
  summary: string
): Promise<void> {
  await prisma.audit.update({
    where: { id },
    data: { summary },
  });
}

/* ------------------------------------------------------------------ */
/*  Lead CRUD                                                         */
/* ------------------------------------------------------------------ */

export async function saveLead(data: {
  auditId: string;
  email: string;
  companyName?: string;
  role?: string;
  teamSize?: number;
}): Promise<void> {
  await prisma.lead.create({
    data: {
      email: data.email,
      companyName: data.companyName,
      role: data.role,
      teamSize: data.teamSize?.toString(),
      auditId: data.auditId,
    },
  });
}

export async function leadExists(email: string): Promise<boolean> {
  const count = await prisma.lead.count({ where: { email } });
  return count > 0;
}
