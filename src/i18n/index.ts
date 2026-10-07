// i18n registry for the MARKET sub-site. Dictionary layer = single source of
// translated UI strings. English is the default locale (no URL prefix);
// es/ru/ar live under /es/ /ru/ /ar/. Data layer (shared/data/*.json) stays
// English — translation is applied at the render layer only.
import en from './en.json';
import es from './es.json';
import ru from './ru.json';
import ar from './ar.json';

export const LOCALES = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'es', label: 'Español', dir: 'ltr' },
  { code: 'ru', label: 'Русский', dir: 'ltr' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
] as const;

export type Locale = (typeof LOCALES)[number]['code'];
export type Dir = 'ltr' | 'rtl';

export const DEFAULT_LOCALE: Locale = 'en';
export const NON_DEFAULT_LOCALES: Locale[] = ['es', 'ru', 'ar'];

export function isLocale(value: string): value is Locale {
  return LOCALES.some((l) => l.code === value);
}

export function localeDir(locale: string): Dir {
  return LOCALES.find((l) => l.code === locale)?.dir ?? 'ltr';
}

export function localeLabel(locale: string): string {
  return LOCALES.find((l) => l.code === locale)?.label ?? locale;
}

// Dictionary is loosely typed — the JSON files are the contract.
export interface Dictionary {
  site: { name: string; tagline: string };
  nav: Record<string, string>;
  lang: Record<string, string>;
  common: Record<string, string>;
  breadcrumb: Record<string, string>;
  regions: Record<string, string>;
  sourceNote: Record<string, string>;
  applicability: Record<string, string>;
  confidence: {
    heading: string;
    intro: string;
    labels: Record<string, string>;
    legend: Record<string, string>;
  };
  country: {
    title: string;
    description: string;
    metaLine: string;
    disclaimer: string;
    sections: Record<string, string>;
    reviewHints: Record<string, string>;
    misc: Record<string, string>;
  };
  vehicle: {
    title: string;
    description: string;
    metaLine: string;
    disclaimer: string;
    quickFacts: Record<string, string>;
    verdict: Record<string, string>;
    sections: Record<string, string>;
    powertrain: Record<string, string>;
    driveFit: Record<string, string>;
    ageFit: Record<string, string>;
    decision: Record<string, string>;
    risks: Record<string, string>;
    checklist: Record<string, string>;
    misc: Record<string, string>;
  };
  footer: Record<string, string>;
  plurals: Record<string, Record<string, string>>;
}

const dictionaries: Record<string, Dictionary> = { en, es, ru, ar };

export function getTranslations(locale: string): Dictionary {
  return dictionaries[locale] ?? en;
}

// Look up a dotted key (e.g. "country.sections.marketOverview") walking the
// full path. Returns the string, or the raw key when missing (a missing
// translation is visible, never a silent crash).
function lookup(dict: Dictionary, key: string): string | undefined {
  let node: unknown = dict;
  for (const part of key.split('.')) {
    if (node && typeof node === 'object' && part in (node as Record<string, unknown>)) {
      node = (node as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return typeof node === 'string' ? node : undefined;
}

// Interpolate {placeholder} tokens from a values record.
export function t(
  dict: Dictionary,
  key: string,
  values?: Record<string, string | number>,
): string {
  const template = lookup(dict, key) ?? key;
  if (!values) return template;
  return template.replace(/\{(\w+)\}/g, (m, name) =>
    values[name] !== undefined ? String(values[name]) : m,
  );
}

// Plural-aware interpolation using Intl.PluralRules. The dictionary stores
// category → template under `plurals.<key>` (e.g. "one", "few", "many",
// "other"); templates use a {count} placeholder.
export function plural(
  locale: string,
  key: string,
  count: number,
  dict: Dictionary,
): string {
  const forms = dict.plurals[key];
  if (!forms) return String(count);
  let category: string;
  try {
    category = new Intl.PluralRules(locale).select(count);
  } catch {
    category = count === 1 ? 'one' : 'other';
  }
  const template = forms[category] ?? forms['other'] ?? forms['one'] ?? String(count);
  return template.replaceAll('{count}', String(count.toLocaleString(locale)));
}

export default getTranslations;
