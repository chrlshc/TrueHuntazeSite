'use client';
import * as React from 'react';

type Step = { key: string; label: string };
type Props = {
  steps: Step[];
  currentIndex: number;        // 0-based
  onStepClick?: (index: number) => void; // optional (read-only if undefined)
};

export default function Stepper({ steps, currentIndex, onStepClick }: Props) {
  return (
    <nav aria-label="Onboarding steps" className="flex items-center gap-2 text-xs text-muted-foreground">
      {steps.map((s, i) => {
        const active = i === currentIndex;
        return (
          <button
            key={s.key}
            type="button"
            className={
              'inline-flex items-center gap-1 rounded-md px-2 py-1 transition ' +
              (active ? 'bg-purple-50 text-purple-700' : 'hover:bg-gray-100')
            }
            aria-current={active ? 'step' : undefined}
            onClick={() => onStepClick?.(i)}
          >
            <span
              className={
                'inline-flex h-5 w-5 items-center justify-center rounded-full border text-[10px] ' +
                (active ? 'border-purple-600 text-purple-700' : 'border-gray-300')
              }
            >
              {i + 1}
            </span>
            <span className="truncate max-w-[8ch] sm:max-w-[14ch]">{s.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

