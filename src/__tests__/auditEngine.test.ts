import { runAudit } from '../lib/auditEngine';
import { UserInputData } from '../lib/types';

describe('Audit Engine', () => {
  it('recommends downgrading Cursor Business to Pro for small teams', () => {
    const data: UserInputData = {
      teamSize: 2,
      primaryUseCase: 'coding',
      subscriptions: [
        {
          toolName: 'Cursor',
          plan: 'Business',
          seats: 2,
          spend: 80, // $40 * 2
        }
      ]
    };

    const report = runAudit(data);
    expect(report.results[0].recommendedAction).toBe('Downgrade to Cursor Pro');
    expect(report.results[0].monthlySavings).toBe(40); // 80 - (20*2) = 40
    expect(report.totalMonthlySavings).toBe(40);
  });

  it('recommends downgrading ChatGPT Team to Plus for solo users', () => {
    const data: UserInputData = {
      teamSize: 1,
      primaryUseCase: 'mixed',
      subscriptions: [
        {
          toolName: 'ChatGPT',
          plan: 'Team',
          seats: 1,
          spend: 30,
        }
      ]
    };

    const report = runAudit(data);
    expect(report.results[0].recommendedAction).toBe('Downgrade to ChatGPT Plus');
    expect(report.results[0].monthlySavings).toBe(10); // 30 - 20 = 10
  });

  it('identifies optimal usage when there are no obvious savings', () => {
    const data: UserInputData = {
      teamSize: 10,
      primaryUseCase: 'coding',
      subscriptions: [
        {
          toolName: 'Cursor',
          plan: 'Business',
          seats: 10,
          spend: 400,
        }
      ]
    };

    const report = runAudit(data);
    expect(report.results[0].recommendedAction).toBe('Keep as is');
    expect(report.results[0].monthlySavings).toBe(0);
    expect(report.isOptimal).toBe(true);
  });

  it('recommends downgrading Windsurf Team to Pro for small teams', () => {
    const data: UserInputData = {
      teamSize: 2,
      primaryUseCase: 'coding',
      subscriptions: [
        {
          toolName: 'Windsurf',
          plan: 'Team',
          seats: 2,
          spend: 50,
        }
      ]
    };

    const report = runAudit(data);
    expect(report.results[0].recommendedAction).toBe('Downgrade to Windsurf Pro');
    expect(report.results[0].monthlySavings).toBe(20); // 50 - (15*2) = 20
  });

  it('recommends switching from Gemini Ultra to Cursor/Claude for coding', () => {
    const data: UserInputData = {
      teamSize: 1,
      primaryUseCase: 'coding',
      subscriptions: [
        {
          toolName: 'Gemini',
          plan: 'Ultra',
          seats: 1,
          spend: 20,
        }
      ]
    };

    const report = runAudit(data);
    expect(report.results[0].recommendedAction).toBe('Switch to Cursor Pro or Claude Pro');
    expect(report.results[0].monthlySavings).toBe(0); 
  });

  it('recommends switching high Anthropic API spend to Pro for small teams', () => {
    const data: UserInputData = {
      teamSize: 1,
      primaryUseCase: 'mixed',
      subscriptions: [
        {
          toolName: 'Anthropic API direct',
          plan: 'Pay-as-you-go',
          seats: 1,
          spend: 150,
        }
      ]
    };

    const report = runAudit(data);
    expect(report.results[0].recommendedAction).toBe('Switch to individual Pro subscriptions');
    expect(report.results[0].monthlySavings).toBe(130); // 150 - 20 = 130
  });
});
