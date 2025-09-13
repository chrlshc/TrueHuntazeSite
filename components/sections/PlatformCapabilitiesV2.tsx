'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  ChevronRight,
  Clock,
  ArrowRight
} from 'lucide-react'

interface Feature {
  emoji: string
  tag: string
  title: string
  description: string
  metrics: {
    label: string
    value: string
  }[]
  screenshot: string
  screenshotAlt: string
}

const features: Feature[] = [
  {
    emoji: '💬',
    tag: 'AI CONVERSATIONS',
    title: 'Messages that sell themselves',
    description: 'Your AI learns your voice and personality. Handles 10,000+ DMs simultaneously with personalized responses that convert.',
    metrics: [
      { label: 'Response time', value: '<2 sec' },
      { label: 'Conversion lift', value: '+47%' }
    ],
    screenshot: '/screenshots/ai-chat.png',
    screenshotAlt: 'AI chat interface showing personalized conversation management'
  },
  {
    emoji: '💎',
    tag: 'PPV AUTOMATION',
    title: 'Turn every fan into premium revenue',
    description: 'Smart pricing, automatic upsells, and re-engagement campaigns. Your PPV content works 24/7.',
    metrics: [
      { label: 'Revenue per fan', value: '+312%' },
      { label: 'Unlock rate', value: '3.2x higher' }
    ],
    screenshot: '/screenshots/ppv-engine.png',
    screenshotAlt: 'PPV automation dashboard showing revenue optimization features'
  },
  {
    emoji: '📊',
    tag: 'UNIFIED CRM',
    title: 'Never lose a whale again',
    description: 'See all platforms in one dashboard. Track lifetime value, segment fans, and never miss a high-spender.',
    metrics: [
      { label: 'Platforms unified', value: '7+' },
      { label: 'Retention boost', value: '+89%' }
    ],
    screenshot: '/screenshots/crm-view.png',
    screenshotAlt: 'Unified CRM dashboard showing fan management across platforms'
  },
  {
    emoji: '🎯',
    tag: 'SMART CAMPAIGNS',
    title: 'Set it and forget it marketing',
    description: 'Automated campaigns that run themselves. Welcome series, win-backs, VIP treatment - all on autopilot.',
    metrics: [
      { label: 'Time saved', value: '20+ hrs/week' },
      { label: 'Campaign ROI', value: '14:1' }
    ],
    screenshot: '/screenshots/campaigns.png',
    screenshotAlt: 'Campaign automation interface showing workflow builder'
  },
  {
    emoji: '📈',
    tag: 'REVENUE ANALYTICS',
    title: 'Know exactly what drives revenue',
    description: 'Real-time insights on what content sells, which fans spend, and where to focus your energy.',
    metrics: [
      { label: 'Data points', value: '500+' },
      { label: 'Revenue accuracy', value: '99.9%' }
    ],
    screenshot: '/screenshots/analytics.png',
    screenshotAlt: 'Analytics dashboard showing revenue insights and metrics'
  },
  {
    emoji: '🔗',
    tag: 'INTEGRATIONS',
    title: 'Works with your entire stack',
    description: 'Connect all your tools. From content schedulers to payment processors, everything syncs seamlessly.',
    metrics: [
      { label: 'Native integrations', value: '50+' },
      { label: 'API uptime', value: '99.99%' }
    ],
    screenshot: '/screenshots/integrations.png',
    screenshotAlt: 'Integration ecosystem showing connected platforms and tools'
  }
]

export default function PlatformCapabilitiesV2() {
  const [selectedFeature, setSelectedFeature] = useState(0)

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            A complete AI team in your pocket
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Replace an entire agency with AI that works 24/7
          </p>
        </motion.div>

        {/* Main Container */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Feature Cards Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedFeature(index)}
                className={`
                  bg-white dark:bg-gray-800 rounded-xl p-6 cursor-pointer transition-all duration-300
                  ${selectedFeature === index 
                    ? 'ring-2 ring-purple-600 shadow-xl scale-[1.02]' 
                    : 'hover:shadow-lg hover:scale-[1.01]'
                  }
                `}
              >
                {/* Emoji and Tag */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{feature.emoji}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                    {feature.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                
                {/* Description - Hidden on mobile */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 hidden sm:block">
                  {feature.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2">
                  {feature.metrics.map((metric, i) => (
                    <div key={i} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {metric.label}
                      </div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Screenshot Preview */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="sticky top-24"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedFeature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
                >
                  {/* Feature Title in Preview */}
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {features[selectedFeature].title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      {features[selectedFeature].description}
                    </p>
                  </div>

                  {/* Screenshot Image */}
                  <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-900">
                    <Image
                      src={features[selectedFeature].screenshot}
                      alt={features[selectedFeature].screenshotAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={selectedFeature === 0}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Interactive Demo Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            See it in action
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Watch how top creators are scaling without hiring
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/demo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              <Clock className="w-5 h-5" />
              Interactive demo (2 min)
            </a>
            <a
              href="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-3 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
            >
              Real creator results
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}