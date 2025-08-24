'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentSetupSchema, type PaymentSetupData } from '@/lib/zodSchemas';
import { Check, X, Sparkles, TrendingUp, Rocket, Building2 } from 'lucide-react';

interface Step3PaymentsProps {
  onComplete: (data: PaymentSetupData) => void;
  onBack: () => void;
  defaultValues?: Partial<PaymentSetupData>;
}

const plans = [
  {
    id: 'pro',
    name: 'PRO',
    icon: Sparkles,
    monthlyPrice: 49,
    yearlyPrice: 490,
    commission: '20% → 15% → 10% → 5%',
    caps: '$500 → $1k → $2k → $5k',
    features: [
      'AI Auto-responder',
      'Basic analytics',
      'Content scheduler',
      'DMCA protection',
      'Email support',
    ],
    notIncluded: ['Priority support', 'Custom AI training', 'API access'],
  },
  {
    id: 'growth',
    name: 'Growth',
    icon: TrendingUp,
    monthlyPrice: 99,
    yearlyPrice: 990,
    commission: '15% → 10% → 7.5% → 5%',
    caps: '$1k → $2.5k → $5k → $10k',
    popular: true,
    features: [
      'Everything in PRO',
      'Advanced AI features',
      'Priority support',
      'Custom AI personality',
      'Bulk messaging',
      'Advanced analytics',
    ],
    notIncluded: ['Custom AI training', 'API access'],
  },
  {
    id: 'scale',
    name: 'Scale',
    icon: Rocket,
    monthlyPrice: 499,
    yearlyPrice: 4990,
    commission: '10% → 7.5% → 5% → 2.5%',
    caps: '$2k → $5k → $10k → $25k',
    features: [
      'Everything in Growth',
      'Custom AI training',
      'API access',
      'Dedicated account manager',
      'Custom integrations',
      'White-glove onboarding',
    ],
    notIncluded: [],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    icon: Building2,
    monthlyPrice: null,
    yearlyPrice: null,
    commission: 'Custom rates',
    caps: 'No caps',
    features: [
      'Everything in Scale',
      'Custom commission structure',
      'Unlimited everything',
      'SLA guarantees',
      'Custom features',
      'Team training',
    ],
    notIncluded: [],
  },
];

export default function Step3Payments({ onComplete, onBack, defaultValues }: Step3PaymentsProps) {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<PaymentSetupData>({
    resolver: zodResolver(paymentSetupSchema),
    defaultValues: {
      plan: 'growth',
      billingInterval: 'monthly',
      acceptTerms: false,
      ...defaultValues,
    },
  });

  const selectedPlan = watch('plan');

  const onSubmit = (data: PaymentSetupData) => {
    onComplete(data);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Plan</h2>
        <p className="mt-2 text-gray-600">
          Start earning more with lower fees than any agency. First month free if under $1.5k revenue!
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="relative bg-gray-100 rounded-lg p-1">
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => {
                setBillingInterval('monthly');
                setValue('billingInterval', 'monthly');
              }}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                billingInterval === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => {
                setBillingInterval('yearly');
                setValue('billingInterval', 'yearly');
              }}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                billingInterval === 'yearly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="ml-1 text-xs text-green-600">Save 20%</span>
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <label
              key={plan.id}
              className={`relative flex flex-col p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? 'border-purple-600 bg-purple-50 scale-105 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                value={plan.id}
                {...register('plan')}
                className="sr-only"
              />
              
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <plan.icon className="h-8 w-8 text-purple-600" />
                {selectedPlan === plan.id && (
                  <div className="h-6 w-6 bg-purple-600 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">{plan.name}</h3>
              
              <div className="mb-4">
                {plan.monthlyPrice ? (
                  <div>
                    <span className="text-3xl font-bold text-gray-900">
                      ${billingInterval === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className="text-gray-600">/{billingInterval === 'monthly' ? 'mo' : 'yr'}</span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">Custom</span>
                )}
              </div>

              <div className="mb-4 space-y-1">
                <p className="text-xs font-medium text-gray-700">Commission: {plan.commission}</p>
                <p className="text-xs font-medium text-gray-700">Monthly caps: {plan.caps}</p>
              </div>

              <ul className="space-y-2 mb-4 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
                {plan.notIncluded.map((feature, i) => (
                  <li key={i} className="flex items-start text-sm opacity-50">
                    <X className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
            </label>
          ))}
        </div>

        {/* Promo Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Promo Code (Optional)
          </label>
          <input
            type="text"
            {...register('promoCode')}
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="Enter promo code"
          />
        </div>

        {/* Terms */}
        <div className="bg-gray-50 rounded-lg p-4">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              {...register('acceptTerms')}
              className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <div className="ml-3">
              <span className="text-sm text-gray-900">
                I agree to the Terms of Service and Privacy Policy
              </span>
              <p className="mt-1 text-xs text-gray-600">
                You can cancel or change your plan anytime. Commission is only charged on earnings through the platform.
              </p>
            </div>
          </label>
          {errors.acceptTerms && (
            <p className="mt-2 text-sm text-red-600">{errors.acceptTerms.message}</p>
          )}
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="btn-secondary"
          >
            Previous
          </button>
          <button
            type="submit"
            className="btn-primary min-w-[150px]"
          >
            Complete Setup
          </button>
        </div>
      </form>
    </div>
  );
}