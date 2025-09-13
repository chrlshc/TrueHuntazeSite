'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertCircle, TrendingUp, Clock, Users, Zap } from 'lucide-react'
import { UrgencyIndicator } from '@/lib/websocket/urgency-manager'

interface UrgencyBannerProps {
  indicators: UrgencyIndicator[]
  onDismiss?: (id: string) => void
  className?: string
}

const iconMap = {
  limited_spots: Users,
  price_increase: TrendingUp,
  flash_sale: Zap,
  user_activity: Users,
  trending: TrendingUp
}

const severityColors = {
  low: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  medium: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
  high: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
  critical: 'bg-red-500/10 border-red-500/20 text-red-400'
}

export default function UrgencyBanner({ indicators, onDismiss, className }: UrgencyBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-cycle through indicators
  useEffect(() => {
    if (indicators.length <= 1 || isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % indicators.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [indicators.length, isPaused])

  if (indicators.length === 0) return null

  const currentIndicator = indicators[currentIndex]
  if (!currentIndicator) return null

  const Icon = iconMap[currentIndicator.type] || AlertCircle

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndicator.id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className={`
            relative overflow-hidden rounded-lg border backdrop-blur-sm
            ${severityColors[currentIndicator.severity]}
          `}
        >
          {/* Background animation */}
          <div className="absolute inset-0 opacity-20">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
              animate={{ x: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{ width: '200%' }}
            />
          </div>

          <div className="relative px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Icon className="w-5 h-5" />
              </motion.div>
              
              <p className="text-sm font-medium">{currentIndicator.message}</p>

              {/* Time remaining if applicable */}
              {currentIndicator.expiresAt && (
                <TimeRemaining expiresAt={currentIndicator.expiresAt} />
              )}
            </div>

            {/* Indicator dots */}
            {indicators.length > 1 && (
              <div className="flex items-center gap-1">
                {indicators.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      idx === currentIndex
                        ? 'w-4 bg-current'
                        : 'bg-current opacity-30'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Dismiss button */}
            {onDismiss && (
              <button
                onClick={() => onDismiss(currentIndicator.id)}
                className="p-1 rounded-md hover:bg-white/10 transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function TimeRemaining({ expiresAt }: { expiresAt: number }) {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = Date.now()
      const diff = expiresAt - now

      if (diff <= 0) {
        setTimeLeft('Expired')
        return
      }

      const minutes = Math.floor(diff / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)

      if (minutes > 0) {
        setTimeLeft(`${minutes}m ${seconds}s`)
      } else {
        setTimeLeft(`${seconds}s`)
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [expiresAt])

  return (
    <div className="flex items-center gap-1 text-xs opacity-75">
      <Clock className="w-3 h-3" />
      <span>{timeLeft}</span>
    </div>
  )
}