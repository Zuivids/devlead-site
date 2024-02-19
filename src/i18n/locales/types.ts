import type en from './en';

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type LocaleTranslations = typeof en;

export type PartialLocaleTranslations = DeepPartial<LocaleTranslations>;
