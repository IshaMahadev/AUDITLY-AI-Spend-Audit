# Go-to-Market Strategy (GTM)

## The Target User
**Job Title:** VP of Engineering or Head of Engineering.
**Company Stage:** Series A or Series B startups (30–150 employees). At this stage, they are growing fast enough to have lost track of individual SaaS subscriptions, but they don't yet have a dedicated Procurement team to crack down on shadow IT.

## The Micro-Moment
What they do right before they'd want this tool:
They just got a ping from the CFO or Head of Finance on Slack: *"Hey, our Anthropic API bill doubled this month, and I also see 40 individual credit card charges for ChatGPT Plus. Aren't we already paying for Copilot? Can we consolidate this?"*
They realize they have no idea what tools their team is actually using vs. paying for.

## Where They Hang Out
- **Private Communities:** Rands Leadership Slack, Eng Managers Discord.
- **X (Twitter):** Lists curating pragmatic engineers (e.g., Gergely Orosz, Swyx).
- **Hacker News:** They read the front page daily.

## Getting the First 100 Users in 30 Days ($0 Budget)
"Post on Twitter" won't work. Instead:
1. **The "Shadow IT" Audit Play:** I will cold email 50 startup CFOs (found via Apollo/LinkedIn) with the subject: *"Are you paying for Copilot and ChatGPT simultaneously?"* The body will just be two lines linking to the audit tool, framing it as a way for them to send a quick link to their Eng leaders to evaluate stack redundancy.
2. **Open Source the "Rules Engine":** I'll publish the `auditEngine.ts` file logic as a GitHub Gist and post it to Hacker News under "Show HN: The exact logic we use to audit AI tool overspend." Engineers love reading rules engines. The bottom of the gist links to the visual UI.
3. **The "Roast My Stack" Thread:** I'll start a thread on Reddit (`r/SaaS` and `r/startup`) offering to manually run their numbers through the engine if they drop their tool list in the comments. I'll reply with screenshots of their generated audit from the app, watermarked with the URL.

## The Unfair Distribution Channel
Credex’s actual credit marketplace. Credex already has a list of buyers (people who bought discounted credits). We can send an email to them: *"You saved 20% on Cursor. Our new audit tool will tell you if you're wasting that savings on an oversized Claude Team plan."* 

## Week-1 Traction Metrics (If it works)
- 400 unique visitors to the landing page.
- 150 completed audits (37.5% completion rate).
- 45 emails captured (30% save/share rate).
- 5 high-intent consultation bookings.
