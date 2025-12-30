import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { StatusChip, ProgressBar } from '@/components/ui/StatusChip';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  User, 
  TrendingUp, 
  MapPin, 
  Calendar, 
  DollarSign,
  FileText,
  MessageSquare,
  CheckCircle,
  Target,
  Award,
  Mail,
  Phone,
  Globe,
  Sparkles,
  ArrowRight
} from 'lucide-react';

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Animated Profile Photo Component
const AnimatedProfilePhoto = ({ name, size = 'lg' }: { name: string, size?: 'sm' | 'lg' | 'xl' }) => {
  const initial = name.charAt(0).toUpperCase();
  const sizeClasses = {
    sm: 'h-10 w-10 text-sm',
    lg: 'h-16 w-16 text-2xl',
    xl: 'h-20 w-20 text-3xl'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-navy via-navy-light to-gold flex items-center justify-center relative overflow-hidden shadow-xl`}
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold rounded-full"
            animate={{
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>
      
      {/* Rotating border */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-gold/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Initial letter */}
      <span className="font-serif font-bold text-gold relative z-10">{initial}</span>
      
      {/* Hover sparkle */}
      <motion.div
        className="absolute top-1 right-1 opacity-0"
        whileHover={{ opacity: 1, scale: 1.2 }}
        transition={{ duration: 0.2 }}
      >
        <Sparkles className="w-3 h-3 text-gold" />
      </motion.div>
    </motion.div>
  );
};

export function ClientHomeScreen() {
  const { selectedClient, getClient, getBlueprint, setCurrentScreen } = useAppStore();
  const client = getClient(selectedClient);
  const blueprint = getBlueprint(selectedClient);
  const [isSentToClient, setIsSentToClient] = useState(false);


  useEffect(() => {
  setIsSentToClient(
    JSON.parse(localStorage.getItem('sent_to_client') || 'false')
  );
}, []);

  const nextActions = selectedClient === 'client-a'
    ? blueprint.status === 'draft'
      ? ['Approve Wealth Blueprint', 'Review Private Credit Allocation']
      : ['Review Private Credit Allocation', 'Track execution status']
    : ['Review Trust/Entity sign-offs', 'Track PE subscription status'];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-8 px-4"
    >
      {/* Welcome Hero Section */}
      <motion.div 
        variants={scaleVariants}
        className="card-elevated p-8 bg-gradient-to-br from-navy/5 via-gold/5 to-navy/5 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-navy/10 rounded-full blur-2xl" />
        
        <div className="relative flex items-center gap-6 mb-8">
          <AnimatedProfilePhoto name={client.name} size="xl" />
          <div>
            <motion.h2 
              variants={itemVariants}
              className="font-serif text-3xl font-bold text-foreground mb-2"
            >
              Welcome back, {client.name.split(' ')[0]} 👋
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-muted-foreground flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-gold" />
              {client.segment}
            </motion.p>
          </div>
        </div>
        
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: 'Net Worth', value: client.netWorth, icon: DollarSign, color: 'from-green-500/20 to-green-600/20' },
            { label: 'Risk Band', value: client.riskBand, icon: Target, color: 'from-blue-500/20 to-blue-600/20' },
            { label: 'Segment', value: client.segment, icon: Award, color: 'from-gold/20 to-gold-light/20' },
            { label: 'RM', value: client.rm, icon: User, color: 'from-purple-500/20 to-purple-600/20' },
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`p-4 rounded-xl bg-gradient-to-br ${item.color} border border-white/10 backdrop-blur-sm`}
            >
              <div className="flex items-center gap-2 mb-2">
                <item.icon className="w-4 h-4 text-foreground" />
                <span className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                  {item.label}
                </span>
              </div>
              <p className="text-sm font-bold text-foreground">{item.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Blueprint Card */}
      {isSentToClient && (
  <motion.div 
    variants={itemVariants}
    whileHover={{ scale: 1.01, y: -2 }}
    className="card-elevated p-8 relative overflow-hidden group cursor-pointer"
    onClick={() => setCurrentScreen('wealth-blueprint')}
  >
    {/* Hover effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
    
    <div className="relative flex items-start justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-navy/20 to-gold/20">
          <MapPin className="w-6 h-6 text-gold" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
            Your Wealth Blueprint
          </h3>
          <p className="text-sm text-muted-foreground">
            A living plan aligned to your goals
          </p>
        </div>
      </div>
      <StatusChip status={blueprint.status} />
    </div>
    
    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
      Your personalized wealth orchestration plan. Updated annually or when life changes occur.
      Track progress and milestones toward your financial objectives.
    </p>
    
    <div className="flex items-center justify-between">
      <Button 
        className="bg-gradient-to-r from-navy to-navy-light hover:from-navy-light hover:to-navy text-gold font-semibold group-hover:scale-105 transition-transform duration-200"
      >
        View Blueprint
        <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
      
      <div className="text-xs text-muted-foreground">
        Updated {blueprint.status === 'draft' ? 'Draft' : 'Recently'}
      </div>
    </div>
  </motion.div>
)}

      {/* Next Actions Card */}
      <motion.div 
        variants={itemVariants}
        className="card-premium p-8 bg-gradient-to-br from-gold/5 to-navy/5"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-gold/20">
            <CheckCircle className="w-5 h-5 text-gold" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-foreground">Priority Actions</h3>
        </div>
        
        <div className="space-y-4">
          {nextActions.map((action, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ x: 4, scale: 1.01 }}
              className="group flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gold-muted/30 to-navy-muted/30 border border-gold/20 cursor-pointer"
            >
              <div className="w-2 h-2 rounded-full bg-gold group-hover:scale-150 transition-transform duration-200" />
              <span className="flex-1 text-sm font-medium text-foreground group-hover:text-navy transition-colors duration-200">
                {action}
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all duration-200" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          {
            title: 'Portfolio Overview', 
            desc: 'View your holdings', 
            icon: TrendingUp, 
            screen: 'portfolio-overview',
            color: 'from-blue-500/10 to-blue-600/10'
          },
          { 
            title: 'Recommendations', 
            desc: 'Review new opportunities', 
            icon: Target, 
            screen: 'recommendations',
            color: 'from-green-500/10 to-green-600/10'
          },
          { 
            title: 'Secure Messaging', 
            desc: 'Contact your RM', 
            icon: MessageSquare, 
            screen: 'secure-messaging',
            color: 'from-purple-500/10 to-purple-600/10'
          },
        ].map((item, idx) => (
          <motion.div
            key={item.title}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentScreen(item.screen)}
            className={`card-elevated p-6 cursor-pointer group bg-gradient-to-br ${item.color} hover:shadow-xl transition-all duration-300`}
          >
            <item.icon className="w-8 h-8 text-gold mb-4 group-hover:scale-110 transition-transform duration-300" />
            <h4 className="font-serif font-semibold text-foreground mb-2 group-hover:text-navy transition-colors duration-300">
              {item.title}
            </h4>
            <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export function WealthBlueprintScreen() {
  const { selectedClient, getBlueprint, updateBlueprintStatus, setCurrentScreen } = useAppStore();
  const blueprint = getBlueprint(selectedClient);

  const handleApprove = () => {
  updateBlueprintStatus(selectedClient, 'active');

  // ✅ Save approval flag
  localStorage.setItem('approve_blueprint', JSON.stringify(true));

  toast.success('Blueprint approved. Recommendations are now available.');
};

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-8 px-4"
    >
      {/* Overview */}
      <motion.div variants={scaleVariants} className="card-elevated p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-navy/20 to-gold/20">
              <MapPin className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-serif text-3xl font-semibold text-foreground">Blueprint Overview</h2>
              <p className="text-sm text-muted-foreground">Your personalized wealth orchestration plan</p>
            </div>
          </div>
          <StatusChip status={blueprint.status} />
        </div>
        
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            className="p-6 rounded-xl bg-gradient-to-br from-navy-muted to-navy-muted/50 border border-navy/20"
          >
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-navy" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                Investment Horizon
              </span>
            </div>
            <p className="text-lg font-bold text-navy">{blueprint.horizon}</p>
          </motion.div>
          
          {blueprint.passiveIncomeTarget && (
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-6 rounded-xl bg-gradient-to-br from-gold-muted to-gold-muted/50 border border-gold/30"
            >
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-gold" />
                <span className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                  Income Target
                </span>
              </div>
              <p className="text-lg font-bold text-gold">{blueprint.passiveIncomeTarget}</p>
            </motion.div>
          )}
          
          {blueprint.objective && (
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-6 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border lg:col-span-1"
            >
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-foreground" />
                <span className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                  Key Objective
                </span>
              </div>
              <p className="text-sm font-semibold text-foreground">{blueprint.objective}</p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Milestones */}
      <motion.div variants={itemVariants} className="card-premium p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-gold/20">
            <Calendar className="w-5 h-5 text-gold" />
          </div>
          <h3 className="font-serif text-2xl font-semibold text-foreground">Timeline & Milestones</h3>
        </div>
        
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {blueprint.milestones.map((milestone, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -4 }}
              className="p-6 rounded-xl bg-gradient-to-br from-navy-muted/50 to-gold-muted/20 border border-navy/10 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-gold" />
                <span className="text-xs font-bold text-gold uppercase tracking-wide">
                  {milestone.period}
                </span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{milestone.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Allocation Targets */}
      <motion.div variants={itemVariants} className="card-elevated p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-navy/20">
            <TrendingUp className="w-5 h-5 text-navy" />
          </div>
          <h3 className="font-serif text-2xl font-semibold text-foreground">Allocation Strategy</h3>
        </div>
        
        <div className="space-y-6">
          {blueprint.allocationTargets.map((target, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className="flex items-center gap-6 p-4 rounded-xl bg-gradient-to-r from-muted/30 to-transparent hover:from-muted/50 transition-all duration-300"
            >
              <span className="text-sm font-semibold text-foreground w-48 flex-shrink-0">
                {target.name}
              </span>
              <div className="flex-1">
                <ProgressBar progress={target.percentage} />
              </div>
              <span className="text-lg font-bold text-navy w-16 text-right">
                {target.percentage}%
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div variants={itemVariants} className="flex gap-4">
        {blueprint.status === 'draft' && (
          <Button 
            onClick={handleApprove} 
            className="bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-navy font-semibold px-8 py-3"
          >
            <CheckCircle className="mr-2 w-4 h-4" />
            Approve Blueprint
          </Button>
        )}
        <Button 
          variant="outline" 
          onClick={() => setCurrentScreen('secure-messaging')}
          className="border-navy/30 text-navy hover:bg-navy-muted px-8 py-3"
        >
          <MessageSquare className="mr-2 w-4 h-4" />
          Message my RM
        </Button>
      </motion.div>
    </motion.div>
  );
}

export function ClientRecommendationsScreen() {
  const { selectedClient, getClientRecommendations, updateRecommendationStatus, getBlueprint } = useAppStore();
  const recommendations = getClientRecommendations(selectedClient);
  const blueprint = getBlueprint(selectedClient);

  const handleApprove = (id: string) => {
  updateRecommendationStatus(id, 'client-approved');

  // ✅ Save approval flag
  localStorage.setItem('Approve_Recommendation', JSON.stringify(true));

  toast.success('Recommendation approved for execution.');
};

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-8 px-4"
    >
      {/* Header Section */}
      <motion.div 
        variants={scaleVariants}
        className="card-premium p-8 bg-gradient-to-br from-gold/5 via-navy/5 to-gold/5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-navy/10 rounded-full blur-2xl" />
        
        <div className="relative flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-gold/20 to-navy/20">
            <Target className="w-8 h-8 text-gold" />
          </div>
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
              Investment Recommendations
            </h2>
            <p className="text-muted-foreground">
              Curated opportunities aligned to your Wealth Blueprint
            </p>
          </div>
        </div>
        
        <motion.p 
          variants={itemVariants}
          className="text-sm text-muted-foreground leading-relaxed relative z-10"
        >
          Your recommendations are sourced from vetted partners and tailored to your investment profile. 
          Each opportunity undergoes rigorous due diligence and aligns with your strategic objectives.
        </motion.p>
      </motion.div>

      {/* Blueprint Status Warning */}
      <AnimatePresence>
        {blueprint.status === 'draft' && (
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="p-6 rounded-xl bg-gradient-to-r from-gold-muted via-gold-muted/80 to-gold-muted border border-gold/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent animate-pulse" />
            <div className="relative flex items-center gap-4">
              <div className="p-2 rounded-lg bg-gold/20">
                <CheckCircle className="w-6 h-6 text-gold" />
              </div>
              <div>
                <span className="font-bold text-gold text-lg">Action Required</span>
                <p className="text-sm text-foreground mt-1">
                  Please approve your Wealth Blueprint first to unlock personalized recommendations.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recommendations Grid */}
      <motion.div 
        variants={containerVariants}
        className="space-y-6"
      >
        {recommendations.map((rec, idx) => (
          <motion.div 
            key={rec.id}
            variants={itemVariants}
            whileHover={{ scale: 1.01, y: -4 }}
            className="card-elevated p-8 relative overflow-hidden group bg-gradient-to-br from-card via-card/95 to-muted/30 hover:shadow-2xl transition-all duration-500"
          >
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            
            {/* Header */}
            <div className="relative flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-navy/20 to-gold/20 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-1 group-hover:text-navy transition-colors duration-300">
                    {rec.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gold" />
                    <p className="text-sm font-semibold text-gold">{rec.partner}</p>
                  </div>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <StatusChip status={rec.status} />
              </motion.div>
            </div>

            {/* Key Details */}
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                className="p-4 rounded-xl bg-gradient-to-br from-navy-muted to-navy-muted/50 border border-navy/20 text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-navy" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wide font-bold">
                    Investment Amount
                  </span>
                </div>
                <p className="text-lg font-bold text-navy">{rec.amount}</p>
              </motion.div>
              
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                className="p-4 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-foreground" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wide font-bold">
                    Liquidity
                  </span>
                </div>
                <p className="text-lg font-bold text-foreground">{rec.liquidity}</p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                className="p-4 rounded-xl bg-gradient-to-br from-success/20 to-success/10 border border-success/30 text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-success" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wide font-bold">
                    Risk Profile
                  </span>
                </div>
                <p className="text-lg font-bold text-success">
                  {rec.name.includes('Private Credit') ? 'Moderate' : 
                   rec.name.includes('Private Equity') ? 'High Growth' : 'Balanced'}
                </p>
              </motion.div>
            </motion.div>

            {/* Investment Rationale */}
            <motion.div 
              variants={itemVariants}
              className="p-6 rounded-xl bg-gradient-to-br from-gold-muted/30 via-gold-muted/20 to-transparent border border-gold/20 mb-6 group-hover:from-gold-muted/50 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-gold" />
                <span className="text-xs font-bold text-gold uppercase tracking-wide">
                  Investment Rationale
                </span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{rec.rationale}</p>
            </motion.div>

            {/* Action Buttons */}
            <div className="relative flex gap-4">
              {rec.status === 'draft' && blueprint.status === 'active' && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={() => handleApprove(rec.id)} 
                    className="bg-gradient-to-r from-navy to-navy-light hover:from-navy-light hover:to-navy text-gold font-semibold px-6 py-3 group-hover:scale-105 transition-transform duration-200"
                  >
                    <CheckCircle className="mr-2 w-4 h-4" />
                    Approve Recommendation
                  </Button>
                </motion.div>
              )}
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* <Button 
                  variant="outline" 
                  className="border-navy/30 text-navy hover:bg-navy-muted px-6 py-3 group-hover:border-gold/50 group-hover:text-gold transition-all duration-300"
                >
                  <FileText className="mr-2 w-4 h-4" />
                  View Details
                </Button> */}
              </motion.div>
            </div>

            {/* Progress indicator for approved recommendations */}
            {rec.status === 'client-approved' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-gradient-to-r from-success/20 to-success/10 border border-success/30"
              >
                <div className="flex items-center gap-2 mb-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4 text-success" />
                  </motion.div>
                  <span className="text-sm font-semibold text-success">
                    Processing for Execution
                  </span>
                </div>
                <div className="w-full bg-success/20 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="bg-success h-2 rounded-full"
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {recommendations.length === 0 && (
        <motion.div 
          variants={itemVariants}
          className="text-center py-16"
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold/20 to-navy/20 flex items-center justify-center"
          >
            <Target className="w-8 h-8 text-gold" />
          </motion.div>
          <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
            No Recommendations Available
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your personalized investment recommendations will appear here once your Wealth Blueprint is approved and processed.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

export function PortfolioOverviewScreen() {
  const { selectedClient, getClient, getBlueprint } = useAppStore();
  const client = getClient(selectedClient);
  const blueprint = getBlueprint(selectedClient);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-8 px-4 py-8 flex flex-col items-center"
    >
      {/* Header Section */}
      <motion.div 
        variants={scaleVariants}
        className="card-premium p-8 bg-gradient-to-br from-navy/5 via-gold/5 to-navy/5 relative overflow-hidden w-full"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-navy/10 rounded-full blur-2xl" />
        
        <div className="relative flex items-center gap-4 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-navy/20 to-gold/20">
            <TrendingUp className="w-8 h-8 text-gold" />
          </div>
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
              Portfolio Overview
            </h2>
            <p className="text-muted-foreground">
              Consolidated view across all your holdings
            </p>
          </div>
        </div>
        
        <motion.p 
          variants={itemVariants}
          className="text-sm text-muted-foreground leading-relaxed relative z-10"
        >
          Comprehensive view across public, private, and alternative holdings. 
          Updated periodically via our regulated partners and custodian integrations.
        </motion.p>
      </motion.div>

      {/* Net Worth Display */}
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.02, y: -4 }}
        className="card-elevated p-10 bg-gradient-to-br from-navy via-navy-light to-navy text-center relative overflow-hidden group w-full"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        <div className="absolute top-4 right-4 w-16 h-16 bg-gold/20 rounded-full blur-xl" />
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-gold/30 rounded-full blur-lg" />
        
        <div className="relative z-10">
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 mb-4"
          >
            <DollarSign className="w-4 h-4 text-gold" />
            <span className="text-sm font-semibold text-gold-light uppercase tracking-wider">
              Total Net Worth
            </span>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl lg:text-6xl font-serif font-bold text-gold mb-2"
          >
            {client.netWorth}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center justify-center gap-2 text-gold-light/80"
          >
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Updated Today</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Target Allocation */}
      <motion.div variants={itemVariants} className="card-premium p-8 w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-navy/20">
            <Target className="w-5 h-5 text-navy" />
          </div>
          <h3 className="font-serif text-2xl font-semibold text-foreground">Target Allocation Strategy</h3>
        </div>
        
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {blueprint.allocationTargets.map((target, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -4 }}
              className="p-6 rounded-xl bg-gradient-to-br from-navy-muted via-navy-muted/80 to-gold-muted/20 border border-navy/20 text-center relative overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              
              <div className="relative z-10">
                <motion.p 
                  className="text-3xl font-bold text-navy mb-2"
                  animate={{ 
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: idx * 0.2
                  }}
                >
                  {target.percentage}%
                </motion.p>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                  {target.name}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Holdings Categories */}
      <motion.div variants={itemVariants} className="card-elevated p-8 w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-gold/20">
            <Globe className="w-5 h-5 text-gold" />
          </div>
          <h3 className="font-serif text-2xl font-semibold text-foreground">Holdings Categories</h3>
        </div>
        
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {['Private Credit', 'Private Equity', 'Global Equities', 'Real Assets', 'Alternatives', 'Cash'].map((category, idx) => (
            <motion.div 
              key={category}
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 4 }}
              className="group px-6 py-4 rounded-xl bg-gradient-to-r from-muted/50 to-muted/30 border border-border text-sm font-semibold text-foreground hover:from-gold-muted/30 hover:to-navy-muted/30 hover:border-gold/30 hover:text-navy transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gold group-hover:scale-150 transition-transform duration-200" />
                {category}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
type QuarterlyReport = {
  id: string;
  period: string;
  notes: string;
  publishedAt: string;
};

export function ReportsScreen() {
  const [previewOpen, setPreviewOpen] = useState<string | null>(null);
  const [reports, setReports] = useState<QuarterlyReport[]>([]);

  // 🔹 Load reports from localStorage
  useEffect(() => {
    const storedReports = JSON.parse(
      localStorage.getItem('quarterly_reports') || '[]'
    );

    // Sort latest first
    const sorted = storedReports.sort(
      (a: QuarterlyReport, b: QuarterlyReport) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    );

    setReports(sorted);
  }, []);

  const activeReport = reports.find((r) => r.id === previewOpen);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-8 px-4 py-8"
    >
      {/* Header */}
      <motion.div
        variants={scaleVariants}
        className="card-premium p-8 bg-gradient-to-br from-navy/5 via-gold/5 to-navy/5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-navy/10 rounded-full blur-2xl" />

        <div className="relative flex items-center gap-4 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-gold/20 to-navy/20">
            <FileText className="w-8 h-8 text-gold" />
          </div>
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground">
              Wealth Reports
            </h2>
            <p className="text-muted-foreground">
              Comprehensive quarterly analysis and insights
            </p>
          </div>
        </div>
      </motion.div>

      {/* Empty State */}
      {reports.length === 0 && (
        <motion.div
          variants={itemVariants}
          className="card-premium p-10 text-center"
        >
          <p className="text-muted-foreground text-lg">
            No reports available yet.
          </p>
        </motion.div>
      )}

      {/* Reports List */}
      <motion.div variants={containerVariants} className="space-y-6">
        {reports.map((report, idx) => (
          <motion.div
            key={report.id}
            variants={itemVariants}
            whileHover={{ scale: 1.01, y: -4 }}
            className="card-elevated p-8 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-navy-muted to-gold-muted/30 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-navy" />
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-foreground">
                    Quarterly Wealth Summary — {report.period.toUpperCase()}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {new Date(report.publishedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => setPreviewOpen(report.id)}
                className="border-navy/30 text-navy hover:bg-navy-muted"
              >
                Preview Report
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewOpen && activeReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setPreviewOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <h3 className="font-serif text-2xl font-semibold mb-4">
                Quarterly Wealth Summary — {activeReport.period.toUpperCase()}
              </h3>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {activeReport.notes ||
                  'This quarter showed steady progress toward your financial goals.'}
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-navy-muted">
                  <h4 className="font-semibold text-navy mb-2">
                    Progress vs Blueprint
                  </h4>
                  <p className="text-muted-foreground">
                    On track with minor adjustments recommended.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-gold-muted/50">
                  <h4 className="font-semibold text-gold mb-2">
                    Recommended Next Actions
                  </h4>
                  <ul className="list-disc list-inside text-sm">
                    <li>Schedule follow-up review</li>
                    <li>Review liquidity requirements</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <Button
                  className="flex-1 bg-navy text-gold"
                  onClick={() => setPreviewOpen(null)}
                >
                  Close Preview
                </Button>
                <Button variant="outline">Download PDF</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


export function SecureMessagingScreen() {
  const { selectedClient, messages, addMessage } = useAppStore();
  const clientMessages = messages.filter((m) => m.clientId === selectedClient);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      addMessage(selectedClient, 'client', newMessage);
      setNewMessage('');
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-screen flex flex-col px-4 py-4 items-center"
    >
      <motion.div 
        variants={scaleVariants}
        className="card-elevated flex-1 flex flex-col p-10 relative overflow-hidden max-w-4xl w-full"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-navy/10 rounded-full blur-2xl" />
        
        {/* Header */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-6 pb-6 border-b border-border relative z-10 flex-shrink-0"
        >
          <div className="relative">
            <AnimatedProfilePhoto name="Riya Kapoor" size="lg" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-card"
            />
          </div>
          
          <div>
            <h3 className="font-serif text-2xl font-bold text-foreground mb-2">Riya Kapoor</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <p className="text-sm text-muted-foreground">Your Relationship Manager • Online</p>
            </div>
          </div>
          
          <div className="ml-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-3 rounded-lg bg-gold/20 border border-gold/30"
            >
              <MessageSquare className="w-6 h-6 text-gold" />
            </motion.div>
          </div>
        </motion.div>

        {/* Messages Container */}
        <motion.div 
          variants={containerVariants}
          className="flex-1 overflow-y-auto overflow-x-hidden py-6 relative z-10 min-h-0"
        >
          <div className="space-y-6">
            <AnimatePresence>
              {clientMessages.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className={`flex ${msg.sender === 'rm' ? 'justify-start' : 'justify-end'}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`max-w-[70%] p-6 rounded-2xl relative shadow-md break-words ${
                      msg.sender === 'rm'
                        ? 'bg-gradient-to-br from-navy-muted to-navy-muted/70 border border-navy/20 text-foreground'
                        : 'bg-gradient-to-br from-gold-muted to-gold-muted/70 border border-gold/30 text-foreground'
                    }`}
                  >
                    {msg.sender === 'rm' && (
                      <div className="absolute -left-2 top-4 w-4 h-4 bg-navy-muted border border-navy/20 rotate-45" />
                    )}
                    {msg.sender === 'client' && (
                      <div className="absolute -right-2 top-4 w-4 h-4 bg-gold-muted border border-gold/30 rotate-45" />
                    )}
                    
                    <p className="text-base leading-relaxed font-medium mb-3 word-wrap break-word">{msg.text}</p>
                    <p className="text-xs text-muted-foreground opacity-70">{msg.timestamp}</p>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Message Input */}
        <motion.div 
          variants={itemVariants}
          className="flex gap-4 relative z-10 pt-6 border-t border-border flex-shrink-0"
        >
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-6 py-4 pr-14 rounded-xl border border-border bg-card text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all duration-300 shadow-sm"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <motion.div
              animate={{ rotate: newMessage ? 0 : 360 }}
              transition={{ duration: 0.3 }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            >
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className="bg-gradient-to-r from-navy to-navy-light hover:from-navy-light hover:to-navy text-gold font-semibold px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed text-base"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}