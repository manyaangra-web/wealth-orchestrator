import { Button } from '@/components/ui/button';
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
    <div ref={containerRef} className="max-w-5xl mx-auto py-16 lg:py-24 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-navy/5 pointer-events-none" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-navy/10 rounded-full blur-2xl pointer-events-none" />

      {/* Hero Section */}
      <motion.div
        style={{ y, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center mb-20 relative z-10"
      >
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold-muted to-navy-muted border border-gold/30 mb-8 backdrop-blur-sm"
        >
          <motion.span 
            className="h-2 w-2 rounded-full bg-gold"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-sm font-medium bg-gradient-to-r from-gold to-navy bg-clip-text text-transparent tracking-wide uppercase">
            Wealth Orchestration Platform
          </span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="font-serif text-5xl lg:text-7xl font-bold text-foreground mb-8 leading-tight"
        >
          Your global wealth,{' '}
          <span className="bg-gradient-to-r from-gold via-navy to-gold bg-clip-text text-transparent">
            designed as one plan
          </span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-light"
        >
          MULTIFLY is a relationship-led wealth orchestration platform: one RM, a living blueprint, 
          curated opportunities, and partner-executed investing.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button 
            onClick={() => setCurrentScreen('how-it-works')} 
            size="lg"
            className="group bg-gradient-to-r from-navy to-navy-light hover:from-navy-light hover:to-navy text-gold px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View How Multifly Works
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => {
              setCurrentRole('rm');
              setCurrentScreen('rm-dashboard');
            }}
            className="group border-2 border-navy/40 text-navy hover:bg-navy hover:text-gold px-10 py-4 text-lg font-semibold transition-all duration-300"
          >
            Explore the Product
            <Zap className="ml-3 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
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
          Why <span className="bg-gradient-to-r from-gold to-navy bg-clip-text text-transparent">Multifly</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transform fragmented wealth management into unified orchestration
        </p>
      </motion.div>
      
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
        className="card-premium p-8 mb-16 overflow-x-auto"
      >
        <div className="flex items-center justify-center gap-4 min-w-max">
          {['Client', 'Relationship Manager', 'Internal Advisor Bench', 'Regulated Partners', 'Portfolio + Reporting'].map((step, idx, arr) => (
            <div key={step} className="flex items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  idx === 0 ? 'bg-gradient-to-r from-gold to-gold-light text-navy shadow-lg hover:shadow-xl' :
                  idx === arr.length - 1 ? 'bg-gradient-to-r from-success to-success-light text-white shadow-lg hover:shadow-xl' :
                  'bg-gradient-to-r from-navy to-navy-light text-gold shadow-lg hover:shadow-xl'
                }`}
              >
                {step}
              </motion.div>
              {idx < arr.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + idx * 0.1 }}
                >
                  <ArrowRight className="h-5 w-5 mx-4 text-gold" />
                </motion.div>
              )}
            </div>
          ))}
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