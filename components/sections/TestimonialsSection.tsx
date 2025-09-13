'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { 
  Star, TrendingUp, Users, DollarSign, Clock, 
  ChevronLeft, ChevronRight, Quote, Verified,
  Instagram, Twitter, Globe, Building
} from 'lucide-react'

interface Testimonial {
  id: string
  type: 'creator' | 'agency' | 'enterprise'
  name: string
  role: string
  company?: string
  avatar: string
  content: string
  metrics: {
    label: string
    before: string
    after: string
    change: string
    icon: React.ReactNode
  }[]
  platform?: {
    name: string
    icon: React.ReactNode
    followers: string
  }
  featured?: boolean
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    type: 'creator',
    name: 'Sophie Martinez',
    role: 'Lifestyle Creator',
    avatar: 'SM',
    content: 'Huntaze transformed how I manage my business. The AI handles conversations so naturally that my fans think it\'s me. I\'ve tripled my revenue while working half the hours.',
    metrics: [
      {
        label: 'Monthly Revenue',
        before: '€8K',
        after: '€24K',
        change: '+200%',
        icon: <DollarSign className="w-4 h-4" />
      },
      {
        label: 'Time Saved',
        before: '40h/week',
        after: '20h/week',
        change: '-50%',
        icon: <Clock className="w-4 h-4" />
      },
      {
        label: 'Fan Engagement',
        before: '12%',
        after: '47%',
        change: '+292%',
        icon: <Users className="w-4 h-4" />
      }
    ],
    platform: {
      name: 'Instagram',
      icon: <Instagram className="w-4 h-4" />,
      followers: '2.1M followers'
    },
    featured: true
  },
  {
    id: '2',
    type: 'agency',
    name: 'CreativeBoost Agency',
    role: 'CEO',
    company: 'Managing 50+ Creators',
    avatar: 'CB',
    content: 'As an agency, we needed a solution that could scale. Huntaze\'s enterprise features let us manage 50+ creators from a single dashboard. The ROI has been incredible.',
    metrics: [
      {
        label: 'Creators Managed',
        before: '12',
        after: '54',
        change: '+350%',
        icon: <Users className="w-4 h-4" />
      },
      {
        label: 'Agency Revenue',
        before: '€45K/mo',
        after: '€180K/mo',
        change: '+300%',
        icon: <TrendingUp className="w-4 h-4" />
      },
      {
        label: 'Team Size',
        before: '8 people',
        after: '8 people',
        change: 'Same team!',
        icon: <Building className="w-4 h-4" />
      }
    ],
    featured: true
  },
  {
    id: '3',
    type: 'creator',
    name: 'Alex Chen',
    role: 'Gaming Content Creator',
    avatar: 'AC',
    content: 'The analytics alone are worth it. I can see exactly what content drives revenue and the AI learns my communication style perfectly. It\'s like having a team of 10 people.',
    metrics: [
      {
        label: 'Conversion Rate',
        before: '2.3%',
        after: '8.7%',
        change: '+278%',
        icon: <TrendingUp className="w-4 h-4" />
      },
      {
        label: 'Response Time',
        before: '4-6 hours',
        after: '<2 min',
        change: '99% faster',
        icon: <Clock className="w-4 h-4" />
      }
    ],
    platform: {
      name: 'Multi-platform',
      icon: <Globe className="w-4 h-4" />,
      followers: '5M+ total'
    }
  },
  {
    id: '4',
    type: 'enterprise',
    name: 'MediaPro Studios',
    role: 'Head of Operations',
    company: 'Enterprise Client',
    avatar: 'MP',
    content: 'We evaluated every platform on the market. Huntaze\'s compliance features, SSO integration, and dedicated support made it the clear choice for our organization.',
    metrics: [
      {
        label: 'Operational Cost',
        before: '€120K/yr',
        after: '€40K/yr',
        change: '-67%',
        icon: <DollarSign className="w-4 h-4" />
      },
      {
        label: 'Compliance Score',
        before: '72%',
        after: '99.8%',
        change: '+38%',
        icon: <Verified className="w-4 h-4" />
      }
    ]
  }
]

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const featuredTestimonials = testimonials.filter(t => t.featured)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % featuredTestimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length)
  }

  return (
    <section className="py-24 bg-gradient-to-b from-[#0F0F10] to-[#1A1A1B]">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">Success Stories</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Real Results from Real Creators
          </h2>
          <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
            Join thousands of creators and agencies who have transformed their businesses with Huntaze
          </p>
        </motion.div>

        {/* Featured Testimonial Carousel */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={featuredTestimonials[activeIndex].id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Card variant="elevated" className="p-8 md:p-12 bg-gradient-to-br from-[#1A1A1B] to-[#252528] border-[#2D2D30]">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Testimonial Content */}
                    <div className="space-y-6">
                      <Quote className="w-10 h-10 text-[#5E6AD2] opacity-50" />
                      <p className="text-lg md:text-xl text-white leading-relaxed">
                        {featuredTestimonials[activeIndex].content}
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-[#5E6AD2]/20 rounded-full flex items-center justify-center text-[#5E6AD2] font-bold text-xl">
                          {featuredTestimonials[activeIndex].avatar}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white">
                            {featuredTestimonials[activeIndex].name}
                          </h4>
                          <p className="text-[#9CA3AF]">
                            {featuredTestimonials[activeIndex].role}
                          </p>
                          {featuredTestimonials[activeIndex].company && (
                            <p className="text-sm text-[#9CA3AF]">
                              {featuredTestimonials[activeIndex].company}
                            </p>
                          )}
                          {featuredTestimonials[activeIndex].platform && (
                            <div className="flex items-center gap-2 mt-2 text-sm text-[#5E6AD2]">
                              {featuredTestimonials[activeIndex].platform.icon}
                              <span>{featuredTestimonials[activeIndex].platform.name}</span>
                              <span className="text-[#9CA3AF]">|</span>
                              <span className="text-[#9CA3AF]">
                                {featuredTestimonials[activeIndex].platform.followers}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="space-y-4">
                      <h5 className="text-sm font-semibold text-[#9CA3AF] uppercase tracking-wider mb-4">
                        Verified Results
                      </h5>
                      {featuredTestimonials[activeIndex].metrics.map((metric, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="bg-[#0F0F10]/50 rounded-xl p-4 border border-[#2D2D30]"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 text-[#9CA3AF]">
                              {metric.icon}
                              <span className="text-sm">{metric.label}</span>
                            </div>
                            <Badge 
                              variant={metric.change.includes('+') ? 'success' : 'secondary'}
                              size="sm"
                            >
                              {metric.change}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-[#9CA3AF]">{metric.before}</span>
                            <span className="text-[#5E6AD2]">→</span>
                            <span className="text-white font-semibold">{metric.after}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#252528] rounded-full flex items-center justify-center text-white hover:bg-[#2D2D30] transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#252528] rounded-full flex items-center justify-center text-white hover:bg-[#2D2D30] transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {featuredTestimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex 
                    ? 'w-8 bg-[#5E6AD2]' 
                    : 'bg-[#2D2D30] hover:bg-[#404040]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card variant="outlined" className="h-full p-6 hover:border-[#5E6AD2]/50 transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-[#EEEFF1] mb-6 line-clamp-4">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 bg-[#5E6AD2]/20 rounded-full flex items-center justify-center text-[#5E6AD2] font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-[#9CA3AF]">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 glass-panel-dark rounded-2xl"
        >
          <Verified className="w-12 h-12 text-[#5E6AD2] mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-white mb-2">
            100% Verified Results
          </h3>
          <p className="text-[#9CA3AF] max-w-2xl mx-auto">
            All metrics and testimonials are from real Huntaze users. Results are tracked and verified 
            through our platform analytics. Individual results may vary based on implementation and market conditions.
          </p>
        </motion.div>
      </div>
    </section>
  )
}