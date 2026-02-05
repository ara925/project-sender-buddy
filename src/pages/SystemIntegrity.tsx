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
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Activity className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.99%</div>
            <p className="text-xs text-[var(--text-secondary)]">No outages detected in last 30 days</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Integration Health</CardTitle>
            <Server className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-[var(--text-secondary)]">All bridges functioning normally</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Status</CardTitle>
            <Shield className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Secure</div>
            <p className="text-xs text-[var(--text-secondary)]">No unauthorized access detected</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-[var(--accent-purple)]" />
            Data Flow Forensics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="flex justify-between border-b border-[var(--border)] pb-4 text-sm font-medium text-[var(--text-secondary)]">
              <span className="w-1/3">Stage</span>
              <span className="w-1/3">Timestamp</span>
              <span className="w-1/3">Status</span>
            </div>

            <div className="space-y-4">
              <div className="font-medium text-sm text-[var(--text-secondary)] mb-2">Recent Batch: #Batch-8921</div>
              <div className="relative border-l-2 border-[var(--border)] ml-2 space-y-6 pb-2">
                <div className="ml-6 relative">
                  <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-[var(--surface)] border-2 border-emerald-500">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Data Ingested</div>
                    <div className="text-sm font-mono text-[var(--text-secondary)]">10:42:01.230 AM</div>
                    <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 bg-emerald-500/10">Confirmed</Badge>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">Received from Google Ads Connector</p>
                </div>

                <div className="ml-6 relative">
                  <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-[var(--surface)] border-2 border-emerald-500">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Processing Complete</div>
                    <div className="text-sm font-mono text-[var(--text-secondary)]">10:42:01.450 AM</div>
                    <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 bg-emerald-500/10">Verified</Badge>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">Enriched with CRM metadata (Latency: 220ms)</p>
                </div>

                <div className="ml-6 relative">
                  <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-[var(--surface)] border-2 border-emerald-500">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Distributed Downstream</div>
                    <div className="text-sm font-mono text-[var(--text-secondary)]">10:42:01.890 AM</div>
                    <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 bg-emerald-500/10">Delivered</Badge>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">Sent to Client Dashboard & Notification Service</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Anomaly Detection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)]">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <div>
                  <div className="font-medium">Zero-Event Monitor</div>
                  <p className="text-xs text-[var(--text-secondary)]">Detects total data loss</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500">Normal</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)]">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <div>
                  <div className="font-medium">Ingestion Latency</div>
                  <p className="text-xs text-[var(--text-secondary)]">Threshold: &gt;500ms</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm">145ms</div>
                <span className="text-xs text-emerald-500">Optimal</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSearch className="h-5 w-5 text-blue-500" />
              Audit Log Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: '10:45 AM', event: 'System Integrity Check', status: 'Passed' },
                { time: '10:30 AM', event: 'Database Consistency Scan', status: 'Passed' },
                { time: '10:15 AM', event: 'API Connectivity Test', status: 'Passed' },
                { time: '10:00 AM', event: 'Security Certificate Validation', status: 'Valid' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between text-sm border-b border-[var(--border)] last:border-0 pb-2 last:pb-0">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    <span>{log.event}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[var(--text-secondary)] font-mono text-xs">{log.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center text-xs text-[var(--text-secondary)] pt-4 border-t border-[var(--border)]">
        System Status Verified • Last Updated: <span className="font-mono">{new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
}
