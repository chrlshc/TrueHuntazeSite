'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, Shield, Users, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import CommandPalette from '@/components/ui/CommandPalette'
import EnhancedHeader from '@/components/layout/EnhancedHeader'
import EnterpriseFooter from '@/components/layout/EnterpriseFooter'
import { UrgencyProvider, useUrgency } from '@/components/providers/UrgencyProvider'

const plans = [
  {
    name: 'Starter',
    price: 29,
    description: 'Perfect for creators just starting their journey',
    features: [
      'Basic AI assistant',
      'Up to 500 fans',
      '10 automated responses/day',
      'Basic analytics',
      'Email support'
    ],
    cta: 'Start Free Trial',
    variant: 'outlined' as const
  },
  {
    name: 'Professional',
    price: 97,
    description: 'For creators ready to scale their business',
    features: [
      'Advanced AI with learning',
      'Unlimited fans',
      'Unlimited automated responses',
      'Advanced analytics & insights',
      'Priority support',
      'Custom AI personality',
      'Multi-platform sync',
      'API access'
    ],
    cta: 'Start Free Trial',
    variant: 'elevated' as const,
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For agencies and large creator teams',
    features: [
      'Everything in Professional',
      'Multiple creator accounts',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantees',
      'Advanced security',
      'Team collaboration',
      'White-label options'
    ],
    cta: 'Contact Sales',
    variant: 'outlined' as const
  }
]

function PricingContent() {
  const { indicators } = useUrgency()
  const priceIndicator = indicators.find(i => i.type === 'offer' || i.type === 'update')
  const socialProofIndicator = indicators.find(i => i.type === 'social_proof')

  return (
    <>
      <CommandPalette />
      <EnhancedHeader />
      
      <section className="py-24 relative">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4">Pricing</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
              Choose the perfect plan for your creator business. All plans include a 14-day free trial.
            </p>
            
            {/* Professional Alert */}
            {priceIndicator && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#5E6AD2]/10 border border-[#5E6AD2]/20 rounded-lg text-[#5E6AD2]"
              >
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">{priceIndicator.message}</span>
              </motion.div>
            )}
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge variant="primary" className="shadow-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card 
                  variant={plan.variant} 
                  className={`h-full p-8 ${plan.popular ? 'border-[#5E6AD2]' : ''}`}
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-[#9CA3AF] mb-4">{plan.description}</p>
                    
                    <div className="flex items-baseline justify-center gap-1">
                      {typeof plan.price === 'number' ? (
                        <>
                          <span className="text-5xl font-bold text-white">€{plan.price}</span>
                          <span className="text-[#9CA3AF]">/month</span>
                        </>
                      ) : (
                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                      )}
                    </div>
                    
                    {plan.popular && socialProofIndicator && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 text-sm text-[#9CA3AF]"
                      >
                        {socialProofIndicator.message}
                      </motion.p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIdx) => (
                      <motion.li
                        key={featureIdx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 + featureIdx * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-[#EEEFF1] text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <Button 
                    variant={plan.popular ? 'primary' : 'secondary'} 
                    size="lg" 
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Trust Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="flex items-center gap-2 text-[#9CA3AF]">
                <Shield className="w-5 h-5 text-green-400" />
                <span>30-day money back guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-[#9CA3AF]">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2 text-[#9CA3AF]">
                <Users className="w-5 h-5 text-blue-400" />
                <span>Join 150K+ creators</span>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  q: 'Can I change plans anytime?',
                  a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.'
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.'
                },
                {
                  q: 'Is there a setup fee?',
                  a: 'No, there are no setup fees. You only pay the monthly subscription.'
                },
                {
                  q: 'Do you offer discounts for annual billing?',
                  a: 'Yes, save 20% when you pay annually. Contact us for custom Enterprise pricing.'
                }
              ].map((faq, idx) => (
                <Card key={idx} variant="outlined" className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-[#9CA3AF]">{faq.a}</p>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      <EnterpriseFooter />
    </>
  )
}

export default function PricingEnhanced() {
  return (
    <UrgencyProvider mockMode={true} displayMode="none" position="bottom-right">
      <PricingContent />
    </UrgencyProvider>
  )
}