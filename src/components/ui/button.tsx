'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-[#2C6ECB] text-white hover:bg-[#245CAD] focus:ring-[#79A6E8] dark:bg-[#2C6ECB] dark:hover:bg-[#245CAD]',
  secondary:
    'bg-white text-[#111213] border border-[#E1E3E5] hover:bg-[#F6F6F7] focus:ring-[#79A6E8] dark:bg-[#202223] dark:text-[#E3E3E3] dark:border-[#3A3B3D] dark:hover:bg-[#2C2D2F]',
  ghost:
    'bg-transparent text-[#111213] hover:bg-[#F6F6F7] focus:ring-[#79A6E8] dark:text-[#E3E3E3] dark:hover:bg-[#2C2D2F]',
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
