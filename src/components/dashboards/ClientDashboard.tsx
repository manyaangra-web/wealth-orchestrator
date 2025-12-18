import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { StatsCard } from '@/components/ui/StatsCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PieChart, Wallet, TrendingUp, Shield, FileText, Clock, Building2 } from 'lucide-react';

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

export function ClientDashboard() {
  const { blueprints, recommendations, executionTickets } = useAppStore();

  // Client view - Victoria Hartwell's portfolio
  const clientBlueprint = blueprints.find((b) => b.clientId === 'c1');
  const clientRecommendations = recommendations.filter((r) => r.blueprintId === 'bp1');
  const clientExecutions = executionTickets.filter((t) => t.clientName === 'Victoria Hartwell');

  const totalInvested = clientRecommendations
    .filter((r) => r.status === 'confirmed' || r.status === 'executing')
    .reduce((sum, r) => sum + r.amount, 0);

  const formatCurrency = (amount: number) => {
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
      <motion.div variants={itemVariants} className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold mb-2">Welcome, Victoria</h1>
          <p className="text-muted-foreground">
            Your wealth orchestration overview with James Davidson, your Relationship Manager.
          </p>
        </div>
        <div className="glass-card px-4 py-3">
          <div className="text-xs text-muted-foreground mb-1">Your Relationship Manager</div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-semibold">JD</span>
            </div>
            <div>
              <p className="font-medium">James Davidson</p>
              <p className="text-xs text-muted-foreground">Senior RM</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Portfolio"
          value={formatCurrency(12500000)}
          subtitle="Current valuation"
          icon={Wallet}
          trend={{ value: 2.8, label: 'this quarter' }}
          variant="primary"
        />
        <StatsCard
          title="Currently Deploying"
          value={formatCurrency(totalInvested)}
          subtitle="In execution"
          icon={TrendingUp}
        />
        <StatsCard
          title="Blueprint Status"
          value="Active"
          subtitle="Investment framework"
          icon={FileText}
          variant="success"
        />
        <StatsCard
          title="Risk Profile"
          value="Balanced"
          subtitle="Moderate risk tolerance"
          icon={Shield}
        />
      </motion.div>

      {/* Blueprint Summary */}
      {clientBlueprint && (
        <motion.div variants={itemVariants} className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-semibold">Your Investment Blueprint</h2>
                <p className="text-sm text-muted-foreground">
                  Customized wealth plan aligned with your goals
                </p>
              </div>
            </div>
            <StatusBadge status={clientBlueprint.status} />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Goals */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Your Goals</h3>
              <div className="space-y-2">
                {clientBlueprint.goals.map((goal) => (
                  <div
                    key={goal}
                    className="flex items-center gap-2 px-3 py-2 bg-secondary/50 rounded-lg"
                  >
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-sm">{goal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Allocation */}
            <div className="space-y-3 lg:col-span-2">
              <h3 className="text-sm font-medium text-muted-foreground">Target Allocation</h3>
              <div className="grid grid-cols-4 gap-3">
                {Object.entries(clientBlueprint.targetAllocation).map(([asset, pct]) => (
                  <div key={asset} className="text-center p-3 bg-secondary/30 rounded-lg">
                    <div className="text-2xl font-serif font-semibold text-primary">{pct}%</div>
                    <div className="text-xs text-muted-foreground capitalize">{asset}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Horizon */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Parameters</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-secondary/50 rounded-lg">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{clientBlueprint.timeHorizon}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-secondary/50 rounded-lg">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{clientBlueprint.riskTolerance}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Activity */}
      <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-2">
        {/* Recommendations */}
        <div className="glass-card p-6">
          <h3 className="font-serif text-lg font-semibold mb-4">Recent Recommendations</h3>
          <div className="space-y-3">
            {clientRecommendations.map((rec) => (
              <div
                key={rec.id}
                className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-accent/10 flex items-center justify-center">
                    <PieChart className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{rec.title}</p>
                    <p className="text-xs text-muted-foreground">{formatCurrency(rec.amount)}</p>
                  </div>
                </div>
                <StatusBadge status={rec.status} size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Execution Activity */}
        <div className="glass-card p-6">
          <h3 className="font-serif text-lg font-semibold mb-4">Execution Activity</h3>
          {clientExecutions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Building2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No active executions</p>
            </div>
          ) : (
            <div className="space-y-3">
              {clientExecutions.map((exec) => (
                <div
                  key={exec.id}
                  className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium">{exec.asset}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(exec.amount)} via {exec.partner}
                    </p>
                  </div>
                  <StatusBadge status={exec.status} size="sm" />
                </div>
              ))}
            </div>
          )}

          {/* Partner Attribution */}
          <div className="mt-4 pt-4 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              All investments executed via regulated partners
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
