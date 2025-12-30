import { useEffect, useState } from 'react';
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

/* ----------------------------------
   LocalStorage Rule Engine
---------------------------------- */

const RULES_KEY = 'eligibilityRules';

type EligibilityRules = {
  restrictTokenizedREIndia: boolean;
  enforceMinTicket: boolean;
  peOnlyUHNI: boolean;
};

const DEFAULT_RULES: EligibilityRules = {
  restrictTokenizedREIndia: true,
  enforceMinTicket: true,
  peOnlyUHNI: true,
};

const loadRules = (): EligibilityRules => {
  const stored = localStorage.getItem(RULES_KEY);
  return stored ? JSON.parse(stored) : DEFAULT_RULES;
};

const saveRules = (rules: EligibilityRules) => {
  localStorage.setItem(RULES_KEY, JSON.stringify(rules));
};

/* ----------------------------------
   Animations
---------------------------------- */

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardHover = {
  rest: { scale: 1 },
  hover: { scale: 1.03 },
};

/* ----------------------------------
   COUNTRY CATALOG SCREEN
---------------------------------- */

export function CountryCatalogScreen() {
  const [country, setCountry] = useState('india');
  const [rules, setRules] = useState<EligibilityRules>(DEFAULT_RULES);

  useEffect(() => {
    setRules(loadRules());
  }, []);

  const products = [
    { name: 'Private Credit Yield', partner: 'Private Credit Partner', type: 'credit' },
    { name: 'Tokenized Real Estate', partner: 'Tokenized RE Platform', type: 'tokenized-re' },
    { name: 'PE Fund Access', partner: 'Global PE Partner', type: 'pe' },
  ];

  const getEligibility = (type: string) => {
    if (type === 'tokenized-re' && country === 'india' && rules.restrictTokenizedREIndia) {
      return 'Restricted';
    }
    return 'Allowed';
  };

  return (
    <motion.div {...fadeInUp} className="max-w-2xl mx-auto space-y-8 px-4">
      <motion.div className="card-elevated p-6 flex items-center gap-4">
        <span className="font-semibold">Country:</span>
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="india">India</SelectItem>
            <SelectItem value="uae">UAE</SelectItem>
            <SelectItem value="singapore">Singapore</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <AnimatePresence>
        {products.map((p, idx) => {
          const status = getEligibility(p.type);
          return (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="card-elevated p-6 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-muted-foreground">{p.partner}</p>
              </div>

              <span
                className={`px-4 py-1 rounded-full text-xs font-bold ${
                  status === 'Allowed'
                    ? 'bg-success-muted text-success'
                    : 'bg-destructive/20 text-destructive'
                }`}
              >
                {status}
              </span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}

/* ----------------------------------
   ELIGIBILITY RULES SCREEN
---------------------------------- */

export function EligibilityRulesScreen() {
  const [rules, setRules] = useState<EligibilityRules>(DEFAULT_RULES);

  useEffect(() => {
    setRules(loadRules());
  }, []);

  const toggleRule = (key: keyof EligibilityRules) => {
    const updated = { ...rules, [key]: !rules[key] };
    setRules(updated);
    saveRules(updated);
  };

  return (
    <motion.div {...fadeInUp} className="max-w-xl mx-auto space-y-6 px-4">
      <motion.div className="card-elevated p-6 space-y-4">
        <RuleItem
          label="Restrict Tokenized RE for India residents"
          checked={rules.restrictTokenizedREIndia}
          onToggle={() => toggleRule('restrictTokenizedREIndia')}
        />

        <RuleItem
          label="Minimum ticket size enforcement (USD 250K)"
          checked={rules.enforceMinTicket}
          onToggle={() => toggleRule('enforceMinTicket')}
        />

        <RuleItem
          label="PE access requires UHNI segment"
          checked={rules.peOnlyUHNI}
          onToggle={() => toggleRule('peOnlyUHNI')}
        />
      </motion.div>

      <div className="text-xs text-muted-foreground">
        Changes apply instantly and are saved automatically.
      </div>
    </motion.div>
  );
}

/* ----------------------------------
   Reusable Rule Item
---------------------------------- */

function RuleItem({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className="flex items-center justify-between p-4 rounded-xl border"
    >
      <span className="text-sm font-medium">{label}</span>
      <Switch checked={checked} onCheckedChange={onToggle} />
    </motion.div>
  );
}
