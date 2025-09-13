'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import SidebarNav from './SidebarNav';
import Topbar from './Topbar';
import { initTheme } from '@/lib/theme';

export default function DashboardShell({ children }: React.PropsWithChildren) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    initTheme();
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F6F7] text-[#111213] dark:bg-[#0B0B0D] dark:text-[#E3E3E3]">
      {/* Overlay mobile */}
      <div
        className={cn(
          'fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setOpen(false)}
      />
      {/* Drawer mobile */}
      <div
        className={cn(
          'fixed z-50 inset-y-0 left-0 w-[240px] translate-x-[-100%] border-r border-[#E1E3E5] bg-[#FFFFFF] dark:border-[#3A3B3D] dark:bg-[#202223] transition-transform lg:hidden',
          open && 'translate-x-0',
        )}
      >
        <SidebarNav />
      </div>

      <div className="mx-auto grid min-h-screen w-full lg:grid-cols-[240px_minmax(0,1fr)]">
        <SidebarNav />
        <div className="flex min-h-screen flex-col">
          <Topbar onToggleSidebar={() => setOpen((s) => !s)} />
          {/* compensate fixed topbar */}
          <div className="h-14" />
          <main className="p-3 sm:p-6">
            <div className="mx-auto w-full max-w-screen-2xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
