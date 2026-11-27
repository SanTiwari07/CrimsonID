# Responsive test report

**Date:** 27 November 2026

**Build:** Local static production build on Windows

**Evidence:** Actual Chrome full-page screenshots and a visual review of the initial and full-page layouts

## Chrome viewport matrix

Chrome 158.0.8127.38 via Playwright. Phone-size and short landscape tests used touch and mobile viewport emulation. All rows passed checks for page and share panel overflow, text clipping, image loading, primary action visibility, and 48 CSS pixel control targets. The checks also covered opening the share panel, copying the email and canonical URL, downloading PNG and vCard files, and validating external destination attributes. The Y value is the bottom of the lower edge of Explore Portfolio or Save Contact in the initial viewport.

| Viewport | Primary action bottom | Screenshot |
| --- | ---: | --- |
| 320 × 568 | 541 px | [Full page](screenshots/viewports/320x568.png) |
| 360 × 640 | 549 px | [Full page](screenshots/viewports/360x640.png) |
| 375 × 667 | 553 px | [Full page](screenshots/viewports/375x667.png) |
| 390 × 844 | 535 px | [Full page](screenshots/viewports/390x844.png) |
| 412 × 915 | 537 px | [Full page](screenshots/viewports/412x915.png) |
| 430 × 932 | 539 px | [Full page](screenshots/viewports/430x932.png) |
| 600 × 800 | 532 px | [Full page](screenshots/viewports/600x800.png) |
| 768 × 1024 | 578 px | [Full page](screenshots/viewports/768x1024.png) |
| 1024 × 768 | 712 px | [Full page](screenshots/viewports/1024x768.png) |
| 1280 × 800 | 730 px | [Full page](screenshots/viewports/1280x800.png) |
| 1440 × 900 | 795 px | [Full page](screenshots/viewports/1440x900.png) |
| 1920 × 1080 | 802 px | [Full page](screenshots/viewports/1920x1080.png) |
| 2560 × 1080 | 802 px | [Full page](screenshots/viewports/2560x1080.png) |
| 568 × 320 | 316 px | [Full page](screenshots/viewports/568x320.png) |
| 667 × 375 | 359 px | [Full page](screenshots/viewports/667x375.png) |
| 844 × 390 | 360 px | [Full page](screenshots/viewports/844x390.png) |
| 932 × 430 | 363 px | [Full page](screenshots/viewports/932x430.png) |
| 1024 × 430 | 363 px | [Full page](screenshots/viewports/1024x430.png) |

[Phone first screen](screenshots/phone.png) · [Desktop first screen](screenshots/desktop.png) · [Phone share panel](screenshots/sharing-phone.png)

## Browser and device coverage

| Browser | Environment | Results |
| --- | --- | --- |
| Chrome 158.0.8127.38 | Desktop Windows and Playwright touch/viewport emulation | Full matrix. A separate Pixel 7 emulation covered the JavaScript-disabled journey. |
| Microsoft Edge 158.0.4370.33 | Desktop Windows, 1440 × 900 | First screen, layout, share disclosure, SVG and contact downloads passed. |
| Firefox 159.0 | Desktop Windows, 1024 × 768 | First screen, layout, share disclosure, SVG and contact downloads passed. |
| WebKit 27.2 | iPhone 13 emulation, 390 × 664 | First screen, layout, share disclosure, SVG and contact downloads passed. |
| WebKit 27.2 | iPad Mini emulation, 768 × 1024 | First screen, layout, share disclosure, SVG and contact downloads passed. |

Android Chrome, Samsung Internet, Safari and Chrome on iOS, Safari on iPadOS, and Safari on macOS require native-browser confirmation. The WebKit desktop engine checks approximate layout and browser behavior for the iOS form factors. The foldable and ultrawide checks use viewport dimensions. Physical foldable hardware and mobile OS integrations remain pending.

## Findings corrected and retested

- The first 320 × 568 layout placed some of the primary action row below the initial screen. The compact portrait and action spacing now bring both actions inside the viewport.
- The first short-landscape layout pushed primary actions below the fold. The portrait moved beside the copy and short landscape became independent of the desktop rail. The 568 × 320 case received tighter spacing and a side recognition line.
- At 200% browser default text size, a project thumbnail and portrait occupied too much of the narrow layout. Percentage caps and text wrapping restored reflow. Independent retests passed at 320, 390, 667, 768, 1024 and 1440 pixels with sharing open.
- A wide crop obscured the AcousticMirror screenshot and a wide short-landscape portrait could clip the chin. A documentary reflection-point image and a landscape portrait containment rule corrected both.
- Failed images initially showed clipped alternative text inside small thumbnails. The progressive enhancement now leaves a neutral image slot while the card text and controls remain available.

## Accessibility, speed and physical status

Axe found zero violations on the 390 × 844 and 1440 × 900 views with sharing open. Keyboard and text-spacing checks passed. Mobile Lighthouse scored 100 for Performance, Accessibility, Best Practices and SEO with simulated mobile throttling. LCP was 0.75 s and CLS 0.00024. The largest observed event duration in a separate throttled interaction sample was 48 ms. [Detailed measurements](TEST_REPORT.md) · [Lighthouse report](reports/lighthouse-mobile.report.html)

Physical NFC, device camera QR scans, contact import and OS share-sheet behavior require verification after approved deployment. See the [NFC programming and device checklist](NFC_SETUP.md).
