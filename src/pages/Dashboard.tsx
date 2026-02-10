import { Activity, Globe, CheckCircle2, AlertTriangle, XCircle, Shield, Headset, Sparkles } from 'lucide-react';
import { StatusCard, type SystemStatus } from '@/components/dashboard/StatusCard';
import { StaffCard } from '@/components/dashboard/StaffCard';
import { InvestigationsCard } from '@/components/dashboard/InvestigationsCard';
import { staffMembers } from '@/data/mock-staff';
import { investigations } from '@/data/mock-investigations';

const systemStatuses: SystemStatus[] = [
  { name: 'Intaker', status: 'operational', message: 'All services running normally', uptime: '99.98%', lastChecked: '2 mins ago' },
  { name: 'CallRail', status: 'degraded', message: 'Intermittent delays in call logging (~2 min lag)', uptime: '97.4%', lastChecked: '1 min ago' },
  { name: 'LeadDocket', status: 'operational', message: 'All services running normally', uptime: '99.95%', lastChecked: '3 mins ago' },
  { name: 'Filevine', status: 'operational', message: 'All services running normally', uptime: '99.99%', lastChecked: '1 min ago' },
  { name: 'Google Ads API', status: 'operational', message: 'All services running normally', uptime: '99.97%', lastChecked: '5 mins ago' },
  { name: 'Internal CRM Sync', status: 'down', message: 'Sync halted — authentication token expired.', uptime: '91.2%', lastChecked: 'Just now' },
];

const websiteStatuses: SystemStatus[] = [
  { name: 'wilshirelawfirm.com', status: 'operational', message: 'Site responding normally', uptime: '99.99%', lastChecked: '1 min ago' },
  { name: 'wilshirelaw.com', status: 'operational', message: 'Site responding normally', uptime: '99.97%', lastChecked: '2 mins ago' },
  { name: 'employeerights.wilshirelaw.com', status: 'operational', message: 'Site responding normally', uptime: '99.95%', lastChecked: '3 mins ago' },
];

export function Dashboard() {
  // Compute summary KPIs
  const sysOk = systemStatuses.filter(s => s.status === 'operational').length;
  const sysDegraded = systemStatuses.filter(s => s.status === 'degraded').length;
  const sysDown = systemStatuses.filter(s => s.status === 'down').length;
  const webOk = websiteStatuses.filter(s => s.status === 'operational').length;
  const staffIssues = staffMembers.filter(s => s.issue).length;
  const onFloor = staffMembers.filter(s => s.status !== 'offline').length;
  const activeInv = investigations.filter(i => i.status === 'open' || i.status === 'reviewing' || i.status === 'confirmed').length;

  const overallHealth = sysDown === 0 && sysDegraded === 0 && staffIssues === 0 && activeInv === 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Dashboard</h1>
          <p className="text-[var(--text-secondary)] mt-1">System health & operational status</p>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center gap-2">
          <Sparkles size={14} className="text-[var(--primary)]" />
          <span className="text-xs font-medium text-[var(--text-secondary)]">Live Updates</span>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-1.5 rounded-lg ${sysDown > 0 || sysDegraded > 0 ? 'bg-amber-500/10' : 'bg-emerald-500/10'}`}>
              <Activity size={14} className={sysDown > 0 || sysDegraded > 0 ? 'text-amber-500' : 'text-emerald-500'} />
            </div>
            <span className="text-[11px] font-medium text-[var(--text-secondary)]">Systems</span>
          </div>
          <p className="text-xl font-bold text-[var(--text-primary)]">{sysOk}/{systemStatuses.length}</p>
          <div className="flex items-center gap-1.5 mt-1">
            {sysDown > 0 && (
              <span className="flex items-center gap-0.5 text-[10px] font-medium text-red-500">
                <XCircle size={9} /> {sysDown} down
              </span>
            )}
            {sysDegraded > 0 && (
              <span className="flex items-center gap-0.5 text-[10px] font-medium text-amber-500">
                <AlertTriangle size={9} /> {sysDegraded} degraded
              </span>
            )}
            {sysDown === 0 && sysDegraded === 0 && (
              <span className="flex items-center gap-0.5 text-[10px] font-medium text-emerald-500">
                <CheckCircle2 size={9} /> All operational
              </span>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10">
              <Globe size={14} className="text-emerald-500" />
            </div>
            <span className="text-[11px] font-medium text-[var(--text-secondary)]">Websites</span>
          </div>
          <p className="text-xl font-bold text-[var(--text-primary)]">{webOk}/{websiteStatuses.length}</p>
          <span className="flex items-center gap-0.5 text-[10px] font-medium text-emerald-500 mt-1">
            <CheckCircle2 size={9} /> All online
          </span>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-1.5 rounded-lg ${staffIssues > 0 ? 'bg-red-500/10' : 'bg-emerald-500/10'}`}>
              <Headset size={14} className={staffIssues > 0 ? 'text-red-500' : 'text-emerald-500'} />
            </div>
            <span className="text-[11px] font-medium text-[var(--text-secondary)]">Staff</span>
          </div>
          <p className="text-xl font-bold text-[var(--text-primary)]">{onFloor} on floor</p>
          {staffIssues > 0 ? (
            <span className="flex items-center gap-0.5 text-[10px] font-medium text-red-500 mt-1">
              <AlertTriangle size={9} /> {staffIssues} issues
            </span>
          ) : (
            <span className="flex items-center gap-0.5 text-[10px] font-medium text-emerald-500 mt-1">
              <CheckCircle2 size={9} /> All normal
            </span>
          )}
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-1.5 rounded-lg ${activeInv > 0 ? 'bg-red-500/10' : 'bg-emerald-500/10'}`}>
              <Shield size={14} className={activeInv > 0 ? 'text-red-500' : 'text-emerald-500'} />
            </div>
            <span className="text-[11px] font-medium text-[var(--text-secondary)]">Investigations</span>
          </div>
          <p className="text-xl font-bold text-[var(--text-primary)]">{activeInv}</p>
          {activeInv > 0 ? (
            <span className="flex items-center gap-0.5 text-[10px] font-medium text-red-500 mt-1">
              <AlertTriangle size={9} /> Active cases
            </span>
          ) : (
            <span className="flex items-center gap-0.5 text-[10px] font-medium text-emerald-500 mt-1">
              <CheckCircle2 size={9} /> None active
            </span>
          )}
        </div>
      </div>

      {/* Status Cards — 2-column grid on larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StatusCard
          statuses={systemStatuses}
          icon={Activity}
          title={{
            ok: 'All Systems Operational',
            issue: (n) => `${n} System${n > 1 ? 's' : ''} Need${n === 1 ? 's' : ''} Attention`,
          }}
          countLabel={{ ok: 'operational' }}
        />
        <StatusCard
          statuses={websiteStatuses}
          icon={Globe}
          title={{
            ok: 'All Websites Online',
            issue: (n) => `${n} Website${n > 1 ? 's' : ''} Need${n === 1 ? 's' : ''} Attention`,
          }}
          countLabel={{ ok: 'online' }}
        />
        <StaffCard />
        <InvestigationsCard />
      </div>
    </div>
  );
}
