# Leesburg Ceramic Coating — Static Marketing Site

Self-contained static website for **Leesburg Ceramic Coating** (`leesburgceramiccoating.com`) — ceramic coating rank-and-rent / service-area business in Leesburg, VA and Loudoun County.

## Local preview

From this folder:

```bash
cd /workspace/leesburg-ceramic-coating
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

Any simple static server works (`npx serve`, VS Code Live Server, etc.).

## Files

| Path | Purpose |
|------|---------|
| `index.html` | Home |
| `services.html` | Packages & add-ons |
| `process.html` | Process + short FAQ |
| `areas.html` | Service areas |
| `contact.html` | Quote form + NAP |
| `css/styles.css` | Shared styles |
| `js/main.js` | Mobile nav + mailto form |
| `favicon.svg` | Simple favicon |
| `robots.txt` | Allow all crawlers |

## Contact form

The quote form uses a **client-side `mailto:`** fallback to `hello@leesburgceramiccoating.com` (no backend required). Users need a mail client configured.

### Optional upgrades (placeholders)

**Formspree**

1. Create a form at [formspree.io](https://formspree.io) and copy your form ID.
2. On `contact.html`, set:

   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

3. In `js/main.js`, remove or skip the mailto submit handler so the form posts normally.

**Netlify Forms**

When hosting on Netlify, add `netlify` (and optionally `name="quote"`) to the `<form>` tag and adjust/remove the JS mailto handler.

## Deploy

### Cloudflare Pages

1. Push this folder to a Git repo (or upload assets).
2. In Cloudflare Dashboard → **Workers & Pages** → **Create** → Pages.
3. Connect the repo (or direct upload). Build command: leave empty / `exit 0`. Output directory: `/` (project root).
4. Custom domain: add `leesburgceramiccoating.com` and follow DNS instructions (CNAME/apex as Cloudflare directs).

### Netlify

1. Drag-and-drop this folder in Netlify, or connect a Git repo.
2. Publish directory = site root (no build step).
3. Domain management → add `leesburgceramiccoating.com` and configure DNS.

## Business details

- **Name:** Leesburg Ceramic Coating  
- **Phone:** (703) 643-9130 — `tel:+17036439130`  
- **Email:** hello@leesburgceramiccoating.com  
- **Area:** Leesburg, VA & Loudoun County (service-area business — no street address)

## License / use

Built for the business owner’s marketing site. Update copy and swap the form provider when ready for production lead capture.
