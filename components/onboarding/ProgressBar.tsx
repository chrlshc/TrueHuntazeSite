import * as React from 'react'

type Props = { current: number; total: number }

export default function ProgressBar({ current, total }: Props) {
  const pct = Math.max(0, Math.min(100, Math.round((current / total) * 100)))
  return (
    <div className="w-full" aria-label="progress">
      <div className="h-1.5 w-full rounded-full bg-gray-200">
        <div
          className="h-1.5 rounded-full bg-violet-600 transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
        />
      </div>
      <div className="mt-2 text-xs text-muted-foreground">{pct}%</div>
    </div>
  )
}

