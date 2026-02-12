import { CheckCircle2, AlertTriangle, XCircle, Activity, Clock, ArrowUpRight, FileText, Phone, Database, Zap, Globe, Server } from 'lucide-react';

interface IntegrationSystem {
  name: string;
  description: string;
  icon: React.ElementType;
  status: 'healthy' | 'degraded' | 'down';
  apiCalls: { success: number; failed: number; total: number };
  logsGenerated: number;
  lastDataTimestamp: string;
  lastDataLabel: string;
  uptime: string;
  latency: string;
}

const systems: IntegrationSystem[] = [
  {
    name: 'Litify',
    description: 'Case management & CRM',
    icon: Database,
    status: 'healthy',
    apiCalls: { success: 1247, failed: 2, total: 1249 },
    logsGenerated: 3842,
    lastDataTimestamp: '2 mins ago',
    lastDataLabel: 'Case update — Martinez v. TruckCo',
    uptime: '99.98%',
    latency: '124ms',
  },
  {
    name: 'Intaker',
    description: 'Intake form processing',
    icon: FileText,
    status: 'healthy',
    apiCalls: { success: 892, failed: 0, total: 892 },
    logsGenerated: 2104,
    lastDataTimestamp: '8 mins ago',
    lastDataLabel: 'New intake — Personal Injury',
    uptime: '99.99%',
    latency: '89ms',
  },
  {
    name: 'CallRail',
    description: 'Call tracking & analytics',
    icon: Phone,
    status: 'degraded',
    apiCalls: { success: 634, failed: 18, total: 652 },
    logsGenerated: 1567,
    lastDataTimestamp: '14 mins ago',
    lastDataLabel: 'Inbound call — (213) 555-0142',
    uptime: '97.4%',
    latency: '2.1s',
  },
  {
    name: 'Loadify',
    description: 'Document processing',
    icon: Zap,
    status: 'healthy',
    apiCalls: { success: 445, failed: 1, total: 446 },
    logsGenerated: 998,
    lastDataTimestamp: '5 mins ago',
    lastDataLabel: 'Document uploaded — Medical Records',
    uptime: '99.97%',
    latency: '156ms',
  },
  {
    name: 'Google Ads API',
    description: 'Ad campaign data sync',
    icon: Globe,
    status: 'healthy',
    apiCalls: { success: 312, failed: 0, total: 312 },
    logsGenerated: 756,
    lastDataTimestamp: '3 mins ago',
    lastDataLabel: 'Campaign sync — PI Brand Terms',
    uptime: '99.99%',
    latency: '201ms',
  },
  {
    name: 'Internal CRM Sync',
    description: 'Cross-system data pipeline',
    icon: Server,
    status: 'down',
    apiCalls: { success: 0, failed: 47, total: 47 },
    logsGenerated: 47,
    lastDataTimestamp: '3 hours ago',
    lastDataLabel: 'Last sync — Auth token expired',
    uptime: '91.2%',
    latency: 'N/A',
  },
];

const statusConfig = {
  healthy: { icon: CheckCircle2, label: 'Healthy', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-500' },
  degraded: { icon: AlertTriangle, label: 'Degraded', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', dot: 'bg-amber-500' },
  down: { icon: XCircle, label: 'Down', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20', dot: 'bg-red-500' },
};

export function SystemsHealthTab() {
  const healthy = systems.filter(s => s.status === 'healthy').length;
  const degraded = systems.filter(s => s.status === 'degraded').length;
  const down = systems.filter(s => s.status === 'down').length;

  return (
    <div className="space-y-6">
      {/* Summary Bar */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-[var(--text-muted)]" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">Integration Overview</span>
        </div>
        <div className="ml-auto flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-emerald-500">{healthy} Healthy</span>
          </span>
          {degraded > 0 && (
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-amber-500">{degraded} Degraded</span>
            </span>
          )}
          {down > 0 && (
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span className="text-red-500">{down} Down</span>
            </span>
          )}
        </div>
      </div>

      {/* System Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {systems.map((system) => {
          const config = statusConfig[system.status];
          const StatusIcon = config.icon;
          const SystemIcon = system.icon;
          const apiSuccessRate = system.apiCalls.total > 0
            ? ((system.apiCalls.success / system.apiCalls.total) * 100).toFixed(1)
            : '0';

          return (
            <div
              key={system.name}
              className={`rounded-xl border ${config.border} bg-[var(--surface)] overflow-hidden transition-all hover:shadow-lg`}
            >
              {/* Header */}
              <div className="p-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg ${config.bg}`}>
                    <SystemIcon size={18} className={config.color} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)]">{system.name}</h3>
                    <p className="text-[11px] text-[var(--text-muted)]">{system.description}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${config.bg} ${config.color}`}>
                  <StatusIcon size={10} />
                  {config.label}
                </div>
              </div>

              {/* Metrics */}
              <div className="px-4 pb-4 space-y-3">
                {/* API Calls */}
                <div className="p-3 rounded-lg bg-[var(--surface-hover)] space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">API Calls (24h)</span>
                    <span className="text-xs font-mono text-[var(--text-primary)]">{apiSuccessRate}% success</span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="text-emerald-500 font-mono">{system.apiCalls.success} ok</span>
                    <span className="text-[var(--text-muted)]">·</span>
                    <span className={`font-mono ${system.apiCalls.failed > 0 ? 'text-red-500' : 'text-[var(--text-muted)]'}`}>
                      {system.apiCalls.failed} failed
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1.5 rounded-full bg-[var(--surface-active)] overflow-hidden">
                    <div
                      className={`h-full rounded-full ${system.status === 'down' ? 'bg-red-500' : system.status === 'degraded' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      style={{ width: `${apiSuccessRate}%` }}
                    />
                  </div>
                </div>

                {/* Logs & Latency */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-lg bg-[var(--surface-hover)]">
                    <p className="text-[9px] font-bold uppercase text-[var(--text-muted)] mb-1">Logs (24h)</p>
                    <p className="text-sm font-bold text-[var(--text-primary)] font-mono">{system.logsGenerated.toLocaleString()}</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[var(--surface-hover)]">
                    <p className="text-[9px] font-bold uppercase text-[var(--text-muted)] mb-1">Latency</p>
                    <p className={`text-sm font-bold font-mono ${system.latency === 'N/A' ? 'text-red-500' : 'text-[var(--text-primary)]'}`}>{system.latency}</p>
                  </div>
                </div>

                {/* Uptime */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
                    <ArrowUpRight size={12} className="text-emerald-500" />
                    <span>Uptime: <strong className="text-[var(--text-primary)]">{system.uptime}</strong></span>
                  </div>
                </div>

                {/* Last Data */}
                <div className="pt-3 border-t border-[var(--border)]">
                  <div className="flex items-start gap-2">
                    <Clock size={12} className="text-[var(--text-muted)] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold uppercase text-[var(--text-muted)]">Last New Data</p>
                      <p className="text-xs text-[var(--text-primary)] mt-0.5">{system.lastDataLabel}</p>
                      <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{system.lastDataTimestamp}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
