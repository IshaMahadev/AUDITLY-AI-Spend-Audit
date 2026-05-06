import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import AuditResults from '@/components/AuditResults';

const prisma = new PrismaClient();

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return {
    title: `AI Spend Audit Report`,
    description: `Check out this anonymized AI spend audit report to see how much capital is being leaked on oversized subscriptions.`,
    openGraph: {
      title: 'AI Spend Audit Report',
      description: 'Check out this anonymized AI spend audit report to see how much capital is being leaked.',
    }
  };
}

export default async function AuditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: auditId } = await params;
  
  const audit = await prisma.audit.findUnique({
    where: { id: auditId }
  });

  if (!audit) {
    notFound();
  }

  const reportData = JSON.parse(audit.data);

  return (
    <main className="min-h-screen bg-background text-foreground p-6 md:p-12 relative z-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center space-y-4 pt-12 pb-8">
          <div className="inline-block border border-accent bg-accent/10 text-accent px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest mb-4">
            Anonymized Public Report
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mix-blend-difference text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            AI Spend Audit
          </h1>
        </header>

        {/* We reuse AuditResults but disable the 'Back' and 'Save' features by not passing onReset or wrapping it differently.
            Actually, the component expects onReset. We can pass a noop or just hide it via CSS, but passing a redirect to home is better. */}
        <AuditResults report={reportData} onReset={() => {
          if (typeof window !== 'undefined') window.location.href = '/';
        }} />
      </div>
    </main>
  );
}
