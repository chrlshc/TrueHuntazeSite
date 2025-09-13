import { Card, CardContent, CardHeader } from '@/components/ui/card';
import MarketingToolbar from '@/components/marketing/Toolbar';

export default function MarketingOverview() {
  return (
    <>
      <div className="text-lg font-semibold text-[#111213] dark:text-[#E3E3E3]">Marketing</div>
      <MarketingToolbar current="Overview" />
      <Card>
        <CardHeader><div className="text-lg font-medium">Performance (Last 30 days)</div></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            'Online store sessions','Conversion rate','Average order value',
            'Total sales','Sales attributed to marketing','Orders attributed to marketing',
          ].map((k) => (
            <div key={k} className="rounded-md border border-[#E1E3E5] p-4 dark:border-[#3A3B3D]">
              <div className="text-sm text-[#6D7175] dark:text-[#A5A7AB]">{k}</div>
              <div className="mt-1 text-2xl font-semibold text-[#111213] dark:text-[#E3E3E3]">—</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}