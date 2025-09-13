'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = Array.from({ length: 12 }).map((_, i) => ({ label: `W${i + 1}`, net: Math.round(4000 + Math.random() * 4000) }));

export default function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-[#6D7175] dark:text-[#A5A7AB]">Net sales over time</div>
            <div className="text-lg font-semibold text-[#111213] dark:text-[#E3E3E3]">Revenue</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[280px] sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: 8, right: 8, top: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="fillNet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2C6ECB" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#2C6ECB" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--chart-tick)' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${v / 1000}k`}
              tick={{ fill: 'var(--chart-tick)' }}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--tooltip-bg)',
                color: 'var(--tooltip-fg)',
                border: '1px solid var(--tooltip-border)',
                borderRadius: 8,
              }}
              labelStyle={{ color: 'var(--chart-tick)' }}
              formatter={(v: number) => [`$${(v as number).toLocaleString()}`, 'Net']}
            />
            <Area type="monotone" dataKey="net" stroke="var(--accent)" fill="url(#fillNet)" strokeWidth={2} activeDot={{ r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
