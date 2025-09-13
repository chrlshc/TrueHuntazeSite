export type Locale = 'en' | 'fr' | 'es'

export function resolveLocale(param?: string | null): Locale {
  if (param === 'fr') return 'fr'
  if (param === 'es') return 'es'
  return 'en'
}
