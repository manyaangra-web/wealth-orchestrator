import { cn } from '@/lib/utils';
import { BlueprintStatus, RecommendationStatus, StructuringStatus, ExecutionStatus } from '@/lib/store';

type StatusType = BlueprintStatus | RecommendationStatus | StructuringStatus | ExecutionStatus;

interface StatusChipProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  draft: { 
    label: 'Draft', 
    className: 'bg-muted text-muted-foreground border-border' 
  },
  active: { 
    label: 'Active', 
    className: 'bg-gold-muted text-gold border-gold/30' 
  },
  'client-approved': { 
    label: 'Client Approved', 
    className: 'bg-success-muted text-success border-success/30' 
  },
  executing: { 
    label: 'Executing', 
    className: 'bg-info/10 text-info border-info/30' 
  },
  confirmed: { 
    label: 'Confirmed', 
    className: 'bg-success-muted text-success border-success/30' 
  },
  'not-started': { 
    label: 'Not Started', 
    className: 'bg-muted text-muted-foreground border-border' 
  },
  'in-progress': { 
    label: 'In Progress', 
    className: 'bg-gold-muted text-gold border-gold/30' 
  },
  completed: { 
    label: 'Completed', 
    className: 'bg-success-muted text-success border-success/30' 
  },
  created: { 
    label: 'Created', 
    className: 'bg-muted text-muted-foreground border-border' 
  },
  submitted: { 
    label: 'Submitted', 
    className: 'bg-info/10 text-info border-info/30' 
  },
  processing: { 
    label: 'Processing', 
    className: 'bg-gold-muted text-gold border-gold/30' 
  },
};

export function StatusChip({ status, className }: StatusChipProps) {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border tracking-wide',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export function ProgressBar({ progress, className }: ProgressBarProps) {
  return (
    <div className={cn('h-2 w-full bg-muted rounded-full overflow-hidden', className)}>
      <div
        className="h-full bg-gradient-to-r from-gold to-gold-light transition-all duration-500 rounded-full"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
}