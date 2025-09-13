'use client';
import * as React from 'react';
import { getCopy } from '@/src/lib/onboarding/copy';
import { pick } from '@/src/lib/onboarding/i18n-utils';

type Props = {
  locale?: 'en' | 'fr' | 'es';
  data: {
    displayName?: string;
    nicheKey?: string;
    goalsKeys?: string[];
    connectedPlatforms?: string[];
    planId?: 'starter'|'pro'|'enterprise';
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

  // Resolve labels
  const nicheLabel = data.nicheKey
    ? pick(
        (t.steps.activity as any).options?.niches?.find((n: any) => n.key === data.nicheKey) ?? { en: data.nicheKey!, fr: data.nicheKey!, es: data.nicheKey! },
        locale as any
      )
    : undefined;
  const goalsCount = data.goalsKeys?.length ?? 0;
  const planName = data.planId
    ? (data.planId === 'starter'
        ? t.steps.plan.cards.starter.name
        : data.planId === 'pro'
        ? t.steps.plan.cards.pro.name
        : t.steps.plan.cards.enterprise.name)
    : undefined;

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
            <span>{t.steps.done.summary.profile}{data.displayName ? ` — ${data.displayName}` : ''}</span>
          </li>
          {nicheLabel && (
            <li className="flex items-start gap-2">
              <span className="i-check mt-0.5" />
              <span>{t.steps.done.summary.niche?.(nicheLabel) ?? `Niche: ${nicheLabel}`}</span>
            </li>
          )}
          {typeof goalsCount === 'number' && (
            <li className="flex items-start gap-2">
              <span className="i-check mt-0.5" />
              <span>{t.steps.done.summary.goals?.(goalsCount) ?? `Goals selected: ${goalsCount}`}</span>
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
          {planName && (
            <li className="flex items-start gap-2">
              <span className="i-check mt-0.5" />
              <span>{t.steps.done.summary.plan?.(planName) ?? `Plan: ${planName}`}</span>
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
