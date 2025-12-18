import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import { ArrowRight } from 'lucide-react';

export function LandingScreen() {
  const { setCurrentScreen, setCurrentRole } = useAppStore();

  return (
    <div className="max-w-4xl mx-auto py-12 lg:py-16 px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-muted border border-gold/20 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          <span className="text-xs font-medium text-gold tracking-wide uppercase">Wealth Orchestration Platform</span>
        </div>
        <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground mb-6 leading-tight">
          Your global wealth, designed as one plan.
        </h1>
        <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          MULTIFLY is a relationship-led wealth orchestration platform: one RM, a living blueprint, curated opportunities, and partner-executed investing.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button 
            onClick={() => setCurrentScreen('how-it-works')} 
            size="lg"
            className="bg-navy hover:bg-navy-light text-gold px-8"
          >
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
            className="border-navy/30 text-navy hover:bg-navy-muted px-8"
          >
            Explore the Product
          </Button>
        </div>
      </div>

      {/* Feature Blocks */}
      <div className="grid sm:grid-cols-2 gap-5">
        {[
          { title: 'Blueprint-led planning', desc: 'A living document that captures your goals, risk tolerance, and investment horizon—updated as your life evolves.' },
          { title: 'Curated global access', desc: 'Vetted opportunities across private markets, alternatives, and traditional assets—curated for your profile.' },
          { title: 'Orchestrated structuring', desc: 'Cross-border compliance, documentation, and onboarding—coordinated end-to-end by your team.' },
          { title: 'Executed via regulated partners', desc: 'Transactions are executed by licensed partners. MULTIFLY orchestrates; partners execute.' },
        ].map((item, idx) => (
          <div key={item.title} className="card-elevated p-6 gold-accent pl-8">
            <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WhyMultiflyScreen() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl font-semibold text-foreground mb-3">Why Multifly</h2>
        <p className="text-muted-foreground">Transform fragmented wealth management into unified orchestration</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Today's Reality */}
        <div className="card-premium p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-lg">×</span>
            </div>
            <h3 className="font-serif text-xl font-semibold text-muted-foreground">Today's Reality</h3>
          </div>
          <ul className="space-y-4">
            {[
              'Multiple advisors, no single plan',
              'Fragmented platforms and documents',
              'Manual coordination across institutions',
              'Limited access to high-quality private opportunities',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: With Multifly */}
        <div className="card-elevated p-8 bg-gradient-to-br from-navy-muted to-gold-muted/30 border-gold/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center">
              <span className="text-gold text-lg">✓</span>
            </div>
            <h3 className="font-serif text-xl font-semibold text-navy">With Multifly</h3>
          </div>
          <ul className="space-y-4">
            {[
              'One Relationship Manager (RM)',
              'One living Wealth Blueprint',
              'Curated global opportunities',
              'Structuring and execution coordination end-to-end',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center mt-10 py-4 px-6 rounded-lg bg-navy-muted border border-navy/10">
        <p className="text-sm text-navy font-medium">
          MULTIFLY owns the client experience; partners execute transactions.
        </p>
      </div>
    </div>
  );
}

export function HowItWorksScreen() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl font-semibold text-foreground mb-3">How It Works</h2>
        <p className="text-muted-foreground">From understanding to execution, orchestrated seamlessly</p>
      </div>
      
      {/* Flow Diagram */}
      <div className="card-premium p-6 mb-10">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {['Client', 'Relationship Manager', 'Internal Advisor Bench', 'Regulated Partners', 'Portfolio + Reporting'].map((step, idx, arr) => (
            <div key={step} className="flex items-center">
              <div className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap ${
                idx === 0 ? 'bg-gold-muted text-gold border border-gold/20' :
                idx === arr.length - 1 ? 'bg-success-muted text-success border border-success/20' :
                'bg-navy-muted text-navy border border-navy/10'
              }`}>
                {step}
              </div>
              {idx < arr.length - 1 && (
                <ArrowRight className="h-4 w-4 mx-2 text-gold flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Cards */}
      <div className="grid sm:grid-cols-2 gap-5">
        {[
          { num: 1, title: 'Understand the client', desc: 'Capture financial picture, goals, risk, and liquidity needs.' },
          { num: 2, title: 'Design the blueprint', desc: 'A 5–20 year plan with allocation logic, milestones, and passive income targets.' },
          { num: 3, title: 'Curate and structure', desc: 'Vetted opportunities + financial structures required for participation.' },
          { num: 4, title: 'Execute via partners', desc: 'Partners execute. MULTIFLY tracks, reports, and manages long-term.' },
        ].map((item) => (
          <div key={item.num} className="card-elevated p-6">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-navy to-navy-light text-gold flex items-center justify-center text-sm font-bold mb-4">
              {item.num}
            </div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}