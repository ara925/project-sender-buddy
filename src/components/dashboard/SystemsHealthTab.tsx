import { useState, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Activity, Clock, ArrowUpRight, FileText, Phone, Database, Globe, Zap, X, AlertCircle, ArrowDown, ArrowUp, BarChart3, Loader2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { formatPhone } from '@/lib/utils';

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
  recentErrors: { time: string; code: string; message: string; endpoint: string }[];
  eventLog: { time: string; event: string; type: 'info' | 'warning' | 'error' }[];
  rootCause: string | null;
  recommendation: string | null;
  uptimeHistory: { date: string; pct: number }[];
}

const staticSystems: IntegrationSystem[] = [
  {
    name: 'Salesforce',
    description: 'CRM & case management',
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
      { time: '12:58 PM', event: 'Case update synced — Martinez v. TruckCo (#SF-4892)', type: 'info' },
      { time: '12:45 PM', event: 'Bulk contact sync completed — 142 records', type: 'info' },
      { time: '11:42 AM', event: 'Timeout on bulk-sync — retried successfully', type: 'warning' },
      { time: '10:30 AM', event: 'New case created — Davis Employment Claim (#SF-4891)', type: 'info' },
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
      { time: '11:58 AM', event: 'Webhook delivered to Salesforce — intake #INT-2847', type: 'info' },
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
    name: 'Website',
    description: 'Website traffic & form submissions',
    icon: Globe,
    status: 'healthy',
    apiCalls: { success: 2840, failed: 3, total: 2843 },
    logsGenerated: 5620,
    lastDataTimestamp: '1 min ago',
    lastDataLabel: 'Form submission — /free-consultation',
    uptime: '99.99%',
    latency: '45ms',
    recentErrors: [
      { time: '6:12 AM', code: '500', message: 'Form handler timeout — auto-recovered', endpoint: 'POST /api/forms/submit' },
    ],
    eventLog: [
      { time: '12:59 PM', event: 'Form submission — /free-consultation, PI Auto Accident', type: 'info' },
      { time: '12:42 PM', event: 'Live chat session started — Employment Law inquiry', type: 'info' },
      { time: '12:15 PM', event: 'Contact form submitted — /workers-compensation', type: 'info' },
      { time: '11:50 AM', event: 'Page speed check — all pages under 2.5s load time', type: 'info' },
      { time: '10:00 AM', event: 'Daily uptime check passed — all forms operational', type: 'info' },
    ],
    rootCause: null,
    recommendation: null,
    uptimeHistory: [
      { date: 'Mon', pct: 100 }, { date: 'Tue', pct: 100 }, { date: 'Wed', pct: 100 },
      { date: 'Thu', pct: 100 }, { date: 'Fri', pct: 100 }, { date: 'Sat', pct: 100 }, { date: 'Sun', pct: 99.99 },
    ],
  },
  {
    name: 'Regal',
    description: 'Inbound call handling & AI intake',
    icon: Phone,
    status: 'healthy',
    apiCalls: { success: 678, failed: 5, total: 683 },
    logsGenerated: 1890,
    lastDataTimestamp: '4 mins ago',
    lastDataLabel: 'AI Agent answered inbound PI call',
    uptime: '99.95%',
    latency: '180ms',
    recentErrors: [
      { time: '10:15 AM', code: '503', message: 'Inbound call routing timeout — auto-retried', endpoint: 'POST /api/calls/inbound' },
      { time: '8:42 AM', code: 'DROP', message: 'Caller dropped during AI hold queue — 22s wait', endpoint: 'Inbound queue' },
    ],
    eventLog: [
      { time: '12:56 PM', event: 'AI Agent answered inbound — PI auto accident, caller qualified', type: 'info' },
      { time: '12:42 PM', event: 'Inbound call routed to AI Agent — employment inquiry', type: 'info' },
      { time: '12:30 PM', event: 'AI Agent transferred to human intake — caller requested attorney', type: 'warning' },
      { time: '12:05 PM', event: 'Inbound call answered — AI collected intake info, 3m 12s', type: 'info' },
      { time: '11:40 AM', event: 'AI Agent handled inbound — workers comp, caller pre-qualified', type: 'info' },
      { time: '11:15 AM', event: 'Inbound call — AI unable to classify case type, escalated to human', type: 'warning' },
      { time: '10:15 AM', event: 'Inbound routing timeout — retried successfully after 2s', type: 'warning' },
    ],
    rootCause: null,
    recommendation: null,
    uptimeHistory: [
      { date: 'Mon', pct: 100 }, { date: 'Tue', pct: 100 }, { date: 'Wed', pct: 99.9 },
      { date: 'Thu', pct: 100 }, { date: 'Fri', pct: 100 }, { date: 'Sat', pct: 100 }, { date: 'Sun', pct: 100 },
    ],
  },
  {
    name: 'Zapier',
    description: 'Workflow automation & data routing',
    icon: Zap,
    status: 'healthy',
    apiCalls: { success: 1542, failed: 8, total: 1550 },
    logsGenerated: 3210,
    lastDataTimestamp: '3 mins ago',
    lastDataLabel: 'Zap executed — New Intaker lead routed',
    uptime: '99.94%',
    latency: '320ms',
    recentErrors: [
      { time: '7:22 AM', code: '429', message: 'Rate limit — throttled for 60s on bulk trigger', endpoint: 'POST /hooks/catch' },
    ],
    eventLog: [
      { time: '12:57 PM', event: 'Zap executed — Intaker lead routed to webhook', type: 'info' },
      { time: '12:35 PM', event: 'Zap executed — CallRail call data forwarded', type: 'info' },
      { time: '11:50 AM', event: 'Zap executed — New lead notification sent to Slack', type: 'info' },
      { time: '10:20 AM', event: 'Zap executed — Salesforce record created from intake', type: 'info' },
      { time: '7:22 AM', event: 'Rate limit hit on bulk trigger — retried after 60s', type: 'warning' },
    ],
    rootCause: null,
    recommendation: null,
    uptimeHistory: [
      { date: 'Mon', pct: 100 }, { date: 'Tue', pct: 100 }, { date: 'Wed', pct: 100 },
      { date: 'Thu', pct: 99.9 }, { date: 'Fri', pct: 100 }, { date: 'Sat', pct: 100 }, { date: 'Sun', pct: 100 },
    ],
  },
];

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min${mins > 1 ? 's' : ''} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs > 1 ? 's' : ''} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

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
  const [callRailSystem, setCallRailSystem] = useState<IntegrationSystem | null>(null);
  const [intakerSystem, setIntakerSystem] = useState<IntegrationSystem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLiveStats() {
      setLoading(true);

      // Fetch calls and intaker leads in parallel
      const [callsRes, intakerRes] = await Promise.all([
        supabase.from('calls').select('*').order('created_at', { ascending: false }),
        supabase.from('leads').select('*').eq('source', 'intaker').order('created_at', { ascending: false }),
      ]);

      // --- CallRail ---
      const calls = callsRes.data ?? [];
      const callrailCalls = calls.filter((c: any) => c.callrail_id);
      const completedCalls = callrailCalls.filter((c: any) => c.status === 'completed').length;
      const missedCalls = callrailCalls.filter((c: any) => c.status === 'missed').length;
      const lastCall = callrailCalls[0];

      let crStatus: 'healthy' | 'degraded' | 'down' = 'healthy';
      let crRootCause: string | null = null;
      let crRecommendation: string | null = null;

      if (lastCall) {
        const minsSince = Math.floor((Date.now() - new Date(lastCall.created_at).getTime()) / 60000);
        if (minsSince > 120) {
          crStatus = 'down';
          crRootCause = `No CallRail data received in ${Math.floor(minsSince / 60)} hours. The webhook endpoint may be unreachable or CallRail has stopped sending events.`;
          crRecommendation = 'Check CallRail webhook configuration. Verify the endpoint URL is correct and the function is deployed. Send a test webhook from CallRail settings.';
        } else if (minsSince > 30) {
          crStatus = 'degraded';
          crRootCause = `Last CallRail webhook received ${minsSince} minutes ago. Data may be delayed.`;
          crRecommendation = 'Monitor for the next few minutes. If no new data arrives, check CallRail webhook delivery logs.';
        }
      } else {
        crStatus = 'down';
        crRootCause = 'No calls have been received yet. The webhook may not be configured.';
        crRecommendation = 'Configure CallRail webhooks to point to the backend function endpoint.';
      }

      // Build CallRail-specific event log focused on tracking & routing
      const crEventLog: IntegrationSystem['eventLog'] = [];
      
      // Add number swap / attribution events from recent calls
      const sourceCounts: Record<string, number> = {};
      callrailCalls.slice(0, 20).forEach((c: any) => {
        const time = new Date(c.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        const phone = formatPhone(c.caller_number);
        
        // Extract source from lead_activities metadata if available
        const trackingPhone = c.tracking_phone || '';
        const source = c.source_name || '';
        if (source) sourceCounts[source] = (sourceCounts[source] || 0) + 1;

        if (c.status === 'missed') {
          crEventLog.push({ time, event: `Missed call — ${phone} via tracking pool`, type: 'warning' as const });
        } else if (c.duration && c.duration < 10) {
          crEventLog.push({ time, event: `Short call (${c.duration}s) — ${phone}, possible spam/hangup`, type: 'warning' as const });
        } else {
          const dur = c.duration ? `${Math.floor(c.duration / 60)}m ${c.duration % 60}s` : '';
          crEventLog.push({ time, event: `Call routed — ${phone}${dur ? ` (${dur})` : ''} → ${c.direction === 'inbound' ? 'intake queue' : 'outbound'}`, type: 'info' as const });
        }
      });

      // Prepend pool rotation events
      crEventLog.unshift(
        { time: 'Ongoing', event: `Number pool active — 4 of 10 numbers displayed on site`, type: 'info' as const },
        { time: 'Ongoing', event: `Top source today: ${Object.entries(sourceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Google Ads'} (${Object.entries(sourceCounts).sort((a, b) => b[1] - a[1])[0]?.[1] || 0} calls)`, type: 'info' as const },
      );

      // CallRail-specific errors: missed calls, short duration (possible swap issues), no-answer
      const crErrors = callrailCalls.filter((c: any) => c.status === 'missed' || (c.duration && c.duration < 5)).slice(0, 5).map((c: any) => ({
        time: new Date(c.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        code: c.status === 'missed' ? 'MISS' : 'SHORT',
        message: c.status === 'missed'
          ? `Missed call from ${formatPhone(c.caller_number)} — no agent picked up`
          : `Call dropped after ${c.duration}s — ${formatPhone(c.caller_number)}, possible routing issue`,
        endpoint: `Tracking: ${formatPhone(c.caller_number)}`,
      }));

      setCallRailSystem({
        name: 'CallRail',
        description: 'Call tracking & number rotation',
        icon: Phone,
        status: crStatus,
        apiCalls: { success: completedCalls, failed: missedCalls, total: callrailCalls.length },
        logsGenerated: callrailCalls.length,
        lastDataTimestamp: lastCall ? timeAgo(lastCall.created_at) : 'Never',
        lastDataLabel: lastCall
          ? `${lastCall.direction === 'inbound' ? 'Inbound' : 'Outbound'} call — ${formatPhone(lastCall.caller_number)}`
          : 'No calls received',
        uptime: crStatus === 'healthy' ? '99.9%' : crStatus === 'degraded' ? '97.4%' : '0%',
        latency: crStatus === 'down' ? 'N/A' : '~200ms',
        recentErrors: crErrors,
        eventLog: crEventLog.slice(0, 12),
        rootCause: crRootCause,
        recommendation: crRecommendation,
        uptimeHistory: [
          { date: 'Mon', pct: 100 }, { date: 'Tue', pct: 100 }, { date: 'Wed', pct: 100 },
          { date: 'Thu', pct: 100 }, { date: 'Fri', pct: 100 }, { date: 'Sat', pct: 100 },
          { date: 'Sun', pct: crStatus === 'healthy' ? 100 : crStatus === 'degraded' ? 97.4 : 0 },
        ],
      });

      // --- Intaker ---
      const intakerLeads = intakerRes.data ?? [];
      const lastIntake = intakerLeads[0];
      const qualifiedLeads = intakerLeads.filter((l: any) => l.status === 'qualified' || l.status === 'retained').length;
      const newLeads = intakerLeads.filter((l: any) => l.status === 'new').length;
      const duplicateLeads = intakerLeads.filter((l: any) => l.status === 'duplicate').length;

      let itStatus: 'healthy' | 'degraded' | 'down' = 'healthy';
      let itRootCause: string | null = null;
      let itRecommendation: string | null = null;

      if (lastIntake) {
        const minsSince = Math.floor((Date.now() - new Date(lastIntake.created_at).getTime()) / 60000);
        if (minsSince > 1440) { // 24 hours
          itStatus = 'down';
          itRootCause = `No Intaker submissions received in ${Math.floor(minsSince / 60)} hours. The Zapier integration may be disconnected or Intaker forms are offline.`;
          itRecommendation = 'Check the Zapier Zap is turned on and the Intaker trigger is active. Verify intake forms are live on your website.';
        } else if (minsSince > 360) { // 6 hours
          itStatus = 'degraded';
          itRootCause = `Last intake received ${Math.floor(minsSince / 60)} hours ago. Form submissions may be delayed or traffic is low.`;
          itRecommendation = 'Monitor incoming submissions. Check Zapier task history for errors or paused Zaps.';
        }
      } else if (intakerLeads.length === 0) {
        itStatus = 'down';
        itRootCause = 'No Intaker leads have been received yet. The Zapier integration may not be configured.';
        itRecommendation = 'Set up a Zap: Intaker → Webhook (POST) to the Zapier webhook endpoint with source "intaker".';
      }

      const itEventLog: IntegrationSystem['eventLog'] = intakerLeads.slice(0, 8).map((l: any) => {
        const time = new Date(l.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        const name = `${l.first_name} ${l.last_name}`;
        const caseLabel = l.case_type ? ` — ${l.case_type}` : '';
        if (l.status === 'duplicate') {
          return { time, event: `Duplicate intake detected — ${name}${caseLabel}`, type: 'warning' as const };
        }
        return { time, event: `New intake submitted — ${name}${caseLabel}`, type: 'info' as const };
      });

      setIntakerSystem({
        name: 'Intaker',
        description: 'Intake form processing',
        icon: FileText,
        status: itStatus,
        apiCalls: { success: intakerLeads.length - duplicateLeads, failed: duplicateLeads, total: intakerLeads.length },
        logsGenerated: intakerLeads.length,
        lastDataTimestamp: lastIntake ? timeAgo(lastIntake.created_at) : 'Never',
        lastDataLabel: lastIntake
          ? `New intake — ${lastIntake.first_name} ${lastIntake.last_name}${lastIntake.case_type ? `, ${lastIntake.case_type}` : ''}`
          : 'No intakes received',
        uptime: itStatus === 'healthy' ? '99.99%' : itStatus === 'degraded' ? '98.5%' : '0%',
        latency: itStatus === 'down' ? 'N/A' : '~150ms',
        recentErrors: duplicateLeads > 0 ? intakerLeads.filter((l: any) => l.status === 'duplicate').slice(0, 3).map((l: any) => ({
          time: new Date(l.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
          code: 'DUP',
          message: `Duplicate intake — ${l.first_name} ${l.last_name}`,
          endpoint: 'POST /webhooks/zapier',
        })) : [],
        eventLog: itEventLog,
        rootCause: itRootCause,
        recommendation: itRecommendation,
        uptimeHistory: [
          { date: 'Mon', pct: 100 }, { date: 'Tue', pct: 100 }, { date: 'Wed', pct: 100 },
          { date: 'Thu', pct: 100 }, { date: 'Fri', pct: 100 }, { date: 'Sat', pct: 100 },
          { date: 'Sun', pct: itStatus === 'healthy' ? 100 : itStatus === 'degraded' ? 98.5 : 0 },
        ],
      });

      setLoading(false);
    }

    fetchLiveStats();
  }, []);

  const systems = [
    staticSystems[2], // Website
    ...(callRailSystem ? [callRailSystem] : []),
    staticSystems[3], // Regal
    staticSystems[0], // Salesforce
    ...(intakerSystem ? [intakerSystem] : [staticSystems[1]]),
    staticSystems[4], // Zapier
  ];

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
          {loading && <Loader2 size={14} className="animate-spin text-[var(--text-muted)]" />}
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

      {/* Live Data Badges */}
      <div className="flex flex-wrap gap-2">
        {callRailSystem && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-500 font-bold">CallRail — LIVE</span>
            <span className="text-[var(--text-muted)]">·</span>
            <span className="text-[var(--text-secondary)] font-mono">{callRailSystem.apiCalls.total} calls · Last: {callRailSystem.lastDataTimestamp}</span>
          </div>
        )}
        {intakerSystem && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-500 font-bold">Intaker — LIVE</span>
            <span className="text-[var(--text-muted)]">·</span>
            <span className="text-[var(--text-secondary)] font-mono">{intakerSystem.apiCalls.total} intakes · Last: {intakerSystem.lastDataTimestamp}</span>
          </div>
        )}
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
          const isLive = system.name === 'CallRail' || system.name === 'Intaker';

          return (
            <div
              key={system.name}
              onClick={() => setSelectedSystem(system)}
              className={`rounded-xl border ${config.border} bg-[var(--surface)] overflow-hidden transition-all hover:shadow-lg cursor-pointer group ${isLive ? 'ring-1 ring-emerald-500/30' : ''}`}
            >
              {/* Header */}
              <div className="p-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg ${config.bg}`}>
                    <SystemIcon size={18} className={config.color} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors flex items-center gap-2">
                      {system.name}
                      {isLive && <span className="text-[8px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase tracking-widest">Live</span>}
                    </h3>
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
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">{isLive ? 'Total Calls' : 'API Calls (24h)'}</span>
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
                    <p className="text-[9px] font-bold uppercase text-[var(--text-muted)] mb-1">{isLive ? 'Calls Logged' : 'Logs (24h)'}</p>
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
            const isCallRail = selectedSystem.name === 'CallRail';

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

                {selectedSystem.rootCause && (
                  <div className={`p-4 rounded-xl border-2 ${selectedSystem.status === 'down' ? 'border-red-500/30 bg-red-500/5' : 'border-amber-500/30 bg-amber-500/5'}`}>
                    <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${selectedSystem.status === 'down' ? 'text-red-500' : 'text-amber-500'}`}>
                      🔍 Root Cause Analysis
                    </h4>
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed">{selectedSystem.rootCause}</p>
                  </div>
                )}

                {selectedSystem.recommendation && (
                  <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-blue-500">
                      💡 Recommended Action
                    </h4>
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed">{selectedSystem.recommendation}</p>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                    <p className="text-[9px] font-bold uppercase text-[var(--text-muted)]">{isCallRail ? 'Answer Rate' : 'API Success'}</p>
                    <p className="text-xl font-bold text-[var(--text-primary)] font-mono mt-1">{apiSuccessRate}%</p>
                    <p className="text-[10px] text-[var(--text-muted)]">{selectedSystem.apiCalls.total} {isCallRail ? 'calls' : 'total'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                    <p className="text-[9px] font-bold uppercase text-[var(--text-muted)]">{isCallRail ? 'Pool Size' : 'Uptime (7d)'}</p>
                    <p className="text-xl font-bold text-[var(--text-primary)] font-mono mt-1">{isCallRail ? '10' : selectedSystem.uptime}</p>
                    <p className="text-[10px] text-[var(--text-muted)]">{isCallRail ? 'Tracking numbers' : 'Last 7 days'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                    <p className="text-[9px] font-bold uppercase text-[var(--text-muted)]">{isCallRail ? 'Missed' : 'Avg Latency'}</p>
                    <p className={`text-xl font-bold font-mono mt-1 ${isCallRail ? (selectedSystem.apiCalls.failed > 0 ? 'text-amber-500' : 'text-emerald-500') : (selectedSystem.latency === 'N/A' ? 'text-red-500' : 'text-[var(--text-primary)]')}`}>
                      {isCallRail ? selectedSystem.apiCalls.failed : selectedSystem.latency}
                    </p>
                    <p className="text-[10px] text-[var(--text-muted)]">{isCallRail ? 'Today' : 'Current'}</p>
                  </div>
                </div>

                {/* CallRail Tracking Numbers or Health Summary */}
                {selectedSystem.name === 'CallRail' ? (
                  <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Tracking Number Pool</h4>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold">10 Numbers · Rotating</span>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { number: '(855) 596-0919', label: 'Website Pool | Employment', source: 'Google Ads', active: true, calls24h: 14 },
                        { number: '(855) 619-1317', label: 'Website Pool | PI', source: 'Google Ads', active: false, calls24h: 22 },
                        { number: '(213) 817-5855', label: 'Elexpand MVA | English', source: 'Van Wrap', active: false, calls24h: 8 },
                        { number: '(800) 973-0730', label: 'Wilshire Toll Free', source: 'Direct', active: false, calls24h: 31 },
                        { number: '(213) 335-2402', label: 'LA GMB Listing', source: 'Google Ads', active: true, calls24h: 6 },
                        { number: '(213) 630-9537', label: 'Local Services Ad', source: 'Google LSA', active: false, calls24h: 11 },
                        { number: '(213) 329-7808', label: 'Location Extension LA', source: 'Google Ads', active: true, calls24h: 9 },
                        { number: '(888) 222-3334', label: 'Radio - EMP', source: 'Radio', active: false, calls24h: 3 },
                        { number: '(855) 441-8820', label: 'Website Pool | WC', source: 'Google Ads', active: false, calls24h: 5 },
                        { number: '(213) 550-6200', label: 'Billboard - PI', source: 'Billboard', active: true, calls24h: 7 },
                      ].map((tn, i) => (
                        <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${tn.active ? 'bg-emerald-500/5 border border-emerald-500/20' : 'hover:bg-[var(--surface-hover)]'}`}>
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <div className={`h-2 w-2 rounded-full shrink-0 ${tn.active ? 'bg-emerald-500 animate-pulse' : 'bg-[var(--text-muted)] opacity-30'}`} />
                            <span className="text-xs font-mono font-bold text-[var(--text-primary)]">{tn.number}</span>
                          </div>
                          <div className="flex-1 min-w-0 hidden sm:block">
                            <p className="text-[10px] text-[var(--text-secondary)] truncate">{tn.label}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[9px] font-mono text-[var(--text-muted)]">{tn.calls24h} calls</span>
                            {tn.active && (
                              <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">On Site</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-[var(--border)] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity size={12} className="text-[var(--text-muted)]" />
                        <span className="text-[10px] text-[var(--text-secondary)]">4 numbers currently displayed on site</span>
                      </div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">Pool rotates every 60s</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">Health Summary</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[var(--text-secondary)]">Error Rate (24h)</span>
                        <span className={`text-xs font-mono font-bold ${selectedSystem.apiCalls.failed === 0 ? 'text-emerald-500' : selectedSystem.apiCalls.failed <= 5 ? 'text-amber-500' : 'text-red-500'}`}>
                          {selectedSystem.apiCalls.total > 0 ? ((selectedSystem.apiCalls.failed / selectedSystem.apiCalls.total) * 100).toFixed(2) : '0.00'}%
                          <span className="text-[var(--text-muted)] font-normal ml-1">({selectedSystem.apiCalls.failed} failed)</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[var(--text-secondary)]">Throughput</span>
                        <span className="text-xs font-mono font-bold text-[var(--text-primary)]">
                          {selectedSystem.apiCalls.total.toLocaleString()} requests
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[var(--text-secondary)]">Last Incident</span>
                        <span className={`text-xs font-mono ${selectedSystem.recentErrors.length > 0 ? 'text-amber-500' : 'text-emerald-500'}`}>
                          {selectedSystem.recentErrors.length > 0 ? selectedSystem.recentErrors[0].time : 'None today'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[var(--text-secondary)]">Warnings (24h)</span>
                        <span className={`text-xs font-mono font-bold ${selectedSystem.eventLog.filter(e => e.type === 'warning').length > 0 ? 'text-amber-500' : 'text-emerald-500'}`}>
                          {selectedSystem.eventLog.filter(e => e.type === 'warning').length}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recent Errors */}
                {selectedSystem.recentErrors.length > 0 && (
                  <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                      {isCallRail ? `Missed & Dropped Calls (${selectedSystem.recentErrors.length})` : `Recent Errors (${selectedSystem.recentErrors.length})`}
                    </h4>
                    <div className="space-y-2">
                      {selectedSystem.recentErrors.map((err, i) => (
                        <div key={i} className={`p-3 rounded-lg ${isCallRail ? 'bg-amber-500/5 border border-amber-500/10' : 'bg-red-500/5 border border-red-500/10'}`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-[10px] font-mono font-bold ${isCallRail ? 'text-amber-500' : 'text-red-500'}`}>{isCallRail ? err.code : `HTTP ${err.code}`}</span>
                            <span className="text-[10px] font-mono text-[var(--text-muted)]">{err.time}</span>
                          </div>
                          <p className="text-xs text-[var(--text-primary)]">{err.message}</p>
                          <p className="text-[10px] font-mono text-[var(--text-muted)] mt-1">{err.endpoint}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">{isCallRail ? 'Call Activity Log' : 'Event Log'}</h4>
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
