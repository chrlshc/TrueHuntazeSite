'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function RevenueIntel() {
  return (
    <section className="py-20 px-4 bg-black">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Revenue Intelligence</h2>
          <p className="text-xl text-gray-400">Track, analyze, and optimize your earnings</p>
        </motion.div>
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <div className="h-64 bg-gradient-to-r from-violet-600/10 to-purple-600/10 rounded-lg flex items-center justify-center">
            <span className="text-gray-600">Dashboard Mockup</span>
          </div>
        </div>
      </div>
    </section>
  )
}