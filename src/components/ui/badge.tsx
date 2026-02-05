import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info' | 'purple';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors gap-2',
          variant === 'default' && 'bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border)]',
          variant === 'secondary' && 'bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border)]',
          variant === 'destructive' && 'bg-[rgba(239,68,68,0.15)] text-[var(--error)] border border-[rgba(239,68,68,0.3)]',
          variant === 'outline' && 'border border-[var(--border-strong)] text-[var(--text-secondary)]',
          variant === 'success' && 'bg-[rgba(16,185,129,0.15)] text-[var(--success)] border border-[rgba(16,185,129,0.3)]',
          variant === 'warning' && 'bg-[rgba(245,158,11,0.15)] text-[var(--warning)] border border-[rgba(245,158,11,0.3)]',
          variant === 'info' && 'bg-[rgba(59,130,246,0.15)] text-[var(--info)] border border-[rgba(59,130,246,0.3)]',
          variant === 'purple' && 'bg-[rgba(139,92,246,0.15)] text-[var(--accent-purple)] border border-[rgba(139,92,246,0.3)]',
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge };
