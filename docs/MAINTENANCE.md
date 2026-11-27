# Maintenance

Edit [src/profile.mjs](../src/profile.mjs) to change the public identity. The build reads this configuration to render HTML, metadata, the contact file and QR assets. Make changes in a branch and review the actual card before an approved release.

## Change profile content

| Change | Fields or files | Verify |
| --- | --- | --- |
| Name, role and bio | `name`, `givenName`, `familyName`, `role`, `biography`, `username` | The first mobile screen introduces the person clearly. Check structured data and the downloaded contact name. |
| Education and location | `school`, `degree`, `graduation`, `city` | The expected year is current and the card displays only its public city. |
| Contact and destinations | `email`, `portfolioUrl`, `showcaseUrl`, `linkedInUrl` | Verify the `mailto:` action, copy feedback, profile ownership and the vCard's email and portfolio URL. |
| Professional, technical and social profiles | `professionalProfiles`, `engineeringProfiles`, `socialProfiles` | Check each label and canonical destination. Keep publication records marked as publications. Link a local brand asset with the optional `logo` field. |
| Portrait and social share image | `portrait`, `socialPreview`, files in `assets/images/` | Supply the portrait file and its intrinsic dimensions. Check the square frame on phone and desktop. Keep the social image at 1200 × 630 pixels or update the rendered Open Graph size. |

Before adding a résumé, verify the exact public file against the owner-approved current version and check that it omits private data. Keep credentials, private phone numbers, residential addresses and unpublished material out of the public build. Review source links when circumstances change.

## Replace an image or font

The card uses authentic assets from Sanskar's [primary portfolio repository](https://github.com/SanTiwari07/Portfolio). The original paths below are relative to its `portfolio/public/` directory.

| Card asset | Original source |
| --- | --- |
| `profile.png` | Portrait supplied by Sanskar for the current card |
| `social-preview.jpg` | Card-specific text and composition using the supplied portrait |
| `favicon.svg` | Portfolio-red ST mark based on the portfolio initials |

Keep image paths in the profile relative to `assets/`. Optimize photos to WebP or AVIF, retain the subject's natural proportions, and include explicit dimensions and concise alt text. Check replacement images at both compact and high-density display sizes. Font files and their SIL Open Font License texts sit together under `assets/fonts/`. Preserve the matching license text for any redistributed replacement, and update the CSS uses in `assets/card.css`.

Platform artwork is stored in `assets/logos/`. Follow the provenance in the [design system](DESIGN_SYSTEM.md) when updating an icon. The adjacent link text supplies the accessible name.

## Rebuild and validate

1. Run `npm ci` after changing dependencies or opening a clean checkout. Run `npm run dev` to build and preview the card. A standalone `npm run build` regenerates the release files in `dist/`.
2. Check the affected section at a narrow phone width with keyboard focus, normal zoom and larger text. Check the mobile first view, link labels, and the layout with an unavailable image if image handling changed.
3. Download the regenerated vCard and inspect or import it when identity or contact fields changed. Verify that the site link in the contact is the main portfolio.
4. Exercise copy, native share where available and QR download. The QR, displayed share URL, canonical metadata and NFC record all use the same exact value from `canonicalUrl`.
5. Follow [Deployment](DEPLOYMENT.md). Record the release commit and retain its generated output or working deployment so the card can be restored quickly.

## Protect the physical URL

Leave `canonicalUrl` unchanged during ordinary profile edits. Before deliberate migration, check domain control and existing physical cards. Preserve the exact old public URL or arrange a permanent redirect before distributing a new address. If the canonical address changes, rebuild the site so its metadata, share link and QR exports all update together. Reprogram writable tags or replace printed QR copies when the old address cannot be kept. Follow [NFC Setup](NFC_SETUP.md) for the device and print checks.
