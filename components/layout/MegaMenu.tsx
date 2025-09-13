'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  ChevronDown, Zap, Users, BarChart, Shield, Globe, 
  MessageSquare, Calendar, TrendingUp, Award, Sparkles,
  Instagram, Video, DollarSign, Target, Rocket, Building
} from 'lucide-react'

interface MegaMenuItem {
  label: string
  href: string
  description?: string
  icon?: React.ReactNode
  badge?: string
}

interface MegaMenuSection {
  title: string
  items: MegaMenuItem[]
}

interface NavigationItem {
  label: string
  href?: string
  megaMenu?: {
    sections: MegaMenuSection[]
    featured?: {
      title: string
      description: string
      href: string
      image?: string
    }
  }
}

const navigation: NavigationItem[] = [
  {
    label: 'Solutions',
    megaMenu: {
      sections: [
        {
          title: 'By Creator Type',
          items: [
            { 
              label: 'Solo Creators', 
              href: '/solutions/solo', 
              description: 'Everything you need to start and grow',
              icon: <Users className="w-4 h-4" />
            },
            { 
              label: 'Creator Teams', 
              href: '/solutions/teams', 
              description: 'Collaborate and scale together',
              icon: <Building className="w-4 h-4" />
            },
            { 
              label: 'Agencies', 
              href: '/solutions/agencies', 
              description: 'Manage multiple creator accounts',
              icon: <Globe className="w-4 h-4" />,
              badge: 'Popular'
            }
          ]
        },
        {
          title: 'By Platform',
          items: [
            { 
              label: 'Instagram', 
              href: '/platforms/instagram', 
              description: 'DM automation & growth tools',
              icon: <Instagram className="w-4 h-4" />
            },
            { 
              label: 'OnlyFans', 
              href: '/platforms/onlyfans', 
              description: 'Revenue optimization suite',
              icon: <DollarSign className="w-4 h-4" />
            },
            { 
              label: 'TikTok', 
              href: '/platforms/tiktok', 
              description: 'Content scheduling & analytics',
              icon: <Video className="w-4 h-4" />
            },
            { 
              label: 'Multi-Platform', 
              href: '/platforms/multi', 
              description: 'Unified dashboard for all platforms',
              icon: <Sparkles className="w-4 h-4" />,
              badge: 'New'
            }
          ]
        }
      ],
      featured: {
        title: 'AI-Powered Growth',
        description: 'Let our AI handle conversations while you focus on content creation',
        href: '/features/ai-chat',
        image: '/images/ai-feature-preview.png'
      }
    }
  },
  {
    label: 'Features',
    megaMenu: {
      sections: [
        {
          title: 'Core Features',
          items: [
            { 
              label: 'AI Chat Assistant', 
              href: '/features/ai-chat', 
              description: 'Personalized conversations at scale',
              icon: <MessageSquare className="w-4 h-4" />
            },
            { 
              label: 'Analytics Dashboard', 
              href: '/features/analytics', 
              description: 'Real-time insights and metrics',
              icon: <BarChart className="w-4 h-4" />
            },
            { 
              label: 'Content Scheduler', 
              href: '/features/scheduler', 
              description: 'Plan and automate posts',
              icon: <Calendar className="w-4 h-4" />
            },
            { 
              label: 'Fan CRM', 
              href: '/features/crm', 
              description: 'Manage relationships efficiently',
              icon: <Users className="w-4 h-4" />
            }
          ]
        },
        {
          title: 'Advanced Tools',
          items: [
            { 
              label: 'A/B Testing', 
              href: '/features/ab-testing', 
              description: 'Optimize your messaging',
              icon: <Target className="w-4 h-4" />
            },
            { 
              label: 'Automation Flows', 
              href: '/features/automation', 
              description: 'Set up complex workflows',
              icon: <Zap className="w-4 h-4" />
            },
            { 
              label: 'Team Collaboration', 
              href: '/features/teams', 
              description: 'Work together seamlessly',
              icon: <Users className="w-4 h-4" />
            },
            { 
              label: 'API Access', 
              href: '/features/api', 
              description: 'Build custom integrations',
              icon: <Rocket className="w-4 h-4" />,
              badge: 'Beta'
            }
          ]
        }
      ]
    }
  },
  {
    label: 'Pricing',
    href: '/pricing'
  },
  {
    label: 'Resources',
    megaMenu: {
      sections: [
        {
          title: 'Learn',
          items: [
            { 
              label: 'Documentation', 
              href: '/docs', 
              description: 'Comprehensive guides and API docs',
              icon: <FileText className="w-4 h-4" />
            },
            { 
              label: 'Blog', 
              href: '/blog', 
              description: 'Tips, trends, and best practices',
              icon: <TrendingUp className="w-4 h-4" />
            },
            { 
              label: 'Case Studies', 
              href: '/case-studies', 
              description: 'Success stories from creators',
              icon: <Award className="w-4 h-4" />
            },
            { 
              label: 'Webinars', 
              href: '/webinars', 
              description: 'Live training sessions',
              icon: <Video className="w-4 h-4" />
            }
          ]
        },
        {
          title: 'Support',
          items: [
            { 
              label: 'Help Center', 
              href: '/help', 
              description: 'Find answers quickly',
              icon: <Shield className="w-4 h-4" />
            },
            { 
              label: 'Community', 
              href: '/community', 
              description: 'Connect with other creators',
              icon: <Users className="w-4 h-4" />
            },
            { 
              label: 'Contact Support', 
              href: '/contact', 
              description: '24/7 customer support',
              icon: <MessageSquare className="w-4 h-4" />
            }
          ]
        }
      ]
    }
  },
  {
    label: 'Enterprise',
    href: '/enterprise'
  }
]

export default function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [menuPosition, setMenuPosition] = useState({ left: 0, width: 0 })
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleMouseEnter = (label: string, event: React.MouseEvent<HTMLLIElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setMenuPosition({
      left: rect.left,
      width: rect.width
    })
    setActiveMenu(label)
  }

  return (
    <nav ref={menuRef} className="relative z-50">
      <ul className="flex items-center space-x-1">
        {navigation.map((item) => (
          <li
            key={item.label}
            className="relative"
            onMouseEnter={(e) => item.megaMenu && handleMouseEnter(item.label, e)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            {item.href ? (
              <Link
                href={item.href}
                className="flex items-center gap-1 px-4 py-2 text-[#EEEFF1] hover:text-[#5E6AD2] transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <button className="flex items-center gap-1 px-4 py-2 text-[#EEEFF1] hover:text-[#5E6AD2] transition-colors duration-200 font-medium">
                {item.label}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  activeMenu === item.label ? 'rotate-180' : ''
                }`} />
              </button>
            )}

            <AnimatePresence>
              {activeMenu === item.label && item.megaMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 w-[800px] mt-2"
                  style={{ left: `-${menuPosition.left}px` }}
                >
                  <div className="glass-panel-dark rounded-2xl p-8 shadow-2xl">
                    <div className="grid grid-cols-3 gap-8">
                      {/* Menu Sections */}
                      <div className="col-span-2 grid grid-cols-2 gap-8">
                        {item.megaMenu.sections.map((section) => (
                          <div key={section.title}>
                            <h3 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-4">
                              {section.title}
                            </h3>
                            <ul className="space-y-3">
                              {section.items.map((menuItem) => (
                                <li key={menuItem.label}>
                                  <Link
                                    href={menuItem.href}
                                    className="group flex items-start gap-3 p-2 -m-2 rounded-lg hover:bg-[#252528] transition-colors duration-200"
                                  >
                                    {menuItem.icon && (
                                      <div className="mt-0.5 text-[#9CA3AF] group-hover:text-[#5E6AD2] transition-colors">
                                        {menuItem.icon}
                                      </div>
                                    )}
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium text-[#EEEFF1] group-hover:text-[#5E6AD2] transition-colors">
                                          {menuItem.label}
                                        </span>
                                        {menuItem.badge && (
                                          <span className="px-2 py-0.5 text-xs font-medium bg-[#5E6AD2]/20 text-[#5E6AD2] rounded-full">
                                            {menuItem.badge}
                                          </span>
                                        )}
                                      </div>
                                      {menuItem.description && (
                                        <p className="text-sm text-[#9CA3AF] mt-0.5">
                                          {menuItem.description}
                                        </p>
                                      )}
                                    </div>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Featured Section */}
                      {item.megaMenu.featured && (
                        <div className="bg-gradient-to-br from-[#5E6AD2]/10 to-[#5E6AD2]/5 rounded-xl p-6 border border-[#5E6AD2]/20">
                          <h3 className="text-sm font-semibold text-[#5E6AD2] mb-2">
                            Featured
                          </h3>
                          <h4 className="text-lg font-semibold text-white mb-2">
                            {item.megaMenu.featured.title}
                          </h4>
                          <p className="text-sm text-[#9CA3AF] mb-4">
                            {item.megaMenu.featured.description}
                          </p>
                          <Link
                            href={item.megaMenu.featured.href}
                            className="inline-flex items-center gap-2 text-sm font-medium text-[#5E6AD2] hover:text-[#4C5BC0] transition-colors"
                          >
                            Learn more
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// Add missing import
import { FileText, ArrowRight } from 'lucide-react'