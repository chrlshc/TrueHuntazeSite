# Squelettes de Code - Composants Prioritaires Huntaze

## 🎯 Structure des Fichiers Recommandée

```
components/
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Input.tsx
│   └── LoadingSpinner.tsx
├── sections/
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── SocialProof.tsx
│   ├── Pricing.tsx
│   ├── Testimonials.tsx
│   └── FAQ.tsx
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Container.tsx
└── animations/
    ├── FadeIn.tsx
    ├── StaggerChildren.tsx
    └── ScrollReveal.tsx
```

---

## 🔧 1. Design System - Tokens CSS

### `styles/design-system.css`
```css
/* Design System Huntaze - Inspiré Linear */
@layer base {
  :root {
    /* === COLORS - Dark Theme Primary === */
    --bg-primary: 15 15 16;        /* #0F0F10 */
    --bg-secondary: 26 26 27;      /* #1A1A1B */
    --bg-elevated: 37 37 40;       /* #252528 */
    --bg-overlay: 0 0 0;           /* #000000 */
    
    /* === BORDERS === */
    --border-primary: 45 45 48;    /* #2D2D30 */
    --border-secondary: 64 64 64;  /* #404040 */
    --border-interactive: 94 106 210; /* #5E6AD2 */
    
    /* === TEXT === */
    --text-primary: 238 239 241;   /* #EEEFF1 */
    --text-secondary: 156 163 175; /* #9CA3AF */
    --text-tertiary: 107 114 128;  /* #6B7280 */
    --text-inverse: 15 15 16;      /* #0F0F10 */
    
    /* === BRAND === */
    --brand-primary: 94 106 210;   /* #5E6AD2 */
    --brand-hover: 76 91 192;      /* #4C5BC0 */
    --brand-light: 124 138 227;    /* #7C8AE3 */
    
    /* === SEMANTIC === */
    --success: 16 185 129;         /* #10B981 */
    --warning: 245 158 11;         /* #F59E0B */
    --error: 239 68 68;            /* #EF4444 */
    
    /* === SPACING === */
    --space-unit: 0.25rem;         /* 4px */
    
    /* === ANIMATION === */
    --ease-default: cubic-bezier(0.16, 1, 0.3, 1);
    --duration-fast: 150ms;
    --duration-base: 300ms;
    --duration-slow: 500ms;
  }
}

/* Utility Classes */
@layer utilities {
  .bg-surface {
    background-color: rgb(var(--bg-secondary));
  }
  
  .border-default {
    border-color: rgb(var(--border-primary));
  }
  
  .text-primary {
    color: rgb(var(--text-primary));
  }
  
  .text-secondary {
    color: rgb(var(--text-secondary));
  }
  
  /* Animation utilities */
  .animate-fade-in {
    animation: fadeIn var(--duration-base) var(--ease-default);
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
}
```

---

## 🎯 2. Composant Button Professionnel

### `components/ui/Button.tsx`
```typescript
'use client'

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black',
  {
    variants: {
      variant: {
        primary: 'bg-brand-primary text-white hover:bg-brand-hover focus:ring-brand-primary',
        secondary: 'bg-bg-elevated text-text-primary border border-border-primary hover:bg-bg-elevated/80',
        ghost: 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50',
        danger: 'bg-error text-white hover:bg-error/90 focus:ring-error',
      },
      size: {
        sm: 'h-8 px-3 text-sm rounded-md gap-1.5',
        md: 'h-10 px-4 text-base rounded-lg gap-2',
        lg: 'h-12 px-6 text-lg rounded-lg gap-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    loading = false, 
    icon: Icon,
    iconPosition = 'left',
    children,
    disabled,
    ...props 
  }, ref) => {
    const iconSize = size === 'sm' ? 16 : size === 'lg' ? 20 : 18
    
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && iconPosition === 'left' && (
          <Loader2 className="animate-spin" size={iconSize} />
        )}
        {!loading && Icon && iconPosition === 'left' && (
          <Icon size={iconSize} />
        )}
        {children}
        {!loading && Icon && iconPosition === 'right' && (
          <Icon size={iconSize} />
        )}
        {loading && iconPosition === 'right' && (
          <Loader2 className="animate-spin" size={iconSize} />
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
```

---

## 🏠 3. Hero Section Professionnelle

### `components/sections/Hero.tsx`
```typescript
'use client'

import React from 'react'
import { ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/layout/Container'
import { FadeIn, StaggerChildren } from '@/components/animations'

interface HeroProps {
  headline: string
  subheadline: string
  ctaPrimary: {
    text: string
    href: string
  }
  ctaSecondary?: {
    text: string
    href: string
  }
  badge?: string
  metrics?: Array<{
    value: string
    label: string
  }>
}

export default function Hero({
  headline = "La plateforme qui professionnalise votre business créateur",
  subheadline = "Automatisez vos opérations, analysez vos performances et développez vos revenus de manière durable.",
  ctaPrimary = { text: "Démarrer l'essai gratuit", href: "/signup" },
  ctaSecondary = { text: "Voir la démo", href: "/demo" },
  badge = "Trusted by 15,000+ creators",
  metrics = [
    { value: "€10M+", label: "Revenus générés" },
    { value: "99.9%", label: "Disponibilité" },
    { value: "24/7", label: "Support" }
  ]
}: HeroProps) {
  return (
    <section className="relative bg-bg-primary overflow-hidden">
      {/* Background gradient - subtle */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-transparent" />
      
      <Container className="relative z-10 py-24 md:py-32">
        <StaggerChildren className="max-w-4xl mx-auto text-center">
          
          {/* Badge */}
          {badge && (
            <FadeIn>
              <Badge variant="outline" className="mb-6">
                {badge}
              </Badge>
            </FadeIn>
          )}
          
          {/* Headline */}
          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-text-primary leading-tight tracking-tight">
              {headline}
            </h1>
          </FadeIn>
          
          {/* Subheadline */}
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
              {subheadline}
            </p>
          </FadeIn>
          
          {/* CTAs */}
          <FadeIn delay={0.3}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                icon={ArrowRight}
                iconPosition="right"
                asChild
              >
                <a href={ctaPrimary.href}>{ctaPrimary.text}</a>
              </Button>
              
              {ctaSecondary && (
                <Button 
                  variant="secondary" 
                  size="lg"
                  icon={Play}
                  asChild
                >
                  <a href={ctaSecondary.href}>{ctaSecondary.text}</a>
                </Button>
              )}
            </div>
          </FadeIn>
          
          {/* Metrics */}
          {metrics && metrics.length > 0 && (
            <FadeIn delay={0.4}>
              <div className="mt-20 grid grid-cols-3 gap-8 max-w-md mx-auto">
                {metrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-semibold text-text-primary">
                      {metric.value}
                    </div>
                    <div className="mt-1 text-sm text-text-tertiary">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          )}
          
        </StaggerChildren>
      </Container>
    </section>
  )
}
```

---

## ✨ 4. Features Grid Professionnel

### `components/sections/Features.tsx`
```typescript
'use client'

import React from 'react'
import { 
  MessageSquare, 
  BarChart3, 
  Zap, 
  Shield, 
  Calendar,
  Users,
  type LucideIcon 
} from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Card } from '@/components/ui/Card'
import { ScrollReveal } from '@/components/animations'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  metric?: {
    value: string
    label: string
  }
}

const defaultFeatures: Feature[] = [
  {
    icon: MessageSquare,
    title: "Gestion des conversations",
    description: "Centralisez toutes vos interactions client et répondez plus efficacement.",
    metric: { value: "3x", label: "Plus rapide" }
  },
  {
    icon: BarChart3,
    title: "Analytics avancées",
    description: "Tableaux de bord temps réel pour des décisions basées sur les données.",
    metric: { value: "50+", label: "Métriques" }
  },
  {
    icon: Zap,
    title: "Automatisation intelligente",
    description: "Workflows personnalisés qui vous font gagner 20h par semaine.",
    metric: { value: "20h", label: "Économisées" }
  },
  {
    icon: Shield,
    title: "Sécurité entreprise",
    description: "Conformité RGPD et chiffrement de bout en bout pour vos données.",
    metric: { value: "100%", label: "Conforme" }
  },
  {
    icon: Calendar,
    title: "Planification unifiée",
    description: "Calendrier éditorial pour tous vos contenus et plateformes.",
    metric: { value: "10+", label: "Plateformes" }
  },
  {
    icon: Users,
    title: "Gestion multi-comptes",
    description: "Switching instantané entre tous vos comptes, en toute sécurité.",
    metric: { value: "∞", label: "Comptes" }
  }
]

interface FeaturesProps {
  title?: string
  subtitle?: string
  features?: Feature[]
}

export default function Features({
  title = "Une suite complète d'outils professionnels",
  subtitle = "Tout ce dont vous avez besoin pour gérer et développer votre activité",
  features = defaultFeatures
}: FeaturesProps) {
  return (
    <section className="py-24 md:py-32 bg-bg-secondary">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-text-primary mb-4">
            {title}
          </h2>
          <p className="text-lg text-text-secondary">
            {subtitle}
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card className="h-full p-6 hover:border-border-interactive transition-colors duration-300">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-brand-primary" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {feature.description}
                    </p>
                    
                    {/* Metric */}
                    {feature.metric && (
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-2xl font-semibold text-brand-primary">
                          {feature.metric.value}
                        </span>
                        <span className="text-sm text-text-tertiary">
                          {feature.metric.label}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
```

---

## 💰 5. Section Pricing

### `components/sections/Pricing.tsx`
```typescript
'use client'

import React from 'react'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/layout/Container'
import { ScrollReveal } from '@/components/animations'
import { cn } from '@/lib/utils'

interface PricingPlan {
  name: string
  description: string
  price: {
    monthly: number
    yearly: number
  }
  currency: string
  features: Array<{
    text: string
    included: boolean
  }>
  cta: string
  popular?: boolean
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Starter",
    description: "Parfait pour débuter",
    price: { monthly: 29, yearly: 290 },
    currency: "€",
    features: [
      { text: "Jusqu'à 1,000 contacts", included: true },
      { text: "3 comptes connectés", included: true },
      { text: "Analytics de base", included: true },
      { text: "Support email", included: true },
      { text: "API access", included: false },
      { text: "Custom workflows", included: false }
    ],
    cta: "Commencer gratuitement"
  },
  {
    name: "Professional",
    description: "Pour les créateurs ambitieux",
    price: { monthly: 99, yearly: 990 },
    currency: "€",
    features: [
      { text: "Jusqu'à 10,000 contacts", included: true },
      { text: "Comptes illimités", included: true },
      { text: "Analytics avancées", included: true },
      { text: "Support prioritaire 24/7", included: true },
      { text: "API access", included: true },
      { text: "Custom workflows", included: true }
    ],
    cta: "Essai gratuit 14 jours",
    popular: true
  },
  {
    name: "Enterprise",
    description: "Solutions sur mesure",
    price: { monthly: 0, yearly: 0 }, // Custom pricing
    currency: "Custom",
    features: [
      { text: "Contacts illimités", included: true },
      { text: "Tout de Professional", included: true },
      { text: "Manager dédié", included: true },
      { text: "SLA personnalisé", included: true },
      { text: "Formation équipe", included: true },
      { text: "Intégrations custom", included: true }
    ],
    cta: "Contacter les ventes"
  }
]

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = React.useState<'monthly' | 'yearly'>('monthly')
  
  return (
    <section className="py-24 md:py-32 bg-bg-primary">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-text-primary mb-4">
            Tarification simple et transparente
          </h2>
          <p className="text-lg text-text-secondary mb-8">
            Pas de frais cachés, pas de commissions. Juste un prix fixe mensuel.
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-bg-elevated rounded-lg p-1">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                billingPeriod === 'monthly' 
                  ? "bg-bg-primary text-text-primary" 
                  : "text-text-secondary hover:text-text-primary"
              )}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                billingPeriod === 'yearly' 
                  ? "bg-bg-primary text-text-primary" 
                  : "text-text-secondary hover:text-text-primary"
              )}
            >
              Annuel
              <Badge variant="success" size="sm" className="ml-2">
                -20%
              </Badge>
            </button>
          </div>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {defaultPlans.map((plan, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card 
                className={cn(
                  "relative h-full p-8",
                  plan.popular && "border-brand-primary"
                )}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <Badge 
                    variant="primary" 
                    className="absolute -top-3 left-1/2 -translate-x-1/2"
                  >
                    Plus populaire
                  </Badge>
                )}
                
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-text-primary mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-text-secondary">
                    {plan.description}
                  </p>
                </div>
                
                {/* Price */}
                <div className="text-center mb-8">
                  {plan.currency === "Custom" ? (
                    <div className="text-3xl font-semibold text-text-primary">
                      Sur devis
                    </div>
                  ) : (
                    <>
                      <div className="text-5xl font-semibold text-text-primary">
                        {plan.currency}{plan.price[billingPeriod]}
                      </div>
                      <div className="text-text-tertiary">
                        par {billingPeriod === 'monthly' ? 'mois' : 'an'}
                      </div>
                    </>
                  )}
                </div>
                
                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-text-tertiary flex-shrink-0 mt-0.5" />
                      )}
                      <span className={cn(
                        "text-sm",
                        feature.included ? "text-text-primary" : "text-text-tertiary"
                      )}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA */}
                <Button 
                  variant={plan.popular ? "primary" : "secondary"}
                  className="w-full"
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </Card>
            </ScrollReveal>
          ))}
        </div>
        
        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-text-secondary">
            Tous les plans incluent une garantie satisfait ou remboursé de 30 jours.
          </p>
        </div>
      </Container>
    </section>
  )
}
```

---

## 🎯 6. Composants d'Animation Réutilisables

### `components/animations/FadeIn.tsx`
```typescript
'use client'

import React from 'react'
import { motion, type MotionProps } from 'framer-motion'

interface FadeInProps extends MotionProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.5,
  className,
  ...props 
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
```

### `components/animations/ScrollReveal.tsx`
```typescript
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function ScrollReveal({ 
  children, 
  delay = 0,
  duration = 0.5,
  className 
}: ScrollRevealProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

---

## 📁 7. Utils et Helpers

### `lib/utils.ts`
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(
  amount: number,
  currency: string = 'EUR',
  locale: string = 'fr-FR'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(
  num: number,
  locale: string = 'fr-FR'
): string {
  return new Intl.NumberFormat(locale).format(num)
}
```

### `hooks/useInView.ts`
```typescript
import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useInView({
  threshold = 0,
  rootMargin = '0px',
  triggerOnce = true
}: UseInViewOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting
        setIsInView(inView)
        
        if (inView && triggerOnce) {
          observer.unobserve(element)
        }
      },
      { threshold, rootMargin }
    )
    
    observer.observe(element)
    
    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce])
  
  return { ref, isInView }
}
```

---

## 🚀 Instructions d'Implémentation

### 1. Installation des dépendances
```bash
npm install lucide-react class-variance-authority clsx tailwind-merge framer-motion
```

### 2. Configuration Tailwind
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'rgb(var(--bg-primary) / <alpha-value>)',
        'bg-secondary': 'rgb(var(--bg-secondary) / <alpha-value>)',
        'bg-elevated': 'rgb(var(--bg-elevated) / <alpha-value>)',
        'border-primary': 'rgb(var(--border-primary) / <alpha-value>)',
        'border-secondary': 'rgb(var(--border-secondary) / <alpha-value>)',
        'border-interactive': 'rgb(var(--border-interactive) / <alpha-value>)',
        'text-primary': 'rgb(var(--text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--text-secondary) / <alpha-value>)',
        'text-tertiary': 'rgb(var(--text-tertiary) / <alpha-value>)',
        'brand-primary': 'rgb(var(--brand-primary) / <alpha-value>)',
        'brand-hover': 'rgb(var(--brand-hover) / <alpha-value>)',
        'success': 'rgb(var(--success) / <alpha-value>)',
        'warning': 'rgb(var(--warning) / <alpha-value>)',
        'error': 'rgb(var(--error) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}
```

### 3. Ordre d'implémentation
1. Design tokens CSS
2. Composants UI de base (Button, Card, Badge)
3. Layout components (Container, Header, Footer)
4. Animation components
5. Section components (Hero, Features, etc.)
6. Integration dans les pages

### 4. Checklist de migration
- [ ] Supprimer tous les emojis du code
- [ ] Remplacer les textes marketing agressifs
- [ ] Nettoyer globals.css
- [ ] Implémenter le nouveau design system
- [ ] Refactoriser chaque section
- [ ] Ajouter les animations Linear-style
- [ ] Tester le responsive
- [ ] Optimiser les performances

Ce squelette fournit une base solide et professionnelle pour transformer Huntaze en plateforme SaaS moderne!