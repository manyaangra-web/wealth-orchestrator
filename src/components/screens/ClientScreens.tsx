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
    <div className="max-w-3xl mx-auto space-y-6 px-4">
      {/* Client Summary Card */}
      <div className="card-elevated p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center">
            <span className="text-gold font-serif text-xl font-bold">{client.name.charAt(0)}</span>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Welcome, {client.name.split(' ')[0]}
            </h2>
            <p className="text-sm text-muted-foreground">{client.segment}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Segment', value: client.segment },
            { label: 'Net Worth', value: client.netWorth },
            { label: 'Risk Band', value: client.riskBand },
            { label: 'RM', value: client.rm },
          ].map((item) => (
            <div key={item.label} className="p-3 rounded-lg bg-muted/50">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">{item.label}</span>
              <p className="text-sm font-semibold text-foreground mt-1">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Blueprint Card */}
      <div className="card-elevated p-6 gold-accent pl-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-xl font-semibold text-foreground">Your Wealth Blueprint</h3>
          <StatusChip status={blueprint.status} />
        </div>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          A living plan aligned to your goals. Updated annually or when life changes.
        </p>
        <Button 
          onClick={() => setCurrentScreen('wealth-blueprint')}
          className="bg-navy hover:bg-navy-light text-gold"
        >
          View Wealth Blueprint
        </Button>
      </div>

      {/* Next Actions Card */}
      <div className="card-premium p-6">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Next Actions</h3>
        <ul className="space-y-3">
          {nextActions.map((action, idx) => (
            <li key={idx} className="flex items-center gap-3 text-sm text-foreground p-3 rounded-lg bg-gold-muted/50 border border-gold/10">
              <span className="h-2 w-2 rounded-full bg-gold flex-shrink-0" />
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
    <div className="max-w-3xl mx-auto space-y-6 px-4">
      {/* Overview */}
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-semibold text-foreground">Blueprint Overview</h2>
          <StatusChip status={blueprint.status} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-navy-muted border border-navy/10">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Horizon</span>
            <p className="text-base font-semibold text-navy mt-1">{blueprint.horizon}</p>
          </div>
          {blueprint.passiveIncomeTarget && (
            <div className="p-4 rounded-lg bg-gold-muted border border-gold/20">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Passive Income Target</span>
              <p className="text-base font-semibold text-gold mt-1">{blueprint.passiveIncomeTarget}</p>
            </div>
          )}
          {blueprint.objective && (
            <div className="p-4 rounded-lg bg-muted/50 col-span-2 lg:col-span-1">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Key Objective</span>
              <p className="text-sm font-medium text-foreground mt-1">{blueprint.objective}</p>
            </div>
          )}
        </div>
      </div>

      {/* Milestones */}
      <div className="card-premium p-6">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-5">Milestones</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {blueprint.milestones.map((milestone, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-gradient-to-br from-navy-muted to-muted/30 border border-navy/10">
              <span className="text-xs font-bold text-gold uppercase tracking-wide">{milestone.period}</span>
              <p className="text-sm text-foreground mt-2 leading-relaxed">{milestone.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Allocation Targets */}
      <div className="card-elevated p-6">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-5">Allocation Targets</h3>
        <div className="space-y-4">
          {blueprint.allocationTargets.map((target, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="text-sm text-foreground w-40 flex-shrink-0">{target.name}</span>
              <div className="flex-1">
                <ProgressBar progress={target.percentage} />
              </div>
              <span className="text-sm font-bold text-navy w-12 text-right">{target.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {blueprint.status === 'draft' && (
          <Button onClick={handleApprove} className="bg-gold hover:bg-gold-light text-navy font-semibold">
            Approve Blueprint
          </Button>
        )}
        <Button 
          variant="outline" 
          onClick={() => setCurrentScreen('secure-messaging')}
          className="border-navy/30 text-navy hover:bg-navy-muted"
        >
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
    <div className="max-w-3xl mx-auto space-y-6 px-4">
      <div className="card-premium p-5">
        <p className="text-sm text-muted-foreground">
          Your recommendations are curated from vetted partners and aligned to your Wealth Blueprint.
        </p>
      </div>

      {blueprint.status === 'draft' && (
        <div className="p-5 rounded-xl bg-gold-muted border border-gold/30 text-sm text-gold">
          <span className="font-semibold">Action Required:</span> Please approve your Wealth Blueprint first to unlock recommendations.
        </div>
      )}

      <div className="space-y-5">
        {recommendations.map((rec) => (
          <div key={rec.id} className="card-elevated p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground">{rec.name}</h3>
                <p className="text-sm text-gold font-medium">{rec.partner}</p>
              </div>
              <StatusChip status={rec.status} />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 rounded-lg bg-navy-muted border border-navy/10">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Amount</span>
                <p className="text-sm font-semibold text-navy mt-1">{rec.amount}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Liquidity</span>
                <p className="text-sm font-semibold text-foreground mt-1">{rec.liquidity}</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gold-muted/30 border border-gold/10 mb-5">
              <span className="text-xs font-semibold text-gold uppercase tracking-wide">Rationale</span>
              <p className="text-sm text-foreground mt-1 leading-relaxed">{rec.rationale}</p>
            </div>
            <div className="flex gap-3">
              {rec.status === 'draft' && blueprint.status === 'active' && (
                <Button onClick={() => handleApprove(rec.id)} className="bg-navy hover:bg-navy-light text-gold">
                  Approve Recommendation
                </Button>
              )}
              <Button variant="outline" className="border-border text-foreground hover:bg-muted">
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
    <div className="max-w-3xl mx-auto space-y-6 px-4">
      <div className="card-premium p-5">
        <p className="text-sm text-muted-foreground">
          Consolidated view across public, private, and alternative holdings. Updated periodically via partners.
        </p>
      </div>

      {/* Net Worth */}
      <div className="card-elevated p-8 bg-gradient-to-br from-navy to-navy-light text-center">
        <span className="text-sm text-gold-light/80 uppercase tracking-wider">Total Net Worth</span>
        <p className="text-4xl font-serif font-bold text-gold mt-2">{client.netWorth}</p>
      </div>

      {/* Allocation Summary */}
      <div className="card-premium p-6">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-5">Target Allocation View</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {blueprint.allocationTargets.map((target, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-gradient-to-br from-navy-muted to-gold-muted/20 border border-navy/10 text-center">
              <p className="text-2xl font-bold text-navy">{target.percentage}%</p>
              <p className="text-xs text-muted-foreground mt-1 font-medium">{target.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Holdings Categories */}
      <div className="card-elevated p-6">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-5">Holdings Categories</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {['Private Credit', 'Private Equity', 'Global Equities', 'Real Assets', 'Alternatives', 'Cash'].map((category) => (
            <div key={category} className="px-4 py-3 rounded-lg bg-muted/50 border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
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
    <div className="max-w-3xl mx-auto space-y-6 px-4">
      <div className="card-premium p-5">
        <p className="text-sm text-muted-foreground">
          Quarterly reports summarise progress vs blueprint, key events, and recommended next actions.
        </p>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="card-elevated p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-navy-muted flex items-center justify-center">
                <span className="text-navy text-xs font-bold">PDF</span>
              </div>
              <span className="text-sm font-semibold text-foreground">{report.title}</span>
            </div>
            <Button variant="outline" onClick={() => setPreviewOpen(report.id)} className="border-navy/20 text-navy hover:bg-navy-muted">
              Preview
            </Button>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 bg-navy/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-card rounded-2xl p-8 max-w-xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-border">
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
              Quarterly Wealth Summary — {previewOpen === 'q1-2026' ? 'Q1 2026' : 'Q4 2025'}
            </h3>
            <div className="space-y-6 text-sm">
              <p className="text-muted-foreground leading-relaxed">
                This quarter showed steady progress toward your blueprint objectives. Key allocations remain on track with minor adjustments recommended.
              </p>
              <div className="p-4 rounded-lg bg-navy-muted border border-navy/10">
                <h4 className="font-semibold text-navy mb-3">Key Changes</h4>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold" />Private Credit allocation initiated</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold" />Portfolio review completed</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold" />Risk assessment updated</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-gold-muted border border-gold/20">
                <h4 className="font-semibold text-gold mb-3">Next Actions</h4>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-navy" />Schedule quarterly review with RM</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-navy" />Review upcoming liquidity events</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-navy" />Consider additional diversification</li>
                </ul>
              </div>
            </div>
            <Button className="mt-8 bg-navy hover:bg-navy-light text-gold" onClick={() => setPreviewOpen(null)}>Close</Button>
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
    <div className="max-w-xl mx-auto px-4">
      <div className="card-elevated p-6">
        <div className="flex items-center gap-4 mb-6 pb-5 border-b border-border">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center">
            <span className="font-bold text-gold text-sm">RK</span>
          </div>
          <div>
            <p className="font-semibold text-foreground">Riya Kapoor</p>
            <p className="text-xs text-muted-foreground">Relationship Manager</p>
          </div>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto mb-6">
          {clientMessages.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 rounded-xl max-w-[85%] ${
                msg.sender === 'rm'
                  ? 'bg-navy-muted mr-auto border border-navy/10'
                  : 'bg-gold-muted ml-auto border border-gold/20'
              }`}
            >
              <p className="text-sm text-foreground leading-relaxed">{msg.text}</p>
              <p className="text-[10px] text-muted-foreground mt-2">{msg.timestamp}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend} className="bg-navy hover:bg-navy-light text-gold px-6">Send</Button>
        </div>
      </div>
    </div>
  );
}