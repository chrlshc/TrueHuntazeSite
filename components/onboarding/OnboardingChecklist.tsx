"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";
import ProgressBar from "@/components/onboarding/ProgressBar";
import { getCopy, type Locale } from "@/src/lib/onboarding/copy";
import "@/app/onboarding/setup/onboarding-styles.css";
import { useOnboarding } from "@/hooks/useOnboarding";

type StepItem = {
  key: string;
  title: string;
  hint?: string;
  href: string;
  done: boolean;
};

export default function OnboardingChecklist({ locale='en' as Locale }: { locale?: Locale }) {
  const {
    sellPlan,
    niches,
    platformConnections,
    isStepCompleted,
    ops,
  } = useOnboarding();
  const t = getCopy(locale);

  const [selectedNicheLocal, setSelectedNicheLocal] = useState<string | null>(null);
  const [completedLocal, setCompletedLocal] = useState<boolean>(false);

  useEffect(() => {
    try {
      setSelectedNicheLocal(localStorage.getItem("selectedNiche"));
      setCompletedLocal(localStorage.getItem("onboarding_completed") === "true");
    } catch {}
  }, []);

  const onlyfansConnected = useMemo(() => {
    if (Array.isArray(platformConnections)) {
      return platformConnections.some((p) => p.platform === "onlyfans" && p.connected);
    }
    if (ops && (ops as any).platforms && (ops as any).platforms.onlyfans) return true;
    return false;
  }, [platformConnections, ops]);

  const routes: Record<string,string> = {
    'sell-plan': `/onboarding/setup/sell-plan?locale=${locale}`,
    'niche': `/onboarding/setup/activity?locale=${locale}`,
    'platform': `/onboarding/setup/platform?locale=${locale}`,
    'ai-config': `/onboarding/setup/ai?locale=${locale}`,
    'plan': `/onboarding/setup/plan?locale=${locale}`,
  };
  const steps: StepItem[] = [
    { key: 'sell-plan', title: t.dashboard.steps.sellPlan, href: routes['sell-plan'], done: Array.isArray(sellPlan) && sellPlan.length > 0 },
    { key: 'niche', title: t.dashboard.steps.activity, href: routes['niche'], done: (niches && niches.length > 0) || !!selectedNicheLocal },
    { key: 'platform', title: t.dashboard.steps.platforms, href: routes['platform'], done: onlyfansConnected },
    { key: 'ai-config', title: t.dashboard.steps.ai, href: routes['ai-config'], done: false },
    { key: 'plan', title: t.dashboard.steps.plan, href: routes['plan'], done: isStepCompleted('completed' as any) || completedLocal },
  ];

  const doneCount = steps.filter(s=>s.done).length;
  const total = steps.length;

  return (
    <div className="rounded-xl border bg-white dark:bg-gray-900 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-semibold">{t.dashboard.progress(doneCount, total)}</div>
        <div className="w-40"><ProgressBar current={doneCount} total={total} /></div>
      </div>

      <ul className="grid sm:grid-cols-2 gap-2">
        {steps.map((s) => (
          <li key={s.key}>
            <Link href={s.href} className={`select-card ${s.done ? 'is-selected' : ''}`}>
              <span
                className={`inline-flex items-center justify-center w-5 h-5 rounded-full border text-[10px] ${
                  s.done ? "bg-green-600 text-white border-green-600" : "text-gray-400 border-gray-300"
                }`}
              >
                {s.done ? <Check className="w-3 h-3" /> : ""}
              </span>
              <div className="text-sm font-medium">{s.title}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
