import { useEffect, useState } from 'react';
import { SystemsHealthTab } from '@/components/dashboard/SystemsHealthTab';
import { LeadsInvestigationTab } from '@/components/dashboard/LeadsInvestigationTab';
import { HoneypotStatusTab } from '@/components/dashboard/HoneypotStatusTab';

type Tab = 'systems' | 'leads' | 'honeypot';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('systems');

  // Read tab from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab') as Tab;
    if (tab && ['systems', 'leads', 'honeypot'].includes(tab)) {
      setActiveTab(tab);
    }
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Tab Content */}
      <div className="animate-in fade-in duration-300">
        {activeTab === 'systems' && <SystemsHealthTab />}
        {activeTab === 'leads' && <LeadsInvestigationTab />}
        {activeTab === 'honeypot' && <HoneypotStatusTab />}
      </div>
    </div>
  );
}
