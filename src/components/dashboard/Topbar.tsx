'use client';

import { Menu, Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { initTheme, setTheme } from '@/lib/theme';
import SearchInput from '@/components/ui/search-input';

export default function Topbar({
  onToggleSidebar,
  userName = 'Creator',
}: {
  onToggleSidebar?: () => void;
  userName?: string;
}) {
  const [mode, setMode] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    initTheme();
  }, []);

  function cycleTheme() {
    const next = mode === 'system' ? 'light' : mode === 'light' ? 'dark' : 'system';
    setMode(next);
    setTheme(next);
  }

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur-md">
      <div className="grid h-14 grid-cols-3 items-center gap-3 px-3">
        {/* Left: Burger + Brand */}
        <div className="flex items-center gap-2">
          <button
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-surfaceMuted"
            onClick={onToggleSidebar}
            aria-label="Toggle navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-sm font-semibold tracking-tight text-ink">Huntaze</span>
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex justify-center">
          <div className="w-full max-w-md"><SearchInput /></div>
        </div>

        {/* Right: Theme toggle + User name */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={cycleTheme}
            title={`Theme: ${mode}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border hover:bg-surfaceMuted"
            aria-label="Toggle theme"
          >
            <Sun className="hidden h-4 w-4 dark:block" />
            <Moon className="h-4 w-4 dark:hidden" />
          </button>
          <div className="text-sm font-medium text-ink">{userName}</div>
        </div>
      </div>
    </div>
  );
}
