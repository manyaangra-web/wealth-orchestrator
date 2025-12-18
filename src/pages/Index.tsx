import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { RoleSwitcher, RoleBadge } from '@/components/layout/RoleSwitcher';
import { RMDashboard } from '@/components/dashboards/RMDashboard';
import { ClientDashboard } from '@/components/dashboards/ClientDashboard';
import { FADashboard } from '@/components/dashboards/FADashboard';
import { AdminDashboard } from '@/components/dashboards/AdminDashboard';
import { BlueprintList } from '@/components/blueprints/BlueprintCard';
import { RecommendationList } from '@/components/recommendations/RecommendationCard';
import { ExecutionTracker } from '@/components/execution/ExecutionTracker';
import { Helmet } from 'react-helmet';

const Index = () => {
  const { currentRole } = useAppStore();
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    // Role-specific section handling
    if (activeSection === 'dashboard') {
      switch (currentRole) {
        case 'client':
          return <ClientDashboard />;
        case 'rm':
          return <RMDashboard />;
        case 'fa':
          return <FADashboard />;
        case 'admin':
          return <AdminDashboard />;
        default:
          return <RMDashboard />;
      }
    }

    // Common sections
    if (activeSection === 'blueprints') {
      return <BlueprintList />;
    }

    if (activeSection === 'recommendations') {
      return <RecommendationList />;
    }

    if (activeSection === 'execution') {
      return <ExecutionTracker />;
    }

    if (activeSection === 'portfolio') {
      return <ClientDashboard />;
    }

    // Placeholder for other sections
    return (
      <div className="glass-card p-12 text-center">
        <h2 className="font-serif text-2xl font-semibold mb-2 capitalize">{activeSection}</h2>
        <p className="text-muted-foreground">This section is under development.</p>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>MULTIFLY | Wealth Orchestration Platform</title>
        <meta
          name="description"
          content="MULTIFLY is a global, relationship-led wealth orchestration platform. Blueprint-first approach with premium private wealth management."
        />
      </Helmet>

      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header */}
          <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
            <div className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="h-9 w-9 rounded-lg gold-gradient flex items-center justify-center shadow-lg"
                    style={{ boxShadow: '0 4px 20px hsl(38 65% 55% / 0.3)' }}
                  >
                    <span className="text-primary-foreground font-serif font-bold text-lg">M</span>
                  </motion.div>
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
          <main className="flex-1 p-6 overflow-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentRole}-${activeSection}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
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
    </>
  );
};

export default Index;
