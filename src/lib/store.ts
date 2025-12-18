import { create } from 'zustand';

export type UserRole = 'client' | 'rm' | 'fa' | 'admin';

export type BlueprintStatus = 'draft' | 'active';
export type RecommendationStatus = 'draft' | 'approved' | 'executing' | 'confirmed';
export type StructuringStatus = 'not_started' | 'in_progress' | 'completed';
export type ExecutionStatus = 'created' | 'submitted' | 'processing' | 'confirmed';

export interface Client {
  id: string;
  name: string;
  email: string;
  totalAUM: number;
  riskProfile: 'conservative' | 'balanced' | 'growth' | 'aggressive';
  rmId: string;
  blueprintId?: string;
}

export interface Blueprint {
  id: string;
  clientId: string;
  clientName: string;
  status: BlueprintStatus;
  goals: string[];
  riskTolerance: string;
  timeHorizon: string;
  targetAllocation: {
    equities: number;
    fixedIncome: number;
    alternatives: number;
    cash: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Recommendation {
  id: string;
  blueprintId: string;
  clientName: string;
  title: string;
  description: string;
  status: RecommendationStatus;
  asset: string;
  amount: number;
  rationale: string;
  partner: string;
  createdBy: string;
  createdAt: string;
}

export interface StructuringCase {
  id: string;
  clientName: string;
  title: string;
  status: StructuringStatus;
  complexity: 'standard' | 'complex' | 'bespoke';
  assignedFA: string;
  notes: string;
  createdAt: string;
}

export interface ExecutionTicket {
  id: string;
  recommendationId: string;
  clientName: string;
  asset: string;
  amount: number;
  status: ExecutionStatus;
  partner: string;
  createdAt: string;
  confirmedAt?: string;
}

interface AppState {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  
  clients: Client[];
  blueprints: Blueprint[];
  recommendations: Recommendation[];
  structuringCases: StructuringCase[];
  executionTickets: ExecutionTicket[];
  
  updateBlueprintStatus: (id: string, status: BlueprintStatus) => void;
  updateRecommendationStatus: (id: string, status: RecommendationStatus) => void;
  updateStructuringStatus: (id: string, status: StructuringStatus) => void;
  updateExecutionStatus: (id: string, status: ExecutionStatus) => void;
  
  createExecutionTicket: (recommendation: Recommendation) => void;
}

// Demo data
const demoClients: Client[] = [
  {
    id: 'c1',
    name: 'Victoria Hartwell',
    email: 'v.hartwell@email.com',
    totalAUM: 12500000,
    riskProfile: 'balanced',
    rmId: 'rm1',
    blueprintId: 'bp1',
  },
  {
    id: 'c2',
    name: 'Marcus Chen-Williams',
    email: 'm.chenwilliams@email.com',
    totalAUM: 8750000,
    riskProfile: 'growth',
    rmId: 'rm1',
    blueprintId: 'bp2',
  },
  {
    id: 'c3',
    name: 'Isabella Montenegro',
    email: 'i.montenegro@email.com',
    totalAUM: 25000000,
    riskProfile: 'conservative',
    rmId: 'rm1',
  },
];

const demoBlueprints: Blueprint[] = [
  {
    id: 'bp1',
    clientId: 'c1',
    clientName: 'Victoria Hartwell',
    status: 'active',
    goals: ['Wealth Preservation', 'Income Generation', 'Legacy Planning'],
    riskTolerance: 'Moderate',
    timeHorizon: '10+ years',
    targetAllocation: { equities: 45, fixedIncome: 35, alternatives: 15, cash: 5 },
    createdAt: '2024-01-15',
    updatedAt: '2024-03-10',
  },
  {
    id: 'bp2',
    clientId: 'c2',
    clientName: 'Marcus Chen-Williams',
    status: 'draft',
    goals: ['Capital Growth', 'Tax Efficiency'],
    riskTolerance: 'Moderate-High',
    timeHorizon: '7-10 years',
    targetAllocation: { equities: 60, fixedIncome: 20, alternatives: 15, cash: 5 },
    createdAt: '2024-02-20',
    updatedAt: '2024-03-15',
  },
];

const demoRecommendations: Recommendation[] = [
  {
    id: 'rec1',
    blueprintId: 'bp1',
    clientName: 'Victoria Hartwell',
    title: 'Global Dividend Strategy',
    description: 'Diversified global equity exposure with dividend focus',
    status: 'approved',
    asset: 'iShares Select Dividend ETF',
    amount: 500000,
    rationale: 'Aligns with income generation goal while maintaining equity exposure',
    partner: 'BlackRock',
    createdBy: 'FA - Sarah Mitchell',
    createdAt: '2024-03-01',
  },
  {
    id: 'rec2',
    blueprintId: 'bp1',
    clientName: 'Victoria Hartwell',
    title: 'Investment Grade Bonds',
    description: 'High-quality corporate bond allocation',
    status: 'executing',
    asset: 'PIMCO Investment Grade Credit',
    amount: 350000,
    rationale: 'Provides stable income with low credit risk',
    partner: 'PIMCO',
    createdBy: 'FA - Sarah Mitchell',
    createdAt: '2024-03-05',
  },
  {
    id: 'rec3',
    blueprintId: 'bp2',
    clientName: 'Marcus Chen-Williams',
    title: 'Emerging Markets Growth',
    description: 'Diversified EM equity allocation',
    status: 'draft',
    asset: 'Vanguard FTSE Emerging Markets ETF',
    amount: 200000,
    rationale: 'Higher growth potential aligned with risk tolerance',
    partner: 'Vanguard',
    createdBy: 'FA - James Wong',
    createdAt: '2024-03-12',
  },
];

const demoStructuringCases: StructuringCase[] = [
  {
    id: 'sc1',
    clientName: 'Victoria Hartwell',
    title: 'Family Trust Restructuring',
    status: 'in_progress',
    complexity: 'complex',
    assignedFA: 'Sarah Mitchell',
    notes: 'Reviewing tax implications across jurisdictions',
    createdAt: '2024-02-15',
  },
  {
    id: 'sc2',
    clientName: 'Isabella Montenegro',
    title: 'Charitable Foundation Setup',
    status: 'not_started',
    complexity: 'bespoke',
    assignedFA: 'Unassigned',
    notes: 'Client interested in establishing a family foundation',
    createdAt: '2024-03-18',
  },
];

const demoExecutionTickets: ExecutionTicket[] = [
  {
    id: 'et1',
    recommendationId: 'rec2',
    clientName: 'Victoria Hartwell',
    asset: 'PIMCO Investment Grade Credit',
    amount: 350000,
    status: 'processing',
    partner: 'PIMCO',
    createdAt: '2024-03-10',
  },
];

export const useAppStore = create<AppState>((set) => ({
  currentRole: 'rm',
  setCurrentRole: (role) => set({ currentRole: role }),
  
  clients: demoClients,
  blueprints: demoBlueprints,
  recommendations: demoRecommendations,
  structuringCases: demoStructuringCases,
  executionTickets: demoExecutionTickets,
  
  updateBlueprintStatus: (id, status) =>
    set((state) => ({
      blueprints: state.blueprints.map((bp) =>
        bp.id === id ? { ...bp, status, updatedAt: new Date().toISOString().split('T')[0] } : bp
      ),
    })),
    
  updateRecommendationStatus: (id, status) =>
    set((state) => ({
      recommendations: state.recommendations.map((rec) =>
        rec.id === id ? { ...rec, status } : rec
      ),
    })),
    
  updateStructuringStatus: (id, status) =>
    set((state) => ({
      structuringCases: state.structuringCases.map((sc) =>
        sc.id === id ? { ...sc, status } : sc
      ),
    })),
    
  updateExecutionStatus: (id, status) =>
    set((state) => ({
      executionTickets: state.executionTickets.map((et) =>
        et.id === id
          ? { ...et, status, confirmedAt: status === 'confirmed' ? new Date().toISOString() : et.confirmedAt }
          : et
      ),
    })),
    
  createExecutionTicket: (recommendation) =>
    set((state) => ({
      executionTickets: [
        ...state.executionTickets,
        {
          id: `et${Date.now()}`,
          recommendationId: recommendation.id,
          clientName: recommendation.clientName,
          asset: recommendation.asset,
          amount: recommendation.amount,
          status: 'created',
          partner: recommendation.partner,
          createdAt: new Date().toISOString().split('T')[0],
        },
      ],
    })),
}));
