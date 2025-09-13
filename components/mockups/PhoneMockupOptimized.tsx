'use client'

import React from 'react'
import { motion, LazyMotion, domAnimation, m } from 'framer-motion'
import { useOptimizedInView } from '@/hooks/useOptimizedInView'

interface PhoneMockupOptimizedProps {
  children: React.ReactNode
  delay?: number
  scale?: number
}

export default function PhoneMockupOptimized({ 
  children, 
  delay = 0, 
  scale = 1 
}: PhoneMockupOptimizedProps) {
  const { ref, inView } = useOptimizedInView({ 
    triggerOnce: true,
    threshold: 0.3 
  })

  // GPU-optimized styles
  const gpuStyles = {
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden' as const,
    perspective: 1000,
    willChange: 'transform'
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div 
        ref={ref}
        className="relative"
        style={{ 
          width: `${375 * scale}px`, 
          height: `${812 * scale}px`,
          ...gpuStyles
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ 
          delay, 
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1] // Custom easing for smoothness
        }}
      >
        {/* iPhone Frame - Using CSS transforms only */}
        <div 
          className="absolute inset-0 bg-gray-900 rounded-[60px] shadow-2xl"
          style={{ contain: 'layout style paint' }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-6 left-1/2 w-[120px] h-[35px] bg-black rounded-full" 
               style={{ transform: 'translateX(-50%)' }} />
          
          {/* Side buttons - Removed animations for performance */}
          <div className="absolute left-[-3px] top-[130px] w-[3px] h-[60px] bg-gray-700 rounded-r-lg" />
          <div className="absolute left-[-3px] top-[200px] w-[3px] h-[40px] bg-gray-700 rounded-r-lg" />
          <div className="absolute right-[-3px] top-[180px] w-[3px] h-[80px] bg-gray-700 rounded-l-lg" />
          
          {/* Screen with containment */}
          <div 
            className="absolute inset-[12px] bg-black rounded-[48px] overflow-hidden"
            style={{ contain: 'strict' }}
          >
            {/* Status bar */}
            <div className="absolute top-0 left-0 right-0 h-[50px] px-8 flex items-center justify-between text-white text-xs z-10">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-3 border border-white rounded-sm">
                  <div className="w-full h-full bg-white rounded-sm" 
                       style={{ transform: 'scaleX(0.7)', transformOrigin: 'left' }} />
                </div>
                <div className="flex gap-[2px]">
                  {[8, 10, 12, 14].map((height, i) => (
                    <div 
                      key={i} 
                      className="w-[3px] bg-white rounded-full"
                      style={{ height: `${height}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Content with isolated rendering context */}
            <div className="pt-[50px] h-full" style={{ contain: 'layout style' }}>
              {inView && children}
            </div>
          </div>
        </div>
      </m.div>
    </LazyMotion>
  )
}