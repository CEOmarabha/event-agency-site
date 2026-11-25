/**
 * Northlight brand config — the one file for the public name.
 *
 * JS-driven titles, JSON-LD, logo text, footer, and [data-brand] nodes
 * read this object. HTML still contains "Northlight" so the site works
 * with JavaScript off and so crawlers see a name without running scripts.
 *
 * To rename:
 * 1. Change `name` (and email, siteUrl, tagline, description) here.
 * 2. Search-replace "Northlight" in HTML, robots.txt, sitemap.xml, and
 *    the baked text in og.png / apple-touch-icon.png if you want no-JS
 *    and social-image fallbacks to match.
 * 3. On deploy, set siteUrl to the real origin and mirror it in
 *    robots.txt and sitemap.xml.
 */
window.BRAND = {
  name: "Northlight",
  siteUrl: "https://northlight.example",
  email: "hello@northlight.example",
  tagline: "Event vendors for Chicago, Milwaukee, and northwest Indiana.",
  description:
    "Northlight connects event hosts with vetted vendors across Chicagoland, Milwaukee and southeast Wisconsin, and northwest Indiana. Vendor lead software is an early-access waitlist and is not billed yet.",
  github: "https://github.com/CEOmarabha/brickline",
  softwareName: "Brickline",
  year: "2026",
  regions: [
    "Chicago and suburbs",
    "Milwaukee and southeast Wisconsin",
    "Northwest Indiana",
  ],
};
