/*
 * Responsive image: <picture> with WebP (desktop + mobile size) and the original file as
 * fallback, explicit width/height, lazy by default, fetchpriority="high" for the LCP image.
 * Variants are produced by scripts/optimize-images.mjs (manifest: data/images.json).
 * `direct` renders a bare <img> (WebP via srcset) where the reference CSS targets ".parent>img".
 */
import manifest from '@/data/images.json';

type Entry = { w: number; h: number; widths: number[] };
const M = manifest as Record<string, Entry>;

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  keepSize?: boolean;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  className?: string;
  direct?: boolean;
  sizes?: string;
};

export default function Img({ src, alt, width, height, keepSize, priority, loading, className, direct, sizes }: Props) {
  const name = src.replace(/^\/images\//, '');
  const m = M[name];
  if (!m) throw new Error('Image missing from data/images.json: ' + name);
  const base = name.replace(/\.(jpe?g|png)$/i, '');
  const srcSet = m.widths.map((w) => `/images/${base}-${w}.webp ${w}w`).join(', ');
  const sz = sizes || '(max-width: 700px) 100vw, 50vw';
  const common = {
    src,
    alt,
    width: keepSize ? width : m.w,
    height: keepSize ? height : m.h,
    className,
    decoding: 'async' as const,
    loading: priority ? undefined : loading || 'lazy',
    fetchPriority: priority ? ('high' as const) : undefined,
    'data-ar': keepSize ? undefined : '',
  };
  if (direct) return <img {...common} srcSet={srcSet} sizes={sz} />;
  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={sz} />
      <img {...common} />
    </picture>
  );
}
