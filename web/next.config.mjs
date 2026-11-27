/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // The ported legacy scripts mutate the DOM once after hydration; StrictMode's double
  // effect run in dev would initialise them twice.
  reactStrictMode: false,
  poweredByHeader: false,
};
export default nextConfig;
