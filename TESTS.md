# Tests

## Automated Tests

This project uses Jest for unit testing the core business logic.

### `src/__tests__/auditEngine.test.ts`
Covers the deterministic math and rules of the `runAudit` function.

1. **"recommends downgrading Cursor Business to Pro for small teams"**
   - Validates that a small team size (<3) paying for Business is recommended to use individual Pro plans to save 50%.
2. **"recommends downgrading ChatGPT Team to Plus for solo users"**
   - Validates that a single user paying the $30/mo Team premium is downgraded to the $20/mo Plus plan.
3. **"identifies optimal usage when there are no obvious savings"**
   - Validates that a 10-person team using Cursor Business correctly triggers the "Keep as is" branch and reports $0 savings.

### How to run:
```bash
npm run test
```
