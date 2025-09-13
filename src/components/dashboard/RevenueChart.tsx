'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = Array.from({ length: 12 }).map((_, i) => ({
  label: `W${i + 1}`,
  net: Math.round(4000 + Math.random() * 4000),
}));

export default function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-zinc-500">Net sales over time</div>
            <div className="text-lg font-semibold">Revenue</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[280px] sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: 8, right: 8, top: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="fillNet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#18181b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#18181b" stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <XAxis dataKey="label" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip formatter={(v: number) => [`$${(v as number).toLocaleString()}`, 'Net']} />
            <Area type="monotone" dataKey="net" stroke="#18181b" fill="url(#fillNet)" strokeWidth={2} activeDot={{ r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

