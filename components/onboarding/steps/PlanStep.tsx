'use client';
import * as React from 'react';
import { getCopy } from '@/src/lib/onboarding/copy';
import { pick } from '@/src/lib/onboarding/i18n-utils';

type PlanId = 'starter' | 'pro' | 'enterprise';

export type Plan = {
  id: PlanId;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  recommended?: boolean;
  cta: string;
};

type Props = {
  locale?: 'en' | 'fr' | 'es';
  onSkip?: () => void;
  onChoose?: (plan: PlanId) => void;
  plansOverride?: Plan[];
};

export default function PlanStep({
  locale = 'en',
  onSkip,
  onChoose,
  plansOverride,
}: Props) {
  const t = getCopy(locale);
  const [cycle, setCycle] = React.useState<'monthly' | 'yearly'>('monthly');

  const featuresStarter = (t.steps.plan as any).features?.starter?.map((f: any) => pick(f, locale as any)) ?? [];
  const featuresPro = (t.steps.plan as any).features?.pro?.map((f: any) => pick(f, locale as any)) ?? [];
  const featuresEnt = (t.steps.plan as any).features?.enterprise?.map((f: any) => pick(f, locale as any)) ?? [];

  const defaultPlans: Plan[] = [
    {
      id: 'starter',
      name: t.steps.plan.cards.starter.name,
      priceMonthly: 0,
      priceYearly: 0,
      features: featuresStarter,
      cta: t.steps.plan.cards.starter.cta,
    },
    {
      id: 'pro',
      name: t.steps.plan.cards.pro.name,
      priceMonthly: 29,
      priceYearly: 24,
      features: featuresPro,
      cta: t.steps.plan.cards.pro.cta,
      recommended: true,
    },
    {
      id: 'enterprise',
      name: t.steps.plan.cards.enterprise.name,
      priceMonthly: 0,
      priceYearly: 0,
      features: featuresEnt,
      cta: t.steps.plan.cards.enterprise.cta,
    },
  ];

  const plans = plansOverride ?? defaultPlans;

  const period = (c: 'monthly'|'yearly') => c === 'monthly'
    ? (locale === 'fr' ? 'mois' : locale === 'es' ? 'mes' : 'mo')
    : (locale === 'fr' ? 'an' : locale === 'es' ? 'año' : 'yr');

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">{t.steps.plan.title}</h1>
        <p className="text-sm text-muted-foreground">{t.steps.plan.subtitle}</p>
      </header>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className={`btn ${cycle === 'monthly' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setCycle('monthly')}
        >
          {t.steps.plan.billing.monthly}
        </button>
        <button
          type="button"
          className={`btn ${cycle === 'yearly' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setCycle('yearly')}
        >
          {t.steps.plan.billing.yearly}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map(p => {
          const price = cycle === 'monthly' ? p.priceMonthly : p.priceYearly;
          const isFree = price === 0 && p.id === 'starter';
          return (
            <div
              key={p.id}
              className={
                'rounded-xl border p-4 shadow-sm transition ' +
                (p.recommended ? 'border-purple-600 ring-1 ring-purple-600/20 ' : 'border-gray-200 ') +
                'hover:shadow-md'
              }
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                {p.recommended && (
                  <span className="inline-flex rounded-full bg-purple-600 px-2 py-0.5 text-xs font-medium text-white">
                    {t.steps.plan.cards.pro.recommended}
                  </span>
                )}
              </div>

              <div className="my-2 text-2xl font-bold">
                {isFree ? 'Free' : `$${price}`}
                {!isFree && (
                  <span className="text-sm font-normal">
                    /{period(cycle)}
                  </span>
                )}
              </div>

              <ul className="space-y-1 text-sm">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="i-check mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <button
                  type="button"
                  className={`btn ${p.id === 'starter' ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={() => (p.id === 'starter' ? onSkip?.() : onChoose?.(p.id))}
                >
                  {p.cta}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
