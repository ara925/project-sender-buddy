import { useState } from 'react';
import { Activity, Search, Shield } from 'lucide-react';
import { SystemsHealthTab } from '@/components/dashboard/SystemsHealthTab';
import { LeadsInvestigationTab } from '@/components/dashboard/LeadsInvestigationTab';
import { HoneypotStatusTab } from '@/components/dashboard/HoneypotStatusTab';

type Tab = 'systems' | 'leads' | 'honeypot';

const tabs: { key: Tab; label: string; icon: React.ElementType; description: string }[] = [
  { key: 'systems', label: 'Systems Health', icon: Activity, description: 'Integration status & API monitoring' },
  { key: 'leads', label: 'Leads Investigation', icon: Search, description: 'Stale leads & staff performance issues' },
  { key: 'honeypot', label: 'Honeypot Status', icon: Shield, description: 'Insider threat detection traps' },
];

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('systems');

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]'
              }`}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in duration-300">
        {activeTab === 'systems' && <SystemsHealthTab />}
        {activeTab === 'leads' && <LeadsInvestigationTab />}
        {activeTab === 'honeypot' && <HoneypotStatusTab />}
      </div>
    </div>
  );
}
