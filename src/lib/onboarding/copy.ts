export type Locale = 'en' | 'fr' | 'es';

export const ONBOARDING_COPY = {
  en: {
    shell: {
      back: 'Back',
      continue: 'Continue',
      skip: 'Skip for now',
      stepOf: (step: number, total: number) => `Step ${step} of ${total}`,
    },
    steps: {
      profile: {
        title: 'Profile',
        subtitle: 'Let’s personalize your profile.',
        labels: {
          displayName: 'Display name',
          bio: 'Bio',
          timezone: 'Time zone (auto)',
          language: 'Language',
          accountType: 'Account type',
          frequency: 'Content frequency',
          consentTOS: 'I accept the Terms and Privacy Policy',
          consentEmails: 'I agree to receive helpful updates by email',
        },
      },
      activity: {
        title: 'Your activity',
        subtitle: 'Tell us about your domain and what you plan to sell.',
        labels: {
          goals: 'Business goals',
          contentTypes: 'Content types',
          revenueCurrent: 'Current monthly revenue',
          revenueTarget: 'Target monthly revenue',
        },
        options: {
          goals: [
            { key: 'revenue', en: 'Revenue', fr: 'Revenu', es: 'Ingresos' },
            { key: 'engagement', en: 'Engagement', fr: 'Engagement', es: 'Engagement' },
            { key: 'growth', en: 'Audience growth', fr: 'Croissance audience', es: 'Crecimiento de audiencia' },
            { key: 'time_saving', en: 'Time saving', fr: 'Gain de temps', es: 'Ahorro de tiempo' },
          ],
          contentTypes: [
            { key: 'photos', en: 'Photos', fr: 'Photos', es: 'Fotos' },
            { key: 'videos', en: 'Videos', fr: 'Vidéos', es: 'Vídeos' },
            { key: 'live', en: 'Live', fr: 'Live', es: 'En vivo' },
            { key: 'messages', en: 'Messages', fr: 'Messages', es: 'Mensajes' },
            { key: 'posts', en: 'Posts', fr: 'Posts', es: 'Publicaciones' },
          ],
          niches: [
            { key: 'fitness', en: 'Fitness', fr: 'Fitness', es: 'Fitness' },
            { key: 'fashion', en: 'Fashion', fr: 'Mode', es: 'Moda' },
            { key: 'gaming', en: 'Gaming', fr: 'Gaming', es: 'Gaming' },
            { key: 'education', en: 'Education', fr: 'Éducation', es: 'Educación' },
          ],
        },
      },
      ai: {
        title: 'Configure your AI assistant',
        subtitle: 'Set the personality, tone and welcome message.',
        labels: {
          personality: 'Assistant personality / name',
          tone: 'Conversation tone',
          monthlyPrice: 'Monthly subscription price ($)',
          welcome: 'Welcome message (sent to new fans)',
        },
      },
      platforms: {
        title: 'Connect your platforms',
        subtitle: 'Control everything from Huntaze and save time.',
        states: { connect: 'Connect', connected: 'Connected', soon: 'Coming soon' },
      },
      plan: {
        title: 'Choose your plan',
        subtitle: '14-day free trial. You can change anytime.',
        cards: {
          starter: { name: 'Starter', cta: 'Start free' },
          pro: { name: 'Pro', cta: 'Start free trial', recommended: 'Recommended' },
          enterprise: { name: 'Enterprise', cta: 'Contact us' },
        },
        billing: { monthly: 'Monthly', yearly: 'Yearly (save 20%)' },
        features: {
          starter: [
            { key: 'basic_ai', en: 'Basic AI assistant', fr: 'Assistant AI basique', es: 'Asistente de IA básico' },
            { key: 'essentials', en: 'Essential tools', fr: 'Outils essentiels', es: 'Herramientas esenciales' },
          ],
          pro: [
            { key: 'adv_ai', en: 'Advanced AI', fr: 'AI avancée', es: 'IA avanzada' },
            { key: 'automation', en: 'Automation', fr: 'Automatisation', es: 'Automatización' },
            { key: 'analytics', en: 'Analytics', fr: 'Analytique', es: 'Analítica' },
          ],
          enterprise: [
            { key: 'sla', en: 'Custom SLAs', fr: 'SLA personnalisés', es: 'SLA personalizados' },
            { key: 'seats', en: 'Team seats', fr: 'Licences équipe', es: 'Licencias de equipo' },
            { key: 'support', en: 'Priority support', fr: 'Support prioritaire', es: 'Soporte prioritario' },
          ],
        },
      },
      done: {
        title: 'All set!',
        subtitle: 'Your personalized dashboard is ready.',
        summaryTitle: 'Setup summary',
        cta: 'Go to dashboard',
        summary: {
          profile: 'Profile completed',
          niche: (n: string) => `Niche: ${n}`,
          goals: (n: number) => `Goals selected: ${n}`,
          platforms: (n: number) => `Platforms connected: ${n}`,
          ai: 'AI configured',
          plan: (p: string) => `Plan: ${p}`,
        },
      },
    },
    dashboard: {
      banner: {
        title: 'Resume your setup to unlock all features.',
        next: (step: string) => `Next: ${step}`,
        cta: (step: string) => `Continue to ${step}`,
      },
      steps: {
        profile: 'Profile',
        sellPlan: 'Sell Plan',
        activity: 'Your activity',
        platforms: 'Platforms',
        ai: 'AI Setup',
        plan: 'Choose plan',
      },
      progress: (done: number, total: number) => `${done}/${total} complete`,
    },
  },
  fr: {
    shell: {
      back: 'Précédent',
      continue: 'Continuer',
      skip: 'Ignorer pour le moment',
      stepOf: (step: number, total: number) => `Étape ${step} sur ${total}`,
    },
    steps: {
      profile: {
        title: 'Profil',
        subtitle: 'Commençons par personnaliser votre profil.',
        labels: {
          displayName: 'Nom d’affichage',
          bio: 'Bio',
          timezone: 'Fuseau horaire (auto)',
          language: 'Langue',
          accountType: 'Type de compte',
          frequency: 'Fréquence',
          consentTOS: 'J’accepte les Conditions et la Politique de confidentialité',
          consentEmails: 'Je souhaite recevoir des updates par email',
        },
      },
      activity: {
        title: 'Votre activité',
        subtitle: 'Parlez-nous de votre domaine et de ce que vous vendez.',
        labels: {
          goals: 'Objectifs',
          contentTypes: 'Types de contenu',
          revenueCurrent: 'Revenu mensuel actuel',
          revenueTarget: 'Revenu mensuel cible',
        },
        options: {
          goals: [
            { key: 'revenue', en: 'Revenue', fr: 'Revenu', es: 'Ingresos' },
            { key: 'engagement', en: 'Engagement', fr: 'Engagement', es: 'Engagement' },
            { key: 'growth', en: 'Audience growth', fr: 'Croissance audience', es: 'Crecimiento de audiencia' },
            { key: 'time_saving', en: 'Time saving', fr: 'Gain de temps', es: 'Ahorro de tiempo' },
          ],
          contentTypes: [
            { key: 'photos', en: 'Photos', fr: 'Photos', es: 'Fotos' },
            { key: 'videos', en: 'Videos', fr: 'Vidéos', es: 'Vídeos' },
            { key: 'live', en: 'Live', fr: 'Live', es: 'En vivo' },
            { key: 'messages', en: 'Messages', fr: 'Messages', es: 'Mensajes' },
            { key: 'posts', en: 'Posts', fr: 'Posts', es: 'Publicaciones' },
          ],
          niches: [
            { key: 'fitness', en: 'Fitness', fr: 'Fitness', es: 'Fitness' },
            { key: 'fashion', en: 'Fashion', fr: 'Mode', es: 'Moda' },
            { key: 'gaming', en: 'Gaming', fr: 'Gaming', es: 'Gaming' },
            { key: 'education', en: 'Education', fr: 'Éducation', es: 'Educación' },
          ],
        },
      },
      ai: {
        title: 'Configurez votre assistant AI',
        subtitle: 'Définissez la personnalité, le ton et le message d’accueil.',
        labels: {
          personality: 'Personnalité / nom de l’assistant',
          tone: 'Ton de conversation',
          monthlyPrice: 'Prix mensuel de l’abonnement ($)',
          welcome: 'Message de bienvenue (envoyé aux nouveaux fans)',
        },
      },
      platforms: {
        title: 'Connectez vos plateformes',
        subtitle: 'Pilotez tout depuis Huntaze et gagnez du temps.',
        states: { connect: 'Connecter', connected: 'Connecté', soon: 'Bientôt' },
      },
      plan: {
        title: 'Choisissez votre offre',
        subtitle: 'Essai gratuit 14 jours, modifiable à tout moment.',
        cards: {
          starter: { name: 'Starter', cta: 'Commencer gratuitement' },
          pro: { name: 'Pro', cta: 'Démarrer l’essai', recommended: 'Recommandé' },
          enterprise: { name: 'Enterprise', cta: 'Contactez-nous' },
        },
        billing: { monthly: 'Mensuel', yearly: 'Annuel (-20 %)' },
        features: {
          starter: [
            { key: 'basic_ai', en: 'Basic AI assistant', fr: 'Assistant AI basique', es: 'Asistente de IA básico' },
            { key: 'essentials', en: 'Essential tools', fr: 'Outils essentiels', es: 'Herramientas esenciales' },
          ],
          pro: [
            { key: 'adv_ai', en: 'Advanced AI', fr: 'AI avancée', es: 'IA avanzada' },
            { key: 'automation', en: 'Automation', fr: 'Automatisation', es: 'Automatización' },
            { key: 'analytics', en: 'Analytics', fr: 'Analytique', es: 'Analítica' },
          ],
          enterprise: [
            { key: 'sla', en: 'Custom SLAs', fr: 'SLA personnalisés', es: 'SLA personalizados' },
            { key: 'seats', en: 'Team seats', fr: 'Licences équipe', es: 'Licencias de equipo' },
            { key: 'support', en: 'Priority support', fr: 'Support prioritaire', es: 'Soporte prioritario' },
          ],
        },
      },
      done: {
        title: 'Tout est prêt !',
        subtitle: 'Votre tableau de bord personnalisé est prêt.',
        summaryTitle: 'Récapitulatif',
        cta: 'Accéder au tableau de bord',
        summary: {
          profile: 'Profil complété',
          niche: (n: string) => `Niche : ${n}`,
          goals: (n: number) => `Objectifs sélectionnés : ${n}`,
          platforms: (n: number) => `Plateformes connectées : ${n}`,
          ai: 'Assistant AI configuré',
          plan: (p: string) => `Offre : ${p}`,
        },
      },
    },
    dashboard: {
      banner: {
        title: 'Terminez votre configuration pour débloquer toutes les fonctionnalités.',
        next: (step: string) => `Étape suivante : ${step}`,
        cta: (step: string) => `Continuer vers ${step}`,
      },
      steps: {
        profile: 'Profil',
        sellPlan: 'Offre',
        activity: 'Votre activité',
        platforms: 'Plateformes',
        ai: 'Assistant AI',
        plan: 'Choisir une offre',
      },
      progress: (done: number, total: number) => `${done}/${total} terminées`,
    },
  },
  es: {
    shell: {
      back: 'Atrás',
      continue: 'Continuar',
      skip: 'Omitir por ahora',
      stepOf: (step: number, total: number) => `Paso ${step} de ${total}`,
    },
    steps: {
      profile: {
        title: 'Perfil',
        subtitle: 'Personalicemos tu perfil.',
        labels: {
          displayName: 'Nombre para mostrar',
          bio: 'Biografía',
          timezone: 'Zona horaria (auto)',
          language: 'Idioma',
          accountType: 'Tipo de cuenta',
          frequency: 'Frecuencia de contenido',
          consentTOS: 'Acepto los Términos y la Política de Privacidad',
          consentEmails: 'Deseo recibir novedades útiles por email',
        },
      },
      activity: {
        title: 'Tu actividad',
        subtitle: 'Cuéntanos tu sector y lo que piensas vender.',
        labels: {
          goals: 'Objetivos de negocio',
          contentTypes: 'Tipos de contenido',
          revenueCurrent: 'Ingresos mensuales actuales',
          revenueTarget: 'Meta de ingresos mensuales',
        },
        options: {
          goals: [
            { key: 'revenue', en: 'Revenue', fr: 'Revenu', es: 'Ingresos' },
            { key: 'engagement', en: 'Engagement', fr: 'Engagement', es: 'Engagement' },
            { key: 'growth', en: 'Audience growth', fr: 'Croissance audience', es: 'Crecimiento de audiencia' },
            { key: 'time_saving', en: 'Time saving', fr: 'Gain de temps', es: 'Ahorro de tiempo' },
          ],
          contentTypes: [
            { key: 'photos', en: 'Photos', fr: 'Photos', es: 'Fotos' },
            { key: 'videos', en: 'Videos', fr: 'Vidéos', es: 'Vídeos' },
            { key: 'live', en: 'Live', fr: 'Live', es: 'En vivo' },
            { key: 'messages', en: 'Messages', fr: 'Messages', es: 'Mensajes' },
            { key: 'posts', en: 'Posts', fr: 'Posts', es: 'Publicaciones' },
          ],
          niches: [
            { key: 'fitness', en: 'Fitness', fr: 'Fitness', es: 'Fitness' },
            { key: 'fashion', en: 'Fashion', fr: 'Mode', es: 'Moda' },
            { key: 'gaming', en: 'Gaming', fr: 'Gaming', es: 'Gaming' },
            { key: 'education', en: 'Education', fr: 'Éducation', es: 'Educación' },
          ],
        },
      },
      platforms: {
        title: 'Conecta tus plataformas',
        subtitle: 'Controla todo desde Huntaze y ahorra tiempo.',
        states: { connect: 'Conectar', connected: 'Conectado', soon: 'Próximamente' },
      },
      ai: {
        title: 'Configura tu asistente de IA',
        subtitle: 'Define la personalidad, el tono y el mensaje de bienvenida.',
        labels: {
          personality: 'Personalidad / nombre del asistente',
          tone: 'Tono de conversación',
          monthlyPrice: 'Precio de suscripción mensual ($)',
          welcome: 'Mensaje de bienvenida (para nuevos fans)',
        },
      },
      plan: {
        title: 'Elige tu plan',
        subtitle: 'Prueba gratis 14 días. Puedes cambiar en cualquier momento.',
        cards: {
          starter: { name: 'Starter', cta: 'Empezar gratis' },
          pro: { name: 'Pro', cta: 'Iniciar prueba gratis', recommended: 'Recomendado' },
          enterprise: { name: 'Enterprise', cta: 'Contáctanos' },
        },
        billing: { monthly: 'Mensual', yearly: 'Anual (ahorra 20%)' },
        features: {
          starter: [
            { key: 'basic_ai', en: 'Basic AI assistant', fr: 'Assistant AI basique', es: 'Asistente de IA básico' },
            { key: 'essentials', en: 'Essential tools', fr: 'Outils essentiels', es: 'Herramientas esenciales' },
          ],
          pro: [
            { key: 'adv_ai', en: 'Advanced AI', fr: 'AI avancée', es: 'IA avanzada' },
            { key: 'automation', en: 'Automation', fr: 'Automatisation', es: 'Automatización' },
            { key: 'analytics', en: 'Analytics', fr: 'Analytique', es: 'Analítica' },
          ],
          enterprise: [
            { key: 'sla', en: 'Custom SLAs', fr: 'SLA personnalisés', es: 'SLA personalizados' },
            { key: 'seats', en: 'Team seats', fr: 'Licences équipe', es: 'Licencias de equipo' },
            { key: 'support', en: 'Priority support', fr: 'Support prioritaire', es: 'Soporte prioritario' },
          ],
        },
      },
      done: {
        title: '¡Todo listo!',
        subtitle: 'Tu panel personalizado está preparado.',
        summaryTitle: 'Resumen de configuración',
        cta: 'Ir al panel',
        summary: {
          profile: 'Perfil completado',
          niche: (n: string) => `Nicho: ${n}`,
          goals: (n: number) => `Objetivos seleccionados: ${n}`,
          platforms: (n: number) => `Plataformas conectadas: ${n}`,
          ai: 'IA configurada',
          plan: (p: string) => `Plan: ${p}`,
        },
      },
    },
    dashboard: {
      banner: {
        title: 'Reanuda tu configuración para desbloquear todas las funciones.',
        next: (step: string) => `Siguiente: ${step}`,
        cta: (step: string) => `Continuar a ${step}`,
      },
      steps: {
        profile: 'Perfil',
        sellPlan: 'Oferta',
        activity: 'Tu actividad',
        platforms: 'Plataformas',
        ai: 'Config. IA',
        plan: 'Elegir plan',
      },
      progress: (done: number, total: number) => `${done}/${total} completados`,
    },
  },
} as const;

export function getCopy(locale: Locale = 'en') {
  return (ONBOARDING_COPY as any)[locale] ?? ONBOARDING_COPY.en;
}
