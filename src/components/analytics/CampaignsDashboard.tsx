'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Download, Mail, MessageSquare, Send, Share2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { api } from '@/lib/api';

interface CampaignMetrics {
  campaigns: Array<{
    id: string;
    channel: string;
    sent: number;
    openRate?: number;
    clickRate?: number;
    convRate?: number;
    revenue: number;
    roas?: number;
    cost?: number;
  }>;
  totals: {
    sent: number;
    revenue: number;
    cost: number;
    avgRoas: number;
  };
}

const channelIcons = {
  email: <Mail className="w-4 h-4" />,
  sms: <MessageSquare className="w-4 h-4" />,
  push: <Send className="w-4 h-4" />,
  social: <Share2 className="w-4 h-4" />,
};

const channelColors = {
  email: '#7C3AED',
  sms: '#10B981',
  push: '#F59E0B',
  social: '#3B82F6',
};

export function CampaignsDashboard() {
  const [metrics, setMetrics] = useState<CampaignMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'7d' | '28d'>('7d');
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'pdf'>('csv');

  useEffect(() => {
    fetchMetrics();
  }, [period]);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/analytics/campaigns?range=${period}`);
      setMetrics(response.data);
    } catch (error) {
      console.error('Failed to fetch campaign metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await api.get(`/export/campaigns.${exportFormat}?range=${period}`, {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `huntaze-campaigns-${period}.${exportFormat}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  if (loading || !metrics) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  // Prepare data for charts
  const channelPerformance = metrics.campaigns.reduce((acc, campaign) => {
    const channel = campaign.channel;
    if (!acc[channel]) {
      acc[channel] = { sent: 0, revenue: 0, campaigns: 0 };
    }
    acc[channel].sent += campaign.sent;
    acc[channel].revenue += campaign.revenue;
    acc[channel].campaigns += 1;
    return acc;
  }, {} as Record<string, { sent: number; revenue: number; campaigns: number }>);

  const channelData = Object.entries(channelPerformance).map(([channel, data]) => ({
    channel,
    revenue: data.revenue,
    sent: data.sent,
    campaigns: data.campaigns,
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Campaign Analytics</h1>
        <div className="flex gap-4">
          <Select value={period} onValueChange={(value: '7d' | '28d') => setPeriod(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="28d">Last 28 days</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex gap-2">
            <Select value={exportFormat} onValueChange={(value: any) => setExportFormat(value)}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExport} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totals.sent.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.totals.revenue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.totals.cost.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average ROAS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totals.avgRoas.toFixed(2)}x</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue by Channel</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={channelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="channel" />
              <YAxis />
              <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="revenue" fill="#7C3AED" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Campaign</th>
                  <th className="text-left py-2">Channel</th>
                  <th className="text-right py-2">Sent</th>
                  <th className="text-right py-2">Open %</th>
                  <th className="text-right py-2">Click %</th>
                  <th className="text-right py-2">Conv %</th>
                  <th className="text-right py-2">Revenue</th>
                  <th className="text-right py-2">ROAS</th>
                </tr>
              </thead>
              <tbody>
                {metrics.campaigns.slice(0, 10).map((campaign) => (
                  <tr key={campaign.id} className="border-b">
                    <td className="py-2">
                      <span className="font-mono text-xs">{campaign.id.substring(0, 8)}</span>
                    </td>
                    <td className="py-2">
                      <Badge variant="outline" className="gap-1">
                        {channelIcons[campaign.channel as keyof typeof channelIcons]}
                        {campaign.channel}
                      </Badge>
                    </td>
                    <td className="text-right py-2">{campaign.sent.toLocaleString()}</td>
                    <td className="text-right py-2">
                      {campaign.openRate ? `${(campaign.openRate * 100).toFixed(1)}%` : '-'}
                    </td>
                    <td className="text-right py-2">
                      {campaign.clickRate ? `${(campaign.clickRate * 100).toFixed(1)}%` : '-'}
                    </td>
                    <td className="text-right py-2">
                      {campaign.convRate ? `${(campaign.convRate * 100).toFixed(1)}%` : '-'}
                    </td>
                    <td className="text-right py-2">${campaign.revenue.toFixed(2)}</td>
                    <td className="text-right py-2">
                      {campaign.roas ? (
                        <span className={campaign.roas >= 1 ? 'text-green-600' : 'text-red-600'}>
                          {campaign.roas.toFixed(2)}x
                        </span>
                      ) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}