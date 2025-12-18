import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { StatsCard } from '@/components/ui/StatsCard';
import { BlueprintCard } from '@/components/blueprints/BlueprintCard';
import { RecommendationCard } from '@/components/recommendations/RecommendationCard';
import { ExecutionTracker } from '@/components/execution/ExecutionTracker';
import {
  Users,
  FileText,
  Lightbulb,
  ClipboardCheck,
  TrendingUp,
  DollarSign,
  Building2,
  AlertCircle,
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function RMDashboard() {
  const { clients, blueprints, recommendations, executionTickets } = useAppStore();

  const totalAUM = clients.reduce((sum, c) => sum + c.totalAUM, 0);
  const activeBlueprints = blueprints.filter((b) => b.status === 'active').length;
  const pendingRecs = recommendations.filter((r) => r.status === 'draft' || r.status === 'approved').length;
  const activeExecutions = executionTickets.filter((t) => t.status !== 'confirmed').length;

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="font-serif text-3xl font-semibold mb-2">Welcome back, James</h1>
        <p className="text-muted-foreground">
          Here's an overview of your client portfolio and pending actions.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total AUM"
          value={formatCurrency(totalAUM)}
          subtitle="Across all clients"
          icon={DollarSign}
          trend={{ value: 3.2, label: 'this month' }}
          variant="primary"
        />
        <StatsCard
          title="Active Clients"
          value={clients.length}
          subtitle={`${activeBlueprints} with blueprints`}
          icon={Users}
        />
        <StatsCard
          title="Pending Actions"
          value={pendingRecs}
          subtitle="Recommendations to review"
          icon={AlertCircle}
          variant={pendingRecs > 0 ? 'primary' : 'default'}
        />
        <StatsCard
          title="In Execution"
          value={activeExecutions}
          subtitle="Active tickets"
          icon={ClipboardCheck}
          variant="success"
        />
      </motion.div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Blueprints Column */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Client Blueprints
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {blueprints.slice(0, 2).map((blueprint) => (
              <BlueprintCard key={blueprint.id} blueprint={blueprint} />
            ))}
          </div>
        </motion.div>

        {/* Quick Stats Sidebar */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="font-serif text-xl font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Quick Stats
          </h2>
          <div className="glass-card p-4 space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Draft Blueprints</span>
              <span className="font-semibold">{blueprints.filter((b) => b.status === 'draft').length}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Active Blueprints</span>
              <span className="font-semibold text-success">{activeBlueprints}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Total Recommendations</span>
              <span className="font-semibold">{recommendations.length}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Confirmed Executions</span>
              <span className="font-semibold text-success">
                {executionTickets.filter((t) => t.status === 'confirmed').length}
              </span>
            </div>
          </div>

          {/* Partners */}
          <div className="glass-card p-4">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              Execution Partners
            </h3>
            <div className="space-y-2">
              {['BlackRock', 'PIMCO', 'Vanguard', 'Fidelity'].map((partner) => (
                <div
                  key={partner}
                  className="flex items-center gap-2 px-3 py-2 bg-secondary/50 rounded-lg text-sm"
                >
                  <span className="h-2 w-2 rounded-full bg-success" />
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recommendations */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl font-semibold flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-accent" />
            Recent Recommendations
          </h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {recommendations.slice(0, 2).map((rec) => (
            <RecommendationCard key={rec.id} recommendation={rec} />
          ))}
        </div>
      </motion.div>

      {/* Execution Tracker */}
      <motion.div variants={itemVariants}>
        <ExecutionTracker />
      </motion.div>
    </motion.div>
  );
}
