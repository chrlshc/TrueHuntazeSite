'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-black text-white hover:bg-zinc-800 focus:ring-zinc-400 dark:bg-white dark:text-black dark:hover:bg-zinc-100',
  secondary:
    'bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 focus:ring-zinc-400 dark:bg-zinc-900 dark:text-white dark:border-zinc-800 dark:hover:bg-zinc-800',
  ghost:
    'bg-transparent text-zinc-900 hover:bg-zinc-50 focus:ring-zinc-300 dark:text-zinc-100 dark:hover:bg-zinc-800',
};

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-base',
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  ),
);
Button.displayName = 'Button';

