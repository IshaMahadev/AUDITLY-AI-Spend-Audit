# Devlog

## Day 1 — 2026-05-06
**Hours worked:** 4
**What I did:** Read the prompt, designed the brutalist aesthetic tokens, and mapped out the Next.js architecture. Set up the repo and ran `npx create-next-app`. Chose SQLite for local speed and zero-setup evaluation. Built the Prisma schema with `Lead` and `Audit` models.
**What I learned:** Tailwind CSS v4 in Next.js relies heavily on `@theme inline` in `globals.css`, which makes custom styling incredibly seamless compared to modifying `tailwind.config.ts`.
**Blockers / what I'm stuck on:** Trying to decide whether to use a real Postgres DB immediately or start with SQLite for speed. Opted for SQLite.
**Plan for tomorrow:** Build the complex `InputForm` React component with dynamic field appending and write the core `auditEngine` math logic.

## Day 2 — 2026-05-07
**Hours worked:** 5
**What I did:** Built the `InputForm` component with custom neon accents and CRT grain. Wrote the `auditEngine.ts` with hardcoded pricing logic for Cursor, Copilot, Claude, and ChatGPT based on real-world pricing data.
**What I learned:** Persisting form state to `localStorage` across reloads in React requires careful `useEffect` handling to avoid hydration mismatches. Parsing pricing pages is tedious. I had to make a few assumptions about API spend breakpoints for small teams.
**Blockers / what I'm stuck on:** How to cleanly display the results array without the page feeling cluttered.
**Plan for tomorrow:** Build the `AuditResults` component and write the required entrepreneurial markdown files.

## Day 3 — 2026-05-08
**Hours worked:** 4
**What I did:** Built `AuditResults.tsx`. Integrated the Anthropic API via a Next.js API route to generate the 100-word personalized summary. Moved all entrepreneurial markdown files (`GTM.md`, `ECONOMICS.md`, etc.) to the repository root. Wrote the first 3 automated tests.
**What I learned:** Prompt engineering for financial analysis requires strict constraints. Without `max_tokens` and direct instructions, the LLM tends to ramble. Writing the GTM and Economics docs really forced me to think about this as a real product rather than just a coding assignment.
**Blockers / what I'm stuck on:** None currently. The Anthropic API is working perfectly.
**Plan for tomorrow:** Build the lead capture API and the shareable URL routing.
