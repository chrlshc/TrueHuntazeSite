'use client'

import React, { useEffect, useRef, useState } from 'react'

export default function FPSMonitor() {
  const [fps, setFps] = useState(60)
  const [showWarning, setShowWarning] = useState(false)
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())
  const animationId = useRef<number>()

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return

    const measureFPS = () => {
      frameCount.current++
      const currentTime = performance.now()
      
      if (currentTime >= lastTime.current + 1000) {
        const currentFps = Math.round(
          (frameCount.current * 1000) / (currentTime - lastTime.current)
        )
        
        setFps(currentFps)
        
        // Show warning if FPS drops below 30
        if (currentFps < 30) {
          setShowWarning(true)
          console.warn(`⚠️ Low FPS detected: ${currentFps}fps`)
          
          // Add reduce-motion class to body
          document.body.classList.add('reduce-motion')
        } else if (currentFps > 50 && showWarning) {
          setShowWarning(false)
          document.body.classList.remove('reduce-motion')
        }
        
        frameCount.current = 0
        lastTime.current = currentTime
      }
      
      animationId.current = requestAnimationFrame(measureFPS)
    }
    
    animationId.current = requestAnimationFrame(measureFPS)
    
    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current)
      }
    }
  }, [showWarning])

  // Don't render in production
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div 
      className="fixed bottom-4 right-4 z-50 p-2 bg-black/80 backdrop-blur rounded-lg text-white text-xs font-mono"
      style={{ contain: 'layout style paint' }}
    >
      <div className={`${fps < 30 ? 'text-red-400' : fps < 50 ? 'text-yellow-400' : 'text-green-400'}`}>
        {fps} FPS
      </div>
      {showWarning && (
        <div className="text-red-400 mt-1">
          Performance Mode ON
        </div>
      )}
    </div>
  )
}