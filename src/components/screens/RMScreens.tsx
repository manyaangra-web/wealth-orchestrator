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
    <div className="max-w-3xl mx-auto space-y-5">
      <h2 className="font-serif text-2xl font-semibold text-foreground">Welcome, Riya Kapoor</h2>

      {/* Client List */}
      <div className="space-y-3">
        {clients.map((client) => {
          const blueprint = blueprints.find((bp) => bp.clientId === client.id);
          const isClientA = client.id === 'client-a';
          
          return (
            <div key={client.id} className="p-4 rounded-lg bg-white border border-border flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground">{client.name}</h3>
                  <StatusChip status={blueprint?.status || 'draft'} />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {isClientA && blueprint?.status === 'draft' 
                    ? 'Pending: Blueprint approval'
                    : 'Pending: Trust sign-offs'}
                </p>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => {
                  setSelectedClient(client.id);
                  setCurrentScreen('client-360');
                }}
              >
                View
              </Button>
            </div>
          );
        })}
      </div>

      {/* Priority Tasks */}
      <div className="p-5 rounded-lg bg-white border border-border">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-3">Priority Tasks</h3>
        <ul className="space-y-2">
          {[
            'Follow up on missing documents (Client A)',
            'Review FA notes on PE allocation (Client B)',
          ].map((task, i) => (
            <li key={i} className="flex items-center gap-2.5 text-sm text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
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
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Client Summary */}
      <div className="p-5 rounded-lg bg-white border border-border">
        <h2 className="font-serif text-xl font-semibold text-foreground mb-4">{client.name}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Segment', value: client.segment },
            { label: 'Base', value: client.base },
            { label: 'Net Worth', value: client.netWorth },
            { label: 'Risk Band', value: client.riskBand },
          ].map((item) => (
            <div key={item.label}>
              <span className="text-xs text-muted-foreground">{item.label}</span>
              <p className="text-sm font-medium text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab.toLowerCase()
                ? 'bg-white text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-5 rounded-lg bg-white border border-border">
        {activeTab === 'profile' && (
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Primary Goals', value: client.primaryGoals },
              { label: 'Liquidity Need', value: client.liquidityNeed },
              { label: 'Time Horizon', value: client.timeHorizon },
              { label: 'Next Review', value: client.nextReview },
            ].map((item) => (
              <div key={item.label}>
                <span className="text-xs text-muted-foreground">{item.label}</span>
                <p className="text-sm font-medium text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'blueprint' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <StatusChip status={blueprint.status} />
              <Button size="sm" onClick={handleSendToClient}>Send to Client</Button>
            </div>
            <div className="space-y-2">
              {blueprint.allocationTargets.map((t, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-foreground">{t.name}</span>
                  <span className="font-medium text-foreground">{t.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-3">
            {recommendations.map((rec) => (
              <div key={rec.id} className="p-3 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{rec.name}</p>
                  <p className="text-xs text-muted-foreground">{rec.partner} • {rec.amount}</p>
                </div>
                <StatusChip status={rec.status} />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-2">
            {['Onboarding completed', 'Blueprint drafted by FA', 'Recommendation package prepared'].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
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
    <div className="max-w-xl mx-auto">
      <div className="p-5 rounded-lg bg-white border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg font-semibold text-foreground">Onboarding Progress</h3>
          <span className="text-sm font-medium text-foreground">{Math.round(progress)}%</span>
        </div>
        <ProgressBar progress={progress} className="mb-5" />

        <div className="space-y-3">
          {items.map((item) => (
            <label key={item.id} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={item.checked}
                onCheckedChange={() => toggleOnboardingItem(item.id)}
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
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Requests to FA */}
      <div className="p-5 rounded-lg bg-white border border-border">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Requests to FA</h3>
        <div className="flex gap-3">
          <Select value={requestType} onValueChange={setRequestType}>
            <SelectTrigger className="w-44 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="blueprint">Blueprint Draft</SelectItem>
              <SelectItem value="recommendation">Recommendation Draft</SelectItem>
              <SelectItem value="structuring">Structuring Guidance</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleRequest}>Request FA Review</Button>
        </div>
      </div>

      {/* Received from FA */}
      <div className="p-5 rounded-lg bg-white border border-border">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Received from FA</h3>
        {readyRequests.length === 0 ? (
          <p className="text-sm text-muted-foreground">No items ready for review</p>
        ) : (
          <div className="space-y-3">
            {readyRequests.map((req) => (
              <div key={req.id} className="p-3 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{req.title}</p>
                  <p className="text-xs text-muted-foreground">Ready for RM review</p>
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
    <div className="overflow-x-auto">
      <div className="grid grid-cols-4 gap-4 min-w-[700px]">
        {columns.map((col) => (
          <div key={col.status}>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{col.label}</h3>
            <div className="space-y-2">
              {recommendations
                .filter((r) => r.status === col.status)
                .map((rec) => (
                  <div key={rec.id} className="p-3 rounded-lg bg-white border border-border">
                    <p className="text-sm font-medium text-foreground">{rec.name}</p>
                    <p className="text-xs text-muted-foreground">{rec.amount}</p>
                    {col.status !== 'confirmed' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2 w-full text-xs"
                        onClick={() => moveToNext(rec.id, rec.status)}
                      >
                        Move to next
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
    <div className="max-w-2xl mx-auto space-y-4">
      {cases.length === 0 ? (
        <p className="text-sm text-muted-foreground">No structuring cases for this client yet.</p>
      ) : (
        cases.map((sc) => (
          <div key={sc.id} className="p-5 rounded-lg bg-white border border-border">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium text-foreground">{sc.name}</h3>
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
    <div className="max-w-2xl mx-auto space-y-4">
      {tickets.map((ticket) => (
        <div key={ticket.id} className="p-5 rounded-lg bg-white border border-border">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-medium text-foreground">{ticket.name}</h3>
              <p className="text-sm text-muted-foreground">{ticket.partner}</p>
            </div>
            <StatusChip status={ticket.status} />
          </div>

          {/* Timeline */}
          <div className="flex items-center gap-1 mb-4">
            {steps.map((step, idx) => (
              <div key={step} className="flex items-center">
                <div
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    idx <= getStepIndex(ticket.status)
                      ? 'bg-primary/10 text-primary'
                      : 'bg-slate-100 text-muted-foreground'
                  }`}
                >
                  {step}
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-4 h-0.5 ${idx < getStepIndex(ticket.status) ? 'bg-primary' : 'bg-slate-200'}`} />
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
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="p-5 rounded-lg bg-white border border-border">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Alerts</h3>
        <div className="space-y-2">
          {alerts.map((alert, i) => (
            <div key={i} className="p-3 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-between">
              <span className="text-sm text-foreground">{alert.text}</span>
              <span className={`text-xs px-2 py-0.5 rounded ${
                alert.severity === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {alert.severity}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 rounded-lg bg-white border border-border">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Recommended Next Actions</h3>
        <ul className="space-y-2">
          {actions.map((action, i) => (
            <li key={i} className="flex items-center gap-2.5 text-sm text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
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
    <div className="max-w-xl mx-auto space-y-5">
      <div className="p-5 rounded-lg bg-white border border-border space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Reporting Period</label>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="q1-2026">Q1 2026</SelectItem>
              <SelectItem value="q4-2025">Q4 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Key Highlights</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 rounded-md border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Enter key highlights for the report..."
          />
        </div>

        <Button onClick={() => setShowPreview(true)}>Generate Client Report</Button>
      </div>

      {showPreview && (
        <div className="p-5 rounded-lg bg-white border border-border">
          <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Report Preview</h3>
          <div className="space-y-4 text-sm">
            <p className="text-muted-foreground">
              {notes || 'This quarter showed steady progress toward blueprint objectives.'}
            </p>
            <div>
              <h4 className="font-semibold text-foreground">Progress vs Blueprint</h4>
              <p className="text-muted-foreground">On track with minor adjustments recommended.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Key Events</h4>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>Private Credit allocation initiated</li>
                <li>Quarterly review completed</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Next Actions</h4>
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
