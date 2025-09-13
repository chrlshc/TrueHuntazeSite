import LinearHero from '@/components/LinearHero'
import LinearFeatureGrid from '@/components/LinearFeatureGrid'
import ShopifyTrustBar from '@/components/ShopifyTrustBar'
import ShopifyPricing from '@/components/ShopifyPricing'
import ProofByNumbers from '@/components/sections/ProofByNumbers'
import FAQSection from '@/components/sections/FAQSection'
import EnterpriseFinalCTA from '@/components/sections/EnterpriseFinalCTA'
import EnterpriseFooter from '@/components/sections/EnterpriseFooter'
import EnterpriseNav from '@/src/components/enterprise-nav'

export default function LinearPage() {
  return (
    <>
      {/* Preload Inter font for optimal performance */}
      <link 
        rel="preload" 
        href="/fonts/inter-var.woff2" 
        as="font" 
        type="font/woff2" 
        crossOrigin="anonymous"
      />
      
      {/* Import hybrid design system */}
      <link rel="stylesheet" href="/fonts/inter.css" />
      
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Navigation */}
      <EnterpriseNav />

      {/* Main Content with Linear styling */}
      <main id="main-content" className="linear-page">
        {/* Hero with Linear animations */}
        <LinearHero />
        
        {/* Trust indicators */}
        <ShopifyTrustBar />
        
        {/* Feature grid with Linear design */}
        <LinearFeatureGrid />
        
        {/* Proof by numbers with skeleton loading */}
        <ProofByNumbers />
        
        {/* Pricing with Shopify structure */}
        <ShopifyPricing />
        
        {/* FAQ with smooth animations */}
        <FAQSection />
        
        {/* Final CTA */}
        <EnterpriseFinalCTA />
      </main>

      {/* Footer */}
      <EnterpriseFooter />

      {/* Import hybrid CSS */}
      <style jsx global>{`
        /* @import '/styles/shopify-linear-hybrid.css'; - disabled due to @layer conflict */
        
        /* Override with Linear-specific styles */
        .linear-page {
          font-family: var(--font-primary);
          color: var(--text-primary);
          background-color: var(--bg-primary);
          min-height: 100vh;
        }
        
        /* Ensure smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Apply Shopify text rendering globally */
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          font-kerning: normal;
        }
        
        /* Remove default margins */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        /* Focus visible for accessibility */
        :focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
      `}</style>
    </>
  )
}