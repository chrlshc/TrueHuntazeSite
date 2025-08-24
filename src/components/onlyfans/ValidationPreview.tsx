'use client';

import { CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ValidationPreviewProps {
  validation: {
    type: string;
    headers: string[];
    requiredHeaders: string[];
    missingHeaders: string[];
    isValid: boolean;
    sampleRows: any[];
    totalRows: number;
  };
}

export function ValidationPreview({ validation }: ValidationPreviewProps) {
  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      subscribers: 'Subscribers',
      revenue: 'Revenue',
      content: 'Content',
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-4">
      {/* Validation Status */}
      <div className={cn(
        'rounded-lg p-4',
        validation.isValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
      )}>
        <div className="flex items-start">
          {validation.isValid ? (
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
          )}
          <div className="ml-3">
            <h3 className={cn(
              'text-sm font-medium',
              validation.isValid ? 'text-green-800' : 'text-red-800'
            )}>
              {validation.isValid ? 'Valid CSV Format' : 'Invalid CSV Format'}
            </h3>
            <p className={cn(
              'mt-1 text-sm',
              validation.isValid ? 'text-green-700' : 'text-red-700'
            )}>
              {validation.isValid
                ? `Ready to import ${validation.totalRows} ${getTypeLabel(validation.type).toLowerCase()} records`
                : `Missing required headers: ${validation.missingHeaders.join(', ')}`}
            </p>
          </div>
        </div>
      </div>

      {/* File Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center">
          <Info className="h-5 w-5 text-gray-400" />
          <h4 className="ml-2 text-sm font-medium text-gray-700">File Information</h4>
        </div>
        <dl className="mt-2 space-y-1">
          <div className="flex justify-between text-sm">
            <dt className="text-gray-500">Type:</dt>
            <dd className="font-medium text-gray-900">{getTypeLabel(validation.type)}</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-gray-500">Total Rows:</dt>
            <dd className="font-medium text-gray-900">{validation.totalRows.toLocaleString()}</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-gray-500">Headers Found:</dt>
            <dd className="font-medium text-gray-900">{validation.headers.length}</dd>
          </div>
        </dl>
      </div>

      {/* Headers Comparison */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Header Validation</h4>
        
        {/* Required Headers */}
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Required Headers ({validation.requiredHeaders.length})
          </h5>
          <div className="flex flex-wrap gap-2">
            {validation.requiredHeaders.map((header) => {
              const isPresent = validation.headers.includes(header);
              return (
                <span
                  key={header}
                  className={cn(
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    isPresent
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  )}
                >
                  {isPresent ? '✓' : '✗'} {header}
                </span>
              );
            })}
          </div>
        </div>

        {/* Optional Headers */}
        {validation.headers.length > validation.requiredHeaders.length && (
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Additional Headers Found
            </h5>
            <div className="flex flex-wrap gap-2">
              {validation.headers
                .filter((h) => !validation.requiredHeaders.includes(h))
                .map((header) => (
                  <span
                    key={header}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {header}
                  </span>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Sample Data Preview */}
      {validation.sampleRows.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Sample Data (First {validation.sampleRows.length} rows)
          </h4>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {validation.headers.slice(0, 5).map((header) => (
                      <th
                        key={header}
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                    {validation.headers.length > 5 && (
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ...
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {validation.sampleRows.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      {validation.headers.slice(0, 5).map((header) => (
                        <td
                          key={header}
                          className="px-3 py-2 text-sm text-gray-900 truncate max-w-xs"
                          title={row[header]}
                        >
                          {row[header] || '-'}
                        </td>
                      ))}
                      {validation.headers.length > 5 && (
                        <td className="px-3 py-2 text-sm text-gray-500">
                          +{validation.headers.length - 5} more
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Import Tips */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex">
          <Info className="h-5 w-5 text-blue-400" />
          <div className="ml-3">
            <h4 className="text-sm font-medium text-blue-800">Import Tips</h4>
            <ul className="mt-1 text-sm text-blue-700 space-y-1">
              <li>• Ensure dates are in YYYY-MM-DD format</li>
              <li>• Currency values should not include symbols (e.g., use "9.99" not "$9.99")</li>
              <li>• Leave optional fields empty rather than using "N/A" or similar</li>
              <li>• UTF-8 encoding is recommended for special characters</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}