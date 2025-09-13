import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'h-9 w-full rounded-md border border-[#E1E3E5] bg-white px-3 text-sm text-[#111213] outline-none',
      'placeholder:text-[#6D7175] focus:border-[#2C6ECB] focus:ring-2 focus:ring-[#79A6E8]',
      'dark:border-[#3A3B3D] dark:bg-[#202223] dark:text-[#E3E3E3] dark:placeholder:text-[#A5A7AB] dark:focus:border-[#2C6ECB] dark:focus:ring-[#3E6FB6]',
      className,
    )}
    {...props}
  />
));
Input.displayName = 'Input';

