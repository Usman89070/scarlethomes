import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Img from '@/components/Img';
import '@/styles/pages/granny-flat-builders-sydney.css';

export const metadata: Metadata = pageMetadata("/granny-flat-builders-sydney/");

export default function GrannyFlatBuildersSydneyPage() {
  return (
    <>
      <section className="sh-ph">
      <div className="sh-ph-bg">
        <Img src="/images/scarlet-homes-svc-granny-flat.jpg" alt="Granny flat built by Scarlet Homes" priority sizes="100vw" />
      </div>
      <div className="sh-wrap">
        <nav className="sh-bc rv" aria-label="Breadcrumb"><a href="/">Home</a><i /><span>Granny Flat Builders Sydney</span></nav>
        <span className="sh-eye rv">Granny Flat Builders · Greater Sydney</span>
        <h1>{"Granny Flat Builders "}<em>Sydney</em></h1>
        <p className="sh-lead rv d2">
          Add a self-contained second dwelling for family, guests or rental income. We take care of design, approval and construction in your backyard.
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
          <Img src="/images/scarlet-homes-pf-mini-build.jpg" alt="Mini Build single-storey home by Scarlet Homes" loading="lazy" direct />
          <span className="sh-sp2">
            <Img src="/images/scarlet-homes-in-bed-2.jpg" alt="Interior of a home built by Scarlet Homes" loading="lazy" />
          </span>
          <span className="tag">Mini Build</span>
        </div>
        <div className="sh-sp-txt">
          <span className="sh-eye rv">Secondary Dwellings</span>
          <h2 className="rv d1">{"More Space. More Income. "}<em>Same Address.</em></h2>
          <p className="rv d1">
            A granny flat (secondary dwelling) is a self-contained home on the same lot as your main house, with its own kitchen, bathroom and living space.
          </p>
          <p className="rv d2">
            We design, approve and build granny flats across Greater Sydney, with the same fixed-price, director-led approach we bring to every home.
          </p>
          <ul className="sh-ck">
            <li className="rv d0">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              Custom layouts to suit your backyard
            </li>
            <li className="rv d1">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              CDC or DA approval managed
            </li>
            <li className="rv d2">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              Finishes to complement your main home
            </li>
            <li className="rv d3">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              Fixed price with full inclusions
            </li>
          </ul>
          <a className="sh-btn p rv" href="/contact/">
            {"Book a Free Consultation "}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
      </div>
    </section>
      <section className="sh-sec sh-ivory">
      <div className="sh-wrap">
        <div className="sh-head c">
          <div>
            <span className="sh-eye rv">Why Add a Granny Flat</span>
            <h2 className="rv d1">{"Make Your Backyard "}<em>Work Harder</em></h2>
          </div>
          <p className="sh-lead rv d2">A well-designed granny flat adds flexibility for years to come.</p>
        </div>
        <div className="sh-cards">
          <div className="sh-cd rv d0">
            <span className="sh-cdi">
              <Img src="/images/scarlet-homes-in-living-5.jpg" alt="Home built by Scarlet Homes" loading="lazy" />
            </span>
            <span className="num">01</span>
            <i>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .8-3 2s1.2 1.7 3 2 3 .9 3 2.1-1.3 1.9-3 1.9c-1.5 0-2.6-.6-3-1.6M12 6v2M12 16v2" />
              </svg>
            </i>
            <h3>Rental income</h3>
            <p>A self-contained second home can help pay down your mortgage.</p>
          </div>
          <div className="sh-cd rv d1">
            <span className="sh-cdi">
              <Img src="/images/scarlet-homes-in-kitchen-4.jpg" alt="Home built by Scarlet Homes" loading="lazy" />
            </span>
            <span className="num">02</span>
            <i>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="8" r="3.5" />
                <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" />
                <circle cx="17" cy="9" r="2.5" />
                <path d="M17 14c3 0 5 2 5 5" />
              </svg>
            </i>
            <h3>Family close by</h3>
            <p>Room for ageing parents or adult children, with privacy for everyone.</p>
          </div>
          <div className="sh-cd rv d2">
            <span className="sh-cdi">
              <Img src="/images/scarlet-homes-in-outdoor-3.jpg" alt="Home built by Scarlet Homes" loading="lazy" />
            </span>
            <span className="num">03</span>
            <i>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
              </svg>
            </i>
            <h3>Home office or studio</h3>
            <p>A dedicated space to work, create or host guests.</p>
          </div>
          <div className="sh-cd rv d3">
            <span className="sh-cdi">
              <Img src="/images/scarlet-homes-in-bed-1.jpg" alt="Home built by Scarlet Homes" loading="lazy" />
            </span>
            <span className="num">04</span>
            <i>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m3 17 6-6 4 4 8-8" /><path d="M14 7h7v7" /></svg>
            </i>
            <h3>Added property value</h3>
            <p>A quality second dwelling can add value to your property.</p>
          </div>
        </div>
      </div>
    </section>
      <section className="sh-sec ">
      <div className="sh-wrap sh-split rev">
        <div className="sh-sp-img">
          <Img src="/images/scarlet-homes-pf-10-5m-single-storey.jpg" alt="Single-storey traditional home design by Scarlet Homes" loading="lazy" direct />
          <span className="sh-sp2">
            <Img src="/images/scarlet-homes-in-bath-8.jpg" alt="Interior of a home built by Scarlet Homes" loading="lazy" />
          </span>
          <span className="tag">Single Storey Design</span>
        </div>
        <div className="sh-sp-txt">
          <span className="sh-eye rv">Approvals</span>
          <h2 className="rv d1">{"Do I Need Council Approval for a "}<em>Granny Flat?</em></h2>
          <p className="rv d1">
            Many granny flats in NSW can be approved as complying development if the lot meets size, frontage and setback rules. Others need a development application through council.
          </p>
          <p className="rv d2">
            In NSW, a granny flat is generally limited to 60 m² of internal floor area. We confirm what your block allows during your free consultation and manage the approval for you.
          </p>
          <ul className="sh-ck">
            <li className="rv d0">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              Lot size and setback check
            </li>
            <li className="rv d1">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              CDC or DA pathway advice
            </li>
            <li className="rv d2">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              Approval documents prepared and lodged
            </li>
          </ul>
          <a className="sh-btn p rv" href="/contact/">
            {"Check My Block for Free "}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
      </div>
    </section>
      <section className="sh-sec sh-dark">
      <div className="sh-wrap">
        <div className="sh-head split">
          <div>
            <span className="sh-eye rv">How We Build</span>
            <h2 className="rv d1">{"Your Granny Flat in "}<em>Five Clear Steps</em></h2>
          </div>
          <p className="sh-lead rv d2" style={{ maxWidth: "420px" }}>A simple, transparent process with one point of contact.</p>
        </div>
        <ol className="sh-steps">
          <li className="rv d0">
            <span className="sh-sti">
              <Img src="/images/scarlet-homes-in-living-2.jpg" alt="Living area in a Scarlet home" loading="lazy" />
            </span>
            <span className="n">01</span>
            <h3>Free site check</h3>
            <p>
              We visit your property, look at access and space, and talk through how you will use the granny flat.
            </p>
          </li>
          <li className="rv d1">
            <span className="sh-sti">
              <Img src="/images/scarlet-homes-process.jpg" alt="Architectural house plans" loading="lazy" />
            </span>
            <span className="n">02</span>
            <h3>Design and quote</h3>
            <p>We draft your plans and give you a detailed, fixed-price quote with full inclusions.</p>
          </li>
          <li className="rv d2">
            <span className="sh-sti">
              <Img src="/images/scarlet-homes-pf-12m-modern.jpg" alt="Home design ready for approval" loading="lazy" />
            </span>
            <span className="n">03</span>
            <h3>Approvals</h3>
            <p>We manage CDC or council DA approval for your secondary dwelling.</p>
          </li>
          <li className="rv d3">
            <span className="sh-sti">
              <Img src="/images/scarlet-homes-knockdown-rebuild.jpg" alt="Home under construction" loading="lazy" />
            </span>
            <span className="n">04</span>
            <h3>Construction</h3>
            <p>Your build starts with regular site updates and a single point of contact.</p>
          </li>
          <li className="rv d0">
            <span className="sh-sti">
              <Img src="/images/scarlet-homes-in-ext-4.jpg" alt="Completed home ready for handover" loading="lazy" />
            </span>
            <span className="n">05</span>
            <h3>Handover</h3>
            <p>
              We walk through your finished home together, hand you the keys and stay on call for warranty support.
            </p>
          </li>
        </ol>
      </div>
    </section>
      <section className="sh-sec ">
      <div className="sh-wrap">
        <div className="sh-head split">
          <div>
            <span className="sh-eye rv">Our Finishes</span>
            <h2 className="rv d1">{"Quality Finishes, "}<em>Inside and Out</em></h2>
            <p className="sh-lead rv d2" style={{ margin: "0" }}>The same finishes we use in our homes, from kitchens to bathrooms.</p>
          </div>
          <a className="sh-btn d rv d2" href="/projects/#interiors">
            {"See the Full Gallery "}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
        <div className="sh-gal mo">
          <button type="button" className="sh-gi rvs d0 big" data-c="kitchens" data-cn="Inside a Scarlet Home" data-n="Kitchen">
            <Img src="/images/scarlet-homes-in-kitchen-1.jpg" alt="Kitchen in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Kitchen</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="living" data-cn="Inside a Scarlet Home" data-n="Living">
            <Img src="/images/scarlet-homes-in-living-5.jpg" alt="Living area in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Living</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2 tall" data-c="bathrooms" data-cn="Inside a Scarlet Home" data-n="Bathroom">
            <Img src="/images/scarlet-homes-in-bath-4.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Bathroom</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="bedrooms" data-cn="Inside a Scarlet Home" data-n="Bedroom">
            <Img src="/images/scarlet-homes-in-bed-1.jpg" alt="Bedroom in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Bedroom</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1 wide" data-c="outdoor" data-cn="Inside a Scarlet Home" data-n="Alfresco">
            <Img src="/images/scarlet-homes-in-outdoor-1.jpg" alt="Alfresco and balcony in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Alfresco</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="living" data-cn="Inside a Scarlet Home" data-n="Living">
            <Img src="/images/scarlet-homes-in-living-1.jpg" alt="Living area in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Living</b></span>
          </button>
        </div>
      </div>
    </section>
      <section className="sh-sec sh-ivory">
      <div className="sh-wrap sh-faqg">
        <div>
          <span className="sh-eye rv">FAQs</span>
          <h2 className="rv d1">{"Granny Flats: Your Questions "}<em>Answered</em></h2>
          <div className="sh-faqbox rv d2">
            <Img src="/images/scarlet-homes-pf-mini-build.jpg" alt="Home by Scarlet Homes" loading="lazy" />
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
            <summary>Do I need council approval for a granny flat?<i /></summary>
            <p>
              Many granny flats in NSW can be approved as complying development if the lot meets size and setback rules. We confirm this during your free consultation.
            </p>
          </details>
          <details className="rv">
            <summary>How big can a granny flat be?<i /></summary>
            <p>
              In NSW, a granny flat (secondary dwelling) is generally limited to 60 m² of internal floor area, depending on your council's rules. We confirm what your lot allows.
            </p>
          </details>
          <details className="rv">
            <summary>Can I rent out my granny flat?<i /></summary>
            <p>
              Granny flats in NSW can generally be rented out. We recommend checking any council conditions that apply to your property.
            </p>
          </details>
          <details className="rv">
            <summary>How long does it take to build a granny flat?<i /></summary>
            <p>
              Timeframes depend on the design and approvals. We give you a clear schedule before construction starts.
            </p>
          </details>
        </div>
      </div>
    </section>
      <div className="sh-strip" aria-label="Photos from homes built by Scarlet Homes">
      <div className="row">
        <Img src="/images/scarlet-homes-in-living-6.jpg" alt="Living area in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-ext-2.jpg" alt="Completed home exterior built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-bath-1.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-kitchen-2.jpg" alt="Kitchen in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-feature-3.jpg" alt="Staircase and entry in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-living-8.jpg" alt="Living area in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-bed-2.jpg" alt="Bedroom in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-outdoor-1.jpg" alt="Alfresco and balcony in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-bath-9.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-ext-6.jpg" alt="Completed home exterior built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-living-6.jpg" alt="Living area in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-ext-2.jpg" alt="Completed home exterior built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-bath-1.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-kitchen-2.jpg" alt="Kitchen in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-feature-3.jpg" alt="Staircase and entry in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-living-8.jpg" alt="Living area in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-bed-2.jpg" alt="Bedroom in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-outdoor-1.jpg" alt="Alfresco and balcony in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-bath-9.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-ext-6.jpg" alt="Completed home exterior built by Scarlet Homes" loading="lazy" sizes="100vw" />
      </div>
      <div className="row r">
        <Img src="/images/scarlet-homes-in-kitchen-1.jpg" alt="Kitchen in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-living-1.jpg" alt="Living area in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-bath-5.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-ext-4.jpg" alt="Completed home exterior built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-bed-1.jpg" alt="Bedroom in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-feature-4.jpg" alt="Staircase and entry in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-living-3.jpg" alt="Living area in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-outdoor-2.jpg" alt="Alfresco and balcony in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-bath-7.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-kitchen-3.jpg" alt="Kitchen in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-kitchen-1.jpg" alt="Kitchen in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-living-1.jpg" alt="Living area in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-bath-5.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-ext-4.jpg" alt="Completed home exterior built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-bed-1.jpg" alt="Bedroom in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-feature-4.jpg" alt="Staircase and entry in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-living-3.jpg" alt="Living area in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-outdoor-2.jpg" alt="Alfresco and balcony in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-bath-7.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
        <Img src="/images/scarlet-homes-in-kitchen-3.jpg" alt="Kitchen in a home built by Scarlet Homes" loading="lazy" sizes="100vw" />
      </div>
    </div>
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
      <JsonLd path="/granny-flat-builders-sydney/" />
    </>
  );
}
