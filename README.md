# Phronesis Omes corporate website


A self-contained, framework-free corporate website for **Phronesis Omes** / **Phronesis Omes Ltd.** The site uses plain HTML5, CSS3, vanilla JavaScript, JSON and local SVG artwork. It is intentionally deployable as static files on any ordinary web host.


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


Upload the complete folder to any static web host. Preserve the relative paths. The repository intentionally contains no Manus route metadata; navigation uses the static HTML files directly. Before launch, replace `https://samuel-omeje.github.io/phronesis-omes-website` in `sitemap.xml`, `robots.txt`, every page's canonical link, and `project.json` with the approved canonical domain. If the host supports clean URLs, optionally add redirects from the `.html` pages to the chosen route format.


## Content model


- `data/company.json` holds editable contact and coverage details.
- `data/services.json` drives the home service cards and detailed services page.
- `data/projects.json` drives the project cards and category filters.
- `assets/images/*.svg` are local illustrative concept plates. They are labelled in their SVG metadata, alt text, captions and cards as illustrative references, not completed company projects.


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
4. Supply approved company logo artwork if the current editable SVG wordmark is not the final mark.
5. Replace illustrative concept artwork with verified company project photography and case-study copy when supplied; keep labels truthful until then.
6. Connect and test `POST /api/v1/enquiries` only if stored enquiries or email notifications are required.
