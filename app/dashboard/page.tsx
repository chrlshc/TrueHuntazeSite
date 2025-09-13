import { Card, CardContent } from '@/components/ui/card';
import StatCard from '@/components/dashboard/StatCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import TopList from '@/components/dashboard/TopList';
import QuickActions from '@/components/dashboard/QuickActions';
import { Users, MessageSquare, Percent, Image as ImageIcon } from 'lucide-react';

export default function Page() {
  return (
    <div className="space-y-6">
      {/* Onboarding banner léger (facultatif) */}
      <Card>
        <CardContent className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div>
            <div className="font-semibold text-[#111213] dark:text-[#E3E3E3]">Finish onboarding</div>
            <div className="text-sm text-[#6D7175] dark:text-[#A5A7AB]">
              Complete your profile, connect platforms and enable the AI assistant.
            </div>
          </div>
          <a
            href="/onboarding/setup"
            className="inline-flex h-10 items-center justify-center rounded-md bg-[#2C6ECB] px-4 text-sm font-medium text-white hover:bg-[#245CAD]"
          >
            Continue setup
          </a>
        </CardContent>
      </Card>

      {/* Stat cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active subscribers" value="1,284" delta="+4.2% vs 30d" icon={<Users className="h-6 w-6" />} />
        <StatCard label="Messages sent" value="7,912" delta="+12.1% vs 30d" icon={<MessageSquare className="h-6 w-6" />} />
        <StatCard label="Engagement rate" value="8.7%" delta="+0.6pp" icon={<Percent className="h-6 w-6" />} />
        <StatCard label="Content created" value="42" delta="+5 vs 30d" icon={<ImageIcon className="h-6 w-6" />} />
      </div>

      {/* Chart + Top content */}
      <div className="grid gap-3 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <TopList />
      </div>

      {/* Quick actions */}
      <QuickActions />
    </div>
  );
}
