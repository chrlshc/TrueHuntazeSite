'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, TrendingUp, TrendingDown, Users, DollarSign, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { api } from '@/lib/api';

interface OverviewMetrics {
  gmv: number;
  netRevenue: number;
  activeFans: number;
  engagement: number;
  period: '7d' | '28d';
  comparison?: {
    gmv: number;
    netRevenue: number;
    activeFans: number;
    engagement: number;
  };
}

export function OverviewDashboard() {
  const [metrics, setMetrics] = useState<OverviewMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'7d' | '28d'>('7d');
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'pdf'>('csv');

  useEffect(() => {
    fetchMetrics();
  }, [period]);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/analytics/overview?range=${period}`);
      setMetrics(response.data);
    } catch (error) {
      console.error('Failed to fetch overview metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await api.get(`/export/overview.${exportFormat}?range=${period}`, {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `huntaze-overview-${period}.${exportFormat}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const calculateChange = (current: number, previous?: number) => {
    if (!previous || previous === 0) return null;
    return ((current - previous) / previous) * 100;
  };

  const formatChange = (change: number | null) => {
    if (change === null) return null;
    const isPositive = change >= 0;
    return (
      <span className={`flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
        {isPositive ? '+' : ''}{change.toFixed(1)}%
      </span>
    );
  };

  if (loading || !metrics) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  const gmvChange = calculateChange(metrics.gmv, metrics.comparison?.gmv);
  const netRevenueChange = calculateChange(metrics.netRevenue, metrics.comparison?.netRevenue);
  const activeFansChange = calculateChange(metrics.activeFans, metrics.comparison?.activeFans);
  const engagementChange = calculateChange(metrics.engagement, metrics.comparison?.engagement);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics Overview</h1>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gross Merchandise Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.gmv.toLocaleString()}</div>
            {formatChange(gmvChange)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.netRevenue.toLocaleString()}</div>
            {formatChange(netRevenueChange)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Fans</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeFans.toLocaleString()}</div>
            {formatChange(activeFansChange)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(metrics.engagement * 100).toFixed(1)}%</div>
            {formatChange(engagementChange)}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={generateMockTrendData(period)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              <Area
                type="monotone"
                dataKey="gmv"
                stroke="#7C3AED"
                fill="#7C3AED"
                fillOpacity={0.2}
                name="GMV"
              />
              <Area
                type="monotone"
                dataKey="netRevenue"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.2}
                name="Net Revenue"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

// Mock data generator for demo purposes
function generateMockTrendData(period: '7d' | '28d') {
  const days = period === '7d' ? 7 : 28;
  const data = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      gmv: Math.floor(Math.random() * 5000) + 10000,
      netRevenue: Math.floor(Math.random() * 4000) + 8000,
    });
  }
  
  return data;
}