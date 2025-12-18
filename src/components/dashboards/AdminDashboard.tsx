import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { StatsCard } from '@/components/ui/StatsCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import {
  Building2,
  Users,
  FileText,
  ClipboardCheck,
  TrendingUp,
  Shield,
  Globe,
  Activity,
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

const subsidiaries = [
  {
    id: 'sub1',
    name: 'MULTIFLY Europe',
    location: 'Zurich, Switzerland',
    status: 'active',
    clients: 45,
    aum: 850000000,
  },
  {
    id: 'sub2',
    name: 'MULTIFLY Asia Pacific',
    location: 'Singapore',
    status: 'active',
    clients: 32,
    aum: 620000000,
  },
  {
    id: 'sub3',
    name: 'MULTIFLY Americas',
    location: 'New York, USA',
    status: 'active',
    clients: 58,
    aum: 1200000000,
  },
  {
    id: 'sub4',
    name: 'MULTIFLY Middle East',
    location: 'Dubai, UAE',
    status: 'pending',
    clients: 12,
    aum: 280000000,
  },
];

const complianceMetrics = [
  { label: 'Active RMs', value: 24, change: '+3' },
  { label: 'Active FAs', value: 18, change: '+2' },
  { label: 'Pending Approvals', value: 7, change: '-2' },
  { label: 'Compliance Alerts', value: 2, change: '0' },
];

export function AdminDashboard() {
  const { clients, blueprints, executionTickets } = useAppStore();

  const totalAUM = subsidiaries.reduce((sum, s) => sum + s.aum, 0);
  const totalClients = subsidiaries.reduce((sum, s) => sum + s.clients, 0);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(2)}B`;
    }
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(0)}M`;
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
        <h1 className="font-serif text-3xl font-semibold mb-2">Subsidiary Administration</h1>
        <p className="text-muted-foreground">
          Global oversight of MULTIFLY operations, compliance, and performance metrics.
        </p>
      </motion.div>

      {/* Global Stats */}
      <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Global AUM"
          value={formatCurrency(totalAUM)}
          subtitle="Across all subsidiaries"
          icon={TrendingUp}
          trend={{ value: 8.5, label: 'YTD' }}
          variant="primary"
        />
        <StatsCard
          title="Total Clients"
          value={totalClients}
          subtitle="Active relationships"
          icon={Users}
        />
        <StatsCard
          title="Active Subsidiaries"
          value={subsidiaries.filter((s) => s.status === 'active').length}
          subtitle="Operating regions"
          icon={Globe}
          variant="success"
        />
        <StatsCard
          title="Platform Health"
          value="99.9%"
          subtitle="System uptime"
          icon={Activity}
        />
      </motion.div>

      {/* Subsidiaries Grid */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl font-semibold flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Subsidiaries Overview
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {subsidiaries.map((sub) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card-hover p-5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold">{sub.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      {sub.location}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                    sub.status === 'active'
                      ? 'bg-success-muted text-success'
                      : 'bg-warning/20 text-warning'
                  }`}
                >
                  {sub.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">AUM</div>
                  <div className="text-lg font-semibold">{formatCurrency(sub.aum)}</div>
                </div>
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Clients</div>
                  <div className="text-lg font-semibold">{sub.clients}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Compliance & Operations */}
      <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-2">
        {/* Compliance Metrics */}
        <div className="glass-card p-6">
          <h3 className="font-serif text-lg font-semibold mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Compliance & Operations
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {complianceMetrics.map((metric) => (
              <div key={metric.label} className="p-4 bg-secondary/30 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold">{metric.value}</span>
                  <span
                    className={`text-xs ${
                      metric.change.startsWith('+')
                        ? 'text-success'
                        : metric.change.startsWith('-')
                        ? 'text-destructive'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Execution Summary */}
        <div className="glass-card p-6">
          <h3 className="font-serif text-lg font-semibold mb-4 flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-primary" />
            Execution Summary
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <span className="text-sm">Total Blueprints</span>
              <span className="font-semibold">{blueprints.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <span className="text-sm">Active Blueprints</span>
              <span className="font-semibold text-success">
                {blueprints.filter((b) => b.status === 'active').length}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <span className="text-sm">In Execution</span>
              <span className="font-semibold text-info">
                {executionTickets.filter((t) => t.status !== 'confirmed').length}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <span className="text-sm">Completed Executions</span>
              <span className="font-semibold text-success">
                {executionTickets.filter((t) => t.status === 'confirmed').length}
              </span>
            </div>
          </div>

          {/* Partner Attribution */}
          <div className="mt-4 pt-4 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              All executions via regulated third-party partners
            </p>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={itemVariants} className="glass-card p-6">
        <h3 className="font-serif text-lg font-semibold mb-4">Platform Activity Log</h3>
        <div className="space-y-2">
          {[
            { time: '2 min ago', event: 'Blueprint BP2 status updated to Draft', type: 'info' },
            { time: '15 min ago', event: 'New execution ticket created for Victoria Hartwell', type: 'success' },
            { time: '1 hour ago', event: 'FA Sarah Mitchell completed structuring case SC1', type: 'success' },
            { time: '3 hours ago', event: 'New client onboarded: Isabella Montenegro', type: 'info' },
            { time: '1 day ago', event: 'Quarterly compliance review completed', type: 'info' },
          ].map((log, i) => (
            <div
              key={i}
              className="flex items-center gap-3 py-2 border-b border-border/30 last:border-0"
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  log.type === 'success' ? 'bg-success' : 'bg-info'
                }`}
              />
              <span className="text-xs text-muted-foreground w-24">{log.time}</span>
              <span className="text-sm">{log.event}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
