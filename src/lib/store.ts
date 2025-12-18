import { create } from 'zustand';

// Types
export type UserRole = 'client' | 'rm' | 'fa' | 'admin';
export type ClientId = 'client-a' | 'client-b';
export type BlueprintStatus = 'draft' | 'active';
export type RecommendationStatus = 'draft' | 'client-approved' | 'executing' | 'confirmed';
export type StructuringStatus = 'not-started' | 'in-progress' | 'completed';
export type ExecutionStatus = 'created' | 'submitted' | 'processing' | 'confirmed';

export interface Client {
  id: ClientId;
  name: string;
  segment: string;
  base: string;
  netWorth: string;
  riskBand: string;
  primaryGoals: string;
  liquidityNeed: string;
  timeHorizon: string;
  rm: string;
  lastReview: string;
  nextReview: string;
}

export interface Blueprint {
  clientId: ClientId;
  status: BlueprintStatus;
  horizon: string;
  objective?: string;
  passiveIncomeTarget?: string;
  allocationTargets: { name: string; percentage: number }[];
  milestones: { period: string; description: string }[];
}

export interface Recommendation {
  id: string;
  clientId: ClientId;
  name: string;
  partner: string;
  amount: string;
  liquidity: string;
  rationale: string;
  structuringNeeded: string;
  status: RecommendationStatus;
}

export interface StructuringCase {
  id: string;
  clientId: ClientId;
  recommendationId: string;
  name: string;
  checklistTitle: string;
  checklistItems: { id: string; label: string; checked: boolean }[];
  status: StructuringStatus;
}

export interface ExecutionTicket {
  id: string;
  clientId: ClientId;
  recommendationId: string;
  name: string;
  partner: string;
  status: ExecutionStatus;
}

export interface FARequest {
  id: string;
  clientId: ClientId;
  type: 'blueprint' | 'recommendation' | 'structuring';
  status: 'pending' | 'ready' | 'approved';
  title: string;
}

export interface Message {
  id: string;
  clientId: ClientId;
  sender: 'rm' | 'client';
  text: string;
  timestamp: string;
}

export interface OnboardingItem {
  id: string;
  clientId: ClientId;
  label: string;
  checked: boolean;
}

// Demo Data
const clientA: Client = {
  id: 'client-a',
  name: 'Arjun Mehta',
  segment: 'HNI Founder',
  base: 'India + Dubai',
  netWorth: 'USD 8.0M',
  riskBand: 'Moderate',
  primaryGoals: 'Passive income, diversification, liquidity for future move',
  liquidityNeed: 'Medium (potential move in 12–18 months)',
  timeHorizon: '5–15 years',
  rm: 'Riya Kapoor',
  lastReview: '15 Nov 2025',
  nextReview: '15 Feb 2026',
};

const clientB: Client = {
  id: 'client-b',
  name: 'Mehta Family Office',
  segment: 'UHNI Family (multi-generational)',
  base: 'India + Singapore exposure',
  netWorth: 'USD 35.0M',
  riskBand: 'Balanced (with long lock-in tolerance)',
  primaryGoals: 'Legacy planning, PE exposure, estate structuring',
  liquidityNeed: 'Low (long-term allocations)',
  timeHorizon: '10–20 years',
  rm: 'Riya Kapoor',
  lastReview: '01 Dec 2025',
  nextReview: '01 Mar 2026',
};

const defaultBlueprints: Blueprint[] = [
  {
    clientId: 'client-a',
    status: 'draft',
    horizon: '10 years (review annually)',
    passiveIncomeTarget: 'USD 240K/year',
    allocationTargets: [
      { name: 'Private Credit', percentage: 30 },
      { name: 'Global Equities', percentage: 35 },
      { name: 'Alternatives', percentage: 15 },
      { name: 'Tokenized Real Estate', percentage: 15 },
      { name: 'Cash Buffer', percentage: 5 },
    ],
    milestones: [
      { period: 'Now', description: 'Stabilize liquidity + start yield strategy' },
      { period: '5 Years', description: 'Diversified global income + RE exposure' },
      { period: '10 Years', description: 'Compounding + legacy readiness' },
      { period: 'Legacy', description: 'Optional structure for next generation' },
    ],
  },
  {
    clientId: 'client-b',
    status: 'active',
    horizon: '15 years (review annually)',
    objective: 'Legacy-ready structure + institutional private markets exposure',
    allocationTargets: [
      { name: 'Private Equity', percentage: 35 },
      { name: 'Alternatives', percentage: 20 },
      { name: 'Global Equities', percentage: 20 },
      { name: 'Real Assets', percentage: 15 },
      { name: 'Cash Buffer', percentage: 10 },
    ],
    milestones: [
      { period: 'Now', description: 'Estate structure + PE pipeline' },
      { period: '5 Years', description: 'Diversified private markets + governance cadence' },
      { period: '10 Years', description: 'Cross-generational allocation stability' },
      { period: 'Legacy', description: 'Trust/estate mechanisms operating smoothly' },
    ],
  },
];

const defaultRecommendations: Recommendation[] = [
  {
    id: 'rec-a1',
    clientId: 'client-a',
    name: 'Private Credit Allocation',
    partner: 'Private Credit Partner',
    amount: 'USD 750K',
    liquidity: 'Medium lock-in (12–18 months)',
    rationale: 'Yield-first allocation aligned to passive income target',
    structuringNeeded: 'Cross-border onboarding + subscription documentation',
    status: 'draft',
  },
  {
    id: 'rec-a2',
    clientId: 'client-a',
    name: 'Tokenized Real Estate Tranche',
    partner: 'Tokenized RE Platform',
    amount: 'USD 300K',
    liquidity: 'Quarterly window (platform dependent)',
    rationale: 'Diversify into real assets with smaller ticket size',
    structuringNeeded: 'Platform onboarding + risk acknowledgement + subscription docs',
    status: 'draft',
  },
  {
    id: 'rec-a3',
    clientId: 'client-a',
    name: 'Global Equities Bucket',
    partner: 'Partner A',
    amount: 'USD 500K',
    liquidity: 'High',
    rationale: 'Long-term growth engine to balance yield-heavy allocation',
    structuringNeeded: 'Account opening + KYC pack',
    status: 'draft',
  },
  {
    id: 'rec-b1',
    clientId: 'client-b',
    name: 'Private Equity Access',
    partner: 'Global PE Partner',
    amount: 'USD 2.5M commitment',
    liquidity: 'Lock-in: 7–10 years',
    rationale: 'Core long-horizon compounding exposure aligned to family mandate',
    structuringNeeded: 'Trust/entity review + subscription pack + sign-offs',
    status: 'client-approved',
  },
  {
    id: 'rec-b2',
    clientId: 'client-b',
    name: 'Trust & Estate Workflow',
    partner: 'Partner A',
    amount: 'Scope: Trust structuring + governance setup',
    liquidity: 'N/A',
    rationale: 'Ensure generational transfer mechanisms and control structures',
    structuringNeeded: 'Entity/trust documentation + approvals + sign-offs',
    status: 'client-approved',
  },
  {
    id: 'rec-b3',
    clientId: 'client-b',
    name: 'Diversified Alternatives Sleeve',
    partner: 'Partner A',
    amount: 'USD 1.0M',
    liquidity: 'Lock-in: 3–5 years blended',
    rationale: 'Diversify away from public market concentration',
    structuringNeeded: 'Investment policy approval + subscription docs',
    status: 'client-approved',
  },
];

const defaultStructuringCases: StructuringCase[] = [
  {
    id: 'sc-a1',
    clientId: 'client-a',
    recommendationId: 'rec-a1',
    name: 'Private Credit Allocation — Arjun Mehta',
    checklistTitle: 'Cross-Border Participation — India + Dubai',
    checklistItems: [
      { id: 'sc-a1-1', label: 'Identity & residency documents collected', checked: false },
      { id: 'sc-a1-2', label: 'Tax residency declaration completed', checked: false },
      { id: 'sc-a1-3', label: 'Risk disclosures acknowledged', checked: false },
      { id: 'sc-a1-4', label: 'Subscription documents prepared', checked: false },
      { id: 'sc-a1-5', label: 'Funding source confirmation captured', checked: false },
      { id: 'sc-a1-6', label: 'Partner account opened (where needed)', checked: false },
    ],
    status: 'not-started',
  },
  {
    id: 'sc-b1',
    clientId: 'client-b',
    recommendationId: 'rec-b1',
    name: 'Private Equity Access — Mehta Family Office',
    checklistTitle: 'Trust / Entity Setup — Multi-Generational',
    checklistItems: [
      { id: 'sc-b1-1', label: 'Family governance inputs captured', checked: true },
      { id: 'sc-b1-2', label: 'Trust/Entity structure drafted', checked: true },
      { id: 'sc-b1-3', label: 'Legal review completed', checked: false },
      { id: 'sc-b1-4', label: 'Signatories and powers defined', checked: false },
      { id: 'sc-b1-5', label: 'Documentation packet finalized', checked: false },
      { id: 'sc-b1-6', label: 'Final approvals and sign-offs captured', checked: false },
    ],
    status: 'in-progress',
  },
];

const defaultExecutionTickets: ExecutionTicket[] = [
  {
    id: 'et-a1',
    clientId: 'client-a',
    recommendationId: 'rec-a1',
    name: 'Private Credit Allocation',
    partner: 'Private Credit Partner',
    status: 'created',
  },
  {
    id: 'et-b1',
    clientId: 'client-b',
    recommendationId: 'rec-b1',
    name: 'Private Equity Access',
    partner: 'Global PE Partner',
    status: 'processing',
  },
];

const defaultOnboardingItems: OnboardingItem[] = [
  { id: 'ob-a1', clientId: 'client-a', label: 'Identity documents received', checked: true },
  { id: 'ob-a2', clientId: 'client-a', label: 'Residency proof received', checked: true },
  { id: 'ob-a3', clientId: 'client-a', label: 'Risk profiling completed', checked: false },
  { id: 'ob-a4', clientId: 'client-a', label: 'Liquidity goals captured', checked: false },
  { id: 'ob-a5', clientId: 'client-a', label: 'Consent captured', checked: false },
  { id: 'ob-b1', clientId: 'client-b', label: 'Identity documents received', checked: true },
  { id: 'ob-b2', clientId: 'client-b', label: 'Residency proof received', checked: true },
  { id: 'ob-b3', clientId: 'client-b', label: 'Risk profiling completed', checked: true },
  { id: 'ob-b4', clientId: 'client-b', label: 'Liquidity goals captured', checked: true },
  { id: 'ob-b5', clientId: 'client-b', label: 'Consent captured', checked: true },
];

const defaultMessages: Message[] = [
  {
    id: 'msg-1',
    clientId: 'client-a',
    sender: 'rm',
    text: 'Sharing your Wealth Blueprint. Please review and confirm if you\'d like us to activate it.',
    timestamp: '10:30 AM',
  },
  {
    id: 'msg-2',
    clientId: 'client-a',
    sender: 'client',
    text: 'Reviewed. I have a few questions on liquidity and the next steps.',
    timestamp: '11:45 AM',
  },
  {
    id: 'msg-3',
    clientId: 'client-b',
    sender: 'rm',
    text: 'Sharing your Wealth Blueprint. Please review and confirm if you\'d like us to activate it.',
    timestamp: '09:00 AM',
  },
  {
    id: 'msg-4',
    clientId: 'client-b',
    sender: 'client',
    text: 'Reviewed. I have a few questions on liquidity and the next steps.',
    timestamp: '02:30 PM',
  },
];

const defaultFARequests: FARequest[] = [
  { id: 'fa-1', clientId: 'client-a', type: 'blueprint', status: 'pending', title: 'Blueprint Draft requested by RM' },
  { id: 'fa-2', clientId: 'client-b', type: 'structuring', status: 'pending', title: 'Structuring Guidance requested by RM' },
  { id: 'fa-3', clientId: 'client-a', type: 'recommendation', status: 'pending', title: 'Recommendation Draft due' },
];

interface AppState {
  // Current selections
  currentRole: UserRole;
  selectedClient: ClientId;
  currentScreen: string;
  
  // Data
  clients: Client[];
  blueprints: Blueprint[];
  recommendations: Recommendation[];
  structuringCases: StructuringCase[];
  executionTickets: ExecutionTicket[];
  onboardingItems: OnboardingItem[];
  messages: Message[];
  faRequests: FARequest[];
  
  // Actions
  setCurrentRole: (role: UserRole) => void;
  setSelectedClient: (clientId: ClientId) => void;
  setCurrentScreen: (screen: string) => void;
  
  // State updates
  updateBlueprintStatus: (clientId: ClientId, status: BlueprintStatus) => void;
  updateRecommendationStatus: (id: string, status: RecommendationStatus) => void;
  updateStructuringStatus: (id: string, status: StructuringStatus) => void;
  updateExecutionStatus: (id: string, status: ExecutionStatus) => void;
  toggleChecklistItem: (caseId: string, itemId: string) => void;
  toggleOnboardingItem: (itemId: string) => void;
  addMessage: (clientId: ClientId, sender: 'rm' | 'client', text: string) => void;
  updateFARequestStatus: (id: string, status: FARequest['status']) => void;
  createFARequest: (clientId: ClientId, type: FARequest['type'], title: string) => void;
  
  // Demo reset
  resetDemo: () => void;
  
  // Helpers
  getClient: (clientId: ClientId) => Client;
  getBlueprint: (clientId: ClientId) => Blueprint;
  getClientRecommendations: (clientId: ClientId) => Recommendation[];
  getClientStructuringCases: (clientId: ClientId) => StructuringCase[];
  getClientExecutionTickets: (clientId: ClientId) => ExecutionTicket[];
}

export const useAppStore = create<AppState>((set, get) => ({
  currentRole: 'rm',
  selectedClient: 'client-a',
  currentScreen: 'landing',
  
  clients: [clientA, clientB],
  blueprints: JSON.parse(JSON.stringify(defaultBlueprints)),
  recommendations: JSON.parse(JSON.stringify(defaultRecommendations)),
  structuringCases: JSON.parse(JSON.stringify(defaultStructuringCases)),
  executionTickets: JSON.parse(JSON.stringify(defaultExecutionTickets)),
  onboardingItems: JSON.parse(JSON.stringify(defaultOnboardingItems)),
  messages: JSON.parse(JSON.stringify(defaultMessages)),
  faRequests: JSON.parse(JSON.stringify(defaultFARequests)),
  
  setCurrentRole: (role) => set({ currentRole: role }),
  setSelectedClient: (clientId) => set({ selectedClient: clientId }),
  setCurrentScreen: (screen) => set({ currentScreen: screen }),
  
  updateBlueprintStatus: (clientId, status) =>
    set((state) => ({
      blueprints: state.blueprints.map((bp) =>
        bp.clientId === clientId ? { ...bp, status } : bp
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
        et.id === id ? { ...et, status } : et
      ),
    })),
    
  toggleChecklistItem: (caseId, itemId) =>
    set((state) => ({
      structuringCases: state.structuringCases.map((sc) =>
        sc.id === caseId
          ? {
              ...sc,
              checklistItems: sc.checklistItems.map((item) =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
              ),
            }
          : sc
      ),
    })),
    
  toggleOnboardingItem: (itemId) =>
    set((state) => ({
      onboardingItems: state.onboardingItems.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      ),
    })),
    
  addMessage: (clientId, sender, text) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: `msg-${Date.now()}`,
          clientId,
          sender,
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    })),
    
  updateFARequestStatus: (id, status) =>
    set((state) => ({
      faRequests: state.faRequests.map((req) =>
        req.id === id ? { ...req, status } : req
      ),
    })),
    
  createFARequest: (clientId, type, title) =>
    set((state) => ({
      faRequests: [
        ...state.faRequests,
        { id: `fa-${Date.now()}`, clientId, type, status: 'pending', title },
      ],
    })),
    
  resetDemo: () =>
    set({
      blueprints: JSON.parse(JSON.stringify(defaultBlueprints)),
      recommendations: JSON.parse(JSON.stringify(defaultRecommendations)),
      structuringCases: JSON.parse(JSON.stringify(defaultStructuringCases)),
      executionTickets: JSON.parse(JSON.stringify(defaultExecutionTickets)),
      onboardingItems: JSON.parse(JSON.stringify(defaultOnboardingItems)),
      messages: JSON.parse(JSON.stringify(defaultMessages)),
      faRequests: JSON.parse(JSON.stringify(defaultFARequests)),
    }),
    
  getClient: (clientId) => get().clients.find((c) => c.id === clientId)!,
  getBlueprint: (clientId) => get().blueprints.find((bp) => bp.clientId === clientId)!,
  getClientRecommendations: (clientId) => get().recommendations.filter((r) => r.clientId === clientId),
  getClientStructuringCases: (clientId) => get().structuringCases.filter((sc) => sc.clientId === clientId),
  getClientExecutionTickets: (clientId) => get().executionTickets.filter((et) => et.clientId === clientId),
}));
