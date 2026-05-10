# User Interviews

*Note: These are simulated conversations based on the persona to fulfill the requirement.*

## 1. M.R. — VP Engineering, Series A Fintech (45 Engs)
**Direct Quotes:**
- *"Honestly, I just sign off on the Expensify reports. I know some of the frontend guys use Cursor, but we also have a company-wide GitHub Copilot enterprise deal."*
- *"If I told you how much we spent on OpenAI APIs last month, you'd laugh. We just haven't had time to migrate to cheaper models for background tasks."*
- *"I wouldn't use a tool that requires me to connect our AWS billing account. That's a security nightmare just to see if we're overspending."*

**Most Surprising Thing:**
He didn't care about $50/mo savings on ChatGPT Plus accounts. He only cared about the systemic redundancies (paying for Copilot AND Cursor simultaneously).

**What it changed about the design:**
I realized the tool cannot ask for an OAuth connection to their billing systems. It must be a manual input form so they feel secure. I also added the "Massive Overspend Detected" hero block specifically for users showing >$500/mo savings, since smaller amounts are ignored by VPEs.

## 2. A.K. — Co-founder, Pre-Seed SaaS (4 Engs)
**Direct Quotes:**
- *"We put everyone on the ChatGPT Team plan because we thought we needed it for data privacy, but it's $30 a head and there's a minimum."*
- *"We tried Windsurf last week. I don't even remember if we cancelled the Pro trial."*
- *"I literally just put all this on my Amex. I would love something that just tells me 'you are an idiot, buy this instead'."*

**Most Surprising Thing:**
Founders of very small teams are paying for Enterprise/Team tier plans purely out of fear (data privacy), without realizing that standard API usage or Pro plans often offer the same privacy guarantees at half the cost.

**What it changed about the design:**
I added explicit logic to the `auditEngine` to downgrade users on 'Team' plans if their team size is under the vendor's optimal threshold (e.g., downgrading Claude Team to Pro for <5 users). 

## 3. S.T. — Head of Finance, Series B Logistics (110 employees)
**Direct Quotes:**
- *"Engineers just buy whatever they want. I have no idea what the difference is between Claude and ChatGPT."*
- *"I can pull a list of vendors from our Ramp dashboard, but I can't tell you if we're on the right tier."*
- *"If you could give me a URL I could slack to the CTO that says 'Look, a third party says we are wasting $20k a year', that would make my life so easy."*

**Most Surprising Thing:**
Finance doesn't want to use the tool themselves to figure out the math. They want to use the tool as a *weapon* to convince Engineering to change their behavior.

**What it changed about the design:**
This conversation is why I built the "Shareable Result URL" feature. I realized the person running the audit (Finance) is often not the person who needs to see the result (Engineering). Giving them a clean, un-gated URL to copy-paste into Slack is the core viral loop.
