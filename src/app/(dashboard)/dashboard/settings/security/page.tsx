'use client';

import { useState } from 'react';
import { Shield, Key, Smartphone, AlertCircle, Check } from 'lucide-react';
import TwoFactorSetup from '@/components/TwoFactorSetup';
import { SectionErrorBoundary } from '@/components/ErrorBoundary';

export default function SecuritySettingsPage() {
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleTwoFactorComplete = () => {
    setTwoFactorEnabled(true);
    setShowTwoFactorSetup(false);
  };

  if (showTwoFactorSetup) {
    return (
      <TwoFactorSetup
        onComplete={handleTwoFactorComplete}
        onSkip={() => setShowTwoFactorSetup(false)}
      />
    );
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h1>

      <div className="space-y-6">
        {/* Two-Factor Authentication */}
        <SectionErrorBoundary sectionName="Two-Factor Authentication">
          <div className="card p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Two-Factor Authentication
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Add an extra layer of security to your account using your phone
                  </p>
                  {twoFactorEnabled && (
                    <div className="mt-3 flex items-center text-sm text-green-600">
                      <Check className="w-4 h-4 mr-1" />
                      Enabled
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setShowTwoFactorSetup(true)}
                className={twoFactorEnabled ? 'btn-secondary' : 'btn-primary'}
              >
                {twoFactorEnabled ? 'Manage' : 'Enable'}
              </button>
            </div>
          </div>
        </SectionErrorBoundary>

        {/* Password */}
        <div className="card p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Key className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Password
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Last changed 30 days ago
                </p>
              </div>
            </div>
            <button className="btn-secondary">
              Change Password
            </button>
          </div>
        </div>

        {/* Security Recommendations */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-900">
                Security Recommendations
              </h3>
              <ul className="mt-2 text-sm text-blue-800 space-y-1">
                <li>• Use a unique password for your Huntaze account</li>
                <li>• Enable two-factor authentication for maximum security</li>
                <li>• Review your active sessions regularly</li>
                <li>• Be cautious of phishing emails asking for your credentials</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Active Sessions
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Chrome on MacOS
                </p>
                <p className="text-sm text-gray-500">
                  San Francisco, CA • Current session
                </p>
              </div>
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                Active now
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Safari on iPhone
                </p>
                <p className="text-sm text-gray-500">
                  San Francisco, CA • Last active 2 hours ago
                </p>
              </div>
              <button className="text-sm text-red-600 hover:text-red-700">
                Revoke
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}