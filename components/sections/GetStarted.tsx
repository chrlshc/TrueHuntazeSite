'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function GetStarted() {
  const steps = [
    {
      number: '01',
      title: 'Sign up in seconds',
      description: 'Create your account with one click. No credit card required.'
    },
    {
      number: '02',
      title: 'Connect your platforms',
      description: 'Link your OnlyFans, Instagram, TikTok, and Reddit accounts.'
    },
    {
      number: '03',
      title: 'Watch AI work magic',
      description: 'Your AI starts responding instantly. Sit back and earn.'
    }
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-950 to-black">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get started in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
              60 seconds
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Join thousands earning more with less work
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-[2px] bg-gradient-to-r from-violet-600 to-purple-600 -translate-x-1/2" />
              )}
              
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold mb-4 mx-auto">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/get-started"
            className="inline-block px-12 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-lg rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            Start Your Free Trial
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  )
}