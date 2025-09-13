'use client'

import React from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { useOptimizedInView } from '@/hooks/useOptimizedInView'

const features = [
  { feature: '24/7 AI Assistant', huntaze: true, others: false },
  { feature: 'Personalized Conversations', huntaze: true, others: false },
  { feature: 'Multi-Platform Support', huntaze: true, others: 'Limited' },
  { feature: 'Revenue Analytics', huntaze: true, others: 'Basic' },
  { feature: 'Content Scheduling', huntaze: true, others: true },
  { feature: 'Smart Pricing', huntaze: true, others: false },
  { feature: 'GDPR Compliant', huntaze: true, others: 'Varies' },
  { feature: 'Setup Time', huntaze: '60 seconds', others: 'Hours' },
  { feature: 'Support', huntaze: '24/7 Priority', others: 'Business hours' },
  { feature: 'Price', huntaze: 'From $49/mo', others: '$200+/mo' }
]

export default function ComparisonTable() {
  const { ref: sectionRef, inView: sectionInView } = useOptimizedInView({ 
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <LazyMotion features={domAnimation} strict>
      <section 
        ref={sectionRef}
        className="py-20 px-4 bg-gradient-to-b from-black to-gray-900"
        style={{ contain: 'layout style' }}
      >
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <m.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why creators choose Huntaze
            </h2>
            <p className="text-xl text-gray-400">
              See how we compare to traditional management
            </p>
          </m.div>

          {/* Comparison table */}
          <m.div 
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ contain: 'layout style paint' }}
          >
            {/* Table header */}
            <div className="grid grid-cols-3 bg-gray-800/50 p-4 font-semibold">
              <div className="text-gray-400">Feature</div>
              <div className="text-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                  Huntaze
                </span>
              </div>
              <div className="text-center text-gray-400">Others</div>
            </div>

            {/* Table rows */}
            {features.map((row, index) => (
              <m.div
                key={index}
                className="grid grid-cols-3 p-4 border-t border-gray-800 items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={sectionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ 
                  delay: 0.3 + index * 0.05, 
                  duration: 0.3,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                style={{ transform: 'translateZ(0)' }}
              >
                <div className="text-gray-300 text-sm md:text-base">
                  {row.feature}
                </div>
                <div className="text-center">
                  {typeof row.huntaze === 'boolean' ? (
                    row.huntaze ? (
                      <svg className="w-6 h-6 text-green-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-red-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )
                  ) : (
                    <span className="text-violet-400 font-semibold text-sm md:text-base">
                      {row.huntaze}
                    </span>
                  )}
                </div>
                <div className="text-center">
                  {typeof row.others === 'boolean' ? (
                    row.others ? (
                      <svg className="w-6 h-6 text-green-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-red-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )
                  ) : (
                    <span className="text-gray-500 text-sm md:text-base">
                      {row.others}
                    </span>
                  )}
                </div>
              </m.div>
            ))}
          </m.div>

          {/* Bottom CTA */}
          <m.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <p className="text-gray-400 mb-6">
              Ready to see the difference?
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold transform transition-transform hover:scale-105 active:scale-95">
              Start Your Free Trial
            </button>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}