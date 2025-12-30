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
      animate={{ width: collapsed ? 64 : 260 }}
      transition={{ duration: 0.25 }}
      className="relative h-screen shadow-2xl border-r border-border/40 bg-gradient-to-br from-[#f8fafc]/80 via-[#e0e7ef]/70 to-[#f1f5f9]/90 backdrop-blur-lg flex flex-col overflow-hidden"
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 z-50 h-7 w-7 rounded-full bg-white/80 border border-border shadow-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors backdrop-blur"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      {/* Logo Area */}
      <div className="h-20 flex items-center px-4 border-b border-border/30 bg-white/40 backdrop-blur-md">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-3"
            >
              {/* Animated Logo */}
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg"
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="10" fill="#0ea5e9" opacity="0.18" />
                  <path d="M6 14 Q11 7 16 14" stroke="#22c55e" strokeWidth="2" fill="none" />
                  <circle cx="11" cy="11" r="3" fill="#FFD700" />
                </svg>
              </motion.div>
              <span className="text-lg font-bold text-primary tracking-wide select-none">Wealth<span className="text-accent">Orch</span></span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-5 px-2 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange?.(item.id)}
              className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                isActive
                  ? 'text-primary font-semibold bg-primary/10 shadow-md'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/5 hover:shadow-sm'
              }`}
              style={{ minHeight: 44 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSidebarItem"
                  className="absolute inset-0 bg-primary/15 border border-primary/30 rounded-xl shadow"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
              <Icon className={`relative z-10 h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-primary' : ''}`} />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="relative z-10 text-base font-medium whitespace-nowrap transition-colors"
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
      <div className="p-4 border-t border-border/30 bg-white/40 backdrop-blur-md">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-11 w-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-lg border-2 border-primary/30"
          >
            <span className="text-primary-foreground text-lg font-bold">JD</span>
          </motion.div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex-1 min-w-0"
              >
                <p className="text-base font-semibold truncate text-primary">James Davidson</p>
                <p className="text-xs text-muted-foreground truncate">Senior RM</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
