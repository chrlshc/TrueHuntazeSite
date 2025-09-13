'use client';
import * as React from 'react';
import { getCopy, type Locale } from '@/src/lib/onboarding/copy';
import { pick } from '@/src/lib/onboarding/i18n-utils';

type SellOption = {
  id: string;
  title: string;
  desc?: string;
  priceMonthly?: number;
  priceYearly?: number;
  features?: string[];
  recommended?: boolean;
};

type Props = {
  locale?: Locale;
  options?: SellOption[];
  value?: string;
  onChange?: (id: string) => void;
  showCycleToggle?: boolean;
};

export default function SellPlan({
  locale = 'en',
  options,
  value,
  onChange,
  showCycleToggle = true,
}: Props) {
  const t = getCopy(locale);
  const [cycle, setCycle] = React.useState<'monthly'|'yearly'>('monthly');

  const fallback: SellOption[] = [
    {
      id: 'starter',
      title: t.steps.plan.cards.starter.name,
      desc: pick({ en:'Kickstart with basics', fr:'Démarrez avec l’essentiel', es:'Empieza con lo esencial' }, locale),
      priceMonthly: 0,
      priceYearly: 0,
      features: (t.steps.plan as any).features.starter.map((f: any) => pick(f, locale)),
    },
    {
      id: 'pro',
      title: t.steps.plan.cards.pro.name,
      desc: pick({ en:'Scale with automation', fr:'Montez en puissance avec l’automatisation', es:'Escala con automatización' }, locale),
      priceMonthly: 29,
      priceYearly: 24,
      features: (t.steps.plan as any).features.pro.map((f: any) => pick(f, locale)),
      recommended: true,
    },
    {
      id: 'enterprise',
      title: t.steps.plan.cards.enterprise.name,
      desc: pick({ en:'Tailored for teams', fr:'Taillé pour les équipes', es:'Diseñado para equipos' }, locale),
      priceMonthly: 0,
      priceYearly: 0,
      features: (t.steps.plan as any).features.enterprise.map((f: any) => pick(f, locale)),
    },
  ];

  const items = options ?? fallback;

  const period = (c: 'monthly'|'yearly') => c === 'monthly'
    ? (locale === 'fr' ? 'mois' : locale === 'es' ? 'mes' : 'mo')
    : (locale === 'fr' ? 'an' : locale === 'es' ? 'año' : 'yr');

  return (
    <section className="space-y-4">
      {showCycleToggle && (
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
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {items.map((opt) => {
          const selected = value === opt.id;
          const price = cycle === 'monthly' ? opt.priceMonthly : opt.priceYearly;
          const isFree = price === 0 || price === undefined;

          return (
            <button
              key={opt.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange?.(opt.id)}
              className={`pricing-card text-left ${opt.recommended ? 'recommended' : ''} ${selected ? 'ring-2 ring-purple-600/40' : ''}`}
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold">{opt.title}</h3>
                {opt.recommended && (
                  <span className="badge-accent">{t.steps.plan.cards.pro.recommended}</span>
                )}
              </div>
              {opt.desc && (
                <p className="mt-1 text-sm text-muted-foreground">{opt.desc}</p>
              )}

              {(opt.priceMonthly !== undefined || opt.priceYearly !== undefined) && (
                <div className="my-2 text-2xl font-bold">
                  {isFree ? 'Free' : `$${price}`}
                  {!isFree && (
                    <span className="text-sm font-normal">/{period(cycle)}</span>
                  )}
                </div>
              )}

              {opt.features?.length ? (
                <ul className="mt-2 space-y-1 text-sm">
                  {opt.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="i-check mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}

