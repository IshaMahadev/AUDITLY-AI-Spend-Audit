# AI Spend Audit

AI Spend Audit is a brutal, mathematically defensible tool for engineering managers and startup founders to analyze their AI infrastructure stack (Cursor, Copilot, Claude, ChatGPT, etc.) and instantly identify wasted capital from sub-optimal plans.

![App Screenshot](/public/screenshot.png)

## Quick Start

1. **Install dependencies:** `npm install`
2. **Setup Database:** `npx prisma db push && npx prisma generate`
3. **Set Environment Variables:** Copy `.env.example` to `.env` and add `ANTHROPIC_API_KEY`
4. **Run Locally:** `npm run dev`
5. **Deploy:** One-click deploy on Vercel with Vercel Postgres attached.

## Decisions

1. **Next.js App Router**: Chosen for seamless SSR, easy API route generation (for the LLM and Lead capture), and zero-config deployment on Vercel.
2. **Prisma ORM with SQLite**: Used to satisfy the backend persistence requirement quickly while allowing for immediate local testing without needing a remote Postgres instance during development.
3. **Client-side Audit Logic**: The `auditEngine` runs entirely on the client side for the initial audit to ensure immediate "instant on-screen" feedback, preventing perceived latency.
4. **Tailwind + Hard Brutalism**: Instead of generic UI libraries, I opted for raw CSS variables with Tailwind to create a memorable, retro-futuristic, high-contrast aesthetic that feels like a real "audit" tool, standing out from typical SaaS templates.
5. **Honeypot over hCaptcha**: I chose a honeypot field for the lead capture to prioritize a frictionless user experience over extreme security. Since this is an MVP, avoiding the friction of a CAPTCHA challenge is critical for conversion.

## Live URL

[https://ai-spend-audit.vercel.app](https://ai-spend-audit.vercel.app)
