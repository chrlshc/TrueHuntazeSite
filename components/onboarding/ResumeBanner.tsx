"use client";

import Link from 'next/link';
import { useMemo } from 'react';
import { useOnboarding } from '@/hooks/useOnboarding';
import { getCopy, type Locale } from '@/src/lib/onboarding/copy';

export default function ResumeBanner({ locale='en' as Locale }: { locale?: Locale }) {
  const { userData, sellPlan, niches, platformConnections, isStepCompleted, ops } = useOnboarding();
  const t = getCopy(locale);
  const completed = isStepCompleted('completed' as any);
  if (completed) return null;

  const onlyfansConnected = useMemo(() => {
    const pc = Array.isArray(platformConnections) ? platformConnections : [];
    if (pc.some((p: any) => p.platform === 'onlyfans' && p.connected)) return true;
    if (ops && (ops as any).platforms && (ops as any).platforms.onlyfans) return true;
    return false;
  }, [platformConnections, ops]);

  const steps = [
    { key: 'profile', done: Boolean(userData?.pseudonym || userData?.email || userData?.acceptedTerms), label: t.dashboard.steps.profile, href: `/onboarding/setup/profile?locale=${locale}` },
    { key: 'sell-plan', done: Array.isArray(sellPlan) && sellPlan.length > 0, label: t.dashboard.steps.sellPlan, href: `/onboarding/setup/sell-plan?locale=${locale}` },
    { key: 'activity', done: Array.isArray(niches) && niches.length > 0, label: t.dashboard.steps.activity, href: `/onboarding/setup/activity?locale=${locale}` },
    { key: 'platform', done: onlyfansConnected, label: t.dashboard.steps.platforms, href: `/onboarding/setup/platform?locale=${locale}` },
    { key: 'ai-config', done: false, label: t.dashboard.steps.ai, href: `/onboarding/setup/ai?locale=${locale}` },
    { key: 'plan', done: completed, label: t.dashboard.steps.plan, href: `/onboarding/setup/plan?locale=${locale}` },
  ];
  const next = steps.find(s => !s.done) || steps[steps.length - 1];

  return (
    <div className="mb-4 rounded-xl border bg-white dark:bg-gray-900 px-4 py-3 flex items-center justify-between">
      <div className="text-sm">
        <div className="font-medium text-content-primary">{t.dashboard.banner.title}</div>
        <div className="text-xs text-muted-foreground">{t.dashboard.banner.next(next.label)}</div>
      </div>
      <Link href={next.href} className="btn btn-primary">
        {t.dashboard.banner.cta(next.label)}
      </Link>
    </div>
  );
}
