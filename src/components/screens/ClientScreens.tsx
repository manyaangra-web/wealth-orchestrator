import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { StatusChip, ProgressBar } from '@/components/ui/StatusChip';
import { toast } from 'sonner';
import { useState } from 'react';

export function ClientHomeScreen() {
  const { selectedClient, getClient, getBlueprint, setCurrentScreen } = useAppStore();
  const client = getClient(selectedClient);
  const blueprint = getBlueprint(selectedClient);

  const nextActions = selectedClient === 'client-a'
    ? blueprint.status === 'draft'
      ? ['Approve Wealth Blueprint', 'Review Private Credit Allocation']
      : ['Review Private Credit Allocation', 'Track execution status']
    : ['Review Trust/Entity sign-offs', 'Track PE subscription status'];

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Client Summary Card */}
      <div className="p-5 rounded-lg bg-white border border-border">
        <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
          Welcome, {client.name.split(' ')[0]}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Segment', value: client.segment },
            { label: 'Net Worth', value: client.netWorth },
            { label: 'Risk Band', value: client.riskBand },
            { label: 'RM', value: client.rm },
          ].map((item) => (
            <div key={item.label}>
              <span className="text-xs text-muted-foreground">{item.label}</span>
              <p className="text-sm font-medium text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Blueprint Card */}
      <div className="p-5 rounded-lg bg-white border border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-serif text-lg font-semibold text-foreground">Your Wealth Blueprint</h3>
          <StatusChip status={blueprint.status} />
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          A living plan aligned to your goals. Updated annually or when life changes.
        </p>
        <Button size="sm" onClick={() => setCurrentScreen('wealth-blueprint')}>
          View Wealth Blueprint
        </Button>
      </div>

      {/* Next Actions Card */}
      <div className="p-5 rounded-lg bg-white border border-border">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-3">Next Actions</h3>
        <ul className="space-y-2">
          {nextActions.map((action, idx) => (
            <li key={idx} className="flex items-center gap-2.5 text-sm text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
              {action}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function WealthBlueprintScreen() {
  const { selectedClient, getBlueprint, updateBlueprintStatus, setCurrentScreen } = useAppStore();
  const blueprint = getBlueprint(selectedClient);

  const handleApprove = () => {
    updateBlueprintStatus(selectedClient, 'active');
    toast.success('Blueprint approved. Recommendations are now available.');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Overview */}
      <div className="p-5 rounded-lg bg-white border border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl font-semibold text-foreground">Blueprint Overview</h2>
          <StatusChip status={blueprint.status} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <span className="text-xs text-muted-foreground">Horizon</span>
            <p className="text-sm font-medium text-foreground">{blueprint.horizon}</p>
          </div>
          {blueprint.passiveIncomeTarget && (
            <div>
              <span className="text-xs text-muted-foreground">Passive Income Target</span>
              <p className="text-sm font-medium text-foreground">{blueprint.passiveIncomeTarget}</p>
            </div>
          )}
          {blueprint.objective && (
            <div className="col-span-2">
              <span className="text-xs text-muted-foreground">Key Objective</span>
              <p className="text-sm font-medium text-foreground">{blueprint.objective}</p>
            </div>
          )}
        </div>
      </div>

      {/* Milestones */}
      <div className="p-5 rounded-lg bg-white border border-border">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Milestones</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {blueprint.milestones.map((milestone, idx) => (
            <div key={idx} className="p-3 rounded-md bg-slate-50 border border-slate-100">
              <span className="text-xs font-semibold text-primary">{milestone.period}</span>
              <p className="text-sm text-foreground mt-1">{milestone.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Allocation Targets */}
      <div className="p-5 rounded-lg bg-white border border-border">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Allocation Targets</h3>
        <div className="space-y-3">
          {blueprint.allocationTargets.map((target, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{target.name}</span>
              <div className="flex items-center gap-3">
                <div className="w-24 lg:w-32">
                  <ProgressBar progress={target.percentage} />
                </div>
                <span className="text-sm font-semibold text-foreground w-10 text-right">{target.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {blueprint.status === 'draft' && (
          <Button onClick={handleApprove}>Approve Blueprint</Button>
        )}
        <Button variant="outline" onClick={() => setCurrentScreen('secure-messaging')}>
          Message my RM
        </Button>
      </div>
    </div>
  );
}

export function ClientRecommendationsScreen() {
  const { selectedClient, getClientRecommendations, updateRecommendationStatus, getBlueprint } = useAppStore();
  const recommendations = getClientRecommendations(selectedClient);
  const blueprint = getBlueprint(selectedClient);

  const handleApprove = (id: string) => {
    updateRecommendationStatus(id, 'client-approved');
    toast.success('Recommendation approved for execution.');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <p className="text-sm text-muted-foreground">
        Your recommendations are curated from vetted partners and aligned to your Wealth Blueprint.
      </p>

      {blueprint.status === 'draft' && (
        <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-800">
          Please approve your Wealth Blueprint first to unlock recommendations.
        </div>
      )}

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="p-5 rounded-lg bg-white border border-border">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-serif text-base font-semibold text-foreground">{rec.name}</h3>
                <p className="text-sm text-muted-foreground">{rec.partner}</p>
              </div>
              <StatusChip status={rec.status} />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <span className="text-xs text-muted-foreground">Amount</span>
                <p className="text-sm font-medium text-foreground">{rec.amount}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Liquidity</span>
                <p className="text-sm font-medium text-foreground">{rec.liquidity}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              <span className="font-medium text-foreground">Rationale:</span> {rec.rationale}
            </p>
            <div className="flex gap-2">
              {rec.status === 'draft' && blueprint.status === 'active' && (
                <Button size="sm" onClick={() => handleApprove(rec.id)}>
                  Approve Recommendation
                </Button>
              )}
              <Button size="sm" variant="outline">View Details</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PortfolioOverviewScreen() {
  const { selectedClient, getClient, getBlueprint } = useAppStore();
  const client = getClient(selectedClient);
  const blueprint = getBlueprint(selectedClient);

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <p className="text-sm text-muted-foreground">
        Consolidated view across public, private, and alternative holdings. Updated periodically via partners.
      </p>

      {/* Net Worth */}
      <div className="p-5 rounded-lg bg-white border border-border">
        <span className="text-xs text-muted-foreground">Net Worth</span>
        <p className="text-2xl font-serif font-semibold text-primary mt-1">{client.netWorth}</p>
      </div>

      {/* Allocation Summary */}
      <div className="p-5 rounded-lg bg-white border border-border">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Target Allocation View</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {blueprint.allocationTargets.map((target, idx) => (
            <div key={idx} className="p-3 rounded-md bg-slate-50 border border-slate-100 text-center">
              <p className="text-xl font-semibold text-primary">{target.percentage}%</p>
              <p className="text-xs text-muted-foreground mt-0.5">{target.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Holdings Categories */}
      <div className="p-5 rounded-lg bg-white border border-border">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Holdings Categories</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          {['Private Credit', 'Private Equity', 'Global Equities', 'Real Assets', 'Alternatives', 'Cash'].map((category) => (
            <div key={category} className="px-3 py-2 rounded-md bg-slate-50 border border-slate-100 text-sm text-foreground">
              {category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ReportsScreen() {
  const [previewOpen, setPreviewOpen] = useState<string | null>(null);

  const reports = [
    { id: 'q1-2026', title: 'Quarterly Wealth Summary — Q1 2026' },
    { id: 'q4-2025', title: 'Quarterly Wealth Summary — Q4 2025' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <p className="text-sm text-muted-foreground">
        Quarterly reports summarise progress vs blueprint, key events, and recommended next actions.
      </p>

      <div className="space-y-3">
        {reports.map((report) => (
          <div key={report.id} className="p-4 rounded-lg bg-white border border-border flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{report.title}</span>
            <Button size="sm" variant="outline" onClick={() => setPreviewOpen(report.id)}>
              Preview
            </Button>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-xl w-full max-h-[80vh] overflow-y-auto shadow-xl">
            <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
              Quarterly Wealth Summary — {previewOpen === 'q1-2026' ? 'Q1 2026' : 'Q4 2025'}
            </h3>
            <div className="space-y-4 text-sm">
              <p className="text-muted-foreground">
                This quarter showed steady progress toward your blueprint objectives. Key allocations remain on track with minor adjustments recommended.
              </p>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Key Changes</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Private Credit allocation initiated</li>
                  <li>Portfolio review completed</li>
                  <li>Risk assessment updated</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Next Actions</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Schedule quarterly review with RM</li>
                  <li>Review upcoming liquidity events</li>
                  <li>Consider additional diversification</li>
                </ul>
              </div>
            </div>
            <Button className="mt-6" onClick={() => setPreviewOpen(null)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function SecureMessagingScreen() {
  const { selectedClient, messages, addMessage } = useAppStore();
  const clientMessages = messages.filter((m) => m.clientId === selectedClient);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      addMessage(selectedClient, 'client', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="p-5 rounded-lg bg-white border border-border">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="font-semibold text-primary text-sm">RK</span>
          </div>
          <div>
            <p className="font-medium text-foreground">Riya Kapoor</p>
            <p className="text-xs text-muted-foreground">Relationship Manager</p>
          </div>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto mb-4">
          {clientMessages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.sender === 'rm'
                  ? 'bg-slate-100 mr-auto'
                  : 'bg-primary/10 ml-auto'
              }`}
            >
              <p className="text-sm text-foreground">{msg.text}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{msg.timestamp}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 rounded-md border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </div>
    </div>
  );
}
