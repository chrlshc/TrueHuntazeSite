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
    icon: MessageSquare,
    title: 'Conversations intelligentes',
    description: 'IA conversationnelle qui comprend le contexte et personnalise chaque interaction.',
    color: 'var(--color-info)',
  },
  {
    icon: TrendingUp,
    title: 'Croissance automatique',
    description: 'Algorithmes qui optimisent vos revenus et identifient les opportunités.',
    color: 'var(--color-success)',
  },
  {
    icon: Shield,
    title: 'Sécurité maximale',
    description: 'Chiffrement bout-en-bout et conformité GDPR pour protéger vos données.',
    color: 'var(--accent)',
  },
  {
    icon: Zap,
    title: 'Performance temps réel',
    description: 'Infrastructure rapide qui gère des milliers de messages simultanément.',
    color: 'var(--color-warning)',
  },
  {
    icon: Users,
    title: 'Gestion multi-compte',
    description: 'Centralisez tous vos comptes et plateformes en une interface.',
    color: 'var(--color-info)',
  },
  {
    icon: BarChart3,
    title: 'Analytics avancés',
    description: 'Tableaux de bord détaillés pour suivre et améliorer vos performances.',
    color: 'var(--accent)',
  },
]

export default function LinearFeatureGrid() {
  return (
    <section className="section bg-secondary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
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

        <div className="feature-grid">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              viewport={{ once: true }}
              className="feature-card card hover-lift"
            >
              <div 
                className="feature-icon"
                style={{ 
                  backgroundColor: `lch(from ${feature.color} l c h / 0.1)`,
                  color: feature.color 
                }}
              >
                <feature.icon size={24} />
              </div>
              <h3 className="h4 mb-2">{feature.title}</h3>
              <p className="text-body text-secondary">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a href="/features" className="link-underline text-accent">
            Découvrir toutes les fonctionnalités →
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        .section {
          padding: 80px 0;
        }

        .bg-secondary {
          background-color: var(--bg-secondary);
        }

        .container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .text-lead {
          color: var(--text-secondary);
          font-size: var(--text-lg);
          line-height: var(--leading-relaxed);
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
        }

        .feature-card {
          padding: 32px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .feature-icon {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .text-secondary {
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .section {
            padding: 60px 0;
          }

          .feature-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .feature-card {
            padding: 24px;
          }

          .container {
            padding: 0 16px;
          }
        }
      `}</style>
    </section>
  )
}