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
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6D7175] dark:text-[#A5A7AB]" />
      <input
        ref={ref}
        type="search"
        aria-label="Search"
        placeholder="Search"
        className={cn(
          'h-9 w-full rounded-md border border-[#E1E3E5] bg-white pl-9 pr-10 text-sm text-[#111213] outline-none',
          'placeholder:text-[#6D7175] focus:border-[#2C6ECB] focus:ring-2 focus:ring-[#79A6E8]',
          'dark:border-[#3A3B3D] dark:bg-[#202223] dark:text-[#E3E3E3] dark:placeholder:text-[#A5A7AB] dark:focus:ring-[#3E6FB6]',
          className,
        )}
        {...props}
      />
      <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-[#E1E3E5] bg-[#F6F6F7] px-1 text-[10px] text-[#6D7175] md:block dark:border-[#3A3B3D] dark:bg-[#2C2D2F] dark:text-[#A5A7AB]">
        ⌘K
      </kbd>
    </div>
  );
}

