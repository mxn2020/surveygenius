// i18n configuration for SurveyGenius
const translations = {
    en: { appName: 'SurveyGenius', description: 'Designs optimal research surveys with reasoning' },
    de: { appName: 'SurveyGenius', description: 'Designs optimal research surveys with reasoning (DE)' },
} as const

export type Locale = keyof typeof translations
export const defaultLocale: Locale = 'en'
export const supportedLocales = Object.keys(translations) as Locale[]

export function t(key: keyof typeof translations.en, locale: Locale = defaultLocale): string {
    return translations[locale]?.[key] ?? translations.en[key] ?? key
}

export default translations
