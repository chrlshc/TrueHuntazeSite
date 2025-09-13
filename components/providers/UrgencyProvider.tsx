'use client'

import React, { createContext, useContext } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useUrgencyIndicators } from '@/hooks/useUrgencyIndicators'
import UrgencyToast from '@/components/ui/UrgencyToast'
import FloatingUrgencyIndicator from '@/components/ui/FloatingUrgencyIndicator'
import { UrgencyIndicator } from '@/lib/websocket/urgency-manager'

interface UrgencyContextValue {
  indicators: UrgencyIndicator[]
  isConnected: boolean
  connectionError: string | null
  dismissIndicator: (id: string) => void
  getIndicatorsByType: (type: UrgencyIndicator['type']) => UrgencyIndicator[]
  getHighPriorityIndicators: () => UrgencyIndicator[]
}

const UrgencyContext = createContext<UrgencyContextValue | null>(null)

export function useUrgency() {
  const context = useContext(UrgencyContext)
  if (!context) {
    throw new Error('useUrgency must be used within UrgencyProvider')
  }
  return context
}

interface UrgencyProviderProps {
  children: React.ReactNode
  mockMode?: boolean
  displayMode?: 'toast' | 'floating' | 'both' | 'none'
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
}

export function UrgencyProvider({ 
  children, 
  mockMode = true,
  displayMode = 'floating',
  position = 'bottom-right' 
}: UrgencyProviderProps) {
  const urgency = useUrgencyIndicators({ mockMode })
  const [toastQueue, setToastQueue] = React.useState<UrgencyIndicator[]>([])
  const [seenIndicators, setSeenIndicators] = React.useState<Set<string>>(new Set())

  // Handle new indicators
  React.useEffect(() => {
    const newIndicators = urgency.indicators.filter(
      indicator => !seenIndicators.has(indicator.id)
    )

    if (newIndicators.length > 0) {
      newIndicators.forEach(indicator => {
        setSeenIndicators(prev => new Set(prev).add(indicator.id))
        
        if (displayMode === 'toast' || displayMode === 'both') {
          setToastQueue(prev => [...prev, indicator])
        }
      })
    }
  }, [urgency.indicators, seenIndicators, displayMode])

  const dismissToast = (id: string) => {
    setToastQueue(prev => prev.filter(i => i.id !== id))
  }

  // Get the highest priority indicator for floating display
  const floatingIndicator = React.useMemo(() => {
    if (displayMode !== 'floating' && displayMode !== 'both') return null
    
    const highPriority = urgency.getHighPriorityIndicators()
    if (highPriority.length > 0) return highPriority[0]
    
    return urgency.indicators[0] || null
  }, [urgency, displayMode])

  return (
    <UrgencyContext.Provider value={urgency}>
      {children}
      
      {/* Toast notifications */}
      {(displayMode === 'toast' || displayMode === 'both') && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {toastQueue.slice(0, 3).map(indicator => (
                <UrgencyToast
                  key={indicator.id}
                  indicator={indicator}
                  onDismiss={() => dismissToast(indicator.id)}
                  duration={5000}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Floating indicator */}
      {floatingIndicator && (displayMode === 'floating' || displayMode === 'both') && (
        <AnimatePresence>
          <FloatingUrgencyIndicator
            key={floatingIndicator.id}
            indicator={floatingIndicator}
            position={position}
            onDismiss={() => urgency.dismissIndicator(floatingIndicator.id)}
            actionHref="/pricing"
            actionLabel="View Offer"
          />
        </AnimatePresence>
      )}
    </UrgencyContext.Provider>
  )
}