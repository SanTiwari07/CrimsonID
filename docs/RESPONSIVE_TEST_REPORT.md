# Responsive test report

**Date:** 27 November 2026

**Build:** Local static production build on Windows

**Evidence:** Actual Chrome full-page screenshots and a visual review of the initial and full-page layouts

## Chrome viewport matrix

Chrome 158 via Playwright. All three action buttons and eight profile links fit inside the first viewport in each row, with no horizontal overflow. Visible link targets met 48 CSS pixels. The Y value is the bottom of the last action or profile link.

| Viewport | Last action or profile link | Screenshot |
| --- | ---: | --- |
| 320 × 568 | 566 px | [Full page](../screenshots/viewports/320x568.png) |
| 360 × 640 | 559 px | [Full page](../screenshots/viewports/360x640.png) |
| 375 × 667 | 553 px | [Full page](../screenshots/viewports/375x667.png) |
| 390 × 844 | 553 px | [Full page](../screenshots/viewports/390x844.png) |
| 402 × 874 | 553 px | [Full page](../screenshots/viewports/402x874.png) |
| 412 × 915 | 555 px | [Full page](../screenshots/viewports/412x915.png) |
| 430 × 932 | 558 px | [Full page](../screenshots/viewports/430x932.png) |
| 568 × 320 | 262 px | [Full page](../screenshots/viewports/568x320.png) |
| 600 × 800 | 445 px | [Full page](../screenshots/viewports/600x800.png) |
| 667 × 375 | 271 px | [Full page](../screenshots/viewports/667x375.png) |
| 768 × 1024 | 537 px | [Full page](../screenshots/viewports/768x1024.png) |
| 844 × 390 | 286 px | [Full page](../screenshots/viewports/844x390.png) |
| 932 × 430 | 287 px | [Full page](../screenshots/viewports/932x430.png) |
| 1024 × 430 | 287 px | [Full page](../screenshots/viewports/1024x430.png) |
| 1024 × 768 | 537 px | [Full page](../screenshots/viewports/1024x768.png) |
| 1280 × 720 | 537 px | [Full page](../screenshots/viewports/1280x720.png) |
| 1280 × 800 | 537 px | [Full page](../screenshots/viewports/1280x800.png) |
| 1366 × 768 | 537 px | [Full page](../screenshots/viewports/1366x768.png) |
| 1440 × 900 | 537 px | [Full page](../screenshots/viewports/1440x900.png) |
| 1920 × 1080 | 537 px | [Full page](../screenshots/viewports/1920x1080.png) |
| 2560 × 1080 | 537 px | [Full page](../screenshots/viewports/2560x1080.png) |

[Phone first screen](../screenshots/phone.png) · [iPhone 16-sized first screen](../screenshots/iphone-16.png) · [Desktop first screen](../screenshots/desktop.png) · [Phone share panel](../screenshots/sharing-phone.png)

## Browser and device coverage

| Browser | Environment | Results |
| --- | --- | --- |
| Chrome 158.0.8127.38 | Desktop Windows and Playwright touch/viewport emulation | Full matrix. A separate Pixel 7 emulation covered the JavaScript-disabled journey. |
| Microsoft Edge 158.0.4370.33 | Desktop Windows, 1440 × 900 | First screen, layout, share disclosure, SVG and contact downloads passed. |
| Firefox 159.0 | Desktop Windows, 1024 × 768 | First screen, layout, share disclosure, SVG and contact downloads passed. |
| WebKit 27.2 | iPhone 16-sized emulation, 402 × 874 | First screen, layout, share disclosure, SVG and contact downloads passed. |
| WebKit 27.2 | iPad Mini emulation, 768 × 1024 | First screen, layout, share disclosure, SVG and contact downloads passed. |

Android Chrome, Samsung Internet, Safari and Chrome on iOS, Safari on iPadOS, and Safari on macOS require native-browser confirmation. The WebKit desktop engine checks approximate layout and browser behavior for the iOS form factors. The foldable and ultrawide checks use viewport dimensions. Physical foldable hardware and mobile OS integrations remain pending.

## Current design regression

The three action buttons and eight direct profile links are visible by y=553 px at 402 × 874. In the short landscape layout, they are visible by y=262 px at 568 × 320.

## Earlier findings corrected and retested

- The first 320 × 568 layout placed some of the primary action row below the initial screen. The compact portrait and action spacing now bring both actions inside the viewport.
- The first short-landscape layout pushed primary actions below the fold. The portrait moved beside the copy and short landscape became independent of the desktop rail. The 568 × 320 case received tighter spacing and a side recognition line.
- At 200% browser default text size, a project thumbnail and portrait occupied too much of the narrow layout. Percentage caps and text wrapping restored reflow. Independent retests passed at 320, 390, 667, 768, 1024 and 1440 pixels with sharing open.
- A wide crop obscured the AcousticMirror screenshot and a wide short-landscape portrait could clip the chin. A documentary reflection-point image and a landscape portrait containment rule corrected both.
- Failed images initially showed clipped alternative text inside small thumbnails. The progressive enhancement now leaves a neutral image slot while the card text and controls remain available.

## Accessibility, speed and physical status

Axe found zero violations at 402 × 874 and 1440 × 900 with all profile links visible. Mobile Lighthouse scored 100 for Performance, Accessibility, Best Practices and SEO with simulated mobile throttling. LCP was 0.75 s and CLS 0.00027. The largest observed event duration in an earlier throttled interaction sample was 32 ms. [Detailed measurements](TEST_REPORT.md) · [Lighthouse report](../reports/lighthouse-mobile.report.html)

Physical NFC, device camera QR scans, contact import and OS share-sheet behavior require verification after approved deployment. See the [NFC programming and device checklist](NFC_SETUP.md).
