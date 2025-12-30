import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } }
};
const cardHover = {
  rest: { scale: 1 },
  hover: { scale: 1.03, boxShadow: '0 4px 24px rgba(218,165,32,0.12)' }
};

export function CountryCatalogScreen() {
  const [country, setCountry] = useState('india');

  const products = [
    { name: 'Private Credit Yield', partner: 'Private Credit Partner', india: 'Restricted', uae: 'Allowed', singapore: 'Allowed' },
    { name: 'Tokenized Real Estate', partner: 'Tokenized RE Platform', india: 'Restricted', uae: 'Allowed', singapore: 'Restricted' },
    { name: 'PE Fund Access', partner: 'Global PE Partner', india: 'Allowed', uae: 'Allowed', singapore: 'Allowed' },
  ];

  return (
    <motion.div
      {...fadeInUp}
      className="max-w-2xl mx-auto space-y-8 px-4"
    >
      <motion.div
        {...fadeInUp}
        className="card-elevated p-6 flex items-center gap-4 bg-gradient-to-br from-navy via-navy-light to-navy-muted shadow-lg"
      >
        <span className="text-base font-semibold text-gold">Country:</span>
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger className="w-40 bg-card border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="india">India</SelectItem>
            <SelectItem value="uae">UAE</SelectItem>
            <SelectItem value="singapore">Singapore</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div {...fadeInUp} className="space-y-5">
        <AnimatePresence>
          {products.map((p, idx) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(16, 24, 40, 0.18)' }}
              transition={{ delay: idx * 0.07, duration: 0.5, type: 'spring' }}
              className="relative card-elevated p-6 flex items-center justify-between bg-white/70 backdrop-blur-md border border-gold/20 shadow-xl rounded-2xl overflow-hidden group transition-all duration-300"
            >
              {/* Animated gradient accent bar */}
              <motion.div
                className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-gold via-navy to-gold/60 rounded-l-2xl opacity-80 group-hover:opacity-100"
                initial={{ scaleY: 0.7, opacity: 0.5 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ delay: 0.2 + idx * 0.05, duration: 0.6, type: 'spring' }}
                layout
              />
              <div className="flex items-center gap-4 z-10">
                <motion.div
                  className="h-12 w-12 rounded-xl bg-gradient-to-br from-navy to-navy-light flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 8, scale: 1.08 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-gold font-bold text-lg">
                    {p.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </span>
                </motion.div>
                <div>
                  <p className="text-base font-semibold text-navy group-hover:text-gold transition-colors duration-200">{p.name}</p>
                  <p className="text-xs text-gold font-medium">{p.partner}</p>
                </div>
              </div>
              <motion.span
                className={`px-4 py-2 rounded-full text-xs font-bold border shadow-sm transition-all duration-300 z-10 ${
                  p[country as keyof typeof p] === 'Allowed'
                    ? 'bg-success-muted/80 text-success border-success/30 group-hover:bg-success/90 group-hover:text-white'
                    : 'bg-destructive/10 text-destructive border-destructive/30 group-hover:bg-destructive group-hover:text-white'
                }`}
                initial={{ scale: 0.95, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + idx * 0.05, duration: 0.4 }}
              >
                {p[country as keyof typeof p]}
              </motion.span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export function EligibilityRulesScreen() {
  const [rules, setRules] = useState([
    { id: 'r1', label: 'Restrict Tokenized RE for India residents', enabled: true },
    { id: 'r2', label: 'Minimum ticket size enforcement (USD 250K)', enabled: true },
    { id: 'r3', label: 'PE access requires UHNI segment', enabled: true },
  ]);

  const toggle = (id: string) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));
  };

  return (
    <motion.div
      {...fadeInUp}
      className="max-w-xl mx-auto space-y-8 px-4"
    >
      <motion.div
        {...fadeInUp}
        className="card-elevated p-8 space-y-5 bg-gradient-to-br from-white via-muted to-white shadow-lg"
      >
        <AnimatePresence>
          {rules.map((rule, idx) => (
            <motion.div
              key={rule.id}
              {...fadeInUp}
              variants={cardHover}
              initial="rest"
              whileHover="hover"
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="flex items-center justify-between p-4 rounded-xl border border-border bg-gradient-to-r from-white to-muted/30 transition-all"
            >
              <span className="text-base text-foreground font-medium">{rule.label}</span>
              <Switch 
                checked={rule.enabled} 
                onCheckedChange={() => toggle(rule.id)}
                className="data-[state=checked]:bg-gold"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <motion.div
        {...fadeInUp}
        className="p-4 rounded-lg bg-gold-muted/50 border border-gold/20"
      >
        <p className="text-xs text-gold font-medium">
          These are demo-mode rules used to illustrate country scoping.
        </p>
      </motion.div>
    </motion.div>
  );
}

export function PartnerProfilesScreen() {
  const partners = [
    { name: 'Partner A', desc: 'Generic Execution Partner', assets: 'Multi-asset', jurisdictions: 'Global', data: 'Periodic statements', commercial: 'Commission split' },
    { name: 'Global PE Partner', desc: 'Private Equity Access', assets: 'Private Equity', jurisdictions: 'Singapore, UAE', data: 'Periodic statements', commercial: 'Carry participation' },
    { name: 'Private Credit Partner', desc: 'Yield-focused Credit', assets: 'Private Credit', jurisdictions: 'UAE, Singapore', data: 'Periodic statements', commercial: 'Commission split' },
    { name: 'Tokenized RE Platform', desc: 'Fractional Real Estate', assets: 'Tokenized Real Estate', jurisdictions: 'UAE', data: 'API (future)', commercial: 'Platform fee share' },
  ];

  return (
    <motion.div
      {...fadeInUp}
      className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-8 px-4"
    >
      <AnimatePresence>
        {partners.map((p, idx) => (
          <motion.div
            key={p.name}
            {...fadeInUp}
            variants={cardHover}
            initial="rest"
            whileHover="hover"
            transition={{ delay: idx * 0.05, duration: 0.4 }}
            className="card-elevated p-6 bg-gradient-to-br from-white via-muted to-white shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-navy to-navy-light flex items-center justify-center">
                <span className="text-gold font-bold text-sm">{p.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{p.name}</h3>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: 'Assets',
                value: p.assets
              },
              {
                label: 'Jurisdictions',
                value: p.jurisdictions
              },
              {
                label: 'Data',
                value: p.data
              },
              {
                label: 'Commercial',
                value: p.commercial
              },
            ].map((item) => (
              <div key={item.label} className="p-2 rounded-lg bg-muted/30">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wide">{item.label}</span>
                <p className="text-xs font-medium text-foreground mt-0.5">{item.value}</p>
              </div>
            ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export function TemplateLibraryScreen() {
  const templates = [
    'Cross-Border Participation — India + Dubai Checklist',
    'Trust / Entity Setup — Multi-Generational Checklist',
    'Subscription Document Packet Template',
    'Quarterly Wealth Summary Template',
  ];

  return (
    <motion.div
      {...fadeInUp}
      className="max-w-xl mx-auto space-y-6 px-4"
    >
      <AnimatePresence>
        {templates.map((t, idx) => (
          <motion.div
            key={t}
            {...fadeInUp}
            variants={cardHover}
            initial="rest"
            whileHover="hover"
            transition={{ delay: idx * 0.05, duration: 0.4 }}
            className="card-elevated p-5 flex items-center justify-between bg-gradient-to-r from-white to-muted border border-border shadow transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-navy-muted flex items-center justify-center">
                <span className="text-navy text-xs font-bold">DOC</span>
              </div>
              <span className="text-base font-medium text-foreground">{t}</span>
            </div>
            {/* <Button variant="outline" className="border-navy/20 text-navy hover:bg-navy-muted">
              View
            </Button> */}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}