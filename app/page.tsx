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

export default function HomePage() {
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
    </>
  );
}
