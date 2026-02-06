import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Phone,
  FileText,
  Shield,
  Activity,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
  Lightbulb,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

interface SidebarProps {
  userRole?: 'admin' | 'manager' | 'agent' | 'viewer';
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Lightbulb, label: 'Insights', href: '/insights' },
  { icon: Users, label: 'Leads', href: '/leads' },
  { icon: Phone, label: 'Calls', href: '/calls' },
  { icon: FileText, label: 'Reports', href: '/reports' },
  { icon: Activity, label: 'System Health', href: '/system-integrity', adminOnly: true },
  { icon: Shield, label: 'Admin', href: '/admin', adminOnly: true },
];

export function Sidebar({ userRole = 'agent' }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isAdmin = userRole === 'admin' || userRole === 'manager';

  return (
    <aside
      className={cn(
        'flex h-screen flex-col border-r border-[var(--border)] bg-[var(--surface)] transition-all duration-300 relative z-50',
        collapsed ? 'w-[70px]' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className={`flex h-16 items-center ${collapsed ? 'justify-center' : 'px-5'} border-b border-[var(--border)]`}>
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)] text-white shadow-sm">
              <Zap size={18} className="fill-current" />
            </div>
            <span className="text-lg font-bold text-[var(--text-primary)] tracking-tight">Wilshire Hub</span>
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)] text-white shadow-sm">
            <Zap size={18} className="fill-current" />
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={`absolute -right-3 top-8 h-6 w-6 rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-all ${collapsed ? 'hidden' : 'flex'}`}
        >
          <ChevronLeft size={14} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto custom-scroll" role="navigation" aria-label="Main">
        {navItems.map((item) => {
          if (item.adminOnly && !isAdmin) return null;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200',
                collapsed && 'justify-center px-2',
                isActive
                  ? 'bg-[var(--surface-hover)] text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]'
              )}
              aria-current={isActive ? 'page' : undefined}
              title={collapsed ? item.label : undefined}
            >
              {isActive && (
                <span
                  className="pointer-events-none absolute left-0 top-2 bottom-2 w-1 rounded-r bg-[var(--primary)]"
                  aria-hidden="true"
                />
              )}
              <item.icon
                size={20}
                className={isActive ? 'text-[var(--primary)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-primary)]'}
                strokeWidth={isActive ? 2.5 : 2}
              />

              {!collapsed && (
                <span>{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Expand button when collapsed */}
      {collapsed && (
        <div className="p-3 border-t border-[var(--border)] flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(false)}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-[var(--border)] p-4 bg-[var(--surface)]">
        <button
          className={cn(
            'flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-[var(--text-secondary)] transition-all hover:text-[var(--text-primary)] group'
          )}
        >
          <LogOut size={18} className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)]" />
          {!collapsed && (
            <span>Sign Out</span>
          )}
        </button>
      </div>
    </aside>
  );
}
