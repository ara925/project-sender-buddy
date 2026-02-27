import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Calendar, Tag, User, ExternalLink, Loader2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge, Button } from '@/components/ui';
import { formatDate, formatDateTime } from '@/lib/utils';
import { ActivityTimeline } from './ActivityTimeline';
import { supabase } from '@/integrations/supabase/client';
import type { Lead, LeadActivity } from '@/types';

const statusColors: Record<string, 'default' | 'secondary' | 'success' | 'destructive' | 'warning' | 'info'> = {
  new: 'info',
  contacted: 'warning',
  qualified: 'success',
  retained: 'success',
  lost: 'destructive',
  duplicate: 'secondary',
};

const sourceLabels: Record<string, string> = {
  intaker: 'Intaker',
  forms: 'Web Forms',
  callrail: 'CallRail',
  manual: 'Manual',
};

interface LeadDetailDrawerProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeadDetailDrawer({ lead, open, onOpenChange }: LeadDetailDrawerProps) {
  const [activities, setActivities] = useState<LeadActivity[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(false);

  useEffect(() => {
    if (!lead || !open) return;
    
    async function fetchActivities() {
      setLoadingActivities(true);
      const { data, error } = await supabase
        .from('lead_activities')
        .select('*')
        .eq('lead_id', lead!.id)
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setActivities(data as unknown as LeadActivity[]);
      }
      setLoadingActivities(false);
    }
    fetchActivities();
  }, [lead?.id, open]);

  if (!lead) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg md:max-w-xl overflow-y-auto bg-[var(--surface)] border-l border-[var(--border)] p-0">
        <div className="sticky top-0 z-20 bg-[var(--surface)] border-b border-[var(--border)] p-6 pb-4">
          <SheetHeader>
            <div className="flex items-start justify-between gap-3 pr-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-semibold text-lg shrink-0">
                  {lead.first_name[0]}{lead.last_name[0]}
                </div>
                <div>
                  <SheetTitle className="text-xl text-[var(--text-primary)]">
                    {lead.first_name} {lead.last_name}
                  </SheetTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={statusColors[lead.status] || 'secondary'} className="capitalize">
                      {lead.status}
                    </Badge>
                    <Badge variant="outline" className="text-[var(--text-secondary)] border-[var(--border)]">
                      {sourceLabels[lead.source] || lead.source}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </SheetHeader>

          {/* Contact info */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {lead.email && (
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <Mail size={14} className="text-[var(--text-muted)] shrink-0" />
                <span className="truncate">{lead.email}</span>
              </div>
            )}
            {lead.phone && (
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <Phone size={14} className="text-[var(--text-muted)] shrink-0" />
                <span>{lead.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <Calendar size={14} className="text-[var(--text-muted)] shrink-0" />
              <span>Created {formatDate(lead.created_at)}</span>
            </div>
            {lead.case_type && (
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <Tag size={14} className="text-[var(--text-muted)] shrink-0" />
                <span>{lead.case_type}</span>
              </div>
            )}
            {lead.assigned_to && (
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <User size={14} className="text-[var(--text-muted)] shrink-0" />
                <span>{lead.assigned_to}</span>
              </div>
            )}
            {lead.litify_id && (
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <ExternalLink size={14} className="text-[var(--text-muted)] shrink-0" />
                <span className="truncate">Litify: {lead.litify_id}</span>
              </div>
            )}
          </div>

          {lead.notes && (
            <div className="mt-3 p-2.5 rounded-md bg-[var(--surface-active)] border border-[var(--border)]">
              <p className="text-xs text-[var(--text-secondary)]">{lead.notes}</p>
            </div>
          )}
        </div>

        {/* Activity timeline */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">
              Activity Timeline
            </h3>
            <span className="text-xs text-[var(--text-muted)]">
              {loadingActivities ? '...' : `${activities.length} event${activities.length !== 1 ? 's' : ''}`}
            </span>
          </div>
          {loadingActivities ? (
            <div className="flex items-center justify-center py-8 gap-2 text-[var(--text-muted)]">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-sm">Loading activities...</span>
            </div>
          ) : activities.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)] text-center py-8">No activities recorded yet.</p>
          ) : (
            <ActivityTimeline activities={activities} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
