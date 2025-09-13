'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, TrendingUp, Users, Zap, X } from 'lucide-react'
import { UrgencyIndicator } from '@/lib/websocket/urgency-manager'

interface UrgencyToastProps {
  indicator: UrgencyIndicator
  onDismiss?: () => void
  duration?: number
}

const iconMap = {
  announcement: AlertCircle,
  update: TrendingUp,
  offer: Zap,
  social_proof: Users,
  feature: TrendingUp
}

export default function UrgencyToast({ indicator, onDismiss, duration = 5000 }: UrgencyToastProps) {
  const Icon = iconMap[indicator.type] || AlertCircle

  React.useEffect(() => {
    if (duration && duration > 0 && onDismiss) {
      const timer = setTimeout(onDismiss, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onDismiss])

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      className="pointer-events-auto"
    >
      <div className="glass-panel-dark rounded-xl p-4 shadow-2xl max-w-md">
        <div className="flex items-start gap-3">
          <div className={`
            p-2 rounded-lg
            ${indicator.severity === 'important' ? 'bg-purple-500/20 text-purple-400' :
              indicator.severity === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
              indicator.severity === 'success' ? 'bg-green-500/20 text-green-400' :
              'bg-blue-500/20 text-blue-400'}
          `}>
            <Icon className="w-5 h-5" />
          </div>
          
          <div className="flex-1">
            <p className="text-sm text-white font-medium">{indicator.message}</p>
            {indicator.data?.value && (
              <p className="text-xs text-[#9CA3AF] mt-1">
                Impact: {indicator.data.value}% {indicator.data.trend === 'up' ? '↑' : '↓'}
              </p>
            )}
          </div>

          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-[#9CA3AF] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Progress bar */}
        {duration > 0 && (
          <div className="mt-3 h-0.5 bg-[#2D2D30] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#5E6AD2]"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}