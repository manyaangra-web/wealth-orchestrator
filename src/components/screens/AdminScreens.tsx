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

export function CountryCatalogScreen() {
  const [country, setCountry] = useState('india');

  const products = [
    { name: 'Private Credit Yield', partner: 'Private Credit Partner', india: 'Restricted', uae: 'Allowed', singapore: 'Allowed' },
    { name: 'Tokenized Real Estate', partner: 'Tokenized RE Platform', india: 'Restricted', uae: 'Allowed', singapore: 'Restricted' },
    { name: 'PE Fund Access', partner: 'Global PE Partner', india: 'Allowed', uae: 'Allowed', singapore: 'Allowed' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Country:</span>
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
      </div>

      <div className="space-y-3">
        {products.map((p) => (
          <div key={p.name} className="p-4 rounded-xl border border-border bg-card flex items-center justify-between">
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-muted-foreground">{p.partner}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              p[country as keyof typeof p] === 'Allowed' 
                ? 'bg-success/10 text-success' 
                : 'bg-destructive/10 text-destructive'
            }`}>
              {p[country as keyof typeof p]}
            </span>
          </div>
        ))}
      </div>
    </div>
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
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="p-6 rounded-xl border border-border bg-card space-y-4">
        {rules.map((rule) => (
          <div key={rule.id} className="flex items-center justify-between">
            <span className="text-sm">{rule.label}</span>
            <Switch checked={rule.enabled} onCheckedChange={() => toggle(rule.id)} />
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        These are demo-mode rules used to illustrate country scoping.
      </p>
    </div>
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
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
      {partners.map((p) => (
        <div key={p.name} className="p-5 rounded-xl border border-border bg-card">
          <h3 className="font-medium mb-1">{p.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div><span className="text-muted-foreground">Assets:</span> {p.assets}</div>
            <div><span className="text-muted-foreground">Jurisdictions:</span> {p.jurisdictions}</div>
            <div><span className="text-muted-foreground">Data:</span> {p.data}</div>
            <div><span className="text-muted-foreground">Commercial:</span> {p.commercial}</div>
          </div>
        </div>
      ))}
    </div>
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
    <div className="max-w-2xl mx-auto space-y-3">
      {templates.map((t) => (
        <div key={t} className="p-4 rounded-xl border border-border bg-card flex items-center justify-between">
          <span className="text-sm">{t}</span>
          <Button size="sm" variant="outline">View</Button>
        </div>
      ))}
    </div>
  );
}
