import type { Metadata } from 'next';
import seo from '@/data/seo.json';
import { SITE_NAME, SITE_URL } from '@/lib/site';

type Entry = { title: string; description: string; image?: string | null };

/** Title + description copied from the reference (reference/seo.json), canonical on the production domain. */
export function pageMetadata(path: string): Metadata {
  const e = (seo as Record<string, Entry>)[path];
  if (!e) throw new Error('No SEO entry for ' + path);
  const url = SITE_URL + path;
  const images = e.image ? [{ url: SITE_URL + e.image }] : undefined;
  return {
    title: { absolute: e.title },
    description: e.description,
    alternates: { canonical: url },
    openGraph: { type: 'website', locale: 'en_US', url, siteName: SITE_NAME, title: e.title, description: e.description, images },
    twitter: { card: 'summary_large_image', title: e.title, description: e.description, images: images?.map((i) => i.url) },
    robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  };
}
