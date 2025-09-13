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
    <aside className="hidden lg:flex h-screen w-[240px] flex-col border-r border-[#E1E3E5] bg-[#FFFFFF] dark:border-[#3A3B3D] dark:bg-[#202223]">
      <div className="h-16 px-4 flex items-center font-semibold tracking-tight">Huntaze</div>
      <nav className="flex-1 space-y-4 px-3 pb-6">
        {nav.map((group) => (
          <div key={group.heading}>
            <div className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-[#6D7175] dark:text-[#A5A7AB]">
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
                        'relative flex items-center gap-2 rounded-md px-3 py-2 text-sm transition',
                        active
                          ? 'bg-[#EEF1F5] text-[#111213] dark:bg-[#2C2D2F] dark:text-[#E3E3E3]'
                          : 'text-[#2C2D2F] hover:bg-[#F6F6F7] dark:text-[#C5C6C8] dark:hover:bg-[#2C2D2F]',
                      )}
                    >
                      <span
                        className={cn(
                          'absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-full',
                          active ? 'bg-[#2C6ECB]' : 'bg-transparent',
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
      <div className="px-3 pb-3 text-xs text-[#6D7175] dark:text-[#A5A7AB]">© {new Date().getFullYear()} Huntaze</div>
    </aside>
  );
}
