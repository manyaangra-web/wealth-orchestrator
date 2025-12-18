import { motion } from 'framer-motion';
import { useAppStore, Blueprint } from '@/lib/store';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { FileText, Target, Clock, TrendingUp, ChevronRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface BlueprintCardProps {
  blueprint: Blueprint;
  showActions?: boolean;
}

export function BlueprintCard({ blueprint, showActions = true }: BlueprintCardProps) {
  const { updateBlueprintStatus, currentRole } = useAppStore();

  const handleActivate = () => {
    updateBlueprintStatus(blueprint.id, 'active');
    toast.success('Blueprint Activated', {
      description: `${blueprint.clientName}'s blueprint is now active and ready for recommendations.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-hover p-5"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-serif font-semibold">{blueprint.clientName}</h3>
            <p className="text-sm text-muted-foreground">Blueprint #{blueprint.id.toUpperCase()}</p>
          </div>
        </div>
        <StatusBadge status={blueprint.status} />
      </div>

      {/* Goals */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Target className="h-4 w-4" />
          <span>Goals</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {blueprint.goals.map((goal) => (
            <span
              key={goal}
              className="px-2 py-1 text-xs bg-secondary rounded-md text-secondary-foreground"
            >
              {goal}
            </span>
          ))}
        </div>
      </div>

      {/* Allocation */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <TrendingUp className="h-4 w-4" />
          <span>Target Allocation</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(blueprint.targetAllocation).map(([asset, percentage]) => (
            <div key={asset} className="text-center">
              <div className="text-lg font-semibold text-primary">{percentage}%</div>
              <div className="text-xs text-muted-foreground capitalize">{asset}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{blueprint.timeHorizon}</span>
        </div>
        <span>•</span>
        <span>Risk: {blueprint.riskTolerance}</span>
        <span>•</span>
        <span>Updated: {blueprint.updatedAt}</span>
      </div>

      {/* Actions */}
      {showActions && (currentRole === 'rm' || currentRole === 'fa') && (
        <div className="flex items-center gap-2 pt-4 border-t border-border/50">
          {blueprint.status === 'draft' ? (
            <Button onClick={handleActivate} size="sm" className="flex-1">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Activate Blueprint
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="flex-1">
              View Recommendations
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
}

export function BlueprintList() {
  const { blueprints } = useAppStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-semibold">Blueprints</h2>
        <Button variant="outline" size="sm">
          Create Blueprint
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {blueprints.map((blueprint) => (
          <BlueprintCard key={blueprint.id} blueprint={blueprint} />
        ))}
      </div>
    </div>
  );
}
