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
import { UrgencyProvider } from '@/components/providers/UrgencyProvider'
import UrgencyBanner from '@/components/ui/UrgencyBanner'
import { useUrgency } from '@/components/providers/UrgencyProvider'

function HomeContent() {
  const { indicators, dismissIndicator } = useUrgency()
  const bannerIndicators = indicators.filter(i => i.severity === 'important')

  return (
    <>
      {/* Command Palette - Linear Style */}
      <CommandPalette />
      
      {/* Enhanced Navigation with Mega Menu */}
      <EnhancedHeader />
      
      {/* Urgency Banner for high priority indicators */}
      {bannerIndicators.length > 0 && (
        <UrgencyBanner 
          indicators={bannerIndicators}
          onDismiss={dismissIndicator}
          className="container-width mt-20"
        />
      )}
      
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

export default function HomeEnhanced() {
  return (
    <UrgencyProvider mockMode={true} displayMode="floating" position="bottom-right">
      <HomeContent />
    </UrgencyProvider>
  )
}