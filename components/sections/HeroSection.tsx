'use client'

import React from 'react'
import { motion } from 'framer-motion'
import PhoneMockup from '@/components/mockups/PhoneMockup'
import ChatAnimation from '@/components/mockups/ChatAnimation'
import Link from 'next/link'
import TrustBar from './TrustBar'
import MetricsBar from './MetricsBar'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-black to-purple-900/20" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Trust Bar - Shopify Style */}
            <TrustBar />

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="block text-white"
              >
                Scale your creator
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="block"
              >
                business{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                  professionally
                </span>
              </motion.span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-400 mb-8 max-w-lg"
            >
              Automate operations, analyze performance, and grow revenue with enterprise-grade tools designed for modern creators.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/get-started"
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 text-center"
              >
                Start Free Trial
              </Link>
              <Link
                href="/demo"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 text-center"
              >
                Watch Demo
              </Link>
            </motion.div>

            {/* Metrics Bar - Shopify Style */}
            <MetricsBar />
          </motion.div>

          {/* Phone mockup with animations */}
          <div className="relative lg:pl-12">
            <PhoneMockup delay={0.5}>
              <ChatAnimation />
            </PhoneMockup>
            
            {/* Floating metric cards */}
            <motion.div
              className="absolute -top-4 -left-4 bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-gray-800"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="text-sm text-gray-400">Revenue today</div>
              <div className="text-2xl font-bold text-violet-400">$1,247</div>
              <div className="text-xs text-green-400 mt-1">↑ 23% from yesterday</div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -right-4 bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-gray-800"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="text-sm text-gray-400">Active conversations</div>
              <div className="text-2xl font-bold text-purple-400">47</div>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-gray-700 rounded-full border-2 border-gray-900" />
                ))}
                <span className="text-xs text-gray-500 ml-1">+12</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute top-1/2 -right-12 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg px-4 py-2 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold">AI Active</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}