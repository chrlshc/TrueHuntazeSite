import type { Locale } from './copy'

export function pick(opt: { en: string; fr: string; es: string }, locale: Locale) {
  if (locale === 'fr') return opt.fr
  if (locale === 'es') return opt.es
  return opt.en
}

