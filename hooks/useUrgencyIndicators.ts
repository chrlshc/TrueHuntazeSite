'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { UrgencyWebSocketManager, UrgencyIndicator, createMockUrgencyIndicator } from '@/lib/websocket/urgency-manager'

interface UseUrgencyIndicatorsOptions {
  mockMode?: boolean
  mockInterval?: number
  maxIndicators?: number
}

export function useUrgencyIndicators(options: UseUrgencyIndicatorsOptions = {}) {
  const { 
    mockMode = process.env.NODE_ENV === 'development',
    mockInterval = 120000, // 2 minutes
    maxIndicators = 3
  } = options

  const [indicators, setIndicators] = useState<UrgencyIndicator[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  
  const wsManager = useRef<UrgencyWebSocketManager | null>(null)
  const mockIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize WebSocket connection
  useEffect(() => {
    if (mockMode) {
      // Start with one subtle initial mock indicator
      setIndicators([
        createMockUrgencyIndicator()
      ])
      
      // Set up mock data generation
      mockIntervalRef.current = setInterval(() => {
        setIndicators(prev => {
          const newIndicator = createMockUrgencyIndicator()
          const updated = [newIndicator, ...prev].slice(0, maxIndicators)
          return updated
        })
      }, mockInterval)
      
      setIsConnected(true)
      return
    }

    // Real WebSocket connection
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'wss://api.huntaze.com/urgency'
    wsManager.current = new UrgencyWebSocketManager({ url: wsUrl })

    // Set up event handlers
    wsManager.current.on('connected', () => {
      setIsConnected(true)
      setConnectionError(null)
    })

    wsManager.current.on('disconnected', () => {
      setIsConnected(false)
    })

    wsManager.current.on('error', (error) => {
      setConnectionError(error.message || 'Connection error')
    })

    wsManager.current.on('urgency:update', (indicator: UrgencyIndicator) => {
      setIndicators(prev => {
        const filtered = prev.filter(i => i.id !== indicator.id)
        return [indicator, ...filtered].slice(0, maxIndicators)
      })
    })

    wsManager.current.on('urgency:remove', (indicator: UrgencyIndicator) => {
      setIndicators(prev => prev.filter(i => i.id !== indicator.id))
    })

    wsManager.current.on('max_reconnect_reached', () => {
      setConnectionError('Unable to establish connection. Please refresh the page.')
    })

    // Connect
    wsManager.current.connect()

    // Cleanup
    return () => {
      if (mockIntervalRef.current) {
        clearInterval(mockIntervalRef.current)
      }
      if (wsManager.current) {
        wsManager.current.disconnect()
      }
    }
  }, [mockMode, mockInterval, maxIndicators])

  // Remove expired indicators
  useEffect(() => {
    const checkExpired = setInterval(() => {
      setIndicators(prev => 
        prev.filter(indicator => 
          !indicator.expiresAt || indicator.expiresAt > Date.now()
        )
      )
    }, 1000)

    return () => clearInterval(checkExpired)
  }, [])

  const dismissIndicator = useCallback((id: string) => {
    setIndicators(prev => prev.filter(i => i.id !== id))
  }, [])

  const getIndicatorsByType = useCallback((type: UrgencyIndicator['type']) => {
    return indicators.filter(i => i.type === type)
  }, [indicators])

  const getHighPriorityIndicators = useCallback(() => {
    return indicators.filter(i => i.severity === 'high' || i.severity === 'critical')
  }, [indicators])

  return {
    indicators,
    isConnected,
    connectionError,
    dismissIndicator,
    getIndicatorsByType,
    getHighPriorityIndicators,
    indicatorCount: indicators.length
  }
}