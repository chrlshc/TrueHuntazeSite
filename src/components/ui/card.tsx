import { cn } from '@/lib/utils';
import * as React from 'react';

export function Card({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn('rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900', className)}>
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn('p-4 sm:p-5 border-b border-zinc-100 dark:border-zinc-800', className)}>{children}</div>;
}

export function CardContent({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn('p-4 sm:p-5', className)}>{children}</div>;
}

export function CardFooter({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn('p-4 sm:p-5 border-t border-zinc-100 dark:border-zinc-800', className)}>{children}</div>;
}

