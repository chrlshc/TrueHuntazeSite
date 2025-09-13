import { Card, CardHeader, CardContent } from '@/components/ui/card';

const MOCK = [
  { title: 'Welcome PPV – 3 photos', revenue: 1240, ctr: 8.2 },
  { title: 'VIP video – 2 min teaser', revenue: 980, ctr: 6.9 },
  { title: 'Story bundle', revenue: 730, ctr: 5.1 },
];

export default function TopList() {
  return (
    <Card>
      <CardHeader>
        <div className="text-lg font-semibold">Top performing content</div>
        <div className="text-sm text-zinc-500">Last 30 days</div>
      </CardHeader>
      <CardContent className="space-y-4">
        {MOCK.map((it, idx) => (
          <div key={idx} className="flex items-center justify-between gap-3">
            <div>
              <div className="font-medium">{it.title}</div>
              <div className="text-xs text-zinc-500">CTR {it.ctr}%</div>
            </div>
            <div className="text-sm font-semibold">${'{'}it.revenue.toLocaleString(){'}'}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

