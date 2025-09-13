'use client'

import React from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { useOptimizedInView } from '@/hooks/useOptimizedInView'

// Mini animation components with GPU optimization
const MiniChatAnimation = () => {
  const messages = [
    { text: "Hey! 👋", delay: 0.5 },
    { text: "Check this out!", delay: 1.5 },
    { text: "Amazing! 🔥", delay: 2.5 }
  ]
  
  return (
    <div className="space-y-2 p-3">
      {messages.map((msg, i) => (
        <m.div
          key={i}
          className="bg-violet-600/20 px-3 py-1 rounded-lg text-xs"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: msg.delay, duration: 0.3 }}
          style={{ transform: 'translateZ(0)' }}
        >
          {msg.text}
        </m.div>
      ))}
    </div>
  )
}

const MiniChartAnimation = () => {
  const data = [30, 60, 45, 80, 65, 90, 75]
  
  return (
    <div className="flex items-end gap-1 h-12 p-3">
      {data.map((height, i) => (
        <m.div
          key={i}
          className="bg-gradient-to-t from-violet-600 to-purple-600 w-3 rounded-t"
          initial={{ height: 0 }}
          animate={{ height: `${height}%` }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          style={{ 
            transform: 'translateZ(0)',
            willChange: 'height'
          }}
        />
      ))}
    </div>
  )
}

const MiniCounterAnimation = () => {
  const [count, setCount] = React.useState(0)
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        const next = prev + Math.floor(Math.random() * 50) + 10
        return next > 9999 ? 0 : next
      })
    }, 100)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="text-center p-3">
      <div className="text-2xl font-bold text-violet-400 tabular-nums">
        ${count.toLocaleString()}
      </div>
      <div className="text-xs text-gray-500 mt-1">Revenue</div>
    </div>
  )
}

const MiniPulseAnimation = () => {
  return (
    <div className="flex items-center justify-center h-full p-3">
      <div className="relative">
        <div className="w-16 h-16 bg-violet-600 rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-violet-600 rounded-full animate-ping opacity-75" />
      </div>
    </div>
  )
}

const MiniWaveAnimation = () => {
  return (
    <div className="flex items-center gap-1 h-full p-3">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex-1 bg-gradient-to-t from-purple-600 to-violet-600 rounded-full animate-pulse"
          style={{
            height: '40%',
            animationDelay: `${i * 0.15}s`,
            transform: 'translateZ(0)'
          }}
        />
      ))}
    </div>
  )
}

const MiniSparkleAnimation = () => {
  return (
    <div className="relative h-full p-3">
      {[...Array(6)].map((_, i) => (
        <m.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
            repeatDelay: 1
          }}
          style={{
            left: `${20 + (i % 3) * 30}%`,
            top: `${20 + Math.floor(i / 3) * 40}%`,
            transform: 'translateZ(0)'
          }}
        >
          ✨
        </m.div>
      ))}
    </div>
  )
}

const features = [
  {
    title: "AI Chat Assistant",
    description: "Engages fans 24/7 with personalized conversations",
    icon: "💬",
    animation: MiniChatAnimation
  },
  {
    title: "Revenue Analytics", 
    description: "Track earnings and optimize pricing in real-time",
    icon: "📊",
    animation: MiniChartAnimation
  },
  {
    title: "Smart Pricing",
    description: "AI-powered dynamic pricing that maximizes revenue",
    icon: "💰",
    animation: MiniCounterAnimation
  },
  {
    title: "Automated Responses",
    description: "Never miss a message with instant AI replies",
    icon: "⚡",
    animation: MiniPulseAnimation
  },
  {
    title: "Content Scheduler",
    description: "Plan and automate your content calendar",
    icon: "📅",
    animation: MiniWaveAnimation
  },
  {
    title: "Fan Insights",
    description: "Understand your audience with deep analytics",
    icon: "🎯",
    animation: MiniSparkleAnimation
  }
]

// Optimized feature card component
const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  const { ref, inView } = useOptimizedInView({ 
    triggerOnce: true,
    threshold: 0.1
  })
  
  return (
    <m.div
      ref={ref}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-violet-700/50 transition-colors group"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{ 
        contain: 'layout style paint',
        transform: 'translateZ(0)'
      }}
    >
      <div className="h-32 bg-gray-800/50 rounded-lg mb-4 overflow-hidden relative">
        {inView && <feature.animation />}
      </div>
      
      <div className="text-3xl mb-3">{feature.icon}</div>
      
      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-violet-400 transition-colors">
        {feature.title}
      </h3>
      
      <p className="text-gray-400 text-sm">
        {feature.description}
      </p>
    </m.div>
  )
}

export default function FeaturesGridOptimized() {
  const { ref: sectionRef, inView: sectionInView } = useOptimizedInView({ 
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <LazyMotion features={domAnimation} strict>
      <section 
        ref={sectionRef}
        className="py-20 px-4 bg-black relative overflow-hidden"
        style={{ contain: 'layout style' }}
      >
        {/* Optimized background gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-violet-900/10 to-black"
          style={{ transform: 'translateZ(0)' }}
        />
        
        <div className="container mx-auto relative z-10">
          <m.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything you need to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                scale your business
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powerful AI tools that work 24/7 to grow your revenue and engage your audience
            </p>
          </m.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  )
}