import type { MetaDescriptor } from 'react-router';
import { SITE_URL } from '../data/clinicData';

export function createMeta(title: string, description: string, path = ''): MetaDescriptor[] {
  const canonical = `${SITE_URL}${path}`;

  return [
    { title },
    { name: 'description', content: description },
    { name: 'robots', content: 'index, follow' },
    { tagName: 'link', rel: 'canonical', href: canonical },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'ru_KZ' },
    { property: 'og:site_name', content: 'Perfect Dental' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonical },
    { property: 'og:image', content: `${SITE_URL}/images/brand/perfect-dental-logo.png` },
    { name: 'twitter:card', content: 'summary_large_image' },
  ];
}
