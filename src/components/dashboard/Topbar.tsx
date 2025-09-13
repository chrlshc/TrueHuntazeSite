'use client';

import { Button } from '@/components/ui/button';
import PeriodSelector from './PeriodSelector';
import { Plus, Sparkles, Menu } from 'lucide-react';

export default function Topbar({
  onToggleSidebar,
}: {
  onToggleSidebar?: () => void;
}) {
  return (
    <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-zinc-200 bg-white/70 px-3 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/40">
      <div className="flex items-center gap-2">
        <button
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation"
       >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <PeriodSelector />
        <Button variant="secondary">
          <Sparkles className="mr-2 h-4 w-4" /> Generate content
        </Button>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create campaign
        </Button>
      </div>
    </div>
  );
}

