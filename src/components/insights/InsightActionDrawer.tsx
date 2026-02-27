import { useState } from 'react';
import { X, ExternalLink, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, BarChart3, Settings, Phone, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  open: boolean;
  onClose: () => void;
  actionType: 'intaker' | 'campaign' | 'calls' | null;
}

const intakerData = {
  title: 'Intaker Settings & Performance',
  summary: 'Intaker is outperforming Google Ads by 2.8x on lead quality. Reallocating more traffic to Intaker could yield ~15 additional qualified leads per week.',
  metrics: [
    { label: 'Weekly Leads', value: '115', trend: '+17%', good: true },
    { label: 'Qualification Rate', value: '73.9%', trend: '+5%', good: true },
    { label: 'Avg Response Time', value: '2.4 min', trend: '-18%', good: true },
    { label: 'Retention Rate', value: '36.5%', trend: '+8%', good: true },
  ],
  settings: [
    { name: 'Auto-assignment', status: 'Enabled', desc: 'Leads auto-assigned to available agents within 30 seconds' },
    { name: 'Follow-up cadence', status: '3 touches / 48hrs', desc: 'Call → SMS → Email sequence for new leads' },
    { name: 'After-hours routing', status: 'Regal AI', desc: 'AI agents handle intake outside business hours' },
    { name: 'Quality threshold', status: '7.0+ score', desc: 'Leads below threshold routed to senior intake' },
    { name: 'Duplicate detection', status: 'Active', desc: 'Cross-referencing phone, email, and case details' },
  ],
  recommendations: [
    'Increase Intaker traffic allocation to capture more qualified leads',
    'Enable "smart scheduling" to optimize agent availability during peak hours (10-2 PM)',
    'Add Spanish-language Intaker flow — 18% of missed leads are Spanish-speaking',
  ],
};

const campaignData = {
  title: 'Google Ads Campaign Review',
  summary: 'Quality Score dropped from 9.1 to 8.5 over the past 2 weeks. Primary drivers: landing page experience score decreased and ad relevance is slipping on 3 keyword groups.',
  metrics: [
    { label: 'Quality Score', value: '8.5', trend: '-0.6', good: false },
    { label: 'CTR', value: '3.2%', trend: '-0.4%', good: false },
    { label: 'Conversion Rate', value: '4.4%', trend: '-1.1%', good: false },
    { label: 'Weekly Leads', value: '142', trend: '-10%', good: false },
  ],
  campaigns: [
    { name: 'PI - Auto Accidents', leads: 62, quality: 8.8, status: 'Active' },
    { name: 'PI - Slip & Fall', leads: 28, quality: 7.9, status: 'Needs Review' },
    { name: 'Employment - Wrongful Term', leads: 24, quality: 8.2, status: 'Active' },
    { name: 'Employment - Wage Theft', leads: 18, quality: 9.1, status: 'Active' },
    { name: 'Brand - Wilshire Law', leads: 10, quality: 9.5, status: 'Active' },
  ],
  issues: [
    { severity: 'high', issue: 'Landing page load time increased to 4.2s (was 2.1s)', fix: 'Optimize hero image and defer non-critical scripts' },
    { severity: 'high', issue: '"Slip & Fall" ad group relevance score dropped to 7.9', fix: 'Update ad copy to match updated landing page content' },
    { severity: 'medium', issue: 'Negative keyword list not updated in 3 weeks', fix: 'Review search terms report and add irrelevant queries' },
    { severity: 'low', issue: 'Brand campaign overlap with organic listings', fix: 'Consider reducing brand bid during high organic ranking periods' },
  ],
};

const callsData = {
  title: 'Call Conversion Analysis',
  summary: 'Phone leads are converting at 28% this week — a 9% spike above the 19% rolling average. The increase correlates with the new Regal AI pre-qualification flow and extended Monday hours.',
  metrics: [
    { label: 'Conversion Rate', value: '28%', trend: '+9%', good: true },
    { label: 'Calls This Week', value: '78', trend: '+4%', good: true },
    { label: 'Avg Duration', value: '6:42', trend: '+1:15', good: true },
    { label: 'Missed Rate', value: '8.2%', trend: '-3%', good: true },
    { label: 'AI Contained', value: '62%', trend: '+11%', good: true },
    { label: 'Callback Rate', value: '94%', trend: '+6%', good: true },
  ],
  topPerformers: [
    { agent: 'Maria Gonzalez', calls: 18, conversion: '38%', avgTime: '4:32' },
    { agent: 'Marcus Johnson', calls: 16, conversion: '31%', avgTime: '4:55' },
    { agent: 'Regal Agent Alpha', calls: 14, conversion: '29%', avgTime: '3:10' },
    { agent: 'Rachel Torres', calls: 5, conversion: '40%', avgTime: '7:10' },
  ],
  insights: [
    'Monday extended hours (7 AM start) captured 12 additional leads that would have gone to voicemail',
    'AI pre-qualification reduced avg human handle time by 1:45 — agents get pre-screened warm transfers',
    'Spanish-language calls converting at 35% (vs 28% overall) — consider expanding bilingual capacity',
    'Peak conversion window: 10:00 AM – 12:30 PM (34% conversion rate during this period)',
  ],
};

export function InsightActionDrawer({ open, onClose, actionType }: Props) {
  if (!open || !actionType) return null;

  const data = actionType === 'intaker' ? intakerData : actionType === 'campaign' ? campaignData : callsData;
  const IconMap = { intaker: Settings, campaign: Target, calls: Phone };
  const MainIcon = IconMap[actionType];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[var(--surface)] border-l border-[var(--border)] shadow-2xl animate-slide-in-right overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[var(--surface)] border-b border-[var(--border)] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[var(--primary)]/10">
              <MainIcon size={18} className="text-[var(--primary)]" />
            </div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">{data.title}</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Summary */}
          <div className="p-4 rounded-xl bg-[var(--primary)]/5 border border-[var(--primary)]/20">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} className="text-[var(--primary)]" />
              <span className="text-xs font-semibold text-[var(--primary)]">AI Summary</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{data.summary}</p>
          </div>

          {/* Metrics Grid */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Key Metrics</h3>
            <div className="grid grid-cols-2 gap-2">
              {data.metrics.map(m => (
                <div key={m.label} className="p-3 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)]">
                  <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wide">{m.label}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-base font-bold text-[var(--text-primary)]">{m.value}</span>
                    <span className={`flex items-center gap-0.5 text-[10px] font-medium ${m.good ? 'text-emerald-500' : 'text-red-500'}`}>
                      {m.good ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                      {m.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action-specific content */}
          {actionType === 'intaker' && (
            <>
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Current Settings</h3>
                <div className="space-y-2">
                  {intakerData.settings.map(s => (
                    <div key={s.name} className="flex items-center justify-between p-3 rounded-lg bg-[var(--surface-hover)]">
                      <div>
                        <p className="text-xs font-medium text-[var(--text-primary)]">{s.name}</p>
                        <p className="text-[10px] text-[var(--text-muted)]">{s.desc}</p>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500">{s.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Recommendations</h3>
                <div className="space-y-2">
                  {intakerData.recommendations.map((r, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-[var(--primary)]/5 border border-[var(--primary)]/20">
                      <CheckCircle2 size={12} className="text-[var(--primary)] mt-0.5 shrink-0" />
                      <p className="text-xs text-[var(--text-secondary)]">{r}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {actionType === 'campaign' && (
            <>
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Campaign Breakdown</h3>
                <div className="space-y-2">
                  {campaignData.campaigns.map(c => (
                    <div key={c.name} className="p-3 rounded-lg bg-[var(--surface-hover)] flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-[var(--text-primary)]">{c.name}</p>
                        <p className="text-[10px] text-[var(--text-muted)]">{c.leads} leads · Quality {c.quality}</p>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-1 rounded-md ${
                        c.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                      }`}>{c.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Issues Found</h3>
                <div className="space-y-2">
                  {campaignData.issues.map((issue, i) => (
                    <div key={i} className={`p-3 rounded-lg border ${
                      issue.severity === 'high' ? 'bg-red-500/5 border-red-500/20' :
                      issue.severity === 'medium' ? 'bg-amber-500/5 border-amber-500/20' :
                      'bg-blue-500/5 border-blue-500/20'
                    }`}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <AlertTriangle size={10} className={
                          issue.severity === 'high' ? 'text-red-500' : issue.severity === 'medium' ? 'text-amber-500' : 'text-blue-500'
                        } />
                        <span className={`text-[9px] font-semibold uppercase ${
                          issue.severity === 'high' ? 'text-red-500' : issue.severity === 'medium' ? 'text-amber-500' : 'text-blue-500'
                        }`}>{issue.severity}</span>
                      </div>
                      <p className="text-xs text-[var(--text-primary)]">{issue.issue}</p>
                      <p className="text-[10px] text-[var(--text-muted)] mt-1">Fix: {issue.fix}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {actionType === 'calls' && (
            <>
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Top Performers</h3>
                <div className="space-y-2">
                  {callsData.topPerformers.map(p => (
                    <div key={p.agent} className="p-3 rounded-lg bg-[var(--surface-hover)] flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-[var(--text-primary)]">{p.agent}</p>
                        <p className="text-[10px] text-[var(--text-muted)]">{p.calls} calls · Avg {p.avgTime}</p>
                      </div>
                      <span className="text-xs font-bold text-emerald-500">{p.conversion}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Key Insights</h3>
                <div className="space-y-2">
                  {callsData.insights.map((insight, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-[var(--primary)]/5 border border-[var(--primary)]/20">
                      <BarChart3 size={12} className="text-[var(--primary)] mt-0.5 shrink-0" />
                      <p className="text-xs text-[var(--text-secondary)]">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
