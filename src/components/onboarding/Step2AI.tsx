'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { aiConfigurationSchema, type AIConfigurationData } from '@/lib/zodSchemas';
import { 
  Sparkles, 
  MessageSquare, 
  Lightbulb, 
  BarChart3, 
  Shield,
  ChevronDown
} from 'lucide-react';

interface Step2AIProps {
  onNext: (data: AIConfigurationData) => void;
  onBack: () => void;
  defaultValues?: Partial<AIConfigurationData>;
}

const replyStyles = [
  { value: 'friendly', label: 'Friendly & Warm', description: 'Casual and approachable tone' },
  { value: 'flirty', label: 'Flirty & Playful', description: 'Teasing and engaging style' },
  { value: 'professional', label: 'Professional', description: 'Business-like and direct' },
  { value: 'custom', label: 'Custom Style', description: 'Define your own personality' },
];

export default function Step2AI({ onNext, onBack, defaultValues }: Step2AIProps) {
  const [showCustomInstructions, setShowCustomInstructions] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<AIConfigurationData>({
    resolver: zodResolver(aiConfigurationSchema),
    defaultValues: {
      enableAI: true,
      aiFeatures: {
        autoReply: true,
        contentSuggestions: true,
        analyticsInsights: true,
        dmcaProtection: true,
      },
      replyStyle: 'friendly',
      ...defaultValues,
    },
  });

  const selectedStyle = watch('replyStyle');
  const enableAI = watch('enableAI');

  const onSubmit = (data: AIConfigurationData) => {
    onNext(data);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Configure Your AI Assistant</h2>
        <p className="mt-2 text-gray-600">
          Customize how your AI assistant helps you manage conversations and grow your business.
        </p>
      </div>

      {/* AI Toggle */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Enable AI Assistant</h3>
              <p className="text-sm text-gray-600">Let AI help you manage conversations 24/7</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              {...register('enableAI')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* AI Features */}
        {enableAI && (
          <>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">AI Features</h3>
              <div className="space-y-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('aiFeatures.autoReply')}
                    className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium text-gray-900">Smart Auto-Reply</span>
                    </div>
                    <p className="text-sm text-gray-600">Draft personalized responses for fan messages</p>
                  </div>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('aiFeatures.contentSuggestions')}
                    className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium text-gray-900">Content Ideas</span>
                    </div>
                    <p className="text-sm text-gray-600">Get AI-powered content suggestions based on trends</p>
                  </div>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('aiFeatures.analyticsInsights')}
                    className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium text-gray-900">Smart Analytics</span>
                    </div>
                    <p className="text-sm text-gray-600">AI insights to maximize your earnings</p>
                  </div>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('aiFeatures.dmcaProtection')}
                    className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium text-gray-900">DMCA Protection</span>
                    </div>
                    <p className="text-sm text-gray-600">Automatic content monitoring and takedown assistance</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Reply Style */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">AI Personality</h3>
              <div className="grid grid-cols-2 gap-4">
                {replyStyles.map((style) => (
                  <label
                    key={style.value}
                    className={`relative flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedStyle === style.value
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      value={style.value}
                      {...register('replyStyle')}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <span className="block text-sm font-medium text-gray-900">
                        {style.label}
                      </span>
                      <span className="block text-sm text-gray-600">
                        {style.description}
                      </span>
                    </div>
                    {selectedStyle === style.value && (
                      <div className="absolute top-4 right-4 h-2 w-2 bg-purple-600 rounded-full"></div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Custom Instructions */}
            {selectedStyle === 'custom' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Instructions
                </label>
                <textarea
                  {...register('customInstructions')}
                  rows={4}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Describe your preferred tone and style. For example: 'Be playful and mysterious, use emojis sparingly, always end with a question to keep the conversation going...'"
                />
                {errors.customInstructions && (
                  <p className="mt-1 text-sm text-red-600">{errors.customInstructions.message}</p>
                )}
              </div>
            )}
          </>
        )}

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
            className="btn-primary"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}