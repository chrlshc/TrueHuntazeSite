'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface PhoneMockupProps {
  children: React.ReactNode
  delay?: number
  scale?: number
}

export default function PhoneMockup({ children, delay = 0, scale = 1 }: PhoneMockupProps) {
  return (
    <motion.div 
      className="relative"
      style={{ 
        width: `${375 * scale}px`, 
        height: `${812 * scale}px` 
      }}
      initial={{ opacity: 0, scale: 0.8, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
    >
      {/* iPhone Frame */}
      <div className="absolute inset-0 bg-gray-900 rounded-[60px] shadow-2xl">
        {/* Dynamic Island */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-full" />
        
        {/* Side buttons */}
        <div className="absolute left-[-3px] top-[130px] w-[3px] h-[60px] bg-gray-700 rounded-r-lg" />
        <div className="absolute left-[-3px] top-[200px] w-[3px] h-[40px] bg-gray-700 rounded-r-lg" />
        <div className="absolute right-[-3px] top-[180px] w-[3px] h-[80px] bg-gray-700 rounded-l-lg" />
        
        {/* Screen */}
        <div className="absolute inset-[12px] bg-black rounded-[48px] overflow-hidden">
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-[50px] px-8 flex items-center justify-between text-white text-xs z-10">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-3 border border-white rounded-sm">
                <div className="w-full h-full bg-white rounded-sm scale-x-[0.7] origin-left" />
              </div>
              <div className="flex gap-[2px]">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-[3px] bg-white rounded-full"
                    style={{ height: `${8 + i * 2}px` }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="pt-[50px] h-full">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  )
}