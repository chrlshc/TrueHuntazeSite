'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Shield, 
  TrendingUp, 
  Users, 
  Clock, 
  Lock 
} from 'lucide-react'

const valueProps = [
  {
    icon: Zap,
    title: 'Automatisation IA complète',
    description: 'Notre IA gère conversations, prix et planning 24/7. Répondez à 1000+ fans simultanément.',
    color: 'var(--color-primary)',
  },
  {
    icon: Shield,
    title: 'Zéro risque, 100% conforme',
    description: 'GDPR compliant, respect des CGU plateformes. Vos données sont cryptées et sécurisées.',
    color: 'var(--color-secondary)',
  },
  {
    icon: TrendingUp,
    title: 'Croissance garantie',
    description: 'Augmentez vos revenus de 127% en moyenne. ROI prouvé dès le premier mois.',
    color: 'var(--color-accent)',
  },
  {
    icon: Users,
    title: 'Gestion multi-plateforme',
    description: 'OnlyFans, Instagram, TikTok, Reddit. Une seule interface pour tous vos canaux.',
    color: 'var(--color-primary)',
  },
  {
    icon: Clock,
    title: 'Gain de temps radical',
    description: 'Économisez 40h/semaine. Concentrez-vous sur la création, nous gérons le reste.',
    color: 'var(--color-secondary)',
  },
  {
    icon: Lock,
    title: 'Contrôle total',
    description: 'Restez propriétaire de votre business. Aucune commission, aucune dépendance.',
    color: 'var(--color-accent)',
  },
]

export default function ShopifyValueProps() {
  return (
    <section className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="heading-2 text-center mb-4">
            Pourquoi les créateurs choisissent Huntaze
          </h2>
          <p className="text-lead text-center max-w-3xl mx-auto mb-12">
            Une plateforme complète qui remplace agences, VAs et outils dispersés. 
            Tout ce dont vous avez besoin pour scaler votre business.
          </p>
        </motion.div>

        <div className="value-grid">
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="value-card card card-elevated"
            >
              <div 
                className="value-icon"
                style={{ backgroundColor: `${prop.color}15` }}
              >
                <prop.icon 
                  size={24} 
                  style={{ color: prop.color }}
                />
              </div>
              <h3 className="heading-4 mb-3">{prop.title}</h3>
              <p className="text-body color-secondary">
                {prop.description}
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
          <p className="text-lg mb-6">
            Rejoignez 50,000+ créateurs qui ont déjà fait le switch
          </p>
          <a href="/demo" className="btn btn-primary btn-large">
            Voir la démo en 3 minutes
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        .section-header {
          margin-bottom: var(--space-16);
        }

        .value-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: var(--space-6);
        }

        .value-card {
          position: relative;
          padding: var(--space-8);
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: all var(--transition-base);
        }

        .value-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .value-icon {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-6);
        }

        .color-secondary {
          color: var(--color-text-secondary);
        }

        @media (max-width: 768px) {
          .value-grid {
            grid-template-columns: 1fr;
            gap: var(--space-4);
          }

          .value-card {
            padding: var(--space-6);
          }
        }

        /* Ensure equal heights */
        .value-card h3,
        .value-card p {
          margin: 0;
        }

        .value-card p {
          flex-grow: 1;
        }
      `}</style>
    </section>
  )
}