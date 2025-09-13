'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertCircle, TrendingUp, Clock, Users, Zap, ChevronRight } from 'lucide-react'
import { UrgencyIndicator } from '@/lib/websocket/urgency-manager'
import Link from 'next/link'

interface FloatingUrgencyIndicatorProps {
  indicator: UrgencyIndicator
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
  onDismiss?: () => void
  onAction?: () => void
  actionLabel?: string
  actionHref?: string
}

const iconMap = {
  limited_spots: Users,
  price_increase: TrendingUp,
  flash_sale: Zap,
  user_activity: Users,
  trending: TrendingUp
}

const severityConfig = {
  low: {
    bg: 'bg-blue-500',
    text: 'text-blue-50',
    border: 'border-blue-400',
    glow: 'shadow-blue-500/50'
  },
  medium: {
    bg: 'bg-yellow-500',
    text: 'text-yellow-50',
    border: 'border-yellow-400',
    glow: 'shadow-yellow-500/50'
  },
  high: {
    bg: 'bg-orange-500',
    text: 'text-orange-50',
    border: 'border-orange-400',
    glow: 'shadow-orange-500/50'
  },
  critical: {
    bg: 'bg-red-500',
    text: 'text-red-50',
    border: 'border-red-400',
    glow: 'shadow-red-500/50'
  }
}

const positionClasses = {
  'bottom-left': 'bottom-6 left-6',
  'bottom-right': 'bottom-6 right-6',
  'top-left': 'top-24 left-6',
  'top-right': 'top-24 right-6'
}

export default function FloatingUrgencyIndicator({
  indicator,
  position = 'bottom-right',
  onDismiss,
  onAction,
  actionLabel = 'View Details',
  actionHref
}: FloatingUrgencyIndicatorProps) {
  const Icon = iconMap[indicator.type] || AlertCircle
  const config = severityConfig[indicator.severity]

  const handleAction = () => {
    if (onAction) onAction()
  }

  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className={`
        fixed z-50 ${positionClasses[position]}
        max-w-sm w-full md:w-auto
      `}
    >
      <div className={`
        relative overflow-hidden rounded-2xl ${config.bg} ${config.text}
        shadow-2xl ${config.glow} backdrop-blur-sm
        border ${config.border}
      `}>
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div className="relative p-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: indicator.severity === 'critical' ? [0, -10, 10, -10, 0] : 0
                }}
                transition={{ 
                  duration: indicator.severity === 'critical' ? 0.5 : 2,
                  repeat: Infinity,
                  repeatDelay: indicator.severity === 'critical' ? 0 : 3
                }}
                className="flex-shrink-0"
              >
                <Icon className="w-5 h-5" />
              </motion.div>
              <span className="text-sm font-semibold capitalize">
                {indicator.type.replace('_', ' ')}
              </span>
            </div>
            
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="p-1 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Message */}
          <p className="text-sm mb-3 pr-8">{indicator.message}</p>

          {/* Optional data display */}
          {indicator.data && (
            <div className="flex items-center gap-4 mb-3 text-xs opacity-90">
              {indicator.data.value && (
                <span>Value: {indicator.data.value}</span>
              )}
              {indicator.data.trend && (
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {indicator.data.trend}
                </span>
              )}
            </div>
          )}

          {/* Action button */}
          {(onAction || actionHref) && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {actionHref ? (
                <Link
                  href={actionHref}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
                >
                  {actionLabel}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  onClick={handleAction}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
                >
                  {actionLabel}
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          )}

          {/* Time indicator for critical */}
          {indicator.severity === 'critical' && (
            <motion.div
              className="absolute top-2 right-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Clock className="w-4 h-4" />
            </motion.div>
          )}
        </div>

        {/* Progress bar for expiring indicators */}
        {indicator.expiresAt && (
          <ExpirationProgress 
            expiresAt={indicator.expiresAt} 
            createdAt={indicator.timestamp}
          />
        )}
      </div>
    </motion.div>
  )

  return <AnimatePresence>{content}</AnimatePresence>
}

function ExpirationProgress({ expiresAt, createdAt }: { expiresAt: number; createdAt: number }) {
  const [progress, setProgress] = React.useState(100)

  React.useEffect(() => {
    const updateProgress = () => {
      const now = Date.now()
      const total = expiresAt - createdAt
      const elapsed = now - createdAt
      const remaining = Math.max(0, 100 - (elapsed / total) * 100)
      setProgress(remaining)
    }

    updateProgress()
    const interval = setInterval(updateProgress, 100)

    return () => clearInterval(interval)
  }, [expiresAt, createdAt])

  return (
    <div className="h-1 bg-white/20 relative overflow-hidden">
      <motion.div
        className="absolute inset-y-0 left-0 bg-white/60"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1, ease: 'linear' }}
      />
    </div>
  )
}