import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'h-9 w-full rounded-md border border-border bg-surface px-3 text-sm text-ink outline-none',
      'placeholder:text-inkSubdued focus:border-accent focus:ring-2 focus:ring-accentRing',
      className,
    )}
    {...props}
  />
));
Input.displayName = 'Input';
