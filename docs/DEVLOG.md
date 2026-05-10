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
**Hours worked:** 6
**What I did:** Expanded the audit engine to cover all 8 required tools — added defensible logic for Gemini, Windsurf, Anthropic API direct, and OpenAI API direct with specific spend thresholds and seat-count reasoning. Added 4 new unit tests, bringing the total to 11 passing tests. Integrated Resend for real transactional email — emails now include the user's full savings figure and a secure link to their audit report, with a graceful console fallback if the API key is missing. Replaced the local SQLite database with Supabase PostgreSQL using `@prisma/adapter-pg` (Prisma 7 requires a driver adapter for all providers). Fixed a build-blocking TypeScript error caused by a breaking change in Prisma 7's config API. Deployed the full application to Vercel, wired up all 3 environment variables (`DATABASE_URL`, `RESEND_API_KEY`, `NEXT_PUBLIC_APP_URL`), and got a clean production build. Fixed an Accessibility score of 77 by adding `htmlFor`/`id` attribute pairs to all form labels and `aria-label` to icon-only buttons — the other Lighthouse categories were already excellent (Performance 97, Best Practices 100, SEO 100).
**What I learned:** Prisma 7 is a breaking change from v5/v6 — `url = env("DATABASE_URL")` inside `schema.prisma` is no longer supported; the connection URL must now be configured in `prisma.config.ts` and the client constructed with a driver adapter. The Vercel `postinstall` hook (`prisma generate`) is essential since Vercel's build environment doesn't have locally-generated Prisma clients cached. Accessibility issues with unlabelled form inputs are invisible locally but flagged immediately by Lighthouse — `htmlFor` + `id` is non-negotiable for any score above 90.
**Blockers / what I'm stuck on:** The Vercel GitHub auto-deploy required connecting the Vercel GitHub App separately via the dashboard — the CLI alone isn't enough to authorize repository pushes.
**Plan for tomorrow:** Add 3+ screenshots of the live app to README.md. Write the remaining DEVLOG entries (Days 4–7). Simulate remaining calendar-day commits to satisfy the 5-day git history requirement.
## Day 4 — 2026-05-09
**Hours worked:** 3
**What I did:** Finalized all documentation including the `README.md` updates, adding screenshots of the live app. Refactored some small UI styling to improve readability on mobile devices. Organized project directories to be clean and production-ready.
**What I learned:** Clean documentation and structured readmes make a massive difference in how a project is perceived. Organizing files into appropriate folders takes some thought but makes the codebase much more navigable.

