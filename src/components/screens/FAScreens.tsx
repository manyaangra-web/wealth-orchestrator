import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { StatusChip, ProgressBar } from '@/components/ui/StatusChip';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';

export function FADashboardScreen() {
  const { faRequests, setCurrentScreen, clients } = useAppStore();
  const pendingRequests = faRequests.filter((r) => r.status === 'pending');

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="font-serif text-2xl font-semibold">FA Dashboard</h2>

      <div className="space-y-3">
        {pendingRequests.map((req) => {
          const client = clients.find((c) => c.id === req.clientId);
          return (
            <div key={req.id} className="p-4 rounded-xl border border-border bg-card flex items-center justify-between">
              <div>
                <p className="font-medium">{client?.name} — {req.title}</p>
                <p className="text-sm text-muted-foreground">{req.type}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  if (req.type === 'blueprint') setCurrentScreen('blueprint-builder');
                  else if (req.type === 'recommendation') setCurrentScreen('recommendation-drafts');
                  else setCurrentScreen('deal-dossiers');
                }}
              >
                Open
              </Button>
            </div>
          );
        })}
        {pendingRequests.length === 0 && (
          <p className="text-muted-foreground">No pending requests</p>
        )}
      </div>
    </div>
  );
}

export function BlueprintBuilderScreen() {
  const { selectedClient, getClient, getBlueprint, updateFARequestStatus, faRequests } = useAppStore();
  const client = getClient(selectedClient);
  const blueprint = getBlueprint(selectedClient);
  const [scenario, setScenario] = useState('base');
  const [allocations, setAllocations] = useState(
    blueprint.allocationTargets.map((t) => ({ ...t }))
  );
  const [milestoneNotes, setMilestoneNotes] = useState<Record<string, string>>({});
  const [passiveIncome, setPassiveIncome] = useState(blueprint.passiveIncomeTarget || '');

  const handleSubmit = () => {
    const req = faRequests.find((r) => r.clientId === selectedClient && r.type === 'blueprint' && r.status === 'pending');
    if (req) {
      updateFARequestStatus(req.id, 'ready');
    }
    toast.success('Blueprint Draft submitted');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="font-serif text-xl font-semibold">Blueprint v1 — {client.name}</h2>

      {/* Allocation Targets */}
      <div className="p-6 rounded-xl border border-border bg-card space-y-4">
        <h3 className="font-medium">Allocation Targets</h3>
        {allocations.map((alloc, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{alloc.name}</span>
              <span className="font-medium">{alloc.percentage}%</span>
            </div>
            <Slider
              value={[alloc.percentage]}
              onValueChange={(v) => {
                const newAllocs = [...allocations];
                newAllocs[idx].percentage = v[0];
                setAllocations(newAllocs);
              }}
              max={100}
              step={5}
            />
          </div>
        ))}
      </div>

      {/* Scenario Toggle */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="font-medium mb-3">Scenario</h3>
        <div className="flex gap-2">
          {['Base', 'Bull', 'Bear'].map((s) => (
            <Button
              key={s}
              size="sm"
              variant={scenario === s.toLowerCase() ? 'default' : 'outline'}
              onClick={() => setScenario(s.toLowerCase())}
            >
              {s}
            </Button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          {scenario === 'base' && 'Base case assumes moderate growth and stable markets.'}
          {scenario === 'bull' && 'Bull case assumes strong growth and favorable conditions.'}
          {scenario === 'bear' && 'Bear case assumes market downturns and conservative returns.'}
        </p>
      </div>

      {/* Milestone Notes */}
      <div className="p-6 rounded-xl border border-border bg-card space-y-4">
        <h3 className="font-medium">Milestone Notes</h3>
        {['Now', '5Y', '10Y', 'Legacy'].map((period) => (
          <div key={period}>
            <label className="text-sm text-muted-foreground">{period}</label>
            <input
              type="text"
              value={milestoneNotes[period] || ''}
              onChange={(e) => setMilestoneNotes({ ...milestoneNotes, [period]: e.target.value })}
              className="w-full px-3 py-2 mt-1 rounded-lg border border-border bg-background text-sm"
              placeholder={`Notes for ${period}...`}
            />
          </div>
        ))}
      </div>

      {/* Passive Income Target */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <label className="font-medium">Passive Income Target</label>
        <input
          type="text"
          value={passiveIncome}
          onChange={(e) => setPassiveIncome(e.target.value)}
          className="w-full px-3 py-2 mt-2 rounded-lg border border-border bg-background text-sm"
          placeholder="e.g., USD 240K/year"
        />
      </div>

      <Button onClick={handleSubmit}>Submit Blueprint Draft</Button>
    </div>
  );
}

export function DealDossiersScreen() {
  const [selectedDeal, setSelectedDeal] = useState<string | null>(null);

  const dossiers = [
    {
      id: 'd1',
      name: 'Private Credit Yield Fund',
      partner: 'Private Credit Partner',
      terms: '12-18 month lock-in, quarterly distributions',
      ticketSize: 'USD 250K minimum',
      liquidity: 'Quarterly redemption windows',
      eligibility: 'Accredited investors',
      risks: 'Credit risk, liquidity constraints',
      rating: 'A',
    },
    {
      id: 'd2',
      name: 'Tokenized Commercial RE',
      partner: 'Tokenized RE Platform',
      terms: 'Fractional ownership, quarterly windows',
      ticketSize: 'USD 100K minimum',
      liquidity: 'Platform-dependent',
      eligibility: 'UAE/Singapore residents',
      risks: 'Real estate market risk, platform risk',
      rating: 'B+',
    },
    {
      id: 'd3',
      name: 'Global PE Fund Access',
      partner: 'Global PE Partner',
      terms: '7-10 year commitment',
      ticketSize: 'USD 1M minimum',
      liquidity: 'Illiquid',
      eligibility: 'UHNI segment only',
      risks: 'Long lock-in, J-curve effect',
      rating: 'A+',
    },
  ];

  const selected = dossiers.find((d) => d.id === selectedDeal);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        {dossiers.map((dossier) => (
          <div
            key={dossier.id}
            className={`p-4 rounded-xl border bg-card cursor-pointer transition-colors ${
              selectedDeal === dossier.id ? 'border-primary' : 'border-border'
            }`}
            onClick={() => setSelectedDeal(dossier.id)}
          >
            <h3 className="font-medium">{dossier.name}</h3>
            <p className="text-sm text-muted-foreground">{dossier.partner}</p>
          </div>
        ))}
      </div>

      {selected && (
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="font-serif text-lg font-semibold mb-4">{selected.name}</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Terms</span>
              <p className="font-medium">{selected.terms}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Ticket Size</span>
              <p className="font-medium">{selected.ticketSize}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Liquidity</span>
              <p className="font-medium">{selected.liquidity}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Eligibility</span>
              <p className="font-medium">{selected.eligibility}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Risks</span>
              <p className="font-medium">{selected.risks}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Internal Rating</span>
              <p className="font-medium">{selected.rating}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function RecommendationDraftsScreen() {
  const { selectedClient, getClientRecommendations, faRequests, updateFARequestStatus } = useAppStore();
  const recommendations = getClientRecommendations(selectedClient);

  const handleSubmit = () => {
    const req = faRequests.find((r) => r.clientId === selectedClient && r.type === 'recommendation' && r.status === 'pending');
    if (req) {
      updateFARequestStatus(req.id, 'ready');
    }
    toast.success('Recommendation Draft submitted');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="font-serif text-lg font-semibold mb-4">Draft Recommendation Pack</h3>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="p-4 rounded-lg bg-muted/50">
              <div className="flex justify-between">
                <span className="font-medium">{rec.name}</span>
                <span className="text-sm text-muted-foreground">{rec.amount}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{rec.rationale}</p>
            </div>
          ))}
        </div>
      </div>
      <Button onClick={handleSubmit}>Submit Recommendation Draft</Button>
    </div>
  );
}

export function QAChecklistScreen() {
  const [items, setItems] = useState([
    { id: 'qa1', label: 'Eligibility rules validated (country/residency)', checked: false },
    { id: 'qa2', label: 'Risk band fit confirmed', checked: false },
    { id: 'qa3', label: 'Concentration limits checked', checked: false },
    { id: 'qa4', label: 'Liquidity mix checked', checked: false },
    { id: 'qa5', label: 'Rationale and disclosures added', checked: false },
  ]);

  const toggle = (id: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)));
  };

  const allChecked = items.every((i) => i.checked);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="font-serif text-lg font-semibold mb-4">QA Checklist</h3>
        <div className="space-y-3">
          {items.map((item) => (
            <label key={item.id} className="flex items-center gap-3 cursor-pointer">
              <Checkbox checked={item.checked} onCheckedChange={() => toggle(item.id)} />
              <span className={item.checked ? 'text-muted-foreground line-through' : ''}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>
      <Button disabled={!allChecked} onClick={() => toast.success('QA Complete')}>
        Mark QA Complete
      </Button>
    </div>
  );
}
