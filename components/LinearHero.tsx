'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function LinearHero() {
  return (
    <section className="hero-section relative min-h-[90vh] flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)] pointer-events-none" />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 badge mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>Nouvelle génération de gestion créateur</span>
          </motion.div>

          {/* Main title with Shopify typography */}
          <h1 className="h1 mb-6">
            L'outil de gestion qui{' '}
            <span className="text-gradient">remplace 10 personnes</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lead max-w-2xl mx-auto mb-8">
            Gérez vos fans, automatisez vos revenus et gardez le contrôle total. 
            Une interface professionnelle conçue pour les créateurs sérieux.
          </p>

          {/* CTA buttons with Linear animations */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Link href="/demo" className="btn btn-primary btn-large hover-lift button-scale">
              Voir la démo
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/features" className="btn btn-large hover-lift">
              Explorer les fonctionnalités
            </Link>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-8 justify-center text-sm text-secondary"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--color-success)]" />
              <span>50K+ créateurs actifs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--color-info)]" />
              <span>$10M+ générés</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              <span>99.9% uptime</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Dashboard preview with skeleton loading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className="mt-16 screenshot-container mx-auto max-w-6xl"
        >
          <div className="skeleton aspect-[16/10] rounded-lg">
            <Image
              src="/images/dashboard-linear.png"
              alt="Huntaze Dashboard"
              fill
              className="object-cover rounded-lg"
              priority
              sizes="(max-width: 1536px) 100vw, 1536px"
            />
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          overflow: hidden;
        }

        .container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .text-gradient {
          background: linear-gradient(
            135deg,
            var(--accent) 0%,
            lch(from var(--accent) l c calc(h + 30)) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .text-lead {
          color: var(--text-secondary);
          font-size: var(--text-lg);
          line-height: var(--leading-relaxed);
        }

        .btn-large {
          padding: 12px 24px;
          font-size: var(--text-base);
        }

        @media (max-width: 768px) {
          .hero-section {
            min-height: auto;
            padding: 80px 0 40px;
          }

          .h1 {
            font-size: clamp(var(--text-2xl), 8vw, var(--text-3xl));
          }

          .text-lead {
            font-size: var(--text-base);
          }

          .container {
            padding: 0 16px;
          }
        }
      `}</style>
    </section>
  )
}