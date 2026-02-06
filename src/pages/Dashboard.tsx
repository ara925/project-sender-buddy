import { Briefcase, Phone, TrendingUp, Clock, ArrowUpRight, ArrowDownRight, Activity, CircleUser } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const leadsByDay = [
  { day: 'Mon', leads: 45 },
  { day: 'Tue', leads: 52 },
  { day: 'Wed', leads: 49 },
  { day: 'Thu', leads: 63 },
  { day: 'Fri', leads: 58 },
  { day: 'Sat', leads: 24 },
  { day: 'Sun', leads: 21 },
];

const leadsBySource = [
  { name: 'Google Ads', value: 450 },
  { name: 'Organic Search', value: 320 },
  { name: 'Referrals', value: 210 },
  { name: 'Social Media', value: 180 },
  { name: 'Direct', value: 124 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

const recentActivity = [
  { id: 1, action: 'New Lead Created', name: 'James Wilson', role: 'Viewer', time: '2 mins ago', source: 'Google Ads', badge: 'blue' },
  { id: 2, action: 'Call Completed', name: 'Sarah Parker', role: 'Agent', time: '15 mins ago', source: 'Outbound', badge: 'success' },
  { id: 3, action: 'Lead Converted', name: 'Mike Johnson', role: 'Manager', time: '1 hour ago', source: 'Referral', badge: 'purple' },
  { id: 4, action: 'Missed Call', name: 'System', role: 'System', time: '2 hours ago', source: 'Inbound', badge: 'destructive' },
  { id: 5, action: 'New Lead Created', name: 'Emily Davis', role: 'Viewer', time: '3 hours ago', source: 'Facebook', badge: 'blue' },
];

const statsCards = [
  { title: 'Total Leads', value: '1,284', change: '+12%', up: true, icon: Briefcase, color: 'text-blue-500' },
  { title: 'New Today', value: '47', change: '+8%', up: true, icon: Clock, color: 'text-purple-500' },
  { title: 'Qualified', value: '312', change: '+23%', up: true, icon: TrendingUp, color: 'text-emerald-500' },
  { title: 'Calls Today', value: '89', change: '-5%', up: false, icon: Phone, color: 'text-amber-500' },
];

export function Dashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Dashboard</h1>
          <p className="text-[var(--text-secondary)] mt-1">Overview of your lead pipeline performance</p>
        </div>
        <div className="px-3 py-1.5 rounded-md bg-[var(--surface)] border border-[var(--border)] flex items-center gap-2">
          <Activity size={14} className="text-[var(--primary)]" />
          <span className="text-xs font-medium text-[var(--text-secondary)]">Live Updates</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <div key={stat.title} className="card p-5 transition-shadow hover:shadow-md">
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm font-medium text-[var(--text-secondary)]">{stat.title}</div>
              <div className={`p-2 rounded-md bg-[var(--surface-active)] ${stat.color}`}>
                <stat.icon size={16} />
              </div>
            </div>
            <div className="flex items-end gap-2 mt-2">
              <div className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</div>
              <div className={`flex items-center gap-2 text-xs font-medium mb-1 ${stat.up ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Leads by Day - Area Chart */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-[var(--text-primary)]">User Trends</h3>
            <select className="text-sm border border-[var(--border)] rounded-md px-2 py-1 bg-[var(--surface)] text-[var(--text-secondary)]">
              <option>Last 30 Days</option>
              <option>This Week</option>
            </select>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={leadsByDay}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} tickMargin={10} />
                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip
                  cursor={{ stroke: 'var(--border)', strokeWidth: 1 }}
                  contentStyle={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    color: 'var(--text-primary)'
                  }}
                />
                <Area type="monotone" dataKey="leads" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leads by Source */}
        <div className="card p-6">
          <h3 className="text-base font-semibold text-[var(--text-primary)] mb-6">Source Distribution</h3>

          <div className="h-[200px] relative mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadsBySource}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="var(--surface)"
                  strokeWidth={2}
                >
                  {leadsBySource.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Stats */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-[var(--text-primary)]">1,284</span>
              <span className="text-xs text-[var(--text-muted)]">Total Leads</span>
            </div>
          </div>

          <div className="space-y-3">
            {leadsBySource.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-[var(--text-secondary)]">{item.name}</span>
                </div>
                <span className="font-semibold text-[var(--text-primary)]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
          <h3 className="text-base font-semibold text-[var(--text-primary)]">Recent Activity</h3>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 hover:bg-[var(--surface-hover)] transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface-active)]">
                  <CircleUser size={14} className="text-[var(--text-secondary)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{activity.action}</p>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <span>{activity.name}</span>
                    <span>•</span>
                    <span>{activity.source}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-[var(--text-muted)]">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
