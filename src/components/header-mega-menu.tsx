'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import MegaMenu from '@/components/layout/MegaMenu'
import MobileMegaMenu from '@/components/layout/MobileMegaMenu'
import { 
  ChevronDown, Zap, Users, BarChart, Shield, Globe, 
  MessageSquare, Calendar, TrendingUp, Award, Sparkles,
  Instagram, Video, DollarSign, Target, Rocket, Building,
  FileText, ArrowRight, Brain, Layers, CreditCard, Gauge,
  Lock, GitBranch, HelpCircle, BookOpen, Megaphone, Mail
} from 'lucide-react'

// Export navigation data for mobile menu
export const navigation = [
  {
    label: 'Products',
    megaMenu: {
      sections: [
        {
          title: 'Core Platform',
          items: [
            { 
              label: 'AI Assistant', 
              href: '/products/ai-assistant', 
              description: 'Intelligent conversations at scale',
              icon: <Brain className="w-4 h-4" />
            },
            { 
              label: 'Analytics Suite', 
              href: '/products/analytics', 
              description: 'Real-time insights and reporting',
              icon: <BarChart className="w-4 h-4" />
            },
            { 
              label: 'Content Hub', 
              href: '/products/content', 
              description: 'Create, schedule, and optimize',
              icon: <Layers className="w-4 h-4" />
            },
            { 
              label: 'Revenue Tools', 
              href: '/products/revenue', 
              description: 'Maximize earnings across platforms',
              icon: <DollarSign className="w-4 h-4" />,
              badge: 'Popular'
            }
          ]
        },
        {
          title: 'Platform Integrations',
          items: [
            { 
              label: 'Instagram', 
              href: '/integrations/instagram', 
              description: 'DM automation & growth',
              icon: <Instagram className="w-4 h-4" />
            },
            { 
              label: 'OnlyFans', 
              href: '/integrations/onlyfans', 
              description: 'Subscriber management',
              icon: <Lock className="w-4 h-4" />
            },
            { 
              label: 'TikTok', 
              href: '/integrations/tiktok', 
              description: 'Content & engagement',
              icon: <Video className="w-4 h-4" />
            },
            { 
              label: 'All Integrations', 
              href: '/integrations', 
              description: 'Connect all your platforms',
              icon: <GitBranch className="w-4 h-4" />
            }
          ]
        }
      ],
      featured: {
        title: 'New: AI Team System',
        description: 'Create specialized AI personas for different types of fan interactions',
        href: '/products/ai-team',
        image: '/images/ai-team-preview.png'
      }
    }
  },
  {
    label: 'Solutions',
    megaMenu: {
      sections: [
        {
          title: 'By Business Size',
          items: [
            { 
              label: 'Individual Creators', 
              href: '/solutions/individual', 
              description: 'Start and scale your business',
              icon: <Users className="w-4 h-4" />
            },
            { 
              label: 'Creator Teams', 
              href: '/solutions/teams', 
              description: 'Collaborate efficiently',
              icon: <Building className="w-4 h-4" />
            },
            { 
              label: 'Agencies', 
              href: '/solutions/agencies', 
              description: 'Manage multiple accounts',
              icon: <Globe className="w-4 h-4" />
            },
            { 
              label: 'Enterprise', 
              href: '/solutions/enterprise', 
              description: 'Custom solutions at scale',
              icon: <Shield className="w-4 h-4" />,
              badge: 'Contact Sales'
            }
          ]
        },
        {
          title: 'By Use Case',
          items: [
            { 
              label: 'Fan Engagement', 
              href: '/use-cases/engagement', 
              description: 'Build deeper relationships',
              icon: <MessageSquare className="w-4 h-4" />
            },
            { 
              label: 'Revenue Growth', 
              href: '/use-cases/revenue', 
              description: 'Increase your earnings',
              icon: <TrendingUp className="w-4 h-4" />
            },
            { 
              label: 'Time Automation', 
              href: '/use-cases/automation', 
              description: 'Save 20+ hours per week',
              icon: <Zap className="w-4 h-4" />
            },
            { 
              label: 'Content Strategy', 
              href: '/use-cases/content', 
              description: 'Data-driven content planning',
              icon: <Target className="w-4 h-4" />
            }
          ]
        }
      ],
      featured: {
        title: 'Success Story',
        description: 'How Sarah increased revenue by 300% in 3 months',
        href: '/case-studies/sarah',
        image: '/images/success-story.png'
      }
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
              description: 'Guides and API reference',
              icon: <FileText className="w-4 h-4" />
            },
            { 
              label: 'Academy', 
              href: '/academy', 
              description: 'Video courses and tutorials',
              icon: <BookOpen className="w-4 h-4" />,
              badge: 'New'
            },
            { 
              label: 'Blog', 
              href: '/blog', 
              description: 'Industry insights and tips',
              icon: <TrendingUp className="w-4 h-4" />
            },
            { 
              label: 'Case Studies', 
              href: '/case-studies', 
              description: 'Real success stories',
              icon: <Award className="w-4 h-4" />
            }
          ]
        },
        {
          title: 'Support',
          items: [
            { 
              label: 'Help Center', 
              href: '/help', 
              description: 'Search our knowledge base',
              icon: <HelpCircle className="w-4 h-4" />
            },
            { 
              label: 'System Status', 
              href: '/status', 
              description: 'Service health monitoring',
              icon: <Gauge className="w-4 h-4" />
            },
            { 
              label: 'Contact Support', 
              href: '/support', 
              description: '24/7 priority support',
              icon: <Mail className="w-4 h-4" />
            }
          ]
        },
        {
          title: 'Community',
          items: [
            { 
              label: 'Creator Forum', 
              href: '/community', 
              description: 'Connect with peers',
              icon: <Users className="w-4 h-4" />
            },
            { 
              label: 'Events', 
              href: '/events', 
              description: 'Webinars and meetups',
              icon: <Calendar className="w-4 h-4" />
            },
            { 
              label: 'Partner Program', 
              href: '/partners', 
              description: 'Grow with us',
              icon: <Rocket className="w-4 h-4" />
            },
            { 
              label: 'Newsletter', 
              href: '/newsletter', 
              description: 'Weekly insights',
              icon: <Mail className="w-4 h-4" />
            }
          ]
        }
      ],
      featured: {
        title: 'Creator Summit 2025',
        description: 'Join us for the biggest creator economy event of the year',
        href: '/events/summit-2025',
        image: '/images/summit-preview.png'
      }
    }
  },
  {
    label: 'Company',
    megaMenu: {
      sections: [
        {
          title: 'About',
          items: [
            { 
              label: 'Our Story', 
              href: '/about', 
              description: 'Mission and values',
              icon: <Building className="w-4 h-4" />
            },
            { 
              label: 'Team', 
              href: '/team', 
              description: 'Meet the people behind Huntaze',
              icon: <Users className="w-4 h-4" />
            },
            { 
              label: 'Careers', 
              href: '/careers', 
              description: 'Join our growing team',
              icon: <Rocket className="w-4 h-4" />,
              badge: 'Hiring'
            },
            { 
              label: 'Press', 
              href: '/press', 
              description: 'News and media kit',
              icon: <Megaphone className="w-4 h-4" />
            }
          ]
        },
        {
          title: 'Legal',
          items: [
            { 
              label: 'Terms of Service', 
              href: '/terms', 
              description: 'Our service agreement',
              icon: <FileText className="w-4 h-4" />
            },
            { 
              label: 'Privacy Policy', 
              href: '/privacy', 
              description: 'How we protect your data',
              icon: <Shield className="w-4 h-4" />
            },
            { 
              label: 'Security', 
              href: '/security', 
              description: 'Enterprise-grade protection',
              icon: <Lock className="w-4 h-4" />
            },
            { 
              label: 'Compliance', 
              href: '/compliance', 
              description: 'GDPR, CCPA, and more',
              icon: <Award className="w-4 h-4" />
            }
          ]
        }
      ]
    }
  }
]

export default function HeaderMegaMenu() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  // Hide on app pages
  const isApp = !!pathname && [
    '/dashboard',
    '/onboarding',
    '/messages',
    '/analytics',
    '/settings'
  ].some(p => pathname.startsWith(p))

  // Detect scroll for sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (isApp) return null

  return (
    <header className={`fixed inset-x-0 top-0 z-[1000] transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#0A0A0B]/95 backdrop-blur-2xl border-b border-[#1E1E20]' 
        : 'bg-[#0A0A0B] border-b border-[#1E1E20]'
    }`}>
      <nav className="max-w-[1400px] mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-white">Huntaze</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <MegaMenu />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/auth"
                className="text-[#EEEFF1] hover:text-[#5E6AD2] transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/onboarding"
                className="px-4 py-2 bg-[#5E6AD2] hover:bg-[#4C5BC0] text-white rounded-lg transition-colors font-medium"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu */}
            <MobileMegaMenu navigation={navigation} />
          </div>
        </div>
      </nav>
    </header>
  )
}