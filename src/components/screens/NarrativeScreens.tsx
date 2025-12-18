import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import { ArrowRight } from 'lucide-react';

export function LandingScreen() {
  const { setCurrentScreen } = useAppStore();

  return (
    <div className="max-w-4xl mx-auto py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6 leading-tight">
          Your global wealth, designed as one plan.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          MULTIFLY is a relationship-led wealth orchestration platform: one RM, a living blueprint, curated opportunities, and partner-executed investing.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button onClick={() => setCurrentScreen('how-it-works')} size="lg">
            View How Multifly Works
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" onClick={() => setCurrentScreen('rm-dashboard')}>
            Explore the Product
          </Button>
        </div>
      </div>

      {/* Feature Blocks */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="font-serif text-lg font-semibold mb-2">Blueprint-led planning</h3>
          <p className="text-sm text-muted-foreground">
            A living document that captures your goals, risk tolerance, and investment horizon—updated as your life evolves.
          </p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="font-serif text-lg font-semibold mb-2">Curated global access</h3>
          <p className="text-sm text-muted-foreground">
            Vetted opportunities across private markets, alternatives, and traditional assets—curated for your profile.
          </p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="font-serif text-lg font-semibold mb-2">Orchestrated structuring</h3>
          <p className="text-sm text-muted-foreground">
            Cross-border compliance, documentation, and onboarding—coordinated end-to-end by your team.
          </p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="font-serif text-lg font-semibold mb-2">Executed via regulated partners</h3>
          <p className="text-sm text-muted-foreground">
            Transactions are executed by licensed partners. MULTIFLY orchestrates; partners execute.
          </p>
        </div>
      </div>
    </div>
  );
}

export function WhyMultiflyScreen() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="font-serif text-3xl font-semibold mb-8 text-center">Why Multifly</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Today's Reality */}
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="font-serif text-xl font-semibold mb-4 text-muted-foreground">Today's Reality</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground mt-2" />
              Multiple advisors, no single plan
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground mt-2" />
              Fragmented platforms and documents
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground mt-2" />
              Manual coordination across institutions
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground mt-2" />
              Limited access to high-quality private opportunities
            </li>
          </ul>
        </div>

        {/* Right: With Multifly */}
        <div className="p-6 rounded-xl border border-primary/20 bg-primary/5">
          <h3 className="font-serif text-xl font-semibold mb-4 text-primary">With Multifly</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
              One Relationship Manager (RM)
            </li>
            <li className="flex items-start gap-2 text-sm text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
              One living Wealth Blueprint
            </li>
            <li className="flex items-start gap-2 text-sm text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
              Curated global opportunities
            </li>
            <li className="flex items-start gap-2 text-sm text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
              Structuring and execution coordination end-to-end
            </li>
          </ul>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-8">
        MULTIFLY owns the client experience; partners execute transactions.
      </p>
    </div>
  );
}

export function HowItWorksScreen() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="font-serif text-3xl font-semibold mb-8 text-center">How It Works</h2>
      
      {/* Flow Diagram */}
      <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto py-4">
        {['Client', 'Relationship Manager', 'Internal Advisor Bench', 'Regulated Partners', 'Portfolio + Reporting'].map((step, idx, arr) => (
          <div key={step} className="flex items-center">
            <div className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium whitespace-nowrap">
              {step}
            </div>
            {idx < arr.length - 1 && (
              <ArrowRight className="h-4 w-4 mx-2 text-muted-foreground flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Step Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold mb-3">1</div>
          <h3 className="font-serif text-lg font-semibold mb-2">Understand the client</h3>
          <p className="text-sm text-muted-foreground">
            Capture financial picture, goals, risk, and liquidity needs.
          </p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold mb-3">2</div>
          <h3 className="font-serif text-lg font-semibold mb-2">Design the blueprint</h3>
          <p className="text-sm text-muted-foreground">
            A 5–20 year plan with allocation logic, milestones, and passive income targets.
          </p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold mb-3">3</div>
          <h3 className="font-serif text-lg font-semibold mb-2">Curate and structure</h3>
          <p className="text-sm text-muted-foreground">
            Vetted opportunities + financial structures required for participation.
          </p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold mb-3">4</div>
          <h3 className="font-serif text-lg font-semibold mb-2">Execute via partners</h3>
          <p className="text-sm text-muted-foreground">
            Partners execute. MULTIFLY tracks, reports, and manages long-term.
          </p>
        </div>
      </div>
    </div>
  );
}
