import { getCopy, type Locale } from '@/src/lib/onboarding/copy'
import { pick } from '@/src/lib/onboarding/i18n-utils'
import { useOnboarding as useOnboardingStore } from '@/hooks/useOnboarding'

export function useActivityOptions(locale: Locale) {
  const t = getCopy(locale)
  const storeGoals = useOnboardingStore((s: any) => s.options?.goals) as { key: string; label?: string }[] | undefined
  const storeContent = useOnboardingStore((s: any) => s.options?.contentTypes) as { key: string; label?: string }[] | undefined
  const storeNiches = useOnboardingStore((s: any) => s.options?.niches) as { key: string; label?: string }[] | undefined

  const goals = (storeGoals && storeGoals.length ? storeGoals : (t.steps as any).activity.options.goals)
    .map((o: any) => ({ key: o.key, label: 'label' in o ? o.label! : pick(o, locale) }))

  const contentTypes = (storeContent && storeContent.length ? storeContent : (t.steps as any).activity.options.contentTypes)
    .map((o: any) => ({ key: o.key, label: 'label' in o ? o.label! : pick(o, locale) }))

  const niches = (storeNiches && storeNiches.length ? storeNiches : (t.steps as any).activity.options.niches)
    .map((o: any) => ({ key: o.key, label: 'label' in o ? o.label! : pick(o, locale) }))

  return { goals, contentTypes, niches }
}

