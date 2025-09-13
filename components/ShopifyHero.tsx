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
              <span>Trusted by 50,000+ Creators</span>
            </div>

            {/* Main Title */}
            <h1 className="heading-display hero-title">
              Gérez et développez vos{' '}
              <span className="text-gradient">revenus créateurs</span>{' '}
              grâce à l'IA
            </h1>

            {/* Description */}
            <p className="text-lead hero-description">
              Automatisez la gestion de vos fans, maximisez vos revenus et 
              gardez le contrôle total de votre business. Sans agence, sans 
              commission excessive.
            </p>

            {/* Key Benefits */}
            <ul className="benefit-list mb-8">
              <li className="benefit-item">
                <CheckCircle className="benefit-icon" />
                <span>Gestion automatique de 10,000+ fans</span>
              </li>
              <li className="benefit-item">
                <CheckCircle className="benefit-icon" />
                <span>0% de commission (vs 40% des agences)</span>
              </li>
              <li className="benefit-item">
                <CheckCircle className="benefit-icon" />
                <span>Conformité GDPR et plateformes garantie</span>
              </li>
            </ul>

            {/* CTA Buttons */}
            <div className="hero-cta-group">
              <Link href="/demo" className="btn btn-primary btn-large">
                Demander une démo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/pricing" className="btn btn-secondary btn-large">
                Voir les tarifs
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="trust-indicators">
              <div className="trust-stat">
                <span className="trust-number text-mono">$10M+</span>
                <span className="trust-label">Revenus générés</span>
              </div>
              <div className="trust-stat">
                <span className="trust-number text-mono">99.9%</span>
                <span className="trust-label">Uptime garanti</span>
              </div>
              <div className="trust-stat">
                <span className="trust-number text-mono">24/7</span>
                <span className="trust-label">Support dédié</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-visual-wrapper"
          >
            <div className="hero-visual">
              <Image
                src="/images/dashboard-preview.png"
                alt="Huntaze Dashboard Preview"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Floating elements for dynamism */}
              <div className="floating-card floating-card-1">
                <div className="stat-card">
                  <span className="stat-value text-mono">+127%</span>
                  <span className="stat-label">Revenue Growth</span>
                </div>
              </div>
              <div className="floating-card floating-card-2">
                <div className="stat-card">
                  <span className="stat-value text-mono">5,234</span>
                  <span className="stat-label">Active Fans</span>
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