'use client';

import { Button } from '@/components/ui/button';
import PeriodSelector from './PeriodSelector';
import { Plus, Sparkles, Menu, Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { initTheme, setTheme } from '@/lib/theme';
import SearchInput from '@/components/ui/search-input';

export default function Topbar({
  onToggleSidebar,
}: {
  onToggleSidebar?: () => void;
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
    <div className="fixed top-0 left-0 right-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-surface/95 px-3 backdrop-blur-md">
      <div className="flex items-center gap-2 shrink-0">
        <button
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-surfaceMuted"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="text-sm font-medium text-ink">Dashboard</span>
      </div>
      <div className="hidden md:flex w-full max-w-md">
        <SearchInput />
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <PeriodSelector />
        <Button variant="secondary">
          <Sparkles className="mr-2 h-4 w-4" /> Generate content
        </Button>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create campaign
        </Button>
        <button
          onClick={cycleTheme}
          title={`Theme: ${mode}`}
          className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-md border border-border hover:bg-surfaceMuted"
          aria-label="Toggle theme"
        >
          <Sun className="hidden h-4 w-4 dark:block" />
          <Moon className="h-4 w-4 dark:hidden" />
        </button>
      </div>
    </div>
  );
}
