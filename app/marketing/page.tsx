import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function MarketingPage() {
  return (
    <div className="space-y-6">
      <div className="text-lg font-semibold text-[#111213] dark:text-[#E3E3E3]">Marketing</div>

      <Card>
        <CardHeader>
          <div className="text-lg font-medium">Performance (Last 30 days)</div>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { kpi: 'Online store sessions', v: '—' },
            { kpi: 'Conversion rate', v: '—' },
            { kpi: 'Average order value', v: '—' },
            { kpi: 'Total sales', v: '—' },
            { kpi: 'Sales attributed to marketing', v: '—' },
            { kpi: 'Orders attributed to marketing', v: '—' },
          ].map((it) => (
            <div key={it.kpi} className="rounded-md border border-[#E1E3E5] p-4 dark:border-[#3A3B3D]">
              <div className="text-sm text-[#6D7175] dark:text-[#A5A7AB]">{it.kpi}</div>
              <div className="mt-1 text-2xl font-semibold text-[#111213] dark:text-[#E3E3E3]">{it.v}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between gap-4 p-6">
          <div>
            <div className="text-lg font-semibold">No data yet</div>
            <div className="text-sm text-[#6D7175] dark:text-[#A5A7AB]">Connect platforms to start seeing analytics.</div>
          </div>
          <Button variant="primary" className="shrink-0" asChild>
            <a href="/platforms/connect">Connect platforms →</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

