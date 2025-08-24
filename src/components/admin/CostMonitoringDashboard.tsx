import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { DollarSign, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface CostData {
  budget: {
    total: number;
    backup: number;
    ai: number;
  };
  spent: {
    total: number;
    backup: number;
    ai: {
      azure: number;
      anthropic: number;
    };
  };
  projections: {
    endOfMonth: number;
    overBudget: boolean;
  };
  history: Array<{
    date: string;
    backup: number;
    ai: number;
    total: number;
  }>;
}

export function CostMonitoringDashboard() {
  const [costData, setCostData] = useState<CostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(60000); // 1 minute

  useEffect(() => {
    fetchCostData();
    const interval = setInterval(fetchCostData, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  const fetchCostData = async () => {
    try {
      const response = await fetch('/api/admin/costs');
      const data = await response.json();
      setCostData(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch cost data:', error);
      setLoading(false);
    }
  };

  if (loading || !costData) {
    return <div>Loading cost data...</div>;
  }

  const budgetUsagePercentage = (costData.spent.total / costData.budget.total) * 100;
  const backupUsagePercentage = (costData.spent.backup / costData.budget.backup) * 100;
  const aiUsagePercentage = (
    (costData.spent.ai.azure + costData.spent.ai.anthropic) / costData.budget.ai
  ) * 100;

  const pieData = [
    { name: 'Backup', value: costData.spent.backup, color: '#3B82F6' },
    { name: 'Azure AI', value: costData.spent.ai.azure, color: '#10B981' },
    { name: 'Claude AI', value: costData.spent.ai.anthropic, color: '#F59E0B' },
    { 
      name: 'Available', 
      value: costData.budget.total - costData.spent.total, 
      color: '#E5E7EB' 
    },
  ];

  const getBudgetStatus = (percentage: number) => {
    if (percentage >= 95) return { color: 'text-red-600', icon: AlertTriangle, status: 'Critical' };
    if (percentage >= 80) return { color: 'text-yellow-600', icon: AlertTriangle, status: 'Warning' };
    return { color: 'text-green-600', icon: CheckCircle, status: 'Healthy' };
  };

  const totalStatus = getBudgetStatus(budgetUsagePercentage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cost Monitoring Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Budget Alert */}
      {budgetUsagePercentage >= 80 && (
        <Alert variant={budgetUsagePercentage >= 95 ? 'destructive' : 'warning'}>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {budgetUsagePercentage >= 95
              ? `Critical: Budget usage at ${budgetUsagePercentage.toFixed(1)}%! Immediate action required.`
              : `Warning: Budget usage at ${budgetUsagePercentage.toFixed(1)}%. Monitor closely.`}
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Monthly Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${costData.budget.total}</div>
            <div className="flex items-center mt-2">
              <Progress value={budgetUsagePercentage} className="flex-1" />
              <span className={`ml-2 text-sm ${totalStatus.color}`}>
                {budgetUsagePercentage.toFixed(1)}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              ${costData.spent.total.toFixed(2)} spent | 
              ${(costData.budget.total - costData.spent.total).toFixed(2)} remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Backup Infrastructure</CardTitle>
            <div className="h-4 w-4 bg-blue-500 rounded" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${costData.spent.backup.toFixed(2)}</div>
            <Progress value={backupUsagePercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Budget: ${costData.budget.backup} | 
              {backupUsagePercentage.toFixed(1)}% used
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Services</CardTitle>
            <div className="h-4 w-4 bg-green-500 rounded" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(costData.spent.ai.azure + costData.spent.ai.anthropic).toFixed(2)}
            </div>
            <Progress value={aiUsagePercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Budget: ${costData.budget.ai} | 
              {aiUsagePercentage.toFixed(1)}% used
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cost Distribution */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cost Distribution</CardTitle>
            <CardDescription>Current month spending by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: $${value.toFixed(0)}`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Cost Trend</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={costData.history.slice(-7)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="backup" 
                  stroke="#3B82F6" 
                  name="Backup"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="ai" 
                  stroke="#10B981" 
                  name="AI Services"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#6B7280" 
                  name="Total"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Usage Details */}
      <Card>
        <CardHeader>
          <CardTitle>AI Service Breakdown</CardTitle>
          <CardDescription>Token usage and costs by provider</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Azure OpenAI (GPT-4)</span>
                <span className="text-sm text-muted-foreground">
                  ${costData.spent.ai.azure.toFixed(2)} / ${costData.budget.ai * 0.75}
                </span>
              </div>
              <Progress 
                value={(costData.spent.ai.azure / (costData.budget.ai * 0.75)) * 100} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Primary AI for analysis and complex tasks
              </p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Anthropic Claude</span>
                <span className="text-sm text-muted-foreground">
                  ${costData.spent.ai.anthropic.toFixed(2)} / ${costData.budget.ai * 0.25}
                </span>
              </div>
              <Progress 
                value={(costData.spent.ai.anthropic / (costData.budget.ai * 0.25)) * 100} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Secondary AI for conversations and content
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projections */}
      <Card className={costData.projections.overBudget ? 'border-red-500' : ''}>
        <CardHeader>
          <CardTitle>End of Month Projection</CardTitle>
          <CardDescription>
            Based on current usage patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            ${costData.projections.endOfMonth.toFixed(2)}
          </div>
          {costData.projections.overBudget && (
            <Alert variant="destructive" className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Projected to exceed budget by $
                {(costData.projections.endOfMonth - costData.budget.total).toFixed(2)}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="mt-4 space-y-2">
            <h4 className="font-medium">Cost Optimization Suggestions:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {aiUsagePercentage > 70 && (
                <li>• Enable more aggressive AI response caching</li>
              )}
              {backupUsagePercentage > 70 && (
                <li>• Reduce backup retention to 90 days</li>
              )}
              <li>• Batch similar AI requests together</li>
              <li>• Use GPT-3.5 for simple classification tasks</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}