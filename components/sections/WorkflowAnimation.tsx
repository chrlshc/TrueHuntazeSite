'use client'

import React from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { useOptimizedInView } from '@/hooks/useOptimizedInView'

const steps = [
  {
    id: 1,
    title: "Connect Your Platforms",
    description: "Link your OF, Instagram, and other platforms in seconds",
    icon: "🔗",
    color: "from-violet-600 to-purple-600"
  },
  {
    id: 2,
    title: "AI Learns Your Style",
    description: "Our AI analyzes your content and communication patterns",
    icon: "🤖",
    color: "from-purple-600 to-pink-600"
  },
  {
    id: 3,
    title: "Automate Engagement",
    description: "AI handles conversations while you create content",
    icon: "💬",
    color: "from-pink-600 to-rose-600"
  },
  {
    id: 4,
    title: "Watch Revenue Grow",
    description: "Track your earnings increase with real-time analytics",
    icon: "📈",
    color: "from-rose-600 to-orange-600"
  }
]

// Optimized workflow step component
const WorkflowStep = ({ step, index, isActive }: { 
  step: typeof steps[0];
  index: number;
  isActive: boolean;
}) => {
  const { ref, inView } = useOptimizedInView({ 
    triggerOnce: true,
    threshold: 0.5 
  })
  
  return (
    <m.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ 
        delay: index * 0.2, 
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      style={{ transform: 'translateZ(0)' }}
    >
      {/* Connection line */}
      {index < steps.length - 1 && (
        <div 
          className="hidden md:block absolute top-16 left-[60%] w-full h-0.5 bg-gray-800"
          style={{ transform: 'translateZ(0)' }}
        >
          <m.div
            className={`h-full bg-gradient-to-r ${step.color}`}
            initial={{ scaleX: 0 }}
            animate={isActive ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ transformOrigin: 'left' }}
          />
        </div>
      )}
      
      {/* Step content */}
      <div className={`relative p-6 rounded-2xl border transition-all duration-300 ${
        isActive 
          ? 'bg-gray-900/80 border-violet-600 shadow-lg shadow-violet-600/20' 
          : 'bg-gray-900/50 border-gray-800'
      }`}>
        {/* Step number */}
        <div className={`absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-gradient-to-r ${
          isActive ? step.color : 'from-gray-700 to-gray-800'
        } text-white`}>
          {step.id}
        </div>
        
        {/* Icon */}
        <div className="text-4xl mb-4">{step.icon}</div>
        
        {/* Content */}
        <h3 className="text-xl font-semibold text-white mb-2">
          {step.title}
        </h3>
        <p className="text-gray-400 text-sm">
          {step.description}
        </p>
        
        {/* Active indicator */}
        {isActive && (
          <m.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              background: `radial-gradient(circle at center, ${
                step.color.includes('violet') ? 'rgba(139, 92, 246, 0.2)' : 'rgba(236, 72, 153, 0.2)'
              } 0%, transparent 70%)`,
              transform: 'translateZ(0)'
            }}
          />
        )}
      </div>
    </m.div>
  )
}

export default function WorkflowAnimation() {
  const [activeStep, setActiveStep] = React.useState(0)
  const { ref: sectionRef, inView: sectionInView } = useOptimizedInView({ 
    threshold: 0.1,
    triggerOnce: true
  })

  // Auto-advance steps
  React.useEffect(() => {
    if (!sectionInView) return
    
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [sectionInView])

  return (
    <LazyMotion features={domAnimation} strict>
      <section 
        ref={sectionRef}
        className="py-20 px-4 bg-black relative overflow-hidden"
        style={{ contain: 'layout style' }}
      >
        {/* Background gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-violet-900/10 via-black to-purple-900/10"
          style={{ transform: 'translateZ(0)' }}
        />
        
        <div className="container mx-auto relative z-10">
          {/* Header */}
          <m.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get started in minutes, not hours. Our AI handles the complexity.
            </p>
          </m.div>

          {/* Workflow steps */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {steps.map((step, index) => (
              <WorkflowStep 
                key={step.id} 
                step={step} 
                index={index}
                isActive={activeStep === index}
              />
            ))}
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeStep === index 
                    ? 'w-8 bg-gradient-to-r from-violet-600 to-purple-600' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
                style={{ transform: 'translateZ(0)' }}
              />
            ))}
          </div>

          {/* Live demo CTA */}
          <m.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-semibold transform transition-transform hover:scale-105 active:scale-95">
              Watch Live Demo →
            </button>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}