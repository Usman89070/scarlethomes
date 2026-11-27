import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Img from '@/components/Img';
import '@/styles/pages/knockdown-rebuild-sydney.css';

export const metadata: Metadata = pageMetadata("/knockdown-rebuild-sydney/");

export default function KnockdownRebuildSydneyPage() {
  return (
    <>
      <section className="sh-ph">
      <div className="sh-ph-bg">
        <Img src="/images/scarlet-homes-svc-knockdown.jpg" alt="Knockdown rebuild new home by Scarlet Homes" priority sizes="100vw" />
      </div>
      <div className="sh-wrap">
        <nav className="sh-bc rv" aria-label="Breadcrumb"><a href="/">Home</a><i /><span>Knockdown Rebuild Sydney</span></nav>
        <span className="sh-eye rv">Knockdown Rebuild · Greater Sydney</span>
        <h1>{"Knockdown Rebuild "}<em>Sydney</em></h1>
        <p className="sh-lead rv d2">
          Love your street but not your house? We manage the demolition, approvals and construction so you get a brand-new home without leaving your suburb.
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
          <Img src="/images/scarlet-homes-pf-hazelton.jpg" alt="Hazelton modern contemporary home by Scarlet Homes" loading="lazy" />
          <span className="sh-sp2">
            <Img src="/images/scarlet-homes-in-living-7.jpg" alt="Interior of a home built by Scarlet Homes" loading="lazy" />
          </span>
          <span className="tag">Hazelton</span>
        </div>
        <div className="sh-sp-txt">
          <span className="sh-eye rv">New Home, Same Street</span>
          <h2 className="rv d1">{"A Brand-New Home, "}<em>Same Great Street</em></h2>
          <p className="rv d1">
            A knockdown rebuild replaces an older home with a new one designed around how you live today. You keep the location, schools, neighbours and community you love, and gain a home built to current standards.
          </p>
          <p className="rv d2">
            We manage every stage: demolition approval, design, CDC or DA approval, construction and handover, with our directors involved throughout.
          </p>
          <ul className="sh-ck">
            <li className="rv d0">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              Demolition approval managed
            </li>
            <li className="rv d1">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              Designed for your block and lifestyle
            </li>
            <li className="rv d2">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              Fixed-price contract with full inclusions
            </li>
            <li className="rv d3">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              Regular site updates from start to finish
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
            <span className="sh-eye rv">Why Knock Down and Rebuild</span>
            <h2 className="rv d1">{"Why Families Choose to "}<em>Rebuild</em></h2>
          </div>
          <p className="sh-lead rv d2">For many older homes, starting fresh is the smarter path.</p>
        </div>
        <div className="sh-cards">
          <div className="sh-cd rv d0">
            <span className="sh-cdi">
              <Img src="/images/scarlet-homes-in-ext-2.jpg" alt="Home built by Scarlet Homes" loading="lazy" />
            </span>
            <span className="num">01</span>
            <i>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
            </i>
            <h3>Stay where you love</h3>
            <p>Keep your street, schools and neighbours while upgrading everything else.</p>
          </div>
          <div className="sh-cd rv d1">
            <span className="sh-cdi">
              <Img src="/images/scarlet-homes-in-feature-1.jpg" alt="Home built by Scarlet Homes" loading="lazy" />
            </span>
            <span className="num">02</span>
            <i>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
            </i>
            <h3>Fewer hidden surprises</h3>
            <p>Avoid the structural unknowns that often appear mid-renovation.</p>
          </div>
          <div className="sh-cd rv d2">
            <span className="sh-cdi">
              <Img src="/images/scarlet-homes-in-living-3.jpg" alt="Home built by Scarlet Homes" loading="lazy" />
            </span>
            <span className="num">03</span>
            <i>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l3.5-1 12-12-2.5-2.5-12 12z" /><path d="M14 6l2.5 2.5" /></svg>
            </i>
            <h3>Designed around you</h3>
            <p>A new layout that suits how your family lives today.</p>
          </div>
          <div className="sh-cd rv d3">
            <span className="sh-cdi">
              <Img src="/images/scarlet-homes-in-ext-5.jpg" alt="Home built by Scarlet Homes" loading="lazy" />
            </span>
            <span className="num">04</span>
            <i>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 4 13c0-6 7-10 16-10 0 9-4 16-10 16" />
                <path d="M4 20c4-4 7-7 11-10" />
              </svg>
            </i>
            <h3>Built to today's standards</h3>
            <p>New construction that meets current NSW building and energy requirements.</p>
          </div>
        </div>
      </div>
    </section>
      <section className="sh-sec ">
      <div className="sh-wrap sh-split rev">
        <div className="sh-sp-img">
          <Img src="/images/scarlet-homes-pf-21-delight.jpg" alt="21 Delight French facade home by Scarlet Homes" loading="lazy" />
          <span className="sh-sp2">
            <Img src="/images/scarlet-homes-in-kitchen-3.jpg" alt="Interior of a home built by Scarlet Homes" loading="lazy" />
          </span>
          <span className="tag">21 Delight</span>
        </div>
        <div className="sh-sp-txt">
          <span className="sh-eye rv">Rebuild vs Renovate</span>
          <h2 className="rv d1">{"Is a Knockdown Rebuild "}<em>Cheaper</em>{" Than Renovating?"}</h2>
          <p className="rv d1">
            Often, yes, for older homes that need major work. Renovations are limited by the existing structure and can uncover costly problems once walls come down.
          </p>
          <p className="rv d2">
            A rebuild gives you a new home designed from scratch, with a fixed-price contract that lists our full inclusions, so the price you sign is the price you pay.
          </p>
          <ul className="sh-ck">
            <li className="rv d0">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              New layout, not a compromise
            </li>
            <li className="rv d1">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              Fixed price, full inclusions
            </li>
            <li className="rv d2">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              Built to current standards
            </li>
            <li className="rv d3">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              One builder for demolition to handover
            </li>
          </ul>
          <a className="sh-btn p rv" href="/contact/">
            {"Book a Free Consultation "}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
      </div>
    </section>
      <section className="sh-sec sh-dark">
      <div className="sh-wrap">
        <div className="sh-head split">
          <div>
            <span className="sh-eye rv">How a Rebuild Works</span>
            <h2 className="rv d1">{"Your Rebuild in "}<em>Five Clear Steps</em></h2>
          </div>
          <p className="sh-lead rv d2" style={{ maxWidth: "420px" }}>We handle the complexity so you can focus on designing your new home.</p>
        </div>
        <ol className="sh-steps">
          <li className="rv d0">
            <span className="sh-sti">
              <Img src="/images/scarlet-homes-in-living-2.jpg" alt="Living area in a Scarlet home" loading="lazy" />
            </span>
            <span className="n">01</span>
            <h3>Free consultation</h3>
            <p>
              We meet at your block or our Hornsby office, talk through your goals and budget, and check what your site allows.
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
            <h3>Demolition and approvals</h3>
            <p>We manage demolition approval and your CDC or council DA as one coordinated package.</p>
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
      <section className="sh-sec " id="gallery">
      <div className="sh-wrap">
        <div className="sh-head split">
          <div>
            <span className="sh-eye rv">Rebuild-Ready Designs</span>
            <h2 className="rv d1">{"Homes Worth "}<em>Moving Back Into</em></h2>
            <p className="sh-lead rv d2" style={{ margin: "0" }}>A selection of homes from our portfolio.</p>
          </div>
          <a className="sh-btn d rv d2" href="/projects/">
            {"View All Projects "}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
        <div className="sh-gal">
          <button type="button" className="sh-gi rvs d0" data-c="french-facade" data-cn="French Facade" data-n="Royal Delight">
            <Img src="/images/scarlet-homes-hero-royal-delight.jpg" alt="Royal Delight French Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>French Facade</small><b>Royal Delight</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="box-facade" data-cn="Box Facade" data-n="Duncan">
            <Img src="/images/scarlet-homes-svc-knockdown.jpg" alt="Duncan Box Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Box Facade</small><b>Duncan</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="french-facade" data-cn="French Facade" data-n="Gribbin Rd, Leppington">
            <Img src="/images/scarlet-homes-p-gribbin-rd.jpg" alt="Gribbin Rd, Leppington French Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>French Facade</small><b>Gribbin Rd, Leppington</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="traditional-full-brick" data-cn="Traditional Full Brick" data-n="117 Candling Rd, Leppington">
            <Img src="/images/scarlet-homes-p-candling-rd.jpg" alt="117 Candling Rd, Leppington Traditional Full Brick home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Traditional Full Brick</small><b>117 Candling Rd, Leppington</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="french-facade" data-cn="French Facade" data-n="Ferunga">
            <Img src="/images/scarlet-homes-p-ferunga.jpg" alt="Ferunga French Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>French Facade</small><b>Ferunga</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="french-facade" data-cn="French Facade" data-n="Neighbor">
            <Img src="/images/scarlet-homes-pf-neighbor.jpg" alt="Neighbor French Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>French Facade</small><b>Neighbor</b></span>
          </button>
        </div>
      </div>
    </section>
      <section className="sh-sec ">
      <div className="sh-wrap">
        <div className="sh-head split">
          <div>
            <span className="sh-eye rv">Your New Home</span>
            <h2 className="rv d1">{"What Your Rebuild "}<em>Could Look Like</em></h2>
            <p className="sh-lead rv d2" style={{ margin: "0" }}>Real photos from homes we've built across Sydney.</p>
          </div>
          <a className="sh-btn d rv d2" href="/projects/#interiors">
            {"See the Full Gallery "}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
        <div className="sh-gal mo">
          <button type="button" className="sh-gi rvs d0 big" data-c="completed-homes" data-cn="Inside a Scarlet Home" data-n="Completed Home">
            <Img src="/images/scarlet-homes-in-ext-5.jpg" alt="Completed home exterior built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Completed Home</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="living" data-cn="Inside a Scarlet Home" data-n="Living">
            <Img src="/images/scarlet-homes-in-living-2.jpg" alt="Living area in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Living</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2 tall" data-c="entry-stairs" data-cn="Inside a Scarlet Home" data-n="Entry & Stairs">
            <Img src="/images/scarlet-homes-in-feature-1.jpg" alt="Staircase and entry in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>{"Entry & Stairs"}</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="kitchens" data-cn="Inside a Scarlet Home" data-n="Kitchen">
            <Img src="/images/scarlet-homes-in-kitchen-4.jpg" alt="Kitchen in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Kitchen</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1 wide" data-c="bathrooms" data-cn="Inside a Scarlet Home" data-n="Bathroom">
            <Img src="/images/scarlet-homes-in-bath-3.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Bathroom</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="bedrooms" data-cn="Inside a Scarlet Home" data-n="Bedroom">
            <Img src="/images/scarlet-homes-in-bed-3.jpg" alt="Bedroom in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Bedroom</b></span>
          </button>
        </div>
      </div>
    </section>
      <section className="sh-sec sh-ivory">
      <div className="sh-wrap sh-faqg">
        <div>
          <span className="sh-eye rv">FAQs</span>
          <h2 className="rv d1">{"Knockdown Rebuild: Your Questions "}<em>Answered</em></h2>
          <div className="sh-faqbox rv d2">
            <Img src="/images/scarlet-homes-pf-neighbor.jpg" alt="Home by Scarlet Homes" loading="lazy" />
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
            <summary>Is a knockdown rebuild cheaper than renovating?<i /></summary>
            <p>
              Often, yes, for older homes that need major work. You get a new home built to current standards, with no hidden structural surprises from the old house.
            </p>
          </details>
          <details className="rv">
            <summary>Do I need approval to demolish my house?<i /></summary>
            <p>
              Yes. Demolition needs approval, which can often be included in a CDC or DA. We manage it as part of your build.
            </p>
          </details>
          <details className="rv">
            <summary>Where will I live during the build?<i /></summary>
            <p>
              Most clients rent nearby or stay with family. We give you a clear schedule up front so you can plan ahead.
            </p>
          </details>
          <details className="rv">
            <summary>How long does a knockdown rebuild take?<i /></summary>
            <p>
              Timeframes depend on demolition, design and approvals. We give you a clear schedule before work starts.
            </p>
          </details>
          <details className="rv">
            <summary>Can I build a duplex instead of a single home?<i /></summary>
            <p>Often, yes, if your block qualifies. We check this for free during your consultation.</p>
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
          <Img src="/images/scarlet-homes-p-germein.jpg" alt="Germein home by Scarlet Homes" loading="lazy" sizes="100vw" />
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
      <JsonLd path="/knockdown-rebuild-sydney/" />
    </>
  );
}
