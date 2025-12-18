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
  landing: 'Landing',
  'why-multifly': 'Why Multifly',
  'how-it-works': 'How It Works',
  'client-home': 'Client Home',
  'wealth-blueprint': 'Wealth Blueprint',
  recommendations: 'Recommendations',
  'portfolio-overview': 'Portfolio Overview',
  reports: 'Reports',
  'secure-messaging': 'Secure Messaging',
  'rm-dashboard': 'RM Dashboard',
  'client-360': 'Client 360',
  'onboarding-checklist': 'Onboarding Checklist',
  'fa-collaboration': 'FA Collaboration',
  'recommendations-pipeline': 'Recommendations Pipeline',
  'structuring-cases': 'Structuring Cases',
  'execution-tracker': 'Execution Tracker',
  'alerts-next-actions': 'Alerts & Next Actions',
  'quarterly-report-builder': 'Quarterly Report Builder',
  'fa-dashboard': 'FA Dashboard',
  'blueprint-builder': 'Blueprint Builder',
  'deal-dossiers': 'Deal Dossiers',
  'recommendation-drafts': 'Recommendation Drafts',
  'qa-checklist': 'QA Checklist',
  'structuring-summary': 'Structuring Case Summary',
  'country-checklist': 'Country Checklist',
  'document-packet': 'Document Packet',
  'signature-tracker': 'Signature Tracker',
  'execution-ticket': 'Execution Ticket',
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
    <header className="sticky top-0 z-50 header-navy">
      <div className="flex items-center justify-between h-14 px-4 lg:px-6">
        {/* Left: Logo */}
        <div className="flex items-center">
          <span className="font-serif text-xl font-bold text-gold tracking-tight">MULTIFLY</span>
        </div>

        {/* Center: Page Title */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-sm font-medium text-gold-light/80">
            {screenTitles[currentScreen] || currentScreen}
          </h1>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Client Selector */}
          {showClientSelector && (
            <Select value={selectedClient} onValueChange={(v) => setSelectedClient(v as ClientId)}>
              <SelectTrigger className="w-[140px] lg:w-[180px] h-8 text-xs lg:text-sm bg-navy-light/50 border-navy-light text-gold-light hover:bg-navy-light/70">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-navy border-navy-light">
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id} className="text-gold-light hover:bg-navy-light focus:bg-navy-light focus:text-gold">
                    {client.id === 'client-a' ? 'Client A: ' : 'Client B: '}
                    {client.name.split(' ')[0]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Role Switcher */}
          <Select value={currentRole} onValueChange={(v) => setCurrentRole(v as UserRole)}>
            <SelectTrigger className="w-[120px] lg:w-[140px] h-8 text-xs lg:text-sm bg-navy-light/50 border-navy-light text-gold-light hover:bg-navy-light/70">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-navy border-navy-light">
              {Object.entries(roleLabels).map(([role, label]) => (
                <SelectItem key={role} value={role} className="text-gold-light hover:bg-navy-light focus:bg-navy-light focus:text-gold">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Demo Mode Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-gold/20 rounded-full border border-gold/40">
            <div className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-medium text-gold">Demo</span>
          </div>

          {/* Reset Demo Button */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleReset} 
            className="h-8 text-xs bg-transparent border-gold/40 text-gold hover:bg-gold/20 hover:text-gold hover:border-gold/60"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            <span className="hidden lg:inline">Reset</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
