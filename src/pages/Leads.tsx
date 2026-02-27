import { useState, useEffect } from 'react';
import { Search, Filter, MoreHorizontal, FileDown, Plus, Shield, LayoutList, Loader2 } from 'lucide-react';
import { Button, Badge, Select } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { LeadDetailDrawer } from '@/components/leads/LeadDetailDrawer';
import { LeadsOverview } from '@/components/leads/LeadsOverview';
import { InvestigationPanel } from '@/components/leads/InvestigationPanel';
import { investigations } from '@/data/mock-investigations';
import { supabase } from '@/integrations/supabase/client';
import type { Lead } from '@/types';

const getStatusColor = (status: string): 'default' | 'secondary' | 'success' | 'destructive' | 'warning' | 'info' => {
  switch (status) {
    case 'new': return 'info';
    case 'contacted': return 'warning';
    case 'qualified': return 'success';
    case 'retained': return 'success';
    case 'lost': return 'destructive';
    default: return 'secondary';
  }
};

export function Leads() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'investigations'>('overview');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      setLoading(true);
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setLeads(data as unknown as Lead[]);
      }
      setLoading(false);
    }
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.first_name.toLowerCase().includes(search.toLowerCase()) ||
      lead.last_name.toLowerCase().includes(search.toLowerCase()) ||
      (lead.email ?? '').toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? lead.status === statusFilter : true;
    const matchesSource = sourceFilter ? lead.source === sourceFilter : true;
    return matchesSearch && matchesStatus && matchesSource;
  });

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setDrawerOpen(true);
  };

  const openInvestigations = investigations.filter(i => i.status === 'open' || i.status === 'reviewing').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Leads</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage and track your potential clients</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-[var(--surface)]">
            <FileDown size={16} />
            Export
          </Button>
          <Button className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white">
            <Plus size={16} />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-1 p-1 rounded-lg bg-[var(--surface)] border border-[var(--border)] w-fit">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'overview'
              ? 'bg-[var(--surface-hover)] text-[var(--text-primary)] shadow-sm'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
        >
          <LayoutList size={14} />
          Overview & Leads
        </button>
        <button
          onClick={() => setActiveTab('investigations')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${activeTab === 'investigations'
              ? 'bg-[var(--surface-hover)] text-[var(--text-primary)] shadow-sm'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
        >
          <Shield size={14} />
          Investigations
          {openInvestigations > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
              {openInvestigations}
            </span>
          )}
        </button>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Overview KPIs */}
          <LeadsOverview
            totalLeads={leads.length}
            newLeads={leads.filter(l => l.status === 'new').length}
            qualifiedLeads={leads.filter(l => l.status === 'qualified').length}
            retainedLeads={leads.filter(l => l.status === 'retained').length}
            lostLeads={leads.filter(l => l.status === 'lost').length}
            openInvestigations={openInvestigations}
          />

          {/* Search & Filters */}
          <div className="card p-4 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={18} />
                <input
                  type="text"
                  placeholder="Search leads by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all placeholder:text-[var(--text-muted)]"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={`${showFilters ? 'bg-[var(--surface-active)]' : ''}`}
              >
                <Filter size={18} />
                Filters
              </Button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--border)] animate-in slide-in-from-top-2">
                <Select
                  label="Status"
                  options={[
                    { value: '', label: 'All Statuses' },
                    { value: 'new', label: 'New' },
                    { value: 'contacted', label: 'Contacted' },
                    { value: 'qualified', label: 'Qualified' },
                    { value: 'retained', label: 'Retained' },
                    { value: 'duplicate', label: 'Duplicate' },
                    { value: 'lost', label: 'Lost' },
                  ]}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                />
                <Select
                  label="Source"
                  options={[
                    { value: '', label: 'All Sources' },
                    { value: 'intaker', label: 'Intaker' },
                    { value: 'forms', label: 'Forms' },
                    { value: 'callrail', label: 'CallRail' },
                    { value: 'manual', label: 'Manual' },
                  ]}
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Leads List */}
          <div className="bg-[var(--surface)] border-t-[4px] border-blue-500">
            <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-center bg-[var(--surface-active)]/20">
              <h3 className="font-bold text-[var(--text-primary)]">Active Leads</h3>
              <span className="text-xs font-mono text-[var(--text-muted)]">Live Data</span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12 gap-2 text-[var(--text-muted)]">
                <Loader2 size={18} className="animate-spin" />
                <span className="text-sm">Loading leads...</span>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="text-center py-12 text-[var(--text-muted)] text-sm">
                No leads found.
              </div>
            ) : (
              <div className="divide-y divide-[var(--border)]">
                {filteredLeads.map((lead) => {
                  const leadInvestigation = investigations.find(
                    inv => inv.leadName === `${lead.first_name} ${lead.last_name}` && (inv.status === 'open' || inv.status === 'reviewing' || inv.status === 'confirmed')
                  );
                  return (
                    <div
                      key={lead.id}
                      className={`p-4 hover:bg-[var(--surface-hover)] transition-colors cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${leadInvestigation ? 'bg-red-500/5' : ''}`}
                      onClick={() => handleLeadClick(lead)}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${leadInvestigation ? 'bg-red-500 text-white' : 'bg-[var(--surface-active)] text-[var(--text-secondary)]'}`}>
                          {lead.first_name[0]}{lead.last_name[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-[var(--text-primary)]">{lead.first_name} {lead.last_name}</p>
                            {leadInvestigation && <Shield size={14} className="text-red-500 animate-pulse" />}
                            <Badge variant="outline" className="text-[10px] h-5 px-1.5 border-[var(--border-strong)] text-[var(--text-muted)] font-normal uppercase tracking-wider">
                              {lead.source}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-xs text-[var(--text-secondary)]">
                            <span>{lead.email}</span>
                            <span className="text-[var(--border-strong)]">•</span>
                            <span className="font-mono">{lead.phone}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-6 min-w-[200px]">
                        <div className="text-right">
                          <Badge variant={getStatusColor(lead.status)} className="uppercase tracking-wider text-[10px] font-bold px-2 py-0.5">
                            {lead.status}
                          </Badge>
                          <p className="text-[10px] text-[var(--text-muted)] mt-1.5">{formatDate(lead.created_at)}</p>
                        </div>

                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[var(--surface-active)]">
                            <MoreHorizontal size={16} className="text-[var(--text-secondary)]" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Footer */}
            <div className="px-6 py-4 border-t border-[var(--border)] flex items-center justify-between bg-[var(--surface-active)]/10">
              <p className="text-xs text-[var(--text-muted)]">Showing <strong className="text-[var(--text-primary)]">{filteredLeads.length}</strong> of {leads.length}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 text-xs bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)]" disabled>Previous</Button>
                <Button variant="outline" size="sm" className="h-8 text-xs bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)]" disabled>Next</Button>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'investigations' && <InvestigationPanel />}

      <LeadDetailDrawer
        lead={selectedLead}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </div>
  );
}
