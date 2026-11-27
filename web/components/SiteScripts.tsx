'use client';

import { useEffect } from 'react';
import { initMain, initRevealSafetyNet, initScrollArrows } from '@/lib/legacy/site';

/** Runs the reference's scripts once, after hydration, in the reference's order. */
export default function SiteScripts() {
  useEffect(() => {
    const w = window as unknown as { __shInit?: boolean };
    if (w.__shInit) return;
    w.__shInit = true;
    initMain();
    initRevealSafetyNet();
    initScrollArrows();
  }, []);
  return null;
}
