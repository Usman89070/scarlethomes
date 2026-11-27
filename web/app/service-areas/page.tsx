import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Img from '@/components/Img';
import '@/styles/pages/service-areas.css';

export const metadata: Metadata = pageMetadata("/service-areas/");

export default function ServiceAreasPage() {
  return (
    <>
      <section className="sh-ph">
      <div className="sh-ph-bg">
        <Img src="/images/scarlet-homes-hero-duplex-dusk.jpg" alt="Modern duplex by Scarlet Homes" priority sizes="100vw" />
      </div>
      <div className="sh-wrap">
        <nav className="sh-bc rv" aria-label="Breadcrumb"><a href="/">Home</a><i /><span>Service Areas</span></nav>
        <span className="sh-eye rv">Where We Build</span>
        <h1>{"Building Across "}<em>Greater Sydney</em></h1>
        <p className="sh-lead rv d2">
          From our Hornsby base, we design and build custom homes, duplexes, knockdown rebuilds and granny flats throughout Greater Sydney.
        </p>
        <div className="sh-btns rv d3">
          <a className="sh-btn p" href="/contact/">
            {"Book a Free Consultation "}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
          <a className="sh-btn g" href="tel:1800727538">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
            </svg>
            {" 1800 727 538"}
          </a>
        </div>
      </div>
    </section>
      <section className="sh-sec">
      <div className="sh-wrap">
        <div className="sh-head c">
          <span className="sh-eye rv">Our Service Areas</span>
          <h2 className="rv d1">{"Find Your "}<em>Area</em></h2>
          <p className="sh-lead rv d2">Choose your area to see the homes we build, the suburbs we cover and how we can help.</p>
        </div>
        <div className="sh-areas-grid">
          <a className="sh-ac rvs d0" href="/home-builders-hornsby/">
            <Img src="/images/scarlet-homes-p-bold-french.jpg" alt="Hornsby and Upper North Shore home by Scarlet Homes" loading="lazy" />
            <small>Our home base</small>
            <h3>{"Hornsby & Upper North Shore"}</h3>
            <p>Hornsby, Waitara, Pennant Hills, Cherrybrook, Wahroonga and surrounds.</p>
            <span className="sh-link">
              {"Explore area "}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </a>
          <a className="sh-ac rvs d1" href="/home-builders-hills-district/">
            <Img src="/images/scarlet-homes-hero-nightfall.jpg" alt="The Hills District home by Scarlet Homes" loading="lazy" />
            <small>North West Sydney</small>
            <h3>The Hills District</h3>
            <p>Castle Hill, Kellyville, Rouse Hill, Box Hill, Bella Vista and surrounds.</p>
            <span className="sh-link">
              {"Explore area "}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </a>
          <a className="sh-ac rvs d0" href="/home-builders-parramatta/">
            <Img src="/images/scarlet-homes-pf-double-storey-box.jpg" alt="Parramatta home by Scarlet Homes" loading="lazy" />
            <small>Western Sydney</small>
            <h3>Parramatta</h3>
            <p>Parramatta, Westmead, Northmead, Granville, Toongabbie and surrounds.</p>
            <span className="sh-link">
              {"Explore area "}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </a>
          <a className="sh-ac rvs d1" href="/home-builders-leppington/">
            <Img src="/images/scarlet-homes-p-candling-rd.jpg" alt="Leppington home by Scarlet Homes" loading="lazy" />
            <small>South West Sydney</small>
            <h3>Leppington</h3>
            <p>Leppington, Austral, Edmondson Park, Oran Park, Gregory Hills and surrounds.</p>
            <span className="sh-link">
              {"Explore area "}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </a>
        </div>
      </div>
    </section>
      <section className="sh-sec sh-ivory">
      <div className="sh-wrap sh-split">
        <div className="sh-sp-img">
          <Img src="/images/scarlet-homes-in-ext-1.jpg" alt="Completed home built by Scarlet Homes" loading="lazy" direct />
          <span className="sh-sp2">
            <Img src="/images/scarlet-homes-in-feature-4.jpg" alt="Interior of a home built by Scarlet Homes" loading="lazy" />
          </span>
          <span className="tag">43A Florence St, Hornsby</span>
        </div>
        <div className="sh-sp-txt">
          <span className="sh-eye rv">Based in Hornsby</span>
          <h2 className="rv d1">{"One Local Team, "}<em>All of Sydney</em></h2>
          <p className="rv d1">
            Our office is at 43A Florence Street, Hornsby. From here, our directors work with homeowners right across Greater Sydney.
          </p>
          <p className="rv d2">
            Not sure if we build in your suburb? Give us a call and we will let you know straight away.
          </p>
          <ul className="sh-ck">
            <li className="rv d0">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              Free site check across Greater Sydney
            </li>
            <li className="rv d1">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              Director-led builds
            </li>
            <li className="rv d2">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              CDC or DA approvals managed
            </li>
            <li className="rv d3">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              Fixed-price contracts with full inclusions
            </li>
          </ul>
          <a className="sh-btn p rv" href="/contact/">
            {"Check My Block for Free "}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
      </div>
    </section>
      <section className="sh-sec sh-ivory">
      <div className="sh-wrap">
        <div className="sh-head c">
          <span className="sh-eye rv">What We Build</span>
          <h2 className="rv d1">{"What We Build Across "}<em>Sydney</em></h2>
          <p className="sh-lead rv d2">One builder for every kind of Sydney home.</p>
        </div>
        <div className="sh-cards">
          <div className="sh-cd rv d0">
            <span className="sh-cdi">
              <Img src="/images/scarlet-homes-hero-duplex-dusk.jpg" alt="Duplexes by Scarlet Homes" loading="lazy" />
            </span>
            <span className="num">01</span>
            <i>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="9" width="8" height="12" />
                <rect x="13" y="9" width="8" height="12" />
                <path d="M2 10l5-5 5 5 5-5 5 5" />
              </svg>
            </i>
            <h3>Duplexes</h3>
            <p>Two homes on one title, designed and approved for your block.</p>
            <a className="sh-link sh-cdl" href="/duplex-builders-sydney/">
              {"Learn more "}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>
          <div className="sh-cd rv d1">
            <span className="sh-cdi">
              <Img src="/images/scarlet-homes-svc-knockdown.jpg" alt="Knockdown Rebuilds by Scarlet Homes" loading="lazy" />
            </span>
            <span className="num">02</span>
            <i>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" /></svg>
            </i>
            <h3>Knockdown Rebuilds</h3>
            <p>A brand-new home without leaving the street you love.</p>
            <a className="sh-link sh-cdl" href="/knockdown-rebuild-sydney/">
              {"Learn more "}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>
          <div className="sh-cd rv d2">
            <span className="sh-cdi">
              <Img src="/images/scarlet-homes-svc-new-home.jpg" alt="New Homes by Scarlet Homes" loading="lazy" />
            </span>
            <span className="num">03</span>
            <i>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l3.5-1 12-12-2.5-2.5-12 12z" /><path d="M14 6l2.5 2.5" /></svg>
            </i>
            <h3>New Homes</h3>
            <p>Single or double storey, personalised to your family.</p>
            <a className="sh-link sh-cdl" href="/new-home-builders-sydney/">
              {"Learn more "}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>
          <div className="sh-cd rv d3">
            <span className="sh-cdi">
              <Img src="/images/scarlet-homes-svc-granny-flat.jpg" alt="Granny Flats by Scarlet Homes" loading="lazy" />
            </span>
            <span className="num">04</span>
            <i>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="11" rx="1" /><path d="M2 11l10-7 10 7" /></svg>
            </i>
            <h3>Granny Flats</h3>
            <p>A self-contained second home for family or rental income.</p>
            <a className="sh-link sh-cdl" href="/granny-flat-builders-sydney/">
              {"Learn more "}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
      <section className="sh-cta sh-ivory">
      <div className="sh-wrap">
        <div className="sh-cta-in rv">
          <Img src="/images/scarlet-homes-p-germein.jpg" alt="Germein home by Scarlet Homes" loading="lazy" direct sizes="100vw" />
          {"\n "}
          <div>
            <h2>Ready to Start Building Your Sydney Home?</h2>
            <p>
              Book a free, no-obligation consultation with our directors. We'll look at your block, talk through your ideas and give you an honest view of what's possible.
            </p>
          </div>
          {"\n "}
          <div className="sh-btns">
            <a className="sh-btn w" href="/contact/">
              {"Book a Free Consultation "}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            <a className="sh-btn g" href="tel:1800727538">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
              </svg>
              {" Call 1800 727 538"}
            </a>
          </div>
          {"\n"}
        </div>
      </div>
    </section>
      <section className="sh-igs">
      <div className="sh-igs-h">
        <span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r=".8" />
          </svg>
        </span>
        <div>
          <b>Follow our builds</b>
          <a href="https://www.instagram.com/scarlet.homes/" target="_blank" rel="noopener">@scarlet.homes</a>
        </div>
      </div>
      <div className="sh-igg">
        <a href="https://www.instagram.com/scarlet.homes/" target="_blank" rel="noopener" aria-label="Scarlet Homes on Instagram">
          <Img src="/images/scarlet-homes-in-kitchen-1.jpg" alt="Home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
          <i>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r=".8" />
            </svg>
          </i>
        </a>
        <a href="https://www.instagram.com/scarlet.homes/" target="_blank" rel="noopener" aria-label="Scarlet Homes on Instagram">
          <Img src="/images/scarlet-homes-in-ext-4.jpg" alt="Home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
          <i>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r=".8" />
            </svg>
          </i>
        </a>
        <a href="https://www.instagram.com/scarlet.homes/" target="_blank" rel="noopener" aria-label="Scarlet Homes on Instagram">
          <Img src="/images/scarlet-homes-in-bath-10.jpg" alt="Home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
          <i>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r=".8" />
            </svg>
          </i>
        </a>
        <a href="https://www.instagram.com/scarlet.homes/" target="_blank" rel="noopener" aria-label="Scarlet Homes on Instagram">
          <Img src="/images/scarlet-homes-in-living-3.jpg" alt="Home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
          <i>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r=".8" />
            </svg>
          </i>
        </a>
        <a href="https://www.instagram.com/scarlet.homes/" target="_blank" rel="noopener" aria-label="Scarlet Homes on Instagram">
          <Img src="/images/scarlet-homes-in-feature-6.jpg" alt="Home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
          <i>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r=".8" />
            </svg>
          </i>
        </a>
        <a href="https://www.instagram.com/scarlet.homes/" target="_blank" rel="noopener" aria-label="Scarlet Homes on Instagram">
          <Img src="/images/scarlet-homes-p-bold-box.jpg" alt="Home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
          <i>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r=".8" />
            </svg>
          </i>
        </a>
        <a href="https://www.instagram.com/scarlet.homes/" target="_blank" rel="noopener" aria-label="Scarlet Homes on Instagram">
          <Img src="/images/scarlet-homes-in-bath-12.jpg" alt="Home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
          <i>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r=".8" />
            </svg>
          </i>
        </a>
        <a href="https://www.instagram.com/scarlet.homes/" target="_blank" rel="noopener" aria-label="Scarlet Homes on Instagram">
          <Img src="/images/scarlet-homes-in-ext-2.jpg" alt="Home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
          <i>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r=".8" />
            </svg>
          </i>
        </a>
      </div>
    </section>
      <JsonLd path="/service-areas/" />
    </>
  );
}
