"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { useOnboarding } from "@/hooks/useOnboarding";

type StepItem = {
  key: string;
  title: string;
  hint?: string;
  href: string;
  done: boolean;
};

export default function OnboardingChecklist() {
  const {
    sellPlan,
    niches,
    platformConnections,
    isStepCompleted,
    ops,
  } = useOnboarding();

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

  const steps: StepItem[] = [
    {
      key: "sell-plan",
      title: "Choose what you sell",
      hint: "Subscriptions, PPV, customs…",
      href: "/onboarding/setup?step=sell-plan",
      done: Array.isArray(sellPlan) && sellPlan.length > 0,
    },
    {
      key: "niche",
      title: "Select your niche",
      hint: "Tune tone, pricing & playbooks",
      href: "/onboarding/setup?step=niche",
      done: (niches && niches.length > 0) || !!selectedNicheLocal,
    },
    {
      key: "platform",
      title: "Connect OnlyFans",
      hint: "Required for auto‑DMs & insights",
      href: "/onboarding/setup?step=platform",
      done: onlyfansConnected,
    },
    {
      key: "ai-config",
      title: "Configure AI basics",
      hint: "Tone, automation, preview",
      href: "/onboarding/setup?step=ai-config",
      done: false, // conservative: treat as pending unless full flow used
    },
    {
      key: "plan",
      title: "Pick a plan & finish",
      hint: "Free to start",
      href: "/onboarding/setup?step=plan",
      done: isStepCompleted("completed") || completedLocal,
    },
  ];

  const progress = Math.round((steps.filter((s) => s.done).length / steps.length) * 100);

  return (
    <div className="rounded-xl border bg-white dark:bg-gray-900 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-sm font-semibold">Complete your setup</div>
          <div className="text-xs text-gray-500">{progress}% complete</div>
        </div>
        <Link href="/onboarding/setup" className="text-sm font-medium text-purple-600 hover:text-purple-700">
          Resume <ChevronRight className="inline-block w-4 h-4" />
        </Link>
      </div>

      <ul className="grid sm:grid-cols-2 gap-2">
        {steps.map((s) => (
          <li key={s.key}>
            <Link
              href={s.href}
              className={`flex items-center gap-3 rounded-lg border p-3 hover:border-purple-300 transition-colors ${
                s.done ? "bg-green-50 border-green-200" : "bg-white dark:bg-gray-900"
              }`}
            >
              <span
                className={`inline-flex items-center justify-center w-5 h-5 rounded-full border text-[10px] ${
                  s.done ? "bg-green-600 text-white border-green-600" : "text-gray-400 border-gray-300"
                }`}
              >
                {s.done ? <Check className="w-3 h-3" /> : ""}
              </span>
              <div className="text-sm">
                <div className="font-medium">{s.title}</div>
                {s.hint && <div className="text-xs text-gray-500">{s.hint}</div>}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
