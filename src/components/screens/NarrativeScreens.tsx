import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/lib/store';
import { ArrowRight, CheckCircle2, Users, TrendingUp, Shield, Zap, Globe, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { motion, useScroll, useTransform, useInView, Variants } from 'framer-motion';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

export function LandingScreen() {
  const { setCurrentScreen, setCurrentRole } = useAppStore();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto py-20 lg:py-32 px-6 relative overflow-hidden">
      {/* Animated Investment SVGs */}
      <div className="absolute top-8 left-8 w-32 h-32 z-0 pointer-events-none animate-bounce-slow">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="80" rx="30" ry="8" fill="#FFD700" opacity="0.7" />
          <rect x="35" y="60" width="30" height="20" rx="8" fill="#FFD700" stroke="#bfa100" strokeWidth="2" />
          <rect x="38" y="50" width="24" height="12" rx="6" fill="#FFF8DC" stroke="#bfa100" strokeWidth="1.5" />
          <path d="M50 60 L50 30 M50 30 L45 35 M50 30 L55 35" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
      <div className="absolute bottom-8 right-8 w-40 h-40 z-0 pointer-events-none animate-spin-slow">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="60" width="10" height="20" fill="#0ea5e9" rx="2" />
          <rect x="35" y="50" width="10" height="30" fill="#38bdf8" rx="2" />
          <rect x="50" y="40" width="10" height="40" fill="#22c55e" rx="2" />
          <rect x="65" y="30" width="10" height="50" fill="#FFD700" rx="2" />
          <text x="80" y="90" fontSize="24" fill="#FFD700" fontWeight="bold">$</text>
        </svg>
      </div>
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-navy/5 to-white/10 pointer-events-none" />
      <div className="absolute top-10 right-10 w-80 h-80 bg-gold/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-navy/20 rounded-full blur-2xl pointer-events-none animate-pulse" />

      {/* Hero Section */}
      <motion.div
        style={{ y, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center mb-28 relative z-10"
      >
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-gold-muted to-navy-muted border-2 border-gold/40 mb-12 backdrop-blur-lg shadow-2xl"
        >
          <motion.span 
            className="h-4 w-4 rounded-full bg-gold animate-pulse"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-lg font-bold bg-gradient-to-r from-gold to-navy bg-clip-text text-transparent tracking-wide uppercase">
            Wealth Orchestration Platform
          </span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="font-serif text-7xl lg:text-9xl font-extrabold text-foreground mb-12 leading-tight drop-shadow-2xl"
        >
          Your global wealth,{' '}
          <span className="bg-gradient-to-r from-gold via-navy to-gold bg-clip-text text-transparent animate-gradient-x">
            designed as one plan
          </span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-3xl lg:text-4xl text-muted-foreground max-w-5xl mx-auto mb-16 leading-relaxed font-light"
        >
          MULTIFLY is a relationship-led wealth orchestration platform: one RM, a living blueprint, 
          curated opportunities, and partner-executed investing.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-10"
        >
          <Button 
            onClick={() => setCurrentScreen('how-it-works')} 
            size="lg"
            className="group bg-gradient-to-r from-navy to-navy-light hover:from-navy-light hover:to-navy text-gold px-16 py-6 text-2xl font-bold shadow-3xl hover:shadow-4xl transition-all duration-300 rounded-3xl"
          >
            View How Multifly Works
            <ArrowRight className="ml-5 h-7 w-7 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => {
              setCurrentRole('rm');
              setCurrentScreen('rm-dashboard');
            }}
            className="group border-2 border-navy/40 text-navy hover:bg-navy hover:text-gold px-16 py-6 text-2xl font-bold rounded-3xl transition-all duration-300"
          >
            Explore the Product
            <Zap className="ml-5 h-7 w-7 group-hover:rotate-12 transition-transform duration-300" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
      >
        { [
          { icon: Users, value: '500+', label: 'Global Clients' },
          { icon: TrendingUp, value: '$2.5B+', label: 'Assets Orchestrated' },
          { icon: Globe, value: '25+', label: 'Partner Institutions' }
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            variants={scaleVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center p-6 card-elevated hover:shadow-2xl transition-all duration-300 group"
          >
            <stat.icon className="h-8 w-8 mx-auto mb-4 text-gold group-hover:scale-110 transition-transform duration-300" />
            <div className="text-3xl font-bold text-navy mb-2">{stat.value}</div>
            <div className="text-muted-foreground font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Feature Blocks */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 gap-6"
      >
        { [
          { 
            icon: Shield,
            title: 'Blueprint-led planning', 
            desc: 'A living document that captures your goals, risk tolerance, and investment horizon—updated as your life evolves.',
            color: 'from-gold/20 to-transparent'
          },
          { 
            icon: Globe,
            title: 'Curated global access', 
            desc: 'Vetted opportunities across private markets, alternatives, and traditional assets—curated for your profile.',
            color: 'from-navy/20 to-transparent'
          },
          { 
            icon: TrendingUp,
            title: 'Orchestrated structuring', 
            desc: 'Cross-border compliance, documentation, and onboarding—coordinated end-to-end by your team.',
            color: 'from-success/20 to-transparent'
          },
          { 
            icon: Users,
            title: 'Executed via regulated partners', 
            desc: 'Transactions are executed by licensed partners. MULTIFLY orchestrates; partners execute.',
            color: 'from-gold/20 to-transparent'
          },
        ].map((item, idx) => (
          <motion.div 
            key={item.title} 
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02, 
              y: -8,
              transition: { duration: 0.3 }
            }}
            className={`card-elevated p-8 relative overflow-hidden group cursor-pointer bg-gradient-to-br ${item.color} hover:shadow-2xl transition-all duration-500`}
          >
            <div className="relative z-10">
              <item.icon className="h-8 w-8 text-gold mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-navy transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                {item.desc}
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mt-20 p-8 rounded-2xl bg-gradient-to-br from-navy-muted via-gold-muted/30 to-navy-muted border border-gold/30 backdrop-blur-sm"
      >
        <h3 className="font-serif text-2xl font-semibold text-navy mb-4">
          Ready to orchestrate your wealth?
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join the growing number of high-net-worth individuals who trust MULTIFLY 
          to coordinate their global wealth strategy.
        </p>
        <Button 
          onClick={() => setCurrentScreen('why-multifly')}
          className="bg-gold hover:bg-gold-light text-navy font-semibold px-8 py-3"
        >
          Learn More About Our Approach
        </Button>
      </motion.div>
    </div>
  );
}

export function WhyMultiflyScreen() {
    // ...existing code...
    // Animated investment icons
    const animatedIconStyle = {
      display: 'inline-block',
      animation: 'spin 2s linear infinite',
      margin: '0 12px',
      verticalAlign: 'middle',
    };
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  return (
    <div ref={containerRef} className="max-w-5xl mx-auto py-16 px-4">
      {/* Animated Investment Icons */}
      <div className="flex justify-center gap-8 mb-10">
        <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2 }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" stroke="#FFD700" strokeWidth="4" /><text x="12" y="27" fontSize="18" fill="#FFD700" fontWeight="bold">$</text></svg>
        </motion.span>
        <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="10" y="20" width="8" height="16" fill="#22c55e" /><rect x="22" y="10" width="8" height="26" fill="#0ea5e9" /><rect x="34" y="5" width="4" height="31" fill="#FFD700" /></svg>
        </motion.span>
        <motion.span animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.2 }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><ellipse cx="20" cy="32" rx="14" ry="6" fill="#FFF8DC" /><rect x="14" y="16" width="12" height="16" rx="4" fill="#FFD700" stroke="#bfa100" strokeWidth="2" /><path d="M20 16 L20 8 M20 8 L16 12 M20 8 L24 12" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" /></svg>
        </motion.span>
      </div>
            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto my-16">
              <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-navy to-gold bg-clip-text text-transparent tracking-tight drop-shadow-lg">Frequently Asked Questions</h2>
              <Accordion type="multiple" className="w-full rounded-2xl bg-gradient-to-br from-navy/5 via-gold/10 to-white/80 shadow-2xl border border-gold/30 p-2">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="flex items-center gap-3 px-6 py-5 text-lg font-semibold rounded-xl bg-white/80 hover:bg-gold/10 transition-all duration-300 shadow-sm">
                    <span className="inline-block w-8 h-8 bg-gradient-to-br from-gold to-navy rounded-full flex items-center justify-center text-white font-bold mr-2 animate-bounce">1</span>
                    <span className="flex items-center gap-2"><svg width='20' height='20' fill='none'><path d='M10 2a8 8 0 100 16 8 8 0 000-16zm0 14.5A6.5 6.5 0 1110 3.5a6.5 6.5 0 010 13z' fill='#FFD700'/></svg> What is the Wealth Orchestration Platform?</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 py-6 text-base text-navy bg-white/60 rounded-xl shadow-inner animate-fade-in">
                    Our platform unifies your global wealth into a single, living plan, providing access to curated opportunities and seamless execution with expert guidance.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="flex items-center gap-3 px-6 py-5 text-lg font-semibold rounded-xl bg-white/80 hover:bg-gold/10 transition-all duration-300 shadow-sm">
                    <span className="inline-block w-8 h-8 bg-gradient-to-br from-gold to-navy rounded-full flex items-center justify-center text-white font-bold mr-2 animate-bounce">2</span>
                    <span className="flex items-center gap-2"><svg width='20' height='20' fill='none'><path d='M10 2a8 8 0 100 16 8 8 0 000-16zm0 14.5A6.5 6.5 0 1110 3.5a6.5 6.5 0 010 13z' fill='#22c55e'/></svg> Who can use MULTIFLY?</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 py-6 text-base text-navy bg-white/60 rounded-xl shadow-inner animate-fade-in">
                    MULTIFLY is designed for high-net-worth individuals, families, and their trusted advisors seeking a holistic, relationship-led approach to wealth management.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="flex items-center gap-3 px-6 py-5 text-lg font-semibold rounded-xl bg-white/80 hover:bg-gold/10 transition-all duration-300 shadow-sm">
                    <span className="inline-block w-8 h-8 bg-gradient-to-br from-gold to-navy rounded-full flex items-center justify-center text-white font-bold mr-2 animate-bounce">3</span>
                    <span className="flex items-center gap-2"><svg width='20' height='20' fill='none'><path d='M10 2a8 8 0 100 16 8 8 0 000-16zm0 14.5A6.5 6.5 0 1110 3.5a6.5 6.5 0 010 13z' fill='#0ea5e9'/></svg> How is my information kept secure?</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 py-6 text-base text-navy bg-white/60 rounded-xl shadow-inner animate-fade-in">
                    We use advanced security protocols and strict compliance standards to ensure your data and assets are protected at all times.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="flex items-center gap-3 px-6 py-5 text-lg font-semibold rounded-xl bg-white/80 hover:bg-gold/10 transition-all duration-300 shadow-sm">
                    <span className="inline-block w-8 h-8 bg-gradient-to-br from-gold to-navy rounded-full flex items-center justify-center text-white font-bold mr-2 animate-bounce">4</span>
                    <span className="flex items-center gap-2"><svg width='20' height='20' fill='none'><path d='M10 2a8 8 0 100 16 8 8 0 000-16zm0 14.5A6.5 6.5 0 1110 3.5a6.5 6.5 0 010 13z' fill='#FFD700'/></svg> Can I access global investment opportunities?</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 py-6 text-base text-navy bg-white/60 rounded-xl shadow-inner animate-fade-in">
                    Yes, our platform provides access to vetted global opportunities across private and public markets, tailored to your profile and goals.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
      {/* ...existing code... */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Left: Today's Reality */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card-premium p-8 relative overflow-hidden group"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-full bg-destructive/20 flex items-center justify-center">
              <span className="text-destructive text-xl font-bold">×</span>
            </div>
            <h3 className="font-serif text-2xl font-semibold text-muted-foreground">Today's Reality</h3>
          </div>
          <ul className="space-y-5">
            { [
              'Multiple advisors, no single plan',
              'Fragmented platforms and documents',
              'Manual coordination across institutions',
              'Limited access to high-quality private opportunities',
            ].map((item, idx) => (
              <motion.li 
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                className="flex items-start gap-3 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
              >
                <span className="h-2 w-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                <span className="font-medium">{item}</span>
              </motion.li>
            ))}
          </ul>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-destructive/5 rounded-full blur-2xl" />
        </motion.div>

        {/* Right: With Multifly */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="card-elevated p-8 bg-gradient-to-br from-navy-muted to-gold-muted/30 border-gold/30 relative overflow-hidden group hover:shadow-2xl transition-all duration-500"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-full bg-gold/20 flex items-center justify-center">
              <CheckCircle2 className="text-gold h-6 w-6" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-navy">With Multifly</h3>
          </div>
          <ul className="space-y-5">
            { [
              'One Relationship Manager (RM)',
              'One living Wealth Blueprint',
              'Curated global opportunities',
              'Structuring and execution coordination end-to-end',
            ].map((item, idx) => (
              <motion.li 
                key={item}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + idx * 0.1 }}
                className="flex items-start gap-3 text-foreground font-semibold group-hover:translate-x-2 transition-transform duration-300"
              >
                <span className="h-2 w-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
          <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center p-8 rounded-2xl bg-gradient-to-r from-navy-muted via-gold-muted/20 to-navy-muted border border-navy/20 backdrop-blur-sm"
      >
        <p className="text-navy font-bold text-lg mb-2">
          MULTIFLY owns the client experience; partners execute transactions.
        </p>
        <p className="text-sm text-muted-foreground">
          We orchestrate your wealth journey while maintaining the highest standards of execution through regulated partners.
        </p>
      </motion.div>
    </div>
  );
}

export function HowItWorksScreen() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <div ref={containerRef} className="max-w-5xl mx-auto py-16 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
          How It <span className="bg-gradient-to-r from-gold to-navy bg-clip-text text-transparent">Works</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          From understanding to execution, orchestrated seamlessly
        </p>
      </motion.div>
      
      {/* Flow Diagram */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="card-premium py-16 px-8 mb-16 overflow-x-auto rounded-3xl bg-gradient-to-br from-gold/10 via-white/60 to-navy/10 border-2 border-gold/20 shadow-2xl hover:shadow-gold/30 transition-all duration-500 relative group min-h-[320px]"
      >
        <div className="flex items-center justify-center gap-4 min-w-max">
          {(() => {
            const steps = [
              {
                label: 'Client',
                img: 'https://randomuser.me/api/portraits/men/32.jpg',
              },
              {
                label: 'Relationship Manager',
                img: 'https://randomuser.me/api/portraits/women/44.jpg',
              },
              {
                label: 'Internal Advisor Bench',
                img: 'https://randomuser.me/api/portraits/men/65.jpg',
              },
              {
                label: 'Regulated Partners',
                img: 'https://randomuser.me/api/portraits/women/22.jpg',
              },
              {
                label: 'Portfolio + Reporting',
                img: 'https://randomuser.me/api/portraits/men/12.jpg',
              },
            ];
            return (
              <div
                className="flex items-end justify-center gap-8 min-w-max relative sm:flex-row flex-col sm:h-[170px] h-auto"
              >
                {steps.map((step, idx, arr) => {
                  // Arc/curve effect: adjust translateY for each index (horizontal), none for mobile
                  const arc = [40, 15, 0, 15, 40];
                  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
                  const translateY = isMobile ? 0 : arc[idx];
                  return (
                    <div
                      key={step.label}
                      className="flex flex-col items-center"
                      style={{ transform: `translateY(${translateY}px)` }}
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                        className={`relative flex flex-col items-center justify-center h-24 w-24 rounded-full shadow-xl border-4 ${
                          idx === 0 ? 'border-gold bg-gradient-to-br from-gold/30 to-gold-light/40' :
                          idx === arr.length - 1 ? 'border-gold bg-gradient-to-br from-gold/30 to-gold-light/40' :
                          'border-navy bg-gradient-to-br from-navy/30 to-navy-light/40'
                        }`}
                      >
                        <img
                          src={step.img}
                          alt={step.label}
                          className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-md bg-white"
                        />
                      </motion.div>
                      <span
                        className="mt-2 px-2 py-0.5 text-xs font-semibold rounded bg-white/90 text-navy shadow text-center"
                        style={{maxWidth:'90%',whiteSpace:'normal'}}
                      >
                        {step.label}
                      </span>
                      {(idx < arr.length - 1 || idx === arr.length - 1) && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.6, delay: 0.6 + idx * 0.1 }}
                        >
                          <ArrowRight className={`h-5 w-5 text-gold mt-2 ${idx === arr.length - 1 ? 'sm:block hidden' : ''}`} />
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </motion.div>

      {/* Step Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid sm:grid-cols-2 gap-8"
      >
        { [
          { 
            num: 1, 
            icon: Users,
            title: 'Understand the client', 
            desc: 'Capture financial picture, goals, risk tolerance, and liquidity needs through comprehensive discovery.',
            color: 'from-gold/20 to-transparent'
          },
          { 
            num: 2, 
            icon: Shield,
            title: 'Design the blueprint', 
            desc: 'A 5–20 year plan with allocation logic, milestones, and passive income targets tailored to your vision.',
            color: 'from-navy/20 to-transparent'
          },
          { 
            num: 3, 
            icon: Globe,
            title: 'Curate and structure', 
            desc: 'Vetted opportunities + financial structures required for participation across global markets.',
            color: 'from-success/20 to-transparent'
          },
          { 
            num: 4, 
            icon: TrendingUp,
            title: 'Execute via partners', 
            desc: 'Partners execute transactions while MULTIFLY tracks, reports, and manages your long-term strategy.',
            color: 'from-gold/20 to-transparent'
          },
        ].map((item, idx) => (
          <motion.div 
            key={item.num} 
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02, 
              y: -10,
              transition: { duration: 0.3 }
            }}
            className={`card-elevated p-8 relative overflow-hidden group cursor-pointer bg-gradient-to-br ${item.color} hover:shadow-2xl transition-all duration-500`}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-navy to-navy-light text-gold flex items-center justify-center text-lg font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {item.num}
                </div>
                <item.icon className="h-8 w-8 text-gold group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4 group-hover:text-navy transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                {item.desc}
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </motion.div>
        ))}
      </motion.div>

      {/* Process Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-navy-muted via-gold-muted/20 to-navy-muted border border-gold/30"
      >
        <h3 className="font-serif text-2xl font-semibold text-center text-navy mb-8">
          Typical Timeline: 30-90 Days from Discovery to First Investment
        </h3>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          { [
            { phase: 'Week 1-2', title: 'Discovery & Blueprint', desc: 'Complete assessment and initial plan design' },
            { phase: 'Week 3-6', title: 'Structuring & Documentation', desc: 'Legal structures and compliance setup' },
            { phase: 'Week 7-12', title: 'Execution & Onboarding', desc: 'First investments and ongoing management' }
          ].map((item, idx) => (
            <motion.div
              key={item.phase}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 + idx * 0.1 }}
              className="p-4"
            >
              <div className="text-gold font-bold text-sm mb-2">{item.phase}</div>
              <div className="text-navy font-semibold mb-2">{item.title}</div>
              <div className="text-sm text-muted-foreground">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function PublicLandingScreen() {
  const { setCurrentScreen } = useAppStore();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-background via-navy-muted/10 to-gold-muted/10 overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-navy/5 pointer-events-none" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-navy/10 rounded-full blur-2xl pointer-events-none animate-pulse" />

        <div className="max-w-6xl mx-auto py-20 lg:py-32 px-4 relative z-10">
          <motion.div
            style={{ y, opacity }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold-muted to-navy-muted border border-gold/30 mb-8 backdrop-blur-sm"
            >
              <motion.span 
                className="h-2 w-2 rounded-full bg-gold"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium bg-gradient-to-r from-gold to-navy bg-clip-text text-transparent tracking-wide uppercase">
                Elite Wealth Orchestration
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="font-serif text-6xl lg:text-8xl font-bold text-foreground mb-8 leading-tight"
            >
              Where wealth meets{' '}
              <span className="bg-gradient-to-r from-gold via-navy to-gold bg-clip-text text-transparent">
                orchestration
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed font-light"
            >
              MULTIFLY transforms fragmented wealth management into unified orchestration. 
              One relationship manager, one living blueprint, curated global opportunities.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Button 
                onClick={() => setCurrentScreen('login')} 
                size="lg"
                className="group bg-gradient-to-r from-navy to-navy-light hover:from-navy-light hover:to-navy text-gold px-12 py-6 text-xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105"
              >
                Access Platform
                <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => setCurrentScreen('how-it-works')}
                className="group border-2 border-navy/40 text-navy hover:bg-navy/5 hover:border-navy px-12 py-6 text-xl font-semibold transition-all duration-300"
              >
                Learn More
                <Globe className="ml-4 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            { [
              { icon: Shield, title: 'Blueprint-Led Planning', desc: 'Living wealth strategy that evolves with your goals' },
              { icon: Globe, title: 'Global Access', desc: 'Curated opportunities across private markets worldwide' },
              { icon: Users, title: 'Expert Orchestration', desc: 'One RM coordinating your entire wealth ecosystem' }
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                variants={scaleVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                className="text-center p-8 card-elevated hover:shadow-2xl transition-all duration-500 group bg-gradient-to-br from-background to-navy-muted/20"
              >
                <feature.icon className="h-12 w-12 mx-auto mb-6 text-gold group-hover:scale-110 group-hover:text-navy transition-all duration-300" />
                <h3 className="font-serif text-xl font-semibold text-navy mb-4 group-hover:text-gold transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 p-12 rounded-3xl bg-gradient-to-r from-navy-muted via-gold-muted/20 to-navy-muted border border-gold/30 backdrop-blur-sm"
          >
            { [
              { value: '$2.5B+', label: 'Assets Under Management' },
              { value: '500+', label: 'Elite Clients' },
              { value: '25+', label: 'Global Partners' },
              { value: '15+', label: 'Countries Served' }
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gold to-navy bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}