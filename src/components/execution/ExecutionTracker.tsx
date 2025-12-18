import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, Building2, DollarSign, ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export function ExecutionTracker() {
  const { executionTickets, updateExecutionStatus } = useAppStore();

  const handleAdvance = (id: string, currentStatus: string) => {
    const statusFlow: Record<string, string | null> = {
      created: 'submitted',
      submitted: 'processing',
      processing: 'confirmed',
      confirmed: null,
    };

    const nextStatus = statusFlow[currentStatus];
    if (!nextStatus) return;

    updateExecutionStatus(id, nextStatus as any);
    toast.success('Status Updated', {
      description: `Execution ticket advanced to ${nextStatus}`,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-semibold">Execution Tracker</h2>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          {executionTickets.length} Active Tickets
        </div>
      </div>

      <div className="space-y-3">
        {executionTickets.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <ClipboardCheck className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">No execution tickets yet</p>
            <p className="text-sm text-muted-foreground/70">Approve a recommendation to create an execution ticket</p>
          </div>
        ) : (
          executionTickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card-hover p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center">
                    <ClipboardCheck className="h-5 w-5 text-info" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{ticket.asset}</h4>
                      <StatusBadge status={ticket.status} size="sm" />
                    </div>
                    <p className="text-sm text-muted-foreground">{ticket.clientName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <DollarSign className="h-3 w-3" />
                      Amount
                    </div>
                    <p className="font-semibold">{formatCurrency(ticket.amount)}</p>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Building2 className="h-3 w-3" />
                      Partner
                    </div>
                    <p className="font-semibold">{ticket.partner}</p>
                  </div>

                  {ticket.status !== 'confirmed' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAdvance(ticket.id, ticket.status)}
                    >
                      Advance
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}

                  {ticket.status === 'confirmed' && (
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="text-sm font-medium">Complete</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
                <span>Ticket #{ticket.id.toUpperCase()}</span>
                <span>Created: {ticket.createdAt}</span>
                {ticket.confirmedAt && <span>Confirmed: {ticket.confirmedAt}</span>}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
