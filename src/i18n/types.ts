export type Lang = 'en' | 'bn';

/** A piece of text written in both site languages. */
export type L = { en: string; bn: string };

export const LANGS: { id: Lang; label: string; short: string }[] = [
  { id: 'en', label: 'English', short: 'EN' },
  { id: 'bn', label: 'বাংলা', short: 'বাং' },
];
