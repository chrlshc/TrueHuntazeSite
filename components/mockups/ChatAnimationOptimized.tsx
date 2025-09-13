'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion'

interface Message {
  id: number
  from: 'fan' | 'ai'
  text: string
  time?: string
}

const messages: Message[] = [
  { id: 1, from: 'fan', text: 'Hey are you online?', time: '2:41 PM' },
  { id: 2, from: 'ai', text: 'Yes! How can I help you? 😊', time: '2:41 PM' },
  { id: 3, from: 'fan', text: 'Looking for custom content', time: '2:42 PM' },
  { id: 4, from: 'ai', text: 'I have something perfect for you...', time: '2:42 PM' },
  { id: 5, from: 'ai', text: '🔥 Check out my exclusive bundle - 50% off today only!', time: '2:42 PM' },
  { id: 6, from: 'fan', text: 'That sounds amazing! 😍', time: '2:43 PM' }
]

// Optimized typing indicator using CSS animations
const TypingIndicator: React.FC<{ show: boolean }> = ({ show }) => {
  if (!show) return null
  
  return (
    <div className="flex justify-start px-4 mb-3">
      <div className="flex gap-1 p-3 bg-gray-800 rounded-2xl">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ 
              animationDelay: `${i * 0.15}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function ChatAnimationOptimized() {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [showTyping, setShowTyping] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const animationFrameId = useRef<number>()
  const timeoutId = useRef<NodeJS.Timeout>()

  const showNextMessage = useCallback(() => {
    if (currentIndex >= messages.length) {
      // Reset with requestAnimationFrame for smooth loop
      animationFrameId.current = requestAnimationFrame(() => {
        timeoutId.current = setTimeout(() => {
          setVisibleMessages([])
          setCurrentIndex(0)
        }, 5000)
      })
      return
    }

    const nextMessage = messages[currentIndex]
    const isAiMessage = nextMessage.from === 'ai'
    
    if (isAiMessage) {
      setShowTyping(true)
      timeoutId.current = setTimeout(() => {
        animationFrameId.current = requestAnimationFrame(() => {
          setShowTyping(false)
          setVisibleMessages(prev => [...prev, nextMessage])
          setCurrentIndex(currentIndex + 1)
        })
      }, 1500)
    } else {
      animationFrameId.current = requestAnimationFrame(() => {
        setVisibleMessages(prev => [...prev, nextMessage])
        setCurrentIndex(currentIndex + 1)
      })
    }
  }, [currentIndex])

  useEffect(() => {
    const delay = currentIndex === 0 ? 1000 : 
                  messages[currentIndex - 1]?.from === 'fan' ? 800 : 2000
    
    timeoutId.current = setTimeout(showNextMessage, delay)

    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current)
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current)
    }
  }, [currentIndex, showNextMessage])

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="flex flex-col h-full bg-gradient-to-b from-gray-950 to-black">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-800">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full" />
          <div className="flex-1">
            <div className="font-semibold text-white">Jessica</div>
            <div className="text-xs text-green-400 flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Active now
            </div>
          </div>
          <div className="text-2xl">💎</div>
        </div>

        {/* Messages with containment */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-3"
          style={{ contain: 'layout style' }}
        >
          <AnimatePresence mode="popLayout">
            {visibleMessages.map((msg) => (
              <m.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ 
                  type: "spring",
                  damping: 30,
                  stiffness: 300,
                  mass: 0.8
                }}
                className={`flex ${msg.from === 'ai' ? 'justify-start' : 'justify-end'}`}
                style={{ 
                  transform: 'translateZ(0)',
                  willChange: 'transform, opacity'
                }}
              >
                <div className={`max-w-[80%] ${msg.from === 'ai' ? 'order-2' : 'order-1'}`}>
                  <div className={`px-4 py-2 rounded-2xl ${
                    msg.from === 'ai' 
                      ? 'bg-gray-800 text-white rounded-tl-sm' 
                      : 'bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-tr-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`text-xs text-gray-500 mt-1 ${
                    msg.from === 'ai' ? 'text-left' : 'text-right'
                  }`}>
                    {msg.time}
                  </div>
                </div>
              </m.div>
            ))}
          </AnimatePresence>
          <TypingIndicator show={showTyping} />
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-2 bg-gray-900 rounded-full px-4 py-2">
            <input 
              type="text" 
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
              disabled
            />
            <button className="w-8 h-8 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center transform transition-transform hover:scale-110 active:scale-95">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </LazyMotion>
  )
}