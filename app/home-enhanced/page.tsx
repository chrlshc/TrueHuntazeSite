'use client'

import React from 'react'
import HeroSection from '@/components/sections/HeroSection'
import FeaturesGrid from '@/components/sections/FeaturesGrid'
import ROICalculator from '@/components/sections/ROICalculator'
import EnterpriseSection from '@/components/sections/EnterpriseSection'
import AIDemo from '@/components/sections/AIDemo'
import CommandPalette from '@/components/ui/CommandPalette'
import EnhancedHeader from '@/components/layout/EnhancedHeader'

export default function HomeEnhanced() {
  return (
    <>
      {/* Command Palette - Linear Style */}
      <CommandPalette />
      
      {/* Enhanced Navigation with Mega Menu */}
      <EnhancedHeader />
      
      {/* Hero Section with Trust Bar and Metrics */}
      <HeroSection />
      
      {/* Features Grid */}
      <FeaturesGrid />
      
      {/* Interactive AI Demo */}
      <AIDemo />
      
      {/* ROI Calculator */}
      <ROICalculator />
      
      {/* Enterprise Section */}
      <EnterpriseSection />
      
      {/* Placeholder for additional sections */}
      <div className="text-center py-20 text-[#9CA3AF] bg-[#0F0F10]">
        <p>Additional sections coming soon:</p>
        <ul className="mt-4 space-y-2">
          <li>• Video Testimonials with Metrics</li>
          <li>• Urgency Indicators (Live Data)</li>
          <li>• Comprehensive Footer</li>
          <li>• Case Studies Section</li>
        </ul>
      </div>
    </>
  )
}