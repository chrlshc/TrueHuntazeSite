import HeroSection from '@/components/sections/HeroSection'
import FeaturesGrid from '@/components/sections/FeaturesGrid'
import SocialProof from '@/components/sections/SocialProof'
import Testimonials from '@/components/sections/Testimonials'
import MessagingFeature from '@/components/sections/MessagingFeature'
import RevenueIntel from '@/components/sections/RevenueIntel'
import CommandCenter from '@/components/sections/CommandCenter'
import PlatformStats from '@/components/sections/PlatformStats'
import GetStarted from '@/components/sections/GetStarted'

export default function TrueHuntazeSite() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Section 1: Hero with main iPhone mockup */}
      <HeroSection />
      
      {/* Section 2: Platform Features Grid - 6 cards */}
      <FeaturesGrid />
      
      {/* Section 3: Social Proof - $50M counter */}
      <SocialProof />
      
      {/* Section 4: Success Stories */}
      <Testimonials />
      
      {/* Section 5: Messaging Feature - Large iPhone */}
      <MessagingFeature />
      
      {/* Section 6: Revenue Intelligence Dashboard */}
      <RevenueIntel />
      
      {/* Section 7: Command Center - Full Dashboard */}
      <CommandCenter />
      
      {/* Section 8: Platform Stats - 3 animated metrics */}
      <PlatformStats />
      
      {/* Section 9: Get Started - 3 steps */}
      <GetStarted />
    </div>
  )
}