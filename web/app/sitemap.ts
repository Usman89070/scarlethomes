import type { MetadataRoute } from 'next';
import seo from '@/data/seo.json';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(seo).map((p) => ({
    url: SITE_URL + p,
    changeFrequency: 'monthly',
    priority: p === '/' ? 1 : p.startsWith('/home-builders-') ? 0.7 : 0.8,
  }));
}
