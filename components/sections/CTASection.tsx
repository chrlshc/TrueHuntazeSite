'use client'

import React from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import { useOptimizedInView } from '@/hooks/useOptimizedInView'

export default function CTASection() {
  const { ref: sectionRef, inView: sectionInView } = useOptimizedInView({ 
    threshold: 0.3,
    triggerOnce: true
  })

  return (
    <LazyMotion features={domAnimation} strict>
      <section 
        ref={sectionRef}
        className="py-20 px-4 bg-black relative overflow-hidden"
        style={{ contain: 'layout style' }}
      >
        {/* Animated background gradient */}
        <m.div 
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ transform: 'translateZ(0)' }}
        />
        
        <div className="container mx-auto relative z-10">
          <m.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {/* Main heading */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <m.span
                className="block text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={sectionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                Ready to 10x
              </m.span>
              <m.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400"
                initial={{ opacity: 0, y: 20 }}
                animate={sectionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                your earnings?
              </m.span>
            </h2>
            
            {/* Subheading */}
            <m.p 
              className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={sectionInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Join thousands of creators who are already using Huntaze to scale their business on autopilot.
            </m.p>
            
            {/* CTA buttons */}
            <m.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link
                href="/get-started"
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold text-lg transform transition-all hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-violet-600/25"
                style={{ willChange: 'transform' }}
              >
                Start Free Trial
              </Link>
              <Link
                href="/demo"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-semibold text-lg transform transition-all hover:scale-105 active:scale-95 hover:bg-white/20"
                style={{ willChange: 'transform' }}
              >
                Schedule Demo
              </Link>
            </m.div>
            
            {/* Trust text */}
            <m.p 
              className="text-sm text-gray-500 mt-8"
              initial={{ opacity: 0 }}
              animate={sectionInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              No credit card required • Setup in 60 seconds • Cancel anytime
            </m.p>

            {/* Floating elements for visual interest */}
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 text-8xl opacity-10 pointer-events-none">
              💎
            </div>
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-8xl opacity-10 pointer-events-none">
              🚀
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}