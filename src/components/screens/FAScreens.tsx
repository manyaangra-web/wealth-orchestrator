// Temporary stub for missing DealDossiersScreen
export function DealDossiersScreen() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Deal Dossiers</h2>
      <p className="text-muted-foreground">This screen is under construction.</p>
    </div>
  );
}
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { StatusChip, ProgressBar } from '@/components/ui/StatusChip';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { PremiumToast } from '../ui/PremiumToast';
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
  const [showPremiumToast, setShowPremiumToast] = useState(false);

  const handleSubmit = () => {
    // Save blueprint data to localStorage
    const blueprintData = {
      clientId: selectedClient,
      clientName: client.name,
      scenario,
      allocations,
      milestoneNotes,
      passiveIncome,
      timestamp: new Date().toISOString(),
      version: 'v1'
    };

    const existingBlueprints = JSON.parse(
      localStorage.getItem('blueprintDrafts') || '[]'
    );

    const existingIndex = existingBlueprints.findIndex(
      (bp: any) => bp.clientId === selectedClient
    );

    if (existingIndex !== -1) {
      existingBlueprints[existingIndex] = blueprintData;
    } else {
      existingBlueprints.push(blueprintData);
    }

    localStorage.setItem('blueprintDrafts', JSON.stringify(existingBlueprints));

    // ✅ SET FLAG
    localStorage.setItem('Submit_Blueprint_Draft', JSON.stringify(true));

    const req = faRequests.find(
      (r) =>
        r.clientId === selectedClient &&
        r.type === 'blueprint' &&
        r.status === 'pending'
    );

    if (req) {
      updateFARequestStatus(req.id, 'ready');
    }

    setShowPremiumToast(true);
  };
}

export function RecommendationDraftsScreen() {
  const { selectedClient, getClientRecommendations, faRequests, updateFARequestStatus } = useAppStore();
  const recommendations = getClientRecommendations(selectedClient);


  const [showPremiumToast, setShowPremiumToast] = useState(false);

  const handleSubmit = () => {
    const req = faRequests.find(
      (r) =>
        r.clientId === selectedClient &&
        r.type === 'recommendation' &&
        r.status === 'pending'
    );

    if (req) {
      updateFARequestStatus(req.id, 'ready');
    }

    // ✅ Save flag in localStorage
    localStorage.setItem('Submit_Recommendation_Draft', JSON.stringify(true));

    setShowPremiumToast(true);
  };

  return (
    <>
      <PremiumToast
        open={showPremiumToast}
        title="Recommendation Draft submitted"
        description="Your recommendation draft has been submitted successfully."
        onClose={() => setShowPremiumToast(false)}
        duration={3500}
      />
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
    </>
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
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(
                new CustomEvent('premium-toast', {
                  detail: {
                    title: 'QA Review Complete',
                    message: 'All QA checklist items have been validated. Your review is complete and ready for submission.',
                    icon: 'CheckCircle2',
                    status: 'success',
                    animation: 'confetti',
                  },
                })
              );
            }
          }}
          className="bg-gradient-to-r from-gold to-gold-light text-navy font-semibold shadow-lg border-2 border-gold/40 disabled:opacity-50 rounded-xl px-8 py-4 flex items-center gap-2"
        >
          <CheckCircle2 className="mr-2 w-5 h-5 text-emerald-500 animate-bounce" />
          Mark QA Complete
        </Button>
      </motion.div>
    </motion.div>
  );
}
