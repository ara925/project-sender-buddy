import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { capitalize } from '@/lib/utils';

interface HeaderProps {
  userName: string;
  userRole: string;
}

export function Header({ userName, userRole }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-6">
      <div className="flex items-center gap-3">
        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)]">{userName}</p>
          <p className="text-xs text-[var(--text-muted)]">{capitalize(userRole)}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ThemeSwitcher />
      </div>
    </header>
  );
}
