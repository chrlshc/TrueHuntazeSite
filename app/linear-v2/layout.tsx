import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Huntaze - Design System v2',
  description: 'Hybrid Shopify + Linear design implementation with enhanced performance',
}

export default function LinearV2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Critical CSS inline for above-the-fold content */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Critical above-the-fold styles */
        :root {
          --font-family-sans: 'Inter', 'InterFallback', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, sans-serif;
          --color-bg-primary-fallback: #fafafa;
          --color-text-primary-fallback: #1a1a1a;
          --font-size-350: 0.875rem;
          --font-weight-regular: 450;
          --space-400: 1rem;
          --space-600: 1.5rem;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          font-family: var(--font-family-sans);
          font-size: var(--font-size-350);
          font-weight: var(--font-weight-regular);
          line-height: 1.5;
          color: var(--color-text-primary-fallback);
          background: var(--color-bg-primary-fallback);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .hero {
          min-height: 60vh;
          display: grid;
          place-items: center;
          padding: var(--space-600) var(--space-400);
        }
        
        .container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 var(--space-400);
        }
        
        /* Prevent FOUC */
        .no-js .js-only { display: none !important; }
        
        /* Font loading optimization */
        .fonts-loading body {
          font-family: 'InterFallback', Arial, sans-serif;
        }
        
        .fonts-loaded body {
          font-family: 'Inter', var(--font-family-sans);
        }
      ` }} />
      
      {/* Font preload with crossorigin */}
      <link
        rel="preload"
        href="/fonts/inter-variable.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      
      {/* Optimized font loading */}
      <link rel="stylesheet" href="/fonts/inter-optimized.css" />
      
      {/* Main styles deferred */}
      <link
        rel="preload"
        href="/styles/shopify-linear-hybrid-v2.css"
        as="style"
      />
      <link
        rel="stylesheet"
        href="/styles/shopify-linear-hybrid-v2.css"
        media="print"
        onLoad="this.media='all'; this.onload=null;"
      />
      
      {/* Fallback for JavaScript disabled */}
      <noscript>
        <link rel="stylesheet" href="/styles/shopify-linear-hybrid-v2.css" />
      </noscript>
      
      {/* Font loading detection script */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          document.documentElement.classList.add('fonts-loading');
          
          if ('fonts' in document) {
            Promise.all([
              document.fonts.load('450 1em Inter'),
              document.fonts.load('700 1em Inter')
            ]).then(function() {
              document.documentElement.classList.remove('fonts-loading');
              document.documentElement.classList.add('fonts-loaded');
            });
          } else {
            // Fallback for older browsers
            setTimeout(function() {
              document.documentElement.classList.remove('fonts-loading');
              document.documentElement.classList.add('fonts-loaded');
            }, 1000);
          }
        })();
      ` }} />
      
      {/* JavaScript detection */}
      <script dangerouslySetInnerHTML={{ __html: `
        document.documentElement.classList.remove('no-js');
        document.documentElement.classList.add('js');
      ` }} />
      
      {children}
    </>
  )
}