import { Activity, Shield, CheckCircle2, AlertTriangle, Database, Server, FileSearch } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui';

export function SystemIntegrity() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Health & Integrity</h1>
          <p className="text-[var(--text-secondary)]">Forensic-level view of system status, data flow, and anomalies.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          System Operational
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'System Uptime', value: '99.99%', sub: 'No outages detected in last 30 days', icon: Activity, color: 'emerald' },
          { label: 'Integration Health', value: 'Active', sub: 'All bridges functioning normally', icon: Server, color: 'emerald' },
          { label: 'Security Status', value: 'Secure', sub: 'No unauthorized access detected', icon: Shield, color: 'emerald' },
        ].map((item) => (
          <div key={item.label} className={`relative overflow-hidden pl-4 pr-4 py-4 bg-[var(--surface)] border-l-4 border-${item.color}-500 hover:bg-[var(--surface-hover)] transition-colors`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">{item.label}</span>
              <item.icon size={16} className={`text-${item.color}-500`} />
            </div>
            <div className="text-2xl font-bold text-[var(--text-primary)]">{item.value}</div>
            <div className="text-[10px] text-[var(--text-muted)] mt-1">{item.sub}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="flex items-center gap-2 mb-6">
          <Database className="h-5 w-5 text-[var(--accent-purple)]" />
          <h2 className="text-lg font-bold text-[var(--text-primary)]">Data Flow Forensics</h2>
        </div>

        <div className="space-y-8">
          <div className="flex justify-between border-b border-[var(--border)] pb-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
            <span className="w-1/3">Stage</span>
            <span className="w-1/3">Timestamp</span>
            <span className="w-1/3 text-right">Status</span>
          </div>

          <div className="space-y-4">
            <div className="font-mono text-xs text-[var(--accent-purple)] mb-2 bg-[var(--accent-purple)]/10 inline-block px-2 py-1 rounded">Batch-8921</div>
            <div className="relative border-l-2 border-[var(--border)] ml-2 space-y-8 pb-2">
              {[
                { label: 'Data Ingested', time: '10:42:01.230 AM', status: 'Confirmed', sub: 'Received from Google Ads Connector' },
                { label: 'Processing Complete', time: '10:42:01.450 AM', status: 'Verified', sub: 'Enriched with CRM metadata (Latency: 220ms)' },
                { label: 'Distributed Downstream', time: '10:42:01.890 AM', status: 'Delivered', sub: 'Sent to Client Dashboard & Notification Service' }
              ].map((step, i) => (
                <div key={i} className="ml-8 relative group">
                  <span className="absolute -left-[39px] flex h-6 w-6 items-center justify-center rounded-full bg-[var(--surface)] border-2 border-emerald-500 group-hover:scale-110 transition-transform">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  </span>
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-[var(--text-primary)]">{step.label}</div>
                    <div className="text-sm font-mono text-[var(--text-secondary)]">{step.time}</div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 bg-emerald-500/5">{step.status}</Badge>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{step.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h2 className="text-lg font-bold text-[var(--text-primary)]">Anomaly Detection</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--surface-active)]/30 border-l-2 border-emerald-500">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <div className="font-bold text-[var(--text-primary)]">Zero-Event Monitor</div>
                  <p className="text-xs text-[var(--text-secondary)]">Detects total data loss</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-0">Normal</Badge>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--surface-active)]/30 border-l-2 border-emerald-500">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <div className="font-bold text-[var(--text-primary)]">Ingestion Latency</div>
                  <p className="text-xs text-[var(--text-secondary)]">Threshold: &gt;500ms</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm font-bold text-[var(--text-primary)]">145ms</div>
                <span className="text-xs text-emerald-500">Optimal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <div className="flex items-center gap-2 mb-6">
            <FileSearch className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-bold text-[var(--text-primary)]">Audit Log Feed</h2>
          </div>
          <div className="space-y-0">
            {[
              { time: '10:45 AM', event: 'System Integrity Check', status: 'Passed' },
              { time: '10:30 AM', event: 'Database Consistency Scan', status: 'Passed' },
              { time: '10:15 AM', event: 'API Connectivity Test', status: 'Passed' },
              { time: '10:00 AM', event: 'Security Certificate Validation', status: 'Valid' },
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-hover)] transition-colors px-2 -mx-2 rounded">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-medium text-[var(--text-primary)]">{log.event}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[var(--text-muted)] font-mono text-xs">{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-[var(--text-secondary)] pt-4 border-t border-[var(--border)]">
        System Status Verified • Last Updated: <span className="font-mono">{new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
}
