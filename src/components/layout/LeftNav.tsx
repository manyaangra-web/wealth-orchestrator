import { useAppStore, UserRole } from '@/lib/store';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  FileText, 
  HelpCircle, 
  User, 
  MapPin, 
  Target, 
  TrendingUp, 
  BarChart3, 
  MessageSquare,
  Crown,
  Users,
  CheckSquare,
  UserCheck,
  PlusCircle,
  Building,
  Zap,
  Bell,
  FileCheck,
  Briefcase,
  Map,
  FolderOpen,
  Edit3,
  ClipboardCheck,
  Settings,
  Globe,
  Shield,
  Building2,
  Library
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon?: any;
}

interface NavGroup {
  title: string;
  items: NavItem[];
  roles?: UserRole[];
  icon?: any;
}

const navGroups: NavGroup[] = [
  {
    title: 'Narrative',
    icon: FileText,
    items: [
      { id: 'landing', label: 'Home', icon: Home },
      { id: 'why-multifly', label: 'Why Multifly', icon: Target },
      { id: 'how-it-works', label: 'How It Works', icon: HelpCircle },
    ],
  },
  {
    title: 'Client Portal',
    icon: User,
    roles: ['client'],
    items: [
      { id: 'client-home', label: 'Client Home', icon: Home },
      { id: 'wealth-blueprint', label: 'Wealth Blueprint', icon: Map },
      { id: 'recommendations', label: 'Recommendations', icon: Target },
      { id: 'portfolio-overview', label: 'Portfolio Overview', icon: BarChart3 },
      { id: 'reports', label: 'Reports', icon: FileText },
      { id: 'secure-messaging', label: 'Secure Messaging', icon: MessageSquare },
    ],
  },
  {
    title: 'RM Console',
    icon: Crown,
    roles: ['rm'],
    items: [
      { id: 'rm-dashboard', label: 'RM Dashboard', icon: BarChart3 },
      { id: 'client-360', label: 'Client 360', icon: Users },
      { id: 'onboarding-checklist', label: 'Onboarding Checklist', icon: CheckSquare },
      { id: 'fa-collaboration', label: 'FA Collaboration', icon: UserCheck },
      { id: 'recommendations-pipeline', label: 'Recommendations Pipeline', icon: PlusCircle },
      { id: 'structuring-cases', label: 'Structuring Cases', icon: Building },
      { id: 'execution-tracker', label: 'Execution Tracker', icon: Zap },
      { id: 'alerts-next-actions', label: 'Alerts & Next Actions', icon: Bell },
      { id: 'quarterly-report-builder', label: 'Quarterly Report Builder', icon: FileCheck },
    ],
  },
  {
    title: 'FA Workbench',
    icon: Briefcase,
    roles: ['fa'],
    items: [
      { id: 'fa-dashboard', label: 'FA Dashboard', icon: BarChart3 },
      { id: 'blueprint-builder', label: 'Blueprint Builder', icon: Map },
      { id: 'deal-dossiers', label: 'Deal Dossiers', icon: FolderOpen },
      { id: 'recommendation-drafts', label: 'Recommendation Drafts', icon: Edit3 },
      { id: 'qa-checklist', label: 'QA Checklist', icon: ClipboardCheck },
    ],
  },
  {
    title: 'Subsidiary Admin',
    icon: Settings,
    roles: ['admin'],
    items: [
      { id: 'country-catalog', label: 'Country Catalog', icon: Globe },
      { id: 'eligibility-rules', label: 'Eligibility Rules', icon: Shield },
      { id: 'partner-profiles', label: 'Partner Profiles', icon: Building2 },
      { id: 'template-library', label: 'Template Library', icon: Library },
    ],
  },
];

const roleColors: Record<UserRole, string> = {
  client: 'from-blue-500/20 to-blue-600/20',
  rm: 'from-gold/20 to-gold-light/20',
  fa: 'from-green-500/20 to-green-600/20',
  admin: 'from-purple-500/20 to-purple-600/20',
};

const groupVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 }
  }
};

export function LeftNav() {
  const { currentRole, currentScreen, setCurrentScreen } = useAppStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for access token on component mount and when storage changes
  useEffect(() => {
    const checkAuthToken = () => {
      const token = localStorage.getItem('access_token');
      setIsAuthenticated(!!token);
    };

    checkAuthToken();

    // Listen for storage changes
    window.addEventListener('storage', checkAuthToken);
    window.addEventListener('authStateChanged', checkAuthToken);

    return () => {
      window.removeEventListener('storage', checkAuthToken);
      window.removeEventListener('authStateChanged', checkAuthToken);
    };
  }, []);

  // Filter groups based on authentication
  const visibleGroups = navGroups.filter((group) => {
    // Always show Narrative section
    if (group.title === 'Narrative') {
      return true;
    }
    
    // Hide role-specific sections if not authenticated
    if (!isAuthenticated) {
      return false;
    }
    
    // Show role-specific sections if authenticated and user has the role
    return !group.roles || group.roles.includes(currentRole);
  });

  return (
    <motion.aside 
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="w-64 lg:w-72 flex-shrink-0 bg-gradient-to-b from-sidebar via-sidebar/95 to-sidebar/90 border-r border-sidebar-border/40 backdrop-blur-sm overflow-y-auto shadow-xl"
    >
      {/* Header gradient */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-navy/10 via-gold/5 to-transparent pointer-events-none" />
      
      <nav className="relative p-4 lg:p-6 space-y-6">
        <AnimatePresence mode="wait">
          {visibleGroups.map((group, groupIdx) => {
            const GroupIcon = group.icon;
            
            return (
              <motion.div
                key={`${group.title}-${currentRole}`}
                variants={groupVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-3"
              >
                {/* Group Header */}
        

                {/* Group Items */}
                <motion.ul className="space-y-1 pl-2">
                  {group.items.map((item) => {
                    const ItemIcon = item.icon;
                    const isActive = currentScreen === item.id;
                    
                    return (
                      <motion.li 
                        key={item.id}
                        variants={itemVariants}
                      >
                        <motion.button
                          onClick={() => setCurrentScreen(item.id)}
                          whileHover={{ 
                            scale: 1.02, 
                            x: 4,
                            transition: { duration: 0.2 }
                          }}
                          whileTap={{ scale: 0.98 }}
                          className={cn(
                            'group w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-300 relative overflow-hidden',
                            isActive
                              ? `bg-gradient-to-r ${roleColors[currentRole]} border border-gold/30 text-sidebar-primary font-semibold shadow-lg backdrop-blur-sm`
                              : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground hover:shadow-md'
                          )}
                        >
                          {/* Active indicator */}
                          {isActive && (
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold to-gold-light"
                            />
                          )}
                          
                          {/* Hover effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                          
                          {/* Content */}
                          <div className="relative flex items-center gap-3 w-full">
                            {ItemIcon && (
                              <ItemIcon 
                                className={cn(
                                  'w-4 h-4 transition-all duration-300',
                                  isActive 
                                    ? 'text-gold scale-110' 
                                    : 'text-sidebar-foreground group-hover:text-gold group-hover:scale-105'
                                )}
                              />
                            )}
                            <span className="flex-1 text-left group-hover:translate-x-0.5 transition-transform duration-200">
                              {item.label}
                            </span>
                            
                            {/* Active pulse indicator */}
                            {isActive && (
                              <motion.div
                                animate={{ 
                                  scale: [1, 1.2, 1],
                                  opacity: [0.7, 1, 0.7]
                                }}
                                transition={{ 
                                  duration: 2, 
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                                className="w-2 h-2 rounded-full bg-gold shadow-lg"
                              />
                            )}
                          </div>
                        </motion.button>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {/* Role indicator at bottom */}
    
      </nav>
    </motion.aside>
  );
}
