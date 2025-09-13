'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  MessageSquare, 
  TrendingUp, 
  Shield, 
  Zap,
  Users,
  BarChart3
} from 'lucide-react'

const features = [
  {
    id: 'smart-conversations',
    icon: MessageSquare,
    title: 'Conversations intelligentes',
    description: 'IA conversationnelle qui comprend le contexte et personnalise chaque interaction.',
    color: 'var(--color-info)',
  },
  {
    id: 'automatic-growth',
    icon: TrendingUp,
    title: 'Croissance automatique',
    description: 'Algorithmes qui optimisent vos revenus et identifient les opportunités.',
    color: 'var(--color-success)',
  },
  {
    id: 'maximum-security',
    icon: Shield,
    title: 'Sécurité maximale',
    description: 'Chiffrement bout-en-bout et conformité GDPR pour protéger vos données.',
    color: 'var(--color-accent)',
  },
  {
    id: 'realtime-performance',
    icon: Zap,
    title: 'Performance temps réel',
    description: 'Infrastructure rapide qui gère des milliers de messages simultanément.',
    color: 'var(--color-warning)',
  },
  {
    id: 'multi-account',
    icon: Users,
    title: 'Gestion multi-compte',
    description: 'Centralisez tous vos comptes et plateformes en une interface.',
    color: 'var(--color-info)',
  },
  {
    id: 'advanced-analytics',
    icon: BarChart3,
    title: 'Analytics avancés',
    description: 'Tableaux de bord détaillés pour suivre et améliorer vos performances.',
    color: 'var(--color-accent)',
  },
]

export default function LinearFeatureGridV2() {
  return (
    <section 
      className="section bg-secondary"
      role="region"
      aria-label="Fonctionnalités principales"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="h2 mb-4">
            Tout ce dont vous avez besoin pour scaler
          </h2>
          <p className="text-lead max-w-3xl mx-auto">
            Une plateforme complète qui remplace agences, assistants et outils dispersés.
            Construit pour les créateurs professionnels.
          </p>
        </motion.div>

        <ul className="feature-grid__list" role="list">
          {features.map((feature, index) => (
            <motion.li
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              viewport={{ once: true }}
              className="feature-grid__item"
            >
              <article className="feature-card card card-interactive hover-lift will-animate">
                <div 
                  className="feature-icon"
                  style={{ 
                    backgroundColor: `color-mix(in srgb, ${feature.color} 10%, transparent)`,
                    color: feature.color 
                  }}
                  aria-hidden="true"
                >
                  <feature.icon size={24} />
                </div>
                <h3 className="h4 mb-2">{feature.title}</h3>
                <p className="text-body text-secondary">
                  {feature.description}
                </p>
              </article>
            </motion.li>
          ))}
        </ul>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a 
            href="/features" 
            className="inline-flex items-center gap-2 text-accent hover:underline"
            aria-label="Voir toutes les fonctionnalités de Huntaze"
          >
            Découvrir toutes les fonctionnalités
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        .section {
          padding: var(--space-1200) 0;
        }

        .bg-secondary {
          background-color: var(--color-bg-secondary);
        }

        .feature-grid__list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: var(--space-600);
          list-style: none;
          padding: 0;
          margin: 0;
        }

        /* Fallback for browsers without grid */
        @supports not (display: grid) {
          .feature-grid__list {
            display: flex;
            flex-wrap: wrap;
            margin: calc(var(--space-600) * -0.5);
          }
          
          .feature-grid__item {
            flex: 1 1 320px;
            margin: calc(var(--space-600) * 0.5);
          }
        }

        .feature-card {
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: var(--space-800);
        }

        .feature-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-200);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-500);
        }

        @media (max-width: 768px) {
          .section {
            padding: var(--space-1000) 0;
          }

          .feature-grid__list {
            grid-template-columns: 1fr;
            gap: var(--space-400);
          }

          .feature-card {
            padding: var(--space-600);
          }
        }
      `}</style>
    </section>
  )
}

{/* Import ArrowRight icon */}
import { ArrowRight } from 'lucide-react'