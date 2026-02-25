import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './Sidebar';
import { Header } from './Header';
import { useAuth } from '@/lib/auth-context';

export function Layout() {
  const { userName, userRole } = useAuth();
  const displayName = userName || 'User';
  const displayRole = userRole || 'agent';

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[var(--background)]">
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-hidden min-w-0">
          <Header userName={displayName} userRole={displayRole} />
          <main className="flex-1 overflow-auto app-background p-4 sm:p-6 lg:p-8">
            <div className="mx-auto w-full max-w-[1400px] min-w-0">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
