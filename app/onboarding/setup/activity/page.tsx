import { cookies } from 'next/headers'
import OnboardingSetupClient from '@/app/onboarding/setup/SetupClient'
import { resolveLocale } from '@/src/lib/onboarding/locale'

export default function ActivityStepPage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const cookieStore = cookies()
  const onlyfansCookie = cookieStore.get('ops_platforms_onlyfans')
  const initialOnlyfansConnected = onlyfansCookie?.value === 'true'
  const locale = resolveLocale(typeof searchParams?.locale === 'string' ? searchParams?.locale : undefined)
  return (
    <OnboardingSetupClient initialOnlyfansConnected={initialOnlyfansConnected} forceStep="niche" navMode="route" locale={locale} />
  )
}

