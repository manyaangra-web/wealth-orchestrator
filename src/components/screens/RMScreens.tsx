import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { StatusChip, ProgressBar } from '@/components/ui/StatusChip';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function RMDashboardScreen() {
  const { clients, blueprints, setCurrentScreen, setSelectedClient } = useAppStore();

  return (
    <div className="max-w-3xl mx-auto space-y-6 px-4">
      <div className="card-elevated p-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center">
            <span className="text-gold font-bold">RK</span>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-foreground">Welcome, Riya Kapoor</h2>
            <p className="text-sm text-muted-foreground">Relationship Manager</p>
          </div>
        </div>
      </div>

      {/* Client List */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-gold uppercase tracking-wider">Your Clients</h3>
        {clients.map((client) => {
          const blueprint = blueprints.find((bp) => bp.clientId === client.id);
          const isClientA = client.id === 'client-a';
          
          return (
            <div key={client.id} className="card-elevated p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-navy-muted flex items-center justify-center">
                  <span className="text-navy font-semibold text-sm">{client.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-foreground">{client.name}</h3>
                    <StatusChip status={blueprint?.status || 'draft'} />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {isClientA && blueprint?.status === 'draft' 
                      ? 'Pending: Blueprint approval'
                      : 'Pending: Trust sign-offs'}
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedClient(client.id);
                  setCurrentScreen('client-360');
                }}
                className="border-navy/20 text-navy hover:bg-navy-muted"
              >
                View
              </Button>
            </div>
          );
        })}
      </div>

      {/* Priority Tasks */}
      <div className="card-premium p-6 gold-accent pl-8">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Priority Tasks</h3>
        <ul className="space-y-3">
          {[
            'Follow up on missing documents (Client A)',
            'Review FA notes on PE allocation (Client B)',
          ].map((task, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-foreground p-3 rounded-lg bg-gold-muted/30 border border-gold/10">
              <span className="h-2 w-2 rounded-full bg-gold flex-shrink-0" />
              {task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Client360Screen() {
  const { selectedClient, getClient, getBlueprint, getClientRecommendations } = useAppStore();
  const client = getClient(selectedClient);
  const blueprint = getBlueprint(selectedClient);
  const recommendations = getClientRecommendations(selectedClient);
  const [activeTab, setActiveTab] = useState('profile');

  const handleSendToClient = () => {
    toast.success('Blueprint shared with client');
  };

  const tabs = ['Profile', 'Blueprint', 'Recommendations', 'Structuring', 'Activity'];

  return (
    <div className="max-w-3xl mx-auto space-y-6 px-4">
      {/* Client Summary */}
      <div className="card-elevated p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center">
            <span className="text-gold font-serif text-xl font-bold">{client.name.charAt(0)}</span>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-foreground">{client.name}</h2>
            <p className="text-sm text-muted-foreground">{client.segment}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Segment', value: client.segment },
            { label: 'Base', value: client.base },
            { label: 'Net Worth', value: client.netWorth },
            { label: 'Risk Band', value: client.riskBand },
          ].map((item) => (
            <div key={item.label} className="p-3 rounded-lg bg-muted/50">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">{item.label}</span>
              <p className="text-sm font-semibold text-foreground mt-1">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1.5 bg-navy-muted rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === tab.toLowerCase()
                ? 'bg-card text-navy shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="card-premium p-6">
        {activeTab === 'profile' && (
          <div className="grid grid-cols-2 gap-5">
            {[
              { label: 'Primary Goals', value: client.primaryGoals },
              { label: 'Liquidity Need', value: client.liquidityNeed },
              { label: 'Time Horizon', value: client.timeHorizon },
              { label: 'Next Review', value: client.nextReview },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-lg bg-muted/30 border border-border/50">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">{item.label}</span>
                <p className="text-sm font-medium text-foreground mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'blueprint' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <StatusChip status={blueprint.status} />
              <Button onClick={handleSendToClient} className="bg-navy hover:bg-navy-light text-gold">
                Send to Client
              </Button>
            </div>
            <div className="space-y-3">
              {blueprint.allocationTargets.map((t, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-sm text-foreground w-40">{t.name}</span>
                  <div className="flex-1">
                    <ProgressBar progress={t.percentage} />
                  </div>
                  <span className="text-sm font-bold text-navy w-12 text-right">{t.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="p-4 rounded-xl bg-gradient-to-r from-navy-muted to-gold-muted/20 border border-navy/10 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{rec.name}</p>
                  <p className="text-xs text-muted-foreground">{rec.partner} • {rec.amount}</p>
                </div>
                <StatusChip status={rec.status} />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-3">
            {['Onboarding completed', 'Blueprint drafted by FA', 'Recommendation package prepared'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-foreground p-3 rounded-lg bg-muted/30">
                <div className="h-2 w-2 rounded-full bg-gold" />
                {item}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'structuring' && (
          <p className="text-sm text-muted-foreground">
            Navigate to Structuring Cases for detailed case management.
          </p>
        )}
      </div>
    </div>
  );
}

export function OnboardingChecklistScreen() {
  const { selectedClient, onboardingItems, toggleOnboardingItem } = useAppStore();
  const items = onboardingItems.filter((i) => i.clientId === selectedClient);
  const completedCount = items.filter((i) => i.checked).length;
  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;

  return (
    <div className="max-w-xl mx-auto px-4">
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-serif text-xl font-semibold text-foreground">Onboarding Progress</h3>
          <span className="text-lg font-bold text-gold">{Math.round(progress)}%</span>
        </div>
        <ProgressBar progress={progress} className="mb-6" />

        <div className="space-y-4">
          {items.map((item) => (
            <label key={item.id} className="flex items-center gap-4 cursor-pointer p-3 rounded-lg hover:bg-muted/30 transition-colors">
              <Checkbox
                checked={item.checked}
                onCheckedChange={() => toggleOnboardingItem(item.id)}
                className="border-navy data-[state=checked]:bg-gold data-[state=checked]:border-gold"
              />
              <span className={`text-sm ${item.checked ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FACollaborationScreen() {
  const { selectedClient, faRequests, createFARequest, updateFARequestStatus, clients } = useAppStore();
  const [requestType, setRequestType] = useState<string>('blueprint');

  const readyRequests = faRequests.filter((r) => r.status === 'ready');

  const handleRequest = () => {
    const types: Record<string, string> = {
      blueprint: 'Blueprint Draft',
      recommendation: 'Recommendation Draft',
      structuring: 'Structuring Guidance',
    };
    createFARequest(selectedClient, requestType as any, `${types[requestType]} requested by RM`);
    toast.success('Request sent to FA');
  };

  const handleApprove = (id: string) => {
    updateFARequestStatus(id, 'approved');
    toast.success('Approved');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 px-4">
      {/* Requests to FA */}
      <div className="card-elevated p-6">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-5">Requests to FA</h3>
        <div className="flex gap-3">
          <Select value={requestType} onValueChange={setRequestType}>
            <SelectTrigger className="w-48 bg-card border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="blueprint">Blueprint Draft</SelectItem>
              <SelectItem value="recommendation">Recommendation Draft</SelectItem>
              <SelectItem value="structuring">Structuring Guidance</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleRequest} className="bg-navy hover:bg-navy-light text-gold">
            Request FA Review
          </Button>
        </div>
      </div>

      {/* Received from FA */}
      <div className="card-premium p-6">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-5">Received from FA</h3>
        {readyRequests.length === 0 ? (
          <p className="text-sm text-muted-foreground p-4 rounded-lg bg-muted/30 text-center">No items ready for review</p>
        ) : (
          <div className="space-y-4">
            {readyRequests.map((req) => (
              <div key={req.id} className="p-4 rounded-xl bg-gold-muted/30 border border-gold/20 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{req.title}</p>
                  <p className="text-xs text-gold font-medium">Ready for RM review</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleApprove(req.id)} className="bg-navy hover:bg-navy-light text-gold">
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" className="border-border">Request Changes</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function RecommendationsPipelineScreen() {
  const { selectedClient, getClientRecommendations, updateRecommendationStatus } = useAppStore();
  const recommendations = getClientRecommendations(selectedClient);

  const columns = [
    { status: 'draft', label: 'Draft' },
    { status: 'client-approved', label: 'Client Approved' },
    { status: 'executing', label: 'Executing' },
    { status: 'confirmed', label: 'Confirmed' },
  ];

  const moveToNext = (id: string, currentStatus: string) => {
    const flow: Record<string, string> = {
      draft: 'client-approved',
      'client-approved': 'executing',
      executing: 'confirmed',
    };
    const next = flow[currentStatus];
    if (next) {
      updateRecommendationStatus(id, next as any);
      toast.success('Moved to next stage');
    }
  };

  return (
    <div className="overflow-x-auto px-4">
      <div className="grid grid-cols-4 gap-5 min-w-[750px]">
        {columns.map((col, colIdx) => (
          <div key={col.status}>
            <div className={`px-3 py-2 rounded-lg mb-4 ${
              colIdx === 0 ? 'bg-muted' :
              colIdx === 1 ? 'bg-gold-muted' :
              colIdx === 2 ? 'bg-info/10' :
              'bg-success-muted'
            }`}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">{col.label}</h3>
            </div>
            <div className="space-y-3">
              {recommendations
                .filter((r) => r.status === col.status)
                .map((rec) => (
                  <div key={rec.id} className="card-elevated p-4">
                    <p className="text-sm font-semibold text-foreground">{rec.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{rec.amount}</p>
                    {col.status !== 'confirmed' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-3 w-full text-xs border-gold/30 text-gold hover:bg-gold-muted"
                        onClick={() => moveToNext(rec.id, rec.status)}
                      >
                        Move to next →
                      </Button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StructuringCasesScreen() {
  const { selectedClient, getClientStructuringCases, updateStructuringStatus, setCurrentScreen } = useAppStore();
  const cases = getClientStructuringCases(selectedClient);

  const getProgress = (items: { checked: boolean }[]) => {
    if (items.length === 0) return 0;
    return (items.filter((i) => i.checked).length / items.length) * 100;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5 px-4">
      {cases.length === 0 ? (
        <div className="card-premium p-8 text-center">
          <p className="text-sm text-muted-foreground">No structuring cases for this client yet.</p>
        </div>
      ) : (
        cases.map((sc) => (
          <div key={sc.id} className="card-elevated p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">{sc.name}</h3>
                <p className="text-sm text-muted-foreground">{sc.checklistTitle}</p>
              </div>
              <StatusChip status={sc.status} />
            </div>
            <ProgressBar progress={getProgress(sc.checklistItems)} className="mb-5" />
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setCurrentScreen('country-checklist')} className="border-navy/20 text-navy hover:bg-navy-muted">
                Open Case
              </Button>
              {sc.status === 'not-started' && (
                <Button onClick={() => updateStructuringStatus(sc.id, 'in-progress')} className="bg-gold hover:bg-gold-light text-navy">
                  Mark In Progress
                </Button>
              )}
              {sc.status === 'in-progress' && getProgress(sc.checklistItems) === 100 && (
                <Button onClick={() => updateStructuringStatus(sc.id, 'completed')} className="bg-success hover:bg-success/90 text-white">
                  Complete Case
                </Button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export function ExecutionTrackerScreen() {
  const { selectedClient, getClientExecutionTickets, updateExecutionStatus } = useAppStore();
  const tickets = getClientExecutionTickets(selectedClient);

  const steps = ['Created', 'Submitted', 'Processing', 'Confirmed'];

  const getStepIndex = (status: string) => {
    const map: Record<string, number> = { created: 0, submitted: 1, processing: 2, confirmed: 3 };
    return map[status] || 0;
  };

  const moveToNext = (id: string, status: string) => {
    const flow: Record<string, string> = {
      created: 'submitted',
      submitted: 'processing',
      processing: 'confirmed',
    };
    const next = flow[status];
    if (next) {
      updateExecutionStatus(id, next as any);
      toast.success('Status updated');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5 px-4">
      {tickets.map((ticket) => (
        <div key={ticket.id} className="card-elevated p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="font-semibold text-foreground">{ticket.name}</h3>
              <p className="text-sm text-gold font-medium">{ticket.partner}</p>
            </div>
            <StatusChip status={ticket.status} />
          </div>

          {/* Timeline */}
          <div className="flex items-center gap-1 mb-5 p-3 rounded-lg bg-muted/30">
            {steps.map((step, idx) => (
              <div key={step} className="flex items-center flex-1">
                <div
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold text-center ${
                    idx <= getStepIndex(ticket.status)
                      ? idx === getStepIndex(ticket.status) 
                        ? 'bg-gold text-navy' 
                        : 'bg-navy text-gold'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step}
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-3 h-0.5 ${idx < getStepIndex(ticket.status) ? 'bg-gold' : 'bg-border'}`} />
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            {ticket.status === 'created' && (
              <Button onClick={() => moveToNext(ticket.id, ticket.status)} className="bg-navy hover:bg-navy-light text-gold">
                Submit to Partner
              </Button>
            )}
            {ticket.status === 'submitted' && (
              <Button onClick={() => moveToNext(ticket.id, ticket.status)} className="bg-gold hover:bg-gold-light text-navy">
                Mark Processing
              </Button>
            )}
            {ticket.status === 'processing' && (
              <Button onClick={() => moveToNext(ticket.id, ticket.status)} className="bg-success hover:bg-success/90 text-white">
                Mark Confirmed
              </Button>
            )}
            {ticket.status === 'confirmed' && (
              <Button variant="outline" className="border-success/30 text-success hover:bg-success-muted">
                View Confirmation Document
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function AlertsNextActionsScreen() {
  const alerts = [
    { text: 'Liquidity gap forecast: 6 months', severity: 'Medium' },
    { text: 'Allocation drift: Private Credit above target', severity: 'Low' },
    { text: 'Maturity event: Private Credit tranche nearing renewal window', severity: 'Medium' },
  ];

  const actions = [
    'Schedule quarterly review',
    'Refresh valuation updates from partners',
    'Propose rebalancing actions (FA support)',
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 px-4">
      <div className="card-elevated p-6">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-5">Alerts</h3>
        <div className="space-y-3">
          {alerts.map((alert, i) => (
            <div key={i} className="p-4 rounded-xl bg-gradient-to-r from-gold-muted/50 to-muted/30 border border-gold/20 flex items-center justify-between">
              <span className="text-sm text-foreground">{alert.text}</span>
              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                alert.severity === 'Medium' ? 'bg-gold/20 text-gold' : 'bg-muted text-muted-foreground'
              }`}>
                {alert.severity}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card-premium p-6 gold-accent pl-8">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-5">Recommended Next Actions</h3>
        <ul className="space-y-3">
          {actions.map((action, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-foreground p-3 rounded-lg bg-navy-muted border border-navy/10">
              <span className="h-2 w-2 rounded-full bg-gold flex-shrink-0" />
              {action}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function QuarterlyReportBuilderScreen() {
  const [period, setPeriod] = useState('q1-2026');
  const [notes, setNotes] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handlePublish = () => {
    toast.success('Report published to Client Portal');
    setShowPreview(false);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 px-4">
      <div className="card-elevated p-6 space-y-5">
        <div>
          <label className="text-sm font-semibold text-foreground mb-3 block">Reporting Period</label>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-44 bg-card border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="q1-2026">Q1 2026</SelectItem>
              <SelectItem value="q4-2025">Q4 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-3 block">Key Highlights</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-4 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground min-h-[120px] focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all"
            placeholder="Enter key highlights for the report..."
          />
        </div>

        <Button onClick={() => setShowPreview(true)} className="bg-navy hover:bg-navy-light text-gold">
          Generate Client Report
        </Button>
      </div>

      {showPreview && (
        <div className="card-premium p-6">
          <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">Report Preview</h3>
          <div className="space-y-5 text-sm">
            <p className="text-muted-foreground leading-relaxed p-4 rounded-lg bg-muted/30">
              {notes || 'This quarter showed steady progress toward blueprint objectives.'}
            </p>
            <div className="p-4 rounded-lg bg-navy-muted border border-navy/10">
              <h4 className="font-semibold text-navy mb-2">Progress vs Blueprint</h4>
              <p className="text-muted-foreground">On track with minor adjustments recommended.</p>
            </div>
            <div className="p-4 rounded-lg bg-gold-muted/50 border border-gold/20">
              <h4 className="font-semibold text-gold mb-3">Key Events</h4>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold" />Private Credit allocation initiated</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold" />Quarterly review completed</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-success-muted border border-success/20">
              <h4 className="font-semibold text-success mb-3">Next Actions</h4>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-success" />Schedule follow-up review</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-success" />Review liquidity requirements</li>
              </ul>
            </div>
          </div>
          <Button className="mt-6 bg-gold hover:bg-gold-light text-navy font-semibold" onClick={handlePublish}>
            Publish to Client Portal
          </Button>
        </div>
      )}
    </div>
  );
}