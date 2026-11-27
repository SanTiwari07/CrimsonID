# Digital identity project specification

## Visitor journey

The visitor opens an HTTPS link from an NFC tap, QR scan or message. The initial phone screen presents a portrait, name, role, education, biography, recognition and the portfolio and contact actions. The initial actions are Open portfolio and Save contact. Email and sharing sit in one disclosure. Two project previews demonstrate embedded computer vision and spatial computing. Profiles exposes LinkedIn and GitHub. More profiles contains the additional technical and social destinations. The desktop view uses an identity rail and a work and profiles column. The portrait sits beside the introduction across screen sizes.

The Precision Editorial layout uses the portfolio dark backgrounds, ST initials and three established type families. The current skin uses worn olive accents, dark charcoal surfaces and local platform logos. Sanskar provided the portrait directly. Project imagery shows the physical pothole rig and an actual Lens Studio preview of AcousticMirror. See [Design system](DESIGN_SYSTEM.md) for the concepts, token choices and design rationale.

## Portfolio and source audit

| Area | Primary portfolio | Engineering showcase |
| --- | --- | --- |
| Inspected revisions | `9ae4185`, primary portfolio clone and live Vercel root | `4aa0ef8`, showcase clone and live GitHub Pages root |
| Structure | Vite app in `portfolio/`; TypeScript sections, shared CSS tokens and public assets for images, sounds and models | Python-generated root and `projects/<slug>/` detail pages, with shared style, imagery, sitemap and robots files |
| Front end | React 18, Tailwind 4, Inter Tight, IBM Plex Sans and JetBrains Mono; motion uses GSAP, Framer Motion, smooth-scroll support and a Three.js showroom | Static HTML and CSS with the same type families, typographic rules and red accents; compact project index and detail pages |
| Design direction | Dark background `#030303`, surface `#0A0A0A`, red `#E32636`, red hover `#FF3B4C`, primary text `#F5F5F5`; also defines a separate light palette | Dark base and restrained divider lines, square surfaces, understated motion and red brand accents |
| Responsive design | Portrait/landscape branches, reduced motion, touch and device-aware variants, and desktop showroom enhancements | Small-phone rules and progressive desktop columns with reduced-motion handling |
| Search and deployment | Static title, social metadata, sitemap and Vercel SPA fallback; HTML and crawler files advertise `sanskartiwari.dev`, which did not resolve during this review | Person, WebSite, ProfilePage and project-list structured data; GitHub Pages workflow publishes the root, assets and projects |
| Reused assets and data | Genuine portrait, ST favicon, IPDS hardware photograph, contact data and dark design language | Current project and award descriptions, professional links and durable project detail paths |

Sources. [Primary portfolio](https://santiwari07.qzz.io/) · [Primary source](https://github.com/SanTiwari07/Portfolio) · [Engineering showcase](https://santiwari07.github.io/) · [Showcase source](https://github.com/SanTiwari07/SanTiwari07.github.io)

## Verified content and open decisions

- Sanskar’s public portfolios list his Electronics and Telecommunication Engineering studies at Pune Institute of Computer Technology. Class of 2028 is supported by the brief and the public LinkedIn education entry. The role uses the approved student and AI builder positioning. [LinkedIn education](https://in.linkedin.com/in/santiwari07)
- The older primary About copy lists four podiums. The current showcase and newer achievements data list five. The card uses a specific organizer-verified team result, AcousticMirror’s third place in Learn AR with SPECS. Prize values and inconsistent aggregate claims are omitted. [Official results](https://learn-specs-10-26.devpost.com/project-gallery) · [AcousticMirror submission and team credits](https://devpost.com/software/acousticmirror-see-where-sound-goes-wrong-fix-it-yourself)
- The research item is labeled a preprint, matching Zenodo’s metadata. IPDS combines YOLOv8 with an embedded dual-ESP32 design. [Zenodo record](https://zenodo.org/records/20760578) · [IPDS documentation](https://santiwari07.github.io/projects/pothole-detection/)
- The official project repository supplied the AcousticMirror reflection-point image. A current public résumé was unavailable in the two inspected sources. An owner-approved URL is needed to add one. [AcousticMirror screenshot source](https://github.com/SanTiwari07/AcousticMirrorLens/blob/main/docs/screenshots/04-left-wall-point.jpg)

## Static architecture

| Component | Responsibility |
| --- | --- |
| `profile.mjs` | Owner-editable profile, network links, media paths, projects, recognition and canonical URL |
| `render.mjs` | Build-time semantic HTML, canonical and Open Graph metadata, structured data and real links |
| `integrations.mjs` | Build-time UTF-8 vCard 3.0, lossless PNG and SVG QR with a quiet zone |
| `assets/` | Mobile-first CSS, progressively enhanced sharing and copy controls, self-hosted fonts and optimized WebP images |
| `preview.mjs` | Local file server for the exact card path and representative download headers |
| `vercel.json` | Static output, exact card route, standalone root redirect and vCard response headers |

Plain HTML, CSS and small JavaScript keep the recipient flow independent of client rendering. The Node build centralizes data and generates both QR formats offline. React/Vite inside the portfolio would simplify shared components but couple the card to the portfolio’s runtime. Astro could provide a static export, with a framework dependency for one page. A standalone static build can be integrated as a narrow route or served from its own host.

The visitor sees only approved public information. Same-tab external links, a referrer policy, local resources and no scripts from external services keep the default experience lightweight and avoid analytics or tracking. QR, canonical metadata and copy/share use one HTTPS address. The vCard website field intentionally points to the main portfolio.

## Completion conditions

Local builds, browser coverage, accessibility, performance and asset verification are recorded in [Test report](TEST_REPORT.md) and [Responsive test report](RESPONSIVE_TEST_REPORT.md). Release requires an approved deployment, DigitalPlat renewal and ownership confirmation, and verification that the exact public route serves the card. NFC readback, QR camera scanning, OS sharing and contact import require physical testing. See [Deployment](DEPLOYMENT.md) and [NFC setup](NFC_SETUP.md).
