import type { LocaleTranslations } from './locales/types';
import _ from 'lodash';
import en from './locales/en';
import lv from './locales/lv';

export const defaultLocale = 'en';

export const locales = {
  en: 'English',
  lv: 'Latviešu',
};

export const translations: {
  [key in keyof typeof locales]: LocaleTranslations;
} = {
  en,
  lv: _.merge({}, en, lv),
} as const;
