const BASE_URL = 'https://ycosmeticsurgery.com';

export function hreflangAlternates(path: string) {
  const enUrl = `${BASE_URL}${path}`;
  const esUrl = `${BASE_URL}/es${path}`;
  return {
    canonical: enUrl,
    languages: {
      'en': enUrl,
      'es': esUrl,
      'x-default': enUrl,
    } as Record<string, string>,
  };
}

export function hreflangAlternatesForLocale(path: string, locale: string) {
  const enUrl = `${BASE_URL}${path}`;
  const esUrl = `${BASE_URL}/es${path}`;
  return {
    canonical: locale === 'en' ? enUrl : esUrl,
    languages: {
      'en': enUrl,
      'es': esUrl,
      'x-default': enUrl,
    } as Record<string, string>,
  };
}
