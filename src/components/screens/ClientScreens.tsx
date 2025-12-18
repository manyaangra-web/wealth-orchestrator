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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Client Summary Card */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h2 className="font-serif text-xl font-semibold mb-4">Welcome, {client.name.split(' ')[0]}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Segment</span>
            <p className="font-medium">{client.segment}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Net Worth</span>
            <p className="font-medium">{client.netWorth}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Risk Band</span>
            <p className="font-medium">{client.riskBand}</p>
          </div>
          <div>
            <span className="text-muted-foreground">RM</span>
            <p className="font-medium">{client.rm}</p>
          </div>
        </div>
      </div>

      {/* Blueprint Card */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg font-semibold">Your Wealth Blueprint</h3>
          <StatusChip status={blueprint.status} />
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          A living plan aligned to your goals. Updated annually or when life changes.
        </p>
        <Button onClick={() => setCurrentScreen('wealth-blueprint')}>
          View Wealth Blueprint
        </Button>
      </div>

      {/* Next Actions Card */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="font-serif text-lg font-semibold mb-4">Next Actions</h3>
        <ul className="space-y-2">
          {nextActions.map((action, idx) => (
            <li key={idx} className="flex items-center gap-3 text-sm">
              <span className="h-2 w-2 rounded-full bg-primary" />
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Overview */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl font-semibold">Blueprint Overview</h2>
          <StatusChip status={blueprint.status} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Horizon</span>
            <p className="font-medium">{blueprint.horizon}</p>
          </div>
          {blueprint.passiveIncomeTarget && (
            <div>
              <span className="text-muted-foreground">Passive Income Target</span>
              <p className="font-medium">{blueprint.passiveIncomeTarget}</p>
            </div>
          )}
          {blueprint.objective && (
            <div className="col-span-2">
              <span className="text-muted-foreground">Key Objective</span>
              <p className="font-medium">{blueprint.objective}</p>
            </div>
          )}
        </div>
      </div>

      {/* Milestones */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="font-serif text-lg font-semibold mb-4">Milestones</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {blueprint.milestones.map((milestone, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-muted/50">
              <span className="text-xs font-semibold text-primary">{milestone.period}</span>
              <p className="text-sm mt-1">{milestone.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Allocation Targets */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="font-serif text-lg font-semibold mb-4">Allocation Targets</h3>
        <div className="space-y-3">
          {blueprint.allocationTargets.map((target, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-sm">{target.name}</span>
              <div className="flex items-center gap-3">
                <div className="w-32">
                  <ProgressBar progress={target.percentage} />
                </div>
                <span className="text-sm font-semibold w-12 text-right">{target.percentage}%</span>
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
  const [selectedRec, setSelectedRec] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    updateRecommendationStatus(id, 'client-approved');
    toast.success('Recommendation approved for execution.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <p className="text-sm text-muted-foreground">
        Your recommendations are curated from vetted partners and aligned to your Wealth Blueprint.
      </p>

      {blueprint.status === 'draft' && (
        <div className="p-4 rounded-lg bg-warning/10 border border-warning/20 text-sm text-warning">
          Please approve your Wealth Blueprint first to unlock recommendations.
        </div>
      )}

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-serif text-lg font-semibold">{rec.name}</h3>
                <p className="text-sm text-muted-foreground">{rec.partner}</p>
              </div>
              <StatusChip status={rec.status} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-muted-foreground">Amount</span>
                <p className="font-medium">{rec.amount}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Liquidity</span>
                <p className="font-medium">{rec.liquidity}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              <span className="font-medium">Rationale:</span> {rec.rationale}
            </p>
            <div className="flex gap-2">
              {rec.status === 'draft' && blueprint.status === 'active' && (
                <Button size="sm" onClick={() => handleApprove(rec.id)}>
                  Approve Recommendation
                </Button>
              )}
              <Button size="sm" variant="outline" onClick={() => setSelectedRec(rec.id)}>
                View Details
              </Button>
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
    <div className="max-w-4xl mx-auto space-y-6">
      <p className="text-sm text-muted-foreground">
        Consolidated view across public, private, and alternative holdings. Updated periodically via partners.
      </p>

      {/* Net Worth */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="font-serif text-lg font-semibold mb-2">Net Worth</h3>
        <p className="text-3xl font-serif font-semibold text-primary">{client.netWorth}</p>
      </div>

      {/* Allocation Summary */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="font-serif text-lg font-semibold mb-4">Target Allocation View</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {blueprint.allocationTargets.map((target, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-muted/50 text-center">
              <p className="text-2xl font-semibold text-primary">{target.percentage}%</p>
              <p className="text-sm text-muted-foreground">{target.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Holdings Categories */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="font-serif text-lg font-semibold mb-4">Holdings Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['Private Credit', 'Private Equity', 'Global Equities', 'Real Assets', 'Alternatives', 'Cash'].map((category) => (
            <div key={category} className="px-4 py-3 rounded-lg border border-border text-sm">
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
    <div className="max-w-4xl mx-auto space-y-6">
      <p className="text-sm text-muted-foreground">
        Quarterly reports summarise progress vs blueprint, key events, and recommended next actions.
      </p>

      <div className="space-y-3">
        {reports.map((report) => (
          <div key={report.id} className="p-4 rounded-xl border border-border bg-card flex items-center justify-between">
            <span className="font-medium">{report.title}</span>
            <Button size="sm" variant="outline" onClick={() => setPreviewOpen(report.id)}>
              Preview
            </Button>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h3 className="font-serif text-xl font-semibold mb-4">
              Quarterly Wealth Summary — {previewOpen === 'q1-2026' ? 'Q1 2026' : 'Q4 2025'}
            </h3>
            <div className="space-y-4 text-sm">
              <p className="text-muted-foreground">
                This quarter showed steady progress toward your blueprint objectives. Key allocations remain on track with minor adjustments recommended.
              </p>
              <div>
                <h4 className="font-semibold mb-2">Key Changes</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Private Credit allocation initiated</li>
                  <li>Portfolio review completed</li>
                  <li>Risk assessment updated</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Next Actions</h4>
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
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="p-4 rounded-xl border border-border bg-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="font-semibold text-primary">RK</span>
          </div>
          <div>
            <p className="font-medium">Riya Kapoor</p>
            <p className="text-xs text-muted-foreground">Relationship Manager</p>
          </div>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
          {clientMessages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.sender === 'rm'
                  ? 'bg-muted mr-auto'
                  : 'bg-primary/10 ml-auto'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className="text-xs text-muted-foreground mt-1">{msg.timestamp}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-sm"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </div>
    </div>
  );
}
