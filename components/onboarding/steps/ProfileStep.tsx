"use client";
import React from "react";

import { getCopy, type Locale } from "@/src/lib/onboarding/copy";

type Props = {
  values: {
    displayName: string;
    bio: string;
    timezone: string;
    language: string;
    businessType: 'individual' | 'agency' | 'studio';
    contentFrequency: 'daily' | 'weekly' | 'monthly';
    gdprConsent: boolean;
    marketingEmails: boolean;
  };
  onChange: (patch: Partial<Props['values']>) => void;
  tzDetected?: string;
  locale?: Locale;
};

export default function ProfileStep({ values, onChange, tzDetected, locale = 'en' }: Props) {
  const t = getCopy(locale);
  const tz = values.timezone || tzDetected || '';
  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div>
        <h2 className="text-xl font-semibold">{t.steps.profile.title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{t.steps.profile.subtitle}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="form-label">{t.steps.profile.labels.displayName}</span>
          <input className="form-input" placeholder={locale==='fr' ? 'ex. Ava Hart' : 'e.g. Ava Hart'} value={values.displayName}
                 onChange={(e) => onChange({ displayName: e.target.value })} />
        </label>
        <label className="block">
          <span className="form-label">{t.steps.profile.labels.timezone}</span>
          <input className="form-input" value={tz} readOnly />
        </label>
      </div>

      <label className="block">
        <span className="form-label">{t.steps.profile.labels.bio}</span>
        <textarea className="form-textarea" rows={3} placeholder={locale==='fr' ? 'Quelques phrases sur votre activité' : 'A few sentences about your work'}
                  value={values.bio} onChange={(e) => onChange({ bio: e.target.value })} />
      </label>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="form-label">{t.steps.profile.labels.language}</span>
          <input className="form-input" value={values.language || (locale==='fr'?'fr':'en')} onChange={(e) => onChange({ language: e.target.value })} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <fieldset className="col-span-2">
            <legend className="form-label">{t.steps.profile.labels.accountType}</legend>
            <div className="flex items-center gap-3 text-sm">
              {(['individual','agency','studio'] as const).map(v => (
                <label key={v} className="inline-flex items-center gap-2">
                  <input type="radio" name="businessType" checked={values.businessType===v} onChange={() => onChange({ businessType: v })} />
                  <span className="capitalize">{v}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="col-span-2">
            <legend className="form-label">{t.steps.profile.labels.frequency}</legend>
            <div className="flex items-center gap-3 text-sm">
              {(['daily','weekly','monthly'] as const).map(v => (
                <label key={v} className="inline-flex items-center gap-2">
                  <input type="radio" name="contentFrequency" checked={values.contentFrequency===v} onChange={() => onChange({ contentFrequency: v })} />
                  <span className="capitalize">{v}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      <div className="space-y-3">
        <label className="inline-flex items-start gap-2 text-sm">
          <input type="checkbox" checked={values.gdprConsent} onChange={(e)=>onChange({ gdprConsent: e.target.checked })} />
          <span>{t.steps.profile.labels.consentTOS.replace('Terms', 'Terms').replace('Privacy Policy', 'Privacy Policy')}</span>
        </label>
        <label className="inline-flex items-start gap-2 text-sm text-muted-foreground">
          <input type="checkbox" checked={values.marketingEmails} onChange={(e)=>onChange({ marketingEmails: e.target.checked })} />
          <span>{t.steps.profile.labels.consentEmails}</span>
        </label>
        <p className="text-xs italic text-muted-foreground">{locale==='fr' ? 'Astuce : un profil complet améliore la pertinence de votre assistant et l’engagement de vos fans.' : 'Tip: a complete profile improves assistant relevance and fan engagement.'}</p>
      </div>
    </form>
  );
}
