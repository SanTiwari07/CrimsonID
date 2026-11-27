# Digital identity test report

**Test date:** 27 November 2026

**Target:** Static production build served on local Windows preview

**Release state:** Local build verified. Publication and physical validation are pending.

## Functional and technical checks

| Check | Result |
| --- | --- |
| Production build | Passed on Node 26.13.0 and npm 11.20.0. A clean snapshot also passed dependency installation, build and preview. |
| Static card route and assets | The local `/card` responds with the identity page. CSS, JavaScript, fonts, photos, social preview, QR files and vCard were served locally. |
| Essential actions | Open portfolio, LinkedIn and all eight profile destinations point to their intended URLs. Email uses the approved `mailto:` address. Opening the device mail app and sending an email remain physical checks. |
| Clipboard | Native clipboard wrote and read back the exact email and URL. Independent browser tests covered the legacy copy path, plus manual text selection when both clipboard mechanisms were denied. |
| Web Share | In independent browser tests, simulated success sent the canonical URL and title, simulated rejection fell back to copying the URL, and cancel left the status quiet. Browsers without the API offered copy and QR downloads. An operating-system share sheet remains a device test. |
| vCard | Downloaded as `sanskar-tiwari.vcf` with `text/vcard; charset=utf-8` and an attachment filename. Verified vCard 3.0, CRLF, UTF-8 text, escaped values, 75-octet line folding, required name fields, professional email, portfolio URL and omitted telephone. Real Contacts import remains pending. |
| QR | OpenCV decoded the PNG and browser-rendered SVG to `https://santiwari07.qzz.io/card`. The 144 × 144 PNG and SVG checks also decoded successfully. Both exports use a four-module quiet zone and error correction M. |
| Script disabled | Portfolio, vCard, mail link, selectable text, native disclosure and downloadable SVG remained available. |
| Failed media | Aborted portrait and project image requests in Chrome. The photo slots retained their geometry, and the identity and actions remained accessible. |
| Console and layout | No console or page errors on the normal runs. All 21 Chrome viewport checks passed, including 402 × 874. See the [responsive matrix](RESPONSIVE_TEST_REPORT.md). |
| Metadata | Static HTML contains the canonical URL, title, description, profile social preview, favicon, crawlable destination links and Person/ProfilePage data. The social image is 1200 × 630. |

## Public destination checks

HTTP GET yielded 200 for the primary portfolio, engineering showcase, GitHub, Kaggle, Devpost, YouTube, Instagram, Zenodo, both selected project pages and the official award gallery. The query-free Devpost profile resolved directly to Sanskar’s profile. [Devpost](https://devpost.com/sanskartiwari-smt) · [Award gallery](https://learn-specs-10-26.devpost.com/project-gallery)

Direct automation yielded 999 for LinkedIn and 403 for LeetCode. LinkedIn’s indexed regional page and LeetCode’s indexed profile both identify Sanskar, and the engineering showcase references the supplied destinations. Access can vary with the site, sign-in state and network. [LinkedIn profile](https://in.linkedin.com/in/santiwari07) · [LeetCode profile](https://leetcode.com/u/santiwari07/) · [Engineering showcase](https://santiwari07.github.io/)

The proposed canonical currently responds with the same page as the portfolio root. The GitHub Pages alternative returns 404. Production routing remains a release check. See [Deployment](DEPLOYMENT.md).

## Mobile Lighthouse and interaction timing

Lighthouse 13.6.0 used headless Chrome 158 on Windows at the local route. Mobile simulated throttling used 150 ms round-trip latency, approximately 1.6 Mbps throughput and a 4× CPU multiplier. Scores and metrics describe this lab run.

| Metric | Measured |
| --- | --- |
| Performance | 100 / 100 |
| Accessibility | 100 / 100 |
| Best Practices | 100 / 100 |
| SEO | 100 / 100 |
| First Contentful Paint | 0.75 s |
| Largest Contentful Paint | 0.75 s |
| Cumulative Layout Shift | 0.00025 |
| Total Blocking Time | 0 ms |
| Audit transfer | 228 KiB |
| Browser JavaScript | 2.21 KiB raw, 0.89 KiB gzip |

A separate Chrome Event Timing run used the 390 × 844 touch viewport, 4× CPU throttling and a 150 ms / 1.6 Mbps network simulation. Twelve disclosure and clipboard interactions recorded a longest candidate duration of **32 ms**. Production field INP requires visits to a deployed page.

[Interactive Lighthouse report](reports/lighthouse-mobile.report.html) · [Lighthouse JSON](reports/lighthouse-mobile.report.json)

## Accessibility and release checks

Axe returned zero violations at 390 × 844 and 1440 × 900 with the share panel visible. Keyboard skip and disclosure, reduced motion, text-spacing overrides and 200% text reflow passed the browser checks. All tested visible primary and sharing controls met the 48 CSS pixel target.

Physical NFC tap and readback, camera QR scanning, iOS and Android contact import, OS sharing, and named mobile app-browser coverage remain pending. Production HTTPS verification and tag programming are covered in [NFC setup](NFC_SETUP.md).
