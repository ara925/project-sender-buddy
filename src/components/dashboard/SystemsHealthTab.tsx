import { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Activity, Clock, ArrowUpRight, FileText, Phone, Database, Zap, Globe, Server, X, AlertCircle, ArrowDown, ArrowUp, BarChart3 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

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
  // Detail data
  recentErrors: { time: string; code: string; message: string; endpoint: string }[];
  eventLog: { time: string; event: string; type: 'info' | 'warning' | 'error' }[];
  rootCause: string | null;
  recommendation: string | null;
  uptimeHistory: { date: string; pct: number }[];
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
    recentErrors: [
      { time: '11:42 AM', code: '408', message: 'Request timeout on /api/cases/bulk-sync', endpoint: 'POST /api/cases/bulk-sync' },
      { time: '3:15 AM', code: '429', message: 'Rate limit exceeded — throttled for 30s', endpoint: 'GET /api/contacts/search' },
    ],
    eventLog: [
      { time: '12:58 PM', event: 'Case update synced — Martinez v. TruckCo (#LIT-4892)', type: 'info' },
      { time: '12:45 PM', event: 'Bulk contact sync completed — 142 records', type: 'info' },
      { time: '11:42 AM', event: 'Timeout on bulk-sync — retried successfully', type: 'warning' },
      { time: '10:30 AM', event: 'New matter created — Davis Employment Claim (#LIT-4891)', type: 'info' },
      { time: '9:15 AM', event: 'Daily health check passed', type: 'info' },
    ],
    rootCause: null,
    recommendation: null,
    uptimeHistory: [
      { date: 'Mon', pct: 100 }, { date: 'Tue', pct: 99.9 }, { date: 'Wed', pct: 100 },
      { date: 'Thu', pct: 99.8 }, { date: 'Fri', pct: 100 }, { date: 'Sat', pct: 100 }, { date: 'Sun', pct: 100 },
    ],
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
    recentErrors: [],
    eventLog: [
      { time: '12:50 PM', event: 'New intake submitted — PI Auto Accident, Maria Gonzalez', type: 'info' },
      { time: '12:22 PM', event: 'Intake form rendered — Employment Law landing page', type: 'info' },
      { time: '11:58 AM', event: 'Webhook delivered to Litify — intake #INT-2847', type: 'info' },
      { time: '11:30 AM', event: 'Form A/B test variant B served (62% of traffic)', type: 'info' },
      { time: '10:00 AM', event: 'Daily integrity check — all form fields validated', type: 'info' },
    ],
    rootCause: null,
    recommendation: null,
    uptimeHistory: [
      { date: 'Mon', pct: 100 }, { date: 'Tue', pct: 100 }, { date: 'Wed', pct: 100 },
      { date: 'Thu', pct: 100 }, { date: 'Fri', pct: 99.99 }, { date: 'Sat', pct: 100 }, { date: 'Sun', pct: 100 },
    ],
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
    recentErrors: [
      { time: '12:44 PM', code: '504', message: 'Gateway timeout — call log webhook delayed', endpoint: 'POST /webhooks/call-complete' },
      { time: '12:38 PM', code: '504', message: 'Gateway timeout — call log webhook delayed', endpoint: 'POST /webhooks/call-complete' },
      { time: '12:22 PM', code: '500', message: 'Internal server error on recording fetch', endpoint: 'GET /api/recordings/CR-8841' },
      { time: '11:55 AM', code: '504', message: 'Gateway timeout — intermittent', endpoint: 'POST /webhooks/call-complete' },
    ],
    eventLog: [
      { time: '12:44 PM', event: 'Call log delayed ~2 min — webhook timeout (3rd occurrence today)', type: 'warning' },
      { time: '12:38 PM', event: 'Inbound call logged — (213) 555-0142 → James Wilson', type: 'info' },
      { time: '12:22 PM', event: 'Recording fetch failed for CR-8841 — retry scheduled', type: 'error' },
      { time: '11:55 AM', event: 'Webhook delivery delayed — CallRail infrastructure slowdown', type: 'warning' },
      { time: '11:30 AM', event: 'Call tracking number pool refreshed — 12 numbers active', type: 'info' },
      { time: '10:00 AM', event: 'Daily health check — latency elevated (2.1s avg vs 200ms baseline)', type: 'warning' },
    ],
    rootCause: 'CallRail is experiencing intermittent gateway timeouts on their webhook delivery infrastructure. Their status page confirms degraded performance in the US-West region since 10:30 AM PST. This is causing ~2 minute delays in call log ingestion.',
    recommendation: 'No action required on our end — this is a CallRail infrastructure issue. Monitor their status page (status.callrail.com). If delays exceed 5 minutes, switch to polling-based ingestion as a fallback.',
    uptimeHistory: [
      { date: 'Mon', pct: 100 }, { date: 'Tue', pct: 100 }, { date: 'Wed', pct: 99.1 },
      { date: 'Thu', pct: 96.8 }, { date: 'Fri', pct: 97.4 }, { date: 'Sat', pct: 100 }, { date: 'Sun', pct: 100 },
    ],
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
    recentErrors: [
      { time: '8:22 AM', code: '413', message: 'Payload too large — document exceeded 50MB limit', endpoint: 'POST /api/documents/upload' },
    ],
    eventLog: [
      { time: '12:53 PM', event: 'Medical records uploaded — Martinez case (14 pages, OCR complete)', type: 'info' },
      { time: '12:10 PM', event: 'Police report processed — Davis incident (#DOC-1247)', type: 'info' },
      { time: '11:45 AM', event: 'Insurance correspondence scanned and classified', type: 'info' },
      { time: '8:22 AM', event: 'Upload rejected — file exceeded 50MB limit (user notified)', type: 'warning' },
      { time: '7:00 AM', event: 'Nightly OCR batch completed — 28 documents processed', type: 'info' },
    ],
    rootCause: null,
    recommendation: null,
    uptimeHistory: [
      { date: 'Mon', pct: 100 }, { date: 'Tue', pct: 100 }, { date: 'Wed', pct: 100 },
      { date: 'Thu', pct: 99.9 }, { date: 'Fri', pct: 100 }, { date: 'Sat', pct: 100 }, { date: 'Sun', pct: 100 },
    ],
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
    recentErrors: [],
    eventLog: [
      { time: '12:55 PM', event: 'Campaign data synced — PI Brand Terms ($142 spend, 18 clicks)', type: 'info' },
      { time: '12:30 PM', event: 'Conversion tracking updated — 3 new form fills attributed', type: 'info' },
      { time: '11:00 AM', event: 'Budget pacing check — all campaigns within 5% of daily target', type: 'info' },
      { time: '9:00 AM', event: 'Daily spend report generated — $2,847 total across 6 campaigns', type: 'info' },
    ],
    rootCause: null,
    recommendation: null,
    uptimeHistory: [
      { date: 'Mon', pct: 100 }, { date: 'Tue', pct: 100 }, { date: 'Wed', pct: 100 },
      { date: 'Thu', pct: 100 }, { date: 'Fri', pct: 100 }, { date: 'Sat', pct: 100 }, { date: 'Sun', pct: 99.99 },
    ],
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
    recentErrors: [
      { time: '12:58 PM', code: '401', message: 'Unauthorized — OAuth token expired', endpoint: 'POST /api/sync/full' },
      { time: '12:43 PM', code: '401', message: 'Unauthorized — OAuth token expired', endpoint: 'POST /api/sync/incremental' },
      { time: '12:28 PM', code: '401', message: 'Unauthorized — OAuth token expired', endpoint: 'POST /api/sync/full' },
      { time: '12:13 PM', code: '401', message: 'Unauthorized — OAuth token expired', endpoint: 'POST /api/sync/incremental' },
      { time: '11:58 AM', code: '401', message: 'Unauthorized — OAuth token expired', endpoint: 'POST /api/sync/full' },
    ],
    eventLog: [
      { time: '12:58 PM', event: 'Sync attempt failed — 401 Unauthorized (47th consecutive failure)', type: 'error' },
      { time: '10:02 AM', event: 'Alert escalated — CRM sync down > 2 hours, admin notified', type: 'error' },
      { time: '9:45 AM', event: 'Auto-retry exhausted — 10 attempts failed, manual intervention required', type: 'error' },
      { time: '9:00 AM', event: 'OAuth token expiration detected — refresh token also invalid', type: 'error' },
      { time: '8:30 AM', event: 'Last successful sync — 847 records synced to Litify', type: 'info' },
    ],
    rootCause: 'The OAuth 2.0 refresh token for the CRM sync service account expired after 90 days. The auto-refresh mechanism failed because the service account password was changed on Jan 28 without updating the sync configuration. All sync operations have been failing with 401 errors since 9:00 AM.',
    recommendation: 'Re-authenticate the CRM sync service account: Admin → Integrations → CRM Sync → Re-authorize. A new OAuth token will be generated. After re-auth, trigger a full sync to catch up on the 3-hour data gap. Estimated catch-up time: ~15 minutes.',
    uptimeHistory: [
      { date: 'Mon', pct: 100 }, { date: 'Tue', pct: 100 }, { date: 'Wed', pct: 100 },
      { date: 'Thu', pct: 100 }, { date: 'Fri', pct: 62.5 }, { date: 'Sat', pct: 100 }, { date: 'Sun', pct: 100 },
    ],
  },
];

const statusConfig = {
  healthy: { icon: CheckCircle2, label: 'Healthy', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-500' },
  degraded: { icon: AlertTriangle, label: 'Degraded', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', dot: 'bg-amber-500' },
  down: { icon: XCircle, label: 'Down', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20', dot: 'bg-red-500' },
};

const eventTypeConfig = {
  info: { color: 'text-[var(--text-secondary)]', dot: 'bg-blue-500' },
  warning: { color: 'text-amber-500', dot: 'bg-amber-500' },
  error: { color: 'text-red-500', dot: 'bg-red-500' },
};

export function SystemsHealthTab() {
  const [selectedSystem, setSelectedSystem] = useState<IntegrationSystem | null>(null);

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
              onClick={() => setSelectedSystem(system)}
              className={`rounded-xl border ${config.border} bg-[var(--surface)] overflow-hidden transition-all hover:shadow-lg cursor-pointer group`}
            >
              {/* Header */}
              <div className="p-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg ${config.bg}`}>
                    <SystemIcon size={18} className={config.color} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">{system.name}</h3>
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
                <div className="p-3 rounded-lg bg-[var(--surface-hover)] space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">API Calls (24h)</span>
                    <span className="text-xs font-mono text-[var(--text-primary)]">{apiSuccessRate}% success</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--surface-active)] overflow-hidden">
                    <div
                      className={`h-full rounded-full ${system.status === 'down' ? 'bg-red-500' : system.status === 'degraded' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      style={{ width: `${apiSuccessRate}%` }}
                    />
                  </div>
                </div>

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

      {/* Detail Drawer */}
      <Sheet open={!!selectedSystem} onOpenChange={(open) => !open && setSelectedSystem(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto bg-[var(--background)] border-[var(--border)]">
          {selectedSystem && (() => {
            const config = statusConfig[selectedSystem.status];
            const StatusIcon = config.icon;
            const SystemIcon = selectedSystem.icon;
            const apiSuccessRate = selectedSystem.apiCalls.total > 0
              ? ((selectedSystem.apiCalls.success / selectedSystem.apiCalls.total) * 100).toFixed(1)
              : '0';

            return (
              <div className="space-y-6 pt-2">
                <SheetHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${config.bg}`}>
                      <SystemIcon size={22} className={config.color} />
                    </div>
                    <div>
                      <SheetTitle className="text-lg font-bold text-[var(--text-primary)]">{selectedSystem.name}</SheetTitle>
                      <p className="text-xs text-[var(--text-secondary)]">{selectedSystem.description}</p>
                    </div>
                    <div className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${config.bg} ${config.color}`}>
                      <StatusIcon size={12} />
                      {config.label}
                    </div>
                  </div>
                </SheetHeader>

                {/* Root Cause Analysis (if degraded/down) */}
                {selectedSystem.rootCause && (
                  <div className={`p-4 rounded-xl border-2 ${selectedSystem.status === 'down' ? 'border-red-500/30 bg-red-500/5' : 'border-amber-500/30 bg-amber-500/5'}`}>
                    <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${selectedSystem.status === 'down' ? 'text-red-500' : 'text-amber-500'}`}>
                      🔍 Root Cause Analysis
                    </h4>
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed">{selectedSystem.rootCause}</p>
                  </div>
                )}

                {/* Recommendation */}
                {selectedSystem.recommendation && (
                  <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-blue-500">
                      💡 Recommended Action
                    </h4>
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed">{selectedSystem.recommendation}</p>
                  </div>
                )}

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                    <p className="text-[9px] font-bold uppercase text-[var(--text-muted)]">API Success</p>
                    <p className="text-xl font-bold text-[var(--text-primary)] font-mono mt-1">{apiSuccessRate}%</p>
                    <p className="text-[10px] text-[var(--text-muted)]">{selectedSystem.apiCalls.total} total</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                    <p className="text-[9px] font-bold uppercase text-[var(--text-muted)]">Uptime (7d)</p>
                    <p className="text-xl font-bold text-[var(--text-primary)] font-mono mt-1">{selectedSystem.uptime}</p>
                    <p className="text-[10px] text-[var(--text-muted)]">Last 7 days</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                    <p className="text-[9px] font-bold uppercase text-[var(--text-muted)]">Avg Latency</p>
                    <p className={`text-xl font-bold font-mono mt-1 ${selectedSystem.latency === 'N/A' ? 'text-red-500' : 'text-[var(--text-primary)]'}`}>{selectedSystem.latency}</p>
                    <p className="text-[10px] text-[var(--text-muted)]">Current</p>
                  </div>
                </div>

                {/* 7-Day Uptime Chart */}
                <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">7-Day Uptime</h4>
                  <div className="flex items-end gap-2 h-20">
                    {selectedSystem.uptimeHistory.map((d) => (
                      <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full rounded-t-sm relative" style={{ height: `${Math.max((d.pct - 90) * 10, 2)}px` }}>
                          <div className={`w-full h-full rounded-t-sm ${d.pct >= 99.5 ? 'bg-emerald-500' : d.pct >= 97 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ height: `${(d.pct / 100) * 60}px` }} />
                        </div>
                        <span className="text-[9px] text-[var(--text-muted)]">{d.date}</span>
                        <span className={`text-[8px] font-mono ${d.pct >= 99.5 ? 'text-emerald-500' : d.pct >= 97 ? 'text-amber-500' : 'text-red-500'}`}>{d.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Errors */}
                {selectedSystem.recentErrors.length > 0 && (
                  <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                      Recent Errors ({selectedSystem.recentErrors.length})
                    </h4>
                    <div className="space-y-2">
                      {selectedSystem.recentErrors.map((err, i) => (
                        <div key={i} className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono text-red-500 font-bold">HTTP {err.code}</span>
                            <span className="text-[10px] font-mono text-[var(--text-muted)]">{err.time}</span>
                          </div>
                          <p className="text-xs text-[var(--text-primary)]">{err.message}</p>
                          <p className="text-[10px] font-mono text-[var(--text-muted)] mt-1">{err.endpoint}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Event Log / Timeline */}
                <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">Event Log</h4>
                  <div className="space-y-0">
                    {selectedSystem.eventLog.map((evt, i) => {
                      const evtConfig = eventTypeConfig[evt.type];
                      return (
                        <div key={i} className="flex gap-3 py-2.5 border-b border-[var(--border)] last:border-0">
                          <div className="flex flex-col items-center pt-1.5">
                            <div className={`h-2 w-2 rounded-full ${evtConfig.dot}`} />
                            {i < selectedSystem.eventLog.length - 1 && (
                              <div className="w-px flex-1 bg-[var(--border)] mt-1" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs ${evtConfig.color}`}>{evt.event}</p>
                            <p className="text-[10px] font-mono text-[var(--text-muted)] mt-0.5">{evt.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })()}
        </SheetContent>
      </Sheet>
    </div>
  );
}
