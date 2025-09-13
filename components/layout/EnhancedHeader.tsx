'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import MegaMenu from './MegaMenu'
import { Button } from '@/components/ui/Button'
import { Command, Menu, X } from 'lucide-react'

export default function EnhancedHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0F0F10]/80 backdrop-blur-xl border-b border-[#2D2D30]' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-width">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#5E6AD2] to-[#4C5BC0] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-xl font-semibold text-white">Huntaze</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <MegaMenu />
            
            {/* Command Palette Hint */}
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#9CA3AF] hover:text-white border border-[#2D2D30] rounded-lg hover:border-[#404040] transition-all duration-200">
              <Command className="w-3 h-3" />
              <span>K</span>
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="primary" size="sm">
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#EEEFF1] hover:text-[#5E6AD2] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-[#2D2D30] bg-[#0F0F10]/95 backdrop-blur-xl"
          >
            <div className="container-width py-6 space-y-4">
              <nav className="space-y-2">
                <Link href="/solutions" className="block px-4 py-2 text-[#EEEFF1] hover:bg-[#252528] rounded-lg transition-colors">
                  Solutions
                </Link>
                <Link href="/features" className="block px-4 py-2 text-[#EEEFF1] hover:bg-[#252528] rounded-lg transition-colors">
                  Features
                </Link>
                <Link href="/pricing" className="block px-4 py-2 text-[#EEEFF1] hover:bg-[#252528] rounded-lg transition-colors">
                  Pricing
                </Link>
                <Link href="/resources" className="block px-4 py-2 text-[#EEEFF1] hover:bg-[#252528] rounded-lg transition-colors">
                  Resources
                </Link>
                <Link href="/enterprise" className="block px-4 py-2 text-[#EEEFF1] hover:bg-[#252528] rounded-lg transition-colors">
                  Enterprise
                </Link>
              </nav>
              <div className="pt-4 border-t border-[#2D2D30] space-y-3">
                <Button variant="secondary" className="w-full">
                  Sign In
                </Button>
                <Button variant="primary" className="w-full">
                  Start Free Trial
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}