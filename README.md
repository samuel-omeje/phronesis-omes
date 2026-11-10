# Phronesis Omes corporate website

A self-contained, framework-free corporate website for **Phronesis Omes** / **Phronesis Omes Ltd.** The site uses plain HTML5, CSS3, vanilla JavaScript, JSON, local SVG concept artwork and the supplied horizontal gold SVG wordmark. It is intentionally deployable as static files on any ordinary web host.

## Included pages

- `index.html` — home, positioning, service overview and enquiry CTAs
- `about.html` — company overview and editable proposed direction statements
- `services.html` — JSON-rendered service details for all five service categories
- `projects.html` — JSON-rendered, filterable illustrative concept portfolio
- `contact.html` — clickable contact details and validated WhatsApp handoff form

## Run locally

Because the pages load JSON with `fetch()`, serve the folder through a local HTTP server rather than opening an HTML file directly:

```bash
cd phronesis-omes-website
python3 -m http.server 8000
```

Open `http://localhost:8000` in a browser. No package installation, build step, framework or Manus runtime is required.

## Deploy

This site is published at https://samuel-omeje.github.io/phronesis-omes-website/ through GitHub Pages.

Upload the complete folder to any static web host. Preserve the relative paths. Before launch, replace `https://samuel-omeje.github.io/phronesis-omes-website` in `sitemap.xml`, `robots.txt`, every page's canonical link, and `project.json` with the approved canonical domain. If the host supports clean URLs, optionally add redirects from the `.html` pages to the chosen route format.

## Content model

- `data/company.json` holds editable contact and coverage details.
- `data/services.json` drives the home service cards and detailed services page.
- `data/projects.json` drives the completed-project cards, category filters and video/photo references.
- `assets/media/projects/` contains the company-supplied completed-project photos, optimized video files and poster frames used by the portfolio and selected service cards.
- `assets/images/*.svg` remain local illustrative concept plates for service categories without supplied project media; they are labelled as illustrative references.

## Contact form and future integration boundary

The current form is a clearly disclosed WhatsApp handoff. It validates required browser fields, constructs a pre-filled message, and opens the configured WhatsApp number from `data/company.json`. No enquiry is stored by this static site.

The form has an empty `data-endpoint` attribute in `contact.html`. To connect a real service later, set it to a trusted HTTPS endpoint. The intended future API boundary is:

- `POST /api/v1/enquiries` — receive validated enquiries
- `GET /api/v1/services` — optional future service data source
- `GET /api/v1/projects` — optional future project data source
- `POST /api/v1/projects` — future admin-only project publishing route

A future API must provide its own server-side validation, spam protection, consent/privacy handling, authentication for admin routes, storage, backups and audit logging. No API keys or secrets belong in this frontend.

## External dependencies and licences

There are no external image, font, JavaScript or CSS runtime dependencies. The site uses system font fallbacks (`Georgia`, `Arial`, and the browser sans-serif stack) and original local SVG concept artwork created for this bundle. The SVG files do not pull remote resources.

## Unfinished integrations and confirmation items

1. Replace the canonical domain placeholder and sitemap/robots domain before publishing.
2. Confirm the phone numbers, email address, WhatsApp number and approved office address in `data/company.json`.
3. Confirm or replace the proposed mission, vision and values copy in `about.html` before treating them as formal corporate statements.
4. Confirm that `assets/icons/phronesis-omes-horizontal-gold.svg` is the final approved company logo and supply any alternate light/dark variants if needed.
5. Confirm the client names, exact locations, dates, captions and permission/licence terms for the supplied completed-project media before publishing case-study details.
6. Connect and test `POST /api/v1/enquiries` only if stored enquiries or email notifications are required.
7. Add approved social URLs and a verified map embed only when supplied.

## Test report

Validated on 2026-11-09 using a local Python HTTP server and static inspection:

- All five HTML pages present and returned over HTTP 200.
- All JSON files parsed successfully; five services and five company-supplied completed projects render from JSON.
- Mobile navigation has `aria-expanded`, toggles open/closed state, and closes after link selection.
- Project filters are generated from service JSON, use `aria-pressed`, and render all/category-specific cards.
- Telephone, email and WhatsApp links are generated from `data/company.json`; phone links are clickable `tel:` URLs.
- Contact form uses native required-field/email validation, shows a live status message, and opens a pre-filled WhatsApp handoff when no endpoint is configured.
- Supplied portfolio cards are labelled as completed projects with client/location details withheld; remaining concept artwork is explicitly labelled as illustrative.
- Project video cards use accessible native controls, poster frames, lazy metadata loading and local MP4 sources; representative supplied media files were checked with `ffprobe`.
- `sitemap.xml`, `robots.txt` and canonical placeholders are included.
- No remote Unsplash URLs, framework imports, package manifests or secrets remain in the source bundle; project media is local and company-supplied.

A real browser QA pass should still be performed on the final deployed domain, especially for the WhatsApp handoff, canonical URLs, final supplied logo, and any future API endpoint.
