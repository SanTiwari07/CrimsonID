# Digital Identity Design System

## Design exploration

**A: Motorsport Minimalism.** A narrow black identity plate with one red rule, a compact portrait and a strong action bar. A linear list takes visitors through work and profiles. The racing cues make a strong first impression and could dominate the engineering content.

**B: Precision Editorial.** A compact portrait and prominent name establish the identity. The primary actions follow immediately, with selected projects and clearly titled directories below. On wider screens, the identity anchors the left column while work and links occupy the right.

**C: Digital Identity Dashboard.** A compact grid of work, profiles and sharing utilities lets repeat visitors jump to specific destinations. The initial view presents more choices and the tiles form a longer stack on phones. Its compactness pays off most on tablets and desktops.

| Criterion | A: Motorsport Minimalism | B: Precision Editorial | C: Digital Identity Dashboard |
| --- | --- | --- | --- |
| Personal brand consistency | Closest to the primary portfolio’s motorsport accents | Uses the primary palette and the project showcase’s editorial hierarchy | Engineering cues fit, with a different visual language |
| First impression | Immediate visual character | Name, specialty and actions dominate | More choices compete with the identity |
| Professional credibility | Restrained execution can feel polished | Work provides evidence immediately after identity | Dense categories can hide work behind labels |
| Mobile usability | Short, readable path | Compact introduction and full-size actions | Grids collapse into a longer stack |
| Visual originality | Distinctive details within familiar automotive conventions | Personal photography and real project imagery anchor the composition | Familiar directory patterns |
| Navigation clarity | Straightforward linear sequence | Clearly ranked actions and distinct work and platform sections | Useful for repeat visits, with weaker first-visit priorities |
| Loading performance | Few images and simple CSS | One prioritized portrait and lazy project imagery | CSS can remain light, with potentially more imagery and controls |
| Long-term maintainability | Straightforward linear template | Reusable project and link rows driven by profile data | More grid breakpoints and tile variants |
| NFC suitability | Fast identity and actions | Fast identity and actions followed by examples of work | More decisions at first contact |

**Original direction: Precision Editorial.** On a phone, the portrait, name, professional role and contact route form the introduction. The portfolio’s red accents, condensed headings and dark surfaces carry the brand. The project showcase provides a precedent for thin dividers and a readable project index.

## Portfolio foundations

The primary portfolio defines the black base, charcoal surface, off-white type, gray copy and two reds. The engineering showcase uses the same font families with closely related colors, square edges and darker divider tokens. The first release drew from both. [Primary portfolio stylesheet](https://github.com/SanTiwari07/Portfolio/blob/9ae418528acdcd7cca4f13e9ce1fda19e7b239f5/portfolio/src/index.css) · [Engineering showcase stylesheet](https://github.com/SanTiwari07/SanTiwari07.github.io/blob/4aa0ef85c9e31cef397c98c07b2140fa8daf819b/assets/style.css)

| Role | Foundation | Application |
| --- | --- | --- |
| Canvas | `#030303` | Main background and dark text on a bright red fill |
| Surface | `#0A0A0A` | Subtle panel separation |
| Foreground | `#F5F5F5` | Headings, copy and primary labels |
| Secondary foreground | `#888888` in source | Retain the gray family, using a lighter neutral such as `#A1A1AA` for more emphasis |
| Structural rules | 10% white in the primary portfolio, `#1C1C1C` and `#2A2A2A` in the showcase | Section dividers |
| Base red | `#E32636` | Accents and structural marks |
| Bright red | `#FF3B4C` | Small accent copy or an action fill paired with dark text |

Foundation contrast ratios are 18.92:1 for off-white on the canvas, 5.58:1 for source gray on the surface and 7.72:1 for lighter gray on the surface. Bright red on the surface gives 5.64:1, and dark text on bright red gives 5.87:1. Off-white on the base red gives 4.19:1, below the 4.5:1 AA threshold for regular text. Check the rendered text and focus states after CSS changes. [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

## Previous direction

The current card uses charcoal, portfolio red and off-white. Cinematographer Jeff Cronenweth describes the film’s desaturated palette, practical lighting and willingness to let parts of the frame go dark. The card takes those cues into near-black surfaces, bright type and a small hatched edge on the photograph. Sanskar supplied the portrait directly. [American Society of Cinematographers](https://theasc.com/article/flashback-fight-club/) · [Cooke Optics interview](https://www.youtube.com/watch?v=GFqODinvros)

| Role | Token | Use |
| --- | --- | --- |
| Canvas | `#0B0B0B` | Main background |
| Surface | `#171717` | Cards, secondary actions and logo tiles |
| Foreground | `#F5F5F5` | Headings and body text |
| Muted | `#BAB5B5` | Descriptions and supporting details |
| Accent | `#E32636` | Portfolio red and structural accents |
| Primary fill | `#BA1729` | Red fill with white action text |

The phone opens with identity and the three main buttons, followed by eight directly visible profile links. View projects takes visitors to the engineering showcase. Contact and QR controls share a separate disclosure. This order applies Apple’s guidance on hierarchy and comfortable touch area. [Apple design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles/) · [Apple button guidance](https://developer.apple.com/design/human-interface-guidelines/buttons)

The white Zenodo wordmark and legacy Kaggle monogram come from first-party assets. GitHub, Devpost, LeetCode, YouTube and Instagram use Simple Icons 16.0.0 artwork. LinkedIn uses the [in] artwork from Simple Icons 11.15.0. Every mark sits beside the platform name. [Zenodo](https://about.zenodo.org/) · [Kaggle](https://www.kaggle.com/static/images/favicon.ico) · [Simple Icons 16.0.0](https://github.com/simple-icons/simple-icons/tree/16.0.0/icons) · [LinkedIn mark](https://github.com/simple-icons/simple-icons/blob/11.15.0/icons/linkedin.svg)

## Type and spacing

| Use | Family | Treatment |
| --- | --- | --- |
| Name and section headings | Inter Tight | Tight tracking, firm weight and fluid size with natural wrapping |
| Descriptions, controls and biography | IBM Plex Sans | At least 1rem for body copy and a comfortable line height |
| Handle, categories and short metadata | JetBrains Mono | Brief, scannable labels |

Self-host the required WOFF2 files with a system fallback and `font-display: swap`. Let type wrap naturally on narrow screens and when readers enlarge text. Use a 4px spacing cadence with common gaps at 8, 12, 16 and 24px. Give sections more separation than rows within a section. Use thin rules and square or slightly rounded edges.

## Composition and behavior

- Start with a single-column phone layout. A compact masthead leads to the portrait, identity and short biography. Put Open profile, Save profile and View projects on one row, with the platform links directly below.
- Keep share and QR controls close to the identity in a separate disclosure. Use inline disclosure to keep the first view compact. Give copy and fallback feedback in a screen-reader-announced status region.
- Show project work through one link to the engineering showcase. Put recognizable platform names in the Other profiles grid.
- Preserve DOM order through layout changes. Keep a centered card on wide screens. In short landscape windows, place identity and links side by side.
- Keep content in the normal reading flow on short landscape screens. Respect safe-area insets and allow browser zoom and text enlargement. [W3C reflow guidance](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- Prefer 48 × 48 CSS-pixel touch targets for standalone actions, with a visible keyboard outline and pressed feedback. Keep hover effects supplementary. [W3C target-size guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html)
- Use the supplied portrait. Reserve its dimensions and prioritize it on the first view. Use the ST initials in the favicon and masthead.
- Keep movement brief and tied to interaction. Present the identity and action links at first paint. Respect `prefers-reduced-motion`.

## Review checklist

- The first view establishes the person and presents the portfolio and contact paths.
- The portrait stays legible and undistorted at every reference width.
- Actions remain readable and tappable with enlarged text, and keyboard focus is visible across sections.
- Profile rows keep aligned spacing and avoid clipping or horizontal overflow.
- Tablet and desktop layouts retain the phone reading order while using the available width.


## Final editorial cover

The cover combines oversized Inter Tight, the supplied portrait at up to its native 180 pixel size and a graphite field with racing red (#D5001C). Halftone is limited to the portrait area. Five numbered sections organize the identity, network, proof-of-work links, public channels and contact details. The five-award headline matches the five podiums listed in the public showcase and primary portfolio awards section. [Showcase recognition](https://santiwari07.github.io/#awards)
