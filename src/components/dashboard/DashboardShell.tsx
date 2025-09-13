'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import SidebarNav from './SidebarNav';
import Topbar from './Topbar';

export default function DashboardShell({
  children,
}: React.PropsWithChildren) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Mobile overlay nav */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setOpen(false)}
      />
      <div
        className={cn(
          'fixed z-50 inset-y-0 left-0 w-[240px] translate-x-[-100%] bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 transition-transform lg:hidden',
          open && 'translate-x-0',
        )}
      >
        <SidebarNav />
      </div>

      <div className="mx-auto grid min-h-screen w-full lg:grid-cols-[240px_minmax(0,1fr)]">
        <SidebarNav />
        <div className="flex min-h-screen flex-col">
          <Topbar onToggleSidebar={() => setOpen((s) => !s)} />
          <main className="p-3 sm:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

