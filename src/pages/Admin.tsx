import { useState } from 'react';
import { Plus, Edit, Trash2, Shield, Settings, Users as UsersIcon } from 'lucide-react';
import { Button, Badge, Input, Select } from '@/components/ui';
import type { User } from '@/types';

const mockUsers: User[] = [
  { id: '1', email: 'admin@wilshirelaw.com', name: 'John Admin', role: 'admin', is_active: true, created_at: '2024-01-01T00:00:00Z' },
  { id: '2', email: 'manager@wilshirelaw.com', name: 'Sarah Manager', role: 'manager', is_active: true, created_at: '2024-01-02T00:00:00Z' },
  { id: '3', email: 'agent1@wilshirelaw.com', name: 'Mike Agent_1', role: 'agent', is_active: true, created_at: '2024-01-03T00:00:00Z' },
  { id: '4', email: 'agent2@wilshirelaw.com', name: 'Emily Agent_2', role: 'agent', is_active: true, created_at: '2024-01-04T00:00:00Z' },
  { id: '5', email: 'viewer@wilshirelaw.com', name: 'David Viewer', role: 'viewer', is_active: false, created_at: '2024-01-05T00:00:00Z' },
  { id: '6', email: 'agent3@wilshirelaw.com', name: 'Jessica Agent_3', role: 'agent', is_active: true, created_at: '2024-01-06T00:00:00Z' },
  { id: '7', email: 'agent4@wilshirelaw.com', name: 'Robert Agent_4', role: 'agent', is_active: true, created_at: '2024-01-07T00:00:00Z' },
  { id: '8', email: 'manager2@wilshirelaw.com', name: 'Lisa Manager_2', role: 'manager', is_active: true, created_at: '2024-01-08T00:00:00Z' },
  { id: '9', email: 'analyst@wilshirelaw.com', name: 'Tom Analyst', role: 'viewer', is_active: true, created_at: '2024-01-09T00:00:00Z' },
  { id: '10', email: 'agent5@wilshirelaw.com', name: 'Karen Agent_5', role: 'agent', is_active: false, created_at: '2024-01-10T00:00:00Z' },
];

type AdminTab = 'users' | 'settings' | 'integrations';

export function Admin() {
  const [activeTab, setActiveTab] = useState<AdminTab>('users');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Admin</h1>
        <p className="text-[var(--text-secondary)] mt-1">System administration and settings</p>
      </div>

      <div className="flex border-b border-[var(--border)] w-full">
        <button onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${activeTab === 'users' ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]'}`}>
          <UsersIcon size={16} /> Users
        </button>
        <button onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${activeTab === 'settings' ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]'}`}>
          <Settings size={16} /> Settings
        </button>
        <button onClick={() => setActiveTab('integrations')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${activeTab === 'integrations' ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]'}`}>
          <Shield size={16} /> Integrations
        </button>
      </div>

      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">User Management</h2>
              <p className="text-sm text-[var(--text-secondary)]">Manage system access and roles</p>
            </div>
            <Button className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white">
              <Plus size={18} /> Add User
            </Button>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-[var(--border)] bg-[var(--surface-active)]/20 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              <div className="col-span-5">User</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-3">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            <div className="divide-y divide-[var(--border)]">
              {mockUsers.map((user) => (
                <div key={user.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[var(--surface-hover)] transition-colors group">
                  <div className="col-span-5">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-md bg-[var(--surface-active)] flex items-center justify-center text-sm font-bold text-[var(--text-primary)] border border-[var(--border)]">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">{user.name}</p>
                        <p className="text-xs text-[var(--text-secondary)]">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Badge variant="outline" className="capitalize text-[var(--text-secondary)] border-[var(--border)] h-6">
                      {user.role}
                    </Badge>
                  </div>
                  <div className="col-span-3">
                    <div className={`flex items-center gap-2 text-xs font-medium ${user.is_active ? 'text-[var(--success)]' : 'text-[var(--error)]'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${user.is_active ? 'bg-[var(--success)]' : 'bg-[var(--error)]'}`} />
                      {user.is_active ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                  <div className="col-span-2 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"><Edit size={14} /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-500/10 hover:text-red-500"><Trash2 size={14} /></Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-6">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[var(--border)]">
              <div className="p-2 rounded-lg bg-[var(--surface-active)] text-[var(--text-primary)]"><Settings size={20} /></div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">General Settings</h3>
            </div>
            <div className="space-y-4">
              <Input label="Company Name" defaultValue="Wilshire Law Firm" />
              <Input label="Support Email" defaultValue="support@wilshirelaw.com" />
              <Select label="Timezone" options={[
                { value: 'EST', label: 'Eastern Time (EST)' },
                { value: 'CST', label: 'Central Time (CST)' },
                { value: 'PST', label: 'Pacific Time (PST)' },
              ]} defaultValue="EST" />
              <Button className="w-full bg-[var(--primary)] hover:bg-[var(--primary-hover)]">Save Settings</Button>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-6">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[var(--border)]">
              <div className="p-2 rounded-lg bg-[var(--surface-active)] text-[var(--text-primary)]"><UsersIcon size={20} /></div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Lead Routing Rules</h3>
            </div>
            <div className="space-y-4">
              <Select label="Default Assignment" options={[
                { value: 'round-robin', label: 'Round Robin' },
                { value: 'availability', label: 'By Availability' },
                { value: 'manual', label: 'Manual Assignment' },
              ]} defaultValue="round-robin" />
              <Select label="Fallback Agent" options={mockUsers.filter(u => u.role === 'agent' || u.role === 'manager').map(u => ({ value: u.id, label: u.name }))} />
              <Button className="w-full border-[var(--border)] hover:bg-[var(--surface-hover)]" variant="outline">Save Rules</Button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'integrations' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: 'Intaker', status: 'Connected', color: 'success', icon: '⚡' },
            { name: 'CallRail', status: 'Connected', color: 'success', icon: '📞' },
            { name: 'Litify', status: 'Not Connected', color: 'secondary', icon: '⚖️' },
            { name: 'Regal', status: 'Not Connected', color: 'secondary', icon: '👑' },
            { name: 'Google Ads', status: 'Not Connected', color: 'secondary', icon: '🎯' },
            { name: 'Zapier', status: 'Connected', color: 'success', icon: '🔗' },
          ].map((integration) => (
            <div key={integration.name} className={`relative overflow-hidden pl-4 pr-4 py-5 bg-[var(--surface)] border-l-4 hover:bg-[var(--surface-hover)] transition-colors cursor-pointer group ${integration.status === 'Connected' ? 'border-emerald-500' : 'border-[var(--border)]'}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="text-2xl">{integration.icon}</div>
                <Badge variant="outline" className={`${integration.status === 'Connected' ? 'border-emerald-500 text-emerald-500 bg-emerald-500/10' : 'border-[var(--border)] text-[var(--text-muted)]'}`}>{integration.status}</Badge>
              </div>
              <h4 className="font-bold text-[var(--text-primary)] mb-1 group-hover:text-[var(--primary)] transition-colors">{integration.name}</h4>
              <p className="text-xs text-[var(--text-secondary)] mb-4 h-8">Manage integration settings and data sync.</p>
              <Button variant="outline" size="sm" className="w-full border-[var(--border)] bg-transparent hover:bg-[var(--surface-active)] group-hover:border-[var(--primary)] group-hover:text-[var(--primary)]">Configure</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
