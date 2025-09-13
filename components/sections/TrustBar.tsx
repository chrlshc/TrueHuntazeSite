'use client'

import React from 'react'
import { motion } from 'framer-motion'

const platforms = [
  { name: 'Instagram', logo: '/logos/instagram.svg', alt: 'Instagram' },
  { name: 'OnlyFans', logo: '/logos/onlyfans.svg', alt: 'OnlyFans' },
  { name: 'TikTok', logo: '/logos/tiktok.svg', alt: 'TikTok' },
  { name: 'Twitter', logo: '/logos/twitter.svg', alt: 'Twitter' },
  { name: 'Reddit', logo: '/logos/reddit.svg', alt: 'Reddit' }
]

export default function TrustBar() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="trust-bar mb-8"
    >
      <p className="text-sm text-[#9CA3AF] mb-4 text-center">
        Trusted by creators on
      </p>
      <div className="flex items-center justify-center gap-8 flex-wrap">
        {platforms.map((platform, index) => (
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="relative group"
          >
            <div className="w-12 h-12 bg-[#252528] rounded-xl flex items-center justify-center border border-[#2D2D30] group-hover:border-[#5E6AD2]/50 transition-all duration-300">
              <img 
                src={platform.logo} 
                alt={platform.alt}
                className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="text-xs text-[#9CA3AF] whitespace-nowrap bg-[#1A1A1B] px-2 py-1 rounded">
                {platform.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}