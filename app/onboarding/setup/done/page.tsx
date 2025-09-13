import OnboardingSetupClient from '@/app/onboarding/setup/SetupClient'
import { resolveLocale } from '@/src/lib/onboarding/locale'

export default function DonePage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const locale = resolveLocale(typeof searchParams?.locale === 'string' ? searchParams?.locale : undefined)
  return (
    <OnboardingSetupClient initialOnlyfansConnected={false} forceStep="complete" navMode="route" locale={locale} />
  )
}

