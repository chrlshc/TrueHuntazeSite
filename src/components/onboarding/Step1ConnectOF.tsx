'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { onlyFansConnectionSchema, type OnlyFansConnectionData } from '@/lib/zodSchemas';
import { AlertCircle, Lock, Shield, Eye, EyeOff } from 'lucide-react';

interface Step1ConnectOFProps {
  onNext: (data: OnlyFansConnectionData) => void;
  defaultValues?: Partial<OnlyFansConnectionData>;
}

export default function Step1ConnectOF({ onNext, defaultValues }: Step1ConnectOFProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<OnlyFansConnectionData>({
    resolver: zodResolver(onlyFansConnectionSchema),
    defaultValues: {
      acceptCompliance: false,
      ...defaultValues,
    },
  });

  const onSubmit = async (data: OnlyFansConnectionData) => {
    setIsConnecting(true);
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsConnecting(false);
    onNext(data);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Connect Your OnlyFans Account</h2>
        <p className="mt-2 text-gray-600">
          We'll help you connect your OnlyFans account securely. Your credentials are encrypted and never stored.
        </p>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-900">Bank-Level Security</h3>
            <p className="mt-1 text-sm text-blue-700">
              Your login credentials are encrypted end-to-end and never stored on our servers. 
              We use secure OAuth-like authentication.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            OnlyFans Email
          </label>
          <input
            type="email"
            {...register('email')}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="your-of-email@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            OnlyFans Password
          </label>
          <div className="mt-1 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Two-Factor Code (if enabled)
          </label>
          <input
            type="text"
            {...register('twoFactorCode')}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="Optional"
          />
        </div>

        {/* Compliance Agreement */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-start">
            <input
              type="checkbox"
              {...register('acceptCompliance')}
              className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <div className="ml-3">
              <label className="text-sm text-gray-900">
                I understand and agree to the OnlyFans compliance terms
              </label>
              <p className="mt-1 text-xs text-gray-600">
                • Huntaze operates in "Assisted Mode" - you maintain full control
                <br />
                • No automated posting or messaging without your approval
                <br />
                • You remain responsible for all content and interactions
                <br />
                • We help draft content, you review and post manually
              </p>
            </div>
          </div>
          {errors.acceptCompliance && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.acceptCompliance.message}
            </p>
          )}
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            className="btn-secondary"
            disabled
          >
            Previous
          </button>
          <button
            type="submit"
            disabled={isConnecting}
            className="btn-primary min-w-[120px]"
          >
            {isConnecting ? 'Connecting...' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
}