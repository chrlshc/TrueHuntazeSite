'use client';
import SegmentedControl from '@/components/ui/segmented-control';
import { Button } from '@/components/ui/button';
import { Calendar, SlidersHorizontal, Download } from 'lucide-react';

export default function MarketingToolbar({
  current = 'Overview',
  onTabChange,
}: { current?: string; onTabChange?: (v: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <SegmentedControl value={current} onChange={onTabChange} />
      <div className="ml-auto flex items-center gap-2">
        <Button variant="secondary"><Calendar className="mr-2 h-4 w-4" /> Last 30 days</Button>
        <Button variant="secondary"><SlidersHorizontal className="mr-2 h-4 w-4" /> Filter</Button>
        <Button><Download className="mr-2 h-4 w-4" /> Export</Button>
      </div>
    </div>
  );
}