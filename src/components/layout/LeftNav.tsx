import { useAppStore, UserRole } from '@/lib/store';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
  roles?: UserRole[];
}

const navGroups: NavGroup[] = [
  {
    title: 'Narrative',
    items: [
      { id: 'landing', label: 'Landing' },
      { id: 'why-multifly', label: 'Why Multifly' },
      { id: 'how-it-works', label: 'How It Works' },
    ],
  },
  {
    title: 'Client Portal',
    roles: ['client'],
    items: [
      { id: 'client-home', label: 'Client Home' },
      { id: 'wealth-blueprint', label: 'Wealth Blueprint' },
      { id: 'recommendations', label: 'Recommendations' },
      { id: 'portfolio-overview', label: 'Portfolio Overview' },
      { id: 'reports', label: 'Reports' },
      { id: 'secure-messaging', label: 'Secure Messaging' },
    ],
  },
  {
    title: 'RM Console',
    roles: ['rm'],
    items: [
      { id: 'rm-dashboard', label: 'RM Dashboard' },
      { id: 'client-360', label: 'Client 360' },
      { id: 'onboarding-checklist', label: 'Onboarding Checklist' },
      { id: 'fa-collaboration', label: 'FA Collaboration' },
      { id: 'recommendations-pipeline', label: 'Recommendations Pipeline' },
      { id: 'structuring-cases', label: 'Structuring Cases' },
      { id: 'execution-tracker', label: 'Execution Tracker' },
      { id: 'alerts-next-actions', label: 'Alerts & Next Actions' },
      { id: 'quarterly-report-builder', label: 'Quarterly Report Builder' },
    ],
  },
  {
    title: 'FA Workbench',
    roles: ['fa'],
    items: [
      { id: 'fa-dashboard', label: 'FA Dashboard' },
      { id: 'blueprint-builder', label: 'Blueprint Builder' },
      { id: 'deal-dossiers', label: 'Deal Dossiers' },
      { id: 'recommendation-drafts', label: 'Recommendation Drafts' },
      { id: 'qa-checklist', label: 'QA Checklist' },
    ],
  },
  {
    title: 'Subsidiary Admin',
    roles: ['admin'],
    items: [
      { id: 'country-catalog', label: 'Country Catalog' },
      { id: 'eligibility-rules', label: 'Eligibility Rules' },
      { id: 'partner-profiles', label: 'Partner Profiles' },
      { id: 'template-library', label: 'Template Library' },
    ],
  },
];

export function LeftNav() {
  const { currentRole, currentScreen, setCurrentScreen } = useAppStore();

  const visibleGroups = navGroups.filter(
    (group) => !group.roles || group.roles.includes(currentRole)
  );

  return (
    <aside className="w-56 h-[calc(100vh-3.5rem-3rem)] border-r border-border bg-background overflow-y-auto">
      <nav className="p-4 space-y-6">
        {visibleGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
              {group.title}
            </h3>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentScreen(item.id)}
                    className={cn(
                      'w-full text-left px-3 py-2 text-sm rounded-md transition-colors',
                      currentScreen === item.id
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
