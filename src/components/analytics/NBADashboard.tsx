'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { 
  Zap, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target,
  AlertCircle,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from '@/components/ui/use-toast';

interface NBAAction {
  id: string;
  title: string;
  description: string;
  priority: number;
  score: number;
  impact: number;
  probability: number;
  confidence: number;
  effort: number;
  risk: number;
  reason: string;
  params: Record<string, any>;
  expectedRevenue?: number;
  affectedFans?: number;
}

const priorityColors = {
  1: 'destructive',
  2: 'default',
  3: 'secondary',
} as const;

const priorityLabels = {
  1: 'High Priority',
  2: 'Medium Priority',
  3: 'Low Priority',
};

export function NBADashboard() {
  const [actions, setActions] = useState<NBAAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [executing, setExecuting] = useState<string | null>(null);
  const [maxActions, setMaxActions] = useState(3);

  useEffect(() => {
    fetchNextActions();
  }, [maxActions]);

  const fetchNextActions = async () => {
    try {
      setLoading(true);
      const response = await api.post('/nba/next', { maxActions });
      setActions(response.data.actions);
    } catch (error) {
      console.error('Failed to fetch NBA actions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load recommendations',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const executeAction = async (action: NBAAction) => {
    try {
      setExecuting(action.id);
      const response = await api.post('/nba/execute', {
        actionId: action.id,
        params: action.params,
      });
      
      toast({
        title: 'Action Scheduled',
        description: `${action.title} has been scheduled for execution`,
      });
      
      // Refresh actions
      await fetchNextActions();
    } catch (error) {
      console.error('Failed to execute action:', error);
      toast({
        title: 'Execution Failed',
        description: 'Failed to execute the action. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setExecuting(null);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.7) return 'text-green-600';
    if (score >= 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'impact': return <TrendingUp className="w-4 h-4" />;
      case 'probability': return <Target className="w-4 h-4" />;
      case 'confidence': return <CheckCircle className="w-4 h-4" />;
      case 'effort': return <Clock className="w-4 h-4" />;
      case 'risk': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading recommendations...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-600" />
            AI Recommendations
          </h1>
          <p className="text-muted-foreground mt-1">
            Smart actions to maximize your revenue and engagement
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Show top</span>
            <div className="w-20">
              <Slider
                value={[maxActions]}
                onValueChange={([value]) => setMaxActions(value)}
                min={1}
                max={5}
                step={1}
              />
            </div>
            <span className="text-sm font-medium">{maxActions}</span>
          </div>
          <Button onClick={fetchNextActions} variant="outline">
            Refresh
          </Button>
        </div>
      </div>

      {actions.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Zap className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No recommendations available</p>
            <p className="text-sm text-muted-foreground">Check back later for new opportunities</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {actions.map((action, index) => (
            <Card key={action.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      {action.title}
                      <Badge variant={priorityColors[action.priority as keyof typeof priorityColors]}>
                        {priorityLabels[action.priority as keyof typeof priorityLabels]}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getScoreColor(action.score)}`}>
                      {(action.score * 100).toFixed(0)}
                    </div>
                    <div className="text-xs text-muted-foreground">Score</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Reason:</span>
                  <span>{action.reason}</span>
                </div>

                <div className="grid grid-cols-5 gap-4">
                  {(['impact', 'probability', 'confidence', 'effort', 'risk'] as const).map((metric) => (
                    <div key={metric} className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        {getMetricIcon(metric)}
                      </div>
                      <Progress 
                        value={action[metric] * 100} 
                        className="h-2 mb-1"
                      />
                      <div className="text-xs text-muted-foreground capitalize">{metric}</div>
                      <div className="text-xs font-medium">{(action[metric] * 100).toFixed(0)}%</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex gap-4 text-sm">
                    {action.expectedRevenue && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">
                          ${action.expectedRevenue.toLocaleString()} expected
                        </span>
                      </div>
                    )}
                    {action.affectedFans && (
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">
                          {action.affectedFans.toLocaleString()} fans
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <Button
                    onClick={() => executeAction(action)}
                    disabled={executing === action.id}
                    size="sm"
                  >
                    {executing === action.id ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Executing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Execute
                      </>
                    )}
                  </Button>
                </div>

                {/* Action parameters preview */}
                {Object.keys(action.params).length > 0 && (
                  <div className="pt-4 border-t">
                    <div className="text-xs text-muted-foreground mb-2">Parameters:</div>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(action.params).map(([key, value]) => (
                        <Badge key={key} variant="outline" className="text-xs">
                          {key}: {String(value)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}