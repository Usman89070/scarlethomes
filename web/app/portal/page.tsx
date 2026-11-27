import type { Metadata } from 'next';
import Img from '@/components/Img';
import Portal from '@/components/portal/Portal';
import '@/styles/pages/portal.css';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Contractor Portal | Scarlet Homes' },
  description: 'Secure sign-in for Scarlet Homes contractors and staff.',
  alternates: { canonical: SITE_URL + '/portal/' },
  robots: { index: false, follow: false },
};

/* New page (not on the reference): contractor portal, built from the reference's page-hero,
   section and form classes. Data comes from the PHP API in /api. */
export default function PortalPage() {
  return (
    <>
      <section className="sh-ph">
        <div className="sh-ph-bg">
          <Img src="/images/scarlet-homes-in-ext-4.jpg" alt="Home built by Scarlet Homes" priority sizes="100vw" />
        </div>
        <div className="sh-wrap">
          <nav className="sh-bc rv" aria-label="Breadcrumb"><a href="/">Home</a><i /><span>Contractor Portal</span></nav>
          <span className="sh-eye rv">User Login</span>
          <h1>Contractor <em>Portal</em></h1>
          <p className="sh-lead rv d2">Sign in to view and update your business details with Scarlet Homes.</p>
        </div>
      </section>
      <section className="sh-sec sh-ivory sh-po" id="portal">
        <div className="sh-wrap">
          <Portal />
        </div>
      </section>
    </>
  );
}
