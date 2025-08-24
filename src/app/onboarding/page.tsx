'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Step1ConnectOF from '@/components/onboarding/Step1ConnectOF';
import Step2AI from '@/components/onboarding/Step2AI';
import Step3Payments from '@/components/onboarding/Step3Payments';
import type { 
  OnlyFansConnectionData, 
  AIConfigurationData, 
  PaymentSetupData 
} from '@/lib/zodSchemas';
import { Check, ChevronRight } from 'lucide-react';
import { useOnboardingAnalytics } from '@/hooks/useAnalytics';

const steps = [
  { id: 1, name: 'Connect OnlyFans', description: 'Secure connection' },
  { id: 2, name: 'Configure AI', description: 'Personalize assistant' },
  { id: 3, name: 'Choose Plan', description: 'Select pricing' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { trackStepCompleted, trackOnboardingCompleted, trackOnboardingAbandoned } = useOnboardingAnalytics();
  
  // Store form data
  const [formData, setFormData] = useState({
    onlyFansConnection: {} as OnlyFansConnectionData,
    aiConfiguration: {} as AIConfigurationData,
    paymentSetup: {} as PaymentSetupData,
  });

  // Track onboarding start
  useEffect(() => {
    trackStepCompleted(1, 'Connect OnlyFans');
  }, []);

  // Track abandonment on unmount if not completed
  useEffect(() => {
    return () => {
      if (currentStep < 3 && !isSubmitting) {
        const stepName = steps[currentStep - 1].name;
        trackOnboardingAbandoned(currentStep, stepName);
      }
    };
  }, [currentStep, isSubmitting]);

  const handleStep1Complete = (data: OnlyFansConnectionData) => {
    setFormData(prev => ({ ...prev, onlyFansConnection: data }));
    trackStepCompleted(1, 'Connect OnlyFans');
    setCurrentStep(2);
  };

  const handleStep2Complete = (data: AIConfigurationData) => {
    setFormData(prev => ({ ...prev, aiConfiguration: data }));
    trackStepCompleted(2, 'Configure AI');
    setCurrentStep(3);
  };

  const handleStep3Complete = async (data: PaymentSetupData) => {
    setFormData(prev => ({ ...prev, paymentSetup: data }));
    setIsSubmitting(true);
    
    // Calculate pricing based on plan
    const pricingMap = {
      pro: { monthly: 49, yearly: 490 },
      growth: { monthly: 99, yearly: 990 },
      scale: { monthly: 499, yearly: 4990 },
      enterprise: { monthly: 0, yearly: 0 }, // Custom pricing
    };
    
    const price = pricingMap[data.plan]?.[data.billingInterval] || 0;

    try {
      // Submit all data to backend
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          paymentSetup: data,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        
        // Track successful onboarding completion
        trackOnboardingCompleted(data.plan, data.billingInterval, price);
        
        if (responseData.checkoutUrl) {
          // Redirect to Stripe checkout
          window.location.href = responseData.checkoutUrl;
        } else {
          // Redirect to dashboard if no payment needed
          router.push('/dashboard');
        }
      } else {
        console.error('Failed to complete onboarding');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error completing onboarding:', error);
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-2xl font-bold text-gradient">Huntaze</span>
            </div>
            <button className="text-sm text-gray-500 hover:text-gray-700">
              Need help?
            </button>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-between">
            {steps.map((step, stepIdx) => (
              <li key={step.id} className={`flex items-center ${stepIdx !== steps.length - 1 ? 'flex-1' : ''}`}>
                <div className="flex items-center">
                  <div
                    className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                      step.id < currentStep
                        ? 'bg-purple-600 border-purple-600'
                        : step.id === currentStep
                        ? 'border-purple-600 bg-white'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {step.id < currentStep ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <span
                        className={`text-sm font-medium ${
                          step.id === currentStep ? 'text-purple-600' : 'text-gray-500'
                        }`}
                      >
                        {step.id}
                      </span>
                    )}
                  </div>
                  <div className="ml-4">
                    <p
                      className={`text-sm font-medium ${
                        step.id <= currentStep ? 'text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {step.name}
                    </p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
                {stepIdx !== steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className="h-0.5 bg-gray-200">
                      <div
                        className="h-0.5 bg-purple-600 transition-all duration-500"
                        style={{ width: step.id < currentStep ? '100%' : '0%' }}
                      />
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Form Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {currentStep === 1 && (
            <Step1ConnectOF 
              onNext={handleStep1Complete}
              defaultValues={formData.onlyFansConnection}
            />
          )}
          {currentStep === 2 && (
            <Step2AI 
              onNext={handleStep2Complete}
              onBack={goBack}
              defaultValues={formData.aiConfiguration}
            />
          )}
          {currentStep === 3 && (
            <Step3Payments 
              onComplete={handleStep3Complete}
              onBack={goBack}
              defaultValues={formData.paymentSetup}
            />
          )}
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500">
          <span>🔒 Bank-level encryption</span>
          <span>•</span>
          <span>✓ GDPR compliant</span>
          <span>•</span>
          <span>🛡️ SOC 2 certified</span>
        </div>
      </div>

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-lg font-medium text-gray-900">Setting up your account...</p>
            <p className="text-sm text-gray-600 mt-2">This may take a few moments</p>
          </div>
        </div>
      )}
    </div>
  );
}