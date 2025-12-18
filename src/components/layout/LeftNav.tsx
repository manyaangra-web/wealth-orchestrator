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
    <aside className="w-52 lg:w-56 flex-shrink-0 bg-sidebar border-r border-sidebar-border overflow-y-auto">
      <nav className="p-3 lg:p-4">
        {visibleGroups.map((group, groupIdx) => (
          <div key={group.title} className={groupIdx > 0 ? 'mt-6' : ''}>
            <h3 className="text-[10px] font-semibold text-sidebar-primary uppercase tracking-wider mb-2 px-2">
              {group.title}
            </h3>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentScreen(item.id)}
                    className={cn(
                      'w-full text-left px-2.5 py-1.5 text-sm rounded-md transition-all duration-200',
                      currentScreen === item.id
                        ? 'bg-sidebar-accent text-sidebar-primary font-medium border-l-2 border-sidebar-primary'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
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
