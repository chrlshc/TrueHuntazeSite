'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Loading skeleton component
const SectionSkeleton = ({ height = 'h-screen' }: { height?: string }) => (
  <div className={`${height} bg-gray-900/20 animate-pulse`} />
)

// Lazy load all sections with loading states
const HeroSectionOptimized = dynamic(
  () => import('@/components/sections/HeroSectionOptimized'),
  { 
    loading: () => <SectionSkeleton />,
    ssr: false 
  }
)

const FeaturesGridOptimized = dynamic(
  () => import('@/components/sections/FeaturesGridOptimized'),
  { 
    loading: () => <SectionSkeleton height="h-96" />,
    ssr: false 
  }
)

const SocialProofOptimized = dynamic(
  () => import('@/components/sections/SocialProofOptimized'),
  { 
    loading: () => <SectionSkeleton height="h-96" />,
    ssr: false 
  }
)

const WorkflowAnimation = dynamic(
  () => import('@/components/sections/WorkflowAnimation'),
  { 
    loading: () => <SectionSkeleton height="h-96" />,
    ssr: false 
  }
)

const PricingTiers = dynamic(
  () => import('@/components/sections/PricingTiers'),
  { 
    loading: () => <SectionSkeleton height="h-96" />,
    ssr: false 
  }
)

const IntegrationsGrid = dynamic(
  () => import('@/components/sections/IntegrationsGrid'),
  { 
    loading: () => <SectionSkeleton height="h-64" />,
    ssr: false 
  }
)

const ComparisonTable = dynamic(
  () => import('@/components/sections/ComparisonTable'),
  { 
    loading: () => <SectionSkeleton height="h-96" />,
    ssr: false 
  }
)

const CTASection = dynamic(
  () => import('@/components/sections/CTASection'),
  { 
    loading: () => <SectionSkeleton height="h-64" />,
    ssr: false 
  }
)

const Footer = dynamic(
  () => import('@/components/sections/Footer'),
  { 
    loading: () => <SectionSkeleton height="h-48" />,
    ssr: false 
  }
)

// FPS Monitor - only in development
const FPSMonitor = dynamic(
  () => import('@/components/utils/FPSMonitor'),
  { ssr: false }
)

export default function TrueHuntazeSiteOptimized() {
  return (
    <>
      {/* Performance monitoring in development */}
      {process.env.NODE_ENV === 'development' && <FPSMonitor />}
      
      {/* Main content with CSS containment */}
      <main 
        className="min-h-screen bg-black"
        style={{ contain: 'layout style' }}
      >
        <Suspense fallback={<SectionSkeleton />}>
          <HeroSectionOptimized />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="h-96" />}>
          <FeaturesGridOptimized />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="h-96" />}>
          <SocialProofOptimized />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="h-96" />}>
          <WorkflowAnimation />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="h-96" />}>
          <PricingTiers />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="h-64" />}>
          <IntegrationsGrid />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="h-96" />}>
          <ComparisonTable />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="h-64" />}>
          <CTASection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="h-48" />}>
          <Footer />
        </Suspense>
      </main>

      {/* Optimized styles */}
      <style jsx global>{`
        /* Ensure smooth 60fps scrolling */
        html {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        
        /* Optimize font rendering */
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }
        
        /* Reduce paint areas */
        * {
          -webkit-tap-highlight-color: transparent;
        }
        
        /* GPU-accelerate fixed elements */
        .fixed {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>
    </>
  )
}