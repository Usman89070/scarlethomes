'use client';

import { useEffect } from 'react';
import { pageScripts } from '@/lib/legacy/pages';

/** Page-only inline scripts. Child effects run before SiteScripts, as on the reference. */
export default function PageScripts({ page }: { page: string }) {
  useEffect(() => {
    const w = window as unknown as Record<string, boolean>;
    const k = '__shPage_' + page;
    if (w[k]) return;
    w[k] = true;
    (pageScripts as Record<string, () => void>)[page]?.();
  }, [page]);
  return null;
}
