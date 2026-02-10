import { useState } from 'react';
import { Search, Filter, MoreHorizontal, FileDown, Plus, Shield, LayoutList } from 'lucide-react';
import { Button, Badge, Select } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { LeadDetailDrawer } from '@/components/leads/LeadDetailDrawer';
import { LeadsOverview } from '@/components/leads/LeadsOverview';
import { InvestigationPanel } from '@/components/leads/InvestigationPanel';
import { investigations } from '@/data/mock-investigations';
import type { Lead } from '@/types';

const mockLeads: Lead[] = [
  { id: '1', source: 'forms', external_id: null, first_name: 'James', last_name: 'Wilson', email: 'james.w@example.com', phone: '555-0123', status: 'new', assigned_to: null, case_type: null, notes: 'Interested in PI case evaluation', litify_id: null, google_click_id: null, created_at: '2024-02-05T10:30:00Z', updated_at: '2024-02-05T10:30:00Z' },
  { id: '2', source: 'intaker', external_id: null, first_name: 'Sarah', last_name: 'Parker', email: 'sarah.p@example.com', phone: '555-0124', status: 'contacted', assigned_to: null, case_type: null, notes: 'Left voicemail', litify_id: null, google_click_id: null, created_at: '2024-02-05T09:15:00Z', updated_at: '2024-02-05T09:45:00Z' },
  { id: '3', source: 'manual', external_id: null, first_name: 'Michael', last_name: 'Johnson', email: 'm.johnson@example.com', phone: '555-0125', status: 'qualified', assigned_to: null, case_type: null, notes: 'Strong case potential', litify_id: null, google_click_id: null, created_at: '2024-02-04T16:20:00Z', updated_at: '2024-02-05T11:00:00Z' },
  { id: '4', source: 'callrail', external_id: null, first_name: 'Emily', last_name: 'Davis', email: 'emily.d@example.com', phone: '555-0126', status: 'new', assigned_to: null, case_type: null, notes: 'Called in', litify_id: null, google_click_id: null, created_at: '2024-02-03T10:00:00Z', updated_at: '2024-02-03T10:00:00Z' },
  { id: '5', source: 'intaker', external_id: null, first_name: 'Robert', last_name: 'Brown', email: 'r.brown@example.com', phone: '555-0127', status: 'lost', assigned_to: null, case_type: null, notes: 'Not interested', litify_id: null, google_click_id: null, created_at: '2024-02-04T11:30:00Z', updated_at: '2024-02-05T09:00:00Z' },
  { id: '6', source: 'manual', external_id: null, first_name: 'Jennifer', last_name: 'Smith', email: 'j.smith@example.com', phone: '555-0128', status: 'retained', assigned_to: null, case_type: null, notes: 'Signed retainer', litify_id: null, google_click_id: null, created_at: '2024-02-03T15:10:00Z', updated_at: '2024-02-05T10:15:00Z' },
  { id: '7', source: 'forms', external_id: null, first_name: 'David', last_name: 'Miller', email: 'd.miller@example.com', phone: '555-0129', status: 'contacted', assigned_to: null, case_type: null, notes: 'Follow up notes', litify_id: null, google_click_id: null, created_at: '2024-02-03T13:20:00Z', updated_at: '2024-02-04T16:00:00Z' },
  { id: '8', source: 'callrail', external_id: null, first_name: 'Lisa', last_name: 'Anderson', email: 'l.anderson@example.com', phone: '555-0130', status: 'new', assigned_to: null, case_type: null, notes: 'Called in', litify_id: null, google_click_id: null, created_at: '2024-02-03T10:00:00Z', updated_at: '2024-02-03T10:00:00Z' },
  { id: '9', source: 'intaker', external_id: null, first_name: 'Kevin', last_name: 'White', email: 'k.white@example.com', phone: '555-0131', status: 'qualified', assigned_to: null, case_type: null, notes: 'Medical records needed', litify_id: null, google_click_id: null, created_at: '2024-02-02T16:45:00Z', updated_at: '2024-02-04T11:30:00Z' },
];

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

  const filteredLeads = mockLeads.filter(lead => {
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
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'overview'
              ? 'bg-[var(--surface-hover)] text-[var(--text-primary)] shadow-sm'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          <LayoutList size={14} />
          Overview & Leads
        </button>
        <button
          onClick={() => setActiveTab('investigations')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
            activeTab === 'investigations'
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
            totalLeads={mockLeads.length}
            newLeads={mockLeads.filter(l => l.status === 'new').length}
            qualifiedLeads={mockLeads.filter(l => l.status === 'qualified').length}
            retainedLeads={mockLeads.filter(l => l.status === 'retained').length}
            lostLeads={mockLeads.filter(l => l.status === 'lost').length}
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

          {/* Leads Table */}
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Source</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => {
                    const leadInvestigation = investigations.find(
                      inv => inv.leadName === `${lead.first_name} ${lead.last_name}` && (inv.status === 'open' || inv.status === 'reviewing' || inv.status === 'confirmed')
                    );
                    return (
                      <tr
                        key={lead.id}
                        className={`group cursor-pointer ${leadInvestigation ? 'bg-red-500/5' : ''}`}
                        onClick={() => handleLeadClick(lead)}
                      >
                        <td>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-[var(--text-primary)]">{lead.first_name} {lead.last_name}</p>
                            {leadInvestigation && (
                              <span title="Under investigation">
                                <Shield size={12} className="text-red-500" />
                              </span>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="text-sm">
                            <p className="text-[var(--text-secondary)]">{lead.email}</p>
                            <p className="text-[var(--text-muted)]">{lead.phone}</p>
                          </div>
                        </td>
                        <td>
                          <Badge variant="outline" className="text-[var(--text-secondary)] border-[var(--border)]">
                            {lead.source}
                          </Badge>
                        </td>
                        <td>
                          <Badge variant={getStatusColor(lead.status)} className="capitalize">
                            {lead.status}
                          </Badge>
                        </td>
                        <td className="text-[var(--text-secondary)]">
                          {formatDate(lead.created_at)}
                        </td>
                        <td>
                          <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveTab('investigations');
                              }}
                              title="Investigate"
                              className="text-red-500 hover:bg-red-500/10"
                            >
                              <Shield size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <MoreHorizontal size={18} className="text-[var(--text-secondary)]" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-3 bg-[var(--surface)]">
              <p className="text-sm text-[var(--text-secondary)]">
                Showing <span className="font-medium text-[var(--text-primary)]">{filteredLeads.length}</span> of <span className="font-medium text-[var(--text-primary)]">{mockLeads.length}</span> leads
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
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
