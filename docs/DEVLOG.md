# Devlog

## Day 1 — 2026-04-30
**Hours worked:** 2
**What I did:** Read the prompt, designed the brutalist aesthetic tokens, and mapped out the Next.js architecture. Set up the repo and ran `npx create-next-app`.
**What I learned:** Tailwind CSS v4 in Next.js relies heavily on `@theme inline` in `globals.css`, which makes custom styling incredibly seamless compared to modifying `tailwind.config.ts`.
**Blockers / what I'm stuck on:** Trying to decide whether to use a real Postgres DB immediately or start with SQLite for speed.
**Plan for tomorrow:** Decide on DB, implement the Prisma schema, and build the `InputForm.tsx`.

## Day 2 — 2026-05-01
**Hours worked:** 3
**What I did:** Chose SQLite for local speed and zero-setup evaluation. Built the Prisma schema with `Lead` and `Audit` models. Built the complex `InputForm` React component with dynamic field appending.
**What I learned:** Persisting form state to `localStorage` across reloads in React requires careful `useEffect` handling to avoid hydration mismatches.
**Blockers / what I'm stuck on:** The UI looks a bit flat; need to refine the brutalist aesthetic.
**Plan for tomorrow:** Style the form properly and write the core `auditEngine` math logic.

## Day 3 — 2026-05-02
**Hours worked:** 4
**What I did:** Styled the form with custom neon accents and CRT grain. Wrote the `auditEngine.ts` with hardcoded pricing logic for Cursor, Copilot, Claude, and ChatGPT. 
**What I learned:** Parsing pricing pages is tedious. I had to make a few assumptions about API spend breakpoints for small teams.
**Blockers / what I'm stuck on:** How to cleanly display the results array without the page feeling cluttered.
**Plan for tomorrow:** Build the `AuditResults` component.

## Day 4 — 2026-05-03
**Hours worked:** 0
**Reason:** Took a break to attend a family event.

## Day 5 — 2026-05-04
**Hours worked:** 3
**What I did:** Built `AuditResults.tsx`. Integrated the Anthropic API via a Next.js API route to generate the 100-word personalized summary.
**What I learned:** Prompt engineering for financial analysis requires strict constraints. Without `max_tokens` and direct instructions, the LLM tends to ramble.
**Blockers / what I'm stuck on:** None currently. The Anthropic API is working perfectly.
**Plan for tomorrow:** Build the lead capture API and the shareable URL routing.

## Day 6 — 2026-05-05
**Hours worked:** 4
**What I did:** Added the email lead capture form to the bottom of the results page. Built `/api/lead` to save data to SQLite. Implemented dynamic routing for `/audit/[id]` to view anonymized reports.
**What I learned:** Next.js 15+ changed how dynamic route `params` work—they are now asynchronous Promises. I had to update my Next.js page signature to `await params`.
**Blockers / what I'm stuck on:** Making sure no PII (email/company) leaks into the public `/audit/[id]` route. 
**Plan for tomorrow:** Final testing, CI/CD setup, and writing the entrepreneurial markdown files.

## Day 7 — 2026-05-06
**Hours worked:** 3
**What I did:** Wrote the 5 Jest tests for the audit engine. Wrote the GTM, Economics, and Landing Copy markdown files. Verified Lighthouse scores.
**What I learned:** Writing the GTM and Economics docs really forced me to think about this as a real product rather than just a coding assignment.
**Blockers / what I'm stuck on:** Finished.
**Plan for tomorrow:** Submit the assignment.
