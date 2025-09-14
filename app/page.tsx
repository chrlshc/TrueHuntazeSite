'use client'

import { ArrowRight } from 'lucide-react'

// Shopify section titles with subtitles - formatted like Shopify
const sections = [
  { 
    id: 'platform', 
    title: ['The one commerce platform', 'behind it all'],
    subtitle: ['Unify your creator business with AI that works across every platform.', 'From OnlyFans to Instagram, manage everything in one place.']
  },
  { 
    id: 'everyone', 
    title: ['For everyone from entrepreneurs', 'to enterprise'],
    subtitle: ['Whether you\'re just starting or making millions,', 'our AI scales with your ambition. No limits, just growth.']
  },
  { 
    id: 'everywhere', 
    title: ['Sell here, there,', 'and everywhere'],
    subtitle: ['Your content, your rules. Monetize across platforms', 'while keeping your brand consistent and your fans engaged.']
  },
  { 
    id: 'wholesale', 
    title: ['Direct and', 'wholesale'],
    subtitle: ['PPV, subscriptions, tips, custom content.', 'Every revenue stream automated and optimized by AI.']
  },
  { 
    id: 'customers', 
    title: ['Find your forever', 'customers'],
    subtitle: ['Turn casual viewers into lifetime fans.', 'Our AI knows what converts and when to engage.']
  },
  { 
    id: 'global', 
    title: ['Local and', 'global'],
    subtitle: ['Reach fans in their language, their timezone, their currency.', 'Go global without the complexity.']
  },
  { 
    id: 'grow', 
    title: ['Grow around', 'the world'],
    subtitle: ['From LA to London, Tokyo to Toronto.', 'Your AI assistant never sleeps, converting fans 24/7.']
  },
  { 
    id: 'business', 
    title: ['Take care', 'of business'],
    subtitle: ['Finances, analytics, compliance.', 'Everything you need to run a professional creator business.']
  },
  { 
    id: 'apps', 
    title: ['Apps for', 'anything else'],
    subtitle: ['Connect your favorite tools. From content creation', 'to payment processing, we integrate with everything.']
  },
  { 
    id: 'developers', 
    title: ['By developers,', 'for developers'],
    subtitle: ['Built on modern APIs.', 'Extend and customize Huntaze to fit your exact workflow.']
  },
  { 
    id: 'build', 
    title: ['There\'s no better place', 'for you to build'],
    subtitle: ['Rock-solid infrastructure, enterprise security,', 'and APIs that just work. Build with confidence.']
  },
  { 
    id: 'fast', 
    title: ['Rock steady and', 'blazing fast'],
    subtitle: ['99.99% uptime. Sub-second response times.', 'Your business never stops, neither do we.']
  },
  { 
    id: 'edge', 
    title: ['Huntaze keeps you', 'at the cutting edge'],
    subtitle: ['AI that learns and improves.', 'Always getting smarter, always staying ahead of the curve.']
  },
  { 
    id: 'support', 
    title: ['Huntaze has', 'your back'],
    subtitle: ['24/7 support from real humans who understand the creator economy.', 'We\'re here when you need us.']
  },
  { 
    id: 'start', 
    title: ['Start selling', 'in no time'],
    subtitle: ['Go from signup to making money in under 5 minutes.', 'No complex setup, just results.']
  }
]

export default function Home() {
  return (
    <>
      {/* Navigation - Linear style */}
      <nav className="nav">
        <div className="container nav-container">
          <a href="/" className="logo" style={{ 
            fontSize: '20px', 
            fontWeight: '600',
            letterSpacing: '-0.02em'
          }}>
            Huntaze
          </a>
          
          <ul className="nav-links" style={{ fontSize: '15px' }}>
            <li><a href="#" className="nav-link">Product</a></li>
            <li><a href="#" className="nav-link">Features</a></li>
            <li><a href="#" className="nav-link">Pricing</a></li>
            <li><a href="#" className="nav-link">Company</a></li>
          </ul>
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <a href="#" className="nav-link" style={{ fontSize: '15px' }}>Log in</a>
            <a href="#" className="btn btn-primary" style={{ 
              fontSize: '15px',
              padding: '10px 20px'
            }}>Start for free</a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Linear style with Shopify copy */}
      <section className="hero">
        <div className="container">
          {/* Main heading - Shopify style */}
          <h1 className="h1 gradient-text" style={{ textAlign: 'center', width: '100%' }}>
            Be the next<br />
            big thing
          </h1>
          
          {/* Subheading - Like Linear */}
          <p className="text-lg" style={{ 
            lineHeight: '1.5',
            color: 'var(--text-secondary)',
            marginBottom: '48px', 
            maxWidth: '800px', 
            margin: '0 auto 48px' 
          }}>
            Dream big, build fast, and grow far with AI<br />
            that automates your creator business.
          </p>
          
          {/* CTA Button - Linear style */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <a href="#" className="btn btn-primary" style={{ 
              fontSize: '18px',
              padding: '16px 32px',
              fontWeight: '500'
            }}>
              Start for free
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Mockup Section - Linear style */}
      <section style={{ paddingTop: '0', paddingBottom: '120px' }}>
        <div className="container">
          <div style={{
            position: 'relative',
            maxWidth: '1200px',
            margin: '0 auto',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 100px 200px -50px rgba(0, 0, 0, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: '#0a0b0f'
          }}>
            <div style={{
              padding: '8px 16px',
              background: 'rgba(255, 255, 255, 0.02)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              gap: '8px',
              alignItems: 'center'
            }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
              <div style={{ flex: 1, textAlign: 'center', color: '#6e6e73', fontSize: '13px', marginRight: '60px' }}>huntaze.ai</div>
            </div>
            <div style={{ background: '#0d0e11', padding: '0' }}>
              {/* Dashboard mockup content */}
              <div style={{ display: 'flex', height: '600px' }}>
                {/* Sidebar */}
                <div style={{ 
                  width: '240px', 
                  background: '#0a0b0f', 
                  borderRight: '1px solid rgba(255, 255, 255, 0.05)',
                  padding: '24px 16px'
                }}>
                  <div style={{ marginBottom: '32px' }}>
                    <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>Huntaze</div>
                    <div style={{ fontSize: '13px', color: '#6e6e73' }}>Creator Platform</div>
                  </div>
                  <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ padding: '8px 12px', background: 'rgba(94, 106, 210, 0.1)', borderRadius: '6px', color: '#5e6ad2', fontSize: '14px' }}>Dashboard</div>
                    <div style={{ padding: '8px 12px', color: '#a8a8a8', fontSize: '14px' }}>Analytics</div>
                    <div style={{ padding: '8px 12px', color: '#a8a8a8', fontSize: '14px' }}>Messages</div>
                    <div style={{ padding: '8px 12px', color: '#a8a8a8', fontSize: '14px' }}>Content</div>
                    <div style={{ padding: '8px 12px', color: '#a8a8a8', fontSize: '14px' }}>Subscribers</div>
                  </nav>
                </div>
                
                {/* Main content */}
                <div style={{ flex: 1, padding: '32px' }}>
                  {/* Stats cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                    <div style={{ 
                      background: 'rgba(255, 255, 255, 0.02)', 
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      padding: '24px'
                    }}>
                      <div style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '8px' }}>Monthly Revenue</div>
                      <div style={{ fontSize: '28px', fontWeight: '600' }}>$24,580</div>
                      <div style={{ fontSize: '13px', color: '#27c93f', marginTop: '8px' }}>↑ 12.5%</div>
                    </div>
                    <div style={{ 
                      background: 'rgba(255, 255, 255, 0.02)', 
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      padding: '24px'
                    }}>
                      <div style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '8px' }}>Active Subscribers</div>
                      <div style={{ fontSize: '28px', fontWeight: '600' }}>3,482</div>
                      <div style={{ fontSize: '13px', color: '#27c93f', marginTop: '8px' }}>↑ 8.2%</div>
                    </div>
                    <div style={{ 
                      background: 'rgba(255, 255, 255, 0.02)', 
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      padding: '24px'
                    }}>
                      <div style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '8px' }}>Engagement Rate</div>
                      <div style={{ fontSize: '28px', fontWeight: '600' }}>68.4%</div>
                      <div style={{ fontSize: '13px', color: '#27c93f', marginTop: '8px' }}>↑ 4.1%</div>
                    </div>
                  </div>
                  
                  {/* Chart area */}
                  <div style={{ 
                    background: 'rgba(255, 255, 255, 0.02)', 
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    padding: '24px',
                    height: '300px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Revenue Analytics</div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
                      {[40, 65, 45, 70, 85, 60, 90, 75, 95, 80, 100, 85].map((height, i) => (
                        <div key={i} style={{ 
                          flex: 1, 
                          height: `${height}%`, 
                          background: 'linear-gradient(180deg, #5e6ad2 0%, #0084ff 100%)',
                          borderRadius: '4px 4px 0 0',
                          opacity: 0.8
                        }}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Shopify sections */}
      {sections.map((section, index) => {
        // Different layout for each section
        let content = null;
        
        if (index === 0) {
          // Platform section - Image grid like Shopify
          content = (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '1000px', margin: '0 auto' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                borderRadius: '16px',
                padding: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#5e6ad2'
              }}>Huntaze</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ background: '#1a1a1a', borderRadius: '8px', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#a8a8a8' }}>Instagram</span>
                </div>
                <div style={{ background: '#1a1a1a', borderRadius: '8px', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#a8a8a8' }}>TikTok</span>
                </div>
                <div style={{ background: '#1a1a1a', borderRadius: '8px', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#a8a8a8' }}>OnlyFans</span>
                </div>
                <div style={{ background: '#1a1a1a', borderRadius: '8px', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#a8a8a8' }}>Patreon</span>
                </div>
              </div>
            </div>
          );
        } else if (index === 1) {
          // Everyone section - 3 feature cards
          content = (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', maxWidth: '1000px', margin: '0 auto' }}>
              {[
                { title: 'Get started fast', desc: 'Solo creator Melissa Ray Cramp started Summer Solace Yellow to sell her handmade candles and skincare online.' },
                { title: 'Grow as big as you want', desc: 'Athletes brand Gymshark grew from working out of a garage to global juggernaut with 5500M+ sales annually.' },
                { title: 'Raise the bar', desc: 'With the help of Shopify for enterprise, Mattel sells their iconic toys direct to customers around the world.' }
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  overflow: 'hidden'
                }}>
                  <div style={{ aspectRatio: '4/3', background: '#1a1a1a' }}></div>
                  <div style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>{item.title}</h3>
                    <p style={{ fontSize: '14px', color: '#a8a8a8', lineHeight: '1.6' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          );
        } else if (index === 2) {
          // Sell everywhere - Split layout
          content = (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', maxWidth: '1000px', margin: '0 auto', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#5e6ad2', marginBottom: '16px' }}>Online and in person</div>
                <h3 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px' }}>Sell here, there,<br />and everywhere</h3>
                <p style={{ fontSize: '16px', color: '#a8a8a8', lineHeight: '1.6', marginBottom: '32px' }}>
                  Get a stunning store that's made to sell. Design fast with AI, choose a stylish theme, or build completely custom for full control.
                </p>
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  padding: '24px',
                  maxWidth: '300px'
                }}>
                  <div style={{ fontSize: '14px', color: '#a8a8a8', marginBottom: '8px' }}>Homepage</div>
                  <div style={{ fontSize: '14px', marginBottom: '16px' }}>Header</div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ width: '16px', height: '16px', background: '#5e6ad2', borderRadius: '2px' }}></div>
                    <span style={{ fontSize: '12px', color: '#a8a8a8' }}>Header</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ width: '16px', height: '16px', background: 'transparent', border: '1px solid #5e6ad2', borderRadius: '2px' }}></div>
                    <span style={{ fontSize: '12px', color: '#a8a8a8' }}>Add section</span>
                  </div>
                </div>
              </div>
              <div style={{ 
                background: '#1a1a1a',
                borderRadius: '16px',
                aspectRatio: '3/4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '24px', color: '#4a4a4a' }}>Store Preview</span>
              </div>
            </div>
          );
        } else if (index % 3 === 0) {
          // Stats layout
          content = (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', maxWidth: '1000px', margin: '0 auto', alignItems: 'center' }}>
              <div style={{ 
                background: '#1a1a1a',
                borderRadius: '16px',
                aspectRatio: '4/3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '24px', color: '#4a4a4a' }}>Visual</span>
              </div>
              <div>
                <div style={{ display: 'grid', gap: '24px' }}>
                  <div>
                    <div style={{ fontSize: '48px', fontWeight: '600', marginBottom: '8px' }}>$5B</div>
                    <div style={{ fontSize: '16px', color: '#a8a8a8' }}>Loaned out so far</div>
                    <div style={{ fontSize: '14px', color: '#6e6e73' }}>Invested in Shopify merchants</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '48px', fontWeight: '600', marginBottom: '8px' }}>Loans up to $2M</div>
                    <div style={{ fontSize: '16px', color: '#a8a8a8' }}>Offers tailored to meet your needs</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '48px', fontWeight: '600', marginBottom: '8px' }}>0% equity</div>
                    <div style={{ fontSize: '16px', color: '#a8a8a8' }}>No stake taken—ever</div>
                  </div>
                </div>
              </div>
            </div>
          );
        } else if (index % 2 === 0) {
          // Image mosaic
          content = (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', maxWidth: '1000px', margin: '0 auto' }}>
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{ 
                  background: i % 3 === 0 ? 'linear-gradient(135deg, #5e6ad2 0%, #0084ff 100%)' : '#1a1a1a',
                  borderRadius: '8px',
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '14px', color: i % 3 === 0 ? 'white' : '#4a4a4a' }}>
                    {['AI', 'Chat', 'Analytics', 'PPV', 'Tips', 'Subs', 'Content', 'Fans'][i]}
                  </span>
                </div>
              ))}
            </div>
          );
        } else {
          // Feature list
          content = (
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ display: 'grid', gap: '32px' }}>
                {[
                  { icon: '🚀', title: 'Launch faster', desc: 'Get your creator business running in minutes with AI automation' },
                  { icon: '💰', title: 'Earn more', desc: 'Optimize pricing, upsells, and engagement with smart algorithms' },
                  { icon: '📊', title: 'Scale smarter', desc: 'Data-driven insights to grow your revenue month over month' },
                  { icon: '🔒', title: 'Stay secure', desc: 'Enterprise-grade security and compliance built in' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '24px', alignItems: 'start' }}>
                    <div style={{ 
                      fontSize: '32px',
                      width: '64px',
                      height: '64px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>{item.icon}</div>
                    <div>
                      <h4 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>{item.title}</h4>
                      <p style={{ fontSize: '16px', color: '#a8a8a8', lineHeight: '1.6' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        
        return (
          <section key={section.id} id={section.id} className="section" style={{ 
            background: index % 4 === 0 ? 'linear-gradient(180deg, #000000 0%, #0a0b0f 100%)' : 'transparent' 
          }}>
            <div className="container">
              <div className="section-title" style={{ 
                maxWidth: '900px', 
                margin: '0 auto 80px',
                textAlign: index % 3 === 2 ? 'left' : 'center'
              }}>
                <h2 className="h2">
                  {section.title[0]}<br />
                  {section.title[1]}
                </h2>
                <p className="text-lg" style={{ marginTop: '24px' }}>
                  {section.subtitle[0]}<br />
                  {section.subtitle[1]}
                </p>
              </div>
              
              {content}
            </div>
          </section>
        );
      })}

      {/* Final CTA Section */}
      <section style={{ 
        padding: '160px 0',
        background: 'linear-gradient(180deg, transparent 0%, #0a0b0f 100%)'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="h2 gradient-text" style={{ marginBottom: '24px' }}>
            Ready to 10x your<br />
            creator business?
          </h2>
          <p className="text-lg" style={{ 
            fontSize: '20px',
            marginBottom: '48px',
            maxWidth: '600px',
            margin: '0 auto 48px'
          }}>
            Join thousands of creators who are scaling<br />
            their income with AI automation.
          </p>
          <a href="#" className="btn btn-primary" style={{ 
            fontSize: '18px',
            padding: '16px 40px',
            fontWeight: '600'
          }}>
            Start for free
            <ArrowRight size={20} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>huntaze</div>
          
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" className="nav-link">Privacy</a>
            <a href="#" className="nav-link">Terms</a>
            <a href="#" className="nav-link">Contact</a>
          </div>
          
          <div className="text-sm">
            © 2024 Huntaze. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}