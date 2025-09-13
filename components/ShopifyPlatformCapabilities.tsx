'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  BarChart3, 
  Calendar, 
  Brain,
  Link2,
  Shield,
  ChevronRight,
  Check
} from 'lucide-react'

const capabilities = [
  {
    id: 'ai-messaging',
    icon: MessageSquare,
    title: 'Messagerie IA Avancée',
    subtitle: 'Conversations naturelles et personnalisées',
    features: [
      'Réponses contextuelles en temps réel',
      'Détection des intentions d\'achat',
      'Personnalisation par profil fan',
      'Multi-langue automatique',
    ],
    stats: { value: '2M+', label: 'messages/jour' },
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Analytics & Insights',
    subtitle: 'Données actionables pour maximiser vos revenus',
    features: [
      'Dashboard temps réel',
      'Prédictions de revenus IA',
      'Segmentation automatique',
      'A/B testing intégré',
    ],
    stats: { value: '+127%', label: 'revenus moyens' },
  },
  {
    id: 'scheduling',
    icon: Calendar,
    title: 'Planning Intelligent',
    subtitle: 'Optimisez votre temps et vos publications',
    features: [
      'Publication multi-plateforme',
      'Meilleurs horaires par IA',
      'Queue de contenu automatique',
      'Calendrier unifié',
    ],
    stats: { value: '40h', label: 'économisées/semaine' },
  },
  {
    id: 'ai-engine',
    icon: Brain,
    title: 'Moteur IA Propriétaire',
    subtitle: 'Intelligence artificielle entraînée pour les créateurs',
    features: [
      'Apprentissage de votre style',
      'Pricing dynamique optimisé',
      'Détection de patterns',
      'Amélioration continue',
    ],
    stats: { value: '99.7%', label: 'précision' },
  },
  {
    id: 'integrations',
    icon: Link2,
    title: 'Intégrations Natives',
    subtitle: 'Connectez toutes vos plateformes',
    features: [
      'OnlyFans API officielle',
      'Instagram DM automation',
      'TikTok analytics',
      'Reddit monitoring',
    ],
    stats: { value: '15+', label: 'plateformes' },
  },
  {
    id: 'compliance',
    icon: Shield,
    title: 'Conformité & Sécurité',
    subtitle: 'Protection maximale de votre business',
    features: [
      'GDPR & CCPA compliant',
      'Respect CGU plateformes',
      'Chiffrement bout-en-bout',
      'Audit logs complets',
    ],
    stats: { value: '100%', label: 'conforme' },
  },
]

export default function ShopifyPlatformCapabilities() {
  const [activeCapability, setActiveCapability] = useState(capabilities[0].id)

  return (
    <section className="section bg-surface">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="heading-2 text-center mb-4">
            Une plateforme tout-en-un pour scaler
          </h2>
          <p className="text-lead text-center max-w-3xl mx-auto">
            Remplacez 10+ outils dispersés par une solution intégrée. 
            Tout ce dont vous avez besoin, au même endroit.
          </p>
        </motion.div>

        <div className="capabilities-container">
          {/* Navigation Tabs */}
          <div className="capabilities-nav">
            {capabilities.map((cap) => (
              <button
                key={cap.id}
                onClick={() => setActiveCapability(cap.id)}
                className={`capability-tab ${activeCapability === cap.id ? 'active' : ''}`}
              >
                <cap.icon className="tab-icon" />
                <span className="tab-title">{cap.title}</span>
                <ChevronRight className="tab-arrow" />
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="capabilities-content">
            <AnimatePresence mode="wait">
              {capabilities.map((cap) => (
                activeCapability === cap.id && (
                  <motion.div
                    key={cap.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="capability-detail"
                  >
                    <div className="detail-header">
                      <div className="detail-icon">
                        <cap.icon size={32} />
                      </div>
                      <div>
                        <h3 className="heading-3">{cap.title}</h3>
                        <p className="text-lead">{cap.subtitle}</p>
                      </div>
                    </div>

                    <div className="detail-body">
                      <div className="features-list">
                        {cap.features.map((feature, index) => (
                          <motion.div
                            key={feature}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="feature-item"
                          >
                            <Check className="feature-check" />
                            <span>{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      <div className="capability-stat">
                        <span className="stat-value text-mono">{cap.stats.value}</span>
                        <span className="stat-label">{cap.stats.label}</span>
                      </div>
                    </div>

                    <div className="detail-footer">
                      <a href={`/features/${cap.id}`} className="btn btn-primary">
                        En savoir plus
                        <ChevronRight className="ml-2 w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style jsx>{`
        .section {
          background-color: var(--color-surface);
        }

        .section-header {
          margin-bottom: var(--space-16);
        }

        .capabilities-container {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: var(--space-8);
          background: var(--color-surface-raised);
          border-radius: var(--radius-xl);
          padding: var(--space-8);
          box-shadow: var(--shadow-md);
        }

        .capabilities-nav {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .capability-tab {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-4);
          background: transparent;
          border: none;
          border-radius: var(--radius-md);
          text-align: left;
          cursor: pointer;
          transition: all var(--transition-base);
          position: relative;
        }

        .capability-tab:hover {
          background: var(--color-surface);
        }

        .capability-tab.active {
          background: var(--color-primary);
          color: white;
        }

        .tab-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        .tab-title {
          flex-grow: 1;
          font-weight: var(--font-medium);
        }

        .tab-arrow {
          width: 16px;
          height: 16px;
          opacity: 0;
          transition: opacity var(--transition-base);
        }

        .capability-tab.active .tab-arrow {
          opacity: 1;
        }

        .capabilities-content {
          position: relative;
          min-height: 400px;
        }

        .capability-detail {
          display: flex;
          flex-direction: column;
          gap: var(--space-8);
          height: 100%;
        }

        .detail-header {
          display: flex;
          align-items: flex-start;
          gap: var(--space-4);
        }

        .detail-icon {
          width: 64px;
          height: 64px;
          background: var(--color-primary);
          color: white;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .detail-body {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: var(--space-8);
          flex-grow: 1;
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .feature-check {
          width: 20px;
          height: 20px;
          color: var(--color-success);
          flex-shrink: 0;
        }

        .capability-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: var(--space-6);
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          min-width: 160px;
        }

        .stat-value {
          font-size: var(--text-4xl);
          font-weight: var(--font-bold);
          color: var(--color-primary);
          line-height: 1;
        }

        .stat-label {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin-top: var(--space-2);
        }

        .detail-footer {
          padding-top: var(--space-6);
          border-top: 1px solid var(--color-border);
        }

        @media (max-width: 768px) {
          .capabilities-container {
            grid-template-columns: 1fr;
            padding: var(--space-4);
          }

          .capabilities-nav {
            flex-direction: row;
            overflow-x: auto;
            gap: var(--space-2);
            padding-bottom: var(--space-2);
            -webkit-overflow-scrolling: touch;
          }

          .capability-tab {
            white-space: nowrap;
            min-width: fit-content;
          }

          .tab-title {
            display: none;
          }

          .detail-body {
            grid-template-columns: 1fr;
          }

          .capability-stat {
            padding: var(--space-4);
          }
        }
      `}</style>
    </section>
  )
}