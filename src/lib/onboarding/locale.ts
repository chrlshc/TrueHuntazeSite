export type Locale = 'en' | 'fr'

export function resolveLocale(param?: string | null): Locale {
  return param === 'fr' ? 'fr' : 'en'
}

