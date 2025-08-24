'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const uploadSchema = z.object({
  type: z.enum(['subscribers', 'revenue', 'content']),
  sourceId: z.string().min(1, 'Please select a source'),
  file: z.instanceof(File).optional(),
});

type UploadFormData = z.infer<typeof uploadSchema>;

interface CSVUploadWidgetProps {
  sources: Array<{ id: string; externalHandle: string; currency: string }>;
  onUpload: (data: FormData) => Promise<any>;
  onPreview?: (type: string, content: string) => void;
}

export function CSVUploadWidget({ sources, onUpload, onPreview }: CSVUploadWidgetProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fileContent, setFileContent] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
  });

  const selectedType = watch('type');
  const selectedFile = watch('file');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      setValue('file', file);
      readFileContent(file);
    }
  }, [setValue]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('file', file);
      readFileContent(file);
    }
  };

  const readFileContent = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setFileContent(content);
      if (onPreview && selectedType) {
        onPreview(selectedType, content);
      }
    };
    reader.readAsText(file);
  };

  const onSubmit = async (data: UploadFormData) => {
    if (!data.file) {
      setErrorMessage('Please select a file');
      return;
    }

    setUploadStatus('uploading');
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('type', data.type);
      formData.append('sourceId', data.sourceId);
      formData.append('file', data.file);
      formData.append('csvContent', fileContent);

      const result = await onUpload(formData);
      setUploadStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setUploadStatus('idle');
        setValue('file', undefined);
        setFileContent('');
      }, 3000);
    } catch (error: any) {
      setUploadStatus('error');
      setErrorMessage(error.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* CSV Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          CSV Type
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'subscribers', label: 'Subscribers', icon: '👥' },
            { value: 'revenue', label: 'Revenue', icon: '💰' },
            { value: 'content', label: 'Content', icon: '📸' },
          ].map((type) => (
            <label
              key={type.value}
              className={cn(
                'relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none',
                selectedType === type.value
                  ? 'border-purple-600 ring-2 ring-purple-600'
                  : 'border-gray-300'
              )}
            >
              <input
                type="radio"
                value={type.value}
                {...register('type')}
                className="sr-only"
              />
              <span className="flex flex-1">
                <span className="flex flex-col">
                  <span className="text-2xl mb-1">{type.icon}</span>
                  <span className="block text-sm font-medium text-gray-900">
                    {type.label}
                  </span>
                </span>
              </span>
            </label>
          ))}
        </div>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      {/* Source Selection */}
      <div>
        <label htmlFor="sourceId" className="block text-sm font-medium text-gray-700">
          OnlyFans Account
        </label>
        <select
          id="sourceId"
          {...register('sourceId')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        >
          <option value="">Select an account</option>
          {sources.map((source) => (
            <option key={source.id} value={source.id}>
              @{source.externalHandle} ({source.currency})
            </option>
          ))}
        </select>
        {errors.sourceId && (
          <p className="mt-1 text-sm text-red-600">{errors.sourceId.message}</p>
        )}
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          CSV File
        </label>
        <div
          className={cn(
            'mt-1 flex justify-center rounded-lg border-2 border-dashed px-6 pt-5 pb-6',
            isDragging
              ? 'border-purple-400 bg-purple-50'
              : 'border-gray-300 bg-white',
            uploadStatus === 'success' && 'border-green-400 bg-green-50',
            uploadStatus === 'error' && 'border-red-400 bg-red-50'
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="space-y-1 text-center">
            {uploadStatus === 'idle' && (
              <>
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-purple-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-500 focus-within:ring-offset-2 hover:text-purple-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".csv"
                      onChange={handleFileSelect}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">CSV files only</p>
              </>
            )}

            {uploadStatus === 'uploading' && (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                <p className="mt-2 text-sm text-gray-600">Uploading...</p>
              </div>
            )}

            {uploadStatus === 'success' && (
              <>
                <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                <p className="text-sm text-green-600">Upload successful!</p>
              </>
            )}

            {uploadStatus === 'error' && (
              <>
                <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
                <p className="text-sm text-red-600">{errorMessage}</p>
              </>
            )}
          </div>
        </div>

        {selectedFile && uploadStatus === 'idle' && (
          <div className="mt-2 flex items-center justify-between rounded-md bg-gray-50 px-3 py-2">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-gray-400" />
              <span className="ml-2 text-sm text-gray-900">{selectedFile.name}</span>
              <span className="ml-2 text-xs text-gray-500">
                ({(selectedFile.size / 1024).toFixed(1)} KB)
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setValue('file', undefined);
                setFileContent('');
              }}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting || !selectedType || !selectedFile}
          className={cn(
            'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white',
            isSubmitting || !selectedType || !selectedFile
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
          )}
        >
          {isSubmitting ? 'Processing...' : 'Import CSV'}
        </button>
      </div>
    </form>
  );
}