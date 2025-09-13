'use client'

import React from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { useOptimizedInView } from '@/hooks/useOptimizedInView'

const integrations = [
  { name: 'OnlyFans', icon: '🔥', color: 'from-orange-500 to-red-600' },
  { name: 'Instagram', icon: '📸', color: 'from-purple-500 to-pink-600' },
  { name: 'TikTok', icon: '🎵', color: 'from-black to-gray-800' },
  { name: 'Twitter', icon: '🐦', color: 'from-blue-400 to-blue-600' },
  { name: 'Snapchat', icon: '👻', color: 'from-yellow-400 to-yellow-600' },
  { name: 'Reddit', icon: '🤖', color: 'from-orange-600 to-red-700' },
  { name: 'Discord', icon: '💬', color: 'from-indigo-500 to-indigo-700' },
  { name: 'Telegram', icon: '✈️', color: 'from-blue-500 to-cyan-600' }
]

export default function IntegrationsGrid() {
  const { ref: sectionRef, inView: sectionInView } = useOptimizedInView({ 
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <LazyMotion features={domAnimation} strict>
      <section 
        ref={sectionRef}
        className="py-20 px-4 bg-black"
        style={{ contain: 'layout style' }}
      >
        <div className="container mx-auto">
          {/* Header */}
          <m.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Works everywhere you are
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Seamlessly integrate with all your favorite platforms
            </p>
          </m.div>

          {/* Integration logos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {integrations.map((integration, index) => (
              <m.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  delay: index * 0.05, 
                  duration: 0.3,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                whileHover={{ scale: 1.05 }}
                style={{ 
                  transform: 'translateZ(0)',
                  willChange: 'transform'
                }}
              >
                <div className={`
                  aspect-square rounded-2xl bg-gradient-to-br ${integration.color} 
                  p-8 flex flex-col items-center justify-center gap-2
                  shadow-lg group-hover:shadow-xl transition-shadow duration-300
                `}>
                  <span className="text-4xl">{integration.icon}</span>
                  <span className="text-white font-semibold">{integration.name}</span>
                </div>
                
                {/* Hover glow effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)`,
                    transform: 'translateZ(0)'
                  }}
                />
              </m.div>
            ))}
          </div>

          {/* CTA */}
          <m.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={sectionInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-gray-400 mb-4">
              Don't see your platform? 
            </p>
            <button className="text-violet-400 hover:text-violet-300 font-semibold underline">
              Request an integration →
            </button>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}