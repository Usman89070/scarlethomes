'use client';

/*
 * Fixed UI from the reference: call FAB, scroll progress bar, back-to-top, "View" cursor,
 * mobile action bar and the gallery lightbox. lib/legacy/site.js moves these (and the header)
 * into a body-level <div class="sh sh-pt"> portal so transforms never break position:fixed.
 * The lightbox label differs per page on the reference; the contact page has none.
 */
import { usePathname } from 'next/navigation';

const LIGHTBOX: Record<string, string | null> = {
  "/": "Photo gallery",
  "/duplex-builders-sydney/": "Project gallery",
  "/knockdown-rebuild-sydney/": "Project gallery",
  "/new-home-builders-sydney/": "Project gallery",
  "/granny-flat-builders-sydney/": "Photo gallery",
  "/projects/": "Project gallery",
  "/about/": "Project gallery",
  "/contact/": null,
  "/service-areas/": "Project gallery",
  "/home-builders-hornsby/": "Project gallery",
  "/home-builders-hills-district/": "Project gallery",
  "/home-builders-parramatta/": "Project gallery",
  "/home-builders-leppington/": "Project gallery"
};

export default function FixedUI() {
  const raw = usePathname() || '/';
  const path = raw.endsWith('/') ? raw : raw + '/';
  const label = path in LIGHTBOX ? LIGHTBOX[path] : 'Project gallery';
  return (
    <>
      <a className="sh-fab" href="tel:1800727538" aria-label="Call Scarlet Homes">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
        </svg>
      </a>
      <div className="sh-prog" aria-hidden="true" />
      <button className="sh-tt" aria-label="Back to top">
        <svg className="r" viewBox="0 0 66 66"><circle cx="33" cy="33" r="30" /></svg>
        <svg className="a" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </button>
      <div className="sh-cur" aria-hidden="true">View</div>
      <div className="sh-mbar" aria-label="Quick contact">
        <a className="c" href="tel:1800727538">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
          </svg>
          {" Call Now"}
        </a>
        <a className="q" href="/contact/">
          {"Free Quote "}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
      </div>
      {label ? (
        <div className="sh-lb" role="dialog" aria-label={label}>
        <button className="x" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
        <button className="pv" aria-label="Previous">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
        <img loading="lazy" decoding="async" alt="" />
        <div className="t" />
        <button className="nx" aria-label="Next">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
      </div>
      ) : null}
    </>
  );
}
