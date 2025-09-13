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
      },
      done: {
        title: 'All set!',
        subtitle: 'Your personalized dashboard is ready.',
        summaryTitle: 'Setup summary',
        cta: 'Go to dashboard',
      },
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
      },
      done: {
        title: 'Tout est prêt !',
        subtitle: 'Votre tableau de bord personnalisé est prêt.',
        summaryTitle: 'Récapitulatif',
        cta: 'Accéder au tableau de bord',
      },
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
      },
      done: {
        title: '¡Todo listo!',
        subtitle: 'Tu panel personalizado está preparado.',
        summaryTitle: 'Resumen de configuración',
        cta: 'Ir al panel',
      },
    },
  },
} as const;

export function getCopy(locale: Locale = 'en') {
  return (ONBOARDING_COPY as any)[locale] ?? ONBOARDING_COPY.en;
}
