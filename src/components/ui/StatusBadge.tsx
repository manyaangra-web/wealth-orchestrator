import { motion } from 'framer-motion';
import { BlueprintStatus, RecommendationStatus, StructuringStatus, ExecutionStatus } from '@/lib/store';
import { CheckCircle2, Clock, FileEdit, Play, Send, Loader2, Circle } from 'lucide-react';

type StatusType = BlueprintStatus | RecommendationStatus | StructuringStatus | ExecutionStatus;

interface StatusBadgeProps {
  status: StatusType;
  size?: 'sm' | 'md';
}

const statusConfig: Record<StatusType, { label: string; className: string; icon: React.ElementType }> = {
  // Blueprint statuses
  draft: { label: 'Draft', className: 'status-draft', icon: FileEdit },
  active: { label: 'Active', className: 'status-active', icon: CheckCircle2 },
  
  // Recommendation statuses
  approved: { label: 'Approved', className: 'status-active', icon: CheckCircle2 },
  executing: { label: 'Executing', className: 'status-processing', icon: Loader2 },
  confirmed: { label: 'Confirmed', className: 'status-confirmed', icon: CheckCircle2 },
  
  // Structuring statuses
  not_started: { label: 'Not Started', className: 'status-draft', icon: Circle },
  in_progress: { label: 'In Progress', className: 'status-pending', icon: Clock },
  completed: { label: 'Completed', className: 'status-confirmed', icon: CheckCircle2 },
  
  // Execution statuses
  created: { label: 'Created', className: 'status-draft', icon: FileEdit },
  submitted: { label: 'Submitted', className: 'status-pending', icon: Send },
  processing: { label: 'Processing', className: 'status-processing', icon: Loader2 },
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`status-badge ${config.className} ${size === 'sm' ? 'text-xs px-2 py-0.5' : ''}`}
    >
      <Icon className={`mr-1.5 ${size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} ${status === 'executing' || status === 'processing' ? 'animate-spin' : ''}`} />
      {config.label}
    </motion.span>
  );
}

interface WorkflowStepsProps {
  steps: { status: StatusType; label: string }[];
  currentStep: number;
}

export function WorkflowSteps({ steps, currentStep }: WorkflowStepsProps) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={step.status} className="flex items-center">
            <motion.div
              initial={false}
              animate={{
                scale: isCurrent ? 1.1 : 1,
                opacity: isCompleted || isCurrent ? 1 : 0.4,
              }}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                isCompleted
                  ? 'bg-success-muted text-success'
                  : isCurrent
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-3 w-3" />
              ) : isCurrent ? (
                <Play className="h-3 w-3" />
              ) : (
                <Circle className="h-3 w-3" />
              )}
              {step.label}
            </motion.div>
            {index < steps.length - 1 && (
              <div
                className={`w-6 h-px mx-1 ${
                  isCompleted ? 'bg-success' : 'bg-border'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
