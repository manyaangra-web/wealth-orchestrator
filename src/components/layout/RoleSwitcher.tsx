import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, UserRole } from '@/lib/store';
import { User, Briefcase, LineChart, Shield } from 'lucide-react';

const roles: { id: UserRole; label: string; icon: React.ElementType; description: string }[] = [
  { id: 'client', label: 'Client', icon: User, description: 'Portfolio Overview' },
  { id: 'rm', label: 'RM', icon: Briefcase, description: 'Relationship Manager' },
  { id: 'fa', label: 'FA', icon: LineChart, description: 'Financial Advisor' },
  { id: 'admin', label: 'Admin', icon: Shield, description: 'Subsidiary Admin' },
];

export function RoleSwitcher() {
  const { currentRole, setCurrentRole } = useAppStore();

  return (
    <div className="flex items-center gap-1 p-1 bg-secondary/50 rounded-lg backdrop-blur-sm border border-border/50">
      {roles.map((role) => {
        const Icon = role.icon;
        const isActive = currentRole === role.id;

        return (
          <button
            key={role.id}
            onClick={() => setCurrentRole(role.id)}
            className="relative px-3 py-2 rounded-md transition-colors"
          >
            {isActive && (
              <motion.div
                layoutId="activeRole"
                className="absolute inset-0 bg-primary rounded-md"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span
              className={`relative z-10 flex items-center gap-2 text-sm font-medium transition-colors ${
                isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{role.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function RoleBadge() {
  const { currentRole } = useAppStore();
  const role = roles.find((r) => r.id === currentRole);

  if (!role) return null;

  const Icon = role.icon;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentRole}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="flex items-center gap-3"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20">
          <Icon className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">{role.description}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
