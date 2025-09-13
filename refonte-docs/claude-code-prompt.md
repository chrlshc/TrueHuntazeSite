# PROMPT CLAUDE CODE - Refonte Professionnelle Huntaze

## 🎯 OBJECTIF PRINCIPAL
Transformer le site Huntaze en une plateforme SaaS professionnelle de niveau enterprise, en s'inspirant des meilleures pratiques de **Shopify** (messaging) et **Linear** (design), tout en supprimant les éléments non professionnels.

## 📋 CONTEXTE DU PROJET

### Projet: Huntaze (TrueHuntazeSite)
- **Framework:** Next.js 14 avec TypeScript
- **Styling:** Tailwind CSS + CSS Modules
- **Animations:** Framer Motion
- **État actuel:** Site avec emojis, messages marketing agressifs, CSS chaotique

### Références Design
1. **Shopify.com** - Structure, messaging professionnel, preuves sociales
2. **Linear.app** - Design system dark mode, animations fluides, typographie

## 🚨 PROBLÈMES CRITIQUES À RÉSOUDRE

### ❌ À Supprimer Immédiatement
1. **Tous les emojis dans le code** (ex: "Hi! 😊")
2. **Messages marketing agressifs:**
   - "Everything you need to dominate"
   - "grow your empire"
   - "earning six figures"
   - "Convert 3x more"
3. **CSS avec !important partout**
4. **Animations décoratives non fonctionnelles**

## 🎨 DESIGN SYSTEM À IMPLÉMENTER

### Couleurs (Inspiré Linear - Mode Sombre)
```css
:root {
  /* Base Colors - Dark Theme */
  --color-background: #0F0F10;
  --color-surface: #1A1A1B;
  --color-surface-elevated: #252528;
  --color-border: #2D2D30;
  
  /* Text Colors */
  --color-text-primary: #EEEFF1;
  --color-text-secondary: #9CA3AF;
  --color-text-tertiary: #6B7280;
  
  /* Brand Colors */
  --color-primary: #5E6AD2;
  --color-primary-hover: #4C5BC0;
  --color-primary-light: #7C8AE3;
  
  /* Semantic Colors */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
}
```

### Typographie (Inter)
```css
/* Typography Scale */
--font-size-xs: 0.875rem;    /* 14px */
--font-size-sm: 1rem;        /* 16px */
--font-size-base: 1.125rem;  /* 18px */
--font-size-lg: 1.25rem;     /* 20px */
--font-size-xl: 1.5rem;      /* 24px */
--font-size-2xl: 2rem;       /* 32px */
--font-size-3xl: 3rem;       /* 48px */
--font-size-4xl: 4rem;       /* 64px */

/* Font Weights */
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/* Line Heights */
--line-height-tight: 1.2;
--line-height-base: 1.5;
--line-height-relaxed: 1.75;
```

### Espacement (8px Grid)
```css
/* Spacing Scale */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-24: 6rem;    /* 96px */
```

## 📦 COMPOSANTS À REFACTORISER

### 1. Hero Section Professionnelle
```typescript
// components/sections/Hero.tsx
interface HeroProps {
  headline: string;
  subheadline: string;
  ctaPrimary: {
    text: string;
    href: string;
  };
  ctaSecondary?: {
    text: string;
    href: string;
  };
  trustIndicators?: string[];
}

// AVANT (❌):
// "Become the creator earning six figures"
// "Build bigger, earn smarter, grow further"

// APRÈS (✅):
// "La plateforme qui professionnalise votre business créateur"
// "Automatisez, analysez et développez votre activité en toute sérénité"
```

### 2. Features Grid Sans Emojis
```typescript
// components/sections/Features.tsx
interface Feature {
  icon: LucideIcon; // Utiliser Lucide React icons
  title: string;
  description: string;
  metric?: {
    value: string;
    label: string;
  };
}

// AVANT (❌):
// title: "Real-time AI Chat"
// description: "Convert 3x more with AI"

// APRÈS (✅):
// title: "Assistant IA conversationnel"
// description: "Gérez vos conversations à grande échelle avec une IA qui apprend de vous"
```

### 3. Système de Boutons
```typescript
// components/ui/Button.tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: LucideIcon;
}

// Styles Linear-inspired
const buttonStyles = {
  primary: 'bg-primary hover:bg-primary-hover text-white',
  secondary: 'bg-surface border border-border hover:bg-surface-elevated',
  ghost: 'hover:bg-surface-elevated text-text-secondary hover:text-text-primary'
};
```

## 🔧 FICHIERS À MODIFIER

### 1. `app/globals.css` - Nettoyer et Simplifier
```css
/* SUPPRIMER tous les !important */
/* SUPPRIMER les imports conflictuels */
/* IMPLÉMENTER le nouveau design system */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Design Tokens */
@layer base {
  :root {
    /* Insérer les variables CSS du design system ici */
  }
}

/* Composants de base */
@layer components {
  .container-width {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
  
  .section-padding {
    @apply py-16 md:py-24;
  }
}
```

### 2. `components/sections/HeroSection.tsx` - Refonte Complète
- Supprimer les floating cards avec métriques fantaisistes
- Simplifier l'animation d'entrée
- Textes professionnels
- CTAs clairs

### 3. `components/sections/FeaturesGrid.tsx` - Professionnaliser
- Remplacer toutes les mini-animations par des icônes statiques
- Réécrire les descriptions en langage professionnel
- Supprimer "dominate" et autres termes agressifs

## 📝 NOUVEAUX MESSAGES MARKETING

### Hero Principal
```
Titre: "Gérez votre business créateur comme une entreprise"
Sous-titre: "Une plateforme complète pour automatiser vos opérations, analyser vos performances et développer vos revenus de manière durable."
```

### Features (6 principales)
1. **Gestion des conversations**
   - "Centralisez toutes vos interactions"
   - "Répondez plus vite, convertissez mieux"

2. **Analytics avancées**
   - "Tableaux de bord temps réel"
   - "Prenez des décisions basées sur les données"

3. **Automatisation intelligente**
   - "Workflows personnalisés"
   - "Gagnez 20h par semaine"

4. **Gestion multi-comptes**
   - "Tous vos comptes, une interface"
   - "Switching instantané et sécurisé"

5. **Planification de contenu**
   - "Calendrier éditorial unifié"
   - "Publiez au meilleur moment"

6. **Conformité & Sécurité**
   - "RGPD compliant"
   - "Données chiffrées de bout en bout"

## 🚀 ANIMATIONS LINEAR-STYLE

### Principes d'Animation
```typescript
// Transitions standards
const transitions = {
  fast: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
  base: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  slow: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
};

// Stagger children
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Fade in from bottom
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitions.base
  }
};
```

### Intersection Observer Hook
```typescript
// hooks/useInView.ts
export function useInView(options = {}) {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, ...options }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return { ref, isInView };
}
```

## 🎯 PLAN D'EXÉCUTION

### Phase 1: Nettoyage (2 jours)
1. ✅ Supprimer TOUS les emojis
2. ✅ Nettoyer globals.css
3. ✅ Créer le design system
4. ✅ Installer lucide-react pour les icônes

### Phase 2: Refonte Composants (3 jours)
1. ✅ Hero Section
2. ✅ Features Grid
3. ✅ Social Proof
4. ✅ Pricing Section
5. ✅ Footer

### Phase 3: Polish (2 jours)
1. ✅ Animations Linear-style
2. ✅ Dark mode cohérent
3. ✅ Performance optimizations
4. ✅ Tests responsive

## ⚡ COMMANDES UTILES

```bash
# Installer les dépendances nécessaires
npm install lucide-react clsx tailwind-merge

# Nettoyer les imports CSS inutiles
find . -name "*.css" -not -path "./node_modules/*" | wc -l

# Chercher les emojis dans le code
grep -r "😊\|💬\|🚀\|💎\|🎯" --include="*.tsx" --include="*.ts"

# Build de production
npm run build
```

## 🏁 RÉSULTAT ATTENDU

Un site professionnel qui:
- ✅ Inspire confiance aux entreprises
- ✅ Messaging clair et mesuré
- ✅ Design moderne façon Linear
- ✅ Performance optimale
- ✅ Accessible et responsive
- ✅ Prêt pour une levée de fonds

**Le nouveau Huntaze doit ressembler à un outil que Shopify pourrait acquérir, avec l'élégance visuelle de Linear.**