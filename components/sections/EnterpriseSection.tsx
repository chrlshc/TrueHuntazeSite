'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { 
  Shield, Users, Zap, Lock, Globe, HeadphonesIcon,
  CheckCircle, Building, TrendingUp, Award
} from 'lucide-react'

const enterpriseFeatures = [
  {
    icon: Shield,
    title: 'Enterprise Security',
    features: [
      'SSO/SAML Authentication',
      'SOC 2 Type II Certified',
      'GDPR & CCPA Compliant',
      'End-to-end Encryption'
    ]
  },
  {
    icon: Users,
    title: 'Team Management',
    features: [
      'Unlimited Team Seats',
      'Role-based Permissions',
      'Activity Audit Logs',
      'Custom User Workflows'
    ]
  },
  {
    icon: Zap,
    title: 'Performance & Scale',
    features: [
      '99.99% SLA Guarantee',
      'Dedicated Infrastructure',
      'Priority API Access',
      'Custom Rate Limits'
    ]
  },
  {
    icon: HeadphonesIcon,
    title: 'Premium Support',
    features: [
      'Dedicated Account Manager',
      'Priority 24/7 Support',
      'Custom Training Programs',
      'Quarterly Business Reviews'
    ]
  }
]

const trustedCompanies = [
  { name: 'Agency One', logo: '/logos/agency1.svg' },
  { name: 'Creative Studio', logo: '/logos/agency2.svg' },
  { name: 'Digital Agency', logo: '/logos/agency3.svg' },
  { name: 'Media Group', logo: '/logos/agency4.svg' },
  { name: 'Content Factory', logo: '/logos/agency5.svg' }
]

export default function EnterpriseSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#5E6AD2]/5 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <div className="container-width relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">Enterprise</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Built for Organizations That Scale
          </h2>
          <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
            From growing agencies to established enterprises, Huntaze provides the security, 
            control, and support you need to manage creator operations at scale.
          </p>
        </motion.div>

        {/* Trust Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <p className="text-center text-sm text-[#9CA3AF] mb-8">
            Trusted by leading creator management companies
          </p>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {trustedCompanies.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                <div className="h-12 w-32 bg-[#252528] rounded-lg flex items-center justify-center">
                  <span className="text-xs text-[#9CA3AF]">{company.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {enterpriseFeatures.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
            >
              <Card variant="elevated" className="h-full p-6 hover:border-[#5E6AD2]/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#5E6AD2]/10 rounded-lg flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-[#5E6AD2]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                </div>
                <ul className="space-y-3">
                  {category.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#9CA3AF]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel-dark rounded-2xl p-8 md:p-12 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Building className="w-6 h-6 text-[#5E6AD2]" />
              <span className="text-sm font-medium text-[#5E6AD2] uppercase tracking-wider">
                Enterprise Ready
              </span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Creator Operations?
            </h3>
            <p className="text-lg text-[#9CA3AF] mb-8">
              Get a personalized demo and see how Huntaze can help your organization 
              scale creator management efficiently and securely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="min-w-[200px]">
                Schedule Enterprise Demo
              </Button>
              <Button variant="secondary" size="lg" className="min-w-[200px]">
                Download Security Whitepaper
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-8 pt-8 border-t border-[#2D2D30] flex items-center justify-center gap-8 flex-wrap text-sm">
              <div className="flex items-center gap-2 text-[#9CA3AF]">
                <Shield className="w-4 h-4 text-green-400" />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-2 text-[#9CA3AF]">
                <Lock className="w-4 h-4 text-green-400" />
                <span>Bank-level Security</span>
              </div>
              <div className="flex items-center gap-2 text-[#9CA3AF]">
                <Award className="w-4 h-4 text-green-400" />
                <span>ISO 27001</span>
              </div>
              <div className="flex items-center gap-2 text-[#9CA3AF]">
                <Globe className="w-4 h-4 text-green-400" />
                <span>GDPR Compliant</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}