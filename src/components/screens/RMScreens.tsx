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
  const { clients, blueprints, setCurrentScreen } = useAppStore();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="font-serif text-2xl font-semibold">Welcome, Riya Kapoor</h2>

      {/* Client List */}
      <div className="space-y-3">
        {clients.map((client) => {
          const blueprint = blueprints.find((bp) => bp.clientId === client.id);
          const isClientA = client.id === 'client-a';
          
          return (
            <div key={client.id} className="p-4 rounded-xl border border-border bg-card flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-medium">{client.name}</h3>
                  <StatusChip status={blueprint?.status || 'draft'} />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {isClientA && blueprint?.status === 'draft' 
                    ? 'Pending: Blueprint approval'
                    : 'Pending: Trust sign-offs'}
                </p>
              </div>
              <Button size="sm" variant="outline" onClick={() => setCurrentScreen('client-360')}>
                View
              </Button>
            </div>
          );
        })}
      </div>

      {/* Priority Tasks */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="font-serif text-lg font-semibold mb-4">Priority Tasks</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-3 text-sm">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Follow up on missing documents (Client A)
          </li>
          <li className="flex items-center gap-3 text-sm">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Review FA notes on PE allocation (Client B)
          </li>
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Client Summary */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h2 className="font-serif text-xl font-semibold mb-4">{client.name}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Segment</span>
            <p className="font-medium">{client.segment}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Base</span>
            <p className="font-medium">{client.base}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Net Worth</span>
            <p className="font-medium">{client.netWorth}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Risk Band</span>
            <p className="font-medium">{client.riskBand}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === tab.toLowerCase()
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' && (
        <div className="p-6 rounded-xl border border-border bg-card space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-muted-foreground">Primary Goals</span>
              <p className="font-medium">{client.primaryGoals}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Liquidity Need</span>
              <p className="font-medium">{client.liquidityNeed}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Time Horizon</span>
              <p className="font-medium">{client.timeHorizon}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Next Review</span>
              <p className="font-medium">{client.nextReview}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'blueprint' && (
        <div className="p-6 rounded-xl border border-border bg-card space-y-4">
          <div className="flex items-center justify-between">
            <StatusChip status={blueprint.status} />
            <Button size="sm" onClick={handleSendToClient}>Send to Client</Button>
          </div>
          <div className="space-y-2">
            {blueprint.allocationTargets.map((t, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span>{t.name}</span>
                <span className="font-medium">{t.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'recommendations' && (
        <div className="space-y-3">
          {recommendations.map((rec) => (
            <div key={rec.id} className="p-4 rounded-xl border border-border bg-card flex items-center justify-between">
              <div>
                <p className="font-medium">{rec.name}</p>
                <p className="text-sm text-muted-foreground">{rec.partner} • {rec.amount}</p>
              </div>
              <StatusChip status={rec.status} />
            </div>
          ))}
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="space-y-3">
            {['Onboarding completed', 'Blueprint drafted by FA', 'Recommendation package prepared'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-primary" />
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'structuring' && (
        <div className="p-6 rounded-xl border border-border bg-card text-sm text-muted-foreground">
          Navigate to Structuring Cases for detailed case management.
        </div>
      )}
    </div>
  );
}

export function OnboardingChecklistScreen() {
  const { selectedClient, onboardingItems, toggleOnboardingItem } = useAppStore();
  const items = onboardingItems.filter((i) => i.clientId === selectedClient);
  const completedCount = items.filter((i) => i.checked).length;
  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="p-6 rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg font-semibold">Onboarding Progress</h3>
          <span className="text-sm font-medium">{Math.round(progress)}%</span>
        </div>
        <ProgressBar progress={progress} className="mb-6" />

        <div className="space-y-3">
          {items.map((item) => (
            <label key={item.id} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={item.checked}
                onCheckedChange={() => toggleOnboardingItem(item.id)}
              />
              <span className={item.checked ? 'text-muted-foreground line-through' : ''}>
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
  const client = clients.find((c) => c.id === selectedClient);

  const pendingRequests = faRequests.filter((r) => r.status === 'pending');
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
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Requests to FA */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="font-serif text-lg font-semibold mb-4">Requests to FA</h3>
        <div className="flex gap-3">
          <Select value={requestType} onValueChange={setRequestType}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blueprint">Blueprint Draft</SelectItem>
              <SelectItem value="recommendation">Recommendation Draft</SelectItem>
              <SelectItem value="structuring">Structuring Guidance</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleRequest}>Request FA Review</Button>
        </div>
      </div>

      {/* Received from FA */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="font-serif text-lg font-semibold mb-4">Received from FA</h3>
        {readyRequests.length === 0 ? (
          <p className="text-sm text-muted-foreground">No items ready for review</p>
        ) : (
          <div className="space-y-3">
            {readyRequests.map((req) => (
              <div key={req.id} className="p-4 rounded-lg border border-border flex items-center justify-between">
                <div>
                  <p className="font-medium">{req.title}</p>
                  <p className="text-sm text-muted-foreground">Ready for RM review</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleApprove(req.id)}>Approve</Button>
                  <Button size="sm" variant="outline">Request Changes</Button>
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

  const columns: { status: string; label: string }[] = [
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
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {columns.map((col) => (
          <div key={col.status} className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground">{col.label}</h3>
            {recommendations
              .filter((r) => r.status === col.status)
              .map((rec) => (
                <div key={rec.id} className="p-3 rounded-lg border border-border bg-card">
                  <p className="font-medium text-sm">{rec.name}</p>
                  <p className="text-xs text-muted-foreground">{rec.amount}</p>
                  {col.status !== 'confirmed' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 w-full text-xs"
                      onClick={() => moveToNext(rec.id, rec.status)}
                    >
                      Move to next stage
                    </Button>
                  )}
                </div>
              ))}
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
    <div className="max-w-3xl mx-auto space-y-4">
      {cases.length === 0 ? (
        <p className="text-muted-foreground">No structuring cases for this client yet.</p>
      ) : (
        cases.map((sc) => (
          <div key={sc.id} className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium">{sc.name}</h3>
                <p className="text-sm text-muted-foreground">{sc.checklistTitle}</p>
              </div>
              <StatusChip status={sc.status} />
            </div>
            <ProgressBar progress={getProgress(sc.checklistItems)} className="mb-4" />
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setCurrentScreen('country-checklist')}>
                Open Case
              </Button>
              {sc.status === 'not-started' && (
                <Button size="sm" onClick={() => updateStructuringStatus(sc.id, 'in-progress')}>
                  Mark In Progress
                </Button>
              )}
              {sc.status === 'in-progress' && getProgress(sc.checklistItems) === 100 && (
                <Button size="sm" onClick={() => updateStructuringStatus(sc.id, 'completed')}>
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
    <div className="max-w-3xl mx-auto space-y-4">
      {tickets.map((ticket) => (
        <div key={ticket.id} className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-medium">{ticket.name}</h3>
              <p className="text-sm text-muted-foreground">{ticket.partner}</p>
            </div>
            <StatusChip status={ticket.status} />
          </div>

          {/* Timeline */}
          <div className="flex items-center gap-2 mb-4">
            {steps.map((step, idx) => (
              <div key={step} className="flex items-center">
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    idx <= getStepIndex(ticket.status)
                      ? 'bg-primary/10 text-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step}
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-8 h-0.5 ${idx < getStepIndex(ticket.status) ? 'bg-primary' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            {ticket.status === 'created' && (
              <Button size="sm" onClick={() => moveToNext(ticket.id, ticket.status)}>
                Submit to Partner
              </Button>
            )}
            {ticket.status === 'submitted' && (
              <Button size="sm" onClick={() => moveToNext(ticket.id, ticket.status)}>
                Mark Processing
              </Button>
            )}
            {ticket.status === 'processing' && (
              <Button size="sm" onClick={() => moveToNext(ticket.id, ticket.status)}>
                Mark Confirmed
              </Button>
            )}
            {ticket.status === 'confirmed' && (
              <Button size="sm" variant="outline">View Confirmation Document</Button>
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
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="font-serif text-lg font-semibold mb-4">Alerts</h3>
        <div className="space-y-3">
          {alerts.map((alert, i) => (
            <div key={i} className="p-4 rounded-lg bg-muted/50 flex items-center justify-between">
              <span className="text-sm">{alert.text}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                alert.severity === 'Medium' ? 'bg-warning/20 text-warning' : 'bg-muted text-muted-foreground'
              }`}>
                {alert.severity}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="font-serif text-lg font-semibold mb-4">Recommended Next Actions</h3>
        <ul className="space-y-2">
          {actions.map((action, i) => (
            <li key={i} className="flex items-center gap-3 text-sm">
              <span className="h-2 w-2 rounded-full bg-primary" />
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
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="p-6 rounded-xl border border-border bg-card space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Reporting Period</label>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="q1-2026">Q1 2026</SelectItem>
              <SelectItem value="q4-2025">Q4 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Key Highlights</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 rounded-lg border border-border bg-background text-sm min-h-[100px]"
            placeholder="Enter key highlights for the report..."
          />
        </div>

        <Button onClick={() => setShowPreview(true)}>Generate Client Report</Button>
      </div>

      {showPreview && (
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="font-serif text-xl font-semibold mb-4">Report Preview</h3>
          <div className="space-y-4 text-sm">
            <p className="text-muted-foreground">
              {notes || 'This quarter showed steady progress toward blueprint objectives.'}
            </p>
            <div>
              <h4 className="font-semibold">Progress vs Blueprint</h4>
              <p className="text-muted-foreground">On track with minor adjustments recommended.</p>
            </div>
            <div>
              <h4 className="font-semibold">Key Events</h4>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>Private Credit allocation initiated</li>
                <li>Quarterly review completed</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Next Actions</h4>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>Schedule follow-up review</li>
                <li>Review liquidity requirements</li>
              </ul>
            </div>
          </div>
          <Button className="mt-4" onClick={handlePublish}>Publish to Client Portal</Button>
        </div>
      )}
    </div>
  );
}
