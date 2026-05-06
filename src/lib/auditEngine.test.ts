import { runAudit } from './auditEngine';
import { UserInputData } from './types';

describe('Audit Engine Logic', () => {

  it('1. Recommends downgrading from Cursor Business to Pro for a solo dev', () => {
    const payload: UserInputData = {
      teamSize: 1,
      primaryUseCase: 'coding',
      subscriptions: [{
        id: '1', toolName: 'Cursor', plan: 'Business', spend: 40, seats: 1
      }]
    };
    const result = runAudit(payload);
    expect(result.results[0].recommendedAction).toBe('Downgrade to Cursor Pro');
    expect(result.totalMonthlySavings).toBe(20);
  });

  it('2. Suggests switching Copilot to Cursor Pro for coding', () => {
    const payload: UserInputData = {
      teamSize: 5,
      primaryUseCase: 'coding',
      subscriptions: [{
        id: '1', toolName: 'GitHub Copilot', plan: 'Business', spend: 95, seats: 5
      }]
    };
    const result = runAudit(payload);
    expect(result.results[0].recommendedAction).toBe('Switch to Cursor Pro');
    // Note: Copilot business is $19, Cursor Pro is $20. Wait, logic says `spend - (20 * seats)`
    // 95 - 100 = -5 -> bounded to 0. 
    expect(result.results[0].monthlySavings).toBe(0); 
  });

  it('3. Downgrades ChatGPT Team to Plus for solo user', () => {
    const payload: UserInputData = {
      teamSize: 1,
      primaryUseCase: 'writing',
      subscriptions: [{
        id: '1', toolName: 'ChatGPT', plan: 'Team', spend: 60, seats: 2 // minimum 2 seats for team
      }]
    };
    const result = runAudit(payload);
    expect(result.results[0].recommendedAction).toBe('Downgrade to ChatGPT Plus');
    expect(result.totalMonthlySavings).toBe(40); // 60 - 20 = 40
  });

  it('4. Recommends switching high API spend to Claude Pro for small teams', () => {
    const payload: UserInputData = {
      teamSize: 1,
      primaryUseCase: 'writing',
      subscriptions: [{
        id: '1', toolName: 'Claude', plan: 'API direct', spend: 150, seats: 1
      }]
    };
    const result = runAudit(payload);
    expect(result.results[0].recommendedAction).toBe('Switch to Claude Pro');
    expect(result.totalMonthlySavings).toBe(130); // 150 - 20 = 130
  });

  it('5. Marks stack as optimal when no savings are found', () => {
    const payload: UserInputData = {
      teamSize: 10,
      primaryUseCase: 'mixed',
      subscriptions: [{
        id: '1', toolName: 'ChatGPT', plan: 'Plus', spend: 200, seats: 10
      }]
    };
    const result = runAudit(payload);
    expect(result.isOptimal).toBe(true);
    expect(result.totalMonthlySavings).toBe(0);
  });

});
