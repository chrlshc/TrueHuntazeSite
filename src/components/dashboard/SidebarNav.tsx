'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  BarChart3,
  MessageSquare,
  Megaphone,
  Users,
  Network,
  CreditCard,
  Settings,
} from 'lucide-react';

const items = [
  { href: '/dashboard', label: 'Overview', icon: Home },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
  { href: '/campaigns', label: 'Campaigns', icon: Megaphone },
  { href: '/fans', label: 'Fans', icon: Users },
  { href: '/platforms/connect', label: 'Platforms', icon: Network },
  { href: '/billing', label: 'Billing', icon: CreditCard },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function SidebarNav() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex h-full w-[240px] flex-col border-r border-zinc-200 bg-white/60 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/40">
      <div className="h-14 px-4 flex items-center font-semibold tracking-tight">
        Huntaze
      </div>
      <nav className="flex-1 space-y-1 px-2 pb-4">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname?.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition',
                active
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black'
                  : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800',
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-3 text-xs text-zinc-500">© {new Date().getFullYear()} Huntaze</div>
    </aside>
  );
}

