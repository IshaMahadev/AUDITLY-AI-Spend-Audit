"use client";

import { useState } from "react";
import { AuditReport } from "@/lib/types";
import { CheckCircle2, ArrowLeft, Save, Link as LinkIcon } from "lucide-react";

interface AuditResultsProps {
  report: AuditReport;
  onReset: () => void;
}

export default function AuditResults({ report, onReset }: AuditResultsProps) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [savedUrl, setSavedUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, reportData: report, honeypot })
      });
      const data = await res.json();
      if (data.shareUrl) {
        setSavedUrl(data.shareUrl);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <button onClick={onReset} className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors font-mono uppercase text-sm mb-8">
        <ArrowLeft size={16} /> Back to Audit
      </button>

      <div className="brutalist-card p-8 border-accent">
        <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter">Audit Complete</h2>
        <p className="text-muted-foreground mb-8 text-lg">
          We analyzed your stack. Here are the hard truths.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="p-6 bg-black/50 border border-border">
            <h3 className="text-sm font-mono text-muted-foreground uppercase mb-2">Monthly Savings</h3>
            <div className="text-5xl font-black text-accent">${report.totalMonthlySavings.toFixed(2)}</div>
          </div>
          <div className="p-6 bg-black/50 border border-border">
            <h3 className="text-sm font-mono text-muted-foreground uppercase mb-2">Annual Savings</h3>
            <div className="text-5xl font-black text-white">${report.totalAnnualSavings.toFixed(2)}</div>
          </div>
        </div>

        {report.summaryParagraph && (
          <div className="mb-8 p-4 border border-dashed border-accent/50 bg-accent/5">
            <p className="font-mono text-sm leading-relaxed text-foreground/90">
              <span className="text-accent font-bold">/// AI SYNTHESIS:</span> {report.summaryParagraph}
            </p>
          </div>
        )}

        {report.totalMonthlySavings > 500 && (
          <div className="mb-10 bg-accent text-black p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[6px_6px_0px_#fff]">
            <div>
              <h3 className="font-black text-xl uppercase mb-1">Massive Overspend Detected</h3>
              <p className="font-mono text-sm">You are leaking capital. Credex can source discounts for your exact stack.</p>
            </div>
            <a href="https://credex.rocks" target="_blank" className="bg-black text-white px-6 py-3 font-mono font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors whitespace-nowrap text-center">
              Book Consultation
            </a>
          </div>
        )}

        {report.isOptimal && (
          <div className="mb-10 border border-green-500/30 bg-green-500/10 p-6 flex items-start gap-4">
            <CheckCircle2 className="text-green-500 mt-1 shrink-0" />
            <div>
              <h3 className="font-bold text-lg text-green-500 mb-1">You're spending well.</h3>
              <p className="text-sm text-muted-foreground">We couldn't find major inefficiencies in your current plan structures. Your stack is optimal.</p>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold uppercase tracking-wide">Line-by-Line Breakdown</h3>
        {report.results.map((res, i) => (
          <div key={i} className="brutalist-card p-6 flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-1/4">
              <div className="font-bold text-lg">{res.subscription.toolName}</div>
              <div className="text-sm font-mono text-muted-foreground">{res.subscription.plan} Plan</div>
              <div className="text-sm font-mono mt-2">Spend: ${res.subscription.spend}/mo</div>
            </div>
            
            <div className="w-full md:w-1/2">
              <div className="text-sm font-bold uppercase text-accent mb-2">Recommended Action</div>
              <div className="text-base mb-2">{res.recommendedAction}</div>
              <div className="text-sm text-muted-foreground leading-relaxed border-l-2 border-border pl-3">
                {res.reason}
              </div>
            </div>

            <div className="w-full md:w-1/4 flex flex-col md:items-end">
              <div className="text-xs font-mono uppercase text-muted-foreground mb-1">Potential Savings</div>
              <div className={`text-2xl font-black ${res.monthlySavings > 0 ? 'text-accent' : 'text-muted-foreground'}`}>
                ${res.monthlySavings.toFixed(2)}/mo
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="brutalist-card p-8 mt-12 bg-black/80">
        {!savedUrl ? (
          <form onSubmit={handleSave} className="space-y-4">
            <h3 className="text-xl font-bold uppercase tracking-wide">Save & Share This Audit</h3>
            <p className="text-muted-foreground text-sm font-mono">Get a permanent, anonymized link to share with your team or finance department.</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <input 
                type="email" 
                required 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com" 
                className="brutalist-input flex-1"
              />
              {/* Honeypot field for bots */}
              <input 
                type="text" 
                name="name_confirm" 
                value={honeypot}
                onChange={e => setHoneypot(e.target.value)}
                className="hidden opacity-0 absolute pointer-events-none" 
                tabIndex={-1} 
                autoComplete="off"
              />
              <button type="submit" disabled={saving} className="brutalist-button whitespace-nowrap flex items-center gap-2">
                {saving ? "SAVING..." : <><Save size={16} /> SAVE REPORT</>}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 border border-accent p-6 bg-accent/5">
            <h3 className="text-xl font-bold uppercase tracking-wide text-accent flex items-center gap-2">
              <CheckCircle2 /> Audit Saved
            </h3>
            <p className="text-muted-foreground text-sm font-mono">Your unique, anonymized sharing link is ready:</p>
            <div className="flex items-center gap-4 bg-black p-4 border border-border">
              <LinkIcon size={16} className="text-accent shrink-0" />
              <input 
                type="text" 
                readOnly 
                value={`${typeof window !== 'undefined' ? window.location.origin : ''}${savedUrl}`}
                className="bg-transparent border-none w-full text-white font-mono text-sm focus:outline-none"
                onClick={e => (e.target as HTMLInputElement).select()}
              />
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
