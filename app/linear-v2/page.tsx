'use client'

import LinearHeroV2 from '@/components/LinearHeroV2'
import LinearFeatureGridV2 from '@/components/LinearFeatureGridV2'
import ShopifyTrustBar from '@/components/ShopifyTrustBar'
import ShopifyPricing from '@/components/ShopifyPricing'
import ProofByNumbers from '@/components/sections/ProofByNumbers'
import FAQSection from '@/components/sections/FAQSection'
import EnterpriseFinalCTA from '@/components/sections/EnterpriseFinalCTA'
import EnterpriseFooter from '@/components/sections/EnterpriseFooter'
import EnterpriseNav from '@/src/components/enterprise-nav'
import { SkeletonCardV2 } from '@/components/SkeletonLoaderV2'
import { Suspense } from 'react'

export default function LinearV2Page() {
  return (
    <>
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Aller au contenu principal
      </a>

      {/* Navigation */}
      <EnterpriseNav />

      {/* Main Content with optimized design system */}
      <main id="main-content" className="linear-page-v2">
        {/* Hero with enhanced animations */}
        <LinearHeroV2 />
        
        {/* Trust indicators */}
        <Suspense fallback={<div className="skeleton" style={{ height: '120px' }} />}>
          <ShopifyTrustBar />
        </Suspense>
        
        {/* Feature grid with improved loading states */}
        <LinearFeatureGridV2 />
        
        {/* Proof by numbers */}
        <ProofByNumbers />
        
        {/* Pricing section */}
        <ShopifyPricing />
        
        {/* FAQ with smooth animations */}
        <FAQSection />
        
        {/* Final CTA */}
        <EnterpriseFinalCTA />
      </main>

      {/* Footer */}
      <EnterpriseFooter />

      {/* Example skeleton loader usage */}
      <div className="sr-only" aria-hidden="true">
        <h2>Skeleton Loader Examples</h2>
        <div className="p-6">
          <SkeletonCardV2 />
        </div>
      </div>

      <style jsx global>{`
        /* Apply design system v2 */
        html {
          scroll-behavior: smooth;
        }
        
        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
        }
        
        /* Skip link styling */
        .skip-to-content {
          position: absolute;
          top: -40px;
          left: 0;
          background: var(--color-accent);
          color: white;
          padding: var(--space-200) var(--space-400);
          text-decoration: none;
          border-radius: var(--radius-200);
          z-index: 9999;
        }
        
        .skip-to-content:focus {
          top: var(--space-400);
        }
        
        /* Page specific styles */
        .linear-page-v2 {
          min-height: 100vh;
          background-color: var(--color-bg-primary);
          color: var(--color-text-primary);
        }
        
        /* Ensure proper focus management */
        [tabindex="-1"]:focus {
          outline: none;
        }
        
        /* Print styles */
        @media print {
          .no-print {
            display: none !important;
          }
          
          body {
            font-size: 12pt;
            line-height: 1.5;
            color: black;
            background: white;
          }
          
          a {
            text-decoration: underline;
          }
          
          a[href^="http"]:after {
            content: " (" attr(href) ")";
          }
        }
      `}</style>
    </>
  )
}