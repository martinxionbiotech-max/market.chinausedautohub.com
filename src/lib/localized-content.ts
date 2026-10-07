// Render-layer per-locale country content mapping. The English editorial
// content lives in content.ts (countryContent) and remains the single source of
// truth. es/ru/ar translations live in src/i18n/countries/{locale}.json keyed by
// country_id; when a country or field is missing, we fall back to English.
import esCountries from '../i18n/countries/es.json';
import ruCountries from '../i18n/countries/ru.json';
import arCountries from '../i18n/countries/ar.json';
import { countryContent, type CountryContent } from './content';

const localized: Record<string, Record<string, Partial<CountryContent>>> = {
  es: esCountries as Record<string, Partial<CountryContent>>,
  ru: ruCountries as Record<string, Partial<CountryContent>>,
  ar: arCountries as Record<string, Partial<CountryContent>>,
};

// Returns localized editorial content for a country, falling back to English
// per field. Numbers/rates live in the data layer and are never translated.
export function getCountryContent(countryId: string, locale: string): CountryContent | undefined {
  const en = countryContent[countryId];
  if (!en) return undefined;
  if (locale === 'en') return en;
  const loc = localized[locale]?.[countryId];
  if (!loc) return en;
  return {
    overview: loc.overview ?? en.overview,
    considerations: loc.considerations ?? en.considerations,
    faq: loc.faq ?? en.faq,
    popularModelIds: en.popularModelIds,
    evNote: loc.evNote ?? en.evNote,
    suvNote: loc.suvNote ?? en.suvNote,
    commonBrands: en.commonBrands,
    brandsSource: en.brandsSource,
    recommendSummary: loc.recommendSummary ?? en.recommendSummary,
    recommendedCharacteristics: loc.recommendedCharacteristics ?? en.recommendedCharacteristics,
    marketRisks: loc.marketRisks ?? en.marketRisks,
  };
}
