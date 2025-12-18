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
    <div className="max-w-2xl mx-auto space-y-6 px-4">
      <div className="card-elevated p-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center">
            <span className="text-gold font-bold">FA</span>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-foreground">FA Dashboard</h2>
            <p className="text-sm text-muted-foreground">Financial Advisor Workbench</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-gold uppercase tracking-wider">Pending Requests</h3>
        {pendingRequests.length === 0 ? (
          <div className="card-premium p-8 text-center">
            <p className="text-sm text-muted-foreground">No pending requests</p>
          </div>
        ) : (
          pendingRequests.map((req) => {
            const client = clients.find((c) => c.id === req.clientId);
            return (
              <div key={req.id} className="card-elevated p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-gold-muted flex items-center justify-center">
                    <span className="text-gold font-semibold text-sm">{client?.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{client?.name} — {req.title}</p>
                    <p className="text-xs text-gold font-medium capitalize">{req.type}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (req.type === 'blueprint') setCurrentScreen('blueprint-builder');
                    else if (req.type === 'recommendation') setCurrentScreen('recommendation-drafts');
                    else setCurrentScreen('deal-dossiers');
                  }}
                  className="border-navy/20 text-navy hover:bg-navy-muted"
                >
                  Open
                </Button>
              </div>
            );
          })
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
    <div className="max-w-2xl mx-auto space-y-6 px-4">
      <div className="card-elevated p-6">
        <h2 className="font-serif text-2xl font-semibold text-foreground">Blueprint v1 — {client.name}</h2>
      </div>

      {/* Allocation Targets */}
      <div className="card-premium p-6 space-y-5">
        <h3 className="font-semibold text-foreground text-lg">Allocation Targets</h3>
        {allocations.map((alloc, idx) => (
          <div key={idx} className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-foreground font-medium">{alloc.name}</span>
              <span className="font-bold text-navy">{alloc.percentage}%</span>
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
              className="[&_[role=slider]]:bg-gold [&_[role=slider]]:border-gold [&_.bg-primary]:bg-gradient-to-r [&_.bg-primary]:from-gold [&_.bg-primary]:to-gold-light"
            />
          </div>
        ))}
      </div>

      {/* Scenario Toggle */}
      <div className="card-elevated p-6">
        <h3 className="font-semibold text-foreground text-lg mb-4">Scenario</h3>
        <div className="flex gap-2">
          {['Base', 'Bull', 'Bear'].map((s) => (
            <Button
              key={s}
              size="sm"
              variant={scenario === s.toLowerCase() ? 'default' : 'outline'}
              onClick={() => setScenario(s.toLowerCase())}
              className={scenario === s.toLowerCase() 
                ? 'bg-navy text-gold hover:bg-navy-light' 
                : 'border-border text-foreground hover:bg-muted'}
            >
              {s}
            </Button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-4 p-3 rounded-lg bg-muted/30">
          {scenario === 'base' && 'Base case assumes moderate growth and stable markets.'}
          {scenario === 'bull' && 'Bull case assumes strong growth and favorable conditions.'}
          {scenario === 'bear' && 'Bear case assumes market downturns and conservative returns.'}
        </p>
      </div>

      {/* Milestone Notes */}
      <div className="card-premium p-6 space-y-5">
        <h3 className="font-semibold text-foreground text-lg">Milestone Notes</h3>
        {['Now', '5Y', '10Y', 'Legacy'].map((period) => (
          <div key={period}>
            <label className="text-xs text-gold font-semibold uppercase tracking-wide">{period}</label>
            <input
              type="text"
              value={milestoneNotes[period] || ''}
              onChange={(e) => setMilestoneNotes({ ...milestoneNotes, [period]: e.target.value })}
              className="w-full px-4 py-3 mt-2 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all"
              placeholder={`Notes for ${period}...`}
            />
          </div>
        ))}
      </div>

      {/* Passive Income Target */}
      <div className="card-elevated p-6">
        <label className="font-semibold text-foreground text-lg block mb-3">Passive Income Target</label>
        <input
          type="text"
          value={passiveIncome}
          onChange={(e) => setPassiveIncome(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all"
          placeholder="e.g., USD 240K/year"
        />
      </div>

      <Button onClick={handleSubmit} className="bg-gold hover:bg-gold-light text-navy font-semibold">
        Submit Blueprint Draft
      </Button>
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
    <div className="max-w-3xl mx-auto space-y-6 px-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dossiers.map((dossier) => (
          <div
            key={dossier.id}
            className={`card-elevated p-5 cursor-pointer transition-all ${
              selectedDeal === dossier.id ? 'ring-2 ring-gold border-gold' : 'hover:border-navy/30'
            }`}
            onClick={() => setSelectedDeal(dossier.id)}
          >
            <h3 className="font-semibold text-foreground text-sm">{dossier.name}</h3>
            <p className="text-xs text-gold font-medium mt-1">{dossier.partner}</p>
          </div>
        ))}
      </div>

      {selected && (
        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-xl font-semibold text-foreground">{selected.name}</h3>
            <span className="px-3 py-1 rounded-full bg-gold-muted text-gold text-sm font-bold">
              Rating: {selected.rating}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Terms', value: selected.terms },
              { label: 'Ticket Size', value: selected.ticketSize },
              { label: 'Liquidity', value: selected.liquidity },
              { label: 'Eligibility', value: selected.eligibility },
              { label: 'Risks', value: selected.risks },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-muted/30 border border-border/50">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">{item.label}</span>
                <p className="text-sm font-medium text-foreground mt-1">{item.value}</p>
              </div>
            ))}
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
    <div className="max-w-2xl mx-auto space-y-6 px-4">
      <div className="card-elevated p-6">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-5">Draft Recommendation Pack</h3>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="p-4 rounded-xl bg-gradient-to-r from-navy-muted to-gold-muted/20 border border-navy/10">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-semibold text-foreground">{rec.name}</span>
                <span className="text-xs font-bold text-navy bg-navy-muted px-2 py-1 rounded">{rec.amount}</span>
              </div>
              <p className="text-xs text-muted-foreground">{rec.rationale}</p>
            </div>
          ))}
        </div>
      </div>
      <Button onClick={handleSubmit} className="bg-gold hover:bg-gold-light text-navy font-semibold">
        Submit Recommendation Draft
      </Button>
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
  const progress = (items.filter((i) => i.checked).length / items.length) * 100;

  return (
    <div className="max-w-xl mx-auto space-y-6 px-4">
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-serif text-xl font-semibold text-foreground">QA Checklist</h3>
          <span className="text-lg font-bold text-gold">{Math.round(progress)}%</span>
        </div>
        <ProgressBar progress={progress} className="mb-6" />
        <div className="space-y-4">
          {items.map((item) => (
            <label key={item.id} className="flex items-center gap-4 cursor-pointer p-3 rounded-lg hover:bg-muted/30 transition-colors">
              <Checkbox 
                checked={item.checked} 
                onCheckedChange={() => toggle(item.id)}
                className="border-navy data-[state=checked]:bg-gold data-[state=checked]:border-gold"
              />
              <span className={`text-sm ${item.checked ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>
      <Button 
        disabled={!allChecked} 
        onClick={() => toast.success('QA Complete')}
        className="bg-gold hover:bg-gold-light text-navy font-semibold disabled:opacity-50"
      >
        Mark QA Complete
      </Button>
    </div>
  );
}