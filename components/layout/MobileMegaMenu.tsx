'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  ChevronDown, ChevronRight, X, Menu,
  Brain, BarChart, Layers, DollarSign,
  Instagram, Lock, Video, GitBranch,
  Users, Building, Globe, Shield,
  MessageSquare, TrendingUp, Zap, Target,
  FileText, BookOpen, Award, Calendar,
  HelpCircle, Gauge, Mail, Rocket, Megaphone
} from 'lucide-react'

interface MobileMegaMenuProps {
  navigation: NavigationItem[]
}

interface NavigationItem {
  label: string
  href?: string
  megaMenu?: {
    sections: {
      title: string
      items: {
        label: string
        href: string
        description?: string
        icon?: React.ReactNode
        badge?: string
      }[]
    }[]
  }
}

export default function MobileMegaMenu({ navigation }: MobileMegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    setActiveMenu(null)
    setActiveSection(null)
  }

  return (
    <>
      {/* Menu Toggle Button */}
      <button
        onClick={toggleMenu}
        className="lg:hidden p-2 text-[#9CA3AF] hover:text-white transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-[#0A0A0B] border-l border-[#1E1E20] overflow-y-auto z-50 lg:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#1E1E20]">
              <span className="text-lg font-semibold text-white">Menu</span>
              <button
                onClick={toggleMenu}
                className="p-2 text-[#9CA3AF] hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="p-4">
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={toggleMenu}
                        className="flex items-center justify-between p-3 rounded-lg text-[#EEEFF1] hover:bg-[#1A1A1C] transition-colors"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <>
                        <button
                          onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
                          className="flex items-center justify-between w-full p-3 rounded-lg text-[#EEEFF1] hover:bg-[#1A1A1C] transition-colors"
                        >
                          {item.label}
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform ${
                              activeMenu === item.label ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {/* Submenu */}
                        <AnimatePresence>
                          {activeMenu === item.label && item.megaMenu && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 pt-2 space-y-2">
                                {item.megaMenu.sections.map((section) => (
                                  <div key={section.title}>
                                    <button
                                      onClick={() => setActiveSection(
                                        activeSection === section.title ? null : section.title
                                      )}
                                      className="flex items-center justify-between w-full p-2 text-sm font-medium text-[#9CA3AF] hover:text-white transition-colors"
                                    >
                                      {section.title}
                                      <ChevronRight 
                                        className={`w-4 h-4 transition-transform ${
                                          activeSection === section.title ? 'rotate-90' : ''
                                        }`}
                                      />
                                    </button>

                                    {/* Section Items */}
                                    <AnimatePresence>
                                      {activeSection === section.title && (
                                        <motion.ul
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: 'auto', opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.2 }}
                                          className="overflow-hidden pl-4 space-y-1"
                                        >
                                          {section.items.map((menuItem) => (
                                            <li key={menuItem.label}>
                                              <Link
                                                href={menuItem.href}
                                                onClick={toggleMenu}
                                                className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#1A1A1C] transition-colors"
                                              >
                                                {menuItem.icon && (
                                                  <div className="mt-0.5 text-[#9CA3AF]">
                                                    {menuItem.icon}
                                                  </div>
                                                )}
                                                <div className="flex-1">
                                                  <div className="flex items-center gap-2">
                                                    <span className="text-sm text-[#EEEFF1]">
                                                      {menuItem.label}
                                                    </span>
                                                    {menuItem.badge && (
                                                      <span className="px-1.5 py-0.5 text-xs font-medium bg-[#5E6AD2]/20 text-[#5E6AD2] rounded">
                                                        {menuItem.badge}
                                                      </span>
                                                    )}
                                                  </div>
                                                  {menuItem.description && (
                                                    <p className="text-xs text-[#9CA3AF] mt-0.5">
                                                      {menuItem.description}
                                                    </p>
                                                  )}
                                                </div>
                                              </Link>
                                            </li>
                                          ))}
                                        </motion.ul>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </li>
                ))}
              </ul>

              {/* CTA Buttons */}
              <div className="mt-6 space-y-3 border-t border-[#1E1E20] pt-6">
                <Link
                  href="/auth"
                  onClick={toggleMenu}
                  className="block w-full px-4 py-2 text-center text-[#EEEFF1] border border-[#1E1E20] rounded-lg hover:bg-[#1A1A1C] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/onboarding"
                  onClick={toggleMenu}
                  className="block w-full px-4 py-2 text-center text-white bg-[#5E6AD2] rounded-lg hover:bg-[#4C5BC0] transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}