'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, ArrowRight, Sparkles } from 'lucide-react'

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Pour les créateurs qui démarrent',
    price: { monthly: 149, yearly: 119 },
    features: [
      { text: 'Jusqu\'à 1,000 fans actifs', included: true },
      { text: 'IA conversationnelle de base', included: true },
      { text: '3 plateformes connectées', included: true },
      { text: 'Analytics essentiels', included: true },
      { text: 'Support email', included: true },
      { text: 'IA pricing avancée', included: false },
      { text: 'API & webhooks', included: false },
      { text: 'Manager dédié', included: false },
    ],
    cta: 'Commencer gratuitement',
    recommended: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Le choix des top créateurs',
    price: { monthly: 399, yearly: 299 },
    features: [
      { text: 'Jusqu\'à 10,000 fans actifs', included: true },
      { text: 'IA conversationnelle avancée', included: true },
      { text: 'Plateformes illimitées', included: true },
      { text: 'Analytics complets + prédictions', included: true },
      { text: 'Support prioritaire 24/7', included: true },
      { text: 'IA pricing dynamique', included: true },
      { text: 'A/B testing automatisé', included: true },
      { text: 'Formations exclusives', included: true },
    ],
    cta: 'Essai gratuit 14 jours',
    recommended: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Pour les agences et grands comptes',
    price: { monthly: null, yearly: null },
    features: [
      { text: 'Fans illimités', included: true },
      { text: 'IA personnalisée', included: true },
      { text: 'Multi-comptes & sous-utilisateurs', included: true },
      { text: 'Infrastructure dédiée', included: true },
      { text: 'SLA 99.99%', included: true },
      { text: 'API priority access', included: true },
      { text: 'Manager & formation dédiés', included: true },
      { text: 'Contrat sur mesure', included: true },
    ],
    cta: 'Contacter les ventes',
    recommended: false,
  },
]

export default function ShopifyPricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

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
            Des tarifs transparents qui scalent avec vous
          </h2>
          <p className="text-lead text-center max-w-3xl mx-auto mb-8">
            Pas de frais cachés, pas de commission. Économisez jusqu'à 40% 
            par rapport aux agences traditionnelles.
          </p>

          {/* Billing Toggle */}
          <div className="billing-toggle">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`toggle-option ${billingPeriod === 'monthly' ? 'active' : ''}`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`toggle-option ${billingPeriod === 'yearly' ? 'active' : ''}`}
            >
              <span>Annuel</span>
              <span className="discount-badge">-25%</span>
            </button>
          </div>
        </motion.div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`pricing-card card ${plan.recommended ? 'featured' : ''}`}
            >
              {plan.recommended && (
                <div className="pricing-badge">
                  <Sparkles className="w-3 h-3" />
                  Le plus populaire
                </div>
              )}

              <div className="pricing-header">
                <h3 className="heading-3">{plan.name}</h3>
                <p className="text-body color-secondary">{plan.description}</p>
              </div>

              <div className="pricing-price">
                {plan.price.monthly ? (
                  <>
                    <span className="currency">$</span>
                    <span className="amount text-mono">
                      {billingPeriod === 'monthly' ? plan.price.monthly : plan.price.yearly}
                    </span>
                    <span className="pricing-period">/mois</span>
                  </>
                ) : (
                  <span className="custom-pricing">Tarif sur mesure</span>
                )}
              </div>

              <ul className="pricing-features">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="pricing-feature">
                    {feature.included ? (
                      <Check className="pricing-feature-icon included" />
                    ) : (
                      <X className="pricing-feature-icon excluded" />
                    )}
                    <span className={!feature.included ? 'feature-excluded' : ''}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pricing-footer">
                <a 
                  href={plan.id === 'enterprise' ? '/contact' : '/signup'}
                  className={`btn ${plan.recommended ? 'btn-primary' : 'btn-secondary'} btn-large w-full`}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="pricing-bottom"
        >
          <div className="guarantee-badge">
            <Shield className="w-5 h-5" />
            <span>Garantie satisfait ou remboursé 30 jours</span>
          </div>
          <p className="text-center text-body color-secondary mt-4">
            Pas de carte requise pour l'essai gratuit • Annulation à tout moment • Support inclus
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .section-header {
          margin-bottom: var(--space-12);
        }

        .billing-toggle {
          display: inline-flex;
          background: var(--color-surface);
          border-radius: var(--radius-full);
          padding: var(--space-1);
          border: 1px solid var(--color-border);
        }

        .toggle-option {
          padding: var(--space-2) var(--space-6);
          border: none;
          background: transparent;
          font-size: var(--text-base);
          font-weight: var(--font-medium);
          cursor: pointer;
          border-radius: var(--radius-full);
          transition: all var(--transition-base);
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .toggle-option.active {
          background: var(--color-primary);
          color: white;
        }

        .discount-badge {
          background: var(--color-success);
          color: white;
          padding: 2px 8px;
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          font-weight: var(--font-semibold);
        }

        .pricing-header {
          text-align: center;
          margin-bottom: var(--space-6);
        }

        .pricing-header h3 {
          margin-bottom: var(--space-2);
        }

        .color-secondary {
          color: var(--color-text-secondary);
        }

        .custom-pricing {
          font-size: var(--text-2xl);
          font-weight: var(--font-semibold);
        }

        .pricing-footer {
          margin-top: auto;
          padding-top: var(--space-6);
        }

        .w-full {
          width: 100%;
        }

        .feature-excluded {
          opacity: 0.5;
        }

        .pricing-bottom {
          margin-top: var(--space-16);
          text-align: center;
        }

        .guarantee-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-4);
          background: var(--color-success);
          color: white;
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: var(--font-medium);
        }

        @media (max-width: 1024px) {
          .pricing-grid {
            grid-template-columns: 1fr;
            max-width: 600px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  )
}

{/* Import Shield icon */}
import { Shield } from 'lucide-react'