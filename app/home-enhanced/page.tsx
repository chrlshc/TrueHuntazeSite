'use client'

import React from 'react'
import HeroSection from '@/components/sections/HeroSection'
import FeaturesGrid from '@/components/sections/FeaturesGrid'
import ROICalculator from '@/components/sections/ROICalculator'
import EnterpriseSection from '@/components/sections/EnterpriseSection'
import AIDemo from '@/components/sections/AIDemo'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CommandPalette from '@/components/ui/CommandPalette'
import EnhancedHeader from '@/components/layout/EnhancedHeader'
import EnterpriseFooter from '@/components/layout/EnterpriseFooter'

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
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Enterprise Section */}
      <EnterpriseSection />
      
      {/* Enterprise Footer */}
      <EnterpriseFooter />
    </>
  )
}