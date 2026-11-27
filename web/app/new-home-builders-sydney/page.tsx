import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Img from '@/components/Img';
import '@/styles/pages/new-home-builders-sydney.css';

export const metadata: Metadata = pageMetadata("/new-home-builders-sydney/");

export default function NewHomeBuildersSydneyPage() {
  return (
    <>
      <section className="sh-ph">
      <div className="sh-ph-bg">
        <Img src="/images/scarlet-homes-p-bold-french.jpg" alt="Bold French double-storey home by Scarlet Homes" priority sizes="100vw" />
      </div>
      <div className="sh-wrap">
        <nav className="sh-bc rv" aria-label="Breadcrumb"><a href="/">Home</a><i /><span>New Home Builders Sydney</span></nav>
        <span className="sh-eye rv">New Home Builders · Greater Sydney</span>
        <h1>{"New Home Builders "}<em>Sydney</em></h1>
        <p className="sh-lead rv d2">
          Single or double storey, designed from scratch or from our four signature facade styles, and shaped around your block and your family.
        </p>
        <div className="sh-btns rv d3">
          <a className="sh-btn p" href="/contact/">
            {"Book a Free Consultation "}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
          <a className="sh-btn g" href="#estimator">Estimate Your Build Cost</a>
        </div>
      </div>
    </section>
      <section className="sh-sec ">
      <div className="sh-wrap sh-split">
        <div className="sh-sp-img">
          <Img src="/images/scarlet-homes-pf-9m-single-storey.jpg" alt="Single-storey modern home design for a 9 m frontage by Scarlet Homes" loading="lazy" direct />
          <span className="sh-sp2">
            <Img src="/images/scarlet-homes-in-feature-5.jpg" alt="Interior of a home built by Scarlet Homes" loading="lazy" />
          </span>
          <span className="tag">Single Storey · 9 m Frontage</span>
        </div>
        <div className="sh-sp-txt">
          <span className="sh-eye rv">Custom New Homes</span>
          <h2 className="rv d1">{"Your Home, "}<em>Built Your Way</em></h2>
          <p className="rv d1">
            Every Scarlet home is personalised. Start from one of our proven designs or a blank page, then change the layout, facade and finishes until it feels like yours.
          </p>
          <p className="rv d2">
            Guided by our philosophy, “Custom Homes for Your Simplicity”, we keep the process clear and transparent from the first sketch to the day you get your keys.
          </p>
          <ul className="sh-ck">
            <li className="rv d0">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              Single and double-storey homes
            </li>
            <li className="rv d1">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              Designs for narrow and wide frontages
            </li>
            <li className="rv d2">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              Four signature facade styles
            </li>
            <li className="rv d3">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </i>
              Fixed-price contract with full inclusions
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
        <div className="sh-head c" style={{ marginBottom: "44px" }}>
          <span className="sh-eye rv">Our Facade Styles</span>
          <h2 className="rv d1">{"Find the Look That Feels "}<em>Like Home</em></h2>
          <p className="sh-lead rv d2">Four signature facade styles, each fully customisable to your block, budget and taste.</p>
        </div>
        <div className="sh-tabs rv" role="tablist">
          <button className="sh-tab on" data-t="0" role="tab">Box Facade</button>
          <button className="sh-tab" data-t="1" role="tab">French Facade</button>
          <button className="sh-tab" data-t="2" role="tab">Modern Contemporary</button>
          <button className="sh-tab" data-t="3" role="tab">Traditional Full Brick</button>
        </div>
        <div className="sh-fp on" data-p="0">
          <figure>
            <Img src="/images/scarlet-homes-p-bold-box.jpg" alt="Bold Box Box Facade home by Scarlet Homes" loading="lazy" />
            <figcaption>Bold Box</figcaption>
          </figure>
          <div className="side">
            <figure>
              <Img src="/images/scarlet-homes-hero-nightfall.jpg" alt="Project Nightfall Box Facade home by Scarlet Homes" loading="lazy" />
              <figcaption>Project Nightfall</figcaption>
            </figure>
            <figure>
              <Img src="/images/scarlet-homes-svc-new-home.jpg" alt="Curvy Six Box Facade home by Scarlet Homes" loading="lazy" />
              <figcaption>Curvy Six</figcaption>
            </figure>
          </div>
        </div>
        <div className="sh-fp" data-p="1">
          <figure>
            <Img src="/images/scarlet-homes-hero-royal-delight.jpg" alt="Royal Delight French Facade home by Scarlet Homes" loading="lazy" />
            <figcaption>Royal Delight</figcaption>
          </figure>
          <div className="side">
            <figure>
              <Img src="/images/scarlet-homes-p-bold-french.jpg" alt="Bold French French Facade home by Scarlet Homes" loading="lazy" />
              <figcaption>Bold French</figcaption>
            </figure>
            <figure>
              <Img src="/images/scarlet-homes-p-bara-place.jpg" alt="Bara Place French Facade home by Scarlet Homes" loading="lazy" />
              <figcaption>Bara Place</figcaption>
            </figure>
          </div>
        </div>
        <div className="sh-fp" data-p="2">
          <figure>
            <Img src="/images/scarlet-homes-p-project-y.jpg" alt="Project Y Modern Contemporary home by Scarlet Homes" loading="lazy" />
            <figcaption>Project Y</figcaption>
          </figure>
          <div className="side">
            <figure>
              <Img src="/images/scarlet-homes-pf-hazelton.jpg" alt="Hazelton Modern Contemporary home by Scarlet Homes" loading="lazy" />
              <figcaption>Hazelton</figcaption>
            </figure>
            <figure>
              <Img src="/images/scarlet-homes-pf-simple-awesome.jpg" alt="Simple Awesome Modern Contemporary home by Scarlet Homes" loading="lazy" />
              <figcaption>Simple Awesome</figcaption>
            </figure>
          </div>
        </div>
        <div className="sh-fp" data-p="3">
          <figure>
            <Img src="/images/scarlet-homes-p-candling-rd.jpg" alt="117 Candling Rd, Leppington Traditional Full Brick home by Scarlet Homes" loading="lazy" />
            <figcaption>117 Candling Rd, Leppington</figcaption>
          </figure>
          <div className="side">
            <figure>
              <Img src="/images/scarlet-homes-pf-ridge-square.jpg" alt="Ridge Square Traditional Full Brick home by Scarlet Homes" loading="lazy" />
              <figcaption>Ridge Square</figcaption>
            </figure>
            <figure>
              <Img src="/images/scarlet-homes-pf-12m-full-brick.jpg" alt="12 m Frontage Full Brick Traditional Full Brick home by Scarlet Homes" loading="lazy" />
              <figcaption>12 m Frontage Full Brick</figcaption>
            </figure>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "50px" }} className="rv">
          <a className="sh-btn g" href="/projects/">
            {"Browse All 40 Designs "}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
      </div>
    </section>
      <section className="sh-sec " id="frontages">
      <div className="sh-wrap">
        <div className="sh-head c">
          <div>
            <span className="sh-eye rv">Designs for Every Block</span>
            <h2 className="rv d1">{"Homes for "}<em>Every Frontage</em></h2>
            <p className="sh-lead rv d2">Proven single and double-storey designs for some of Sydney's most common block widths.</p>
          </div>
        </div>
        <div className="sh-gal">
          <button type="button" className="sh-gi rvs d0" data-c="modern-contemporary" data-cn="Modern Contemporary" data-n="9 m Single Storey">
            <Img src="/images/scarlet-homes-pf-9m-single-storey.jpg" alt="9 m Single Storey Modern Contemporary home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Modern Contemporary</small><b>9 m Single Storey</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="traditional-full-brick" data-cn="Traditional Full Brick" data-n="10.5 m Single Storey">
            <Img src="/images/scarlet-homes-pf-10-5m-single-storey.jpg" alt="10.5 m Single Storey Traditional Full Brick home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Traditional Full Brick</small><b>10.5 m Single Storey</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="box-facade" data-cn="Box Facade" data-n="11 m Frontage">
            <Img src="/images/scarlet-homes-pf-11m-frontage.jpg" alt="11 m Frontage Box Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Box Facade</small><b>11 m Frontage</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="box-facade" data-cn="Box Facade" data-n="11 m Frontage Box">
            <Img src="/images/scarlet-homes-pf-11m-box-2.jpg" alt="11 m Frontage Box Box Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Box Facade</small><b>11 m Frontage Box</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="modern-contemporary" data-cn="Modern Contemporary" data-n="12 m Frontage">
            <Img src="/images/scarlet-homes-pf-12m-modern.jpg" alt="12 m Frontage Modern Contemporary home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Modern Contemporary</small><b>12 m Frontage</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="traditional-full-brick" data-cn="Traditional Full Brick" data-n="12 m Frontage Full Brick">
            <Img src="/images/scarlet-homes-pf-12m-full-brick.jpg" alt="12 m Frontage Full Brick Traditional Full Brick home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Traditional Full Brick</small><b>12 m Frontage Full Brick</b></span>
          </button>
        </div>
      </div>
    </section>
      <section className="sh-sec sh-ivory" id="inclusions">
      <div className="sh-wrap">
        <div className="sh-head c">
          <span className="sh-eye rv">Inclusion Series</span>
          <h2 className="rv d1">{"Choose Your "}<em>Inclusion Series</em></h2>
          <p className="sh-lead rv d2">
            From a simple, well-built starting point to a complete move-in-ready turnkey home. Pick the series that suits how involved you want to be.
          </p>
        </div>
        <div className="sh-series">
          <a className="sh-se rvs d0" href="#inclusions">
            <Img src="/images/scarlet-homes-pf-10-5m-single-storey.jpg" alt="Freedom series home by Scarlet Homes" loading="lazy" />
            <span><small>Single storey starter</small><b>Freedom</b></span>
          </a>
          <a className="sh-se rvs d1" href="#inclusions">
            <Img src="/images/scarlet-homes-pf-double-storey-box.jpg" alt="Standard series home by Scarlet Homes" loading="lazy" />
            <span><small>Double storey family</small><b>Standard</b></span>
          </a>
          <a className="sh-se rvs d2 hl" href="#inclusions">
            <Img src="/images/scarlet-homes-in-kitchen-2.jpg" alt="Premium series home by Scarlet Homes" loading="lazy" />
            <span><small>Turnkey · Most popular</small><b>Premium</b></span>
          </a>
          <a className="sh-se rvs d0" href="#inclusions">
            <Img src="/images/scarlet-homes-in-living-6.jpg" alt="BYO series home by Scarlet Homes" loading="lazy" />
            <span><small>Turnkey · Your choices</small><b>BYO</b></span>
          </a>
        </div>
        <div className="sh-inc rvs">
          <table>
            <thead>
              <tr>
                <th>Inclusion</th>
                <th><small>Series</small>Freedom</th>
                <th><small>Series</small>Standard</th>
                <th className="hl"><small>Turnkey · Most popular</small>Premium</th>
                <th><small>Turnkey</small>BYO</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>No. of storeys</td><td>1</td><td>2</td><td className="hl">2</td><td>2+</td></tr>
              <tr><td>Bedrooms</td><td>3</td><td>4</td><td className="hl">As per design</td><td>BYO</td></tr>
              <tr>
                <td>Full bathrooms</td>
                <td>2</td>
                <td>3</td>
                <td className="hl">As per design</td>
                <td>BYO</td>
              </tr>
              <tr><td>Powder room</td><td>1</td><td>1</td><td className="hl">As per design</td><td>BYO</td></tr>
              <tr>
                <td>Dining / living</td>
                <td>Integrated</td>
                <td>Open plan</td>
                <td className="hl">Open plan</td>
                <td>BYO</td>
              </tr>
              <tr>
                <td>Entry door</td>
                <td>900 solid</td>
                <td>1200 solid</td>
                <td className="hl">As per design</td>
                <td>BYO</td>
              </tr>
              <tr>
                <td>Internal doors</td>
                <td>720 hollow</td>
                <td>820 solid</td>
                <td className="hl">820 solid</td>
                <td>BYO</td>
              </tr>
              <tr>
                <td>Benchtop</td>
                <td>40 mm</td>
                <td>40 mm waterfall</td>
                <td className="hl">60 mm waterfall or shadow line</td>
                <td>BYO</td>
              </tr>
              <tr><td>Gyprock</td><td>10 mm</td><td>13 mm</td><td className="hl">13 mm</td><td>13 mm</td></tr>
              <tr>
                <td>Bathroom tiles</td>
                <td>Half tile</td>
                <td>Full tile</td>
                <td className="hl">Full tile</td>
                <td>Full tile</td>
              </tr>
              <tr>
                <td>Flooring</td>
                <td>600 mm tile or 7 mm hybrid</td>
                <td>1200 mm tile or 8 mm hybrid</td>
                <td className="hl">1200 mm tile or 9 mm hybrid</td>
                <td>BYO</td>
              </tr>
              <tr>
                <td>Kitchen</td>
                <td>600 mm appliance provision</td>
                <td>900 mm appliance provision</td>
                <td className="hl">900 mm appliances included</td>
                <td>BYO</td>
              </tr>
              <tr>
                <td>Pantry</td>
                <td>Store</td>
                <td>Half butler</td>
                <td className="hl">Full butler</td>
                <td>BYO</td>
              </tr>
              <tr><td>Garage</td><td>1</td><td>2</td><td className="hl">2</td><td>BYO</td></tr>
              <tr>
                <td>Designer visits</td>
                <td>1 online meeting</td>
                <td>Up to 2 online meetings</td>
                <td className="hl">Up to 4 online meetings</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>CDC / DA package</td>
                <td><span className="x">Not included</span></td>
                <td><span className="y">✓ Included</span></td>
                <td className="hl"><span className="y">✓ Included</span></td>
                <td><span className="y">✓ Included</span></td>
              </tr>
              <tr>
                <td>Certifier</td>
                <td><span className="x">Not included</span></td>
                <td><span className="y">✓ Included</span></td>
                <td className="hl"><span className="y">✓ Included</span></td>
                <td><span className="y">✓ Included</span></td>
              </tr>
              <tr>
                <td>Balcony</td>
                <td><span className="x">Not included</span></td>
                <td><span className="x">Not included</span></td>
                <td className="hl">As per design</td>
                <td>BYO</td>
              </tr>
              <tr>
                <td>Fencing</td>
                <td><span className="x">Not included</span></td>
                <td><span className="x">Not included</span></td>
                <td className="hl"><span className="y">✓ Included</span></td>
                <td><span className="y">✓ Included</span></td>
              </tr>
              <tr>
                <td>Driveway</td>
                <td><span className="x">Not included</span></td>
                <td><span className="x">Not included</span></td>
                <td className="hl"><span className="y">✓ Included</span></td>
                <td><span className="y">✓ Included</span></td>
              </tr>
              <tr>
                <td>Landscaping</td>
                <td><span className="x">Not included</span></td>
                <td><span className="x">Not included</span></td>
                <td className="hl"><span className="y">✓ Included</span></td>
                <td><span className="y">✓ Included</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="sh-note rv">
          Guide only. Inclusions vary by design and site. Ask us for the full inclusions list for your home.
        </p>
      </div>
    </section>
      <section className="sh-sec sh-est-sec" id="estimator">
      <div className="sh-wrap">
        <div className="sh-est rv">
          {"\n "}
          <div className="sh-est-l">
            <Img src="/images/scarlet-homes-p-project-53.jpg" alt="Project 53 home by Scarlet Homes" loading="lazy" />
            <span className="sh-eye">Home Price Estimator</span>
            <h2>{"What Will Your New Home "}<em style={{ color: "#fff" }}>Cost?</em></h2>
            <p>
              Choose single or double storey, your finish level (Standard, Premium or Luxury) and the size in square metres. You'll get an instant estimate. For an exact fixed price, book a free consultation.
            </p>
          </div>
          {"\n "}
          <form className="sh-form" id="sh-est-form">
            {"\n  "}
            <h3>Estimate your build</h3>
            <p>Takes 10 seconds. No sign-up needed.</p>
            {"\n  "}
            <div className="sh-field">
              <span className="t">Storeys</span>
              <div className="sh-seg">
                <input type="radio" name="sh-st" id="sh-st1" value="single" defaultChecked />
                <label htmlFor="sh-st1">Single</label>
                <input type="radio" name="sh-st" id="sh-st2" value="double" />
                <label htmlFor="sh-st2">Double</label>
              </div>
            </div>
            {"\n  "}
            <div className="sh-field">
              <span className="t">Finish level</span>
              <div className="sh-seg">
                <input type="radio" name="sh-fn" id="sh-fn1" value="standard" defaultChecked />
                <label htmlFor="sh-fn1">Standard</label>
                <input type="radio" name="sh-fn" id="sh-fn2" value="premium" />
                <label htmlFor="sh-fn2">Premium</label>
                <input type="radio" name="sh-fn" id="sh-fn3" value="luxury" />
                <label htmlFor="sh-fn3">Luxury</label>
              </div>
            </div>
            {"\n  "}
            <div className="sh-field">
              <label className="t" htmlFor="sh-sqm">Size (m²)</label>
              <div className="sh-range">
                <input type="range" id="sh-sqm" min="60" max="600" step="5" defaultValue="250" />
                <output id="sh-sqm-o">250 m²</output>
              </div>
            </div>
            {"\n  "}
            <button type="button" className="sh-btn p" id="sh-calc">
              {"Calculate My Estimate "}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
            {"\n  "}
            <div className="sh-result" id="sh-res" aria-live="polite">
              <small>Estimated build cost</small>
              <span className="v" id="sh-res-v" />
              <small>
                {"Indicative guide only. Excludes land, demolition and site costs. "}
                <a href="/contact/" style={{ color: "#fff", textDecoration: "underline" }}>Get your fixed price</a>
              </small>
            </div>
            {"\n "}
          </form>
          {"\n"}
        </div>
      </div>
    </section>
      <section className="sh-sec sh-dark">
      <div className="sh-wrap">
        <div className="sh-head split">
          <div>
            <span className="sh-eye rv">How We Build</span>
            <h2 className="rv d1">{"Your Home in "}<em>Five Clear Steps</em></h2>
          </div>
          <p className="sh-lead rv d2" style={{ maxWidth: "420px" }}>One team, one point of contact and a clear plan from your first meeting to handover.</p>
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
            <h3>Approvals</h3>
            <p>We manage CDC or council DA approval, plus demolition approval for knockdown rebuilds.</p>
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
            <span className="sh-eye rv">Inside Our Homes</span>
            <h2 className="rv d1">{"Quality You Can "}<em>See and Feel</em></h2>
            <p className="sh-lead rv d2" style={{ margin: "0" }}>
              Real photos from completed Scarlet homes, from feature staircases to resort-style bathrooms.
            </p>
          </div>
          <a className="sh-btn d rv d2" href="/projects/#interiors">
            {"See the Full Gallery "}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
        <div className="sh-gal mo">
          <button type="button" className="sh-gi rvs d0 big" data-c="entry-stairs" data-cn="Inside a Scarlet Home" data-n="Feature Staircase">
            <Img src="/images/scarlet-homes-in-feature-3.jpg" alt="Staircase and entry in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Feature Staircase</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="kitchens" data-cn="Inside a Scarlet Home" data-n="Kitchen">
            <Img src="/images/scarlet-homes-in-kitchen-2.jpg" alt="Kitchen in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Kitchen</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2 tall" data-c="bathrooms" data-cn="Inside a Scarlet Home" data-n="Bathroom">
            <Img src="/images/scarlet-homes-in-bath-6.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Bathroom</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="living" data-cn="Inside a Scarlet Home" data-n="Living">
            <Img src="/images/scarlet-homes-in-living-4.jpg" alt="Living area in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Living</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1 wide" data-c="completed-homes" data-cn="Inside a Scarlet Home" data-n="Completed Home">
            <Img src="/images/scarlet-homes-in-ext-2.jpg" alt="Completed home exterior built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Completed Home</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="living" data-cn="Inside a Scarlet Home" data-n="Living">
            <Img src="/images/scarlet-homes-in-living-7.jpg" alt="Living area in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Living</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="outdoor" data-cn="Inside a Scarlet Home" data-n="Balcony View">
            <Img src="/images/scarlet-homes-in-outdoor-3.jpg" alt="Alfresco and balcony in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Balcony View</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1 wide" data-c="bathrooms" data-cn="Inside a Scarlet Home" data-n="Bathroom">
            <Img src="/images/scarlet-homes-in-bath-9.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Bathroom</b></span>
          </button>
        </div>
      </div>
    </section>
      <section className="sh-sec sh-ivory">
      <div className="sh-wrap sh-faqg">
        <div>
          <span className="sh-eye rv">FAQs</span>
          <h2 className="rv d1">{"New Home Building: Your Questions "}<em>Answered</em></h2>
          <div className="sh-faqbox rv d2">
            <Img src="/images/scarlet-homes-pf-simple-awesome.jpg" alt="Home by Scarlet Homes" loading="lazy" />
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
            <summary>How much does it cost to build a house in Sydney?<i /></summary>
            <p>
              It depends on size, storeys, finishes and your site. Use our estimator for a quick guide, then book a free consultation for a fixed-price quote.
            </p>
          </details>
          <details className="rv">
            <summary>How long does it take to build a new home?<i /></summary>
            <p>
              Timeframes depend on the design and approvals. We give you a clear schedule before construction starts.
            </p>
          </details>
          <details className="rv">
            <summary>Can I change one of your designs?<i /></summary>
            <p>
              Yes. Every home is personalised. Change the layout, facade or finishes until it feels right for your family.
            </p>
          </details>
          <details className="rv">
            <summary>Do you build on narrow blocks?<i /></summary>
            <p>
              Yes. We have single and double-storey designs for a range of frontages, including narrower Sydney lots.
            </p>
          </details>
          <details className="rv">
            <summary>What is included in the price?<i /></summary>
            <p>
              Your fixed-price contract lists our full inclusions. Choose from our Freedom, Standard, Premium (turnkey) or BYO series.
            </p>
          </details>
        </div>
      </div>
    </section>
      <div className="sh-strip" aria-label="Photos from homes built by Scarlet Homes">
      <div className="row">
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
      <div className="row r">
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
      <JsonLd path="/new-home-builders-sydney/" />
    </>
  );
}
