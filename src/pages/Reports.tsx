import { Download, Trophy, Users, TrendingUp, Award } from 'lucide-react';
import conversionFunnelIcon from '@/assets/conversion-funnel-icon.png';
import { Card, CardHeader, CardTitle, CardContent, Button, Select, Badge } from '@/components/ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const conversionFunnel = [
  { stage: 'New', count: 1284 },
  { stage: 'Contacted', count: 892 },
  { stage: 'Qualified', count: 456 },
  { stage: 'Retained', count: 312 },
];

const sourcePerformance = [
  { source: 'Intaker', leads: 450, converted: 128, rate: 28.4 },
  { source: 'Forms', leads: 380, converted: 98, rate: 25.8 },
  { source: 'CallRail', leads: 320, converted: 62, rate: 19.4 },
  { source: 'Manual', leads: 134, converted: 24, rate: 17.9 },
];

const monthlyTrend = [
  { month: 'Jul', leads: 210, retained: 42 },
  { month: 'Aug', leads: 245, retained: 51 },
  { month: 'Sep', leads: 280, retained: 58 },
  { month: 'Oct', leads: 310, retained: 68 },
  { month: 'Nov', leads: 295, retained: 72 },
  { month: 'Dec', leads: 340, retained: 85 },
];

const agentPerformance = [
  { id: 1, name: 'Sarah Miller', avatar: 'SM', leadsHandled: 156, converted: 48, conversionRate: 30.8, avgResponseTime: '12m', satisfaction: 4.9, rank: 1 },
  { id: 2, name: 'James Wilson', avatar: 'JW', leadsHandled: 142, converted: 41, conversionRate: 28.9, avgResponseTime: '15m', satisfaction: 4.7, rank: 2 },
  { id: 3, name: 'Emily Chen', avatar: 'EC', leadsHandled: 138, converted: 38, conversionRate: 27.5, avgResponseTime: '18m', satisfaction: 4.8, rank: 3 },
  { id: 4, name: 'Michael Brown', avatar: 'MB', leadsHandled: 125, converted: 32, conversionRate: 25.6, avgResponseTime: '22m', satisfaction: 4.5, rank: 4 },
  { id: 5, name: 'Lisa Anderson', avatar: 'LA', leadsHandled: 118, converted: 28, conversionRate: 23.7, avgResponseTime: '25m', satisfaction: 4.4, rank: 5 },
];

const pipelinePerformance = [
  { name: 'Personal Injury', leads: 420, converted: 125, rate: 29.8, avgValue: '$45,000', trend: '+12%', up: true },
  { name: 'Auto Accident', leads: 380, converted: 98, rate: 25.8, avgValue: '$38,000', trend: '+8%', up: true },
  { name: 'Workers Comp', leads: 290, converted: 68, rate: 23.4, avgValue: '$28,000', trend: '+5%', up: true },
  { name: 'Medical Malpractice', leads: 120, converted: 42, rate: 35.0, avgValue: '$125,000', trend: '-3%', up: false },
  { name: 'Other', leads: 74, converted: 15, rate: 20.3, avgValue: '$22,000', trend: '+2%', up: true },
];

const COLORS = ['#8b5cf6', '#ec4899', '#06b6d4', '#f59e0b', '#64748b'];

const dateRangeOptions = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: 'ytd', label: 'Year to Date' },
];

const getRankBadge = (rank: number) => {
  if (rank === 1) return { bg: 'rank-gold', text: '🥇' };
  if (rank === 2) return { bg: 'rank-silver', text: '🥈' };
  if (rank === 3) return { bg: 'rank-bronze', text: '🥉' };
  return { bg: 'bg-[var(--surface-hover)]', text: `#${rank}` };
};

export function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Reports & Analytics</h1>
          <p className="text-[var(--text-secondary)]">Performance insights across all metrics</p>
        </div>
        <div className="flex gap-3">
          <div className="w-40">
            <Select options={dateRangeOptions} defaultValue="30d" />
          </div>
          <Button variant="outline">
            <Download size={18} />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Conversion Rate', value: '24.3%', icon: conversionFunnelIcon, accent: 'border-purple-500', text: 'text-purple-500', type: 'img' },
          { label: 'Avg. Time to Convert', value: '4.2 days', icon: TrendingUp, accent: 'border-blue-500', text: 'text-blue-500', type: 'icon' },
          { label: 'Top Agent', value: 'Sarah M.', icon: Award, accent: 'border-emerald-500', text: 'text-emerald-500', type: 'icon' },
          { label: 'Active Agents', value: '12', icon: Users, accent: 'border-amber-500', text: 'text-amber-500', type: 'icon' },
        ].map(stat => (
          <div key={stat.label} className={`bg-[var(--surface)] p-5 border-l-4 ${stat.accent} hover:bg-[var(--surface-hover)] transition-colors`}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-semibold">{stat.label}</p>
              {stat.type === 'icon' ? (
                <stat.icon size={16} className={stat.text} />
              ) : (
                <img src={stat.icon as string} alt="" className="h-4 w-4 object-contain opacity-80" />
              )}
            </div>
            <p className="text-3xl font-bold text-[var(--text-primary)]">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Lead Pacing Strip */}
      <div className="bg-[var(--surface)] border-l-4 border-blue-500 px-6 py-4 flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2 shrink-0">
          <TrendingUp size={14} className="text-blue-500" />
          <span className="text-sm font-bold text-[var(--text-primary)]">Lead Pacing</span>
        </div>
        {[
          { label: 'Today', val: '842', color: 'text-blue-500' },
          { label: 'Pacing', val: '104%', color: 'text-emerald-500' },
          { label: 'Projected', val: '1,250', color: 'text-[var(--text-primary)]' },
          { label: 'Target', val: '810', color: 'text-[var(--text-muted)]' },
          { label: 'Search Vol.', val: '24.8K', color: 'text-blue-500' },
        ].map(m => (
          <div key={m.label} className="flex items-center gap-2">
            <span className="text-[10px] uppercase text-[var(--text-muted)] font-bold">{m.label}</span>
            <span className={`text-sm font-bold font-mono ${m.color}`}>{m.val}</span>
          </div>
        ))}
        <div className="flex-1 min-w-[100px]">
          <div className="w-full h-1.5 rounded-full bg-[var(--surface-active)] overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500" style={{ width: '100%' }} />
          </div>
        </div>
      </div>
      {/* Agent Leaderboard - Executive Style */}
      <div className="bg-[var(--surface)] border-t-[4px] border-amber-500">
        <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-center bg-[var(--surface-active)]/20">
          <div className="flex items-center gap-3">
            <Trophy size={16} className="text-amber-500" />
            <h3 className="font-bold text-[var(--text-primary)]">Agent Performance</h3>
          </div>
          <Badge variant="outline" className="text-[10px] border-amber-500/50 text-amber-500">LIVE RANKING</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface-active)]/10">
                <th className="px-4 py-2 text-left text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Rank</th>
                <th className="px-4 py-2 text-left text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Agent</th>
                <th className="px-4 py-2 text-right text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Leads</th>
                <th className="px-4 py-2 text-right text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Conv.</th>
                <th className="px-4 py-2 text-right text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Rate</th>
                <th className="px-4 py-2 text-right text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Avg Resp</th>
                <th className="px-4 py-2 text-right text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Sat.</th>
              </tr>
            </thead>
            <tbody>
              {agentPerformance.map((agent) => {
                const rankBadge = getRankBadge(agent.rank);
                return (
                  <tr key={agent.id} className="border-b border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors group">
                    <td className="px-4 py-3">
                      <span className={`flex h-6 w-6 items-center justify-center rounded font-bold text-xs ${rankBadge.text === '🥇' || rankBadge.text === '🥈' || rankBadge.text === '🥉' ? 'bg-transparent text-lg' : 'bg-[var(--surface-active)] text-[var(--text-secondary)]'}`}>
                        {rankBadge.text}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-[var(--surface-active)] border border-[var(--border)]">
                          <span className="text-[10px] font-bold text-[var(--text-secondary)]">{agent.avatar}</span>
                        </div>
                        <span className="font-bold text-sm text-[var(--text-primary)]">{agent.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-[var(--text-secondary)]">{agent.leadsHandled}</td>
                    <td className="px-4 py-3 text-right text-emerald-500 font-bold">{agent.converted}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-12 h-1.5 rounded-full bg-[var(--surface-active)] overflow-hidden">
                          <div className="h-full rounded-full bg-emerald-500" style={{ width: `${agent.conversionRate}%` }} />
                        </div>
                        <span className="font-mono text-xs text-[var(--text-primary)]">{agent.conversionRate}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-xs text-[var(--text-secondary)] font-mono">{agent.avgResponseTime}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-amber-500 text-[10px]">★</span>
                        <span className="font-bold text-sm text-[var(--text-primary)]">{agent.satisfaction}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pipeline Performance - Executive Style */}
      <div className="bg-[var(--surface)] border-t-[4px] border-cyan-500">
        <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-center bg-[var(--surface-active)]/20">
          <div className="flex items-center gap-3">
            <TrendingUp size={16} className="text-cyan-500" />
            <h3 className="font-bold text-[var(--text-primary)]">Pipeline Velocities</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface-active)]/10">
                <th className="px-4 py-2 text-left text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Case Type</th>
                <th className="px-4 py-2 text-right text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Total</th>
                <th className="px-4 py-2 text-right text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Conv.</th>
                <th className="px-4 py-2 text-right text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Rate</th>
                <th className="px-4 py-2 text-right text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Value</th>
                <th className="px-4 py-2 text-right text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Trend</th>
              </tr>
            </thead>
            <tbody>
              {pipelinePerformance.map((pipeline, index) => (
                <tr key={pipeline.name} className="border-b border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                      <span className="font-bold text-sm text-[var(--text-primary)]">{pipeline.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-sm text-[var(--text-secondary)]">{pipeline.leads}</td>
                  <td className="px-4 py-3 text-right text-emerald-500 font-bold text-sm">{pipeline.converted}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-mono text-sm text-[var(--text-primary)]">{pipeline.rate}%</span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-sm text-[var(--text-secondary)]">{pipeline.avgValue}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`text-xs font-bold ${pipeline.up ? 'text-emerald-500' : 'text-red-500'}`}>{pipeline.trend}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-[var(--surface)] border-l-[4px] border-purple-500 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[var(--text-primary)]">Conversion Funnel</h3>
            <Badge variant="outline" className="text-[10px] text-purple-500 border-purple-500/30">Stable</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionFunnel} layout="vertical">
                <defs>
                  <linearGradient id="funnelGradientReports" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#d946ef" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" stroke="var(--text-muted)" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis dataKey="stage" type="category" stroke="var(--text-muted)" width={80} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: 'var(--surface-active)', opacity: 0.2 }}
                  contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-primary)' }}
                />
                <Bar dataKey="count" fill="url(#funnelGradientReports)" radius={[0, 4, 4, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[var(--surface)] border-l-[4px] border-emerald-500 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[var(--text-primary)]">Monthly Lead Trend</h3>
            <Badge variant="outline" className="text-[10px] text-emerald-500 border-emerald-500/30">+12% vs avg</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--text-muted)" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                  labelStyle={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}
                />
                <Line type="monotone" dataKey="leads" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', strokeWidth: 0, r: 4 }} activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }} />
                <Line type="monotone" dataKey="retained" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 0, r: 4 }} activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Source Performance Table - Executive Style */}
      <div className="bg-[var(--surface)] border-t-[4px] border-indigo-500">
        <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-center bg-[var(--surface-active)]/20">
          <div className="flex items-center gap-3">
            <TrendingUp size={16} className="text-indigo-500" />
            <h3 className="font-bold text-[var(--text-primary)]">Acquisition Sources</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface-active)]/10">
                <th className="px-6 py-3 text-left text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Source</th>
                <th className="px-6 py-3 text-right text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Leads</th>
                <th className="px-6 py-3 text-right text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Converted</th>
                <th className="px-6 py-3 text-right text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Rate</th>
              </tr>
            </thead>
            <tbody>
              {sourcePerformance.map((row) => (
                <tr key={row.source} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-hover)] transition-colors">
                  <td className="px-6 py-4 font-bold text-sm text-[var(--text-primary)]">{row.source}</td>
                  <td className="px-6 py-4 text-right text-sm text-[var(--text-secondary)] font-mono">{row.leads}</td>
                  <td className="px-6 py-4 text-right text-sm text-emerald-500 font-bold">{row.converted}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-mono text-[var(--text-primary)]">{row.rate}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
