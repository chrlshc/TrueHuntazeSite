'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function SearchInput({ className, ...props }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    window.addEventListener('keydown', onDown);
    return () => window.removeEventListener('keydown', onDown);
  }, []);

  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-inkSubdued" />
      <input
        ref={ref}
        type="search"
        aria-label="Search"
        placeholder="Search"
        className={cn(
          'h-9 w-full rounded-md border border-border bg-surface pl-9 pr-10 text-sm text-ink outline-none',
          'placeholder:text-inkSubdued focus:border-accent focus:ring-2 focus:ring-accentRing',
          className,
        )}
        {...props}
      />
      <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-surfaceMuted px-1 text-[10px] text-inkSubdued md:block">
        ⌘K
      </kbd>
    </div>
  );
}
