# Metrics Strategy

## The Single North Star Metric
**Shareable Links Generated (SLGs)**
Why: This is a B2B lead-gen tool meant to be used once or twice by a specific user. Tracking "Daily Active Users" (DAU) is meaningless. Tracking "Audits Completed" is vanity, because a user can complete an audit but bounce without capturing the lead. 
The generation of a shareable link proves two things simultaneously:
1. The user found enough value in the math to want to persist it.
2. The user is actively creating the viral loop by preparing to send it to a colleague.
If SLGs are high, everything else (leads, traffic, conversions) follows.

## 3 Input Metrics
These drive the North Star:
1. **Form Completion Rate:** (Audits Completed / Unique Landing Page Visitors). Tells us if the input form is too intimidating or tedious.
2. **High-Savings Surface Rate:** (Percentage of audits showing >$500/mo savings). Tells us if our GTM targeting is hitting the right maturity of startup. If this is 0%, we are marketing to hobbyists, not Series A startups.
3. **Link Click-Through-Rate (CTR):** (Unique visitors landing on `/audit/[id]`). Tells us if the generated shareable links are actually being clicked by the colleagues they are sent to.

## First Instrumentation Focus
**The "Drop-off Point" in the Input Form**
I would immediately instrument PostHog to track exact field abandonment. Are users dropping off when asked for "Seats"? Are they abandoning when asked for "Monthly Spend" because they don't know it? Knowing exactly which field causes friction allows us to make it optional or provide auto-calculated defaults.

## Pivot Trigger
**Trigger:** If the Form Completion Rate is > 40%, but the Shareable Links Generated rate is < 2%.
**The Pivot:** This data means the tool is fun to use, but the results are either unbelievable, confusing, or not valuable enough to share with a boss. We would pivot from a "Consumer-style UI" to a "PDF Export/Formal PDF Generation" tool, because users might not want to share a raw web link with Finance, but would gladly attach a formal PDF report to an email.
