import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

/* ── shared mini-components ─────────────────────────── */

const StatRow = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
  <div className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
    <span className="text-sm text-[var(--text-secondary)]">{label}</span>
    <div className="text-right">
      <span className="text-sm font-semibold text-[var(--text-primary)]">{value}</span>
      {sub && <span className="block text-[10px] text-[var(--text-muted)]">{sub}</span>}
    </div>
  </div>
);

const MiniTrend = ({ label, value, change, positive }: { label: string; value: string; change: string; positive: boolean }) => (
  <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
    <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-1">{label}</div>
    <div className="text-lg font-bold text-[var(--text-primary)]">{value}</div>
    <div className={cn('flex items-center gap-1 text-xs font-semibold mt-1', positive ? 'text-emerald-600' : 'text-red-600')}>
      {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
      {change}
    </div>
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mt-6 mb-3">{children}</h3>
);

const CHART_COLORS = ['var(--primary)', 'var(--accent-purple)', '#f59e0b', '#10b981', '#ef4444', '#6366f1', '#ec4899'];

/* ── detail data per metric ─────────────────────────── */

const dailyLeadsData = [
  { day: 'Mon', leads: 185 }, { day: 'Tue', leads: 198 }, { day: 'Wed', leads: 172 },
  { day: 'Thu', leads: 210 }, { day: 'Fri', leads: 195 }, { day: 'Sat', leads: 148 }, { day: 'Sun', leads: 139 },
];

const leadsBySource = [
  { name: 'Website', value: 142 }, { name: 'Intaker', value: 115 }, { name: 'Organic', value: 312 },
  { name: 'Referrals', value: 156 }, { name: 'Social', value: 89 }, { name: 'Direct', value: 203 },
  { name: 'CallRail', value: 78 }, { name: 'Forms', value: 85 }, { name: 'Other', value: 67 },
];

const qualificationReasons = [
  { reason: 'Case type mismatch', count: 312, pct: '38.5%' },
  { reason: 'No injury / damages', count: 189, pct: '23.3%' },
  { reason: 'Statute of limitations', count: 124, pct: '15.3%' },
  { reason: 'Jurisdiction issue', count: 98, pct: '12.1%' },
  { reason: 'Duplicate / spam', count: 86, pct: '10.6%' },
];

const qualTrendData = [
  { week: 'W1', qualified: 98, disqualified: 165 }, { week: 'W2', qualified: 105, disqualified: 152 },
  { week: 'W3', qualified: 112, disqualified: 148 }, { week: 'W4', qualified: 123, disqualified: 140 },
];

const intakeTeamMembers = [
  { name: 'Maria Santos', role: 'Senior Intake', calls: 145, converted: 42, rate: '29.0%', status: 'online' },
  { name: 'James Rodriguez', role: 'Senior Intake', calls: 138, converted: 38, rate: '27.5%', status: 'online' },
  { name: 'Ashley Kim', role: 'Intake Specialist', calls: 132, converted: 35, rate: '26.5%', status: 'online' },
  { name: 'David Chen', role: 'Intake Specialist', calls: 128, converted: 33, rate: '25.8%', status: 'online' },
  { name: 'Rachel Martinez', role: 'Intake Specialist', calls: 125, converted: 31, rate: '24.8%', status: 'online' },
  { name: 'Kevin Park', role: 'Intake Specialist', calls: 118, converted: 30, rate: '25.4%', status: 'online' },
  { name: 'Sarah Johnson', role: 'Junior Intake', calls: 112, converted: 26, rate: '23.2%', status: 'online' },
  { name: 'Michael Brown', role: 'Junior Intake', calls: 108, converted: 25, rate: '23.1%', status: 'online' },
  { name: 'Lisa Nguyen', role: 'Junior Intake', calls: 105, converted: 24, rate: '22.9%', status: 'online' },
  { name: 'Chris Taylor', role: 'Junior Intake', calls: 98, converted: 22, rate: '22.4%', status: 'online' },
  { name: 'Amanda White', role: 'Trainee', calls: 82, converted: 16, rate: '19.5%', status: 'online' },
  { name: 'Brian Lopez', role: 'Trainee', calls: 75, converted: 14, rate: '18.7%', status: 'online' },
];

const contactRateByChannel = [
  { channel: 'Phone Inbound', rate: '82.3%', attempts: 1840, connected: 1514 },
  { channel: 'Phone Outbound', rate: '54.1%', attempts: 2210, connected: 1196 },
  { channel: 'SMS/Text', rate: '71.8%', attempts: 980, connected: 703 },
  { channel: 'Email', rate: '38.2%', attempts: 3100, connected: 1184 },
  { channel: 'Chat (Intaker)', rate: '91.4%', attempts: 650, connected: 594 },
  { channel: 'Web Form', rate: '62.5%', attempts: 480, connected: 300 },
];

const contactRateByHour = [
  { hour: '8am', rate: 58 }, { hour: '9am', rate: 72 }, { hour: '10am', rate: 81 },
  { hour: '11am', rate: 78 }, { hour: '12pm', rate: 65 }, { hour: '1pm', rate: 70 },
  { hour: '2pm', rate: 76 }, { hour: '3pm', rate: 74 }, { hour: '4pm', rate: 68 },
  { hour: '5pm', rate: 55 }, { hour: '6pm', rate: 42 }, { hour: '7pm', rate: 35 },
];

const searchVolumeData = [
  { month: 'Sep', branded: 4200, nonBranded: 18200 }, { month: 'Oct', branded: 4800, nonBranded: 19500 },
  { month: 'Nov', branded: 5100, nonBranded: 20100 }, { month: 'Dec', branded: 4600, nonBranded: 18800 },
  { month: 'Jan', branded: 5400, nonBranded: 21200 }, { month: 'Feb', branded: 5600, nonBranded: 19200 },
];

const topKeywords = [
  { keyword: 'car accident lawyer los angeles', volume: '3,200', position: 4, change: '+2' },
  { keyword: 'personal injury attorney near me', volume: '2,800', position: 7, change: '-1' },
  { keyword: 'wilshire law firm', volume: '2,400', position: 1, change: '0' },
  { keyword: 'truck accident lawyer california', volume: '1,900', position: 5, change: '+3' },
  { keyword: 'motorcycle accident attorney', volume: '1,600', position: 8, change: '+1' },
  { keyword: 'slip and fall lawyer', volume: '1,200', position: 12, change: '-2' },
  { keyword: 'workers comp attorney los angeles', volume: '980', position: 6, change: '+4' },
];

const organicPages = [
  { page: '/car-accident-lawyer', sessions: 4820, leads: 86, convRate: '1.78%' },
  { page: '/personal-injury', sessions: 3940, leads: 62, convRate: '1.57%' },
  { page: '/truck-accident', sessions: 2810, leads: 48, convRate: '1.71%' },
  { page: '/motorcycle-accident', sessions: 2150, leads: 38, convRate: '1.77%' },
  { page: '/workers-compensation', sessions: 1890, leads: 32, convRate: '1.69%' },
  { page: '/slip-and-fall', sessions: 1640, leads: 24, convRate: '1.46%' },
  { page: '/blog/what-to-do-after-accident', sessions: 5200, leads: 22, convRate: '0.42%' },
];

const websitePages = [
  { page: '/free-consultation', submissions: 48, convRate: '5.85%', avgTime: '2:15' },
  { page: '/car-accident-lawyer', submissions: 32, convRate: '6.27%', avgTime: '1:58' },
  { page: '/personal-injury', submissions: 28, convRate: '4.92%', avgTime: '2:42' },
  { page: '/workers-compensation', submissions: 18, convRate: '3.21%', avgTime: '3:10' },
  { page: '/employment-law', submissions: 12, convRate: '2.62%', avgTime: '2:55' },
  { page: '/contact', submissions: 4, convRate: '1.86%', avgTime: '1:30' },
];

const socialPlatforms = [
  { platform: 'Facebook', leads: 38, spend: '$680', engagement: '4.2%', cpl: '$17.89', impressions: '124K' },
  { platform: 'Instagram', leads: 24, spend: '$420', engagement: '5.8%', cpl: '$17.50', impressions: '89K' },
  { platform: 'TikTok', leads: 15, spend: '$310', engagement: '7.1%', cpl: '$20.67', impressions: '210K' },
  { platform: 'YouTube', leads: 8, spend: '$250', engagement: '2.4%', cpl: '$31.25', impressions: '45K' },
  { platform: 'LinkedIn', leads: 4, spend: '$180', engagement: '1.8%', cpl: '$45.00', impressions: '18K' },
];

const socialTrend = [
  { week: 'W1', facebook: 8, instagram: 5, tiktok: 2, youtube: 1 },
  { week: 'W2', facebook: 10, instagram: 6, tiktok: 4, youtube: 2 },
  { week: 'W3', facebook: 9, instagram: 7, tiktok: 5, youtube: 3 },
  { week: 'W4', facebook: 11, instagram: 6, tiktok: 4, youtube: 2 },
];

const referralSources = [
  { source: 'Attorney Referrals', leads: 62, value: '$186,000', convRate: '42%', avgCase: '$3,000' },
  { source: 'Past Client Referrals', leads: 45, value: '$112,500', convRate: '38%', avgCase: '$2,500' },
  { source: 'Medical Provider Network', leads: 22, value: '$55,000', convRate: '35%', avgCase: '$2,500' },
  { source: 'Community Partners', leads: 15, value: '$30,000', convRate: '28%', avgCase: '$2,000' },
  { source: 'Bar Association', leads: 8, value: '$20,000', convRate: '45%', avgCase: '$2,500' },
  { source: 'Other Professional', leads: 4, value: '$8,000', convRate: '22%', avgCase: '$2,000' },
];

const directLandingPages = [
  { page: 'Homepage', visits: 8420, leads: 82, convRate: '0.97%' },
  { page: '/free-consultation', visits: 3100, leads: 48, convRate: '1.55%' },
  { page: '/contact', visits: 2640, leads: 35, convRate: '1.33%' },
  { page: '/about', visits: 1890, leads: 12, convRate: '0.63%' },
  { page: '/results', visits: 1540, leads: 18, convRate: '1.17%' },
  { page: '/locations', visits: 1280, leads: 8, convRate: '0.63%' },
];

const directTrend = [
  { day: 'Mon', visits: 2850 }, { day: 'Tue', visits: 3120 }, { day: 'Wed', visits: 2940 },
  { day: 'Thu', visits: 3210 }, { day: 'Fri', visits: 2780 }, { day: 'Sat', visits: 1940 }, { day: 'Sun', visits: 1680 },
];

/* ── per-metric detail renderers ─────────────────────────── */

const detailContent: Record<string, () => React.ReactNode> = {
  'Total Leads': () => (
    <>
      <div className="grid grid-cols-2 gap-3">
        <MiniTrend label="This Week" value="452" change="+12% vs last week" positive />
        <MiniTrend label="This Month" value="1,247" change="+8% vs last month" positive />
        <MiniTrend label="Avg / Day" value="178" change="+15 vs prior" positive />
        <MiniTrend label="Peak Day" value="Thu" change="210 leads" positive />
      </div>
      <SectionTitle>Daily Breakdown</SectionTitle>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dailyLeadsData}>
            <defs>
              <linearGradient id="leadsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: 12, fontSize: 12 }} />
            <Area type="monotone" dataKey="leads" stroke="var(--primary)" fill="url(#leadsFill)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <SectionTitle>Source Distribution</SectionTitle>
      {leadsBySource.map(s => (
        <StatRow key={s.name} label={s.name} value={String(s.value)} sub={`${((s.value / 1247) * 100).toFixed(1)}%`} />
      ))}
    </>
  ),

  'Qualified Leads': () => (
    <>
      <div className="grid grid-cols-2 gap-3">
        <MiniTrend label="Qualified" value="438" change="+8% vs last month" positive />
        <MiniTrend label="Qualification Rate" value="35.1%" change="+2.3%" positive />
        <MiniTrend label="Avg Time to Qualify" value="4.2 hrs" change="-18 min" positive />
        <MiniTrend label="Auto-Qualified" value="124" change="28.3% of total" positive />
      </div>
      <SectionTitle>Weekly Trend</SectionTitle>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={qualTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="week" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: 12, fontSize: 12 }} />
            <Bar dataKey="qualified" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={20} name="Qualified" />
            <Bar dataKey="disqualified" fill="var(--border)" radius={[4, 4, 0, 0]} barSize={20} name="Disqualified" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <SectionTitle>Top Disqualification Reasons</SectionTitle>
      {qualificationReasons.map(r => (
        <StatRow key={r.reason} label={r.reason} value={String(r.count)} sub={r.pct} />
      ))}
    </>
  ),

  'Intake Team': () => (
    <>
      <div className="grid grid-cols-2 gap-3">
        <MiniTrend label="Team Size" value="12/12" change="Full staff" positive />
        <MiniTrend label="Avg Calls/Agent" value="114" change="+6 vs prior week" positive />
        <MiniTrend label="Team Conv. Rate" value="24.7%" change="+1.2%" positive />
        <MiniTrend label="Avg Handle Time" value="8.4 min" change="-0.6 min" positive />
      </div>
      <SectionTitle>Agent Performance</SectionTitle>
      <div className="space-y-2">
        {intakeTeamMembers.map((m, i) => (
          <div key={m.name} className="flex items-center gap-3 p-2.5 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface-hover)] text-xs font-bold text-[var(--text-primary)]">
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[var(--text-primary)]">{m.name}</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500" title="Online" />
              </div>
              <span className="text-[10px] text-[var(--text-muted)]">{m.role}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-[var(--text-primary)]">{m.converted}/{m.calls}</div>
              <div className="text-[10px] text-[var(--text-muted)]">{m.rate} conv.</div>
            </div>
          </div>
        ))}
      </div>
    </>
  ),

  'Contact Rate': () => (
    <>
      <div className="grid grid-cols-2 gap-3">
        <MiniTrend label="Overall Rate" value="68.4%" change="+3.2% vs last month" positive />
        <MiniTrend label="First Contact" value="72.1%" change="+4.5%" positive />
        <MiniTrend label="Avg Attempts" value="2.3" change="-0.4 attempts" positive />
        <MiniTrend label="Best Channel" value="Chat" change="91.4% rate" positive />
      </div>
      <SectionTitle>Rate by Time of Day</SectionTitle>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={contactRateByHour}>
            <defs>
              <linearGradient id="rateFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="hour" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
            <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: 12, fontSize: 12 }} />
            <Area type="monotone" dataKey="rate" stroke="var(--primary)" fill="url(#rateFill)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <SectionTitle>By Channel</SectionTitle>
      {contactRateByChannel.map(c => (
        <StatRow key={c.channel} label={c.channel} value={c.rate} sub={`${c.connected.toLocaleString()} / ${c.attempts.toLocaleString()}`} />
      ))}
    </>
  ),

  'Search Volume': () => (
    <>
      <div className="grid grid-cols-2 gap-3">
        <MiniTrend label="Total Volume" value="24.8K" change="+5% MoM" positive />
        <MiniTrend label="Branded" value="5,600" change="+17%" positive />
        <MiniTrend label="Non-Branded" value="19,200" change="+2%" positive />
        <MiniTrend label="Click-Through" value="3.8%" change="+0.4%" positive />
      </div>
      <SectionTitle>6-Month Trend</SectionTitle>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={searchVolumeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: 12, fontSize: 12 }} />
            <Bar dataKey="branded" stackId="a" fill="var(--primary)" radius={[0, 0, 0, 0]} name="Branded" />
            <Bar dataKey="nonBranded" stackId="a" fill="var(--accent-purple)" radius={[4, 4, 0, 0]} name="Non-Branded" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <SectionTitle>Top Keywords</SectionTitle>
      {topKeywords.map(k => (
        <div key={k.keyword} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
          <div className="min-w-0 flex-1">
            <span className="text-sm text-[var(--text-primary)] block truncate">{k.keyword}</span>
            <span className="text-[10px] text-[var(--text-muted)]">Vol: {k.volume}</span>
          </div>
          <div className="text-right ml-3">
            <span className="text-sm font-semibold text-[var(--text-primary)]">#{k.position}</span>
            <span className={cn('block text-[10px] font-semibold', k.change.startsWith('+') ? 'text-emerald-600' : k.change === '0' ? 'text-[var(--text-muted)]' : 'text-red-600')}>
              {k.change === '0' ? '—' : k.change}
            </span>
          </div>
        </div>
      ))}
    </>
  ),

  'Organic Search': () => (
    <>
      <div className="grid grid-cols-2 gap-3">
        <MiniTrend label="Organic Leads" value="312" change="+18% MoM" positive />
        <MiniTrend label="Organic Sessions" value="22,450" change="+12%" positive />
        <MiniTrend label="Avg Conv. Rate" value="1.39%" change="+0.11%" positive />
        <MiniTrend label="Bounce Rate" value="42.3%" change="-3.1%" positive />
      </div>
      <SectionTitle>Top Landing Pages</SectionTitle>
      <div className="space-y-1">
        {organicPages.map(p => (
          <div key={p.page} className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-0">
            <div className="min-w-0 flex-1">
              <span className="text-sm font-medium text-[var(--text-primary)] block truncate">{p.page}</span>
              <span className="text-[10px] text-[var(--text-muted)]">{p.sessions.toLocaleString()} sessions</span>
            </div>
            <div className="text-right ml-3">
              <span className="text-sm font-semibold text-[var(--text-primary)]">{p.leads} leads</span>
              <span className="block text-[10px] text-[var(--text-muted)]">{p.convRate}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  ),

  'Website': () => (
    <>
      <div className="grid grid-cols-2 gap-3">
        <MiniTrend label="Total Leads" value="142" change="+8% vs last month" positive />
        <MiniTrend label="Total Visitors" value="18,520" change="+12%" positive />
        <MiniTrend label="Conv. Rate" value="3.9%" change="-0.9%" positive={false} />
        <MiniTrend label="Avg Session" value="3:42" change="+15s" positive />
      </div>
      <SectionTitle>Top Converting Pages</SectionTitle>
      <div className="space-y-1">
        {websitePages.map(p => (
          <div key={p.page} className="p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-[var(--text-primary)]">{p.page}</span>
              <span className="text-xs font-mono text-[var(--text-secondary)]">{p.submissions} leads</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div>
                <div className="text-[10px] text-[var(--text-muted)]">Conv. Rate</div>
                <div className="text-xs font-semibold text-[var(--text-primary)]">{p.convRate}</div>
              </div>
              <div>
                <div className="text-[10px] text-[var(--text-muted)]">Avg Time</div>
                <div className="text-xs font-semibold text-[var(--text-primary)]">{p.avgTime}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  ),

  'Social Media': () => (
    <>
      <div className="grid grid-cols-2 gap-3">
        <MiniTrend label="Total Leads" value="89" change="+22% MoM" positive />
        <MiniTrend label="Total Spend" value="$1,840" change="+$220" positive={false} />
        <MiniTrend label="Avg CPL" value="$20.67" change="-$3.12" positive />
        <MiniTrend label="Impressions" value="486K" change="+38%" positive />
      </div>
      <SectionTitle>Weekly Trend</SectionTitle>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={socialTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="week" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: 12, fontSize: 12 }} />
            <Bar dataKey="facebook" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={12} name="Facebook" />
            <Bar dataKey="instagram" fill="var(--accent-purple)" radius={[4, 4, 0, 0]} barSize={12} name="Instagram" />
            <Bar dataKey="tiktok" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={12} name="TikTok" />
            <Bar dataKey="youtube" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={12} name="YouTube" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <SectionTitle>Platform Breakdown</SectionTitle>
      {socialPlatforms.map(p => (
        <div key={p.platform} className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-0">
          <div>
            <span className="text-sm font-medium text-[var(--text-primary)]">{p.platform}</span>
            <span className="block text-[10px] text-[var(--text-muted)]">{p.impressions} impressions · {p.engagement} eng.</span>
          </div>
          <div className="text-right">
            <span className="text-sm font-semibold text-[var(--text-primary)]">{p.leads} leads</span>
            <span className="block text-[10px] text-[var(--text-muted)]">{p.cpl} CPL</span>
          </div>
        </div>
      ))}
    </>
  ),

  'Referrals': () => (
    <>
      <div className="grid grid-cols-2 gap-3">
        <MiniTrend label="Total Referrals" value="156" change="+4% MoM" positive />
        <MiniTrend label="Est. Value" value="$411.5K" change="+12%" positive />
        <MiniTrend label="Conv. Rate" value="38.2%" change="+2.1%" positive />
        <MiniTrend label="Avg Case Value" value="$2,638" change="+$150" positive />
      </div>
      <SectionTitle>Referral Sources</SectionTitle>
      {referralSources.map(r => (
        <div key={r.source} className="p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors mb-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold text-[var(--text-primary)]">{r.source}</span>
            <span className="text-sm font-bold text-[var(--text-primary)]">{r.leads} leads</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-[var(--text-muted)]">
            <span>Value: {r.value}</span>
            <span>Conv: {r.convRate}</span>
            <span>Avg: {r.avgCase}</span>
          </div>
        </div>
      ))}
    </>
  ),

  'Direct': () => (
    <>
      <div className="grid grid-cols-2 gap-3">
        <MiniTrend label="Direct Leads" value="203" change="-2% MoM" positive={false} />
        <MiniTrend label="Total Visits" value="18,520" change="+5%" positive />
        <MiniTrend label="Conv. Rate" value="1.10%" change="-0.08%" positive={false} />
        <MiniTrend label="Avg Session" value="3:42" change="+12s" positive />
      </div>
      <SectionTitle>Daily Traffic</SectionTitle>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={directTrend}>
            <defs>
              <linearGradient id="directFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: 12, fontSize: 12 }} />
            <Area type="monotone" dataKey="visits" stroke="var(--primary)" fill="url(#directFill)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <SectionTitle>Top Landing Pages</SectionTitle>
      {directLandingPages.map(p => (
        <div key={p.page} className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-0">
          <div className="min-w-0 flex-1">
            <span className="text-sm font-medium text-[var(--text-primary)] block truncate">{p.page}</span>
            <span className="text-[10px] text-[var(--text-muted)]">{p.visits.toLocaleString()} visits</span>
          </div>
          <div className="text-right ml-3">
            <span className="text-sm font-semibold text-[var(--text-primary)]">{p.leads} leads</span>
            <span className="block text-[10px] text-[var(--text-muted)]">{p.convRate}</span>
          </div>
        </div>
      ))}
    </>
  ),
};

/* ── drawer component ─────────────────────────── */

interface MetricDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  metric: { label: string; value: string; change: string; positive: boolean; description: string } | null;
}

export function MetricDetailDrawer({ open, onOpenChange, metric }: MetricDetailDrawerProps) {
  if (!metric) return null;

  const renderContent = detailContent[metric.label];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto bg-[var(--surface)] border-[var(--border)]">
        <SheetHeader className="mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold text-[var(--text-primary)]">{metric.value}</div>
            <span className={cn(
              'text-sm font-semibold px-2.5 py-1 rounded-full flex items-center gap-1',
              metric.positive ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'
            )}>
              {metric.positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {metric.change}
            </span>
          </div>
          <SheetTitle className="text-[var(--text-primary)]">{metric.label}</SheetTitle>
          <SheetDescription className="text-[var(--text-secondary)]">{metric.description}</SheetDescription>
        </SheetHeader>

        <div className="space-y-1">
          {renderContent ? renderContent() : <p className="text-[var(--text-muted)]">No detailed data available.</p>}
        </div>
      </SheetContent>
    </Sheet>
  );
}