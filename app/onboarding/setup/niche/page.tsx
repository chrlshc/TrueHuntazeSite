import { cookies } from 'next/headers'
import OnboardingSetupClient from '@/app/onboarding/setup/SetupClient'

export default function NicheStepPage() {
  const cookieStore = cookies()
  const onlyfansCookie = cookieStore.get('ops_platforms_onlyfans')
  const initialOnlyfansConnected = onlyfansCookie?.value === 'true'
  return (
    <OnboardingSetupClient initialOnlyfansConnected={initialOnlyfansConnected} forceStep="niche" navMode="route" />
  )
}

