'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, BarChart3, DollarSign, Calendar, Users, Shield } from 'lucide-react'

// Mini animations for each feature
const MiniChatAnimation = () => {
  return (
    <div className="space-y-2">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-800 rounded-lg px-3 py-2 text-xs"
      >
        Hey there!
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="bg-violet-600 rounded-lg px-3 py-2 text-xs ml-auto"
      >
        Hi! 😊
      </motion.div>
    </div>
  )
}

const MiniChartAnimation = () => {
  const data = [20, 45, 30, 70, 55, 85]
  
  return (
    <div className="flex items-end gap-1 h-12">
      {data.map((height, i) => (
        <motion.div
          key={i}
          className="bg-gradient-to-t from-violet-600 to-purple-600 w-3 rounded-t"
          initial={{ height: 0 }}
          animate={{ height: `${height}%` }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        />
      ))}
    </div>
  )
}

const MiniCounterAnimation = ({ start = 0, end = 547 }: { start?: number; end?: number }) => {
  const [value, setValue] = React.useState(start)
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setValue(prev => {
          if (prev >= end) {
            clearInterval(interval)
            return end
          }
          return prev + Math.floor((end - prev) / 10) + 1
        })
      }, 50)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [end])
  
  return (
    <div className="text-2xl font-bold text-violet-400">
      ${value}
    </div>
  )
}

const MiniCalendarAnimation = () => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {[...Array(9)].map((_, i) => (
        <motion.div
          key={i}
          className={`w-3 h-3 rounded ${i === 4 ? 'bg-violet-600' : 'bg-gray-700'}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.05 }}
        />
      ))}
    </div>
  )
}

const MiniRedditFeed = () => {
  return (
    <div className="space-y-1">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="h-2 bg-gray-700 rounded"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: i * 0.2 }}
        />
      ))}
    </div>
  )
}

const AccountSwitchAnimation = () => {
  const [active, setActive] = React.useState(0)
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % 3)
    }, 2000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="flex gap-2">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`w-8 h-8 rounded-full ${active === i ? 'bg-violet-600' : 'bg-gray-700'}`}
          animate={{ scale: active === i ? 1.2 : 1 }}
        />
      ))}
    </div>
  )
}

const features = [
  {
    title: 'Real-time AI Chat',
    description: 'Convert 3x more with AI that sounds exactly like you',
    icon: MessageCircle,
    animation: <MiniChatAnimation />
  },
  {
    title: 'Analytics Dashboard',
    description: 'Track revenue, fans, and growth in real-time',
    icon: BarChart3,
    animation: <MiniChartAnimation />
  },
  {
    title: 'PPV Notifications',
    description: 'Never miss a sale with smart notifications',
    icon: DollarSign,
    animation: <MiniCounterAnimation start={0} end={547} />
  },
  {
    title: 'Content Scheduler',
    description: 'Plan and post across all platforms',
    icon: Calendar,
    animation: <MiniCalendarAnimation />
  },
  {
    title: 'Reddit Management',
    description: 'Automate your Reddit presence and grow',
    icon: Users,
    animation: <MiniRedditFeed />
  },
  {
    title: 'Multi-Account Control',
    description: 'Manage all your accounts from one dashboard',
    icon: Shield,
    animation: <AccountSwitchAnimation />
  }
]

export default function FeaturesGrid() {
  return (
    <section className="py-20 px-4 bg-gray-950">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything you need to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
              dominate
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            One platform, all the tools to grow your empire
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-violet-700/50 transition-all duration-300"
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 bg-violet-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-violet-600/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-violet-400" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{feature.description}</p>

                {/* Animation container */}
                <div className="h-16 flex items-center justify-center overflow-hidden">
                  {feature.animation}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}