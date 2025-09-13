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
    <div className="fixed top-0 left-0 right-0 z-40 flex h-14 items-center gap-3 border-b border-[#E1E3E5] bg-[#FFFFFF]/95 px-3 backdrop-blur-md dark:border-[#3A3B3D] dark:bg-[#202223]/80">
      <div className="flex items-center gap-2 shrink-0">
        <button
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-[#F6F6F7] dark:hover:bg-[#2C2D2F]"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="text-sm font-medium text-[#111213] dark:text-[#E3E3E3]">Dashboard</span>
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
          className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#E1E3E5] hover:bg-[#F6F6F7] dark:border-[#3A3B3D] dark:hover:bg-[#2C2D2F]"
          aria-label="Toggle theme"
        >
          <Sun className="hidden h-4 w-4 dark:block" />
          <Moon className="h-4 w-4 dark:hidden" />
        </button>
      </div>
    </div>
  );
}
