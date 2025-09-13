'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { 
  Twitter, Linkedin, Youtube, Github, Mail,
  Shield, Award, Globe, Zap
} from 'lucide-react'

const footerSections = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'AI Technology', href: '/ai-technology' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Changelog', href: '/changelog', badge: 'New' },
      { label: 'API Documentation', href: '/api' }
    ]
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Solo Creators', href: '/solutions/solo' },
      { label: 'Creator Teams', href: '/solutions/teams' },
      { label: 'Agencies', href: '/solutions/agencies' },
      { label: 'Enterprise', href: '/enterprise' },
      { label: 'Use Cases', href: '/use-cases' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Help Center', href: '/help' },
      { label: 'Community', href: '/community' },
      { label: 'Blog', href: '/blog' },
      { label: 'Webinars', href: '/webinars' },
      { label: 'Case Studies', href: '/case-studies' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers', badge: 'Hiring' },
      { label: 'Press Kit', href: '/press' },
      { label: 'Partners', href: '/partners' },
      { label: 'Contact', href: '/contact' },
      { label: 'Legal', href: '/legal' }
    ]
  }
]

const certifications = [
  { icon: Shield, label: 'SOC 2 Certified' },
  { icon: Award, label: 'ISO 27001' },
  { icon: Globe, label: 'GDPR Compliant' },
  { icon: Zap, label: '99.99% Uptime' }
]

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/huntaze', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/huntaze', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/huntaze', label: 'YouTube' },
  { icon: Github, href: 'https://github.com/huntaze', label: 'GitHub' }
]

export default function EnterpriseFooter() {
  return (
    <footer className="bg-[#0F0F10] border-t border-[#2D2D30]">
      {/* Main Footer Content */}
      <div className="container-width py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#5E6AD2] to-[#4C5BC0] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-2xl font-semibold text-white">Huntaze</span>
            </Link>
            <p className="text-[#9CA3AF] mb-6 max-w-sm">
              The enterprise platform for creator management. Scale your business with AI-powered 
              automation and professional tools.
            </p>
            
            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white mb-3">Stay Updated</h4>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-[#252528] border border-[#2D2D30] rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#5E6AD2] transition-colors"
                />
                <button className="px-4 py-2 bg-[#5E6AD2] text-white rounded-lg hover:bg-[#4C5BC0] transition-colors">
                  <Mail className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#252528] rounded-lg flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[#2D2D30] transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-[#9CA3AF] hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                      {link.badge && (
                        <Badge variant="secondary" size="sm">
                          {link.badge}
                        </Badge>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Bar */}
      <div className="border-t border-[#2D2D30]">
        <div className="container-width py-8">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-2 text-[#9CA3AF]"
              >
                <cert.icon className="w-5 h-5 text-green-400" />
                <span className="text-sm">{cert.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#1A1A1B] border-t border-[#2D2D30]">
        <div className="container-width py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#9CA3AF]">
            <div className="flex items-center gap-1">
              <span>© 2024 Huntaze. All rights reserved.</span>
              <span className="hidden md:inline mx-2">|</span>
              <span className="hidden md:inline">Built with love for creators worldwide</span>
            </div>
            
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}