import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import {
  LayoutDashboard,
  FileText,
  Lightbulb,
  Layers,
  ClipboardCheck,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
  PieChart,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  roles: string[];
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['client', 'rm', 'fa', 'admin'] },
  { id: 'portfolio', label: 'My Portfolio', icon: PieChart, roles: ['client'] },
  { id: 'blueprints', label: 'Blueprints', icon: FileText, roles: ['rm', 'fa', 'admin'] },
  { id: 'recommendations', label: 'Recommendations', icon: Lightbulb, roles: ['rm', 'fa'] },
  { id: 'structuring', label: 'Structuring', icon: Layers, roles: ['fa', 'admin'] },
  { id: 'execution', label: 'Execution', icon: ClipboardCheck, roles: ['rm', 'fa', 'admin'] },
  { id: 'clients', label: 'Clients', icon: Users, roles: ['rm', 'admin'] },
  { id: 'subsidiaries', label: 'Subsidiaries', icon: Building2, roles: ['admin'] },
  { id: 'settings', label: 'Settings', icon: Settings, roles: ['client', 'rm', 'fa', 'admin'] },
];

interface AppSidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export function AppSidebar({ activeSection = 'dashboard', onSectionChange }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { currentRole } = useAppStore();

  const filteredItems = navItems.filter((item) => item.roles.includes(currentRole));

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.2 }}
      className="relative h-screen border-r border-border/50 bg-sidebar flex flex-col"
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 z-50 h-6 w-6 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>

      {/* Logo Area */}
      <div className="h-16 flex items-center px-4 border-b border-border/50">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Navigation</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange?.(item.id)}
              className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSidebarItem"
                  className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-lg"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
              <Icon className={`relative z-10 h-5 w-5 flex-shrink-0 ${isActive ? 'text-primary' : ''}`} />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="relative z-10 text-sm font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-border/50">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
            <span className="text-primary-foreground text-sm font-semibold">JD</span>
          </div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium truncate">James Davidson</p>
                <p className="text-xs text-muted-foreground truncate">Senior RM</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
