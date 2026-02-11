import { Activity, Globe, AlertTriangle, Shield, Headset, Sparkles, Phone, PhoneMissed, Users, TrendingUp, TrendingDown, Bot, Clock, ArrowUpRight } from 'lucide-react';
import { StatusCard, type SystemStatus } from '@/components/dashboard/StatusCard';
import { StaffCard } from '@/components/dashboard/StaffCard';
import { InvestigationsCard } from '@/components/dashboard/InvestigationsCard';
import { staffMembers } from '@/data/mock-staff';
import { investigations } from '@/data/mock-investigations';
import { Link } from 'react-router-dom';

const systemStatuses: SystemStatus[] = [
  { name: 'Intaker', status: 'operational', message: 'All services running normally', uptime: '99.98%', lastChecked: '2 mins ago' },
  { name: 'CallRail', status: 'degraded', message: 'Intermittent delays in call logging (~2 min lag)', uptime: '97.4%', lastChecked: '1 min ago' },
  { name: 'LeadDocket', status: 'operational', message: 'All services running normally', uptime: '99.95%', lastChecked: '3 mins ago' },
  { name: 'Loadify', status: 'operational', message: 'All services running normally', uptime: '99.99%', lastChecked: '1 min ago' },
  { name: 'Google Ads API', status: 'operational', message: 'All services running normally', uptime: '99.97%', lastChecked: '5 mins ago' },
  { name: 'Internal CRM Sync', status: 'down', message: 'Sync halted — authentication token expired.', uptime: '91.2%', lastChecked: 'Just now' },
];

const websiteStatuses: SystemStatus[] = [
  { name: 'wilshirelawfirm.com', status: 'operational', message: 'Site responding normally', uptime: '99.99%', lastChecked: '1 min ago' },
  { name: 'wilshirelaw.com', status: 'operational', message: 'Site responding normally', uptime: '99.97%', lastChecked: '2 mins ago' },
  { name: 'employeerights.wilshirelaw.com', status: 'operational', message: 'Site responding normally', uptime: '99.95%', lastChecked: '3 mins ago' },
];

// Mock action items for the dashboard
const actionItems = [
  { id: 1, type: 'urgent' as const, title: 'CRM Sync Token Expired', desc: 'Re-authenticate to restore data flow to Litify.', link: '/system-integrity', linkLabel: 'Fix Now' },
  { id: 2, type: 'warning' as const, title: '3 Missed Calls Unclaimed', desc: 'Inbound calls from today with no callback scheduled.', link: '/calls', linkLabel: 'View Calls' },
  { id: 3, type: 'warning' as const, title: '2 Leads Stale > 48hrs', desc: 'New leads with no outreach — at risk of going cold.', link: '/leads', linkLabel: 'View Leads' },
  { id: 4, type: 'info' as const, title: 'CallRail Logging Delayed', desc: 'Intermittent ~2 min lag on call data sync.', link: '/system-integrity', linkLabel: 'Monitor' },
  { id: 5, type: 'urgent' as const, title: 'Confirmed Lead Theft', desc: 'Agent Aisha Williams — lead data shared externally.', link: '/leads', linkLabel: 'Investigate' },
];

const actionTypeConfig = {
  urgent: { color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20', dot: 'bg-red-500' },
  warning: { color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', dot: 'bg-amber-500' },
  info: { color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20', dot: 'bg-blue-500' },
};

export function Dashboard() {
  const sysOk = systemStatuses.filter(s => s.status === 'operational').length;
  const sysDegraded = systemStatuses.filter(s => s.status === 'degraded').length;
  const sysDown = systemStatuses.filter(s => s.status === 'down').length;
  const webOk = websiteStatuses.filter(s => s.status === 'operational').length;
  const staffIssuesCount = staffMembers.filter(s => s.issue).length;
  const onFloor = staffMembers.filter(s => s.status !== 'offline').length;
  const activeInv = investigations.filter(i => i.status === 'open' || i.status === 'reviewing' || i.status === 'confirmed').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">

      {/* 1. TOP KPI ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Pipeline Value', value: '$842k', sub: '+12% vs last week', color: 'text-blue-500', border: 'border-blue-500' },
          { label: 'Active Staff', value: `${onFloor}`, sub: `${staffIssuesCount} alerting`, color: staffIssuesCount > 0 ? 'text-red-500' : 'text-emerald-500', border: staffIssuesCount > 0 ? 'border-red-500' : 'border-emerald-500' },
          { label: 'Investigations', value: `${activeInv}`, sub: 'Action Required', color: activeInv > 0 ? 'text-amber-500' : 'text-[var(--text-secondary)]', border: activeInv > 0 ? 'border-amber-500' : 'border-[var(--primary)]' },
          { label: 'System Health', value: '98.2%', sub: 'All Systems Go', color: 'text-emerald-500', border: 'border-emerald-500' },
        ].map((stat, i) => (
          <div key={i} className={`bg-[var(--surface)] p-5 border-l-4 ${stat.border} hover:bg-[var(--surface-hover)] transition-colors group relative overflow-hidden`}>
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${stat.color}`}>
              <Sparkles size={40} strokeWidth={1} />
            </div>
            <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-bold mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-[var(--text-primary)]">{stat.value}</p>
            <p className={`text-xs font-mono mt-1 ${stat.color} font-medium`}>{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* 2. MAIN OPERATIONS GRID */}
      <h2 className="text-lg font-bold text-[var(--text-primary)] uppercase tracking-wide px-1 pt-2">Operational Intelligence</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Pacing / Search Volume */}
        <div className="bg-[var(--surface)] p-6 border-t-4 border-blue-500 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[var(--text-primary)] flex items-center gap-2">
              <TrendingUp size={16} className="text-blue-500" />
              Lead Pacing / Search Volume
            </h3>
            <Link to="/leads" className="text-xs text-blue-500 hover:text-blue-400 font-bold uppercase tracking-wider">View All</Link>
          </div>

          <div className="relative flex gap-1 items-end h-32 mb-6 px-2">
            {/* Target Line */}
            <div className="absolute top-8 left-0 right-0 border-t border-dashed border-blue-500/30 w-full" />
            <div className="absolute top-5 right-0 text-[9px] font-mono text-blue-500/50 uppercase">Daily Target</div>

            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
              <div key={i} className="flex-1 bg-blue-500/20 hover:bg-blue-500 transition-colors rounded-t-sm relative group" style={{ height: `${h}%` }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[var(--surface-active)] text-[9px] px-1.5 py-1 rounded border border-[var(--border)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 font-mono">
                  {h} Searches
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-4 border-t border-[var(--border)] mt-auto">
            {[
              { label: 'Vol. Today', val: '842', delta: '+12%' },
              { label: 'Pacing', val: '104%', delta: 'On Track' },
              { label: 'Projected', val: '1,250', delta: 'High' }
            ].map(m => (
              <div key={m.label} className="flex justify-between items-center">
                <span className="text-sm font-medium text-[var(--text-secondary)]">{m.label}</span>
                <div className="text-right flex items-center gap-3">
                  <span className="block font-bold text-[var(--text-primary)]">{m.val}</span>
                  <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${m.label === 'Pacing' ? 'bg-emerald-500/10 text-emerald-500' : 'text-[var(--text-muted)]'}`}>{m.delta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Agent Performance */}
        <div className="bg-[var(--surface)] p-6 border-t-4 border-emerald-500 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Bot size={16} className="text-emerald-500" />
              Agent Performance
            </h3>
            <Link to="/insights" className="text-xs text-emerald-500 hover:text-emerald-400 font-bold uppercase tracking-wider">Analytics</Link>
          </div>

          <div className="space-y-6 flex-1">
            {/* Top Stats Row */}
            <div className="flex justify-between items-end border-b border-[var(--border)] pb-4">
              <div>
                <p className="text-xs text-[var(--text-secondary)] uppercase font-semibold">Containment Rate</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-bold text-[var(--text-primary)] mt-1 tracking-tight">68.4%</p>
                  <span className="text-xs text-emerald-500 font-mono">+2.4%</span>
                </div>
              </div>
              <div className="h-12 w-24 flex gap-1 items-end">
                {[30, 45, 35, 60, 75].map((h, i) => (
                  <div key={i} className="flex-1 bg-emerald-500 rounded-t-sm opacity-80" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[var(--surface-active)]/30 border border-[var(--border)] rounded">
                <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold">Avg Sentiment</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg font-bold text-[var(--text-primary)]">7.2</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <div key={s} className={`h-1.5 w-1.5 rounded-full ${s <= 4 ? 'bg-emerald-500' : 'bg-[var(--border)]'}`} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-3 bg-[var(--surface-active)]/30 border border-[var(--border)] rounded">
                <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold">Escalations</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg font-bold text-[var(--text-primary)]">5</span>
                  <span className="text-[10px] text-[var(--text-secondary)]">/ 142 calls</span>
                </div>
              </div>
              <div className="p-3 bg-[var(--surface-active)]/30 border border-[var(--border)] rounded col-span-2">
                <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold mb-2">Top User Intents</p>
                <div className="space-y-2">
                  {[
                    { label: 'Case Status', val: '42%', color: 'bg-blue-500' },
                    { label: 'New Intake', val: '28%', color: 'bg-emerald-500' },
                    { label: 'Billing', val: '15%', color: 'bg-amber-500' }
                  ].map(intent => (
                    <div key={intent.label} className="flex items-center gap-2 text-xs">
                      <div className={`w-1.5 h-1.5 rounded-full ${intent.color}`} />
                      <span className="text-[var(--text-secondary)] flex-1">{intent.label}</span>
                      <span className="font-mono font-bold text-[var(--text-primary)]">{intent.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-4 border-t border-[var(--border)] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <div className="absolute inset-0 h-2 w-2 rounded-full bg-emerald-500 animate-ping opacity-75" />
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  <strong className="text-[var(--text-primary)]">4 Active</strong> / 12 Cap
                </p>
              </div>
              <div className="text-[10px] font-mono text-[var(--text-muted)]">
                Avg Resp: <span className="text-[var(--text-primary)]">1.2s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Feed (Right Col) */}
        <div className="space-y-6">
          <div className="bg-[var(--surface)] border-t-4 border-amber-500">
            <div className="p-4 border-b border-[var(--border)] flex justify-between items-center bg-[var(--surface-active)]/20">
              <h3 className="font-bold text-[var(--text-primary)] text-sm flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-500" />
                Action Items
              </h3>
              <span className="bg-amber-500/20 text-amber-500 ring-1 ring-amber-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">{actionItems.length} Pending</span>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {actionItems.slice(0, 5).map(item => (
                <div key={item.id} className="p-4 hover:bg-[var(--surface-hover)] transition-colors group cursor-pointer">
                  <div className="flex justify-between items-start mb-1.5">
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm ${item.type === 'urgent' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'}`}>
                      {item.type}
                    </span>
                    <ArrowUpRight size={12} className="text-[var(--text-primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm font-bold text-[var(--text-primary)] leading-snug">{item.title}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <InvestigationsCard />
        </div>
      </div>

      {/* 3. SYSTEM INFRASTRUCTURE (Bottom) */}
      <div className="pt-6 border-t border-[var(--border)] space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
            <Shield size={14} />
            System Infrastructure
          </h3>
          <div className="flex gap-2">
            <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">Systems: {sysOk}/{systemStatuses.length}</span>
            <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">Web: {webOk}/{websiteStatuses.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <StatusCard
            statuses={systemStatuses.slice(0, 5)}
            icon={Activity}
            title={{ ok: 'Core Services', issue: (n) => `${n} Degraded` }}
            countLabel={{ ok: 'operational' }}
          />
          <StatusCard
            statuses={websiteStatuses}
            icon={Globe}
            title={{ ok: 'Public Portals', issue: (n) => `${n} Down` }}
            countLabel={{ ok: 'online' }}
          />
          <StaffCard />
        </div>
      </div>

    </div>
  );
}
