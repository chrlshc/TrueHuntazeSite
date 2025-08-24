'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Shield, Smartphone, Copy, Check } from 'lucide-react';
import { useApiCall } from '@/hooks/useApiCall';

interface TwoFactorSetupProps {
  onComplete: () => void;
  onSkip?: () => void;
}

export default function TwoFactorSetup({ onComplete, onSkip }: TwoFactorSetupProps) {
  const [step, setStep] = useState<'intro' | 'setup' | 'verify'>('intro');
  const [secret, setSecret] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const { execute: setupTwoFactor, loading: setupLoading } = useApiCall();
  const { execute: verifyTwoFactor, loading: verifyLoading, error } = useApiCall();

  const handleSetup = async () => {
    const result = await setupTwoFactor('/api/auth/2fa/setup', {
      method: 'POST',
    });

    if (result) {
      setSecret(result.secret);
      setQrCode(result.qrCode);
      setBackupCodes(result.backupCodes);
      setStep('setup');
    }
  };

  const handleVerify = async () => {
    const result = await verifyTwoFactor('/api/auth/2fa/verify', {
      method: 'POST',
      body: JSON.stringify({ code: verificationCode }),
    });

    if (result) {
      setStep('verify');
      setTimeout(onComplete, 2000);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (step === 'intro') {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-10 h-10 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Secure Your Account with 2FA
          </h2>
          <p className="text-gray-600">
            Add an extra layer of security to protect your account and earnings
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-purple-900 mb-3">Why enable 2FA?</h3>
          <ul className="space-y-2 text-sm text-purple-800">
            <li className="flex items-start">
              <Check className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>99% reduction in account compromise risk</span>
            </li>
            <li className="flex items-start">
              <Check className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>Protect your revenue and fan data</span>
            </li>
            <li className="flex items-start">
              <Check className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>Required for Scale and Enterprise plans</span>
            </li>
          </ul>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleSetup}
            disabled={setupLoading}
            className="flex-1 btn-primary"
          >
            {setupLoading ? 'Setting up...' : 'Enable 2FA'}
          </button>
          {onSkip && (
            <button
              onClick={onSkip}
              className="flex-1 btn-secondary"
            >
              Skip for now
            </button>
          )}
        </div>
      </div>
    );
  }

  if (step === 'setup') {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Set Up Two-Factor Authentication
        </h2>

        <div className="space-y-6">
          {/* Step 1: Install App */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-semibold">1</span>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Install an authenticator app
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Download one of these apps on your phone:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://support.google.com/accounts/answer/1066447"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <Smartphone className="w-5 h-5 mr-2 text-gray-600" />
                    <span className="text-sm">Google Authenticator</span>
                  </a>
                  <a
                    href="https://www.microsoft.com/en-us/security/mobile-authenticator-app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <Smartphone className="w-5 h-5 mr-2 text-gray-600" />
                    <span className="text-sm">Microsoft Authenticator</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Scan QR Code */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-semibold">2</span>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Scan this QR code
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Open your authenticator app and scan this code:
                </p>
                <div className="flex flex-col items-center">
                  <div className="bg-white p-4 border-2 border-gray-200 rounded-lg">
                    <QRCodeSVG value={qrCode} size={200} />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500 mb-2">
                      Can't scan? Enter this code manually:
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-gray-100 px-3 py-1 rounded font-mono">
                        {secret}
                      </code>
                      <button
                        onClick={() => copyToClipboard(secret)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Verify */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-semibold">3</span>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Enter verification code
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Enter the 6-digit code from your authenticator app:
                </p>
                <div className="flex gap-4 items-start">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    className="w-32 px-4 py-2 border border-gray-300 rounded-lg text-center font-mono text-lg"
                    maxLength={6}
                  />
                  <button
                    onClick={handleVerify}
                    disabled={verifyLoading || verificationCode.length !== 6}
                    className="btn-primary"
                  >
                    {verifyLoading ? 'Verifying...' : 'Verify & Enable'}
                  </button>
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Backup Codes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-semibold text-yellow-900 mb-2">
              Save your backup codes
            </h3>
            <p className="text-sm text-yellow-800 mb-4">
              Store these codes safely. You can use them to access your account if you lose your phone.
            </p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {backupCodes.map((code, index) => (
                <code key={index} className="text-sm bg-white px-3 py-2 rounded border border-yellow-300 font-mono">
                  {code}
                </code>
              ))}
            </div>
            <button
              onClick={() => copyToClipboard(backupCodes.join('\n'))}
              className="btn-secondary text-sm"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy all codes
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check className="w-10 h-10 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        2FA Enabled Successfully!
      </h2>
      <p className="text-gray-600">
        Your account is now protected with two-factor authentication.
      </p>
    </div>
  );
}