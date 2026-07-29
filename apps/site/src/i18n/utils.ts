import { ui, defaultLang, htmlLang, type Lang } from './ui';

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function getHtmlLang(lang: Lang): string {
  return htmlLang[lang];
}

export function stripLocalePrefix(slug: string, locale: Lang): string {
  const prefix = `${locale}/`;
  return slug.startsWith(prefix) ? slug.slice(prefix.length) : slug;
}

export function pluralize(
  count: number,
  lang: Lang,
  oneKey: keyof (typeof ui)[typeof defaultLang],
  otherKey: keyof (typeof ui)[typeof defaultLang],
): string {
  const t = useTranslations(lang);
  return count === 1 ? t(oneKey) : t(otherKey);
}
