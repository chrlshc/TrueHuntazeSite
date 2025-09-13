'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function LinearHeroV2() {
  return (
    <section 
      className="hero"
      role="banner"
      aria-label="Hero section"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
          className="hero__content"
        >
          {/* Badge with improved contrast */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="badge mb-6 inline-flex"
          >
            <Sparkles className="w-4 h-4" />
            <span>Nouvelle génération de gestion créateur</span>
          </motion.div>

          {/* Main title with WCAG AA contrast */}
          <h1 className="h1 mb-6">
            L'outil de gestion qui{' '}
            <span className="text-gradient">remplace 10 personnes</span>
          </h1>

          {/* Subtitle with proper contrast ratio */}
          <p className="text-lead max-w-2xl mx-auto mb-8">
            Gérez vos fans, automatisez vos revenus et gardez le contrôle total. 
            Une interface professionnelle conçue pour les créateurs sérieux.
          </p>

          {/* CTA buttons with 44px touch targets */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Link 
              href="/demo" 
              className="btn btn-primary hover-lift will-animate"
              aria-label="Voir la démonstration de Huntaze"
            >
              Voir la démo
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link 
              href="/features" 
              className="btn hover-lift will-animate"
              aria-label="Explorer toutes les fonctionnalités"
            >
              Explorer les fonctionnalités
            </Link>
          </div>

          {/* Trust indicators with semantic HTML */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="trust-indicators"
            role="list"
            aria-label="Statistiques de confiance"
          >
            <div role="listitem" className="trust-stat">
              <div className="trust-dot bg-success" aria-hidden="true" />
              <span>50K+ créateurs actifs</span>
            </div>
            <div role="listitem" className="trust-stat">
              <div className="trust-dot bg-info" aria-hidden="true" />
              <span>$10M+ générés</span>
            </div>
            <div role="listitem" className="trust-stat">
              <div className="trust-dot bg-accent" aria-hidden="true" />
              <span>99.9% uptime</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Dashboard preview with skeleton loader */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.4, 
            ease: [0.19, 1, 0.22, 1] 
          }}
          className="mt-16 screenshot-container"
        >
          <div className="skeleton skeleton--image aspect-[16/10]" role="img" aria-label="Aperçu du tableau de bord Huntaze">
            <Image
              src="/images/dashboard-linear.png"
              alt="Tableau de bord Huntaze montrant l'interface de gestion des créateurs"
              fill
              className="object-cover rounded"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1536px) 90vw, 1200px"
              quality={90}
            />
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .hero__content {
          text-align: center;
          max-width: 65ch;
          margin: 0 auto;
        }

        .text-gradient {
          background: var(--color-accent-fallback);
          background: linear-gradient(
            135deg,
            var(--color-accent) 0%,
            oklch(from var(--color-accent) l c calc(h + 30)) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .trust-indicators {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-400);
          justify-content: center;
          font-size: var(--font-size-325);
          color: var(--color-text-secondary);
        }

        .trust-stat {
          display: flex;
          align-items: center;
          gap: var(--space-200);
        }

        .trust-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .bg-success { background-color: var(--color-success); }
        .bg-info { background-color: var(--color-info); }
        .bg-accent { background-color: var(--color-accent); }

        .screenshot-container {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          border-radius: var(--radius-200);
          overflow: hidden;
          box-shadow: var(--shadow-500);
        }

        .aspect-\[16\/10\] {
          aspect-ratio: 16 / 10;
        }

        @media (max-width: 768px) {
          .hero {
            min-height: auto;
            padding-top: var(--space-1200);
            padding-bottom: var(--space-800);
          }

          .trust-indicators {
            font-size: var(--font-size-300);
          }

          .screenshot-container {
            margin-top: var(--space-800);
          }
        }
      `}</style>
    </section>
  )
}