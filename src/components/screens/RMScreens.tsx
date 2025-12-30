import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { StatusChip, ProgressBar } from '@/components/ui/StatusChip';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AnimatePresence, motion, easeInOut } from 'framer-motion';
import { 
  ChevronRight, 
  User, 
  TrendingUp, 
  Calendar, 
  Bell, 
  FileText, 
  Target, 
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Users,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeInOut }
  }
};

const cardHoverVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.02
  }
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } }
};

const cardHover = {
  rest: { scale: 1 },
  hover: { scale: 1.03, boxShadow: '0 4px 24px rgba(218,165,32,0.12)' }
};

export function RMDashboardScreen() {
  const { clients, blueprints, setCurrentScreen, setSelectedClient } = useAppStore();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-10 px-6 py-10"
    >
      {/* Welcome Header */}
      <motion.div variants={itemVariants} className="relative overflow-hidden">
        <div className="card-elevated p-10 bg-gradient-to-br from-navy/90 via-navy-light/80 to-navy-muted/90 backdrop-blur-xl shadow-2xl border border-gold/20 rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-gold/5 animate-gradient-x" />
          <div className="relative flex items-center gap-8">
            <motion.div 
              className="h-20 w-20 rounded-3xl bg-gradient-to-br from-gold via-gold-light to-gold-muted flex items-center justify-center shadow-xl border-2 border-gold/30"
              whileHover={{ scale: 1.08, rotate: 8 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-navy font-serif text-2xl font-bold">RK</span>
            </motion.div>
            <div>
              <motion.h2 
                className="font-serif text-4xl font-extrabold text-gold drop-shadow mb-2 tracking-tight"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Welcome back, Riya Kapoor
              </motion.h2>
              <motion.p 
                className="text-gold-muted text-lg flex items-center gap-2 font-medium"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Users className="h-4 w-4" />
                Relationship Manager
              </motion.p>
            </div>
            <motion.div 
              className="ml-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="px-6 py-3 bg-gold/30 rounded-full border border-gold/40 shadow-lg flex items-center gap-2 animate-pulse-slow">
                <span className="text-gold text-lg font-bold tracking-wide">Portfolio Value:</span>
                <span className="text-navy font-extrabold text-xl">$12.5M</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Clients', value: '8', icon: Users, color: 'text-blue-500' },
          { label: 'Pending Approvals', value: '3', icon: Clock, color: 'text-amber-500' },
          { label: 'This Month Revenue', value: '$45K', icon: TrendingUp, color: 'text-emerald-500' },
          { label: 'Tasks Due Today', value: '2', icon: Bell, color: 'text-red-500' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={cardHoverVariants}
            initial="rest"
            whileHover="hover"
            className="card-elevated p-6 cursor-pointer bg-gradient-to-br from-white/60 to-gold/10 border border-gold/10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br from-gold/20 to-gold/40 shadow ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-3xl font-extrabold text-navy drop-shadow">{stat.value}</p>
                <p className="text-xs text-gold font-semibold uppercase tracking-wider">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Client List */}
      <motion.div variants={itemVariants} className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <User className="h-5 w-5 text-gold" />
            Your Clients
          </h3>
          <motion.span 
            className="text-sm text-muted-foreground px-3 py-1 bg-muted rounded-full"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {clients.length} Active
          </motion.span>
        </div>

        <div className="grid gap-4">
          <AnimatePresence>
            {clients.map((client, index) => {
              const blueprint = blueprints.find((bp) => bp.clientId === client.id);
              const isClientA = client.id === 'client-a';
              
              return (
                <motion.div
                  key={client.id}
                  variants={itemVariants}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                  className="card-elevated p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-card to-muted/10 border border-border/50 hover:border-gold/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="h-12 w-12 rounded-2xl bg-gradient-to-br from-navy to-navy-light flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-gold font-bold">{client.name.charAt(0)}</span>
                      </motion.div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground text-lg">{client.name}</h3>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <StatusChip status={blueprint?.status || 'draft'} />
                          </motion.div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            {client.netWorth}
                          </span>
                          <span>•</span>
                          <span>{client.segment}</span>
                          {(isClientA && blueprint?.status === 'draft') ? (
                            <motion.span 
                              className="flex items-center gap-1 text-amber-600"
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <Clock className="h-3 w-3" />
                              Blueprint approval pending
                            </motion.span>
                          ) : (
                            <motion.span 
                              className="flex items-center gap-1 text-blue-600"
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <FileText className="h-3 w-3" />
                              Trust sign-offs pending
                            </motion.span>
                          )}
                        </div>
                      </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSelectedClient(client.id);
                          setCurrentScreen('client-360');
                        }}
                        className="border-navy/30 text-navy hover:bg-navy hover:text-gold transition-all duration-300 group"
                      >
                        View Client
                        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Priority Tasks */}
      <motion.div variants={itemVariants} className="relative overflow-hidden">
        <div className="card-premium p-8 gold-accent-animated relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5 animate-pulse" />
          <div className="relative">
            <h3 className="font-serif text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-gold" />
              Priority Tasks
            </h3>
            <div className="space-y-4">
              {[
                { task: 'Follow up on missing documents (Client A)', priority: 'High', icon: AlertTriangle },
                { task: 'Review FA notes on PE allocation (Client B)', priority: 'Medium', icon: FileText },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-gold-muted/20 to-muted/10 border border-gold/20 hover:border-gold/40 transition-all duration-300 cursor-pointer group"
                >
                  <div className={`p-2 rounded-lg ${item.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground group-hover:text-navy transition-colors duration-200">
                      {item.task}
                    </p>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      item.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.priority} Priority
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all duration-200" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Generate Report', icon: BarChart3, color: 'from-blue-500 to-blue-600' },
          { label: 'Schedule Review', icon: Calendar, color: 'from-green-500 to-green-600' },
          { label: 'View Analytics', icon: PieChart, color: 'from-purple-500 to-purple-600' },
          { label: 'Client Portal', icon: Activity, color: 'from-orange-500 to-orange-600' },
        ].map((action, index) => (
          <motion.button
            key={action.label}
            variants={cardHoverVariants}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            className={`card-elevated p-4 bg-gradient-to-br ${action.color} text-white hover:shadow-lg transition-all duration-300`}
          >
            <action.icon className="h-6 w-6 mb-2 mx-auto" />
            <p className="text-sm font-medium">{action.label}</p>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}

export function Client360Screen() {
  const { selectedClient, getClient, getBlueprint, getClientRecommendations } = useAppStore();
  const client = getClient(selectedClient);
  const blueprint = getBlueprint(selectedClient);
  const recommendations = getClientRecommendations(selectedClient);
  const [activeTab, setActiveTab] = useState('profile');

  const handleSendToClient = () => {
    toast.success('Blueprint shared with client');
  };

  const tabs = ['Profile', 'Blueprint', 'Recommendations', 'Structuring', 'Activity'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8 px-6 py-8"
    >
      {/* Client Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card-elevated p-8 bg-gradient-to-br from-navy via-navy-light to-navy-muted overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-gold/5" />
        <div className="relative">
          <div className="flex items-center gap-6 mb-8">
            <motion.div 
              className="h-20 w-20 rounded-3xl bg-gradient-to-br from-gold via-gold-light to-gold-muted flex items-center justify-center shadow-xl"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-navy font-serif text-2xl font-bold">{client.name.charAt(0)}</span>
            </motion.div>
            <div>
              <motion.h2 
                className="font-serif text-3xl font-bold text-gold mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {client.name}
              </motion.h2>
              <motion.p 
                className="text-gold-muted text-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {client.segment}
              </motion.p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Segment', value: client.segment, icon: Target },
              { label: 'Base', value: client.base, icon: User },
              { label: 'Net Worth', value: client.netWorth, icon: TrendingUp },
              { label: 'Risk Band', value: client.riskBand, icon: BarChart3 },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-xl bg-gold/10 border border-gold/20 hover:border-gold/40 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <item.icon className="h-4 w-4 text-gold" />
                  <span className="text-xs text-gold-muted uppercase tracking-wide font-semibold">{item.label}</span>
                </div>
                <p className="text-lg font-medium text-foreground">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex gap-2 p-2 bg-navy-muted rounded-2xl w-fit"
      >
        {tabs.map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
              activeTab === tab.toLowerCase()
                ? 'bg-card text-navy shadow-lg scale-105'
                : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
            }`}
            whileHover={{ scale: activeTab === tab.toLowerCase() ? 1.05 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {tab}
          </motion.button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="card-premium p-8"
        >
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[ 
                { label: 'Primary Goals', value: client.primaryGoals, icon: Target },
                { label: 'Liquidity Need', value: client.liquidityNeed, icon: TrendingUp },
                { label: 'Time Horizon', value: client.timeHorizon, icon: Clock },
                { label: 'Next Review', value: client.nextReview, icon: Calendar },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-muted/20 to-muted/40 border border-border/50 hover:border-gold/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <item.icon className="h-5 w-5 text-gold" />
                    <span className="text-sm text-muted-foreground uppercase tracking-wide font-semibold">{item.label}</span>
                  </div>
                  <p className="text-lg font-medium text-foreground">{item.value}</p>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'blueprint' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <StatusChip status={blueprint.status} />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={handleSendToClient} 
                    className="bg-navy hover:bg-navy-light text-gold transition-all duration-300"
                  >
                    Send to Client
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
              <div className="space-y-4">
                {blueprint.allocationTargets.map((target, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors duration-300"
                  >
                    <span className="text-sm text-foreground w-48 font-medium">{target.name}</span>
                    <div className="flex-1">
                      <ProgressBar progress={target.percentage} />
                    </div>
                    <span className="text-sm font-bold text-navy w-16 text-right">{target.percentage}%</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-xl bg-gradient-to-r from-navy-muted to-gold-muted/20 border border-navy/10 hover:border-gold/30 transition-all duration-300 flex items-center justify-between"
                >
                  <div>
                    <p className="text-lg font-semibold text-foreground mb-1">{rec.name}</p>
                    <p className="text-sm text-muted-foreground">{rec.partner} • {rec.amount}</p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <StatusChip status={rec.status} />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-4">
              {['Onboarding completed', 'Blueprint drafted by FA', 'Recommendation package prepared'].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4 text-sm text-foreground p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors duration-300"
                >
                  <motion.div 
                    className="h-3 w-3 rounded-full bg-gold"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  />
                  <span className="font-medium">{item}</span>
                  <span className="ml-auto text-xs text-muted-foreground">2 days ago</span>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'structuring' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center p-8 bg-gradient-to-br from-muted/20 to-muted/40 rounded-xl border border-dashed border-muted-foreground/30"
            >
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-muted-foreground mb-2">
                Navigate to Structuring Cases for detailed case management.
              </p>
              <Button variant="outline" className="mt-4">
                Go to Structuring Cases
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export function OnboardingChecklistScreen() {
  const { selectedClient, onboardingItems, toggleOnboardingItem } = useAppStore();
  const items = onboardingItems.filter((i) => i.clientId === selectedClient);
  const completedCount = items.filter((i) => i.checked).length;
  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto px-6 py-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative card-elevated p-10 bg-white shadow-2xl border border-gold/20 rounded-3xl overflow-hidden"
      >
        {/* No animated gradient border, simple white background */}
        <div className="relative flex items-center justify-between mb-10 z-10">
          <motion.h3
            className="font-serif text-3xl font-extrabold text-navy flex items-center gap-4 drop-shadow tracking-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              className="inline-block"
            >
              <CheckCircle2 className="h-9 w-9 text-gold animate-bounce-slow" />
            </motion.span>
            Onboarding Progress
          </motion.h3>
          <motion.span
            className="text-3xl font-extrabold text-gold bg-white/80 px-6 py-2 rounded-full border border-gold/40 shadow-lg animate-pulse-slow"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
          >
            {Math.round(progress)}%
          </motion.span>
        </div>
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-8"
        >
          <ProgressBar progress={progress} className="h-3" />
        </motion.div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <motion.label
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, x: 5 }}
              className="flex items-center gap-4 cursor-pointer p-4 rounded-xl hover:bg-muted/30 transition-all duration-300 group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Checkbox
                  checked={item.checked}
                  onCheckedChange={() => toggleOnboardingItem(item.id)}
                  className="border-navy data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                />
              </motion.div>
              <span className={`text-sm transition-all duration-300 ${
                item.checked 
                  ? 'text-muted-foreground line-through' 
                  : 'text-foreground group-hover:text-navy'
              }`}>
                {item.label}
              </span>
              {item.checked && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="ml-auto"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </motion.div>
              )}
            </motion.label>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FACollaborationScreen() {
  const { selectedClient, faRequests, createFARequest, updateFARequestStatus, clients } = useAppStore();
  const [requestType, setRequestType] = useState<string>('blueprint');
  const readyRequests = faRequests.filter((r) => r.status === 'ready');

  const handleRequest = () => {
    const types: Record<string, string> = {
      blueprint: 'Blueprint Draft',
      recommendation: 'Recommendation Draft',
      structuring: 'Structuring Guidance',
    };
    createFARequest(selectedClient, requestType as any, `${types[requestType]} requested by RM`);
    toast.success('Request sent to FA');
  };

  const handleApprove = (id: string) => {
    updateFARequestStatus(id, 'approved');
    toast.success('Approved');
  };

  return (
    <motion.div
      {...fadeInUp}
      className="max-w-2xl mx-auto space-y-8 px-4"
    >
      {/* Requests to FA */}
      <motion.div {...fadeInUp} className="card-elevated p-6 bg-gradient-to-br from-navy via-navy-light to-navy-muted shadow-lg">
        <h3 className="font-serif text-xl font-semibold text-gold mb-5">Requests to FA</h3>
        <div className="flex gap-3">
          <Select value={requestType} onValueChange={setRequestType}>
            <SelectTrigger className="w-48 bg-card border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="blueprint">Blueprint Draft</SelectItem>
              <SelectItem value="recommendation">Recommendation Draft</SelectItem>
              <SelectItem value="structuring">Structuring Guidance</SelectItem>
            </SelectContent>
          </Select>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button onClick={handleRequest} className="bg-gold hover:bg-gold-light text-navy shadow-md transition-all duration-300">
              Request FA Review
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Received from FA */}
      <motion.div {...fadeInUp} className="card-premium p-6 gold-accent-animated shadow-lg">
        <h3 className="font-serif text-xl font-semibold text-gold mb-5">Received from FA</h3>
        <AnimatePresence>
          {readyRequests.length === 0 ? (
            <motion.p
              {...fadeInUp}
              className="text-sm text-muted-foreground p-4 rounded-lg bg-muted/30 text-center"
            >
              No items ready for review
            </motion.p>
          ) : (
            <div className="space-y-4">
              {readyRequests.map((req) => (
                <motion.div
                  key={req.id}
                  variants={cardHover}
                  initial="rest"
                  whileHover="hover"
                  className="p-4 rounded-xl bg-gradient-to-r from-gold-muted/40 to-muted/20 border border-gold/20 flex items-center justify-between shadow transition-all duration-300"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">{req.title}</p>
                    <p className="text-xs text-gold font-medium">Ready for RM review</p>
                  </div>
                  <div className="flex gap-2">
                    <motion.div whileHover={{ scale: 1.08 }}>
                      <Button size="sm" onClick={() => handleApprove(req.id)} className="bg-navy hover:bg-navy-light text-gold shadow">
                        Approve
                      </Button>
                    </motion.div>
                    <Button size="sm" variant="outline" className="border-border">Request Changes</Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export function RecommendationsPipelineScreen() {
  const { selectedClient, getClientRecommendations, updateRecommendationStatus } = useAppStore();
  const recommendations = getClientRecommendations(selectedClient);

  const columns = [
    { status: 'draft', label: 'Draft' },
    { status: 'client-approved', label: 'Client Approved' },
    { status: 'executing', label: 'Executing' },
    { status: 'confirmed', label: 'Confirmed' },
  ];

  const moveToNext = (id: string, currentStatus: string) => {
    const flow: Record<string, string> = {
      draft: 'client-approved',
      'client-approved': 'executing',
      executing: 'confirmed',
    };
    const next = flow[currentStatus];
    if (next) {
      updateRecommendationStatus(id, next as any);
      toast.success('Moved to next stage');
    }
  };

  return (
    <motion.div
      {...fadeInUp}
      className="overflow-x-auto px-4"
    >
      <motion.div
        {...fadeInUp}
        className="grid grid-cols-4 gap-5 min-w-[750px]"
      >
        {columns.map((col, colIdx) => (
          <motion.div key={col.status} {...fadeInUp}>
            <div className={`px-3 py-2 rounded-lg mb-4 shadow ${
              colIdx === 0 ? 'bg-muted' :
              colIdx === 1 ? 'bg-gold-muted' :
              colIdx === 2 ? 'bg-info/10' :
              'bg-success-muted'
            }`}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">{col.label}</h3>
            </div>
            <div className="space-y-3">
              <AnimatePresence>
                {recommendations
                  .filter((r) => r.status === col.status)
                  .map((rec) => (
                    <motion.div
                      key={rec.id}
                      {...fadeInUp}
                      variants={cardHover}
                      initial="rest"
                      whileHover="hover"
                      exit="exit"
                      className="card-elevated p-4 shadow transition-all duration-300"
                    >
                      <p className="text-sm font-semibold text-foreground">{rec.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{rec.amount}</p>
                      {col.status !== 'confirmed' && (
                        <motion.div whileHover={{ scale: 1.05 }}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-3 w-full text-xs border-gold/30 text-gold hover:bg-gold-muted"
                            onClick={() => moveToNext(rec.id, rec.status)}
                          >
                            Move to next →
                          </Button>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export function StructuringCasesScreen() {
  const { selectedClient, getClientStructuringCases, updateStructuringStatus, setCurrentScreen } = useAppStore();
  const cases = getClientStructuringCases(selectedClient);

  const getProgress = (items: { checked: boolean }[]) => {
    if (items.length === 0) return 0;
    return (items.filter((i) => i.checked).length / items.length) * 100;
  };

  return (
    <motion.div
      {...fadeInUp}
      className="max-w-2xl mx-auto space-y-8 px-4"
    >
      <AnimatePresence>
        {cases.length === 0 ? (
          <motion.div
            {...fadeInUp}
            className="card-premium p-8 text-center bg-gradient-to-br from-muted/30 to-gold-muted/10"
          >
            <p className="text-sm text-muted-foreground">No structuring cases for this client yet.</p>
          </motion.div>
        ) : (
          cases.map((sc) => (
            <motion.div
              key={sc.id}
              {...fadeInUp}
              variants={cardHover}
              initial="rest"
              whileHover="hover"
              className="card-elevated p-6 shadow transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">{sc.name}</h3>
                  <p className="text-sm text-muted-foreground">{sc.checklistTitle}</p>
                </div>
                <StatusChip status={sc.status} />
              </div>
              <ProgressBar progress={getProgress(sc.checklistItems)} className="mb-5" />
              <div className="flex gap-3">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button variant="outline" onClick={() => setCurrentScreen('country-checklist')} className="border-navy/20 text-navy hover:bg-navy-muted">
                    Open Case
                  </Button>
                </motion.div>
                {sc.status === 'not-started' && (
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button onClick={() => updateStructuringStatus(sc.id, 'in-progress')} className="bg-gold hover:bg-gold-light text-navy">
                      Mark In Progress
                    </Button>
                  </motion.div>
                )}
                {sc.status === 'in-progress' && getProgress(sc.checklistItems) === 100 && (
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button onClick={() => updateStructuringStatus(sc.id, 'completed')} className="bg-success hover:bg-success/90 text-white">
                      Complete Case
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ExecutionTrackerScreen() {
  const { selectedClient, getClientExecutionTickets, updateExecutionStatus } = useAppStore();
  const tickets = getClientExecutionTickets(selectedClient);

  const steps = ['Created', 'Submitted', 'Processing', 'Confirmed'];

  const getStepIndex = (status: string) => {
    const map: Record<string, number> = { created: 0, submitted: 1, processing: 2, confirmed: 3 };
    return map[status] || 0;
  };

  const moveToNext = (id: string, status: string) => {
    const flow: Record<string, string> = {
      created: 'submitted',
      submitted: 'processing',
      processing: 'confirmed',
    };
    const next = flow[status];
    if (next) {
      updateExecutionStatus(id, next as any);
      toast.success('Status updated');
    }
  };

  return (
    <motion.div
      {...fadeInUp}
      className="max-w-2xl mx-auto space-y-8 px-4"
    >
      <AnimatePresence>
        {tickets.map((ticket) => (
          <motion.div
            key={ticket.id}
            {...fadeInUp}
            variants={cardHover}
            initial="rest"
            whileHover="hover"
            className="card-elevated p-6 shadow transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="font-semibold text-foreground">{ticket.name}</h3>
                <p className="text-sm text-gold font-medium">{ticket.partner}</p>
              </div>
              <StatusChip status={ticket.status} />
            </div>

            {/* Timeline */}
            <div className="flex items-center gap-1 mb-5 p-3 rounded-lg bg-muted/30">
              {steps.map((step, idx) => (
                <div key={step} className="flex items-center flex-1">
                  <div
                    className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold text-center ${
                      idx <= getStepIndex(ticket.status)
                        ? idx === getStepIndex(ticket.status) 
                          ? 'bg-gold text-navy' 
                          : 'bg-navy text-gold'
                        : 'bg-muted text-muted-foreground'
                    } transition-all duration-300`}
                  >
                    {step}
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`w-3 h-0.5 ${idx < getStepIndex(ticket.status) ? 'bg-gold' : 'bg-border'} transition-all duration-300`} />
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              {ticket.status === 'created' && (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button onClick={() => moveToNext(ticket.id, ticket.status)} className="bg-navy hover:bg-navy-light text-gold">
                    Submit to Partner
                  </Button>
                </motion.div>
              )}
              {ticket.status === 'submitted' && (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button onClick={() => moveToNext(ticket.id, ticket.status)} className="bg-gold hover:bg-gold-light text-navy">
                    Mark Processing
                  </Button>
                </motion.div>
              )}
              {ticket.status === 'processing' && (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button onClick={() => moveToNext(ticket.id, ticket.status)} className="bg-success hover:bg-success/90 text-white">
                    Mark Confirmed
                  </Button>
                </motion.div>
              )}
              {ticket.status === 'confirmed' && (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button variant="outline" className="border-success/30 text-success hover:bg-success-muted">
                    View Confirmation Document
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export function AlertsNextActionsScreen() {
  const alerts = [
    { text: 'Liquidity gap forecast: 6 months', severity: 'Medium' },
    { text: 'Allocation drift: Private Credit above target', severity: 'Low' },
    { text: 'Maturity event: Private Credit tranche nearing renewal window', severity: 'Medium' },
  ];

  const actions = [
    'Schedule quarterly review',
    'Refresh valuation updates from partners',
    'Propose rebalancing actions (FA support)',
  ];

  return (
    <motion.div
      {...fadeInUp}
      className="max-w-2xl mx-auto space-y-8 px-4"
    >
      <motion.div {...fadeInUp} className="card-elevated p-6 bg-gradient-to-br from-navy via-navy-light to-navy-muted shadow-lg">
        <h3 className="font-serif text-xl font-semibold text-gold mb-5">Alerts</h3>
        <div className="space-y-3">
          <AnimatePresence>
            {alerts.map((alert, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                exit="exit"
                className="p-4 rounded-xl bg-gradient-to-r from-gold-muted/50 to-muted/30 border border-gold/20 flex items-center justify-between shadow transition-all duration-300"
              >
                <span className="text-sm text-foreground">{alert.text}</span>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  alert.severity === 'Medium' ? 'bg-gold/20 text-gold' : 'bg-muted text-muted-foreground'
                }`}>
                  {alert.severity}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div {...fadeInUp} className="card-premium p-6 gold-accent pl-8 shadow-lg">
        <h3 className="font-serif text-xl font-semibold text-gold mb-5">Recommended Next Actions</h3>
        <ul className="space-y-3">
          <AnimatePresence>
            {actions.map((action, i) => (
              <motion.li
                key={i}
                {...fadeInUp}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                exit="exit"
                className="flex items-center gap-3 text-sm text-foreground p-3 rounded-lg bg-navy-muted border border-navy/10 shadow transition-all duration-300"
              >
                <span className="h-2 w-2 rounded-full bg-gold flex-shrink-0" />
                {action}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </motion.div>
    </motion.div>
  );
}

export function QuarterlyReportBuilderScreen() {
  const [period, setPeriod] = useState('q1-2026');
  const [notes, setNotes] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handlePublish = () => {
    toast.success('Report published to Client Portal');
    setShowPreview(false);
  };

  return (
    <motion.div
      {...fadeInUp}
      className="max-w-xl mx-auto space-y-8 px-4"
    >
      <motion.div {...fadeInUp} className="card-elevated p-6 space-y-5 bg-gradient-to-br from-navy via-navy-light to-navy-muted shadow-lg">
        <div>
          <label className="text-sm font-semibold text-gold mb-3 block">Reporting Period</label>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-44 bg-card border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="q1-2026">Q1 2026</SelectItem>
              <SelectItem value="q4-2025">Q4 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-semibold text-gold mb-3 block">Key Highlights</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-4 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground min-h-[120px] focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all"
            placeholder="Enter key highlights for the report..."
          />
        </div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button onClick={() => setShowPreview(true)} className="bg-gold hover:bg-gold-light text-navy shadow-md">
            Generate Client Report
          </Button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showPreview && (
          <motion.div
            {...fadeInUp}
            exit={{ opacity: 0, y: -30, transition: { duration: 0.3 } }}
            className="card-premium p-6 shadow-lg"
          >
            <h3 className="font-serif text-2xl font-semibold text-gold mb-6">Report Preview</h3>
            <div className="space-y-5 text-sm">
              <motion.p
                {...fadeInUp}
                className="text-muted-foreground leading-relaxed p-4 rounded-lg bg-muted/30"
              >
                {notes || 'This quarter showed steady progress toward blueprint objectives.'}
              </motion.p>
              <motion.div {...fadeInUp} className="p-4 rounded-lg bg-navy-muted border border-navy/10">
                <h4 className="font-semibold text-navy mb-2">Progress vs Blueprint</h4>
                <p className="text-muted-foreground">On track with minor adjustments recommended.</p>
              </motion.div>
              <motion.div {...fadeInUp} className="p-4 rounded-lg bg-gold-muted/50 border border-gold/20">
                <h4 className="font-semibold text-gold mb-3">Key Events</h4>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold" />Private Credit allocation initiated</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold" />Quarterly review completed</li>
                </ul>
              </motion.div>
              <motion.div {...fadeInUp} className="p-4 rounded-lg bg-success-muted border border-success/20">
                <h4 className="font-semibold text-success mb-3">Next Actions</h4>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-success" />Schedule follow-up review</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-success" />Review liquidity requirements</li>
                </ul>
              </motion.div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button className="mt-6 bg-gold hover:bg-gold-light text-navy font-semibold" onClick={handlePublish}>
                Publish to Client Portal
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}