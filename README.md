# Northlight

Public website for a new event-services agency covering Chicago and the suburbs, Milwaukee and southeast Wisconsin, and northwest Indiana.

Hosts say what a night needs. The agency matches vetted vendors (DJs, catering, photo and video, decor, rentals, venues, staffing, security, bartending) and is paid by a referral cut from the vendor. Vendors can join the partner network now. A later subscription to Khaled’s [Brickline](https://github.com/CEOmarabha/brickline) lead software is an early-access waitlist only. **Nothing is billed. There is no checkout.**

The name **Northlight** is a placeholder. See [docs/NAME-OPTIONS.md](docs/NAME-OPTIONS.md) for three options.

## Change the brand name

1. Edit `js/brand.js`. `window.BRAND` is the config JavaScript reads for the logo, footer, `[data-brand]` text, the email link, titles (when the name is no longer Northlight), JSON-LD, canonical URLs, and Open Graph image origin.
2. Search-replace `Northlight` in the HTML files if you want the no-JS and crawler fallbacks to match. Static `<title>` tags, meta descriptions, and the JSON-LD block in each page still say Northlight on purpose.
3. Set `siteUrl` to the real origin (default `https://northlight.example`) and use that same host in `robots.txt` and `sitemap.xml`.
4. The wordmark is also baked into `og.png` and `apple-touch-icon.png`. Replace those images if the public name changes. `favicon.svg` is a mark, not the word.

Do not put secrets in `js/brand.js`. The email `hello@northlight.example` is a placeholder, not a live inbox.

## Local preview

Root-relative paths (`/css/styles.css`, `/plan/`) need a local server started at the repository root. Opening `index.html` as a file will not load the CSS or scripts.

```bash
python3 -m http.server 8765
```

Or, if you already use Node:

```bash
npx serve .
```

Then open `http://127.0.0.1:8765/`.

## Deploy on Netlify

Publish directory is the repository root. There is no build command. `netlify.toml` sets that.

Either connect the GitHub repo in the Netlify UI, or use the CLI:

```bash
npx netlify login
npx netlify init
```

In the Netlify UI:

- Build command: leave empty
- Publish directory: `.`
- Enable Forms (Site configuration → Forms). The forms are plain HTML with `data-netlify="true"` so Netlify can detect them at deploy. Submissions only show up after that.

Security headers (frame denial, nosniff, referrer policy, permissions policy) are in `netlify.toml`. `.netlify/` is gitignored.

## Forms

Native POST, so they work without JavaScript. Each form posts to `/thank-you`, includes a hidden `form-name`, and uses a visually hidden honeypot named `bot-field`.

| Form `name`        | Page        | Purpose                          |
| ------------------ | ----------- | -------------------------------- |
| `plan-event`       | `/plan/`    | Host tells us what the night needs |
| `vendor-partner`   | `/vendors/` | Apply to the partner network     |
| `software-waitlist`| `/software/`| Early-access lead-software waitlist |
| `contact`          | `/contact/` | General message                  |

Suggested software prices are $49 / $99 / $249 per month, labeled early access and waitlist. Do not add Stripe or a subscribe button that charges.

## Placeholders — do not invent the missing pieces

- **Reviews** on the home page are dashed cards. The sentence “Quote placeholder — replace with a real host review after launch.” is intentional. Do not add fake testimonials, stats, or client logos.
- **Bios** for Walid, Sulli, and the personal background of Omar and Khaled are marked “Bio placeholder.” Do not invent credentials, years in business, or awards.
- **Privacy** (`/privacy/`) and **terms** (`/terms/`) are drafts pending legal review. They are not adopted policies.
- **Email** `hello@northlight.example` is not a monitored inbox until the domain is real.

## Pages

`/` home, `/plan/`, `/vendors/`, `/software/`, `/about/`, `/contact/`, `/privacy/`, `/terms/`, `/thank-you/`, plus `404.html`, `robots.txt`, `sitemap.xml`, and icons.

Shared header and footer are duplicated in each HTML file (no build step). `js/site.js` marks the current nav item with `aria-current="page"`. The mobile menu is a `<details>` disclosure, so it works with JavaScript off. Desktop uses a separate nav labeled Primary; the collapsed menu is labeled Mobile.
