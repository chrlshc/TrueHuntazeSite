'use client'

import React from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useOptimizedInView } from '@/hooks/useOptimizedInView'

// Lazy load CountUp for better performance
const CountUp = dynamic(() => import('react-countup'), { 
  ssr: false,
  loading: () => <span>0</span>
})

// Optimized stat card component
const StatCard = ({ stat, index }: { 
  stat: { value: string; label: string; prefix?: string; isNumber?: boolean };
  index: number 
}) => {
  const { ref, inView } = useOptimizedInView({ 
    triggerOnce: true,
    threshold: 0.5 
  })
  
  return (
    <m.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      style={{ 
        transform: 'translateZ(0)',
        willChange: 'transform, opacity'
      }}
    >
      <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400 mb-2">
        {stat.isNumber && inView ? (
          <>
            {stat.prefix}
            <CountUp
              start={0}
              end={parseInt(stat.value.replace(/\D/g, ''))}
              duration={2.5}
              separator=","
              enableScrollSpy={false}
              scrollSpyOnce={true}
            />
            {stat.value.includes('M') && 'M'}
            {stat.value.includes('+') && '+'}
          </>
        ) : (
          stat.value
        )}
      </div>
      <div className="text-gray-400">{stat.label}</div>
    </m.div>
  )
}

// Optimized creator avatar component
const CreatorAvatar = ({ index }: { index: number }) => {
  const colors = [
    'from-violet-500 to-purple-600',
    'from-pink-500 to-rose-600',
    'from-blue-500 to-cyan-600',
    'from-green-500 to-emerald-600',
    'from-orange-500 to-red-600'
  ]
  
  return (
    <m.div
      className={`w-12 h-12 rounded-full bg-gradient-to-br ${colors[index % colors.length]} -ml-3 first:ml-0 border-2 border-black relative`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        delay: index * 0.05, 
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      style={{ 
        transform: 'translateZ(0)',
        zIndex: 10 - index
      }}
    />
  )
}

export default function SocialProofOptimized() {
  const { ref: sectionRef, inView: sectionInView } = useOptimizedInView({ 
    threshold: 0.1,
    triggerOnce: true
  })

  const stats = [
    { value: "50M+", label: "Revenue Generated", prefix: "$", isNumber: true },
    { value: "15K+", label: "Active Creators", isNumber: true },
    { value: "2.5M+", label: "Messages Sent", isNumber: true },
    { value: "4.9/5", label: "Creator Rating", isNumber: false }
  ]

  return (
    <LazyMotion features={domAnimation} strict>
      <section 
        ref={sectionRef}
        className="py-20 px-4 bg-gradient-to-b from-black to-gray-900"
        style={{ contain: 'layout style' }}
      >
        <div className="container mx-auto">
          {/* Header */}
          <m.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trusted by top creators worldwide
            </h2>
            <p className="text-xl text-gray-400">
              Join thousands of creators who are scaling their business with Huntaze
            </p>
          </m.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>

          {/* Creator Avatars */}
          <m.div 
            className="flex items-center justify-center mb-8"
            initial={{ opacity: 0 }}
            animate={sectionInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <CreatorAvatar key={i} index={i} />
              ))}
              <m.div 
                className="ml-4 text-sm text-gray-400"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                +15,000 creators
              </m.div>
            </div>
          </m.div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              {
                quote: "Huntaze transformed my business. I went from $3k to $25k/month in just 3 months!",
                author: "Sarah M.",
                role: "Top 0.1% Creator"
              },
              {
                quote: "The AI assistant handles all my DMs while I focus on creating content. Game changer!",
                author: "Jessica L.",
                role: "Fashion Influencer"
              },
              {
                quote: "Best investment I've made. The analytics alone helped me double my prices.",
                author: "Amanda K.",
                role: "Lifestyle Creator"
              }
            ].map((testimonial, index) => (
              <m.div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={sectionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                style={{ 
                  contain: 'layout style paint',
                  transform: 'translateZ(0)'
                }}
              >
                <div className="text-yellow-400 mb-3">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  )
}