import { defaultLocale, locales, translations } from './translations';

import _ from 'lodash';

export function getLocaleFromUrl(url: URL): keyof typeof translations {
  const pathVariables = url.pathname.split('/');
  const locale =
    import.meta.env.BASE_URL !== undefined
      ? pathVariables[2]
      : pathVariables[1];

  if (locale in translations) {
    return locale as keyof typeof translations;
  }

  return defaultLocale;
}

export function useTranslations(locale: keyof typeof locales) {
  return translations[locale];
}

export function useTranslatedPath(locale: keyof typeof locales) {
  const base = import.meta.env.BASE_URL;

  return function translatePath(path: string, l: string = locale): string {
    return `${base}${l === defaultLocale ? path : `/${l}${path}`}`;
  };
}
