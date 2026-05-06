# Prompts

## The Audit Summary Generation Prompt

```text
You are a financial analyst specializing in SaaS spend. Review the following AI tool audit report and write a brutal, concise, ~100-word personalized summary of their spend. Be direct. Do not use corporate speak.
    
Total Savings: ${report.totalMonthlySavings}/mo
Details: ${JSON.stringify(report.results.map((r: any) => ({tool: r.subscription.toolName, action: r.recommendedAction, savings: r.monthlySavings})))}
```

### Why it was written this way:
1. **Persona Assignment:** "You are a financial analyst specializing in SaaS spend." This grounds the LLM in a specific domain, ensuring it uses the correct terminology (e.g., ROI, burn rate, optimization) rather than general colloquialisms.
2. **Tone Constraint:** "brutal, concise... Be direct. Do not use corporate speak." This perfectly aligns with the brutalist aesthetic of the application. It prevents the AI from generating fluffy, apologetic text like "We noticed some opportunities for improvement..." and forces it to say "You are wasting $300 a month on redundant ChatGPT accounts."
3. **Length Constraint:** "~100-word". Keeps the UI from breaking or forcing the user to scroll through a wall of text.
4. **Data Isolation:** By specifically mapping only `toolName`, `action`, and `savings` into the JSON stringification, we prevent token bloat and ensure the LLM only hallucinates based on the exact actions the deterministic Audit Engine recommended.

### What I tried that didn't work:
Initially, I passed the entire raw `reportData` JSON into the prompt and simply said: "Summarize this." 
The result was terrible. Claude started second-guessing the deterministic logic I had written, hallucinating incorrect pricing data (e.g., claiming Copilot was $50/mo), and it wrote a 400-word essay about the importance of AI. By strictly formatting the data payload and aggressively constraining the persona, the output became sharp and reliable.
