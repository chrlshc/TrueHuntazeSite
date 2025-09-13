'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const trustLogos = [
  { name: 'TechCrunch', src: '/logos/techcrunch.svg', height: 30 },
  { name: 'Forbes', src: '/logos/forbes.svg', height: 35 },
  { name: 'Product Hunt', src: '/logos/producthunt.svg', height: 30 },
  { name: 'Y Combinator', src: '/logos/ycombinator.svg', height: 30 },
  { name: 'Wired', src: '/logos/wired.svg', height: 25 },
]

const trustMetrics = [
  { label: 'Créateurs actifs', value: '50,000+' },
  { label: 'Messages automatisés/jour', value: '2M+' },
  { label: 'Taux de satisfaction', value: '98%' },
]

export default function ShopifyTrustBar() {
  return (
    <section className="trust-bar">
      <div className="container">
        {/* Metrics Row */}
        <div className="trust-metrics">
          {trustMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="metric-item"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <span className="metric-value text-mono">{metric.value}</span>
              <span className="metric-label">{metric.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="trust-divider" />

        {/* Logos Row */}
        <div className="trust-content">
          <p className="trust-title">Reconnu par les leaders de l'industrie</p>
          <div className="trust-logos">
            {trustLogos.map((logo, index) => (
              <motion.div
                key={logo.name}
                className="trust-logo-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  height={logo.height}
                  width={120}
                  className="trust-logo"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonial Strip */}
        <div className="testimonial-strip">
          <div className="testimonial-content">
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star">★</span>
              ))}
            </div>
            <p className="testimonial-text">
              "Huntaze a transformé notre business. +300% de revenus en 3 mois."
            </p>
            <p className="testimonial-author">— Sarah M., Top 0.1% Creator</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .trust-metrics {
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: var(--space-8) 0;
          gap: var(--space-8);
        }

        .metric-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: var(--space-2);
        }

        .metric-value {
          font-size: var(--text-3xl);
          font-weight: var(--font-bold);
          color: var(--color-primary);
        }

        .metric-label {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .trust-divider {
          height: 1px;
          background: var(--color-border);
          margin: var(--space-4) 0;
        }

        .trust-content {
          text-align: center;
          padding: var(--space-6) 0;
        }

        .trust-title {
          font-size: var(--text-sm);
          color: var(--color-text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: var(--space-6);
          font-weight: var(--font-medium);
        }

        .trust-logo-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 140px;
        }

        .testimonial-strip {
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          margin-top: var(--space-8);
        }

        .testimonial-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-6);
          flex-wrap: wrap;
          text-align: center;
        }

        .rating {
          display: flex;
          gap: var(--space-1);
        }

        .star {
          color: #FFB800;
          font-size: var(--text-lg);
        }

        .testimonial-text {
          font-size: var(--text-lg);
          font-weight: var(--font-medium);
          color: var(--color-text-primary);
          max-width: 600px;
        }

        .testimonial-author {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        @media (max-width: 768px) {
          .trust-metrics {
            flex-direction: column;
            gap: var(--space-6);
          }

          .metric-value {
            font-size: var(--text-2xl);
          }

          .trust-logos {
            gap: var(--space-4);
            justify-content: center;
          }

          .trust-logo-wrapper {
            min-width: 100px;
          }

          .testimonial-content {
            flex-direction: column;
            gap: var(--space-4);
          }
        }
      `}</style>
    </section>
  )
}