import { Download, Trophy, Users, TrendingUp, Target, Award } from 'lucide-react';
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
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-pink)]" />
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-pink)]">
                <Target size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Conversion Rate</p>
                <p className="text-2xl font-bold text-[var(--success)]">24.3%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)]" />
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)]">
                <TrendingUp size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Avg. Time to Convert</p>
                <p className="text-2xl font-bold text-[var(--text-primary)]">4.2 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-emerald)] to-[var(--accent-cyan)]" />
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent-emerald)] to-[var(--accent-cyan)]">
                <Award size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Top Agent</p>
                <p className="text-2xl font-bold text-[var(--text-primary)]">Sarah M.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-amber)] to-[var(--accent-rose)]" />
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent-amber)] to-[var(--accent-rose)]">
                <Users size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Active Agents</p>
                <p className="text-2xl font-bold text-[var(--text-primary)]">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Leaderboard */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-3">
            <Trophy size={24} className="text-[var(--accent-amber)]" />
            <CardTitle>Agent Performance Leaderboard</CardTitle>
          </div>
          <Badge variant="purple">Live Rankings</Badge>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="px-4 py-3 text-left text-sm font-medium text-[var(--text-muted)]">Rank</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[var(--text-muted)]">Agent</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-[var(--text-muted)]">Leads</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-[var(--text-muted)]">Converted</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-[var(--text-muted)]">Conv. Rate</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-[var(--text-muted)]">Avg Response</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-[var(--text-muted)]">Satisfaction</th>
                </tr>
              </thead>
              <tbody>
                {agentPerformance.map((agent) => {
                  const rankBadge = getRankBadge(agent.rank);
                  return (
                    <tr key={agent.id} className="border-b border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors">
                      <td className="px-4 py-3">
                        <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${rankBadge.bg} text-white`}>
                          {rankBadge.text}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-pink)]">
                            <span className="text-xs font-bold text-white">{agent.avatar}</span>
                          </div>
                          <span className="font-medium text-[var(--text-primary)]">{agent.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-[var(--text-primary)]">{agent.leadsHandled}</td>
                      <td className="px-4 py-3 text-right text-[var(--success)] font-medium">{agent.converted}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-2 rounded-full bg-[var(--surface-hover)] overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-pink)]" style={{ width: `${agent.conversionRate}%` }} />
                          </div>
                          <span className="font-medium text-[var(--text-primary)]">{agent.conversionRate}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-[var(--text-secondary)]">{agent.avgResponseTime}</td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-[var(--accent-amber)]">★</span>
                        <span className="ml-1 font-medium text-[var(--text-primary)]">{agent.satisfaction}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Performance */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-3">
            <TrendingUp size={24} className="text-[var(--accent-cyan)]" />
            <CardTitle>Pipeline Performance by Case Type</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="px-4 py-3 text-left text-sm font-medium text-[var(--text-muted)]">Case Type</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-[var(--text-muted)]">Total Leads</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-[var(--text-muted)]">Converted</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-[var(--text-muted)]">Conv. Rate</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-[var(--text-muted)]">Avg. Value</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-[var(--text-muted)]">Trend</th>
                </tr>
              </thead>
              <tbody>
                {pipelinePerformance.map((pipeline, index) => (
                  <tr key={pipeline.name} className="border-b border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index], boxShadow: `0 0 10px ${COLORS[index]}60` }} />
                        <span className="font-medium text-[var(--text-primary)]">{pipeline.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-[var(--text-primary)]">{pipeline.leads}</td>
                    <td className="px-4 py-3 text-right text-[var(--success)] font-medium">{pipeline.converted}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-2 rounded-full bg-[var(--surface-hover)] overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${pipeline.rate}%`, backgroundColor: COLORS[index] }} />
                        </div>
                        <span className="font-medium text-[var(--text-primary)]">{pipeline.rate}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-[var(--text-secondary)]">{pipeline.avgValue}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={pipeline.up ? 'text-[var(--success)]' : 'text-[var(--error)]'}>{pipeline.trend}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Conversion Funnel</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conversionFunnel} layout="vertical">
                  <defs>
                    <linearGradient id="funnelGradientReports" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" stroke="var(--text-muted)" />
                  <YAxis dataKey="stage" type="category" stroke="var(--text-muted)" width={80} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px' }} />
                  <Bar dataKey="count" fill="url(#funnelGradientReports)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Monthly Trend</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--text-muted)" />
                  <YAxis stroke="var(--text-muted)" />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px' }} />
                  <Line type="monotone" dataKey="leads" stroke="var(--accent-purple)" strokeWidth={3} dot={{ fill: 'var(--accent-purple)' }} />
                  <Line type="monotone" dataKey="retained" stroke="var(--success)" strokeWidth={3} dot={{ fill: 'var(--success)' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Source Performance Table */}
      <Card>
        <CardHeader><CardTitle>Source Performance</CardTitle></CardHeader>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="px-6 py-3 text-left text-sm font-medium text-[var(--text-muted)]">Source</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-[var(--text-muted)]">Leads</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-[var(--text-muted)]">Converted</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-[var(--text-muted)]">Rate</th>
              </tr>
            </thead>
            <tbody>
              {sourcePerformance.map((row) => (
                <tr key={row.source} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-6 py-4 font-medium text-[var(--text-primary)]">{row.source}</td>
                  <td className="px-6 py-4 text-right text-[var(--text-primary)]">{row.leads}</td>
                  <td className="px-6 py-4 text-right text-[var(--success)]">{row.converted}</td>
                  <td className="px-6 py-4 text-right text-[var(--text-primary)]">{row.rate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
