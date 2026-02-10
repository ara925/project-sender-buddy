import { Activity, Globe, CheckCircle2, AlertTriangle, XCircle, Shield, Headset, Sparkles, Phone, PhoneMissed, Users, TrendingUp, TrendingDown, Bot, Clock } from 'lucide-react';
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
  { name: 'Filevine', status: 'operational', message: 'All services running normally', uptime: '99.99%', lastChecked: '1 min ago' },
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

      {/* Top KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Systems', value: `${sysOk}/${systemStatuses.length}`, icon: Activity, ok: sysDown === 0 && sysDegraded === 0, sub: sysDown > 0 ? `${sysDown} down` : sysDegraded > 0 ? `${sysDegraded} degraded` : 'All good' },
          { label: 'Websites', value: `${webOk}/${websiteStatuses.length}`, icon: Globe, ok: true, sub: 'All online' },
          { label: 'Staff', value: `${onFloor}`, icon: Headset, ok: staffIssuesCount === 0, sub: staffIssuesCount > 0 ? `${staffIssuesCount} issues` : 'On floor' },
          { label: 'Investigations', value: `${activeInv}`, icon: Shield, ok: activeInv === 0, sub: activeInv > 0 ? 'Active' : 'None' },
          { label: 'Calls Today', value: '47', icon: Phone, ok: true, sub: '↑ 12% vs yesterday' },
          { label: 'Missed Calls', value: '3', icon: PhoneMissed, ok: false, sub: 'Unclaimed' },
        ].map(kpi => (
          <div key={kpi.label} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5">
            <div className="flex items-center gap-1.5 mb-1.5">
              <kpi.icon size={12} className={kpi.ok ? 'text-emerald-500' : 'text-amber-500'} />
              <span className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-wide">{kpi.label}</span>
            </div>
            <p className="text-lg font-bold text-[var(--text-primary)] leading-none">{kpi.value}</p>
            <span className={`text-[10px] font-medium mt-1 block ${kpi.ok ? 'text-emerald-500' : 'text-red-500'}`}>{kpi.sub}</span>
          </div>
        ))}
      </div>

      {/* Action Items — things that need fixing */}
      <div className="rounded-xl border border-amber-500/20 bg-[var(--surface)] overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle size={14} className="text-amber-500" />
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">Action Required</h2>
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500">{actionItems.length}</span>
          </div>
          <span className="text-[10px] text-[var(--text-muted)]">Prioritized by severity</span>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {actionItems.map(item => {
            const config = actionTypeConfig[item.type];
            return (
              <div key={item.id} className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--surface-hover)] transition-colors">
                <span className={`h-2 w-2 rounded-full shrink-0 ${config.dot}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[var(--text-primary)]">{item.title}</p>
                  <p className="text-[10px] text-[var(--text-secondary)] truncate">{item.desc}</p>
                </div>
                <Link
                  to={item.link}
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-md ${config.bg} ${config.color} border ${config.border} hover:opacity-80 transition-opacity shrink-0`}
                >
                  {item.linkLabel}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid — 2 columns, items-start so cards don't stretch */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
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

      {/* Bottom Row — Leads Pipeline + AI Agent + Calls snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        {/* Leads Pipeline */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users size={14} className="text-[var(--primary)]" />
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">Lead Pipeline</h3>
            </div>
            <Link to="/leads" className="text-[10px] font-medium text-[var(--primary)] hover:underline">View →</Link>
          </div>
          <div className="space-y-3">
            {[
              { stage: 'New', count: 3, pct: 33, color: 'bg-blue-500' },
              { stage: 'Contacted', count: 2, pct: 22, color: 'bg-amber-500' },
              { stage: 'Qualified', count: 2, pct: 22, color: 'bg-emerald-500' },
              { stage: 'Retained', count: 1, pct: 11, color: 'bg-[var(--primary)]' },
              { stage: 'Lost', count: 1, pct: 11, color: 'bg-red-500' },
            ].map(s => (
              <div key={s.stage}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-medium text-[var(--text-secondary)]">{s.stage}</span>
                  <span className="text-[11px] font-bold text-[var(--text-primary)]">{s.count}</span>
                </div>
                <div className="h-1.5 rounded-full bg-[var(--surface-hover)] overflow-hidden">
                  <div className={`h-full rounded-full ${s.color} transition-all`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Agent Summary */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bot size={14} className="text-[var(--primary)]" />
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">Regal AI Agents</h3>
            </div>
            <Link to="/insights" className="text-[10px] font-medium text-[var(--primary)] hover:underline">Details →</Link>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Calls Handled', value: '16', trend: '+23%', up: true },
              { label: 'Containment Rate', value: '68%', trend: '+5%', up: true },
              { label: 'Avg Sentiment', value: '7.2', trend: '-0.3', up: false },
              { label: 'Escalations', value: '5', trend: '+2', up: false },
            ].map(m => (
              <div key={m.label} className="flex items-center justify-between">
                <span className="text-[11px] text-[var(--text-secondary)]">{m.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[var(--text-primary)]">{m.value}</span>
                  <span className={`flex items-center gap-0.5 text-[9px] font-medium ${m.up ? 'text-emerald-500' : 'text-red-500'}`}>
                    {m.up ? <TrendingUp size={8} /> : <TrendingDown size={8} />}
                    {m.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-[var(--border)]">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <AlertTriangle size={10} className="text-amber-500 shrink-0" />
              <p className="text-[10px] text-amber-500">2 AI calls escalated due to language barriers today</p>
            </div>
          </div>
        </div>

        {/* Calls Snapshot */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-[var(--primary)]" />
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">Calls Today</h3>
            </div>
            <Link to="/calls" className="text-[10px] font-medium text-[var(--primary)] hover:underline">View →</Link>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[
              { label: 'Completed', value: 38, color: 'text-emerald-500' },
              { label: 'Missed', value: 3, color: 'text-red-500' },
              { label: 'Voicemail', value: 4, color: 'text-amber-500' },
              { label: 'In Progress', value: 2, color: 'text-blue-500' },
            ].map(c => (
              <div key={c.label} className="text-center p-2 rounded-lg bg-[var(--surface-hover)]">
                <p className={`text-sm font-bold ${c.color}`}>{c.value}</p>
                <p className="text-[9px] text-[var(--text-muted)]">{c.label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
              <Clock size={10} className="text-[var(--text-muted)]" />
              Avg handle time: <span className="font-bold text-[var(--text-primary)]">4:32</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
              <TrendingUp size={10} className="text-emerald-500" />
              Call volume: <span className="font-bold text-[var(--text-primary)]">↑ 12%</span> vs yesterday
            </div>
          </div>
          {/* Missed call alert */}
          <div className="mt-3 pt-3 border-t border-[var(--border)]">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20">
              <PhoneMissed size={10} className="text-red-500 shrink-0" />
              <p className="text-[10px] text-red-500">3 missed calls with no callback scheduled</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
