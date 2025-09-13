'use client';
import * as React from 'react';
import { getCopy } from '@/src/lib/onboarding/copy';
import { pick } from '@/src/lib/onboarding/i18n-utils';

export type ActivityValues = {
  niche?: string;
  goals: string[];
  contentTypes: string[];
  revenueCurrent?: number | '';
  revenueTarget?: number | '';
};

type Props = {
  locale?: 'en' | 'fr' | 'es';
  values: ActivityValues;
  onChange: (next: ActivityValues) => void;
  goalsOptions?: { key: string; label: string }[];
  contentOptions?: { key: string; label: string }[];
  nicheOptions?: { key: string; label: string; icon?: React.ReactNode }[];
};

export default function ActivityStep({ locale = 'en', values, onChange }: Props) {
  const t = getCopy(locale);
  const goalsOptions = t.steps.activity.options?.goals?.map((o: any) => ({ key: o.key, label: pick(o, locale as any) })) ?? [];
  const contentOptions = t.steps.activity.options?.contentTypes?.map((o: any) => ({ key: o.key, label: pick(o, locale as any) })) ?? [];
  const nicheOptions = t.steps.activity.options?.niches?.map((o: any) => ({ key: o.key, label: pick(o, locale as any) })) ?? [];

  const toggle = (list: string[], key: string) =>
    list.includes(key) ? list.filter(k => k !== key) : [...list, key];

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">{t.steps.activity.title}</h1>
        <p className="text-sm text-muted-foreground">
          {t.steps.activity.subtitle}
        </p>
      </header>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Niche</label>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {nicheOptions.map(opt => {
            const selected = values.niche === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => onChange({ ...values, niche: opt.key })}
                className={
                  'rounded-xl border p-3 text-left transition ' +
                  (selected
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-300 hover:shadow-sm')
                }
              >
                <div className="flex items-center gap-2">
                  {opt.icon}
                  <span className="text-sm">{opt.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          {t.steps.activity.labels.goals}
        </label>
        <div className="grid gap-2 sm:grid-cols-2">
          {goalsOptions.map(opt => {
            const selected = values.goals.includes(opt.key);
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() =>
                  onChange({ ...values, goals: toggle(values.goals, opt.key) })
                }
                className={
                  'rounded-xl border p-3 text-left transition ' +
                  (selected
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-300 hover:shadow-sm')
                }
              >
                <span className="text-sm">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          {t.steps.activity.labels.contentTypes}
        </label>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {contentOptions.map(opt => {
            const selected = values.contentTypes.includes(opt.key);
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() =>
                  onChange({
                    ...values,
                    contentTypes: toggle(values.contentTypes, opt.key),
                  })
                }
                className={
                  'rounded-xl border p-3 text-left transition ' +
                  (selected
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-300 hover:shadow-sm')
                }
              >
                <span className="text-sm">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">
            {t.steps.activity.labels.revenueCurrent}
          </label>
          <input
            type="number"
            min={0}
            className="form-input w-full"
            value={values.revenueCurrent ?? ''}
            onChange={e =>
              onChange({
                ...values,
                revenueCurrent: e.target.value === '' ? '' : +e.target.value,
              })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            {t.steps.activity.labels.revenueTarget}
          </label>
          <input
            type="number"
            min={0}
            className="form-input w-full"
            value={values.revenueTarget ?? ''}
            onChange={e =>
              onChange({
                ...values,
                revenueTarget: e.target.value === '' ? '' : +e.target.value,
              })
            }
          />
        </div>
      </div>
    </section>
  );
}
