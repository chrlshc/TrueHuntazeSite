'use client'

import React from 'react'
import { motion } from 'framer-motion'
import MetricCounter from '@/components/mockups/MetricCounter'

export default function PlatformStats() {
  return (
    <section className="py-20 px-4 bg-black">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Platform Performance</h2>
          <p className="text-xl text-gray-400">Real results from real creators</p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <MetricCounter
            label="Messages per month"
            value={47000000}
            suffix="+"
            delay={0.2}
          />
          <MetricCounter
            label="Active creators"
            value={15000}
            suffix="+"
            delay={0.4}
          />
          <MetricCounter
            label="Response time"
            value={2.3}
            suffix="s"
            delay={0.6}
          />
        </div>
      </div>
    </section>
  )
}