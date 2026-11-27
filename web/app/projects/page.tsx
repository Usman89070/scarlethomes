import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Img from '@/components/Img';
import '@/styles/pages/projects.css';
import PageScripts from '@/components/PageScripts';

export const metadata: Metadata = pageMetadata("/projects/");

export default function ProjectsPage() {
  return (
    <>
      <section className="sh-ph">
      <div className="sh-ph-bg">
        <Img src="/images/scarlet-homes-hero-nightfall.jpg" alt="Project Nightfall box facade home by Scarlet Homes" priority sizes="100vw" />
      </div>
      <div className="sh-wrap">
        <nav className="sh-bc rv" aria-label="Breadcrumb"><a href="/">Home</a><i /><span>Projects</span></nav>
        <span className="sh-eye rv">Our Portfolio</span>
        <h1>{"Homes We've "}<em>{"Designed & Built"}</em></h1>
        <p className="sh-lead rv d2">
          From Leppington to the Hills District, explore our duplexes, rebuilds and new homes across four signature facade styles.
        </p>
        <div className="sh-btns rv d3">
          <a className="sh-btn p" href="/contact/">
            {"Start Your Project "}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
          <a className="sh-btn g" href="#gallery">Browse Designs</a>
        </div>
      </div>
    </section>
      <section className="sh-sec " id="gallery">
      <div className="sh-wrap">
        <div className="sh-head c">
          <div>
            <span className="sh-eye rv">Portfolio</span>
            <h2 className="rv d1">{"Explore by "}<em>Facade Style</em></h2>
            <p className="sh-lead rv d2">
              Tap any home to view it larger. Every design can be personalised to your block and family.
            </p>
          </div>
        </div>
        <div className="sh-flt rv" role="tablist">
          <button className="on" data-f="all">All Homes<b>40</b></button>
          <button data-f="box-facade">Box Facade<b>16</b></button>
          <button data-f="french-facade">French Facade<b>12</b></button>
          <button data-f="modern-contemporary">Modern Contemporary<b>7</b></button>
          <button data-f="traditional-full-brick">Traditional Full Brick<b>5</b></button>
        </div>
        <div className="sh-gal">
          <button type="button" className="sh-gi rvs d0" data-c="box-facade" data-cn="Box Facade" data-n="Bold Box">
            <Img src="/images/scarlet-homes-p-bold-box.jpg" alt="Bold Box Box Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Box Facade</small><b>Bold Box</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="french-facade" data-cn="French Facade" data-n="Bold French">
            <Img src="/images/scarlet-homes-p-bold-french.jpg" alt="Bold French French Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>French Facade</small><b>Bold French</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="modern-contemporary" data-cn="Modern Contemporary" data-n="Simple Awesome">
            <Img src="/images/scarlet-homes-pf-simple-awesome.jpg" alt="Simple Awesome Modern Contemporary home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Modern Contemporary</small><b>Simple Awesome</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="box-facade" data-cn="Box Facade" data-n="Curvy Six">
            <Img src="/images/scarlet-homes-svc-new-home.jpg" alt="Curvy Six Box Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Box Facade</small><b>Curvy Six</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="box-facade" data-cn="Box Facade" data-n="BoxPlay 2">
            <Img src="/images/scarlet-homes-pf-boxplay-2.jpg" alt="BoxPlay 2 Box Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Box Facade</small><b>BoxPlay 2</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="box-facade" data-cn="Box Facade" data-n="BoxPlay">
            <Img src="/images/scarlet-homes-pf-boxplay.jpg" alt="BoxPlay Box Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Box Facade</small><b>BoxPlay</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="box-facade" data-cn="Box Facade" data-n="Plummet">
            <Img src="/images/scarlet-homes-pf-plummet.jpg" alt="Plummet Box Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Box Facade</small><b>Plummet</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="box-facade" data-cn="Box Facade" data-n="Curton">
            <Img src="/images/scarlet-homes-pf-curton.jpg" alt="Curton Box Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Box Facade</small><b>Curton</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="french-facade" data-cn="French Facade" data-n="ReFre">
            <Img src="/images/scarlet-homes-pf-refre.jpg" alt="ReFre French Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>French Facade</small><b>ReFre</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="french-facade" data-cn="French Facade" data-n="MassEncore">
            <Img src="/images/scarlet-homes-pf-massencore.jpg" alt="MassEncore French Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>French Facade</small><b>MassEncore</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="french-facade" data-cn="French Facade" data-n="Royal Delight">
            <Img src="/images/scarlet-homes-hero-royal-delight.jpg" alt="Royal Delight French Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>French Facade</small><b>Royal Delight</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="french-facade" data-cn="French Facade" data-n="21 Delight">
            <Img src="/images/scarlet-homes-pf-21-delight.jpg" alt="21 Delight French Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>French Facade</small><b>21 Delight</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="french-facade" data-cn="French Facade" data-n="Ferunga">
            <Img src="/images/scarlet-homes-p-ferunga.jpg" alt="Ferunga French Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>French Facade</small><b>Ferunga</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="box-facade" data-cn="Box Facade" data-n="Split Box">
            <Img src="/images/scarlet-homes-p-split-box.jpg" alt="Split Box Box Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Box Facade</small><b>Split Box</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="french-facade" data-cn="French Facade" data-n="French Delight">
            <Img src="/images/scarlet-homes-pf-french-delight.jpg" alt="French Delight French Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>French Facade</small><b>French Delight</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="box-facade" data-cn="Box Facade" data-n="11 m Frontage Box">
            <Img src="/images/scarlet-homes-pf-11m-box-2.jpg" alt="11 m Frontage Box Box Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Box Facade</small><b>11 m Frontage Box</b></span>
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
          <button type="button" className="sh-gi rvs d0" data-c="modern-contemporary" data-cn="Modern Contemporary" data-n="9 m Single Storey">
            <Img src="/images/scarlet-homes-pf-9m-single-storey.jpg" alt="9 m Single Storey Modern Contemporary home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Modern Contemporary</small><b>9 m Single Storey</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="traditional-full-brick" data-cn="Traditional Full Brick" data-n="12 m Frontage Full Brick">
            <Img src="/images/scarlet-homes-pf-12m-full-brick.jpg" alt="12 m Frontage Full Brick Traditional Full Brick home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Traditional Full Brick</small><b>12 m Frontage Full Brick</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="modern-contemporary" data-cn="Modern Contemporary" data-n="12 m Frontage">
            <Img src="/images/scarlet-homes-pf-12m-modern.jpg" alt="12 m Frontage Modern Contemporary home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Modern Contemporary</small><b>12 m Frontage</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="traditional-full-brick" data-cn="Traditional Full Brick" data-n="Ridge Square">
            <Img src="/images/scarlet-homes-pf-ridge-square.jpg" alt="Ridge Square Traditional Full Brick home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Traditional Full Brick</small><b>Ridge Square</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="box-facade" data-cn="Box Facade" data-n="Double Storey">
            <Img src="/images/scarlet-homes-pf-double-storey-box.jpg" alt="Double Storey Box Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Box Facade</small><b>Double Storey</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="modern-contemporary" data-cn="Modern Contemporary" data-n="Double Storey House">
            <Img src="/images/scarlet-homes-pf-double-storey-modern.jpg" alt="Double Storey House Modern Contemporary home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Modern Contemporary</small><b>Double Storey House</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="box-facade" data-cn="Box Facade" data-n="Levade">
            <Img src="/images/scarlet-homes-pf-levade.jpg" alt="Levade Box Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Box Facade</small><b>Levade</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="traditional-full-brick" data-cn="Traditional Full Brick" data-n="Mini Build">
            <Img src="/images/scarlet-homes-pf-mini-build.jpg" alt="Mini Build Traditional Full Brick home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Traditional Full Brick</small><b>Mini Build</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="french-facade" data-cn="French Facade" data-n="Neighbor">
            <Img src="/images/scarlet-homes-pf-neighbor.jpg" alt="Neighbor French Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>French Facade</small><b>Neighbor</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="box-facade" data-cn="Box Facade" data-n="Germein">
            <Img src="/images/scarlet-homes-p-germein.jpg" alt="Germein Box Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Box Facade</small><b>Germein</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="modern-contemporary" data-cn="Modern Contemporary" data-n="Pomfret Ave">
            <Img src="/images/scarlet-homes-pf-pomfret-ave.jpg" alt="Pomfret Ave Modern Contemporary home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Modern Contemporary</small><b>Pomfret Ave</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="modern-contemporary" data-cn="Modern Contemporary" data-n="Hazelton">
            <Img src="/images/scarlet-homes-pf-hazelton.jpg" alt="Hazelton Modern Contemporary home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Modern Contemporary</small><b>Hazelton</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="french-facade" data-cn="French Facade" data-n="Bara Place">
            <Img src="/images/scarlet-homes-p-bara-place.jpg" alt="Bara Place French Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>French Facade</small><b>Bara Place</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="traditional-full-brick" data-cn="Traditional Full Brick" data-n="117 Candling Rd, Leppington">
            <Img src="/images/scarlet-homes-p-candling-rd.jpg" alt="117 Candling Rd, Leppington Traditional Full Brick home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Traditional Full Brick</small><b>117 Candling Rd, Leppington</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="modern-contemporary" data-cn="Modern Contemporary" data-n="Project Y">
            <Img src="/images/scarlet-homes-p-project-y.jpg" alt="Project Y Modern Contemporary home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Modern Contemporary</small><b>Project Y</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="box-facade" data-cn="Box Facade" data-n="Project X">
            <Img src="/images/scarlet-homes-pf-project-x.jpg" alt="Project X Box Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Box Facade</small><b>Project X</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="box-facade" data-cn="Box Facade" data-n="Yet Another">
            <Img src="/images/scarlet-homes-pf-yet-another.jpg" alt="Yet Another Box Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Box Facade</small><b>Yet Another</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="box-facade" data-cn="Box Facade" data-n="Project Nightfall">
            <Img src="/images/scarlet-homes-hero-nightfall.jpg" alt="Project Nightfall Box Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Box Facade</small><b>Project Nightfall</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="french-facade" data-cn="French Facade" data-n="Project 53">
            <Img src="/images/scarlet-homes-p-project-53.jpg" alt="Project 53 French Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>French Facade</small><b>Project 53</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="french-facade" data-cn="French Facade" data-n="Gribbin Rd, Leppington">
            <Img src="/images/scarlet-homes-p-gribbin-rd.jpg" alt="Gribbin Rd, Leppington French Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>French Facade</small><b>Gribbin Rd, Leppington</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="box-facade" data-cn="Box Facade" data-n="Duncan">
            <Img src="/images/scarlet-homes-svc-knockdown.jpg" alt="Duncan Box Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Box Facade</small><b>Duncan</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="french-facade" data-cn="French Facade" data-n="Sparkes Cres">
            <Img src="/images/scarlet-homes-pf-sparkes-cres.jpg" alt="Sparkes Cres French Facade home by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>French Facade</small><b>Sparkes Cres</b></span>
          </button>
        </div>
      </div>
    </section>
      <section className="sh-sec sh-dark sh-vids" id="videos">
      <div className="sh-wrap">
        <div className="sh-head c">
          <span className="sh-eye rv">Video Walkthroughs</span>
          <h2 className="rv d1">{"Step Inside a "}<em>Scarlet Home</em></h2>
          <p className="sh-lead rv d2">Take a tour of homes we have designed and built.</p>
        </div>
        <div className="sh-vgrid">
          <button type="button" className="sh-v rvs d0" data-yt="F9fDXgjGJI4" aria-label="Play video: Scarlet Homes Walk Through">
            <img data-recalc-dims="1" decoding="async" src="https://i.ytimg.com/vi/F9fDXgjGJI4/hqdefault.jpg" alt="Scarlet Homes Walk Through" loading="lazy" />
            <span className="pl"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg></span>
            <span className="vc"><small>Full home tour</small><b>Scarlet Homes Walk Through</b></span>
          </button>
          <button type="button" className="sh-v rvs d1" data-yt="uP6n47kBN3U" aria-label="Play video: Modern French Provincial Luxury Living">
            <img data-recalc-dims="1" decoding="async" src="https://i.ytimg.com/vi/uP6n47kBN3U/hqdefault.jpg" alt="Modern French Provincial Luxury Living" loading="lazy" />
            <span className="pl"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg></span>
            <span className="vc"><small>French facade showcase</small><b>Modern French Provincial Luxury Living</b></span>
          </button>
        </div>
      </div>
    </section>
      <section className="sh-sec sh-ivory" id="interiors">
      <div className="sh-wrap">
        <div className="sh-head c">
          <div>
            <span className="sh-eye rv">Inside Our Homes</span>
            <h2 className="rv d1">{"Real Homes, "}<em>Real Finishes</em></h2>
            <p className="sh-lead rv d2">
              Photos from homes we've built and handed over. Filter by room and tap any photo to view it larger.
            </p>
          </div>
        </div>
        <div className="sh-flt rv">
          <button className="on" data-f="all">All Photos<b>46</b></button>
          <button data-f="completed-homes">Completed Homes<b>7</b></button>
          <button data-f="kitchens">Kitchens<b>4</b></button>
          <button data-f="living">Living<b>8</b></button>
          <button data-f="bathrooms">Bathrooms<b>12</b></button>
          <button data-f="bedrooms">Bedrooms<b>3</b></button>
          <button data-f="entry-stairs">{"Entry & Stairs"}<b>9</b></button>
          <button data-f="outdoor">{"Alfresco & Balcony"}<b>3</b></button>
        </div>
        <div className="sh-gal mo">
          <button type="button" className="sh-gi rvs d0 big" data-c="completed-homes" data-cn="Inside a Scarlet Home" data-n="Completed Home">
            <Img src="/images/scarlet-homes-in-ext-1.jpg" alt="Completed home exterior built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Completed Home</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="completed-homes" data-cn="Inside a Scarlet Home" data-n="Completed Home">
            <Img src="/images/scarlet-homes-in-ext-2.jpg" alt="Completed home exterior built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Completed Home</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="completed-homes" data-cn="Inside a Scarlet Home" data-n="Completed Home">
            <Img src="/images/scarlet-homes-in-ext-3.jpg" alt="Completed home exterior built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Completed Home</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0 tall" data-c="completed-homes" data-cn="Inside a Scarlet Home" data-n="Completed Home">
            <Img src="/images/scarlet-homes-in-ext-4.jpg" alt="Completed home exterior built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Completed Home</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="completed-homes" data-cn="Inside a Scarlet Home" data-n="Completed Home">
            <Img src="/images/scarlet-homes-in-ext-5.jpg" alt="Completed home exterior built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Completed Home</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="completed-homes" data-cn="Inside a Scarlet Home" data-n="Completed Home">
            <Img src="/images/scarlet-homes-in-ext-6.jpg" alt="Completed home exterior built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Completed Home</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0 wide" data-c="completed-homes" data-cn="Inside a Scarlet Home" data-n="Completed Home">
            <Img src="/images/scarlet-homes-in-ext-7.jpg" alt="Completed home exterior built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Completed Home</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="kitchens" data-cn="Inside a Scarlet Home" data-n="Kitchen">
            <Img src="/images/scarlet-homes-in-kitchen-1.jpg" alt="Kitchen in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Kitchen</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="kitchens" data-cn="Inside a Scarlet Home" data-n="Kitchen">
            <Img src="/images/scarlet-homes-in-kitchen-2.jpg" alt="Kitchen in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Kitchen</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="kitchens" data-cn="Inside a Scarlet Home" data-n="Kitchen">
            <Img src="/images/scarlet-homes-in-kitchen-3.jpg" alt="Kitchen in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Kitchen</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1 big" data-c="kitchens" data-cn="Inside a Scarlet Home" data-n="Kitchen">
            <Img src="/images/scarlet-homes-in-kitchen-4.jpg" alt="Kitchen in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Kitchen</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="living" data-cn="Inside a Scarlet Home" data-n="Living">
            <Img src="/images/scarlet-homes-in-living-1.jpg" alt="Living area in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Living</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="living" data-cn="Inside a Scarlet Home" data-n="Living">
            <Img src="/images/scarlet-homes-in-living-2.jpg" alt="Living area in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Living</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1 tall" data-c="living" data-cn="Inside a Scarlet Home" data-n="Living">
            <Img src="/images/scarlet-homes-in-living-3.jpg" alt="Living area in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Living</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="living" data-cn="Inside a Scarlet Home" data-n="Living">
            <Img src="/images/scarlet-homes-in-living-4.jpg" alt="Living area in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Living</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="living" data-cn="Inside a Scarlet Home" data-n="Living">
            <Img src="/images/scarlet-homes-in-living-5.jpg" alt="Living area in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Living</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1 wide" data-c="living" data-cn="Inside a Scarlet Home" data-n="Living">
            <Img src="/images/scarlet-homes-in-living-6.jpg" alt="Living area in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Living</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="living" data-cn="Inside a Scarlet Home" data-n="Living">
            <Img src="/images/scarlet-homes-in-living-7.jpg" alt="Living area in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Living</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="living" data-cn="Inside a Scarlet Home" data-n="Home Theatre">
            <Img src="/images/scarlet-homes-in-living-8.jpg" alt="Living area in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Home Theatre</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="bathrooms" data-cn="Inside a Scarlet Home" data-n="Bathroom">
            <Img src="/images/scarlet-homes-in-bath-1.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Bathroom</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2 big" data-c="bathrooms" data-cn="Inside a Scarlet Home" data-n="Bathroom">
            <Img src="/images/scarlet-homes-in-bath-2.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Bathroom</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="bathrooms" data-cn="Inside a Scarlet Home" data-n="Bathroom">
            <Img src="/images/scarlet-homes-in-bath-3.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Bathroom</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="bathrooms" data-cn="Inside a Scarlet Home" data-n="Bathroom">
            <Img src="/images/scarlet-homes-in-bath-4.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Bathroom</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2 tall" data-c="bathrooms" data-cn="Inside a Scarlet Home" data-n="Bathroom">
            <Img src="/images/scarlet-homes-in-bath-5.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Bathroom</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="bathrooms" data-cn="Inside a Scarlet Home" data-n="Bathroom">
            <Img src="/images/scarlet-homes-in-bath-6.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Bathroom</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="bathrooms" data-cn="Inside a Scarlet Home" data-n="Bathroom">
            <Img src="/images/scarlet-homes-in-bath-7.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Bathroom</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2 wide" data-c="bathrooms" data-cn="Inside a Scarlet Home" data-n="Bathroom">
            <Img src="/images/scarlet-homes-in-bath-8.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Bathroom</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="bathrooms" data-cn="Inside a Scarlet Home" data-n="Bathroom">
            <Img src="/images/scarlet-homes-in-bath-9.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Bathroom</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="bedrooms" data-cn="Inside a Scarlet Home" data-n="Bedroom">
            <Img src="/images/scarlet-homes-in-bed-1.jpg" alt="Bedroom in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Bedroom</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="bedrooms" data-cn="Inside a Scarlet Home" data-n="Bedroom">
            <Img src="/images/scarlet-homes-in-bed-2.jpg" alt="Bedroom in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Bedroom</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0 big" data-c="bedrooms" data-cn="Inside a Scarlet Home" data-n="Bedroom">
            <Img src="/images/scarlet-homes-in-bed-3.jpg" alt="Bedroom in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Bedroom</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="entry-stairs" data-cn="Inside a Scarlet Home" data-n="Entry & Stairs">
            <Img src="/images/scarlet-homes-in-feature-1.jpg" alt="Staircase and entry in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>{"Entry & Stairs"}</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="entry-stairs" data-cn="Inside a Scarlet Home" data-n="Entry & Stairs">
            <Img src="/images/scarlet-homes-in-feature-2.jpg" alt="Staircase and entry in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>{"Entry & Stairs"}</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0 tall" data-c="entry-stairs" data-cn="Inside a Scarlet Home" data-n="Feature Staircase">
            <Img src="/images/scarlet-homes-in-feature-3.jpg" alt="Staircase and entry in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Feature Staircase</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="entry-stairs" data-cn="Inside a Scarlet Home" data-n="Feature Void">
            <Img src="/images/scarlet-homes-in-feature-4.jpg" alt="Staircase and entry in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Feature Void</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="entry-stairs" data-cn="Inside a Scarlet Home" data-n="Entry & Stairs">
            <Img src="/images/scarlet-homes-in-feature-5.jpg" alt="Staircase and entry in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>{"Entry & Stairs"}</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0 wide" data-c="outdoor" data-cn="Inside a Scarlet Home" data-n="Alfresco">
            <Img src="/images/scarlet-homes-in-outdoor-1.jpg" alt="Alfresco and balcony in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Alfresco</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="outdoor" data-cn="Inside a Scarlet Home" data-n="Balcony">
            <Img src="/images/scarlet-homes-in-outdoor-2.jpg" alt="Alfresco and balcony in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Balcony</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2" data-c="outdoor" data-cn="Inside a Scarlet Home" data-n="Balcony View">
            <Img src="/images/scarlet-homes-in-outdoor-3.jpg" alt="Alfresco and balcony in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Balcony View</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0" data-c="bathrooms" data-cn="Inside a Scarlet Home" data-n="Bathroom">
            <Img src="/images/scarlet-homes-in-bath-10.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Bathroom</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1 tall" data-c="entry-stairs" data-cn="Inside a Scarlet Home" data-n="Feature Staircase">
            <Img src="/images/scarlet-homes-in-feature-6.jpg" alt="Staircase and entry in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Feature Staircase</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2 wide" data-c="bathrooms" data-cn="Inside a Scarlet Home" data-n="Bathroom">
            <Img src="/images/scarlet-homes-in-bath-12.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Bathroom</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0 tall" data-c="bathrooms" data-cn="Inside a Scarlet Home" data-n="Bathroom">
            <Img src="/images/scarlet-homes-in-bath-11.jpg" alt="Bathroom in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Bathroom</b></span>
          </button>
          <button type="button" className="sh-gi rvs d1" data-c="entry-stairs" data-cn="Inside a Scarlet Home" data-n="Entry">
            <Img src="/images/scarlet-homes-in-feature-9.jpg" alt="Staircase and entry in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Entry</b></span>
          </button>
          <button type="button" className="sh-gi rvs d2 tall" data-c="entry-stairs" data-cn="Inside a Scarlet Home" data-n="Staircase">
            <Img src="/images/scarlet-homes-in-feature-7.jpg" alt="Staircase and entry in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Staircase</b></span>
          </button>
          <button type="button" className="sh-gi rvs d0 tall" data-c="entry-stairs" data-cn="Inside a Scarlet Home" data-n="Staircase">
            <Img src="/images/scarlet-homes-in-feature-8.jpg" alt="Staircase and entry in a home built by Scarlet Homes" loading="lazy" sizes="(max-width: 700px) 50vw, 33vw" />
            <span className="zm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
            </span>
            <span className="cap"><small>Inside a Scarlet Home</small><b>Staircase</b></span>
          </button>
        </div>
      </div>
    </section>
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
      <JsonLd path="/projects/" />
      <PageScripts page="projects" />
    </>
  );
}
