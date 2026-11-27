# Deployment

The production candidate is [santiwari07.qzz.io/card](https://santiwari07.qzz.io/card). The current public route was observed returning the main portfolio page through its Vercel fallback. A 200 response at this URL is insufficient to verify the card release. This repository provides a static build and standalone Vercel configuration. Publishing a preview, deploying to production or changing DNS requires Sanskar's explicit authorization.

## Build and review locally

Use Node.js 22 or later with npm. Run from the card project directory.

```sh
npm ci
npm run build
npm run dev
```

Open [the local card](http://127.0.0.1:4743/card). If the port is already allocated, set `CARD_PREVIEW_PORT` in the shell before starting the preview. The preview builds first and serves the generated files. Rebuild after editing content.

| Output | Public path | Purpose |
| --- | --- | --- |
| `dist/card/index.html` | `/card` | Static identity page with social and search metadata |
| `dist/card-assets/` | `/card-assets/` | Fonts, images, CSS and browser enhancements |
| `dist/card-assets/sanskar-tiwari.vcf` | `/card-assets/sanskar-tiwari.vcf` | Downloadable contact |
| `dist/card-assets/card-qr.png` and `card-qr.svg` | `/card-assets/card-qr.png` and `/card-assets/card-qr.svg` | QR formats generated from the canonical address |

Use a clean build in a fresh checkout for releases. The local build can leave old files in `dist/card-assets/` if source assets are deleted or renamed. Keep `dist/` and dependencies out of the card source repository.

## Integrate with the live portfolio after approval

The main [Portfolio repository](https://github.com/SanTiwari07/Portfolio) contains a Vite app and its routing file under `portfolio/`. The inspected routing configuration rewrites unmatched paths to the SPA entry. Preserve the portfolio's homepage, routes and cache rules while adding the card on a feature branch.

1. Identify the approved card commit and run the clean build above.
2. In the Portfolio feature checkout, copy the complete `dist/card/` and `dist/card-assets/` directories into `portfolio/public/` as `card/` and `card-assets/`. For an update, replace both card directories together so assets and markup come from the same build. Vite copies public files into its output during the portfolio build. [Vite public directory](https://vite.dev/guide/assets.html#the-public-directory)
3. Insert this exact rewrite as the first entry in the existing `rewrites` array of `portfolio/vercel.json`. Leave the existing catch-all last. The standalone configuration's redirect from `/` to `/card` belongs only on a card-only host.

   ```json
   { "source": "/card", "destination": "/card/index.html" }
   ```

4. Merge the vCard header rule from this project's `vercel.json` into the existing `headers` array. If carrying over its general `nosniff` and referrer policy headers, scope them to the card page and asset namespace. Preserve the portfolio's current caching rules. The card uses stable filenames, so keep card HTML and unversioned assets revalidatable. [Vercel routing and response configuration](https://vercel.com/docs/project-configuration/vercel-json)
5. Run the portfolio build from the nested app directory and confirm both `card/` and `card-assets/` are in its production output. After preview deployment is authorized, verify the checks below in a Vercel preview because the local Vite server does not apply Vercel rewrites or headers.
6. Release the tested integration commit only after production approval. Keep the preceding deployment available for rollback. Roll back to the latest working deployment that included the card, or fix forward to restore the existing URL if the previous deployment predates it.

## Standalone deployment

For an authorized card-only host, configure Vercel with the card repository as the project root. The included `vercel.json` runs `npm run build`, publishes `dist`, redirects the standalone homepage to `/card`, maps `/card` to the generated page and sets the contact headers. No environment variables or service credentials are required by the card build.

A Vercel preview URL is for validation. Its content deliberately points to the configured production canonical address for sharing and QR. If choosing GitHub Pages or another host, expose the built card and asset tree at the chosen public paths and check the vCard response and any slash redirects. Change `profile.mjs` before building for a different permanent address, and keep the public path, displayed address, metadata and QR in agreement. [GitHub Pages custom-domain support](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)

## Release verification

- Confirm the production HTTPS certificate is valid. Open the exact `/card` path in a fresh browser session and check the card title, portrait and actions. Confirm the portfolio home and an existing portfolio deep link still work.
- Confirm the browser gets the expected file types for CSS, JavaScript, image, QR and contact responses. Open the public social preview image directly. For vCard, verify `Content-Type: text/vcard; charset=utf-8` and `Content-Disposition: attachment; filename="sanskar-tiwari.vcf"`.
- Confirm that the canonical meta link, Open Graph URL, displayed URL, copied URL and shared URL all use the exact HTTPS address. Decode both QR exports and compare them to it. The vCard website field uses the main portfolio URL.
- Confirm the production card and public preview image are discoverable under the intended indexing policy. A protected staging deployment is suitable for review before release.
- Test on a phone over Wi-Fi and mobile data. Open the card, tap each main action, try sharing and download the contact. Complete the physical NFC checks in [NFC Setup](NFC_SETUP.md) before distributing tags or printed QR codes.

## Keep the address stable

Confirm access to the Vercel project and verify the exact hostname, registration state, expiration and renewal requirements in the DigitalPlat dashboard. The current `qzz.io` address belongs to a managed namespace provided on a best-effort basis. A registrable domain controlled by Sanskar is an alternative if long-term hosting portability is more important before any links are printed or programmed. Choosing a new domain, transferring a domain or updating DNS requires approval. [DigitalPlat operator](https://github.com/DigitalPlatDev) · [DigitalPlat terms](https://domain.digitalplat.org/terms-of-service/)

Once the canonical address is in use, keep that exact HTTPS endpoint reachable. A change to the design, static generator or linked profiles requires only a site release. When changing hosts, preserve the domain and path, or maintain a permanent redirect under the old address for as long as physical cards and QR prints remain in circulation.
