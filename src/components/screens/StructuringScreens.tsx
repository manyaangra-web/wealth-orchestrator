import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { StatusChip, ProgressBar } from '@/components/ui/StatusChip';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useState } from 'react';

export function StructuringSummaryScreen() {
  const { selectedClient, getClientStructuringCases } = useAppStore();
  const cases = getClientStructuringCases(selectedClient);
  const currentCase = cases[0];

  if (!currentCase) {
    return (
      <div className="max-w-2xl mx-auto">
        <p className="text-sm text-muted-foreground">No structuring cases found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="p-5 rounded-lg bg-white border border-border">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">{currentCase.name}</h2>
            <p className="text-sm text-muted-foreground">{currentCase.checklistTitle}</p>
          </div>
          <StatusChip status={currentCase.status} />
        </div>

        <div className="p-3 rounded-md bg-slate-50 border border-slate-100 mb-4">
          <p className="text-sm text-foreground">
            <span className="font-medium">Why structuring is required:</span>{' '}
            This opportunity requires cross-border onboarding, documentation, and approvals before partner execution.
          </p>
        </div>

        <ProgressBar
          progress={
            (currentCase.checklistItems.filter((i) => i.checked).length /
              currentCase.checklistItems.length) *
            100
          }
        />
      </div>
    </div>
  );
}

export function CountryChecklistScreen() {
  const { selectedClient, getClientStructuringCases, toggleChecklistItem } = useAppStore();
  const cases = getClientStructuringCases(selectedClient);
  const currentCase = cases[0];

  if (!currentCase) {
    return (
      <div className="max-w-xl mx-auto">
        <p className="text-sm text-muted-foreground">No structuring cases found.</p>
      </div>
    );
  }

  const progress =
    (currentCase.checklistItems.filter((i) => i.checked).length /
      currentCase.checklistItems.length) *
    100;

  const allComplete = progress === 100;

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <div className="p-5 rounded-lg bg-white border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg font-semibold text-foreground">{currentCase.checklistTitle}</h3>
          <span className="text-sm font-medium text-foreground">{Math.round(progress)}%</span>
        </div>
        <ProgressBar progress={progress} className="mb-5" />

        <div className="space-y-3">
          {currentCase.checklistItems.map((item) => (
            <label key={item.id} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={item.checked}
                onCheckedChange={() => toggleChecklistItem(currentCase.id, item.id)}
              />
              <span className={`text-sm ${item.checked ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {allComplete && (
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-700">
          Checklist complete. Execution ticket can now be submitted.
        </div>
      )}
    </div>
  );
}

export function DocumentPacketScreen() {
  const { selectedClient } = useAppStore();
  const isClientB = selectedClient === 'client-b';

  const [docs, setDocs] = useState({
    kyc: 'pending',
    subscription: 'pending',
    trust: 'pending',
  });

  const upload = (key: keyof typeof docs) => {
    setDocs({ ...docs, [key]: 'uploaded' });
    toast.success('Document uploaded');
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="p-5 rounded-lg bg-white border border-border space-y-3">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-2">Document Packet</h3>

        {[
          { key: 'kyc' as const, label: 'KYC Documents' },
          { key: 'subscription' as const, label: 'Subscription Documents' },
          ...(isClientB ? [{ key: 'trust' as const, label: 'Trust/Entity Documents' }] : []),
        ].map((item) => (
          <div key={item.key} className="p-3 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground capitalize">{docs[item.key]}</p>
            </div>
            {docs[item.key] === 'pending' && (
              <Button size="sm" variant="outline" onClick={() => upload(item.key)}>
                Upload
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SignatureTrackerScreen() {
  const { selectedClient } = useAppStore();
  const isClientB = selectedClient === 'client-b';

  const [signatures, setSignatures] = useState({
    subscription: 'pending',
    risk: 'pending',
    trust: 'pending',
  });

  const complete = (key: keyof typeof signatures) => {
    setSignatures({ ...signatures, [key]: 'completed' });
    toast.success('Signature captured');
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="p-5 rounded-lg bg-white border border-border space-y-3">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-2">Signature Tracker</h3>

        {[
          { key: 'subscription' as const, label: 'Client signature on subscription docs' },
          { key: 'risk' as const, label: 'Risk disclosure acknowledgement' },
          ...(isClientB ? [{ key: 'trust' as const, label: 'Trust sign-offs' }] : []),
        ].map((item) => (
          <div key={item.key} className="p-3 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground capitalize">{signatures[item.key]}</p>
            </div>
            {signatures[item.key] === 'pending' && (
              <Button size="sm" variant="outline" onClick={() => complete(item.key)}>
                Mark Completed
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExecutionTicketScreen() {
  const { selectedClient, getClientExecutionTickets, getClientStructuringCases, updateExecutionStatus } = useAppStore();
  const tickets = getClientExecutionTickets(selectedClient);
  const cases = getClientStructuringCases(selectedClient);
  const ticket = tickets[0];
  const structuringCase = cases[0];

  if (!ticket) {
    return (
      <div className="max-w-xl mx-auto">
        <p className="text-sm text-muted-foreground">No execution tickets found.</p>
      </div>
    );
  }

  const checklistComplete =
    structuringCase &&
    structuringCase.checklistItems.filter((i) => i.checked).length ===
      structuringCase.checklistItems.length;

  const handleSubmit = () => {
    updateExecutionStatus(ticket.id, 'submitted');
    toast.success('Ticket submitted to partner');
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="p-5 rounded-lg bg-white border border-border">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Execution Ticket</h3>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {[
            { label: 'Recommendation', value: ticket.name },
            { label: 'Partner', value: ticket.partner },
            { label: 'Packet Status', value: checklistComplete ? 'Complete' : 'Incomplete' },
          ].map((item) => (
            <div key={item.label}>
              <span className="text-xs text-muted-foreground">{item.label}</span>
              <p className="text-sm font-medium text-foreground">{item.value}</p>
            </div>
          ))}
          <div>
            <span className="text-xs text-muted-foreground">Ticket Status</span>
            <div className="mt-1">
              <StatusChip status={ticket.status} />
            </div>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!checklistComplete || ticket.status !== 'created'}
        >
          Submit to Partner
        </Button>
        {!checklistComplete && (
          <p className="text-xs text-muted-foreground mt-2">
            Complete the checklist, documents, and signatures before submitting.
          </p>
        )}
      </div>
    </div>
  );
}
