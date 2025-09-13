'use client';
import * as React from 'react';
import { getCopy } from '@/src/lib/onboarding/copy';

export type AIConfigValues = {
  personality?: string;
  tone?: string;
  monthlyPrice?: number | '';
  welcome?: string;
};

type Props = {
  locale?: 'en' | 'fr' | 'es';
  values: AIConfigValues;
  onChange: (next: AIConfigValues) => void;
  toneOptions?: { key: string; label: string; desc?: string }[];
};

export default function AIConfigStep({
  locale = 'en',
  values,
  onChange,
  toneOptions = [
    { key: 'friendly', label: 'Friendly', desc: 'Warm and approachable' },
    { key: 'professional', label: 'Professional', desc: 'Clear and concise' },
    { key: 'motivational', label: 'Motivational', desc: 'Energizing and supportive' },
    { key: 'educational', label: 'Educational', desc: 'Informative and helpful' },
    { key: 'mysterious', label: 'Mysterious', desc: 'Subtle and intriguing' },
  ],
}: Props) {
  const t = getCopy(locale);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">{t.steps.ai.title}</h1>
        <p className="text-sm text-muted-foreground">{t.steps.ai.subtitle}</p>
      </header>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">
            {t.steps.ai.labels.personality}
          </label>
          <input
            className="form-input w-full"
            value={values.personality ?? ''}
            onChange={e => onChange({ ...values, personality: e.target.value })}
            placeholder="e.g., Luna (friendly assistant)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            {t.steps.ai.labels.tone}
          </label>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {toneOptions.map(opt => {
              const selected = values.tone === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  className={
                    'rounded-xl border p-3 text-left transition ' +
                    (selected
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-300 hover:shadow-sm')
                  }
                  onClick={() => onChange({ ...values, tone: opt.key })}
                >
                  <div className="font-medium">{opt.label}</div>
                  {opt.desc && (
                    <div className="text-xs text-muted-foreground">{opt.desc}</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">
              {t.steps.ai.labels.monthlyPrice}
            </label>
            <input
              type="number"
              min={0}
              step={0.5}
              className="form-input w-full"
              value={values.monthlyPrice ?? ''}
              onChange={e =>
                onChange({
                  ...values,
                  monthlyPrice: e.target.value === '' ? '' : +e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              {t.steps.ai.labels.welcome}
            </label>
            <textarea
              className="form-textarea w-full"
              rows={3}
              value={values.welcome ?? ''}
              onChange={e => onChange({ ...values, welcome: e.target.value })}
              placeholder="Short greeting sent to new fans"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

