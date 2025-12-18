import { useAppStore, UserRole, ClientId } from '@/lib/store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const roleLabels: Record<UserRole, string> = {
  client: 'Client Portal',
  rm: 'RM Console',
  fa: 'FA Workbench',
  admin: 'Subsidiary Admin',
};

const screenTitles: Record<string, string> = {
  // Narrative
  landing: 'Landing',
  'why-multifly': 'Why Multifly',
  'how-it-works': 'How It Works',
  // Client Portal
  'client-home': 'Client Home',
  'wealth-blueprint': 'Wealth Blueprint',
  recommendations: 'Recommendations',
  'portfolio-overview': 'Portfolio Overview',
  reports: 'Reports',
  'secure-messaging': 'Secure Messaging',
  // RM Console
  'rm-dashboard': 'RM Dashboard',
  'client-360': 'Client 360',
  'onboarding-checklist': 'Onboarding Checklist',
  'fa-collaboration': 'FA Collaboration',
  'recommendations-pipeline': 'Recommendations Pipeline',
  'structuring-cases': 'Structuring Cases',
  'execution-tracker': 'Execution Tracker',
  'alerts-next-actions': 'Alerts & Next Actions',
  'quarterly-report-builder': 'Quarterly Report Builder',
  // FA Workbench
  'fa-dashboard': 'FA Dashboard',
  'blueprint-builder': 'Blueprint Builder',
  'deal-dossiers': 'Deal Dossiers',
  'recommendation-drafts': 'Recommendation Drafts',
  'qa-checklist': 'QA Checklist',
  // Structuring
  'structuring-summary': 'Structuring Case Summary',
  'country-checklist': 'Country Checklist',
  'document-packet': 'Document Packet',
  'signature-tracker': 'Signature Tracker',
  'execution-ticket': 'Execution Ticket',
  // Subsidiary Admin
  'country-catalog': 'Country Catalog',
  'eligibility-rules': 'Eligibility Rules',
  'partner-profiles': 'Partner Profiles',
  'template-library': 'Template Library',
};

export function TopBar() {
  const {
    currentRole,
    setCurrentRole,
    selectedClient,
    setSelectedClient,
    currentScreen,
    resetDemo,
    clients,
  } = useAppStore();

  const handleReset = () => {
    resetDemo();
    toast.success('Demo Reset', { description: 'All states have been reset to default.' });
  };

  const showClientSelector = currentRole !== 'admin' && !['landing', 'why-multifly', 'how-it-works'].includes(currentScreen);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="flex items-center justify-between h-14 px-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <span className="font-serif text-xl font-semibold tracking-tight text-foreground">MULTIFLY</span>
        </div>

        {/* Center: Page Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-sm font-medium text-muted-foreground">
            {screenTitles[currentScreen] || currentScreen}
          </h1>
        </div>

        {/* Right: Role Switcher + Demo Controls */}
        <div className="flex items-center gap-3">
          {/* Client Selector */}
          {showClientSelector && (
            <Select value={selectedClient} onValueChange={(v) => setSelectedClient(v as ClientId)}>
              <SelectTrigger className="w-[200px] h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.id === 'client-a' ? 'Client A: ' : 'Client B: '}
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Role Switcher */}
          <Select value={currentRole} onValueChange={(v) => setCurrentRole(v as UserRole)}>
            <SelectTrigger className="w-[160px] h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(roleLabels).map(([role, label]) => (
                <SelectItem key={role} value={role}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Demo Mode Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs font-medium text-primary">Demo Mode</span>
          </div>

          {/* Reset Demo Button */}
          <Button variant="outline" size="sm" onClick={handleReset} className="h-9">
            <RotateCcw className="h-4 w-4 mr-1.5" />
            Reset Demo
          </Button>
        </div>
      </div>
    </header>
  );
}
