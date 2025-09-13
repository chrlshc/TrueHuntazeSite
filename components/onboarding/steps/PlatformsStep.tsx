"use client";
import React from "react";
import { getCopy, type Locale } from "@/src/lib/onboarding/copy";
import { Check } from "lucide-react";

type Platform = {
  key: 'onlyfans' | 'instagram' | 'tiktok' | 'reddit' | 'threads' | 'patreon';
  label: string;
  comingSoon?: boolean;
};

const PLATFORMS: Platform[] = [
  { key: 'onlyfans', label: 'OnlyFans' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'tiktok', label: 'TikTok' },
  { key: 'reddit', label: 'Reddit' },
  { key: 'threads', label: 'Threads', comingSoon: true },
  { key: 'patreon', label: 'Patreon', comingSoon: true },
];

type Props = {
  connected: string[];
  onConnect: (p: Platform['key']) => void;
  onSkip?: () => void;
  locale?: Locale;
};

export default function PlatformsStep({ connected, onConnect, onSkip, locale = 'en' }: Props) {
  const t = getCopy(locale);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">{t.steps.platforms.title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{t.steps.platforms.subtitle}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {PLATFORMS.map((p) => {
          const isConnected = connected.includes(p.key);
          const disabled = !!p.comingSoon;
          return (
            <button
              key={p.key}
              type="button"
              disabled={disabled}
              onClick={() => onConnect(p.key)}
              className={[
                'rounded-xl border p-4 text-sm transition-all text-left',
                'bg-[#111214] border-white/10 hover:border-purple-500/40 hover:bg-white/[0.02]',
                disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
                isConnected && 'ring-2 ring-purple-500/40 border-purple-500/40',
              ].join(' ')}
            >
              <div className="flex items-center justify-between">
                <div className="font-medium">{p.label}</div>
                {isConnected && <Check className="w-4 h-4 text-emerald-500" />}
              </div>
              {p.comingSoon && <div className="mt-1 text-xs text-muted-foreground">{t.steps.platforms.states.soon}</div>}
              {!p.comingSoon && !isConnected && (
                <div className="mt-1 text-xs text-muted-foreground">{t.steps.platforms.states.connect}</div>
              )}
              {isConnected && (
                <div className="mt-1 text-xs text-emerald-500">{t.steps.platforms.states.connected}</div>
              )}
            </button>
          );
        })}
      </div>

      {onSkip && (
        <button type="button" onClick={onSkip} className="text-sm text-muted-foreground hover:text-foreground">
          {t.shell.skip}
        </button>
      )}
    </div>
  );
}
