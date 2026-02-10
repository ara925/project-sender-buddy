import { useState } from 'react';
import {
  TrendingUp, TrendingDown, Lightbulb, Target, BarChart3, ArrowRight,
  Zap, AlertTriangle, Users, PhoneCall, Search, Globe, Share2, Link2, UserCheck, Bot,
} from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Badge, Button, Card } from '@/components/ui';
import { cn } from '@/lib/utils';
import { MetricDetailDrawer } from '@/components/insights/MetricDetailDrawer';
import { InsightFilterPanel, emptyFilters, type InsightFilters } from '@/components/insights/InsightFilterPanel';
import { ColumnTogglePanel, defaultColumns, type ColumnVisibility } from '@/components/insights/ColumnTogglePanel';
import { ComparePanel, ComparisonResultsBar, getDefaultCompareConfig, type CompareConfig } from '@/components/insights/ComparePanel';
import { AIAgentPerformanceTab } from '@/components/insights/AIAgentPerformanceTab';
import { InsightActionDrawer } from '@/components/insights/InsightActionDrawer';

const keyMetrics = [
  { label: 'Total Leads', value: '1,247', change: '+12%', positive: true, icon: Users, description: 'All sources combined' },
  { label: 'Qualified Leads', value: '438', change: '+8%', positive: true, icon: UserCheck, description: '35.1% qualification rate' },
  { label: 'Intake Team', value: '12/12', change: 'All Present', positive: true, icon: Users, description: 'Full staff today' },
  { label: 'Contact Rate', value: '68.4%', change: '+3.2%', positive: true, icon: PhoneCall, description: 'Avg across all channels' },
  { label: 'Search Volume', value: '24.8K', change: '+5%', positive: true, icon: Search, description: 'Branded + non-branded' },
  { label: 'Organic Search', value: '312', change: '+18%', positive: true, icon: Globe, description: '25.0% of total leads' },
  { label: 'Google Ads', value: '142', change: '-10%', positive: false, icon: Target, description: '11.4% of total leads' },
  { label: 'Social Media', value: '89', change: '+22%', positive: true, icon: Share2, description: '7.1% of total leads' },
  { label: 'Referrals', value: '156', change: '+4%', positive: true, icon: Link2, description: '12.5% of total leads' },
  { label: 'Direct', value: '203', change: '-2%', positive: false, icon: Zap, description: '16.3% of total leads' },
];

const weeklyBreakdown = [
  { source: 'Google Ads', current: 142, lastWeek: 158, threeWeeks: 120, cost: 4200, cpl: 29.57, roas: 3.2, quality: 8.5 },
  { source: 'Intaker', current: 115, lastWeek: 98, threeWeeks: 95, cost: 1200, cpl: 10.43, roas: 5.8, quality: 9.2 },
  { source: 'Organic', current: 312, lastWeek: 264, threeWeeks: 248, cost: 0, cpl: 0, roas: 0, quality: 8.8 },
  { source: 'Referrals', current: 156, lastWeek: 150, threeWeeks: 142, cost: 0, cpl: 0, roas: 0, quality: 9.5 },
  { source: 'Direct', current: 203, lastWeek: 207, threeWeeks: 195, cost: 0, cpl: 0, roas: 0, quality: 7.8 },
  { source: 'Social Media', current: 89, lastWeek: 73, threeWeeks: 62, cost: 1840, cpl: 20.67, roas: 2.4, quality: 7.2 },
  { source: 'CallRail', current: 78, lastWeek: 75, threeWeeks: 82, cost: 850, cpl: 10.89, roas: 4.1, quality: 8.0 },
  { source: 'Forms', current: 85, lastWeek: 92, threeWeeks: 88, cost: 0, cpl: 0, roas: 0, quality: 7.4 },
  { source: 'Manual', current: 32, lastWeek: 28, threeWeeks: 35, cost: 0, cpl: 0, roas: 0, quality: 10.0 },
];

type FunnelStep = { stage: string; count: number; dropoff: string | number };

const funnelData: Record<string, FunnelStep[]> = {
  google: [
    { stage: 'Impressions', count: 15400, dropoff: 0 },
    { stage: 'Clicks', count: 3200, dropoff: '79%' },
    { stage: 'Leads', count: 142, dropoff: '95%' },
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

const suggestions = [
  {
    id: 1, type: 'critical', title: 'Reallocate Budget to Intaker',
    description: 'Intaker CPL is $10.43 vs Google Ads $29.57. Moving 20% of budget could yield ~15 extra leads/week.',
    metric: '+15 Leads', action: 'View Intaker Settings', actionKey: 'intaker' as const,
  },
  {
    id: 2, type: 'warning', title: 'Google Ads Quality Score Drop',
    description: 'Quality score dropped from 9.1 to 8.5. Check landing page loading speed and keyword relevance.',
    metric: '-0.6 Score', action: 'Review Campaign', actionKey: 'campaign' as const,
  },
  {
    id: 3, type: 'success', title: 'CallRail Conversion Spike',
    description: 'Phone leads are converting at 28% this week, significantly above the 19% average.',
    metric: '+9% Conv.', action: 'Analyze Calls', actionKey: 'calls' as const,
  },
];

const getPercentageChange = (current: number, previous: number) => {
  const diff = current - previous;
  const percentage = Math.round((diff / previous) * 100);
  return { value: Math.abs(percentage), isPositive: diff >= 0, text: `${Math.abs(percentage)}%` };
};

const suggestionTone = (type: string) => {
  switch (type) {
    case 'critical': return {
      Icon: TrendingDown, iconWrap: 'bg-red-500/10 text-red-600', topBorder: 'bg-red-500/70',
      metric: 'bg-red-500/10 text-red-600 border-red-500/20',
    };
    case 'warning': return {
      Icon: AlertTriangle, iconWrap: 'bg-amber-500/10 text-amber-700', topBorder: 'bg-amber-500/70',
      metric: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
    };
    default: return {
      Icon: TrendingUp, iconWrap: 'bg-emerald-500/10 text-emerald-700', topBorder: 'bg-emerald-500/70',
      metric: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
    };
  }
};

export function Insights() {
  const [activeTab, setActiveTab] = useState<'weekly' | 'funnels' | 'ai-agents'>('weekly');
  const [selectedFunnel, setSelectedFunnel] = useState<string>('google');
  const [selectedMetric, setSelectedMetric] = useState<typeof keyMetrics[number] | null>(null);
  const [filters, setFilters] = useState<InsightFilters>(emptyFilters);
  const [columns, setColumns] = useState<ColumnVisibility>(defaultColumns);
  const [compareConfig, setCompareConfig] = useState<CompareConfig>(getDefaultCompareConfig());

  const tabClass = (active: boolean) =>
    cn(
      'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
      active ? 'bg-[var(--surface-hover)] text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]'
    );

  // Filter the weekly breakdown data
  const filteredBreakdown = weeklyBreakdown.filter(row => {
    if (filters.sources.length > 0 && !filters.sources.includes(row.source)) return false;
    if (filters.minQuality && row.quality < filters.minQuality) return false;
    if (filters.campaigns.length > 0 && row.source !== 'Google Ads') return false; // campaigns only apply to ads
    return true;
  });

  // Compute filtered metrics - scale based on what fraction of sources are selected
  const hasActiveFilters = filters.sources.length > 0 || filters.caseTypes.length > 0 || filters.statuses.length > 0 || filters.agents.length > 0 || filters.campaigns.length > 0 || !!filters.minQuality;
  const sourceRatio = filters.sources.length > 0 ? filters.sources.length / 9 : 1;
  const caseRatio = filters.caseTypes.length > 0 ? filters.caseTypes.length / 8 : 1;
  const agentRatio = filters.agents.length > 0 ? filters.agents.length / 12 : 1;
  const filterMultiplier = sourceRatio * caseRatio * agentRatio;

  const filteredMetrics = hasActiveFilters
    ? keyMetrics.map(m => {
        // Scale numeric values
        const rawVal = m.value.replace(/[,$%K]/g, '');
        const num = parseFloat(rawVal);
        if (isNaN(num) || m.label === 'Intake Team' || m.label === 'Contact Rate') return m;
        const scaled = m.value.includes('K')
          ? `${(num * filterMultiplier).toFixed(1)}K`
          : m.value.includes('%')
            ? m.value
            : Math.round(num * filterMultiplier).toLocaleString();
        return { ...m, value: scaled };
      })
    : keyMetrics;

  // Active filter chips for display
  const activeFilterChips = [
    ...filters.sources.map(s => ({ group: 'Source', value: s })),
    ...filters.caseTypes.map(s => ({ group: 'Case', value: s })),
    ...filters.statuses.map(s => ({ group: 'Status', value: s })),
    ...filters.agents.map(s => ({ group: 'Agent', value: s })),
    ...filters.campaigns.map(s => ({ group: 'Campaign', value: s })),
    ...(filters.minQuality ? [{ group: 'Quality', value: `≥ ${filters.minQuality}` }] : []),
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <Lightbulb size={18} className="text-[var(--accent-purple)]" />
            <span className="text-sm font-medium">Insights</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Advanced Insights</h1>
          <p className="text-[var(--text-secondary)]">AI-driven analysis and deep-dive metrics to optimize your intake performance.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <div className="inline-flex w-full justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1 sm:w-auto">
            <button onClick={() => setActiveTab('weekly')} className={tabClass(activeTab === 'weekly')}>
              <BarChart3 size={16} /> Weekly
            </button>
            <button onClick={() => setActiveTab('funnels')} className={tabClass(activeTab === 'funnels')}>
              <Target size={16} /> Funnels
            </button>
            <button onClick={() => setActiveTab('ai-agents')} className={tabClass(activeTab === 'ai-agents')}>
              <Bot size={16} /> AI Agents
            </button>
          </div>
          <div className="flex gap-2">
            <InsightFilterPanel filters={filters} onChange={setFilters} />
            <ColumnTogglePanel columns={columns} onChange={setColumns} />
            <ComparePanel config={compareConfig} onChange={setCompareConfig} />
          </div>
        </div>
      </div>

      {/* Active filter chips */}
      {activeFilterChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-[var(--text-muted)]">Filtered by:</span>
          {activeFilterChips.map((chip, i) => (
            <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
              <span className="text-[10px] opacity-60">{chip.group}:</span> {chip.value}
            </span>
          ))}
          <button
            onClick={() => setFilters(emptyFilters)}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Comparison Results */}
      {compareConfig.preset !== 'none' && compareConfig.compareRange && (
        <ComparisonResultsBar
          preset={compareConfig.preset}
          currentLabel={`${new Date(compareConfig.currentRange.from).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${new Date(compareConfig.currentRange.to).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
          compareLabel={`${new Date(compareConfig.compareRange.from).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${new Date(compareConfig.compareRange.to).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
        />
      )}

      {/* Key Metrics Grid */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {filteredMetrics.map((metric) => {
          const MetricIcon = metric.icon;
          return (
            <Card key={metric.label} className="p-4 hover:bg-[var(--surface-hover)] transition-colors cursor-pointer hover:shadow-md" onClick={() => setSelectedMetric(metric)}>
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-lg bg-[var(--surface-hover)]">
                  <MetricIcon size={14} className="text-[var(--primary)]" />
                </div>
                <span className={cn(
                  'text-xs font-semibold px-2 py-0.5 rounded-full',
                  metric.positive ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'
                )}>
                  {metric.change}
                </span>
              </div>
              <div className="text-xl font-bold text-[var(--text-primary)]">{metric.value}</div>
              <div className="text-xs font-medium text-[var(--text-secondary)] mt-0.5">{metric.label}</div>
              <div className="text-[10px] text-[var(--text-muted)] mt-1">{metric.description}</div>
            </Card>
          );
        })}
      </div>

      {/* Key Suggestions */}
      <div className="grid gap-4 md:grid-cols-3">
        {suggestions.map((suggestion) => {
          const tone = suggestionTone(suggestion.type);
          return (
            <Card key={suggestion.id} className="relative overflow-hidden p-5">
              <div className={cn('absolute inset-x-0 top-0 h-0.5', tone.topBorder)} aria-hidden="true" />
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', tone.iconWrap)}>
                    <tone.Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">{suggestion.title}</h3>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">{suggestion.description}</p>
                  </div>
                </div>
                <span className={cn('shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold', tone.metric)}>
                  {suggestion.metric}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs font-medium text-[var(--text-muted)]">
                <span>{suggestion.action}</span>
                <ArrowRight size={14} className="text-[var(--text-muted)]" />
              </div>
            </Card>
          );
        })}
      </div>

      {activeTab === 'ai-agents' ? (
        <AIAgentPerformanceTab />
      ) : activeTab === 'weekly' ? (
        <Card className="overflow-hidden">
          <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] px-5 py-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-hover)] text-[var(--accent-purple)]">
                <BarChart3 size={18} />
              </div>
              <div className="space-y-1">
                <h2 className="text-base font-semibold text-[var(--text-primary)]">Weekly Performance Matrix</h2>
                <p className="text-xs text-[var(--text-muted)]">Compare volume, spend, and quality by source.</p>
              </div>
            </div>
            <Badge variant="outline" className="hidden sm:inline-flex">Last 7 days</Badge>
          </div>

          <div className="overflow-x-auto">
             <table className="w-full">
              <thead>
                <tr>
                  <th className="bg-[var(--surface-hover)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Source</th>
                  {columns.volume && <th className="bg-[var(--surface-hover)] px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Volume</th>}
                  {columns.comparison && <th className="bg-[var(--surface-hover)] px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Prior</th>}
                  {columns.trend && <th className="bg-[var(--surface-hover)] px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Trend</th>}
                  {columns.velocity && <th className="bg-[var(--surface-hover)] px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Velocity</th>}
                  {columns.spend && <th className="bg-[var(--surface-hover)] px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Spend</th>}
                  {columns.cpl && <th className="bg-[var(--surface-hover)] px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">CPL</th>}
                  {columns.roas && <th className="bg-[var(--surface-hover)] px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">ROAS</th>}
                  {columns.quality && <th className="bg-[var(--surface-hover)] px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Quality</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filteredBreakdown.map((row) => {
                  const vsLast = getPercentageChange(row.current, row.lastWeek);
                  const vsThree = getPercentageChange(row.current, row.threeWeeks);
                  return (
                    <tr key={row.source} className="hover:bg-[var(--surface-hover)] transition-colors">
                      <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{row.source}</td>
                      {columns.volume && <td className="px-4 py-3 text-right font-semibold text-[var(--text-primary)]">{row.current}</td>}
                      {columns.comparison && (
                        <td className="px-4 py-3 text-right text-sm text-[var(--text-muted)]">{row.lastWeek}</td>
                      )}
                      {columns.trend && (
                        <td className="px-4 py-3 text-right">
                          <Badge variant="outline" className={cn('border-0', vsLast.isPositive ? 'bg-emerald-500/10 text-emerald-700' : 'bg-red-500/10 text-red-700')}>
                            {vsLast.isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            {vsLast.text}
                          </Badge>
                        </td>
                      )}
                      {columns.velocity && (
                        <td className="px-4 py-3 text-right">
                          <div className="inline-flex items-end justify-end gap-1 opacity-80" aria-label="Velocity indicator">
                            <span className="w-1.5 rounded-full bg-[var(--border)]" style={{ height: '35%' }} />
                            <span className="w-1.5 rounded-full bg-[var(--border)]" style={{ height: '60%' }} />
                            <span className={cn('w-1.5 rounded-full', vsThree.isPositive ? 'bg-emerald-500' : 'bg-red-500')} style={{ height: '85%' }} />
                          </div>
                        </td>
                      )}
                      {columns.spend && (
                        <td className="px-4 py-3 text-right font-mono text-sm text-[var(--text-secondary)]">
                          {row.cost > 0 ? `$${row.cost.toLocaleString()}` : '-'}
                        </td>
                      )}
                      {columns.cpl && (
                        <td className="px-4 py-3 text-right font-mono text-sm text-[var(--text-primary)]">
                          {row.cpl > 0 ? <span className={row.cpl < 20 ? 'text-emerald-700 font-semibold' : ''}>${row.cpl}</span> : '-'}
                        </td>
                      )}
                      {columns.roas && (
                        <td className="px-4 py-3 text-right font-mono text-sm text-[var(--text-primary)]">
                          {row.roas > 0 ? <span className={row.roas > 4 ? 'text-emerald-700 font-semibold' : ''}>{row.roas}x</span> : '-'}
                        </td>
                      )}
                      {columns.quality && (
                        <td className="px-4 py-3 text-right">
                          {row.quality > 0 && (
                            <div className="flex items-center justify-end gap-3">
                              <div className="h-2 w-24 overflow-hidden rounded-full bg-[var(--surface-active)]">
                                <div
                                  className={cn('h-full rounded-full', row.quality >= 9 ? 'bg-emerald-500' : row.quality >= 8 ? 'bg-[var(--primary)]' : 'bg-amber-500')}
                                  style={{ width: `${row.quality * 10}%` }}
                                />
                              </div>
                              <span className="w-6 text-right text-xs font-semibold text-[var(--text-primary)]">{row.quality}</span>
                            </div>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })}
                {filteredBreakdown.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-4 py-12 text-center">
                      <div className="text-[var(--text-muted)]">
                        <Search size={24} className="mx-auto mb-2 opacity-40" />
                        <p className="text-sm font-medium">No data matches your filters</p>
                        <p className="text-xs mt-1">Try adjusting your filter criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">Select Pipeline</h2>
            {[
              { id: 'google', label: 'Google Ads', sub: 'High intent • PPC', Icon: Target },
              { id: 'intaker', label: 'Intaker Chat', sub: 'Automated • High volume', Icon: Zap },
              { id: 'organic', label: 'Organic Search', sub: 'SEO • Content', Icon: Globe },
              { id: 'social', label: 'Social Media', sub: 'Paid + Organic social', Icon: Share2 },
              { id: 'referrals', label: 'Referrals', sub: 'Attorney & client referrals', Icon: Link2 },
              { id: 'callrail', label: 'CallRail', sub: 'Phone • Inbound calls', Icon: PhoneCall },
            ].map(({ id, label, sub, Icon }) => (
              <button key={id} type="button" onClick={() => setSelectedFunnel(id)}
                className={cn('w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-left transition-colors hover:bg-[var(--surface-hover)]',
                  selectedFunnel === id && 'border-[var(--primary)] bg-[var(--primary)]/5')}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', selectedFunnel === id ? 'bg-[var(--primary)] text-white' : 'bg-[var(--surface-hover)] text-[var(--text-secondary)]')}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--text-primary)]">{label}</div>
                      <div className="text-xs text-[var(--text-secondary)]">{sub}</div>
                    </div>
                  </div>
                  {selectedFunnel === id && <div className="h-2 w-2 rounded-full bg-[var(--primary)]" />}
                </div>
              </button>
            ))}
          </div>

          <Card className="overflow-hidden lg:col-span-2">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
              <div>
                <h2 className="text-base font-semibold text-[var(--text-primary)]">Funnel Visualization</h2>
                <p className="text-xs text-[var(--text-muted)]">Last 30 days</p>
              </div>
            </div>
            <div className="p-5">
              <div className="h-[340px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={funnelData[selectedFunnel]} layout="vertical" margin={{ left: 24, right: 24, top: 8, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                    <XAxis type="number" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="stage" type="category" width={110} stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      cursor={{ fill: 'var(--surface-hover)' }}
                      contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: '12px', color: 'var(--text-primary)', boxShadow: '0 12px 24px rgba(0,0,0,0.18)' }}
                    />
                    <Bar dataKey="count" fill="url(#funnelGradientInsights)" radius={[0, 8, 8, 0]} barSize={34} />
                    <defs>
                      <linearGradient id="funnelGradientInsights" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="var(--accent-purple)" stopOpacity={0.75} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-5">
                {funnelData[selectedFunnel].map((step, idx) => (
                  <div key={idx} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-center hover:bg-[var(--surface-hover)] transition-colors">
                    <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-1">{step.stage}</div>
                    <div className="text-lg font-bold text-[var(--text-primary)]">{step.count.toLocaleString()}</div>
                    {step.dropoff !== 0 && (
                      <div className="mt-1 text-[10px] font-semibold text-red-600 bg-red-500/10 py-0.5 px-2 rounded-full inline-block">
                        {step.dropoff} drop
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      <MetricDetailDrawer
        open={!!selectedMetric}
        onOpenChange={(open) => !open && setSelectedMetric(null)}
        metric={selectedMetric}
      />
    </div>
  );
}
