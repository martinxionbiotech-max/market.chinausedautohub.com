// Routing helpers for the MARKET i18n site. English (default) has no URL
// prefix; es/ru/ar live under /es/ /ru/ /ar/. Links are generated with Astro's
// getRelativeLocaleUrl so the prefix scheme stays in one place.
import { getRelativeLocaleUrl } from 'astro:i18n';
import {
  DEFAULT_LOCALE,
  LOCALES,
  NON_DEFAULT_LOCALES,
  localeDir,
  type Dir,
  type Locale,
} from '../i18n';

export { DEFAULT_LOCALE, LOCALES, NON_DEFAULT_LOCALES, localeDir };
export type { Dir, Locale };

export function isLocale(value: string): value is Locale {
  return LOCALES.some((l) => l.code === value);
}

// Resolve the locale for a request URL. Falls back to the default locale.
export function getLocale(url: URL): Locale {
  const seg = url.pathname.split('/').filter(Boolean)[0] ?? '';
  return isLocale(seg) && seg !== DEFAULT_LOCALE ? seg : DEFAULT_LOCALE;
}

// Strip any locale prefix from a pathname (returns a path relative to root).
export function stripLocalePrefix(pathname: string): string {
  let base = pathname;
  for (const code of NON_DEFAULT_LOCALES) {
    if (base === `/${code}/`) {
      base = '/';
      break;
    }
    if (base.startsWith(`/${code}/`)) {
      base = base.slice(code.length + 1);
      break;
    }
  }
  return base;
}

// Map a current page path (with or without locale prefix) to the equivalent
// path in `target`. Uses getRelativeLocaleUrl, which honours
// prefixDefaultLocale:false (English unprefixed).
export function localizedPath(pathname: string, target: Locale): string {
  const base = stripLocalePrefix(pathname);
  return getRelativeLocaleUrl(target, base);
}

// Build a localized internal link for a given root-relative path.
export function localizedUrl(path: string, locale: Locale): string {
  return getRelativeLocaleUrl(locale, path);
}
