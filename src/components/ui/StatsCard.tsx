import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  variant?: 'default' | 'primary' | 'success';
}

const variants = {
  default: 'bg-card border-border/50',
  primary: 'bg-primary/10 border-primary/20',
  success: 'bg-success-muted/30 border-success/20',
};

export function StatsCard({ title, value, subtitle, icon: Icon, trend, variant = 'default' }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={`relative overflow-hidden rounded-xl border p-5 ${variants[variant]}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-serif font-semibold">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          {trend && (
            <div className="flex items-center gap-1 pt-1">
              <span
                className={`text-xs font-medium ${
                  trend.value >= 0 ? 'text-success' : 'text-destructive'
                }`}
              >
                {trend.value >= 0 ? '+' : ''}
                {trend.value}%
              </span>
              <span className="text-xs text-muted-foreground">{trend.label}</span>
            </div>
          )}
        </div>
        <div className={`p-2.5 rounded-lg ${variant === 'primary' ? 'bg-primary/20' : variant === 'success' ? 'bg-success/20' : 'bg-secondary'}`}>
          <Icon className={`h-5 w-5 ${variant === 'primary' ? 'text-primary' : variant === 'success' ? 'text-success' : 'text-muted-foreground'}`} />
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary/5 to-transparent" />
    </motion.div>
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-5 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-8 w-32 bg-muted rounded" />
          <div className="h-3 w-20 bg-muted rounded" />
        </div>
        <div className="h-10 w-10 bg-muted rounded-lg" />
      </div>
    </div>
  );
}
