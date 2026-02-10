import { useState } from 'react';
import {
  Bot, Zap, Shield, PhoneCall, TrendingUp, TrendingDown, Users, Clock,
  CheckCircle2, XCircle, MessageSquare, BarChart3, ArrowRightLeft, Brain,
  Sparkles, Target, ThumbsUp, ThumbsDown, AlertTriangle, Volume2,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import { Card, Badge, Button } from '@/components/ui';
import { cn } from '@/lib/utils';

/* ─── Mock Data ─── */

const aiKPIs = [
  { label: 'Speed to Lead', value: '4.2s', change: '-68%', positive: true, icon: Zap, description: 'Avg time to first contact', sub: 'vs 13.1s human avg' },
  { label: 'Containment Rate', value: '78.4%', change: '+5.2%', positive: true, icon: Shield, description: 'Calls resolved by AI', sub: '412 of 525 calls' },
  { label: 'Task Completion', value: '91.3%', change: '+2.8%', positive: true, icon: CheckCircle2, description: 'Qualification steps completed', sub: 'Across all workflows' },
  { label: 'Receptiveness', value: '8.4', change: '+0.6', positive: true, icon: ThumbsUp, description: 'Customer engagement score', sub: '1-10 scale' },
  { label: 'AI Calls Today', value: '187', change: '+34%', positive: true, icon: Bot, description: 'Total AI-handled calls', sub: '68% of all calls' },
  { label: 'Escalation Rate', value: '21.6%', change: '-3.1%', positive: true, icon: ArrowRightLeft, description: 'Transferred to human', sub: '113 escalations' },
  { label: 'Qualification Accuracy', value: '94.7%', change: '+1.2%', positive: true, icon: Target, description: 'Correct qualification decisions', sub: 'Validated by human review' },
  { label: 'Avg Handle Time', value: '3:42', change: '-22%', positive: true, icon: Clock, description: 'Average call duration', sub: 'vs 4:48 human avg' },
];

const aiVsHumanData = [
  { metric: 'Speed to Lead', ai: 4.2, human: 13.1, unit: 's', aiLabel: '4.2s', humanLabel: '13.1s', aiWins: true },
  { metric: 'Containment', ai: 78, human: 0, unit: '%', aiLabel: '78%', humanLabel: 'N/A', aiWins: true },
  { metric: 'Task Completion', ai: 91, human: 87, unit: '%', aiLabel: '91%', humanLabel: '87%', aiWins: true },
  { metric: 'Qualification Acc.', ai: 94.7, human: 96.2, unit: '%', aiLabel: '94.7%', humanLabel: '96.2%', aiWins: false },
  { metric: 'Customer Satisfaction', ai: 8.4, human: 8.7, unit: '/10', aiLabel: '8.4', humanLabel: '8.7', aiWins: false },
  { metric: 'Avg Handle Time', ai: 222, human: 288, unit: 's', aiLabel: '3:42', humanLabel: '4:48', aiWins: true },
  { metric: 'Cost per Call', ai: 0.42, human: 3.85, unit: '$', aiLabel: '$0.42', humanLabel: '$3.85', aiWins: true },
  { metric: 'Availability', ai: 100, human: 62, unit: '%', aiLabel: '24/7', humanLabel: '62%', aiWins: true },
];

const aiAgentLeaderboard = [
  { name: 'Regal Agent Alpha', type: 'Inbound Qualifier', calls: 89, contained: 72, escalated: 17, accuracy: 95.2, satisfaction: 8.6, avgDuration: '3:18', status: 'active' },
  { name: 'Regal Agent Beta', type: 'Outbound Follow-up', calls: 64, contained: 48, escalated: 16, accuracy: 93.8, satisfaction: 8.2, avgDuration: '4:05', status: 'active' },
  { name: 'Regal Agent Gamma', type: 'After-Hours Intake', calls: 34, contained: 30, escalated: 4, accuracy: 96.1, satisfaction: 8.9, avgDuration: '3:45', status: 'active' },
  { name: 'Regal Agent Delta', type: 'Spanish Language', calls: 22, contained: 18, escalated: 4, accuracy: 91.5, satisfaction: 8.0, avgDuration: '4:22', status: 'active' },
  { name: 'Regal Agent Echo', type: 'Workers Comp Intake', calls: 18, contained: 14, escalated: 4, accuracy: 94.4, satisfaction: 8.3, avgDuration: '5:10', status: 'paused' },
];

const hourlyPerformance = [
  { hour: '12am', aiCalls: 8, humanCalls: 0, containment: 82 },
  { hour: '2am', aiCalls: 5, humanCalls: 0, containment: 85 },
  { hour: '4am', aiCalls: 3, humanCalls: 0, containment: 90 },
  { hour: '6am', aiCalls: 12, humanCalls: 2, containment: 80 },
  { hour: '8am', aiCalls: 28, humanCalls: 18, containment: 76 },
  { hour: '9am', aiCalls: 35, humanCalls: 24, containment: 74 },
  { hour: '10am', aiCalls: 32, humanCalls: 28, containment: 78 },
  { hour: '11am', aiCalls: 28, humanCalls: 26, containment: 80 },
  { hour: '12pm', aiCalls: 22, humanCalls: 20, containment: 79 },
  { hour: '1pm', aiCalls: 30, humanCalls: 22, containment: 77 },
  { hour: '2pm', aiCalls: 34, humanCalls: 25, containment: 75 },
  { hour: '3pm', aiCalls: 31, humanCalls: 24, containment: 78 },
  { hour: '4pm', aiCalls: 26, humanCalls: 22, containment: 81 },
  { hour: '5pm', aiCalls: 18, humanCalls: 14, containment: 83 },
  { hour: '6pm', aiCalls: 14, humanCalls: 4, containment: 85 },
  { hour: '8pm', aiCalls: 10, humanCalls: 0, containment: 88 },
  { hour: '10pm', aiCalls: 7, humanCalls: 0, containment: 86 },
];

const taskCompletionBreakdown = [
  { task: 'State Verification', rate: 98 },
  { task: 'Title Confirmation', rate: 95 },
  { task: 'Coverage Assessment', rate: 92 },
  { task: 'Objection Handling', rate: 87 },
  { task: 'Appointment Scheduling', rate: 94 },
  { task: 'Document Request', rate: 89 },
  { task: 'Warm Transfer', rate: 96 },
];

const sentimentDistribution = [
  { name: 'Positive', value: 58, color: '#10b981' },
  { name: 'Neutral', value: 28, color: '#6b7280' },
  { name: 'Frustrated', value: 10, color: '#f59e0b' },
  { name: 'Negative', value: 4, color: '#ef4444' },
];

const radarData = [
  { subject: 'Speed', ai: 95, human: 45 },
  { subject: 'Accuracy', ai: 88, human: 92 },
  { subject: 'Empathy', ai: 72, human: 90 },
  { subject: 'Consistency', ai: 98, human: 75 },
  { subject: 'Cost Efficiency', ai: 96, human: 30 },
  { subject: 'Availability', ai: 100, human: 55 },
];

const recentAIInsights = [
  { type: 'critical', title: 'High hangup rate on "pricing" objection', description: 'Agent Alpha shows 34% hangup when customers ask about pricing. Recommend adding pricing FAQ to Knowledge Base.', metric: '34% hangup' },
  { type: 'warning', title: 'Spanish Agent needs objection training', description: 'Agent Delta struggles with "already have a lawyer" objection — only 40% containment on this path.', metric: '40% contained' },
  { type: 'success', title: 'After-hours intake outperforming daytime', description: 'Agent Gamma achieves 88% containment after 6pm vs 76% during business hours. Consider expanding AI coverage.', metric: '+12% nights' },
];

/* ─── Component ─── */

export function AIAgentPerformanceTab() {
  const [viewMode, setViewMode] = useState<'overview' | 'comparison'>('overview');

  return (
    <div className="space-y-6">
      {/* Sub-nav */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setViewMode('overview')}
          className={cn(
            'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
            viewMode === 'overview'
              ? 'bg-[var(--surface-hover)] text-[var(--text-primary)]'
              : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
          )}
        >
          <Bot size={16} /> Agent Overview
        </button>
        <button
          onClick={() => setViewMode('comparison')}
          className={cn(
            'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
            viewMode === 'comparison'
              ? 'bg-[var(--surface-hover)] text-[var(--text-primary)]'
              : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
          )}
        >
          <Users size={16} /> AI vs Human
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
        {aiKPIs.map(kpi => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className="p-4 hover:bg-[var(--surface-hover)] transition-colors cursor-pointer hover:shadow-md">
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-lg bg-purple-500/10">
                  <Icon size={14} className="text-purple-500" />
                </div>
                <span className={cn(
                  'text-xs font-semibold px-2 py-0.5 rounded-full',
                  kpi.positive ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'
                )}>
                  {kpi.change}
                </span>
              </div>
              <div className="text-xl font-bold text-[var(--text-primary)]">{kpi.value}</div>
              <div className="text-xs font-medium text-[var(--text-secondary)] mt-0.5">{kpi.label}</div>
              <div className="text-[10px] text-[var(--text-muted)] mt-1">{kpi.sub}</div>
            </Card>
          );
        })}
      </div>

      {/* AI Insights */}
      <div className="grid gap-4 md:grid-cols-3">
        {recentAIInsights.map((insight, i) => {
          const isError = insight.type === 'critical';
          const isWarn = insight.type === 'warning';
          return (
            <Card key={i} className="relative overflow-hidden p-5">
              <div className={cn(
                'absolute inset-x-0 top-0 h-0.5',
                isError ? 'bg-red-500/70' : isWarn ? 'bg-amber-500/70' : 'bg-emerald-500/70'
              )} />
              <div className="flex items-start gap-3">
                <div className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
                  isError ? 'bg-red-500/10 text-red-600' : isWarn ? 'bg-amber-500/10 text-amber-700' : 'bg-emerald-500/10 text-emerald-700'
                )}>
                  {isError ? <AlertTriangle size={18} /> : isWarn ? <Brain size={18} /> : <Sparkles size={18} />}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">{insight.title}</h3>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">{insight.description}</p>
                  <span className={cn(
                    'inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full border',
                    isError ? 'bg-red-500/10 text-red-600 border-red-500/20' : isWarn ? 'bg-amber-500/10 text-amber-700 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'
                  )}>
                    {insight.metric}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {viewMode === 'overview' ? (
        <>
          {/* Hourly Performance Chart */}
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
                  <BarChart3 size={18} />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-[var(--text-primary)]">Hourly Call Distribution</h2>
                  <p className="text-xs text-[var(--text-muted)]">AI vs Human call volume + containment rate</p>
                </div>
              </div>
              <Badge variant="outline">Today</Badge>
            </div>
            <div className="p-5">
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourlyPerformance} margin={{ left: 0, right: 0, top: 8, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="hour" stroke="var(--text-muted)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis stroke="var(--text-muted)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,.15)' }}
                    />
                    <Bar dataKey="aiCalls" name="AI Calls" fill="#a855f7" radius={[4, 4, 0, 0]} barSize={14} />
                    <Bar dataKey="humanCalls" name="Human Calls" fill="var(--border)" radius={[4, 4, 0, 0]} barSize={14} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-6 mt-3 text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-purple-500" /> AI Calls</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[var(--border)]" /> Human Calls</span>
              </div>
            </div>
          </Card>

          {/* Agent Leaderboard + Task Completion */}
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="overflow-hidden lg:col-span-2">
              <div className="border-b border-[var(--border)] px-5 py-4">
                <h2 className="text-base font-semibold text-[var(--text-primary)]">AI Agent Leaderboard</h2>
                <p className="text-xs text-[var(--text-muted)]">Regal voice agents ranked by performance</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="bg-[var(--surface-hover)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Agent</th>
                      <th className="bg-[var(--surface-hover)] px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Calls</th>
                      <th className="bg-[var(--surface-hover)] px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Contained</th>
                      <th className="bg-[var(--surface-hover)] px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Accuracy</th>
                      <th className="bg-[var(--surface-hover)] px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">CSAT</th>
                      <th className="bg-[var(--surface-hover)] px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Avg Time</th>
                      <th className="bg-[var(--surface-hover)] px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {aiAgentLeaderboard.map((agent, i) => (
                      <tr key={agent.name} className="hover:bg-[var(--surface-hover)] transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500 text-xs font-bold">
                              {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                            </div>
                            <div>
                              <div className="font-medium text-[var(--text-primary)] text-sm">{agent.name}</div>
                              <div className="text-[10px] text-[var(--text-muted)]">{agent.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-[var(--text-primary)]">{agent.calls}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="h-2 w-16 overflow-hidden rounded-full bg-[var(--surface-active)]">
                              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(agent.contained / agent.calls) * 100}%` }} />
                            </div>
                            <span className="text-xs font-medium text-emerald-600">{Math.round((agent.contained / agent.calls) * 100)}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className={cn('text-sm font-semibold', agent.accuracy >= 95 ? 'text-emerald-600' : 'text-[var(--text-primary)]')}>
                            {agent.accuracy}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-sm font-medium text-[var(--text-primary)]">{agent.satisfaction}</td>
                        <td className="px-4 py-3 text-right text-sm text-[var(--text-secondary)] font-mono">{agent.avgDuration}</td>
                        <td className="px-4 py-3 text-center">
                          <Badge variant={agent.status === 'active' ? 'success' : 'warning'} className="text-[10px]">
                            {agent.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Task Completion Breakdown */}
            <Card className="overflow-hidden">
              <div className="border-b border-[var(--border)] px-5 py-4">
                <h2 className="text-base font-semibold text-[var(--text-primary)]">Task Completion</h2>
                <p className="text-xs text-[var(--text-muted)]">Step-by-step success rates</p>
              </div>
              <div className="p-4 space-y-3">
                {taskCompletionBreakdown.map(task => (
                  <div key={task.task}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-[var(--text-secondary)]">{task.task}</span>
                      <span className={cn('text-xs font-bold', task.rate >= 95 ? 'text-emerald-600' : task.rate >= 90 ? 'text-[var(--primary)]' : 'text-amber-600')}>
                        {task.rate}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--surface-active)] overflow-hidden">
                      <div
                        className={cn('h-full rounded-full transition-all', task.rate >= 95 ? 'bg-emerald-500' : task.rate >= 90 ? 'bg-[var(--primary)]' : 'bg-amber-500')}
                        style={{ width: `${task.rate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sentiment Distribution */}
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="overflow-hidden">
              <div className="border-b border-[var(--border)] px-5 py-4">
                <h2 className="text-base font-semibold text-[var(--text-primary)]">Customer Sentiment</h2>
                <p className="text-xs text-[var(--text-muted)]">AI-analyzed post-call sentiment</p>
              </div>
              <div className="p-5 flex items-center gap-8">
                <div className="h-[180px] w-[180px] shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={sentimentDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={0}>
                        {sentimentDistribution.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3 flex-1">
                  {sentimentDistribution.map(s => (
                    <div key={s.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                        <span className="text-sm text-[var(--text-secondary)]">{s.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-[var(--text-primary)]">{s.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="border-b border-[var(--border)] px-5 py-4">
                <h2 className="text-base font-semibold text-[var(--text-primary)]">AI vs Human Radar</h2>
                <p className="text-xs text-[var(--text-muted)]">Capability comparison across dimensions</p>
              </div>
              <div className="p-5">
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="var(--border)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar name="AI Agent" dataKey="ai" stroke="#a855f7" fill="#a855f7" fillOpacity={0.2} strokeWidth={2} />
                      <Radar name="Human Agent" dataKey="human" stroke="var(--text-muted)" fill="var(--text-muted)" fillOpacity={0.1} strokeWidth={2} />
                      <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: 12 }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center gap-6 mt-2 text-xs text-[var(--text-muted)]">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-purple-500" /> AI Agent</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[var(--text-muted)]" /> Human Agent</span>
                </div>
              </div>
            </Card>
          </div>
        </>
      ) : (
        /* ─── AI vs Human Comparison View ─── */
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
                <Users size={18} />
              </div>
              <div>
                <h2 className="text-base font-semibold text-[var(--text-primary)]">AI vs Human Performance</h2>
                <p className="text-xs text-[var(--text-muted)]">Side-by-side comparison across all key metrics</p>
              </div>
            </div>
            <Badge variant="outline">This Week</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="bg-[var(--surface-hover)] px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Metric</th>
                  <th className="bg-[var(--surface-hover)] px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-purple-500">
                    <span className="flex items-center justify-center gap-1.5"><Bot size={14} /> AI Agent</span>
                  </th>
                  <th className="bg-[var(--surface-hover)] px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    <span className="flex items-center justify-center gap-1.5"><Users size={14} /> Human</span>
                  </th>
                  <th className="bg-[var(--surface-hover)] px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Winner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {aiVsHumanData.map(row => (
                  <tr key={row.metric} className="hover:bg-[var(--surface-hover)] transition-colors">
                    <td className="px-5 py-4 font-medium text-[var(--text-primary)]">{row.metric}</td>
                    <td className="px-5 py-4 text-center">
                      <span className={cn('text-sm font-bold', row.aiWins ? 'text-purple-500' : 'text-[var(--text-secondary)]')}>
                        {row.aiLabel}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={cn('text-sm font-bold', !row.aiWins ? 'text-emerald-600' : 'text-[var(--text-secondary)]')}>
                        {row.humanLabel}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <Badge variant={row.aiWins ? 'info' : 'success'} className="text-[10px]">
                        {row.aiWins ? '🤖 AI' : '👤 Human'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-4 bg-[var(--surface-hover)] border-t border-[var(--border)]">
            <div className="flex items-center gap-3">
              <Sparkles size={16} className="text-purple-500" />
              <p className="text-xs text-[var(--text-secondary)]">
                <strong className="text-[var(--text-primary)]">AI wins 6 of 8 categories.</strong> Human agents still lead in qualification accuracy and customer satisfaction, but AI agents deliver massive cost and speed advantages.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
