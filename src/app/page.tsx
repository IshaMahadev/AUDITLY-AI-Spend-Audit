"use client";

import { useState } from "react";
import InputForm from "@/components/InputForm";
import AuditResults from "@/components/AuditResults";
import { UserInputData, AuditReport } from "@/lib/types";
import { runAudit } from "@/lib/auditEngine";

export default function Home() {
  const [report, setReport] = useState<AuditReport | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAudit = async (data: UserInputData) => {
    setLoading(true);
    try {
      const generatedReport = runAudit(data);
      
      // Fetch AI summary
      const res = await fetch('/api/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ report: generatedReport })
      });
      const { summary } = await res.json();
      generatedReport.summaryParagraph = summary;

      setReport(generatedReport);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground p-6 md:p-12 relative z-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center space-y-4 pt-12 pb-8">
          <div className="inline-block border border-accent bg-accent/10 text-accent px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest mb-4">
            Credex Internal Tool
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mix-blend-difference text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            AI Spend Audit
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-mono max-w-2xl mx-auto">
            Stop overpaying for your AI infrastructure. Input your stack and get a brutal, mathematically-defensible analysis of where you're leaking capital.
          </p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-16 h-16 border-4 border-muted-foreground border-t-accent rounded-full animate-spin"></div>
            <div className="font-mono text-accent animate-pulse uppercase tracking-widest">Analyzing Stack...</div>
          </div>
        ) : report ? (
          <AuditResults report={report} onReset={() => setReport(null)} />
        ) : (
          <InputForm onSubmit={handleAudit} />
        )}
      </div>
    </main>
  );
}
