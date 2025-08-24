'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Download, Plus, RefreshCw } from 'lucide-react';
import { onlyFansApi } from '@/lib/api';
import { CSVUploadWidget } from '@/components/onlyfans/CSVUploadWidget';
import { EngagementScoreMetrics } from '@/components/onlyfans/EngagementScoreMetrics';
import { ValidationPreview } from '@/components/onlyfans/ValidationPreview';

export default function OnlyFansDashboard() {
  const queryClient = useQueryClient();
  const [validationData, setValidationData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('import');

  // Fetch sources
  const { data: sources = [], isLoading: sourcesLoading } = useQuery({
    queryKey: ['onlyfans-sources'],
    queryFn: async () => {
      const response = await onlyFansApi.getSources();
      return response.data;
    },
  });

  // Fetch engagement analytics
  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['onlyfans-analytics'],
    queryFn: async () => {
      const response = await onlyFansApi.getEngagementAnalytics();
      return response.data;
    },
    enabled: activeTab === 'analytics',
  });

  // Fetch templates
  const { data: templates } = useQuery({
    queryKey: ['onlyfans-templates'],
    queryFn: async () => {
      const response = await onlyFansApi.getTemplates();
      return response.data;
    },
  });

  // Import mutation
  const importMutation = useMutation({
    mutationFn: (data: FormData) => onlyFansApi.importCSV(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['onlyfans-analytics'] });
      setValidationData(null);
    },
  });

  // Preview mutation
  const previewMutation = useMutation({
    mutationFn: ({ type, csvContent }: { type: string; csvContent: string }) =>
      onlyFansApi.previewCSV(type, csvContent),
    onSuccess: (response) => {
      setValidationData(response.data);
    },
  });

  const handlePreview = (type: string, csvContent: string) => {
    previewMutation.mutate({ type, csvContent });
  };

  const downloadTemplate = (type: string) => {
    if (!templates) return;

    const template = templates[type];
    if (!template) return;

    const headers = template.headers.join(',');
    const sampleRow = template.sample.map((s: any) => 
      template.headers.map((h: string) => s[h] || '').join(',')
    ).join('\n');

    const csvContent = `${headers}\n${sampleRow}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `onlyfans_${type}_template.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">OnlyFans Integration</h1>
          <p className="mt-2 text-sm text-gray-600">
            Import your OnlyFans data to track earnings and analyze fan engagement
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white rounded-lg shadow p-1 inline-flex space-x-1">
            <TabsTrigger
              value="import"
              className="px-4 py-2 text-sm font-medium rounded-md transition-colors data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Import Data
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="px-4 py-2 text-sm font-medium rounded-md transition-colors data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="sources"
              className="px-4 py-2 text-sm font-medium rounded-md transition-colors data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Accounts
            </TabsTrigger>
          </TabsList>

          {/* Import Tab */}
          <TabsContent value="import" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upload Widget */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Upload CSV</h2>
                <CSVUploadWidget
                  sources={sources}
                  onUpload={async (data) => {
                    const response = await importMutation.mutateAsync(data);
                    return response.data;
                  }}
                  onPreview={handlePreview}
                />
              </div>

              {/* Validation Preview */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Validation</h2>
                {validationData ? (
                  <ValidationPreview validation={validationData} />
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      Select a CSV file to see validation results
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Templates */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">CSV Templates</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates && Object.entries(templates).map(([type, template]: [string, any]) => (
                  <div key={type} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {template.headers.length} columns required
                    </p>
                    <button
                      onClick={() => downloadTemplate(type)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Template
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            {analyticsLoading ? (
              <div className="flex justify-center py-12">
                <RefreshCw className="h-8 w-8 animate-spin text-purple-600" />
              </div>
            ) : analytics ? (
              <EngagementScoreMetrics data={analytics} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No analytics data available</p>
              </div>
            )}
          </TabsContent>

          {/* Sources Tab */}
          <TabsContent value="sources">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">OnlyFans Accounts</h2>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Account
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Username
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Currency
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Connected
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Sync
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sources.map((source: any) => (
                      <tr key={source.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          @{source.externalHandle}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {source.currency}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(source.connectedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {source.lastSync
                            ? new Date(source.lastSync).toLocaleDateString()
                            : 'Never'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            source.active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {source.active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}