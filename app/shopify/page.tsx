import ShopifyHero from '@/components/ShopifyHero'
import ShopifyTrustBar from '@/components/ShopifyTrustBar'
import ShopifyValueProps from '@/components/ShopifyValueProps'
import ShopifyPlatformCapabilities from '@/components/ShopifyPlatformCapabilities'
import ShopifyPricing from '@/components/ShopifyPricing'
import ProofByNumbers from '@/components/sections/ProofByNumbers'
import CreatorPainPoints from '@/components/sections/CreatorPainPoints'
import EnterpriseReady from '@/components/sections/EnterpriseReady'
import ROICalculator from '@/components/sections/ROICalculator'
import FAQSection from '@/components/sections/FAQSection'
import EnterpriseFinalCTA from '@/components/sections/EnterpriseFinalCTA'
import EnterpriseFooter from '@/components/sections/EnterpriseFooter'
import EnterpriseNav from '@/src/components/enterprise-nav'

export default function ShopifyHomePage() {
  return (
    <>
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Navigation */}
      <EnterpriseNav />

      {/* Main Content */}
      <main id="main-content" className="shopify-page">
        {/* Hero Section with Clear Value Proposition */}
        <ShopifyHero />
        
        {/* Trust Bar with Social Proof */}
        <ShopifyTrustBar />
        
        {/* Value Propositions - 3 Pillars */}
        <ShopifyValueProps />
        
        {/* Platform Capabilities with Progressive Disclosure */}
        <ShopifyPlatformCapabilities />
        
        {/* Pricing Section with Aligned Cards */}
        <ShopifyPricing />
        
        {/* Social Proof by Numbers */}
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
    </>
  )
}