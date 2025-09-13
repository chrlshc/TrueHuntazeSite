'use client'

import React from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useOptimizedInView } from '@/hooks/useOptimizedInView'

// Lazy load heavy components
const PhoneMockupOptimized = dynamic(
  () => import('@/components/mockups/PhoneMockupOptimized'),
  { 
    loading: () => <div className="w-[375px] h-[812px] bg-gray-900/20 rounded-[60px] animate-pulse" />,
    ssr: false 
  }
)

const ChatAnimationOptimized = dynamic(
  () => import('@/components/mockups/ChatAnimationOptimized'),
  { ssr: false }
)

// GPU-optimized floating card component
const FloatingCard = ({ children, delay = 0, x = 0, y = 0, className = "" }) => {
  const { ref, inView } = useOptimizedInView({ triggerOnce: true })
  
  return (
    <m.div
      ref={ref}
      className={`absolute bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-gray-800 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.5 }}
      style={{ 
        transform: `translate3d(${x}px, ${y}px, 0)`,
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden'
      }}
    >
      {children}
    </m.div>
  )
}

export default function HeroSectionOptimized() {
  const { ref: heroRef, inView: heroInView } = useOptimizedInView({ threshold: 0.1 })

  // Optimized text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    })
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center bg-black overflow-hidden"
        style={{ contain: 'layout style' }}
      >
        {/* Optimized background - using CSS gradients only */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-black to-purple-900/20"
          style={{ willChange: 'auto' }}
        />
        
        {/* Grid pattern with GPU optimization */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
          style={{ transform: 'translateZ(0)' }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text content with staggered animations */}
            <div>
              <m.div
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                className="inline-flex items-center gap-2 px-4 py-2 bg-violet-900/30 border border-violet-700/50 rounded-full text-sm text-violet-300 mb-6"
                custom={0}
                variants={textVariants}
              >
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                15,000+ creators earning more
              </m.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <m.span
                  initial="hidden"
                  animate={heroInView ? "visible" : "hidden"}
                  custom={1}
                  variants={textVariants}
                  className="block text-white"
                >
                  Become the creator
                </m.span>
                <m.span
                  initial="hidden"
                  animate={heroInView ? "visible" : "hidden"}
                  custom={2}
                  variants={textVariants}
                  className="block"
                >
                  earning{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                    six figures
                  </span>
                </m.span>
              </h1>
              
              <m.p
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                custom={3}
                variants={textVariants}
                className="text-xl text-gray-400 mb-8 max-w-lg"
              >
                Build bigger, earn smarter, grow further with Huntaze's AI that works 24/7 so you don't have to.
              </m.p>

              <m.div
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                custom={4}
                variants={textVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/get-started"
                  className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold transform transition-transform hover:scale-105 active:scale-95 text-center"
                  style={{ willChange: 'transform' }}
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/demo"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-semibold transform transition-transform hover:scale-105 active:scale-95 text-center"
                  style={{ willChange: 'transform' }}
                >
                  Watch Demo
                </Link>
              </m.div>

              {/* Trust indicators */}
              <m.div
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                custom={5}
                variants={textVariants}
                className="mt-12 flex items-center gap-8 text-sm text-gray-500"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Setup in 60 seconds
                </div>
              </m.div>
            </div>

            {/* Phone mockup with optimized animations */}
            <div className="relative lg:pl-12" style={{ contain: 'layout' }}>
              {heroInView && (
                <>
                  <PhoneMockupOptimized delay={0.5}>
                    <ChatAnimationOptimized />
                  </PhoneMockupOptimized>
                  
                  {/* Floating metric cards with GPU optimization */}
                  <FloatingCard delay={1} x={-16} y={-16} className="-top-4 -left-4">
                    <div className="text-sm text-gray-400">Revenue today</div>
                    <div className="text-2xl font-bold text-violet-400">$1,247</div>
                    <div className="text-xs text-green-400 mt-1">↑ 23% from yesterday</div>
                  </FloatingCard>

                  <FloatingCard delay={1.2} x={16} y={16} className="-bottom-4 -right-4">
                    <div className="text-sm text-gray-400">Active conversations</div>
                    <div className="text-2xl font-bold text-purple-400">47</div>
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-6 h-6 bg-gray-700 rounded-full border-2 border-gray-900" />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">+12</span>
                    </div>
                  </FloatingCard>

                  <FloatingCard delay={1.5} x={0} y={0} className="top-1/2 -right-12">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-semibold">AI Active</span>
                    </div>
                  </FloatingCard>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  )
}