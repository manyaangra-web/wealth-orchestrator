import { cn } from '@/lib/utils';
import { BlueprintStatus, RecommendationStatus, StructuringStatus, ExecutionStatus } from '@/lib/store';

type StatusType = BlueprintStatus | RecommendationStatus | StructuringStatus | ExecutionStatus;

interface StatusChipProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  draft: { label: 'Draft', className: 'bg-muted text-muted-foreground' },
  active: { label: 'Active', className: 'bg-primary/10 text-primary border-primary/20' },
  'client-approved': { label: 'Client Approved', className: 'bg-success/10 text-success border-success/20' },
  executing: { label: 'Executing', className: 'bg-info/10 text-info border-info/20' },
  confirmed: { label: 'Confirmed', className: 'bg-success/10 text-success border-success/20' },
  'not-started': { label: 'Not Started', className: 'bg-muted text-muted-foreground' },
  'in-progress': { label: 'In Progress', className: 'bg-warning/10 text-warning border-warning/20' },
  completed: { label: 'Completed', className: 'bg-success/10 text-success border-success/20' },
  created: { label: 'Created', className: 'bg-muted text-muted-foreground' },
  submitted: { label: 'Submitted', className: 'bg-info/10 text-info border-info/20' },
  processing: { label: 'Processing', className: 'bg-warning/10 text-warning border-warning/20' },
};

export function StatusChip({ status, className }: StatusChipProps) {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border',
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
        className="h-full bg-primary transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
}
