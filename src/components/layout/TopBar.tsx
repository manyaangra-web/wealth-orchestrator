import { useAppStore, UserRole, ClientId } from '@/lib/store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RotateCcw, User, Crown, Briefcase, Settings, Sparkles, LogIn, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const roleLabels: Record<UserRole, string> = {
  client: 'Client Portal',
  rm: 'RM Console',
  fa: 'FA Workbench',
  admin: 'Subsidiary Admin',
};

const roleIcons: Record<UserRole, any> = {
  client: User,
  rm: Crown,
  fa: Briefcase,
  admin: Settings,
};

const roleColors: Record<UserRole, string> = {
  client: 'from-blue-500 to-blue-600',
  rm: 'from-gold to-gold-light',
  fa: 'from-green-500 to-green-600',
  admin: 'from-purple-500 to-purple-600',
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
    setCurrentScreen,
    resetDemo,
    clients,
  } = useAppStore();

  const navigate = useNavigate();
  const [isResetting, setIsResetting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for access token on component mount and whenever localStorage changes
  useEffect(() => {
    const checkAuthToken = () => {
      const token = localStorage.getItem('access_token');
      setIsAuthenticated(!!token);
    };

    checkAuthToken();

    // Listen for storage changes (when token is added/removed)
    window.addEventListener('storage', checkAuthToken);
    
    // Custom event for when we manually change localStorage in the same tab
    window.addEventListener('authStateChanged', checkAuthToken);

    return () => {
      window.removeEventListener('storage', checkAuthToken);
      window.removeEventListener('authStateChanged', checkAuthToken);
    };
  }, []);

  const handleReset = async () => {
    setIsResetting(true);
    await new Promise(resolve => setTimeout(resolve, 300)); // Brief animation delay
    resetDemo();
    setIsResetting(false);
    toast.success('Demo Reset', { 
      description: 'All states have been reset to default.',
      duration: 3000
    });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('authStateChanged'));
    toast.success('Logged Out', { 
      description: 'You have been successfully logged out.',
      duration: 3000
    });
    // Optionally navigate back to landing
    setCurrentScreen('landing');
  };

  const showClientSelector = isAuthenticated && currentRole !== 'admin' && !['landing', 'why-multifly', 'how-it-works'].includes(currentScreen);
  const CurrentRoleIcon = roleIcons[currentRole];

  return (
    <motion.header 
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="sticky top-0 z-50 backdrop-blur-lg bg-navy/95 border-b border-navy-light/20 shadow-xl"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy-light/20 to-navy opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent" />
      
      <div className="relative flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Left: Animated Logo */}
        <motion.div 
          className="flex items-center gap-3 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          onClick={() => setCurrentScreen('landing')}
        >
          <motion.div
            className="relative"
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(218, 165, 32, 0.3)",
                "0 0 30px rgba(218, 165, 32, 0.5)",
                "0 0 20px rgba(218, 165, 32, 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-navy" />
            </div>
          </motion.div>
          <div>
            <span className="font-serif text-2xl font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
              MULTIFLY
            </span>
            <div className="text-xs text-gold-light/60 font-medium tracking-wider uppercase">
              Wealth Orchestration
            </div>
          </div>
        </motion.div>

        {/* Right: Conditional Controls based on Authentication */}
        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            /* Login Button - Show when not authenticated */
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={handleLogin}
                className="h-9 px-6 text-sm bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-navy font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </motion.div>
          ) : (
            /* Authenticated Controls - Show when authenticated */
            <>
              {/* Client Selector with Animation */}
              <AnimatePresence>
                {showClientSelector && (
                  <motion.div
                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Select value={selectedClient} onValueChange={(v) => setSelectedClient(v as ClientId)}>
                      <SelectTrigger className="w-[140px] lg:w-[180px] h-9 text-xs lg:text-sm bg-navy-light/40 border-navy-light/40 text-gold-light hover:bg-navy-light/60 hover:border-gold/40 transition-all duration-300 backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                          <User className="w-3 h-3 opacity-70" />
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="bg-navy/95 backdrop-blur-lg border-navy-light/40">
                        {clients.map((client) => (
                          <SelectItem 
                            key={client.id} 
                            value={client.id} 
                            className="text-gold-light hover:bg-navy-light/60 focus:bg-navy-light/60 focus:text-gold transition-colors duration-200"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-gold opacity-70" />
                              {client.id === 'client-a' ? 'Client A: ' : 'Client B: '}
                              {client.name.split(' ')[0]}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Enhanced Role Switcher */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Select value={currentRole} onValueChange={(v) => setCurrentRole(v as UserRole)}>
                  <SelectTrigger className="w-[160px] lg:w-[200px] h-9 text-xs lg:text-sm bg-navy-light/40 border-navy-light/40 text-gold-light hover:bg-navy-light/60 hover:border-gold/40 transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      {/* Remove colored dot for all roles */}
                      {false && (
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${roleColors[currentRole]}`} />
                      )}
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-navy/95 backdrop-blur-lg border-navy-light/40">
                    {Object.entries(roleLabels).map(([role, label]) => {
                      const Icon = roleIcons[role as UserRole];
                      return (
                        <SelectItem 
                          key={role} 
                          value={role} 
                          className="text-gold-light hover:bg-navy-light/60 focus:bg-navy-light/60 focus:text-gold transition-colors duration-200"
                        >
                          <div className="flex items-center gap-2">
                            {/* Remove colored dot for all roles */}
                            {false && (
                              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${roleColors[role as UserRole]}`} />
                            )}
                            <Icon className="w-3 h-3 opacity-70" />
                            {label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Enhanced Reset Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleReset}
                  disabled={isResetting}
                  className="h-9 px-4 text-xs lg:text-sm bg-transparent border-gold/40 text-gold hover:bg-gold/20 hover:text-gold hover:border-gold/60 transition-all duration-300 backdrop-blur-sm font-semibold"
                >
                  <motion.div
                    animate={isResetting ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                  </motion.div>
                  <span className="hidden lg:inline">
                    {isResetting ? 'Resetting...' : 'Reset Demo'}
                  </span>
                </Button>
              </motion.div>

              {/* Logout Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="h-9 px-4 text-xs lg:text-sm bg-transparent border-red-400/40 text-red-400 hover:bg-red-400/20 hover:text-red-300 hover:border-red-400/60 transition-all duration-300 backdrop-blur-sm font-semibold"
                >
                  <LogOut className="h-3.5 w-3.5 mr-1.5" />
                  <span className="hidden lg:inline">Logout</span>
                </Button>
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Animated bottom border */}
      <motion.div 
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
        animate={{ 
          width: ["0%", "100%", "0%"],
          x: ["0%", "0%", "100%"]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut",
          repeatDelay: 2
        }}
      />
    </motion.header>
  );
}
