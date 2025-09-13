'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, BarChart3, MessageSquare, Megaphone, Users, Network, CreditCard, Settings } from 'lucide-react';

const nav = [
  {
    heading: 'OVERVIEW',
    items: [{ href: '/dashboard', label: 'Overview', icon: Home }],
  },
  {
    heading: 'GROWTH',
    items: [
      { href: '/analytics', label: 'Analytics', icon: BarChart3 },
      { href: '/messages', label: 'Messages', icon: MessageSquare },
      { href: '/campaigns', label: 'Campaigns', icon: Megaphone },
      { href: '/fans', label: 'Fans', icon: Users },
      { href: '/marketing', label: 'Marketing', icon: Megaphone },
    ],
  },
  {
    heading: 'SETTINGS',
    items: [
      { href: '/platforms/connect', label: 'Platforms', icon: Network },
      { href: '/billing', label: 'Billing', icon: CreditCard },
      { href: '/settings', label: 'Settings', icon: Settings },
    ],
  },
];

export default function SidebarNav() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex sticky top-0 h-screen w-[240px] flex-col border-r border-border bg-surface">
      <div className="h-14 px-4 flex items-center font-semibold tracking-tight text-ink">Huntaze</div>
      <nav className="flex-1 space-y-4 px-3 pb-6">
        {nav.map((group) => (
          <div key={group.heading}>
            <div className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-inkSubdued">
              {group.heading}
            </div>
            <ul className="space-y-1">
              {group.items.map(({ href, label, icon: Icon }) => {
                const active = pathname === href || pathname?.startsWith(href + '/');
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'relative flex items-center gap-2 rounded-md px-3 py-2.5 text-sm transition',
                        active ? 'bg-surfaceMuted text-ink' : 'text-ink hover:bg-surfaceMuted',
                      )}
                    >
                      <span
                        className={cn(
                          'absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-full',
                          active ? 'bg-accent' : 'bg-transparent',
                        )}
                        aria-hidden
                      />
                      <Icon className="h-4 w-4" />
                      <span>{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="px-3 pb-3 text-xs text-inkSubdued">© {new Date().getFullYear()} Huntaze</div>
    </aside>
  );
}
