'use client';
import * as React from 'react';
import { getCopy } from '@/src/lib/onboarding/copy';

type Props = {
  locale?: 'en' | 'fr' | 'es';
  data: {
    displayName?: string;
    nicheName?: string;
    goalsCount?: number;
    connectedPlatforms?: string[];
    planName?: string;
    aiConfigured?: boolean;
  };
  onGoDashboard?: () => void;
};

export default function CompletionStep({
  locale = 'en',
  data,
  onGoDashboard,
}: Props) {
  const t = getCopy(locale);

  return (
    <section className="flex flex-col items-center text-center gap-6">
      <div className="h-12 w-12 rounded-full bg-green-600" aria-hidden />
      <header>
        <h1 className="text-2xl font-semibold">{t.steps.done.title}</h1>
        <p className="text-sm text-muted-foreground">{t.steps.done.subtitle}</p>
      </header>

      <div className="w-full max-w-md text-left space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-wide">
          {t.steps.done.summaryTitle}
        </h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="i-check mt-0.5" />
            <span>{t.steps.done.summaryTitle}{data.displayName ? ` — ${data.displayName}` : ''}</span>
          </li>
          {data.nicheName && (
            <li className="flex items-start gap-2">
              <span className="i-check mt-0.5" />
              <span>{/* niche */}{t.steps.done.summary.niche?.(data.nicheName) ?? `Niche: ${data.nicheName}`}</span>
            </li>
          )}
          {typeof data.goalsCount === 'number' && (
            <li className="flex items-start gap-2">
              <span className="i-check mt-0.5" />
              <span>{t.steps.done.summary.goals?.(data.goalsCount) ?? `Goals selected: ${data.goalsCount}`}</span>
            </li>
          )}
          {data.connectedPlatforms && (
            <li className="flex items-start gap-2">
              <span className="i-check mt-0.5" />
              <span>
                {t.steps.done.summary.platforms?.(data.connectedPlatforms.length) ?? `Platforms connected: ${data.connectedPlatforms.length}`}
              </span>
            </li>
          )}
          {data.aiConfigured && (
            <li className="flex items-start gap-2">
              <span className="i-check mt-0.5" />
              <span>{t.steps.done.summary.ai ?? 'AI configured'}</span>
            </li>
          )}
          {data.planName && (
            <li className="flex items-start gap-2">
              <span className="i-check mt-0.5" />
              <span>{t.steps.done.summary.plan?.(data.planName) ?? `Plan: ${data.planName}`}</span>
            </li>
          )}
        </ul>
      </div>

      <button type="button" className="btn btn-primary" onClick={onGoDashboard}>
        {t.steps.done.cta}
      </button>
    </section>
  );
}

