'use client'

import React from 'react'
import HeroSection from '@/components/sections/HeroSection'
import FeaturesGrid from '@/components/sections/FeaturesGrid'
import ROICalculator from '@/components/sections/ROICalculator'
import CommandPalette from '@/components/ui/CommandPalette'
import EnterpriseNav from '@/src/components/enterprise-nav'

export default function HomeEnhanced() {
  return (
    <>
      {/* Command Palette - Linear Style */}
      <CommandPalette />
      
      {/* Navigation */}
      <EnterpriseNav />
      
      {/* Hero Section with Trust Bar and Metrics */}
      <HeroSection />
      
      {/* Features Grid */}
      <FeaturesGrid />
      
      {/* ROI Calculator */}
      <ROICalculator />
      
      {/* Placeholder for additional sections */}
      <div className="text-center py-20 text-[#9CA3AF]">
        <p>Additional sections coming soon:</p>
        <ul className="mt-4 space-y-2">
          <li>" Enterprise Section</li>
          <li>" Video Testimonials</li>
          <li>" Interactive AI Demo</li>
          <li>" Comprehensive Footer</li>
        </ul>
      </div>
    </>
  )
}