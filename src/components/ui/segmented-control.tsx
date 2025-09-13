'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function SegmentedControl({
  segments = ['Overview', 'Attribution', 'Automations'],
  value,
  onChange,
}: { segments?: string[]; value?: string; onChange?: (v: string) => void }) {
  const [v, setV] = useState(value ?? segments[0]);
  return (
    <div className="inline-flex items-center rounded-md border border-[#E1E3E5] bg-[#FFFFFF] p-1 dark:border-[#3A3B3D] dark:bg-[#202223]">
      {segments.map((s) => {
        const active = v === s;
        return (
          <button
            key={s}
            onClick={() => { setV(s); onChange?.(s); }}
            className={cn(
              'px-3 py-1.5 text-sm rounded',
              active
                ? 'bg-[#EEF1F5] text-[#111213] dark:bg-[#2C2D2F] dark:text-[#E3E3E3]'
                : 'text-[#2C2D2F] hover:bg-[#F6F6F7] dark:text-[#C5C6C8] dark:hover:bg-[#2C2D2F]'
            )}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}