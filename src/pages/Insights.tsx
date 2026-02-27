import { useState } from 'react';
import {
  TrendingUp, TrendingDown, Lightbulb, Target, BarChart3, ArrowRight,
  Zap, AlertTriangle, Users, PhoneCall, Search, Globe, Share2, Link2, UserCheck, Bot,
  CheckCircle, XCircle, ArrowUpRight,
} from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Badge, Card } from '@/components/ui';
import { cn } from '@/lib/utils';
import { AIAgentPerformanceTab } from '@/components/insights/AIAgentPerformanceTab';
import { Link } from 'react-router-dom';

/* ── Data ────────────────────────────────────────────────────────────── */

const topKPIs = [
  { label: 'Total Leads', value: '1,247', change: '+12%', positive: true, icon: Users },
  { label: 'Qualified', value: '438', change: '+8%', positive: true, icon: UserCheck },
  { label: 'Contact Rate', value: '68.4%', change: '+3.2%', positive: true, icon: PhoneCall },
  { label: 'Search Volume', value: '24.8K', change: '+5%', positive: true, icon: Search },
];

const sourceData = [
  { source: 'Organic Search', leads: 312, change: 18, quality: 8.8, icon: Globe },
  { source: 'Direct', leads: 203, change: -2, quality: 7.8, icon: Zap },
  { source: 'Referrals', leads: 156, change: 4, quality: 9.5, icon: Link2 },
  { source: 'Website', leads: 142, change: 8, quality: 8.5, icon: Globe },
  { source: 'Intaker', leads: 115, change: 17, quality: 9.2, icon: Zap },
  { source: 'Social Media', leads: 89, change: 22, quality: 7.2, icon: Share2 },
  { source: 'CallRail', leads: 78, change: 4, quality: 8.0, icon: PhoneCall },
  { source: 'Forms', leads: 85, change: -8, quality: 7.4, icon: BarChart3 },
];

const alerts = [
  { severity: 'warning' as const, title: 'Website form conversions dipping', detail: 'Form completion rate dropped 5% — check page load times and form UX.', metric: '-5%' },
  { severity: 'critical' as const, title: 'Intaker underutilized', detail: 'Intaker outperforming Website on lead quality — consider reallocating traffic to yield ~15 extra leads/week.', metric: '+15 Leads' },
  { severity: 'warning' as const, title: 'Form submissions dropped 8%', detail: 'May be related to recent landing page changes. Check form completion rates.', metric: '-8%' },
  { severity: 'success' as const, title: 'Social media leads surging', detail: 'Up 22% week-over-week. Consider increasing allocation to capitalize on momentum.', metric: '+22%' },
  { severity: 'success' as const, title: 'CallRail conversion spike', detail: 'Phone leads are converting at 28% this week, well above the 19% average.', metric: '+9% Conv.' },
];

type FunnelStep = { stage: string; count: number; dropoff: string | number };

const funnelData: Record<string, FunnelStep[]> = {
  website: [
    { stage: 'Visitors', count: 18520, dropoff: 0 },
    { stage: 'Form Views', count: 4200, dropoff: '77%' },
    { stage: 'Submissions', count: 142, dropoff: '97%' },
    { stage: 'Qualified', count: 48, dropoff: '66%' },
    { stage: 'Retained', count: 12, dropoff: '75%' },
  ],
  intaker: [
    { stage: 'Views', count: 850, dropoff: 0 },
    { stage: 'Engaged', count: 620, dropoff: '27%' },
    { stage: 'Leads', count: 115, dropoff: '81%' },
    { stage: 'Qualified', count: 85, dropoff: '26%' },
    { stage: 'Retained', count: 42, dropoff: '50%' },
  ],
  organic: [
    { stage: 'Sessions', count: 22450, dropoff: 0 },
    { stage: 'Engaged', count: 8940, dropoff: '60%' },
    { stage: 'Form Starts', count: 1820, dropoff: '80%' },
    { stage: 'Leads', count: 312, dropoff: '83%' },
    { stage: 'Qualified', count: 142, dropoff: '54%' },
  ],
  social: [
    { stage: 'Impressions', count: 486000, dropoff: 0 },
    { stage: 'Engagement', count: 24300, dropoff: '95%' },
    { stage: 'Clicks', count: 4860, dropoff: '80%' },
    { stage: 'Leads', count: 89, dropoff: '98%' },
    { stage: 'Qualified', count: 28, dropoff: '69%' },
  ],
  referrals: [
    { stage: 'Referred', count: 312, dropoff: 0 },
    { stage: 'Contacted', count: 268, dropoff: '14%' },
    { stage: 'Consulted', count: 210, dropoff: '22%' },
    { stage: 'Qualified', count: 156, dropoff: '26%' },
    { stage: 'Retained', count: 65, dropoff: '58%' },
  ],
  callrail: [
    { stage: 'Calls Received', count: 1840, dropoff: 0 },
    { stage: 'Connected', count: 1514, dropoff: '18%' },
    { stage: 'Leads', count: 78, dropoff: '95%' },
    { stage: 'Qualified', count: 38, dropoff: '51%' },
    { stage: 'Retained', count: 15, dropoff: '61%' },
  ],
};

const severityConfig = {
  critical: { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500', icon: XCircle },
  warning: { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500', icon: AlertTriangle },
  success: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500', icon: CheckCircle },
};

/* ── Component ───────────────────────────────────────────────────────── */

export function Insights() {
  const [activeTab, setActiveTab] = useState<'overview' | 'funnels' | 'ai-agents'>('overview');
  const [selectedFunnel, setSelectedFunnel] = useState<string>('website');

  const tabClass = (active: boolean) =>
    cn(
      'inline-flex items-center gap-2 px-4 py-2 text-sm font-bold transition-colors border-b-2',
      active ? 'border-[var(--primary)] text-[var(--text-primary)]' : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
    );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">

      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 text-[var(--text-secondary)] mb-1">
            <Lightbulb size={18} className="text-[var(--accent-purple)]" />
            <span className="text-sm font-medium">Insights</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Performance Overview</h1>
        </div>

        <div className="flex gap-0 border-b border-[var(--border)]">
          <button onClick={() => setActiveTab('overview')} className={tabClass(activeTab === 'overview')}>
            <BarChart3 size={16} /> Overview
          </button>
          <button onClick={() => setActiveTab('funnels')} className={tabClass(activeTab === 'funnels')}>
            <Target size={16} /> Funnels
          </button>
          <button onClick={() => setActiveTab('ai-agents')} className={tabClass(activeTab === 'ai-agents')}>
            <Bot size={16} /> AI Agents
          </button>
        </div>
      </div>

      {activeTab === 'ai-agents' ? (
        <AIAgentPerformanceTab />
      ) : activeTab === 'funnels' ? (
        /* ── Funnels Tab ───────────────────────────────────────────── */
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider">Select Pipeline</h2>
            {[
              { id: 'website', label: 'Website', sub: 'Forms & Chat', Icon: Globe },
              { id: 'intaker', label: 'Intaker Chat', sub: 'Automated', Icon: Zap },
              { id: 'organic', label: 'Organic Search', sub: 'SEO', Icon: Globe },
              { id: 'social', label: 'Social Media', sub: 'Paid + Organic', Icon: Share2 },
              { id: 'referrals', label: 'Referrals', sub: 'Attorney & client', Icon: Link2 },
              { id: 'callrail', label: 'CallRail', sub: 'Phone inbound', Icon: PhoneCall },
            ].map(({ id, label, sub, Icon }) => (
              <button key={id} type="button" onClick={() => setSelectedFunnel(id)}
                className={cn('w-full bg-[var(--surface)] p-4 text-left transition-colors hover:bg-[var(--surface-hover)] border-l-4',
                  selectedFunnel === id ? 'border-[var(--primary)] bg-[var(--surface-hover)]' : 'border-transparent')}>
                <div className="flex items-center gap-3">
                  <Icon size={16} className={selectedFunnel === id ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'} />
                  <div>
                    <div className="font-bold text-sm text-[var(--text-primary)]">{label}</div>
                    <div className="text-[10px] text-[var(--text-muted)] uppercase">{sub}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2 bg-[var(--surface)] border-t-4 border-[var(--accent-purple)]">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
              <h2 className="font-bold text-[var(--text-primary)]">Funnel Visualization</h2>
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Last 30 days</span>
            </div>
            <div className="p-6">
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={funnelData[selectedFunnel]} layout="vertical" margin={{ left: 24, right: 24, top: 8, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                    <XAxis type="number" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="stage" type="category" width={110} stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      cursor={{ fill: 'var(--surface-hover)' }}
                      contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--text-primary)' }}
                    />
                    <Bar dataKey="count" fill="url(#funnelGrad)" radius={[0, 6, 6, 0]} barSize={28} />
                    <defs>
                      <linearGradient id="funnelGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.75} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 grid grid-cols-5 gap-2">
                {funnelData[selectedFunnel].map((step, idx) => (
                  <div key={idx} className="bg-[var(--surface-active)]/30 p-3 text-center border-t-2 border-[var(--border)]">
                    <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-1">{step.stage}</div>
                    <div className="text-lg font-bold text-[var(--text-primary)]">{step.count.toLocaleString()}</div>
                    {step.dropoff !== 0 && (
                      <div className="mt-1 text-[10px] font-bold text-red-500">{step.dropoff} drop</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ── Overview Tab (Default) ──────────────────────────────── */
        <>
          {/* 1. Top KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topKPIs.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div key={kpi.label} className={cn(
                  "bg-[var(--surface)] p-5 border-l-4 hover:bg-[var(--surface-hover)] transition-colors",
                  kpi.positive ? "border-emerald-500" : "border-red-500"
                )}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">{kpi.label}</span>
                    <Icon size={14} className={kpi.positive ? "text-emerald-500" : "text-red-500"} />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[var(--text-primary)]">{kpi.value}</span>
                    <span className={cn("text-xs font-mono font-bold", kpi.positive ? "text-emerald-500" : "text-red-500")}>{kpi.change}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 1.5 Lead Pacing Strip */}
          <div className="bg-[var(--surface)] border-l-4 border-blue-500 px-6 py-4 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 shrink-0">
              <Search size={14} className="text-blue-500" />
              <span className="text-sm font-bold text-[var(--text-primary)]">Lead Pacing</span>
            </div>
            {[
              { label: 'Vol. Today', val: '842', color: 'text-blue-500' },
              { label: 'Pacing', val: '104%', color: 'text-emerald-500' },
              { label: 'Projected', val: '1,250', color: 'text-[var(--text-primary)]' },
              { label: 'Daily Target', val: '810', color: 'text-[var(--text-muted)]' },
            ].map(m => (
              <div key={m.label} className="flex items-center gap-2">
                <span className="text-[10px] uppercase text-[var(--text-muted)] font-bold">{m.label}</span>
                <span className={`text-sm font-bold font-mono ${m.color}`}>{m.val}</span>
              </div>
            ))}
            <div className="flex-1 min-w-[120px]">
              <div className="w-full h-1.5 rounded-full bg-[var(--surface-active)] overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500" style={{ width: '100%' }} />
              </div>
            </div>
          </div>

          {/* 2. Alerts & Problems — the most important section */}
          <div className="bg-[var(--surface)] border-t-4 border-amber-500">
            <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between bg-[var(--surface-active)]/20">
              <h2 className="font-bold text-[var(--text-primary)] flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-500" />
                Alerts & Recommendations
              </h2>
              <span className="text-[10px] font-mono text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full ring-1 ring-amber-500/30">
                {alerts.filter(a => a.severity === 'critical').length} Critical
              </span>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {alerts.map((alert, i) => {
                const cfg = severityConfig[alert.severity];
                const AlertIcon = cfg.icon;
                return (
                  <div key={i} className="px-6 py-4 flex items-start gap-4 hover:bg-[var(--surface-hover)] transition-colors cursor-pointer group">
                    <div className={cn("mt-0.5 p-1.5 rounded", cfg.bg)}>
                      <AlertIcon size={14} className={cfg.text} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[var(--text-primary)] leading-snug">{alert.title}</p>
                      <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-1">{alert.detail}</p>
                    </div>
                    <span className={cn("text-xs font-mono font-bold px-2 py-1 rounded shrink-0", cfg.bg, cfg.text)}>
                      {alert.metric}
                    </span>
                    <ArrowUpRight size={14} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Source Performance — simplified table */}
          <div className="bg-[var(--surface)] border-t-4 border-blue-500">
            <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
              <h2 className="font-bold text-[var(--text-primary)] flex items-center gap-2">
                <BarChart3 size={16} className="text-blue-500" />
                Source Performance
              </h2>
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">This Week vs Last</span>
            </div>

            {/* Header */}
            <div className="grid grid-cols-10 gap-4 px-6 py-3 border-b border-[var(--border)] text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              <div className="col-span-3">Source</div>
              <div className="col-span-2 text-right">Leads</div>
              <div className="col-span-2 text-right">Change</div>
              <div className="col-span-3 text-right">Quality</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-[var(--border)]">
              {sourceData.map((row) => {
                const Icon = row.icon;
                return (
                  <div key={row.source} className="grid grid-cols-10 gap-4 px-6 py-3.5 items-center hover:bg-[var(--surface-hover)] transition-colors">
                    <div className="col-span-3 flex items-center gap-2">
                      <Icon size={14} className="text-[var(--text-muted)]" />
                      <span className="font-medium text-sm text-[var(--text-primary)]">{row.source}</span>
                    </div>
                    <div className="col-span-2 text-right font-bold text-[var(--text-primary)]">{row.leads}</div>
                    <div className="col-span-2 flex justify-end">
                      <span className={cn(
                        "text-xs font-mono font-bold flex items-center gap-1",
                        row.change >= 0 ? "text-emerald-500" : "text-red-500"
                      )}>
                        {row.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {row.change >= 0 ? '+' : ''}{row.change}%
                      </span>
                    </div>
                    <div className="col-span-3 flex items-center justify-end gap-2">
                      <div className="w-20 h-1.5 rounded-full bg-[var(--surface-active)] overflow-hidden">
                        <div
                          className={cn("h-full rounded-full", row.quality >= 9 ? "bg-emerald-500" : row.quality >= 8 ? "bg-blue-500" : "bg-amber-500")}
                          style={{ width: `${row.quality * 10}%` }}
                        />
                      </div>
                      <span className="w-6 text-right text-xs font-bold text-[var(--text-primary)]">{row.quality}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
