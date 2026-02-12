import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './Sidebar';
import { Header } from './Header';

export function Layout() {
  // TODO: Get user from auth context
  const userName = 'John Doe';
  const userRole = 'admin';

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[var(--background)]">
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-hidden min-w-0">
          <Header userName={userName} userRole={userRole} />
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
