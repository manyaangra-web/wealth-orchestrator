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
    return <p className="text-muted-foreground">No structuring cases found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="p-6 rounded-xl border border-border bg-card">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="font-serif text-xl font-semibold">{currentCase.name}</h2>
            <p className="text-sm text-muted-foreground">{currentCase.checklistTitle}</p>
          </div>
          <StatusChip status={currentCase.status} />
        </div>

        <div className="p-4 rounded-lg bg-muted/50 mb-4">
          <p className="text-sm">
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
  const { selectedClient, getClientStructuringCases, toggleChecklistItem, updateStructuringStatus } = useAppStore();
  const cases = getClientStructuringCases(selectedClient);
  const currentCase = cases[0];

  if (!currentCase) {
    return <p className="text-muted-foreground">No structuring cases found.</p>;
  }

  const progress =
    (currentCase.checklistItems.filter((i) => i.checked).length /
      currentCase.checklistItems.length) *
    100;

  const allComplete = progress === 100;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="p-6 rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg font-semibold">{currentCase.checklistTitle}</h3>
          <span className="text-sm font-medium">{Math.round(progress)}%</span>
        </div>
        <ProgressBar progress={progress} className="mb-6" />

        <div className="space-y-3">
          {currentCase.checklistItems.map((item) => (
            <label key={item.id} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={item.checked}
                onCheckedChange={() => toggleChecklistItem(currentCase.id, item.id)}
              />
              <span className={item.checked ? 'text-muted-foreground line-through' : ''}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {allComplete && (
        <div className="p-4 rounded-lg bg-success/10 border border-success/20 text-sm text-success">
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
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="p-6 rounded-xl border border-border bg-card space-y-4">
        <h3 className="font-serif text-lg font-semibold">Document Packet</h3>

        <div className="p-4 rounded-lg bg-muted/50 flex items-center justify-between">
          <div>
            <p className="font-medium">KYC Documents</p>
            <p className="text-sm text-muted-foreground capitalize">{docs.kyc}</p>
          </div>
          {docs.kyc === 'pending' && (
            <Button size="sm" variant="outline" onClick={() => upload('kyc')}>
              Upload
            </Button>
          )}
        </div>

        <div className="p-4 rounded-lg bg-muted/50 flex items-center justify-between">
          <div>
            <p className="font-medium">Subscription Documents</p>
            <p className="text-sm text-muted-foreground capitalize">{docs.subscription}</p>
          </div>
          {docs.subscription === 'pending' && (
            <Button size="sm" variant="outline" onClick={() => upload('subscription')}>
              Upload
            </Button>
          )}
        </div>

        {isClientB && (
          <div className="p-4 rounded-lg bg-muted/50 flex items-center justify-between">
            <div>
              <p className="font-medium">Trust/Entity Documents</p>
              <p className="text-sm text-muted-foreground capitalize">{docs.trust}</p>
            </div>
            {docs.trust === 'pending' && (
              <Button size="sm" variant="outline" onClick={() => upload('trust')}>
                Upload
              </Button>
            )}
          </div>
        )}
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
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="p-6 rounded-xl border border-border bg-card space-y-4">
        <h3 className="font-serif text-lg font-semibold">Signature Tracker</h3>

        <div className="p-4 rounded-lg bg-muted/50 flex items-center justify-between">
          <div>
            <p className="font-medium">Client signature on subscription docs</p>
            <p className="text-sm text-muted-foreground capitalize">{signatures.subscription}</p>
          </div>
          {signatures.subscription === 'pending' && (
            <Button size="sm" variant="outline" onClick={() => complete('subscription')}>
              Mark Completed
            </Button>
          )}
        </div>

        <div className="p-4 rounded-lg bg-muted/50 flex items-center justify-between">
          <div>
            <p className="font-medium">Risk disclosure acknowledgement</p>
            <p className="text-sm text-muted-foreground capitalize">{signatures.risk}</p>
          </div>
          {signatures.risk === 'pending' && (
            <Button size="sm" variant="outline" onClick={() => complete('risk')}>
              Mark Completed
            </Button>
          )}
        </div>

        {isClientB && (
          <div className="p-4 rounded-lg bg-muted/50 flex items-center justify-between">
            <div>
              <p className="font-medium">Trust sign-offs</p>
              <p className="text-sm text-muted-foreground capitalize">{signatures.trust}</p>
            </div>
            {signatures.trust === 'pending' && (
              <Button size="sm" variant="outline" onClick={() => complete('trust')}>
                Mark Completed
              </Button>
            )}
          </div>
        )}
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
    return <p className="text-muted-foreground">No execution tickets found.</p>;
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
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="font-serif text-lg font-semibold mb-4">Execution Ticket</h3>

        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <span className="text-muted-foreground">Recommendation</span>
            <p className="font-medium">{ticket.name}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Partner</span>
            <p className="font-medium">{ticket.partner}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Packet Status</span>
            <p className="font-medium">{checklistComplete ? 'Complete' : 'Incomplete'}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Ticket Status</span>
            <StatusChip status={ticket.status} />
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
