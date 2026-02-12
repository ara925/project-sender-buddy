import { useSearchParams } from 'react-router-dom';
import { SystemsHealthTab } from '@/components/dashboard/SystemsHealthTab';
import { LeadsInvestigationTab } from '@/components/dashboard/LeadsInvestigationTab';
import { HoneypotStatusTab } from '@/components/dashboard/HoneypotStatusTab';

type Tab = 'systems' | 'leads' | 'honeypot';

export function Dashboard() {
  const [searchParams] = useSearchParams();
  const activeTab = (searchParams.get('tab') as Tab) || 'systems';

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="animate-in fade-in duration-300" key={activeTab}>
        {activeTab === 'systems' && <SystemsHealthTab />}
        {activeTab === 'leads' && <LeadsInvestigationTab />}
        {activeTab === 'honeypot' && <HoneypotStatusTab />}
      </div>
    </div>
  );
}
