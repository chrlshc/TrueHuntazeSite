'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Star } from 'lucide-react'
import Image from 'next/image'

export default function ShopifyHero() {
  return (
    <section className="hero pt-32 pb-20 relative overflow-hidden">
      <div className="container">
        <div className="hero-content">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="hero-badge">
              <Star className="w-4 h-4" />
              <span>Trusted by 150,000+ Creators</span>
            </div>

            {/* Main Title */}
            <h1 className="heading-display hero-title">
              Scale your creator business{' '}
              <span className="text-gradient">with AI automation</span>
            </h1>

            {/* Description */}
            <p className="text-lead hero-description">
              Automate fan management, maximize revenue, and keep full control 
              of your business. No agencies, no excessive commissions.
            </p>


            {/* CTA Buttons */}
            <div className="cta-group">
              <Link href="/onboarding/setup" className="cta-primary">
                Start free trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/demo" className="cta-secondary">
                Watch demo
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 text-sm text-[#6D7175] dark:text-[#A5A7AB]">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[#111213] dark:text-white">€50M+</span>
                <span>Revenue generated</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[#111213] dark:text-white">99.9%</span>
                <span>Uptime SLA</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[#111213] dark:text-white">24/7</span>
                <span>Support</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="hero-visual">
              <div className="hero-screenshot">
                <div className="w-full h-[400px] bg-gradient-to-br from-[#5E6AD2] to-[#2C6ECB] rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-4xl font-bold mb-2">Huntaze Dashboard</div>
                    <div className="text-lg opacity-80">AI-Powered Creator Management</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="hero-gradient" aria-hidden="true" />

      <style jsx>{`
        .text-gradient {
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .benefit-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          font-size: var(--text-base);
          color: var(--color-text-secondary);
        }

        .benefit-icon {
          width: 20px;
          height: 20px;
          color: var(--color-success);
          flex-shrink: 0;
        }

        .trust-indicators {
          display: flex;
          gap: var(--space-8);
          margin-top: var(--space-12);
          padding-top: var(--space-6);
          border-top: 1px solid var(--color-border);
        }

        .trust-stat {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }

        .trust-number {
          font-size: var(--text-2xl);
          font-weight: var(--font-bold);
          color: var(--color-text-primary);
        }

        .trust-label {
          font-size: var(--text-sm);
          color: var(--color-text-tertiary);
        }

        .hero-visual-wrapper {
          position: relative;
        }

        .floating-card {
          position: absolute;
          background: var(--color-surface-raised);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: var(--space-4);
          box-shadow: var(--shadow-lg);
          z-index: 2;
        }

        .floating-card-1 {
          top: 20%;
          left: -40px;
          animation: float 6s ease-in-out infinite;
        }

        .floating-card-2 {
          bottom: 20%;
          right: -40px;
          animation: float 6s ease-in-out infinite reverse;
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }

        .stat-value {
          font-size: var(--text-xl);
          font-weight: var(--font-bold);
          color: var(--color-primary);
        }

        .stat-label {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
          white-space: nowrap;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .hero-gradient {
          position: absolute;
          top: 0;
          right: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, var(--color-primary) 0%, transparent 70%);
          opacity: 0.05;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .trust-indicators {
            justify-content: space-around;
            gap: var(--space-4);
          }
          
          .trust-number {
            font-size: var(--text-xl);
          }

          .floating-card {
            display: none;
          }

          .hero-visual {
            margin-top: var(--space-8);
          }
        }
      `}</style>
    </section>
  )
}