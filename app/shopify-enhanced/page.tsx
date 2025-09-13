'use client'

import ShopifyHero from '@/components/ShopifyHero'
import ShopifyTrustBar from '@/components/ShopifyTrustBar'
import ShopifyValueProps from '@/components/ShopifyValueProps'
import PlatformCapabilitiesV2 from '@/components/sections/PlatformCapabilitiesV2'
import ShopifyPricing from '@/components/ShopifyPricing'
import ProofByNumbers from '@/components/sections/ProofByNumbers'
import CreatorPainPoints from '@/components/sections/CreatorPainPoints'
import EnterpriseReady from '@/components/sections/EnterpriseReady'
import ROICalculator from '@/components/sections/ROICalculator'
import FAQSection from '@/components/sections/FAQSection'
import EnterpriseFinalCTA from '@/components/sections/EnterpriseFinalCTA'
import EnterpriseFooter from '@/components/sections/EnterpriseFooter'
import EnterpriseNav from '@/src/components/enterprise-nav'
import DarkModeToggle from '@/components/DarkModeToggle'

export default function ShopifyEnhancedPage() {
  return (
    <>
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Navigation with Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <DarkModeToggle />
      </div>
      <EnterpriseNav />

      {/* Main Content with all fixes */}
      <main id="main-content" className="shopify-page">
        {/* Hero Section */}
        <ShopifyHero />
        
        {/* Trust Bar */}
        <ShopifyTrustBar />
        
        {/* Value Propositions */}
        <ShopifyValueProps />
        
        {/* Platform Capabilities with Screenshot Preview */}
        <PlatformCapabilitiesV2 />
        
        {/* Pricing Section */}
        <ShopifyPricing />
        
        {/* Proof by Numbers with Clickable Case Studies */}
        <ProofByNumbers />
        
        {/* Creator Pain Points */}
        <CreatorPainPoints />
        
        {/* Enterprise Ready Features */}
        <EnterpriseReady />
        
        {/* ROI Calculator */}
        <ROICalculator />
        
        {/* FAQ Section */}
        <FAQSection />
        
        {/* Final CTA */}
        <EnterpriseFinalCTA />
      </main>

      {/* Footer */}
      <EnterpriseFooter />

      <style jsx global>{`
        /* Ensure proper dark mode transitions */
        * {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }

        /* Skip link styling */
        .skip-to-content {
          position: absolute;
          top: -40px;
          left: 0;
          background: #9333EA;
          color: white;
          padding: 8px 16px;
          text-decoration: none;
          border-radius: 0 0 8px 0;
          z-index: 9999;
        }
        
        .skip-to-content:focus {
          top: 0;
        }

        /* Ensure all images have proper aspect ratios */
        img {
          max-width: 100%;
          height: auto;
          display: block;
        }

        /* Dark mode background fixes */
        .dark {
          color-scheme: dark;
        }

        .dark .shopify-page {
          background-color: #0A0B0C;
          color: #E5E7EB;
        }

        /* Fix for case study cards in dark mode */
        .dark .bg-gradient-to-br {
          background: linear-gradient(to bottom right, rgba(55, 65, 81, 0.5), rgba(31, 41, 55, 0.5));
        }

        /* Ensure text remains readable in dark mode */
        .dark .text-gray-900 {
          color: #F3F4F6;
        }

        .dark .text-gray-700 {
          color: #D1D5DB;
        }

        .dark .text-gray-600 {
          color: #9CA3AF;
        }

        .dark .text-gray-500 {
          color: #6B7280;
        }

        /* Fix purple elements in dark mode */
        .dark .bg-purple-100 {
          background-color: rgba(147, 51, 234, 0.2);
        }

        .dark .text-purple-700 {
          color: #A78BFA;
        }

        .dark .text-purple-600 {
          color: #C084FC;
        }

        /* Ensure consistent spacing on mobile */
        @media (max-width: 768px) {
          section {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </>
  )
}