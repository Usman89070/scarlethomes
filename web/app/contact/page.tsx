import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Img from '@/components/Img';

export const metadata: Metadata = pageMetadata("/contact/");

export default function ContactPage() {
  return (
    <>
      <section className="sh-ph">
      <div className="sh-ph-bg">
        <Img src="/images/scarlet-homes-hero-royal-delight.jpg" alt="Royal Delight French facade home by Scarlet Homes" priority sizes="100vw" />
      </div>
      <div className="sh-wrap">
        <nav className="sh-bc rv" aria-label="Breadcrumb"><a href="/">Home</a><i /><span>Contact</span></nav>
        <span className="sh-eye rv">Free Consultation</span>
        <h1>{"Let's Talk About "}<em>Your Build</em></h1>
        <p className="sh-lead rv d2">
          Book a free, no-obligation consultation with our directors. We'll look at your block, talk through your ideas and give you an honest view of what's possible.
        </p>
        <div className="sh-btns rv d3">
          <a className="sh-btn p" href="#enquire">
            {"Send an Enquiry "}
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
      <section className="sh-sec sh-ivory" id="enquire">
      <div className="sh-wrap sh-cg">
        <div>
          <span className="sh-eye rv">Get in Touch</span>
          <h2 className="rv d1">{"Talk Directly With "}<em>Our Directors</em></h2>
          <p className="sh-lead rv d2">No call centre, no pressure. Call, email or send the form and we'll get back to you.</p>
          <span className="sh-cimg">
            <Img src="/images/scarlet-homes-in-ext-6.jpg" alt="Completed home built by Scarlet Homes" loading="lazy" />
          </span>
          <div className="sh-ci">
            <a className="sh-cc rv" href="tel:1800727538">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                </svg>
              </i>
              <div><small>Call us</small><b>1800 727 538</b></div>
            </a>
            <a className="sh-cc rv" href="tel:0434073827">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M11 18h2" /></svg>
              </i>
              <div><small>Mobile</small><b>0434 073 827</b></div>
            </a>
            <a className="sh-cc rv" href="mailto:info@scarlethomes.com.au">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
              </i>
              <div><small>Email</small><b>info@scarlethomes.com.au</b></div>
            </a>
            <a className="sh-cc rv" href="https://maps.google.com/?q=Scarlet+Homes,+43A+Florence+Street,+Hornsby+NSW+2077" target="_blank" rel="noopener">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" />
                  <circle cx="12" cy="9" r="3" />
                </svg>
              </i>
              <div><small>Office</small><b>43A Florence Street, Hornsby NSW 2077</b></div>
            </a>
          </div>
        </div>
        <form className="sh-cf rvs" id="sh-cform" data-cf7="84" noValidate>
          <h3>Book a free consultation</h3>
          <p>Tell us a little about your project. It takes less than a minute.</p>
          <div className="row">
            <div className="sh-in">
              <label htmlFor="cf-n">Full name *</label>
              <input id="cf-n" name="your-name" required autoComplete="name" />
            </div>
            <div className="sh-in">
              <label htmlFor="cf-p">Phone *</label>
              <input id="cf-p" name="your-phone" type="tel" required autoComplete="tel" />
            </div>
          </div>
          <div className="row">
            <div className="sh-in">
              <label htmlFor="cf-e">Email *</label>
              <input id="cf-e" name="your-email" type="email" required autoComplete="email" />
            </div>
            <div className="sh-in">
              <label htmlFor="cf-s">Suburb</label>
              <input id="cf-s" name="your-suburb" autoComplete="address-level2" />
            </div>
          </div>
          <div className="sh-in">
            <label htmlFor="cf-t">What would you like to build?</label>
            <select id="cf-t" name="your-service">
              <option>Duplex</option>
              <option>Knockdown Rebuild</option>
              <option>New Home</option>
              <option>Granny Flat</option>
              <option>Not sure yet</option>
            </select>
          </div>
          <div className="sh-in">
            <label htmlFor="cf-m">Your message</label>
            <textarea id="cf-m" name="your-message" placeholder="Tell us about your block, timing and ideas" />
          </div>
          <button type="submit" className="sh-btn p">
            {"Send My Enquiry "}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
          <div className="sh-msg" role="status" aria-live="polite" />
          <p className="sh-fine">We'll only use your details to respond to your enquiry.</p>
        </form>
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
      <section className="sh-sec" style={{ padding: "110px 0" }}>
      <div className="sh-wrap">
        <div className="sh-wide-map">
          <iframe src="https://maps.google.com/maps?q=Scarlet%20Homes%2C%2043A%20Florence%20Street%2C%20Hornsby%20NSW%202077&t=k&z=16&output=embed" loading="lazy" title="Scarlet Homes office, 43A Florence Street, Hornsby" referrerPolicy="no-referrer-when-downgrade" />
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
      <JsonLd path="/contact/" />
    </>
  );
}
