'use client'

import React from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import { useOptimizedInView } from '@/hooks/useOptimizedInView'

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    description: "Perfect for creators just starting out",
    features: [
      "AI Chat Assistant",
      "Basic Analytics",
      "Up to 1,000 messages/month",
      "Email support",
      "1 platform integration"
    ],
    cta: "Start Free Trial",
    popular: false,
    gradient: "from-gray-600 to-gray-700"
  },
  {
    name: "Professional",
    price: "$149",
    period: "/month",
    description: "For creators ready to scale",
    features: [
      "Everything in Starter",
      "Advanced AI personalization",
      "Unlimited messages",
      "Priority support",
      "All platform integrations",
      "Revenue analytics",
      "Content scheduler"
    ],
    cta: "Get Started",
    popular: true,
    gradient: "from-violet-600 to-purple-600"
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For agencies and top creators",
    features: [
      "Everything in Professional",
      "Custom AI training",
      "Dedicated account manager",
      "API access",
      "White-label options",
      "Team collaboration",
      "Custom integrations"
    ],
    cta: "Contact Sales",
    popular: false,
    gradient: "from-purple-600 to-pink-600"
  }
]

// Optimized pricing card component
const PricingCard = ({ plan, index }: { 
  plan: typeof plans[0];
  index: number;
}) => {
  const { ref, inView } = useOptimizedInView({ 
    triggerOnce: true,
    threshold: 0.3 
  })
  
  return (
    <m.div
      ref={ref}
      className={`relative ${plan.popular ? 'md:-mt-8' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      style={{ transform: 'translateZ(0)' }}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-semibold rounded-full">
          Most Popular
        </div>
      )}
      
      <div className={`h-full p-8 rounded-2xl border transition-all duration-300 ${
        plan.popular 
          ? 'bg-gray-900/90 border-violet-600 shadow-xl shadow-violet-600/20' 
          : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
      }`}>
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
          <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
          <div className="flex items-baseline">
            <span className="text-4xl font-bold text-white">{plan.price}</span>
            <span className="text-gray-400 ml-1">{plan.period}</span>
          </div>
        </div>
        
        {/* Features */}
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <svg 
                className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                  plan.popular ? 'text-violet-400' : 'text-gray-600'
                }`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* CTA Button */}
        <Link
          href={plan.name === 'Enterprise' ? '/contact' : '/get-started'}
          className={`block w-full py-3 px-6 text-center rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
            plan.popular
              ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
              : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20'
          }`}
          style={{ willChange: 'transform' }}
        >
          {plan.cta}
        </Link>
      </div>
    </m.div>
  )
}

export default function PricingTiers() {
  const { ref: sectionRef, inView: sectionInView } = useOptimizedInView({ 
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <LazyMotion features={domAnimation} strict>
      <section 
        ref={sectionRef}
        className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black"
        style={{ contain: 'layout style' }}
      >
        <div className="container mx-auto">
          {/* Header */}
          <m.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose the plan that fits your needs. Upgrade or downgrade anytime.
            </p>
          </m.div>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <PricingCard key={index} plan={plan} index={index} />
            ))}
          </div>

          {/* FAQ Link */}
          <m.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={sectionInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-gray-400">
              Questions? Check our{' '}
              <Link href="/faq" className="text-violet-400 hover:text-violet-300 underline">
                frequently asked questions
              </Link>
            </p>
          </m.div>

          {/* Trust badges */}
          <m.div 
            className="flex flex-wrap justify-center gap-8 mt-16 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={sectionInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              SSL Encrypted
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
              Secure Payments
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Cancel Anytime
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}