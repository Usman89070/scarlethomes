/*
 * Site footer, rendered once from app/layout.tsx (last child of .sh-main, as on the reference).
 * Only change from the reference: "Contractor Login" points to /portal/ (was /login on the old site).
 */
import Img from '@/components/Img';

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="sh-ft">
      <div className="sh-wrap">
        {"\n "}
        <div className="sh-ft-g">
          {"\n  "}
          <div>
            <a href="/" className="flogo">
              <Img src="/images/scarlet-homes-logo.png" alt="Scarlet Homes" width={117} height={62} keepSize loading="lazy" />
            </a>
            <p>
              Sydney custom home builder for duplexes, knockdown rebuilds, new homes and granny flats. Fixed-price, director-led builds.
            </p>
            <div className="sh-soc">
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
          {"\n  "}
          <div>
            <h4>What We Build</h4>
            <ul>
              <li><a href="/duplex-builders-sydney/">Duplexes</a></li>
              <li><a href="/knockdown-rebuild-sydney/">Knockdown Rebuild</a></li>
              <li><a href="/new-home-builders-sydney/">New Homes</a></li>
              <li><a href="/granny-flat-builders-sydney/">Granny Flats</a></li>
            </ul>
          </div>
          {"\n  "}
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="/about/">About Us</a></li>
              <li><a href="/service-areas/" data-sa="1">Service Areas</a></li>
              <li><a href="/projects/">Projects</a></li>
              <li><a href="/#estimator">Price Estimator</a></li>
              <li><a href="/contact/">Contact</a></li>
            </ul>
          </div>
          {"\n  "}
          <div data-ul="1">
            <h4>User Login</h4>
            <ul>
              <li>
                <a className="sh-ulink" href="/portal/" data-cl="1" rel="nofollow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                  Contractor Login
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Get in Touch</h4>
            <ul className="ct">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                </svg>
                <a href="tel:1800727538">1800 727 538</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                <a href="mailto:info@scarlethomes.com.au">info@scarlethomes.com.au</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" />
                  <circle cx="12" cy="9" r="3" />
                </svg>
                <span>43A Florence Street,<br />Hornsby NSW 2077</span>
              </li>
            </ul>
          </div>
          {"\n "}
        </div>
        {"\n "}
        <div className="sh-ft-b">
          <span>© {YEAR} Scarlet Homes. All rights reserved.</span>
          <span>NSW Builder Licence No. [XXXXXX] · ABN [XX XXX XXX XXX]</span>
        </div>
        {"\n"}
      </div>
    </footer>
  );
}
