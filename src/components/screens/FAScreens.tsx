import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { StatusChip, ProgressBar } from '@/components/ui/StatusChip';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } }
};
const cardHover = {
  rest: { scale: 1 },
  hover: { scale: 1.03, boxShadow: '0 4px 24px rgba(218,165,32,0.12)' }
};

export function FADashboardScreen() {
  const { faRequests, setCurrentScreen, clients } = useAppStore();
  const pendingRequests = faRequests.filter((r) => r.status === 'pending');

  return (
    <motion.div
      {...fadeInUp}
      className="max-w-2xl mx-auto space-y-8 px-4"
    >
      <motion.div
        {...fadeInUp}
        className="card-elevated p-6 bg-gradient-to-br from-navy via-navy-light to-navy-muted shadow-lg"
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="h-12 w-12 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow"
            whileHover={{ scale: 1.08, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-navy font-bold">FA</span>
          </motion.div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-gold">FA Dashboard</h2>
            <p className="text-sm text-gold-muted">Financial Advisor Workbench</p>
          </div>
        </div>
      </motion.div>

      <motion.div {...fadeInUp} className="space-y-4">
        <h3 className="text-xs font-semibold text-gold uppercase tracking-wider">Pending Requests</h3>
        <AnimatePresence>
          {pendingRequests.length === 0 ? (
            <motion.div
              {...fadeInUp}
              className="card-premium p-8 text-center bg-gradient-to-br from-muted/30 to-gold-muted/10"
            >
              <p className="text-sm text-muted-foreground">No pending requests</p>
            </motion.div>
          ) : (
            pendingRequests.map((req, idx) => {
              const client = clients.find((c) => c.id === req.clientId);
              return (
                <motion.div
                  key={req.id}
                  {...fadeInUp}
                  variants={cardHover}
                  initial="rest"
                  whileHover="hover"
                  className="card-elevated p-5 flex items-center justify-between shadow transition-all duration-300 bg-gradient-to-r from-navy-muted/40 to-gold-muted/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gold-muted flex items-center justify-center">
                      <span className="text-gold font-semibold text-sm">{client?.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{client?.name} — {req.title}</p>
                      <p className="text-xs text-gold font-medium capitalize">{req.type}</p>
                    </div>
                  </div>
                  <motion.div whileHover={{ scale: 1.08 }}>
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
                  </motion.div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
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
    <motion.div
      {...fadeInUp}
      className="max-w-2xl mx-auto space-y-8 px-4"
    >
      {/* Header */}
      <motion.div
        {...fadeInUp}
        className="card-elevated p-6 bg-gradient-to-br from-navy via-navy-light to-navy-muted shadow-lg"
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="h-12 w-12 rounded-2xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow"
            whileHover={{ scale: 1.08, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-navy font-bold text-xl">{client.name.charAt(0)}</span>
          </motion.div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-gold">Blueprint v1 — {client.name}</h2>
            <p className="text-sm text-gold-muted">Draft and adjust client blueprint</p>
          </div>
        </div>
      </motion.div>

      {/* Allocation Targets */}
      <motion.div
        {...fadeInUp}
        className="card-premium p-6 space-y-5 gold-accent-animated shadow"
      >
        <h3 className="font-semibold text-gold text-lg mb-2">Allocation Targets</h3>
        {allocations.map((alloc, idx) => (
          <motion.div
            key={idx}
            {...fadeInUp}
            variants={cardHover}
            initial="rest"
            whileHover="hover"
            className="space-y-3 p-4 rounded-xl bg-gradient-to-r from-navy-muted/20 to-gold-muted/10 border border-gold/10 transition-all"
          >
            <div className="flex justify-between items-center text-sm">
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
          </motion.div>
        ))}
      </motion.div>

      {/* Scenario Toggle */}
      <motion.div
        {...fadeInUp}
        className="card-elevated p-6 shadow bg-gradient-to-br from-navy-muted/30 to-gold-muted/10"
      >
        <h3 className="font-semibold text-navy text-lg mb-4">Scenario</h3>
        <div className="flex gap-2">
          {['Base', 'Bull', 'Bear'].map((s) => (
            <motion.button
              key={s}
              type="button"
              onClick={() => setScenario(s.toLowerCase())}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                scenario === s.toLowerCase()
                  ? 'bg-gold text-navy shadow scale-105'
                  : 'bg-card text-foreground border border-border hover:bg-gold/10'
              }`}
              whileHover={{ scale: scenario === s.toLowerCase() ? 1.08 : 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {s}
            </motion.button>
          ))}
        </div>
        <motion.p
          {...fadeInUp}
          className="text-sm text-muted-foreground mt-4 p-3 rounded-lg bg-muted/30"
        >
          {scenario === 'base' && 'Base case assumes moderate growth and stable markets.'}
          {scenario === 'bull' && 'Bull case assumes strong growth and favorable conditions.'}
          {scenario === 'bear' && 'Bear case assumes market downturns and conservative returns.'}
        </motion.p>
      </motion.div>

      {/* Milestone Notes */}
      <motion.div
        {...fadeInUp}
        className="card-premium p-6 space-y-5 gold-accent-animated shadow"
      >
        <h3 className="font-semibold text-gold text-lg">Milestone Notes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['Now', '5Y', '10Y', 'Legacy'].map((period, i) => (
            <motion.div
              key={period}
              {...fadeInUp}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex flex-col gap-2"
            >
              <label className="text-xs text-gold font-semibold uppercase tracking-wide">{period}</label>
              <input
                type="text"
                value={milestoneNotes[period] || ''}
                onChange={(e) => setMilestoneNotes({ ...milestoneNotes, [period]: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gold/30 bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all"
                placeholder={`Notes for ${period}...`}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Passive Income Target */}
      <motion.div
        {...fadeInUp}
        className="card-elevated p-6 shadow bg-gradient-to-br from-navy-muted/20 to-gold-muted/10"
      >
        <label className="font-semibold text-navy text-lg block mb-3">Passive Income Target</label>
        <input
          type="text"
          value={passiveIncome}
          onChange={(e) => setPassiveIncome(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gold/30 bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all"
          placeholder="e.g., USD 240K/year"
        />
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }}>
        <Button onClick={handleSubmit} className="bg-gold hover:bg-gold-light text-navy font-semibold shadow">
          Submit Blueprint Draft
        </Button>
      </motion.div>
    </motion.div>
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
    <motion.div
      {...fadeInUp}
      className="max-w-3xl mx-auto space-y-8 px-4"
    >
      <motion.div
        {...fadeInUp}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {dossiers.map((dossier, idx) => (
          <motion.div
            key={dossier.id}
            {...fadeInUp}
            variants={cardHover}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            transition={{ delay: idx * 0.05, duration: 0.4 }}
            className={`card-elevated p-6 cursor-pointer transition-all duration-300 border-2 ${
              selectedDeal === dossier.id
                ? 'ring-2 ring-gold border-gold bg-gradient-to-br from-gold/10 to-navy-muted/10 scale-105 shadow-lg'
                : 'hover:border-navy/30 border-transparent bg-gradient-to-br from-navy-muted/10 to-gold-muted/10'
            }`}
            onClick={() => setSelectedDeal(dossier.id)}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="h-8 w-8 rounded-full bg-gold-muted flex items-center justify-center text-gold font-bold text-lg shadow">
                {dossier.name.charAt(0)}
              </span>
              <h3 className="font-semibold text-foreground text-base">{dossier.name}</h3>
            </div>
            <p className="text-xs text-gold font-medium mb-2">{dossier.partner}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-1 rounded-full bg-navy-muted text-navy text-xs font-bold">
                {dossier.rating}
              </span>
              <span className="text-xs text-muted-foreground">{dossier.ticketSize}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.id}
            {...fadeInUp}
            exit={{ opacity: 0, y: -30, transition: { duration: 0.3 } }}
            className="card-premium p-8 shadow-lg bg-gradient-to-br from-gold-muted/20 to-navy-muted/10"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl font-semibold text-gold">{selected.name}</h3>
              <span className="px-4 py-1 rounded-full bg-gold-muted text-gold text-base font-bold shadow">
                Rating: {selected.rating}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                label: 'Partner',
                value: selected.partner
              },
              {
                label: 'Terms',
                value: selected.terms
              },
              {
                label: 'Ticket Size',
                value: selected.ticketSize
              },
              {
                label: 'Liquidity',
                value: selected.liquidity
              },
              {
                label: 'Eligibility',
                value: selected.eligibility
              },
              {
                label: 'Risks',
                value: selected.risks
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                {...fadeInUp}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="p-4 rounded-xl bg-gradient-to-r from-navy-muted/20 to-gold-muted/10 border border-gold/10 mb-2"
              >
                <span className="text-xs text-gold font-semibold uppercase tracking-wide">{item.label}</span>
                <p className="text-sm font-medium text-foreground mt-1">{item.value}</p>
              </motion.div>
            ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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
    <motion.div
      {...fadeInUp}
      className="max-w-2xl mx-auto space-y-8 px-4"
    >
      <motion.div
        {...fadeInUp}
        className="card-elevated p-6 bg-gradient-to-br from-white via-muted to-white shadow-lg"
      >
        <h3 className="font-serif text-2xl font-semibold text-navy mb-6">Draft Recommendation Pack</h3>
        <div className="space-y-5">
          <AnimatePresence>
            {recommendations.map((rec, idx) => (
              <motion.div
                key={rec.id}
                {...fadeInUp}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="p-5 rounded-xl bg-gradient-to-r from-white to-muted border border-border shadow flex flex-col gap-2 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-base font-semibold text-foreground">{rec.name}</span>
                  <span className="text-xs font-bold text-navy bg-muted px-3 py-1 rounded-full shadow">{rec.amount}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-muted-foreground">{rec.partner}</span>
                  {rec.status && (
                    <StatusChip status={rec.status} />
                  )}
                </div>
                <p className="text-sm text-foreground">{rec.rationale}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }}>
        <Button onClick={handleSubmit} className="bg-gold hover:bg-gold-light text-navy font-semibold shadow">
          Submit Recommendation Draft
        </Button>
      </motion.div>
    </motion.div>
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
    <motion.div
      {...fadeInUp}
      className="max-w-xl mx-auto space-y-8 px-4"
    >
      <motion.div
        {...fadeInUp}
        className="card-elevated p-8 bg-gradient-to-br from-white via-muted to-white shadow-lg"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-serif text-2xl font-bold text-navy flex items-center gap-3">
            <span className="inline-block h-6 w-6 rounded-full bg-gold flex items-center justify-center text-gold font-bold">QA</span>
            QA Checklist
          </h3>
          <span className="text-2xl font-bold text-gold">{Math.round(progress)}%</span>
        </div>
        <ProgressBar progress={progress} className="mb-8 h-3" />
        <div className="space-y-4">
          <AnimatePresence>
            {items.map((item, idx) => (
              <motion.label
                key={item.id}
                {...fadeInUp}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className={`flex items-center gap-4 cursor-pointer p-4 rounded-xl border border-border bg-gradient-to-r from-white to-muted/30 transition-all group ${
                  item.checked ? 'opacity-70' : ''
                }`}
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Checkbox
                    checked={item.checked}
                    onCheckedChange={() => toggle(item.id)}
                    className="border-navy data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                  />
                </motion.div>
                <span className={`text-base transition-all duration-300 ${
                  item.checked
                    ? 'text-muted-foreground line-through'
                    : 'text-foreground group-hover:text-navy'
                }`}>
                  {item.label}
                </span>
                {item.checked && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="ml-auto"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  </motion.div>
                )}
              </motion.label>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
      <motion.div whileHover={{ scale: allChecked ? 1.05 : 1 }}>
        <Button
          disabled={!allChecked}
          onClick={() => toast.success('QA Complete')}
          className="bg-gold hover:bg-gold-light text-navy font-semibold shadow disabled:opacity-50"
        >
          Mark QA Complete
        </Button>
      </motion.div>
    </motion.div>
  );
}