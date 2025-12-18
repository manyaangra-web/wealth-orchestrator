import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import { ArrowRight } from 'lucide-react';

export function LandingScreen() {
  const { setCurrentScreen, setCurrentRole } = useAppStore();

  return (
    <div className="max-w-3xl mx-auto py-8 lg:py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-4 leading-tight">
          Your global wealth, designed as one plan.
        </h1>
        <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          MULTIFLY is a relationship-led wealth orchestration platform: one RM, a living blueprint, curated opportunities, and partner-executed investing.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button onClick={() => setCurrentScreen('how-it-works')} size="lg">
            View How Multifly Works
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => {
              setCurrentRole('rm');
              setCurrentScreen('rm-dashboard');
            }}
          >
            Explore the Product
          </Button>
        </div>
      </div>

      {/* Feature Blocks */}
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { title: 'Blueprint-led planning', desc: 'A living document that captures your goals, risk tolerance, and investment horizon—updated as your life evolves.' },
          { title: 'Curated global access', desc: 'Vetted opportunities across private markets, alternatives, and traditional assets—curated for your profile.' },
          { title: 'Orchestrated structuring', desc: 'Cross-border compliance, documentation, and onboarding—coordinated end-to-end by your team.' },
          { title: 'Executed via regulated partners', desc: 'Transactions are executed by licensed partners. MULTIFLY orchestrates; partners execute.' },
        ].map((item) => (
          <div key={item.title} className="p-5 rounded-lg bg-white border border-border">
            <h3 className="font-serif text-base font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WhyMultiflyScreen() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="font-serif text-2xl font-semibold text-foreground mb-8 text-center">Why Multifly</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Today's Reality */}
        <div className="p-6 rounded-lg bg-white border border-border">
          <h3 className="font-serif text-lg font-semibold text-muted-foreground mb-4">Today's Reality</h3>
          <ul className="space-y-3">
            {[
              'Multiple advisors, no single plan',
              'Fragmented platforms and documents',
              'Manual coordination across institutions',
              'Limited access to high-quality private opportunities',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: With Multifly */}
        <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
          <h3 className="font-serif text-lg font-semibold text-primary mb-4">With Multifly</h3>
          <ul className="space-y-3">
            {[
              'One Relationship Manager (RM)',
              'One living Wealth Blueprint',
              'Curated global opportunities',
              'Structuring and execution coordination end-to-end',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
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
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="font-serif text-2xl font-semibold text-foreground mb-8 text-center">How It Works</h2>
      
      {/* Flow Diagram */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 py-4">
        {['Client', 'Relationship Manager', 'Internal Advisor Bench', 'Regulated Partners', 'Portfolio + Reporting'].map((step, idx, arr) => (
          <div key={step} className="flex items-center">
            <div className="px-3 py-1.5 rounded-md bg-white border border-border text-xs font-medium text-foreground whitespace-nowrap">
              {step}
            </div>
            {idx < arr.length - 1 && (
              <ArrowRight className="h-3.5 w-3.5 mx-1.5 text-muted-foreground flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Step Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { num: 1, title: 'Understand the client', desc: 'Capture financial picture, goals, risk, and liquidity needs.' },
          { num: 2, title: 'Design the blueprint', desc: 'A 5–20 year plan with allocation logic, milestones, and passive income targets.' },
          { num: 3, title: 'Curate and structure', desc: 'Vetted opportunities + financial structures required for participation.' },
          { num: 4, title: 'Execute via partners', desc: 'Partners execute. MULTIFLY tracks, reports, and manages long-term.' },
        ].map((item) => (
          <div key={item.num} className="p-5 rounded-lg bg-white border border-border">
            <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mb-3">
              {item.num}
            </div>
            <h3 className="font-serif text-base font-semibold text-foreground mb-1.5">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
