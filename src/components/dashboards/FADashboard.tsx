import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { StatsCard } from '@/components/ui/StatsCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { RecommendationCard } from '@/components/recommendations/RecommendationCard';
import { Button } from '@/components/ui/button';
import {
  Users,
  FileText,
  Lightbulb,
  Layers,
  TrendingUp,
  Clock,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

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

export function FADashboard() {
  const {
    blueprints,
    recommendations,
    structuringCases,
    updateStructuringStatus,
  } = useAppStore();

  const activeBlueprints = blueprints.filter((b) => b.status === 'active');
  const pendingRecommendations = recommendations.filter((r) => r.status === 'draft');
  const inProgressCases = structuringCases.filter((c) => c.status === 'in_progress');
  const notStartedCases = structuringCases.filter((c) => c.status === 'not_started');

  const handleStartCase = (id: string) => {
    updateStructuringStatus(id, 'in_progress');
    toast.success('Case Started', {
      description: 'Structuring case is now in progress.',
    });
  };

  const handleCompleteCase = (id: string) => {
    updateStructuringStatus(id, 'completed');
    toast.success('Case Completed', {
      description: 'Structuring case has been completed.',
    });
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
        <h1 className="font-serif text-3xl font-semibold mb-2">Financial Advisor Workbench</h1>
        <p className="text-muted-foreground">
          Manage blueprints, create recommendations, and handle structuring cases.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Blueprints"
          value={activeBlueprints.length}
          subtitle="Ready for recommendations"
          icon={FileText}
          variant="success"
        />
        <StatsCard
          title="Pending Reviews"
          value={pendingRecommendations.length}
          subtitle="Draft recommendations"
          icon={Lightbulb}
        />
        <StatsCard
          title="Structuring Cases"
          value={inProgressCases.length}
          subtitle="In progress"
          icon={Layers}
          variant="primary"
        />
        <StatsCard
          title="Awaiting Assignment"
          value={notStartedCases.length}
          subtitle="Not started"
          icon={Clock}
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Structuring Cases */}
        <motion.div variants={itemVariants} className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              Structuring Cases
            </h2>
          </div>

          <div className="space-y-3">
            {structuringCases.map((scase) => (
              <motion.div
                key={scase.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card-hover p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium">{scase.title}</h3>
                    <p className="text-sm text-muted-foreground">{scase.clientName}</p>
                  </div>
                  <StatusBadge status={scase.status} size="sm" />
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      scase.complexity === 'bespoke'
                        ? 'bg-primary/20 text-primary'
                        : scase.complexity === 'complex'
                        ? 'bg-warning/20 text-warning'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {scase.complexity}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Assigned: {scase.assignedFA}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground mb-3">{scase.notes}</p>

                <div className="flex gap-2">
                  {scase.status === 'not_started' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleStartCase(scase.id)}
                    >
                      Start Case
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                  {scase.status === 'in_progress' && (
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => handleCompleteCase(scase.id)}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Complete
                    </Button>
                  )}
                  {scase.status === 'completed' && (
                    <div className="flex items-center gap-2 text-success text-sm">
                      <CheckCircle2 className="h-4 w-4" />
                      Completed
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-accent" />
              Recommendations Queue
            </h2>
            <Button variant="outline" size="sm">
              New Recommendation
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {recommendations.map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Blueprints Overview */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Blueprint Overview
          </h2>
        </div>

        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Client</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Goals</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Risk</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Updated</th>
              </tr>
            </thead>
            <tbody>
              {blueprints.map((bp) => (
                <tr key={bp.id} className="border-t border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium">{bp.clientName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={bp.status} size="sm" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {bp.goals.slice(0, 2).map((goal) => (
                        <span key={goal} className="text-xs px-2 py-0.5 bg-secondary rounded">
                          {goal}
                        </span>
                      ))}
                      {bp.goals.length > 2 && (
                        <span className="text-xs text-muted-foreground">+{bp.goals.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{bp.riskTolerance}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{bp.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
