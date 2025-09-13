import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function StatCard({
  label,
  value,
  delta,
  icon,
  className,
}: {
  label: string;
  value: string;
  delta?: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="flex items-center justify-between gap-3 p-4 sm:p-5">
        <div>
          <div className="text-sm text-zinc-500">{label}</div>
          <div className="mt-1 text-2xl font-semibold tracking-tight">{value}</div>
          {delta && <div className="mt-1 text-xs text-emerald-600">{delta}</div>}
        </div>
        <div className="opacity-70">{icon}</div>
      </CardContent>
    </Card>
  );
}

