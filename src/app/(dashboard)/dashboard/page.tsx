'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  FileText,
  ArrowUp,
  ArrowDown,
  Activity,
  MessageSquare,
  Clock,
  Sparkles
} from 'lucide-react';

interface Stat {
  name: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: any;
}

const stats: Stat[] = [
  {
    name: 'Total Revenue',
    value: '$45,231',
    change: '+12.5%',
    changeType: 'increase',
    icon: DollarSign,
  },
  {
    name: 'Active Fans',
    value: '2,543',
    change: '+8.2%',
    changeType: 'increase',
    icon: Users,
  },
  {
    name: 'Content Views',
    value: '128.5K',
    change: '+23.1%',
    changeType: 'increase',
    icon: FileText,
  },
  {
    name: 'Engagement Rate',
    value: '68.4%',
    change: '-2.3%',
    changeType: 'decrease',
    icon: Activity,
  },
];

export default function DashboardPage() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {greeting}, Creator!
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Your AI is working 24/7 to grow your business.
        </p>
      </div>

      {/* AI Performance Banner */}
      <div className="mb-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">AI Assistant Active</h2>
            <p className="text-purple-100">
              Currently handling 24 conversations • 156 messages sent today • 1.2s avg response time
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold">$2,847</div>
              <div className="text-sm text-purple-100">Generated today</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">94%</div>
              <div className="text-sm text-purple-100">Response rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="stat-card group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.name}
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className={`mt-2 text-sm font-medium flex items-center ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.changeType === 'increase' ? (
                    <ArrowUp className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDown className="w-4 h-4 mr-1" />
                  )}
                  {stat.change}
                  <span className="text-gray-500 ml-2">vs last month</span>
                </p>
              </div>
              <div className={`p-3 rounded-xl ${
                stat.changeType === 'increase' ? 'bg-green-100' : 'bg-red-100'
              } group-hover:scale-110 transition-transform`}>
                <stat.icon className={`h-6 w-6 ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="btn-primary py-3 text-sm">
              <FileText className="w-4 h-4 mr-2 inline" />
              New Content
            </button>
            <button className="btn-secondary py-3 text-sm">
              <MessageSquare className="w-4 h-4 mr-2 inline" />
              Mass Message
            </button>
            <button className="btn-secondary py-3 text-sm">
              <Users className="w-4 h-4 mr-2 inline" />
              View Fans
            </button>
            <button className="btn-secondary py-3 text-sm">
              <TrendingUp className="w-4 h-4 mr-2 inline" />
              Analytics
            </button>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New subscription</p>
                  <p className="text-xs text-gray-500">@sarah_jones • 2 min ago</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-green-600">+$49.99</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">PPV sold by AI</p>
                  <p className="text-xs text-gray-500">@mike_d • 15 min ago</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-purple-600">+$19.99</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Content published</p>
                  <p className="text-xs text-gray-500">"Summer Set" • 1 hour ago</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">247 views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            {/* Chart would go here */}
            <p>Revenue chart visualization</p>
          </div>
        </div>
        
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fan Growth</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            {/* Chart would go here */}
            <p>Fan growth visualization</p>
          </div>
        </div>
      </div>
    </div>
  );
}