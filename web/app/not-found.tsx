import type { Metadata } from 'next';

export const metadata: Metadata = { title: { absolute: 'Page Not Found | Scarlet Homes' }, robots: { index: false } };

/* Not on the reference (WordPress served its theme 404); built from the reference's page-hero classes. */
export default function NotFound() {
  return (
    <section className="sh-ph">
      <div className="sh-wrap">
        <nav className="sh-bc rv" aria-label="Breadcrumb"><a href="/">Home</a><i></i><span>404</span></nav>
        <span className="sh-eye rv">Error 404</span>
        <h1>Page <em>Not Found</em></h1>
        <p className="sh-lead rv d2">The page you are looking for has moved or no longer exists.</p>
        <div className="sh-btns rv d3">
          <a className="sh-btn p" href="/">Back to Home</a>
          <a className="sh-btn g" href="/contact/">Contact Us</a>
        </div>
      </div>
    </section>
  );
}
