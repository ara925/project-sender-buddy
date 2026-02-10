import { useState } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, XCircle, Activity, Clock, ArrowUpRight, ChevronDown, Globe } from 'lucide-react';

const systemStatuses = [
  { name: 'Intaker', status: 'operational' as const, message: 'All services running normally', uptime: '99.98%', lastChecked: '2 mins ago' },
  { name: 'CallRail', status: 'degraded' as const, message: 'Intermittent delays in call logging (~2 min lag)', uptime: '97.4%', lastChecked: '1 min ago' },
  { name: 'LeadDocket', status: 'operational' as const, message: 'All services running normally', uptime: '99.95%', lastChecked: '3 mins ago' },
  { name: 'Filevine', status: 'operational' as const, message: 'All services running normally', uptime: '99.99%', lastChecked: '1 min ago' },
  { name: 'Google Ads API', status: 'operational' as const, message: 'All services running normally', uptime: '99.97%', lastChecked: '5 mins ago' },
  { name: 'Internal CRM Sync', status: 'down' as const, message: 'Sync halted — authentication token expired. Re-authenticate to restore data flow.', uptime: '91.2%', lastChecked: 'Just now' },
];

const websiteStatuses = [
  { name: 'wilshirelawfirm.com', status: 'operational' as const, message: 'Site responding normally', uptime: '99.99%', lastChecked: '1 min ago' },
  { name: 'wilshirelaw.com', status: 'operational' as const, message: 'Site responding normally', uptime: '99.97%', lastChecked: '2 mins ago' },
  { name: 'employeerights.wilshirelaw.com', status: 'operational' as const, message: 'Site responding normally', uptime: '99.95%', lastChecked: '3 mins ago' },
];

const statusConfig = {
  operational: { icon: CheckCircle2, label: 'Operational', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-500' },
  degraded: { icon: AlertTriangle, label: 'Degraded', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', dot: 'bg-amber-500' },
  down: { icon: XCircle, label: 'Down', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20', dot: 'bg-red-500' },
};

export function Dashboard() {
  const [expanded, setExpanded] = useState(false);

  const operationalCount = systemStatuses.filter(s => s.status === 'operational').length;
  const degradedCount = systemStatuses.filter(s => s.status === 'degraded').length;
  const downCount = systemStatuses.filter(s => s.status === 'down').length;
  const allOperational = degradedCount === 0 && downCount === 0;

  const issueCount = degradedCount + downCount;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Dashboard</h1>
          <p className="text-[var(--text-secondary)] mt-1">System health & operational status</p>
        </div>
        <div className="px-3 py-1.5 rounded-md bg-[var(--surface)] border border-[var(--border)] flex items-center gap-2">
          <Sparkles size={14} className="text-[var(--primary)]" />
          <span className="text-xs font-medium text-[var(--text-secondary)]">Live Updates</span>
        </div>
      </div>

      {/* Collapsible System Status */}
      <div className={`card overflow-hidden border transition-colors ${allOperational ? 'border-emerald-500/20' : 'border-amber-500/20'}`}>
        {/* Clickable Banner */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full p-4 flex items-center justify-between hover:bg-[var(--surface-hover)] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${allOperational ? 'bg-emerald-500/10' : 'bg-amber-500/10'}`}>
              <Activity size={18} className={allOperational ? 'text-emerald-500' : 'text-amber-500'} />
            </div>
            <div className="text-left">
              <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                {allOperational ? 'All Systems Operational' : `${issueCount} System${issueCount > 1 ? 's' : ''} Need${issueCount === 1 ? 's' : ''} Attention`}
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">
                {operationalCount}/{systemStatuses.length} operational
                {degradedCount > 0 && <span className="text-amber-500"> · {degradedCount} degraded</span>}
                {downCount > 0 && <span className="text-red-500"> · {downCount} down</span>}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Status dots summary */}
            <div className="hidden sm:flex items-center gap-1">
              {systemStatuses.map((s) => (
                <span key={s.name} className={`h-2 w-2 rounded-full ${statusConfig[s.status].dot}`} title={s.name} />
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
              <Clock size={11} />
              <span className="hidden sm:inline">Just now</span>
            </div>
            <ChevronDown
              size={16}
              className={`text-[var(--text-muted)] transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            />
          </div>
        </button>

        {/* Expandable Content */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="border-t border-[var(--border)]">
            {/* Summary row */}
            <div className="grid grid-cols-3 gap-px bg-[var(--border)]">
              <div className="bg-[var(--surface)] p-4 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span className="text-xs font-medium text-[var(--text-secondary)]">Operational</span>
                </div>
                <span className="text-xl font-bold text-[var(--text-primary)]">{operationalCount}</span>
              </div>
              <div className="bg-[var(--surface)] p-4 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <AlertTriangle size={14} className="text-amber-500" />
                  <span className="text-xs font-medium text-[var(--text-secondary)]">Degraded</span>
                </div>
                <span className="text-xl font-bold text-[var(--text-primary)]">{degradedCount}</span>
              </div>
              <div className="bg-[var(--surface)] p-4 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <XCircle size={14} className="text-red-500" />
                  <span className="text-xs font-medium text-[var(--text-secondary)]">Down</span>
                </div>
                <span className="text-xl font-bold text-[var(--text-primary)]">{downCount}</span>
              </div>
            </div>

            {/* System list */}
            <div className="divide-y divide-[var(--border)]">
              {systemStatuses.map((system) => {
                const config = statusConfig[system.status];
                const StatusIcon = config.icon;
                return (
                  <div key={system.name} className="flex items-center justify-between p-4 hover:bg-[var(--surface-hover)] transition-colors">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`p-2 rounded-lg ${config.bg}`}>
                        <StatusIcon size={16} className={config.color} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-[var(--text-primary)]">{system.name}</p>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${config.bg} ${config.color} border ${config.border}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
                            {config.label}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5 truncate">{system.message}</p>
                      </div>
                    </div>
                    <div className="text-right ml-4 shrink-0">
                      <div className="flex items-center gap-1 text-xs font-medium text-[var(--text-primary)]">
                        <ArrowUpRight size={10} className="text-emerald-500" />
                        {system.uptime}
                      </div>
                      <span className="text-[10px] text-[var(--text-muted)]">{system.lastChecked}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
