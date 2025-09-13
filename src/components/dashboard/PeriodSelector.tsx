'use client';

import { useState } from 'react';

const PRESETS = ['7d', '30d', 'MTD', 'QTD', 'YTD'];

export default function PeriodSelector({
  onChange,
}: {
  onChange?: (value: string) => void;
}) {
  const [value, setValue] = useState('30d');
  return (
    <div className="flex items-center gap-1 rounded-md border border-zinc-200 bg-white p-1 text-sm dark:border-zinc-800 dark:bg-zinc-900">
      {PRESETS.map((p) => {
        const active = value === p;
        return (
          <button
            key={p}
            onClick={() => {
              setValue(p);
              onChange?.(p);
            }}
            className={
              'rounded px-2.5 py-1 ' +
              (active
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black'
                : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800')
            }
          >
            {p}
          </button>
        );
      })}
    </div>
  );
}

