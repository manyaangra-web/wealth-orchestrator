import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { RoleSwitcher, RoleBadge } from './RoleSwitcher';
import { AppSidebar } from './AppSidebar';
import { useAppStore } from '@/lib/store';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { currentRole } = useAppStore();

  return (
    <div className="min-h-screen flex w-full bg-background">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg gold-gradient flex items-center justify-center">
                  <span className="text-primary-foreground font-serif font-bold text-sm">M</span>
                </div>
                <span className="font-serif text-xl font-semibold tracking-tight">MULTIFLY</span>
              </div>
              <div className="hidden md:block h-6 w-px bg-border" />
              <RoleBadge />
            </div>

            <div className="flex items-center gap-4">
              <RoleSwitcher />
              
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-success-muted/30 rounded-full border border-success/20">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-medium text-success">Demo Mode</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <motion.div
            key={currentRole}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 px-6 py-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>MULTIFLY Wealth Orchestration Platform</span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Executed via regulated partners
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
