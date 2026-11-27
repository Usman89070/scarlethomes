import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Img from '@/components/Img';
import '@/styles/pages/home-builders-hills-district.css';

export const metadata: Metadata = pageMetadata("/home-builders-hills-district/");

export default function HomeBuildersHillsDistrictPage() {
  return (
    <>
      <section className="sh-ph">
      <div className="sh-ph-bg">
        <Img src="/images/scarlet-homes-hero-nightfall.jpg" alt="Project Nightfall home by Scarlet Homes" priority sizes="100vw" />
      </div>
      <div className="sh-wrap">
        <nav className="sh-bc rv" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <i />
          <a href="/service-areas/">Service Areas</a>
          <i />
          <span>Hills District</span>
        </nav>
        <span className="sh-eye rv">Service Area · The Hills District</span>
        <h1>{"Home Builders in the "}<em>Hills District</em></h1>
        <p className="sh-lead rv d2">
          Custom homes, duplexes, knockdown rebuilds and granny flats across The Hills District and North West Sydney.
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
      <section className="sh-sec ">
      <div className="sh-wrap sh-split">
        <div className="sh-sp-img">
          <Img src="/images/scarlet-homes-p-bold-box.jpg" alt="Bold Box home by Scarlet Homes" loading="lazy" direct />
          <span className="sh-sp2">
            <Img src="/images/scarlet-homes-in-living-4.jpg" alt="Interior of a home built by Scarlet Homes" loading="lazy" />
          </span>
          <span className="tag">Bold Box</span>
        </div>
        <div className="sh-sp-txt">
          <span className="sh-eye rv">North West Sydney</span>
          <h2 className="rv d1">{"Homes Designed for "}<em>Hills Living</em></h2>
          <p className="rv d1">
            From new estates in Box Hill and North Kellyville to established streets in Castle Hill and Baulkham Hills, we design homes that make the most of your block and suit how your family lives.
          </p>
          <p className="rv d2">
            Our directors are a short drive away in Hornsby, so you get hands-on, director-led service from your first site visit to handover.
          </p>
          <ul className="sh-ck">
            <li className="rv d0">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              Designs for new estates and established blocks
            </li>
            <li className="rv d1">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              Duplexes, rebuilds, new homes and granny flats
            </li>
            <li className="rv d2">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              CDC or DA approvals managed for you
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
          <h2 className="rv d1">{"What We Build in "}<em>The Hills</em></h2>
          <p className="sh-lead rv d2">One local builder for every kind of home.</p>
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
      <section className="sh-sec">
      <div className="sh-wrap">
        <div className="sh-head c">
          <span className="sh-eye rv">Suburbs We Cover</span>
          <h2 className="rv d1">{"Suburbs We Build In Across "}<em>The Hills</em></h2>
          <p className="sh-lead rv d2">Including The Hills District and North West Sydney:</p>
        </div>
        <div className="sh-chips rv">
          <span className="sh-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" />
              <circle cx="12" cy="9" r="3" />
            </svg>
            Castle Hill
          </span>
          <span className="sh-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" />
              <circle cx="12" cy="9" r="3" />
            </svg>
            Baulkham Hills
          </span>
          <span className="sh-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" />
              <circle cx="12" cy="9" r="3" />
            </svg>
            Kellyville
          </span>
          <span className="sh-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" />
              <circle cx="12" cy="9" r="3" />
            </svg>
            North Kellyville
          </span>
          <span className="sh-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" />
              <circle cx="12" cy="9" r="3" />
            </svg>
            Bella Vista
          </span>
          <span className="sh-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" />
              <circle cx="12" cy="9" r="3" />
            </svg>
            Norwest
          </span>
          <span className="sh-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" />
              <circle cx="12" cy="9" r="3" />
            </svg>
            Rouse Hill
          </span>
          <span className="sh-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" />
              <circle cx="12" cy="9" r="3" />
            </svg>
            Beaumont Hills
          </span>
          <span className="sh-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" />
              <circle cx="12" cy="9" r="3" />
            </svg>
            Box Hill
          </span>
          <span className="sh-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" />
              <circle cx="12" cy="9" r="3" />
            </svg>
            Glenhaven
          </span>
          <span className="sh-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" />
              <circle cx="12" cy="9" r="3" />
            </svg>
            West Pennant Hills
          </span>
          <span className="sh-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" />
              <circle cx="12" cy="9" r="3" />
            </svg>
            Dural
          </span>
        </div>
        <p className="sh-note rv" style={{ textAlign: "center", marginTop: "30px" }}>
          {"Don't see your suburb? "}
          <a href="tel:1800727538" style={{ color: "var(--red)", fontWeight: "700" }}>Call 1800 727 538</a>
          {" and we'll let you know."}
        </p>
      </div>
    </section>
      <section className="sh-sec sh-ivory" id="gallery">
      <div className="sh-wrap">
        <div className="sh-head split">
          <div>
            <span className="sh-eye rv">Featured Homes</span>
            <h2 className="rv d1">{"Homes for "}<em>The Hills District</em></h2>
            <p className="sh-lead rv d2" style={{ margin: "0" }}>A selection of designs from our portfolio.</p>
          </div>
          <a className="sh-btn d rv d2" href="/projects/">
            {"View All Projects "}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
        <div className="sh-gal">
          <button type="button" className="sh-gi rvs d0" data-c="box-facade" data-cn="Box Facade" data-n="Bold Box">
            <Img src="/images/scarlet-homes-p-bold-box.jpg" alt="Bold Box Box Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Box Facade</small><b>Bold Box</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="box-facade" data-cn="Box Facade" data-n="Project Nightfall">
            <Img src="/images/scarlet-homes-hero-nightfall.jpg" alt="Project Nightfall Box Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Box Facade</small><b>Project Nightfall</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="box-facade" data-cn="Box Facade" data-n="Curvy Six">
            <Img src="/images/scarlet-homes-svc-new-home.jpg" alt="Curvy Six Box Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Box Facade</small><b>Curvy Six</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="modern-contemporary" data-cn="Modern Contemporary" data-n="Project Y">
            <Img src="/images/scarlet-homes-p-project-y.jpg" alt="Project Y Modern Contemporary home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Modern Contemporary</small><b>Project Y</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="box-facade" data-cn="Box Facade" data-n="Split Box">
            <Img src="/images/scarlet-homes-p-split-box.jpg" alt="Split Box Box Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Box Facade</small><b>Split Box</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="modern-contemporary" data-cn="Modern Contemporary" data-n="Pomfret Ave">
            <Img src="/images/scarlet-homes-pf-pomfret-ave.jpg" alt="Pomfret Ave Modern Contemporary home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Modern Contemporary</small><b>Pomfret Ave</b></span>
          </button>
        </div>
      </div>
    </section>
      <section className="sh-sec sh-ivory">
      <div className="sh-wrap sh-faqg">
        <div>
          <span className="sh-eye rv">FAQs</span>
          <h2 className="rv d1">{"Building in Hills District: Your Questions "}<em>Answered</em></h2>
          <div className="sh-faqbox rv d2">
            <Img src="/images/scarlet-homes-pf-levade.jpg" alt="Home by Scarlet Homes" loading="lazy" />
            <b>Still have questions?</b>
            <p>Talk directly with our directors. No call centre, no pressure.</p>
            <a className="sh-btn w" href="tel:1800727538">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
              </svg>
              {" 1800 727 538"}
            </a>
          </div>
        </div>
        <div className="sh-faq">
          <details className="rv" open>
            <summary>Do you build in the Hills District?<i /></summary>
            <p>
              Yes. We build throughout The Hills District and North West Sydney, including Castle Hill, Kellyville, Rouse Hill and Box Hill.
            </p>
          </details>
          <details className="rv">
            <summary>Can I build a duplex on my block in the Hills District?<i /></summary>
            <p>
              It depends on your zoning, lot size and frontage under The Hills Shire Council's planning controls and the NSW housing codes. We check your block for free and explain your options.
            </p>
          </details>
          <details className="rv">
            <summary>Do you handle approvals with The Hills Shire Council?<i /></summary>
            <p>
              Yes. We manage your approval from start to finish, whether that is a complying development certificate (CDC) through a private certifier or a development application (DA) with council.
            </p>
          </details>
          <details className="rv">
            <summary>How much does it cost to build a home in the Hills District?<i /></summary>
            <p>
              It depends on size, storeys, finishes and your site. Use our estimator for a quick guide, then book a free consultation for a fixed-price quote.
            </p>
          </details>
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
      <JsonLd path="/home-builders-hills-district/" />
    </>
  );
}
