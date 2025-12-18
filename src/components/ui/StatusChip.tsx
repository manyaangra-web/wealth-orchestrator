import { cn } from '@/lib/utils';
import { BlueprintStatus, RecommendationStatus, StructuringStatus, ExecutionStatus } from '@/lib/store';

type StatusType = BlueprintStatus | RecommendationStatus | StructuringStatus | ExecutionStatus;

interface StatusChipProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; bg: string; text: string; border: string }> = {
  draft: { label: 'Draft', bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' },
  active: { label: 'Active', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  'client-approved': { label: 'Client Approved', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  executing: { label: 'Executing', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  confirmed: { label: 'Confirmed', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  'not-started': { label: 'Not Started', bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' },
  'in-progress': { label: 'In Progress', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  completed: { label: 'Completed', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  created: { label: 'Created', bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' },
  submitted: { label: 'Submitted', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  processing: { label: 'Processing', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
};

export function StatusChip({ status, className }: StatusChipProps) {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border',
        config.bg,
        config.text,
        config.border,
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
    <div className={cn('h-1.5 w-full bg-slate-100 rounded-full overflow-hidden', className)}>
      <div
        className="h-full bg-primary transition-all duration-300 rounded-full"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
}
