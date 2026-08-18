/**
 * TEMA: Index Signatures y keyof typeof
 * Útil para configs, traducciones y mapeo dinámico type-safe.
 */

interface StringMap {
  [key: string]: string;
}

interface NumberRecord {
  [K in 'a' | 'b' | 'c']: number;
}

const translations = {
  es: { hello: 'Hola', bye: 'Adiós' },
  en: { hello: 'Hello', bye: 'Goodbye' },
} as const;

type Locale = keyof typeof translations;
type TranslationKey = keyof typeof translations['es'];

function t(locale: Locale, key: TranslationKey): string {
  return translations[locale][key];
}

// keyof en interfaces
interface Config {
  apiUrl: string;
  timeout: number;
  retries: number;
}

type ConfigKey = keyof Config; // 'apiUrl' | 'timeout' | 'retries'

function getConfigValue(config: Config, key: ConfigKey): Config[ConfigKey] {
  return config[key];
}

export { t, getConfigValue };
export type { Locale, TranslationKey, ConfigKey };
