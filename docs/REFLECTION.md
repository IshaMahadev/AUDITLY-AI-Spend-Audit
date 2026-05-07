# Reflection

**1. The hardest bug you hit this week, and how you debugged it**
The hardest bug was a hydration mismatch issue caused by persisting the `InputForm` state to `localStorage`. Initially, I initialized the `useState` directly with `localStorage.getItem()`. This caused Next.js server-side rendering to mismatch the client HTML, crashing the app. I formed the hypothesis that the server has no access to `localStorage`. I debugged it by moving the `localStorage` retrieval into a `useEffect` hook that only runs post-mount on the client side. This fixed the hydration crash, but introduced a brief flash. I resolved the flash by rendering a generic loading skeleton until the client fully mounted.

**2. A decision you reversed mid-week, and what made you reverse it**
Mid-week, I reversed my decision to use a fully remote Supabase Postgres database. Originally, I thought it was necessary for a "production-grade" MVP. However, realizing that reviewers need to run this locally without configuring API keys and setting up their own database instances, I switched to Prisma with local SQLite. It completely removes the barrier to entry for the reviewer while keeping the exact same Prisma ORM syntax, making it trivial to swap to Postgres for a real production deployment.

**3. What you would build in week 2 if you had it**
In week 2, I would build the "Benchmark mode" bonus feature. I'd aggregate anonymized data from the SQLite database to create an index of average spend per developer based on company size. When a user completes an audit, they wouldn't just see their savings—they'd see a percentile ranking (e.g., "You spend 30% more than other 50-person teams"). This creates a competitive, gamified loop that makes the tool much more likely to be shared among founders.

**4. How you used AI tools**
I used Claude 3.5 Sonnet to scaffold the initial Next.js boilerplate and generate the boilerplate for the Prisma schema. I used GitHub Copilot heavily for autocomplete during the repetitive React form creation. I intentionally did *not* trust AI with the core `auditEngine` math logic. I manually hardcoded those rules based on the pricing data. In fact, when I asked Copilot to suggest the logic for Cursor Business vs Pro, it hallucinated that Business was $30/mo instead of $40/mo. I caught it by referencing my `PRICING_DATA.md` directly.

**5. Self-rating on a 1–10 scale**
- **Discipline (9/10):** Logged daily, kept scope strictly to the MVP, and didn't get distracted by over-engineering the backend.
- **Code Quality (8/10):** Highly readable, type-safe, and functional, though the React component sizes could be refactored into smaller sub-components.
- **Design Sense (10/10):** Chose a bold, brutalist, non-generic aesthetic that perfectly fits a "financial audit" tool and stands out from typical SaaS templates.
- **Problem Solving (9/10):** Handled edge cases well (e.g., Anthropic API fallback) and made pragmatic trade-offs (SQLite for easy evaluation).
- **Entrepreneurial Thinking (9/10):** Designed the tool precisely as a lead-gen asset with a strong viral loop built into the shareable URLs.
