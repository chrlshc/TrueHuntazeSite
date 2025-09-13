'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ArrowRight } from 'lucide-react'
import ContactSalesModal from '@/components/ContactSalesModal'
// import ThemeToggle from '@/components/ThemeToggle'
import analytics from '@/lib/analytics/enterprise-events'

// Navigation items based on the new IA
const solutionItems = [
  {
    title: 'For Solo Creators',
    description: 'Run your business without a team',
    href: '/solutions/solo-creators',
    icon: '🎯'
  },
  {
    title: 'For Agencies',
    description: 'Manage multiple creator accounts',
    href: '/solutions/agencies',
    icon: '🏢'
  },
  {
    title: 'By Platform',
    description: 'OnlyFans, Fansly, Instagram',
    href: '/solutions/platforms',
    icon: '📱'
  }
]

const platformFeatures = [
  {
    title: 'AI Sales Agent',
    description: 'Conversations that convert',
    href: '/platform/ai-agent',
    icon: '🤖'
  },
  {
    title: 'PPV Revenue Engine',
    description: 'Maximize every fan',
    href: '/platform/ppv-engine',
    icon: '💰'
  },
  {
    title: 'Unified CRM',
    description: 'All platforms, one dashboard',
    href: '/platform/crm',
    icon: '📊'
  },
  {
    title: 'Analytics',
    description: 'Real-time revenue insights',
    href: '/platform/analytics',
    icon: '📈'
  },
  {
    title: 'Automation',
    description: 'Set it and forget it',
    href: '/platform/automation',
    icon: '⚡'
  },
  {
    title: 'Integrations',
    description: 'Connect your tools',
    href: '/platform/integrations',
    icon: '🔗'
  }
]

const resourceItems = [
  {
    title: 'Documentation',
    description: 'API docs and guides',
    href: '/docs',
    icon: '📚'
  },
  {
    title: 'Creator Stories',
    description: '$100K+ success stories',
    href: '/case-studies',
    icon: '⭐'
  },
  {
    title: 'Blog',
    description: 'Growth tips and updates',
    href: '/blog',
    icon: '✍️'
  },
  {
    title: 'System Status',
    description: '99.99% uptime',
    href: '/status',
    icon: '🟢'
  }
]

export default function EnterpriseNav() {
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-surface/95 backdrop-blur-xl border-b border-border">
      <div className="mx-auto w-full max-w-screen-2xl px-4">
        <div className="flex items-center h-16 gap-6">
          {/* Logo */}
          <Link href="/" className="text-xl font-semibold text-ink">
            Huntaze
          </Link>

          {/* Navigation Items */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm text-inkSubdued hover:text-ink transition-colors"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                Solutions
                <ChevronDown className={`w-4 h-4 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {solutionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-[320px] bg-surface rounded-lg shadow-xl border border-border"
                    onMouseEnter={() => setSolutionsOpen(true)}
                    onMouseLeave={() => setSolutionsOpen(false)}
                  >
                    <div className="p-2">
                      {solutionItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-3 rounded-lg hover:bg-surfaceMuted transition-colors group"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl mt-0.5">{item.icon}</span>
                            <div>
                              <div className="font-semibold text-ink group-hover:text-accent">
                                {item.title}
                              </div>
                              <div className="text-sm text-inkSubdued">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pricing Link */}
            <Link 
              href="/pricing" 
              className="px-3 py-2 text-sm text-inkSubdued hover:text-ink transition-colors"
            >
              Pricing
            </Link>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm text-inkSubdued hover:text-ink transition-colors"
                onMouseEnter={() => setResourcesOpen(true)}
                onMouseLeave={() => setResourcesOpen(false)}
              >
                Resources
                <ChevronDown className={`w-4 h-4 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-[320px] bg-surface rounded-lg shadow-xl border border-border"
                    onMouseEnter={() => setResourcesOpen(true)}
                    onMouseLeave={() => setResourcesOpen(false)}
                  >
                    <div className="p-2">
                      {resourceItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-3 rounded-lg hover:bg-surfaceMuted transition-colors group"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl mt-0.5">{item.icon}</span>
                            <div>
                              <div className="font-semibold text-ink group-hover:text-accent">
                                {item.title}
                              </div>
                              <div className="text-sm text-inkSubdued">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Sign in - Indépendant */}
          <Link
            href="/auth"
            className="inline-flex h-9 items-center rounded-lg px-3 text-sm text-inkSubdued hover:bg-surfaceMuted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentRing transition-colors"
          >
            Sign in
          </Link>

          {/* Start for free - Indépendant */}
          <Link
            href="/onboarding/setup/profile"
            className="inline-flex h-9 items-center rounded-lg bg-accent px-4 text-sm font-medium text-white hover:bg-accentHover transition-colors"
          >
            Start for free
          </Link>
        </div>
      </div>
      
      {/* Contact Sales Modal */}
      <ContactSalesModal 
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </nav>
  )
}
