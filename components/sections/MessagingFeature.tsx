'use client'

import React from 'react'
import { motion } from 'framer-motion'
import PhoneMockup from '@/components/mockups/PhoneMockup'
import ChatAnimation from '@/components/mockups/ChatAnimation'

export default function MessagingFeature() {
  return (
    <section className="py-20 px-4 bg-gray-950">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Messaging that{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                converts
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Connect everywhere, all the time with AI that never sleeps
            </p>
            
            {/* Feature list */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-violet-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI-powered responses</h3>
                  <p className="text-gray-400">Convert 3x more with messages that sound exactly like you</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Grow across platforms</h3>
                  <p className="text-gray-400">Dominate Instagram, TikTok, and Reddit with smart automation</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <PhoneMockup scale={0.9}>
              <ChatAnimation />
            </PhoneMockup>
          </motion.div>
        </div>
      </div>
    </section>
  )
}