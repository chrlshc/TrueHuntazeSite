'use client';

import { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, MessageCircle, Star } from 'lucide-react';
import { cn, formatCurrency, formatPercentage, getEngagementScoreColor, getTierColor } from '@/lib/utils';

interface EngagementAnalytics {
  totalFans: number;
  averageEngagementScore: number;
  totalLifetimeValue: number;
  tierDistribution: {
    VIP: { count: number; percentage: string };
    PREMIUM: { count: number; percentage: string };
    ACTIVE: { count: number; percentage: string };
    BASIC: { count: number; percentage: string };
  };
  topFans: Array<{
    username: string;
    score: number;
    lifetimeValue: number;
    lastInteraction: string;
  }>;
}

interface EngagementScoreMetricsProps {
  data: EngagementAnalytics;
}

export function EngagementScoreMetrics({ data }: EngagementScoreMetricsProps) {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const tierData = Object.entries(data.tierDistribution).map(([tier, info]) => ({
    name: tier,
    value: info.count,
    percentage: parseFloat(info.percentage),
  }));

  const COLORS = {
    VIP: '#9333ea',
    PREMIUM: '#eab308',
    ACTIVE: '#3b82f6',
    BASIC: '#6b7280',
  };

  const scoreComponents = [
    { name: 'Recency', value: 30, max: 30, icon: TrendingUp, color: 'text-green-600' },
    { name: 'Frequency', value: 25, max: 25, icon: MessageCircle, color: 'text-blue-600' },
    { name: 'Monetary', value: 25, max: 25, icon: DollarSign, color: 'text-yellow-600' },
    { name: 'Interaction', value: 20, max: 20, icon: Star, color: 'text-purple-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Fans</p>
              <p className="text-2xl font-semibold text-gray-900">{data.totalFans.toLocaleString()}</p>
            </div>
            <Users className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Engagement</p>
              <p className={cn('text-2xl font-semibold', getEngagementScoreColor(data.averageEngagementScore))}>
                {data.averageEngagementScore}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Lifetime Value</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(data.totalLifetimeValue * 100)}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">VIP Fans</p>
              <p className="text-2xl font-semibold text-purple-600">
                {data.tierDistribution.VIP.count}
              </p>
              <p className="text-sm text-gray-500">{data.tierDistribution.VIP.percentage}%</p>
            </div>
            <Star className="h-8 w-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tier Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Fan Tier Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={tierData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {tierData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.name as keyof typeof COLORS]}
                    className="cursor-pointer hover:opacity-80"
                    onClick={() => setSelectedTier(entry.name)}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {selectedTier && (
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <div className="flex items-center justify-between">
                <span className={cn('px-2 py-1 rounded-full text-xs font-medium', getTierColor(selectedTier))}>
                  {selectedTier}
                </span>
                <button
                  onClick={() => setSelectedTier(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  ✕
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {data.tierDistribution[selectedTier as keyof typeof data.tierDistribution].count} fans
                ({data.tierDistribution[selectedTier as keyof typeof data.tierDistribution].percentage}%)
              </p>
            </div>
          )}
        </div>

        {/* Engagement Score Components */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Engagement Score Breakdown</h3>
          <div className="space-y-4">
            {scoreComponents.map((component) => {
              const Icon = component.icon;
              const percentage = (component.value / component.max) * 100;
              
              return (
                <div key={component.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <Icon className={cn('h-5 w-5 mr-2', component.color)} />
                      <span className="text-sm font-medium text-gray-700">{component.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {component.value}/{component.max} points
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={cn('h-2 rounded-full', {
                        'bg-green-600': component.name === 'Recency',
                        'bg-blue-600': component.name === 'Frequency',
                        'bg-yellow-600': component.name === 'Monetary',
                        'bg-purple-600': component.name === 'Interaction',
                      })}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Fans Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Top VIP Fans</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lifetime Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.topFans.map((fan, index) => (
                <tr key={fan.username} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-medium">
                          {fan.username.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{fan.username}</div>
                        <div className="text-sm text-gray-500">Rank #{index + 1}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={cn('text-sm font-medium', getEngagementScoreColor(fan.score))}>
                        {fan.score}
                      </span>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${fan.score}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(fan.lifetimeValue * 100)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(fan.lastInteraction).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}