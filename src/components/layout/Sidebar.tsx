import { Activity, Search, Shield, LogOut } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavLink } from '@/components/NavLink';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';

const dashboardTabs = [
  { title: 'Systems Health', url: '/?tab=systems', icon: Activity },
  { title: 'Honeypot Status', url: '/?tab=honeypot', icon: Shield },
];

export function AppSidebar() {
  const location = useLocation();
  const { signOut } = useAuth();
  // Determine active tab from URL params
  const params = new URLSearchParams(location.search);
  const activeTab = params.get('tab') || 'systems';

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardTabs.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeTab === item.title.toLowerCase().split(' ')[0]}
                  >
                    <NavLink to={item.url} className="hover:bg-[var(--surface-hover)]">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sign out button at bottom */}
      <div className="border-t border-[var(--border)] p-4">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          onClick={() => signOut()}
        >
          <LogOut size={16} />
          <span className="ml-2">Sign Out</span>
        </Button>
      </div>
    </Sidebar>
  );
}
