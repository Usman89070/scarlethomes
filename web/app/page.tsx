import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Img from '@/components/Img';
import '@/styles/pages/index.css';

export const metadata: Metadata = pageMetadata("/");

export default function HomePage() {
  return (
    <>
      <section className="sh-hero" id="sh-hero">
      {"\n "}
      <div className="sh-sl on" data-name="Royal Delight">
        <Img src="/images/scarlet-homes-hero-royal-delight.jpg" alt="French facade home by Scarlet Homes" priority sizes="100vw" />
      </div>
      <div className="sh-sl" data-name="Modern Duplex">
        <Img src="/images/scarlet-homes-hero-duplex-dusk.jpg" alt="Modern double-storey duplex by Scarlet Homes lit at dusk" loading="lazy" sizes="100vw" />
      </div>
      <div className="sh-sl" data-name="Project Nightfall">
        <Img src="/images/scarlet-homes-hero-nightfall.jpg" alt="Project Nightfall modern home by Scarlet Homes" loading="lazy" sizes="100vw" />
      </div>
      {"\n "}
      <div className="sh-sl" data-name="Bold Box">
        <Img src="/images/scarlet-homes-p-bold-box.jpg" alt="Bold Box facade home by Scarlet Homes" loading="lazy" sizes="100vw" />
      </div>
      <div className="sh-sl" data-name="Completed Home">
        <Img src="/images/scarlet-homes-in-ext-4.jpg" alt="Completed home built by Scarlet Homes" loading="lazy" sizes="100vw" />
      </div>
      <div className="sh-sl" data-name="Bold French">
        <Img src="/images/scarlet-homes-p-bold-french.jpg" alt="Bold French facade home by Scarlet Homes" loading="lazy" sizes="100vw" />
      </div>
      <div className="sh-wrap">
        {"\n  "}
        <span className="sh-eye rv">Licensed NSW Builder · Hornsby</span>
        {"\n  "}
        <h1 className="rv d1">{"Custom Home Builders in "}<em>Sydney</em></h1>
        {"\n  "}
        <p className="sh-lead rv d2">
          Duplexes, knockdown rebuilds, new homes and granny flats, designed around you and built by a team that answers your call.
        </p>
        {"\n  "}
        <div className="sh-btns rv d3">
          <a className="sh-btn p" href="/contact/">
            {"Book a Free Consultation "}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
          <a className="sh-btn g" href="#estimator">Estimate Your Build Cost</a>
        </div>
        {"\n  "}
        <div className="sh-trust rv d3">
          <span>
            <i>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            </i>
            Licensed NSW builder
          </span>
          <span>
            <i>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            </i>
            Fixed-price contracts
          </span>
          <span>
            <i>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            </i>
            Director-led from first sketch to handover
          </span>
        </div>
        {"\n "}
      </div>
      {"\n "}
      <div className="sh-hctl">
        <div className="sh-hlbl"><small>Featured project</small><b id="sh-hname">Royal Delight</b></div>
        <div className="sh-dots">
          <button aria-label="Show Royal Delight" className="on" />
          <button aria-label="Show Modern Duplex" />
          <button aria-label="Show Project Nightfall" />
          <button aria-label="Show Bold Box" />
          <button aria-label="Show Completed Home" />
          <button aria-label="Show Bold French" />
        </div>
      </div>
      {"\n"}
    </section>
      <div className="sh-mq" aria-hidden="true">
      <div>
        <span>Duplexes</span>
        <span>Knockdown Rebuilds</span>
        <span>New Homes</span>
        <span>Granny Flats</span>
        <span>Box Facade</span>
        <span>French Facade</span>
        <span>Modern Contemporary</span>
        <span>Traditional Full Brick</span>
        <span>Duplexes</span>
        <span>Knockdown Rebuilds</span>
        <span>New Homes</span>
        <span>Granny Flats</span>
        <span>Box Facade</span>
        <span>French Facade</span>
        <span>Modern Contemporary</span>
        <span>Traditional Full Brick</span>
      </div>
    </div>
      <section className="sh-sec" style={{ paddingBottom: "0" }}>
      <div className="sh-wrap">
        <div className="sh-band rv">
          <div className="sh-bi">
            <i>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
            </i>
            <div><b>Licensed NSW Builder</b><span>Fully licensed and insured for every build.</span></div>
          </div>
          <div className="sh-bi">
            <i>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></svg>
            </i>
            <div><b>Fixed-Price Contracts</b><span>Full inclusions, no surprises on price.</span></div>
          </div>
          <div className="sh-bi">
            <i>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="8" r="3.5" />
                <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" />
                <circle cx="17" cy="9" r="2.5" />
                <path d="M17 14c3 0 5 2 5 5" />
              </svg>
            </i>
            <div><b>Director-Led Builds</b><span>Direct access to Bharat and Pradip.</span></div>
          </div>
          <div className="sh-bi">
            <i>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" /></svg>
            </i>
            <div><b>Structural Warranty</b><span>Support long after handover.</span></div>
          </div>
        </div>
      </div>
    </section>
      <section className="sh-sec">
      <div className="sh-wrap">
        {"\n "}
        <div className="sh-head split">
          <div>
            <span className="sh-eye rv">What We Build</span>
            <h2 className="rv d1">One Builder for Every Kind<br />{"of "}<em>Sydney Home</em></h2>
          </div>
          <p className="sh-lead rv d2" style={{ maxWidth: "430px" }}>
            Whether you want more space, a second income or a fresh start on the block you love, we design and build it under one roof.
          </p>
        </div>
        {"\n "}
        <div className="sh-svc">
          <a className="sh-sc rv d0" href="/duplex-builders-sydney/">
            <Img src="/images/scarlet-homes-hero-duplex-dusk.jpg" alt="Modern double-storey duplex by Scarlet Homes" loading="lazy" />
            <span className="n">01</span>
            <span className="ar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
            <h3>Duplex Builders Sydney</h3>
            <p>
              Make the most of a larger block with two homes on one title. We handle the design, CDC or DA approval and the build, whether you plan to live in one side, rent both or sell.
            </p>
            <span className="sh-link">
              {"Explore duplexes "}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </a>
          <a className="sh-sc rv d1" href="/knockdown-rebuild-sydney/">
            <Img src="/images/scarlet-homes-svc-knockdown.jpg" alt="Knockdown rebuild new home by Scarlet Homes" loading="lazy" />
            <span className="n">02</span>
            <span className="ar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
            <h3>Knockdown Rebuild Sydney</h3>
            <p>
              Love your street but not your house? We manage the demolition, approvals and construction so you get a brand-new home without leaving your suburb.
            </p>
            <span className="sh-link">
              {"Plan your rebuild "}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </a>
          <a className="sh-sc rv d2" href="/new-home-builders-sydney/">
            <Img src="/images/scarlet-homes-svc-new-home.jpg" alt="Custom new home by Scarlet Homes" loading="lazy" />
            <span className="n">03</span>
            <span className="ar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
            <h3>New Home Builders Sydney</h3>
            <p>
              Single or double storey, designed from scratch or from our facade styles: Box, French, Modern Contemporary or Traditional Full Brick. Every plan is shaped around your block and your family.
            </p>
            <span className="sh-link">
              {"Design your new home "}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </a>
          <a className="sh-sc rv d3" href="/granny-flat-builders-sydney/">
            <Img src="/images/scarlet-homes-svc-granny-flat.jpg" alt="Granny flat built by Scarlet Homes" loading="lazy" />
            <span className="n">04</span>
            <span className="ar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
            <h3>Granny Flat Builders Sydney</h3>
            <p>
              Add a self-contained second dwelling for family, guests or rental income. We take care of design, approval and construction in your backyard.
            </p>
            <span className="sh-link">
              {"See granny flats "}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </a>
        </div>
        {"\n"}
      </div>
    </section>
      <section className="sh-sec sh-ivory">
      <div className="sh-wrap sh-why">
        {"\n "}
        <div className="sh-why-img rv">
          <Img src="/images/scarlet-homes-p-project-y.jpg" alt="Double-storey custom home by Scarlet Homes" loading="lazy" />
          <div className="sh-quote">
            <b>“Custom Homes for Your Simplicity.”</b>
            <small>{"Bharat & Pradip, Founding Directors"}</small>
          </div>
        </div>
        {"\n "}
        <div>
          <span className="sh-eye rv">Why Scarlet Homes</span>
          <h2 className="rv d1">{"Why Sydney Families Build with "}<em>Scarlet Homes</em></h2>
          {"\n  "}
          <div className="sh-feat">
            <div className="sh-f rv d0">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              </i>
              <h3>On time, every stage.</h3>
              <p>
                We agree a realistic schedule up front and report progress at every stage, so you always know what's next.
              </p>
            </div>
            <div className="sh-f rv d1">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
              </i>
              <h3>No surprises on price.</h3>
              <p>
                Your fixed-price contract lists our full inclusions, so the price you sign is the price you pay.
              </p>
            </div>
            <div className="sh-f rv d2">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l3.5-1 12-12-2.5-2.5-12 12z" /><path d="M14 6l2.5 2.5" /></svg>
              </i>
              <h3>Built for you, not a catalogue.</h3>
              <p>
                Every home is personalised. Change the layout, the facade or the finishes until it feels like yours.
              </p>
            </div>
            <div className="sh-f rv d3">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              </i>
              <h3>You deal with the directors.</h3>
              <p>
                Founders Bharat and Pradip are involved in every build. You get their direct number, not a call centre.
              </p>
            </div>
          </div>
          {"\n  "}
          <div className="sh-btns rv" style={{ marginTop: "46px" }}>
            <a className="sh-btn p" href="/contact/">
              {"Talk to the Directors "}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>
          {"\n "}
        </div>
        {"\n"}
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
        {"\n "}
        <div className="sh-head split">
          <div>
            <span className="sh-eye rv">Our Build Process</span>
            <h2 className="rv d1">{"Your Home in "}<em>Five Clear Steps</em></h2>
          </div>
          <p className="sh-lead rv d2" style={{ maxWidth: "420px" }}>
            One team, one point of contact and a clear plan from your first meeting to the day we hand you the keys.
          </p>
        </div>
        {"\n "}
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
        {"\n"}
      </div>
    </section>
      <section className="sh-sec">
      <div className="sh-wrap">
        {"\n "}
        <div className="sh-head split">
          <div>
            <span className="sh-eye rv">Featured Projects</span>
            <h2 className="rv d1">{"Recent Homes "}<em>Across Sydney</em></h2>
            <p className="sh-lead rv d2" style={{ margin: "0" }}>
              From Leppington to the Hills District, see the duplexes, rebuilds and new homes we've handed over.
            </p>
          </div>
          <a className="sh-btn d rv d2" href="/projects/">
            {"View All Projects "}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
        {"\n "}
        <div className="sh-proj">
          <a className="sh-pc w rv d0" href="/projects/">
            <span className="sh-pci">
              <Img src="/images/scarlet-homes-hero-royal-delight.jpg" alt="Royal Delight by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            </span>
            <div className="cap">
              <div><small>Scarlet Homes</small><b>Royal Delight</b></div>
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </i>
            </div>
          </a>
          <a className="sh-pc t rv d1" href="/projects/">
            <span className="sh-pci">
              <Img src="/images/scarlet-homes-p-bold-box.jpg" alt="Bold Box by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            </span>
            <div className="cap">
              <div><small>Scarlet Homes</small><b>Bold Box</b></div>
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </i>
            </div>
          </a>
          <a className="sh-pc  rv d2" href="/projects/">
            <span className="sh-pci">
              <Img src="/images/scarlet-homes-p-gribbin-rd.jpg" alt="Gribbin Rd by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            </span>
            <div className="cap">
              <div><small>Leppington</small><b>Gribbin Rd</b></div>
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </i>
            </div>
          </a>
          <a className="sh-pc  rv d0" href="/projects/">
            <span className="sh-pci">
              <Img src="/images/scarlet-homes-p-candling-rd.jpg" alt="117 Candling Rd by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            </span>
            <div className="cap">
              <div><small>Leppington</small><b>117 Candling Rd</b></div>
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </i>
            </div>
          </a>
          <a className="sh-pc w rv d1" href="/projects/">
            <span className="sh-pci">
              <Img src="/images/scarlet-homes-p-bara-place.jpg" alt="Bara Place by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            </span>
            <div className="cap">
              <div><small>Scarlet Homes</small><b>Bara Place</b></div>
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </i>
            </div>
          </a>
          <a className="sh-pc  rv d2" href="/projects/">
            <span className="sh-pci">
              <Img src="/images/scarlet-homes-p-split-box.jpg" alt="Split Box by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            </span>
            <div className="cap">
              <div><small>Scarlet Homes</small><b>Split Box</b></div>
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </i>
            </div>
          </a>
          <a className="sh-pc  rv d0" href="/projects/">
            <span className="sh-pci">
              <Img src="/images/scarlet-homes-p-bold-french.jpg" alt="Bold French by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            </span>
            <div className="cap">
              <div><small>Scarlet Homes</small><b>Bold French</b></div>
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </i>
            </div>
          </a>
        </div>
        {"\n"}
      </div>
    </section>
      <section className="sh-sec ">
      <div className="sh-wrap">
        <div className="sh-head split">
          <div>
            <span className="sh-eye rv">Inside a Scarlet Home</span>
            <h2 className="rv d1">{"Finishes You'll "}<em>Love Coming Home To</em></h2>
            <p className="sh-lead rv d2" style={{ margin: "0" }}>
              Real photos from homes we've built: designer kitchens, luxe bathrooms and open-plan living.
            </p>
          </div>
          <a className="sh-btn d rv d2" href="/projects/#interiors">
            {"See the Full Gallery "}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
        <div className="sh-gal mo">
          <button type="button" className="sh-gi rvs d0 big" data-c="kitchens" data-cn="Inside a Scarlet Home" data-n="Kitchen">
            <Img src="/images/scarlet-homes-in-kitchen-2.jpg" alt="Kitchen in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Kitchen</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="living" data-cn="Inside a Scarlet Home" data-n="Living">
            <Img src="/images/scarlet-homes-in-living-1.jpg" alt="Living area in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Living</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2 tall" data-c="bathrooms" data-cn="Inside a Scarlet Home" data-n="Bathroom">
            <Img src="/images/scarlet-homes-in-bath-5.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Bathroom</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="entry-stairs" data-cn="Inside a Scarlet Home" data-n="Feature Void">
            <Img src="/images/scarlet-homes-in-feature-4.jpg" alt="Staircase and entry in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Feature Void</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1 wide" data-c="living" data-cn="Inside a Scarlet Home" data-n="Living">
            <Img src="/images/scarlet-homes-in-living-3.jpg" alt="Living area in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Living</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="bedrooms" data-cn="Inside a Scarlet Home" data-n="Bedroom">
            <Img src="/images/scarlet-homes-in-bed-1.jpg" alt="Bedroom in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Bedroom</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="outdoor" data-cn="Inside a Scarlet Home" data-n="Alfresco">
            <Img src="/images/scarlet-homes-in-outdoor-1.jpg" alt="Alfresco and balcony in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Alfresco</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="bathrooms" data-cn="Inside a Scarlet Home" data-n="Bathroom">
            <Img src="/images/scarlet-homes-in-bath-7.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Bathroom</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2 wide" data-c="living" data-cn="Inside a Scarlet Home" data-n="Home Theatre">
            <Img src="/images/scarlet-homes-in-living-8.jpg" alt="Living area in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Home Theatre</b></span>
          </button>
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
      <section className="sh-sec sh-ivory sh-testi">
      <div className="sh-wrap">
        <div className="sh-head c">
          <span className="sh-eye rv">Testimonials</span>
          <h2 className="rv d1">{"What Our "}<em>Clients Say</em></h2>
        </div>
        <div className="sh-tcard rvs">
          <div className="sh-tc-img">
            <Img src="/images/scarlet-homes-in-living-1.jpg" alt="Living area in a home built by Scarlet Homes" loading="lazy" direct />
            <div className="sh-tc-badge">
              <span className="G">Google</span>
              <div><span className="st">★★★★★</span><small>Reviews from Sydney homeowners</small></div>
            </div>
          </div>
          <div className="sh-tc-body">
            <svg className="sh-tc-q" viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
              <path d="M8 36c-2.2-2.4-3.4-5-3.4-9.3 0-7.5 5.3-14.3 12.9-17.6l1.9 2.9c-7.1 3.8-8.5 8.8-9.1 11.9 1.2-.6 2.9-.9 4.4-.7 3.9.4 7 3.6 7 7.6 0 4.2-3.4 7.6-7.6 7.6-2.4 0-4.6-1.1-6.1-2.4zm21.3 0c-2.2-2.4-3.4-5-3.4-9.3 0-7.5 5.3-14.3 12.9-17.6l1.9 2.9c-7.1 3.8-8.5 8.8-9.1 11.9 1.2-.6 2.9-.9 4.4-.7 3.9.4 7 3.6 7 7.6 0 4.2-3.4 7.6-7.6 7.6-2.4 0-4.6-1.1-6.1-2.4z" />
            </svg>
            <div className="stars">★★★★★</div>
            <blockquote>
              Huge thanks to Scarlet Homes for the professional service and smooth building process from start to finish.
            </blockquote>
            <div className="who">
              <span className="av">BB</span>
              <div><b>Biran Basi</b><span>Scarlet Homes client</span></div>
            </div>
            <a className="sh-btn d" href="https://www.google.com/search?q=Scarlet+Homes+Hornsby+reviews" target="_blank" rel="noopener">
              {"Read Google Reviews "}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
      <section className="sh-sec">
      <div className="sh-wrap sh-areas">
        {"\n "}
        <div className="sh-map rv">
          <Img src="/images/scarlet-homes-in-ext-5.jpg" alt="Completed home built by Scarlet Homes in Greater Sydney" className="sh-mapimg" loading="lazy" />
          <div className="sh-pin">
            <i>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" />
                <circle cx="12" cy="9" r="3" />
              </svg>
            </i>
            <div><b>Scarlet Homes, Hornsby</b><small>43A Florence Street, Hornsby NSW 2077</small></div>
          </div>
        </div>
        {"\n "}
        <div>
          <span className="sh-eye rv">Where We Build</span>
          <h2 className="rv d1">{"Building Across "}<em>Greater Sydney</em></h2>
          <p className="sh-lead rv d2">From our Hornsby base we build throughout Greater Sydney, including:</p>
          {"\n  "}
          <ul className="sh-alist">
            <li className="rv d0">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" />
                  <circle cx="12" cy="9" r="3" />
                </svg>
              </i>
              <a href="/home-builders-hornsby/" style={{ color: "inherit", flex: "1" }}>Hornsby, the Upper North Shore and the Northern Suburbs</a>
            </li>
            <li className="rv d1">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" />
                  <circle cx="12" cy="9" r="3" />
                </svg>
              </i>
              <a href="/home-builders-hills-district/" style={{ color: "inherit", flex: "1" }}>The Hills District and North West Sydney</a>
            </li>
            <li className="rv d2">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" />
                  <circle cx="12" cy="9" r="3" />
                </svg>
              </i>
              <a href="/home-builders-parramatta/" style={{ color: "inherit", flex: "1" }}>Parramatta and Western Sydney</a>
            </li>
            <li className="rv d3">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" />
                  <circle cx="12" cy="9" r="3" />
                </svg>
              </i>
              <a href="/home-builders-leppington/" style={{ color: "inherit", flex: "1" }}>Leppington and South West Sydney</a>
            </li>
          </ul>
          {"\n  "}
          <a className="sh-btn p rv" href="/contact/">
            {"Check Your Block for Free "}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
          {" "}
          <a className="sh-btn d rv sh-btn-sa" href="/service-areas/">All Service Areas</a>
        </div>
        {"\n"}
      </div>
    </section>
      <section className="sh-sec sh-ivory">
      <div className="sh-wrap sh-faqg">
        {"\n "}
        <div>
          <span className="sh-eye rv">FAQs</span>
          <h2 className="rv d1">{"Building in Sydney: Your Questions "}<em>Answered</em></h2>
          {"\n  "}
          <div className="sh-faqbox rv d2">
            <Img src="/images/scarlet-homes-p-ferunga.jpg" alt="Ferunga home by Scarlet Homes" loading="lazy" />
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
        {"\n "}
        <div className="sh-faq">
          <details className="rv" open>
            <summary>How much does it cost to build a house in Sydney?<i /></summary>
            <p>
              It depends on size, storeys, finishes and your site. Use our estimator for a quick guide, then book a free consultation for a fixed-price quote.
            </p>
          </details>
          <details className="rv">
            <summary>Can I build a duplex on my block?<i /></summary>
            <p>
              It depends on your zoning, lot size and frontage. Many Sydney blocks qualify for a fast-track complying development (CDC) approval. We check your block for free.
            </p>
          </details>
          <details className="rv">
            <summary>What's the difference between CDC and DA approval?<i /></summary>
            <p>
              A Complying Development Certificate (CDC) is a faster approval for designs that meet set rules. A Development Application (DA) goes through council and suits more complex designs. We advise which fits your project and manage either.
            </p>
          </details>
          <details className="rv">
            <summary>Is a knockdown rebuild cheaper than renovating?<i /></summary>
            <p>
              Often, yes, for older homes that need major work. You get a new home built to current standards, with no hidden structural surprises from the old house.
            </p>
          </details>
          <details className="rv">
            <summary>Do I need council approval for a granny flat?<i /></summary>
            <p>
              Many granny flats in NSW can be approved as complying development if the lot meets size and setback rules. We confirm this during your free consultation.
            </p>
          </details>
          <details className="rv">
            <summary>How long does it take to build a new home?<i /></summary>
            <p>
              Timeframes depend on the design and approvals. We give you a clear schedule before construction starts.
            </p>
          </details>
        </div>
        {"\n"}
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
      <JsonLd path="/" />
    </>
  );
}
