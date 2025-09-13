'use client'

import React from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'

interface MetricCounterProps {
  label: string
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  delay?: number
}

export default function MetricCounter({ 
  label, 
  value, 
  prefix = '', 
  suffix = '', 
  duration = 2,
  delay = 0 
}: MetricCounterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
        <CountUp
          start={0}
          end={value}
          duration={duration}
          delay={delay}
          prefix={prefix}
          suffix={suffix}
          separator=","
        />
      </div>
      <div className="text-sm text-gray-400 mt-1">{label}</div>
    </motion.div>
  )
}