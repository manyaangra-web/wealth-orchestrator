import { motion } from 'framer-motion';
import { useAppStore, Recommendation } from '@/lib/store';
import { StatusBadge, WorkflowSteps } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { Lightbulb, Building2, DollarSign, ChevronRight, CheckCircle2, Play, Send } from 'lucide-react';
import { toast } from 'sonner';

interface RecommendationCardProps {
  recommendation: Recommendation;
  showActions?: boolean;
}

const workflowSteps = [
  { status: 'draft' as const, label: 'Draft' },
  { status: 'approved' as const, label: 'Approved' },
  { status: 'executing' as const, label: 'Executing' },
  { status: 'confirmed' as const, label: 'Confirmed' },
];

function getCurrentStep(status: Recommendation['status']) {
  return workflowSteps.findIndex((s) => s.status === status);
}

export function RecommendationCard({ recommendation, showActions = true }: RecommendationCardProps) {
  const { updateRecommendationStatus, createExecutionTicket, currentRole } = useAppStore();

  const handleAdvance = () => {
    const statusFlow: Record<Recommendation['status'], Recommendation['status'] | null> = {
      draft: 'approved',
      approved: 'executing',
      executing: 'confirmed',
      confirmed: null,
    };

    const nextStatus = statusFlow[recommendation.status];
    if (!nextStatus) return;

    updateRecommendationStatus(recommendation.id, nextStatus);

    if (nextStatus === 'executing') {
      createExecutionTicket(recommendation);
      toast.success('Execution Started', {
        description: `Execution ticket created for ${recommendation.title}. Partner: ${recommendation.partner}`,
      });
    } else if (nextStatus === 'approved') {
      toast.success('Recommendation Approved', {
        description: `${recommendation.title} has been approved for execution.`,
      });
    } else if (nextStatus === 'confirmed') {
      toast.success('Execution Confirmed', {
        description: `${recommendation.title} has been confirmed by ${recommendation.partner}.`,
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getActionButton = () => {
    if (currentRole === 'client') return null;

    const actions: Record<Recommendation['status'], { label: string; icon: React.ElementType } | null> = {
      draft: { label: 'Approve', icon: CheckCircle2 },
      approved: { label: 'Start Execution', icon: Play },
      executing: { label: 'Confirm', icon: Send },
      confirmed: null,
    };

    const action = actions[recommendation.status];
    if (!action) return null;

    const Icon = action.icon;

    return (
      <Button onClick={handleAdvance} size="sm" className="flex-1">
        <Icon className="h-4 w-4 mr-2" />
        {action.label}
      </Button>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-hover p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Lightbulb className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="font-serif font-semibold">{recommendation.title}</h3>
            <p className="text-sm text-muted-foreground">{recommendation.clientName}</p>
          </div>
        </div>
        <StatusBadge status={recommendation.status} />
      </div>

      {/* Workflow Progress */}
      <div className="mb-4 py-3 border-y border-border/30">
        <WorkflowSteps steps={workflowSteps} currentStep={getCurrentStep(recommendation.status)} />
      </div>

      {/* Details */}
      <p className="text-sm text-muted-foreground mb-4">{recommendation.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <DollarSign className="h-3 w-3" />
            Amount
          </div>
          <p className="font-semibold">{formatCurrency(recommendation.amount)}</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Building2 className="h-3 w-3" />
            Partner
          </div>
          <p className="font-semibold">{recommendation.partner}</p>
        </div>
      </div>

      {/* Asset */}
      <div className="p-3 bg-secondary/50 rounded-lg mb-4">
        <p className="text-xs text-muted-foreground mb-1">Asset</p>
        <p className="text-sm font-medium">{recommendation.asset}</p>
      </div>

      {/* Rationale */}
      <div className="text-xs text-muted-foreground mb-4">
        <span className="font-medium">Rationale:</span> {recommendation.rationale}
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex items-center gap-2 pt-4 border-t border-border/50">
          {getActionButton()}
          <Button variant="outline" size="sm">
            Details
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}

      {/* Partner Attribution */}
      <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
        <span>Created by {recommendation.createdBy}</span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Executed via regulated partners
        </span>
      </div>
    </motion.div>
  );
}

export function RecommendationList() {
  const { recommendations } = useAppStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-semibold">Recommendations</h2>
        <Button variant="outline" size="sm">
          New Recommendation
        </Button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {recommendations.map((rec) => (
          <RecommendationCard key={rec.id} recommendation={rec} />
        ))}
      </div>
    </div>
  );
}
