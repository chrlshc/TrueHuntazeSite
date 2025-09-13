'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function Testimonials() {
  return (
    <section className="py-20 px-4 bg-black">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          Success Stories
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Placeholder cards */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800"
            >
              <div className="h-20 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded mb-4" />
              <h3 className="text-xl font-semibold mb-2">Creator {i}</h3>
              <p className="text-gray-400">Success story content</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}