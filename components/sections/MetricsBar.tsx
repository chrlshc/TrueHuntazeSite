'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Star } from 'lucide-react'

const metrics = [
  {
    value: '€50M+',
    label: 'Revenue Generated',
    icon: TrendingUp,
    color: 'text-green-400'
  },
  {
    value: '150K+',
    label: 'Active Creators',
    icon: Users,
    color: 'text-[#5E6AD2]'
  },
  {
    value: '4.9/5',
    label: 'Customer Satisfaction',
    icon: Star,
    color: 'text-yellow-400'
  }
]

export default function MetricsBar() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="metrics-bar mt-12 mb-8"
    >
      <div className="bg-[#1A1A1B]/50 backdrop-blur-sm border border-[#2D2D30] rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="text-center group"
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <metric.icon className={`w-5 h-5 ${metric.color} opacity-80`} />
                <span className="text-3xl font-bold text-white group-hover:text-[#5E6AD2] transition-colors duration-300">
                  {metric.value}
                </span>
              </div>
              <p className="text-sm text-[#9CA3AF]">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}