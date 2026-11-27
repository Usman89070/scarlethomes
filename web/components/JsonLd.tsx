import seo from '@/data/seo.json';

type Seo = Record<string, { jsonld: unknown[] }>;

/** The page's original JSON-LD (BreadcrumbList, FAQPage, HomeAndConstructionBusiness, ...). */
export default function JsonLd({ path }: { path: string }) {
  const data = (seo as Seo)[path]?.jsonld || [];
  return (
    <>
      {data.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}
    </>
  );
}
