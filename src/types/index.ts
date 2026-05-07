export interface ToolRecommendation {
  toolId: string;
  toolName: string;
  currentPlan: string;
  currentSeats: number;
  currentSpend: number;
  recommendation: string;
  recommendedAction: string;
  monthlySavings: number;
  reasoning: string;
  credexOpportunity: boolean;
}

export interface AuditResult {
  id: string;
  createdAt: string;
  aiSummary?: string;
  totalMonthlySavings: number;
  totalMonthlySpend: number;
  totalAnnualSavings: number;
  teamSize: number;
  useCase: string;
  spendPerDeveloper: number;
  industryAvgPerDeveloper: number;
  recommendations: ToolRecommendation[];
  isOptimal: boolean;
}
