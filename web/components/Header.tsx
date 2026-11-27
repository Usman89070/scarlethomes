'use client';

/*
 * Site header (top bar, logo, desktop nav with dropdowns, phone + CTA, burger) and the
 * mobile menu (#sh-mnav). Rendered once from app/layout.tsx. Markup and classes are the
 * reference's; the active-page state (class "on" + aria-current) is computed from the URL
 * exactly as it was hard-coded on each reference page.
 */
import { usePathname } from 'next/navigation';
import Img from '@/components/Img';

const SERVICES = ["/duplex-builders-sydney/", "/knockdown-rebuild-sydney/", "/new-home-builders-sydney/", "/granny-flat-builders-sydney/"];
const AREAS = ["/home-builders-hornsby/", "/home-builders-hills-district/", "/home-builders-parramatta/", "/home-builders-leppington/"];

export default function Header() {
  const raw = usePathname() || '/';
  const path = raw.endsWith('/') ? raw : raw + '/';
  const on = (href: string) => (path === href ? 'on' : undefined);
  const current = (href: string) => (path === href ? ('page' as const) : undefined);
  const ddClass = (group: 'services' | 'areas') => {
    const list = group === 'services' ? SERVICES : [...AREAS, '/service-areas/'];
    return list.includes(path) ? 'sh-dd on' : 'sh-dd';
  };
  return (
    <>
      <div className="sh-hb" id="sh-hb">
        {"\n "}
        <div className="sh-top">
          <div className="sh-wrap">
            <div className="l">
              <span className="ad">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" />
                  <circle cx="12" cy="9" r="3" />
                </svg>
                43A Florence Street, Hornsby NSW 2077
              </span>
              <a href="mailto:info@scarlethomes.com.au">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                info@scarlethomes.com.au
              </a>
            </div>
            <div className="r">
              <a href="https://www.facebook.com/scarlethomes.au" target="_blank" rel="noopener" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" /></svg>
              </a>
              <a href="https://www.instagram.com/scarlet.homes/" target="_blank" rel="noopener" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r=".8" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@ScarletHomes-yy4no" target="_blank" rel="noopener" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3z" /></svg>
              </a>
            </div>
          </div>
        </div>
        {"\n "}
        <header className="sh-hdr">
          <div className="sh-wrap">
            {"\n  "}
            <a href="/" className="sh-logo" aria-label="Scarlet Homes home">
              <Img src="/images/scarlet-homes-logo.png" alt="Scarlet Homes" width={117} height={62} keepSize loading="lazy" />
            </a>
            {"\n  "}
            <nav aria-label="Main">
              <ul className="sh-nav">
                <li><a href="/" className={on("/")} aria-current={current("/")}>Home</a></li>
                <li className={ddClass("services")}>
                  <button type="button" className="sh-ddt" aria-haspopup="true">
                    {"Services "}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                  </button>
                  <div className="sh-ddm">
                    <div className="sh-ddh">What We Build</div>
                    <a href="/duplex-builders-sydney/" className={on("/duplex-builders-sydney/")} aria-current={current("/duplex-builders-sydney/")}>
                      <i>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="9" width="8" height="12" />
                          <rect x="13" y="9" width="8" height="12" />
                          <path d="M2 10l5-5 5 5 5-5 5 5" />
                        </svg>
                      </i>
                      <span><b>Duplexes</b><small>Two homes on one title</small></span>
                    </a>
                    <a href="/knockdown-rebuild-sydney/" className={on("/knockdown-rebuild-sydney/")} aria-current={current("/knockdown-rebuild-sydney/")}>
                      <i>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" /></svg>
                      </i>
                      <span><b>Knockdown Rebuild</b><small>New home, same street</small></span>
                    </a>
                    <a href="/new-home-builders-sydney/" className={on("/new-home-builders-sydney/")} aria-current={current("/new-home-builders-sydney/")}>
                      <i>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l3.5-1 12-12-2.5-2.5-12 12z" /><path d="M14 6l2.5 2.5" /></svg>
                      </i>
                      <span><b>New Homes</b><small>{"Single & double storey"}</small></span>
                    </a>
                    <a href="/granny-flat-builders-sydney/" className={on("/granny-flat-builders-sydney/")} aria-current={current("/granny-flat-builders-sydney/")}>
                      <i>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="11" rx="1" /><path d="M2 11l10-7 10 7" /></svg>
                      </i>
                      <span><b>Granny Flats</b><small>Family living or rental income</small></span>
                    </a>
                  </div>
                </li>
                <li className={ddClass("areas")}>
                  <a className="sh-ddt" href="/service-areas/" aria-current={current("/service-areas/")}>
                    {"Service Areas "}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                  </a>
                  <div className="sh-ddm">
                    <div className="sh-ddh">Where We Build</div>
                    <a href="/home-builders-hornsby/" className={on("/home-builders-hornsby/")} aria-current={current("/home-builders-hornsby/")}>
                      <i>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" />
                          <circle cx="12" cy="9" r="3" />
                        </svg>
                      </i>
                      <span><b>Hornsby</b><small>Upper North Shore</small></span>
                    </a>
                    <a href="/home-builders-hills-district/" className={on("/home-builders-hills-district/")} aria-current={current("/home-builders-hills-district/")}>
                      <i>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" />
                          <circle cx="12" cy="9" r="3" />
                        </svg>
                      </i>
                      <span><b>Hills District</b><small>Castle Hill to Box Hill</small></span>
                    </a>
                    <a href="/home-builders-parramatta/" className={on("/home-builders-parramatta/")} aria-current={current("/home-builders-parramatta/")}>
                      <i>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" />
                          <circle cx="12" cy="9" r="3" />
                        </svg>
                      </i>
                      <span><b>Parramatta</b><small>Western Sydney</small></span>
                    </a>
                    <a href="/home-builders-leppington/" className={on("/home-builders-leppington/")} aria-current={current("/home-builders-leppington/")}>
                      <i>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" />
                          <circle cx="12" cy="9" r="3" />
                        </svg>
                      </i>
                      <span><b>Leppington</b><small>South West Sydney</small></span>
                    </a>
                    <a className="sh-ddall" href="/service-areas/">
                      {"View all service areas "}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </a>
                  </div>
                </li>
                <li>
                  <a href="/projects/" className={on("/projects/")} aria-current={current("/projects/")}>Projects</a>
                </li>
                <li><a href="/about/" className={on("/about/")} aria-current={current("/about/")}>About</a></li>
                <li>
                  <a href="/contact/" className={on("/contact/")} aria-current={current("/contact/")}>Contact</a>
                </li>
              </ul>
            </nav>
            {"\n  "}
            <div className="sh-hcta">
              <a className="sh-phone" href="tel:1800727538" aria-label="Call the directors on 1800 727 538">
                <span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                  </svg>
                </span>
                <div><small>Call the directors</small><b>1800 727 538</b></div>
              </a>
              <a className="sh-btn p" href="/contact/">Free Consultation</a>
              {"\n  "}
              <button className="sh-burger" id="sh-burger" aria-label="Open menu" aria-expanded="false"><span /><span /><span /></button>
            </div>
            {"\n "}
          </div>
        </header>
        {"\n"}
      </div>
      <div className="sh-mnav" id="sh-mnav">
        <a className="i" href="/">
          {"Home "}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
        <a className="i" href="/duplex-builders-sydney/">
          {"Duplexes "}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
        <a className="i" href="/knockdown-rebuild-sydney/">
          {"Knockdown Rebuild "}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
        <a className="i" href="/new-home-builders-sydney/">
          {"New Homes "}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
        <a className="i" href="/granny-flat-builders-sydney/">
          {"Granny Flats "}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
        <a className="i" href="/projects/">
          {"Projects "}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
        <a className="i" href="/about/">
          {"About "}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
        <a className="i" href="/service-areas/">
          {"Service Areas "}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
        <div className="sh-mareas">
          <a href="/home-builders-hornsby/">Hornsby</a>
          <a href="/home-builders-hills-district/">Hills District</a>
          <a href="/home-builders-parramatta/">Parramatta</a>
          <a href="/home-builders-leppington/">Leppington</a>
        </div>
        <a className="i" href="/contact/">
          {"Contact "}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
        <a className="sh-btn p" href="tel:1800727538">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
          </svg>
          {" Call 1800 727 538"}
        </a>
        <div className="ct">43A Florence Street, Hornsby NSW 2077<br />info@scarlethomes.com.au</div>
      </div>
    </>
  );
}
