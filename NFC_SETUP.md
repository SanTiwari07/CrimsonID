# Set up the physical NFC card

The proposed address is `https://santiwari07.qzz.io/card`. The tag stores this one HTTPS URL as an NFC Forum NDEF URI record. A compatible phone reads the tag and opens the page through its operating system. Visitors use their browser, and the writing app is only for the card owner. The printed QR code and the website’s copy and share actions use the same address. [Apple background tag reading](https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading) · [Android NFC basics](https://developer.android.com/develop/connectivity/nfc/nfc)

## Verify the destination before writing

The current public `/card` route serves the main portfolio’s SPA fallback. An HTTPS 200 alone cannot distinguish the SPA from the identity card. After the approved deployment, open the exact address in a private tab and confirm it shows the dedicated visiting card with **Explore Portfolio** and **Save Contact**. Verify the vCard and QR assets on that deployment, and repeat over both Wi-Fi and mobile data. Confirm access to the DigitalPlat account for `santiwari07.qzz.io` and check its current renewal requirements. Keep the NFC tag writable while checking the URL and hardware. [Deployment guide](DEPLOYMENT.md) · [DigitalPlat terms](https://domain.digitalplat.org/terms-of-service/)

## Identify the tag and check that it is writable

1. On an NFC-capable phone, install **NFC Tools** by Wakdev. On Android, enable NFC in system settings and unlock the phone. On iPhone, open the app and start a scan using the **Read** control. [NFC Tools on Google Play](https://play.google.com/store/apps/details?id=com.wakdev.wdnfc) · [NFC Tools on the App Store](https://apps.apple.com/app/nfc-tools/id1252962749)
2. Scan the card by holding it still near the phone’s NFC antenna. Start at the top edge on iPhone. On Android, try the middle or upper back. Check the phone maker’s instructions if the antenna location is unclear.
3. Record the chip family, NFC Forum tag type, capacity, NDEF status, whether the app reports the tag writable, and the existing record types. A common writable format is NFC Forum Type 2, such as NTAG213, but the specific chip in this card is still unknown.
4. If records are already present, confirm that you own the tag and can replace those records. A password-protected card may require its original password. A permanently locked tag needs replacement if it carries the wrong URL. If the tag supports NDEF but is blank and unformatted, use the reader’s supported NDEF formatting function only after confirming that clearing the card is acceptable. [Wakdev tag inspection features](https://www.wakdev.com/en/apps/nfc-tools-android.html)

## Write and read back the URL

1. In NFC Tools, open **Write**, choose **Add a record**, then choose **URL / URI**.
2. Enter `https://santiwari07.qzz.io/card` exactly. Keep the `https://` scheme and use `/card` without a trailing slash. If another production address is approved before launch, use that final address and regenerate the QR code from the updated profile config.
3. Confirm the write list contains one URI record, then tap **Write**. Hold the phone and card still until NFC Tools confirms the operation.
4. Return to **Read**, scan again, and compare the decoded URI with the final address. Confirm the record is a URI and is the only record in the message.
5. Leave the card writable. The decision to apply an irreversible read-only lock belongs to the card owner after the production URL and both device journeys have been verified. [Wakdev URL-writing instructions](https://www.wakdev.com/en/knowledge-base/how-to-guides/how-to-write-a-link-url-on-an-nfc-chip.html)

## Test the visitor journey

On Android, unlock the phone and enable NFC. Close NFC Tools and hold the card against the reader until the system opens the browser or presents a link choice. The exact notification or browser chooser depends on the Android version, device and configured defaults. [Android NFC dispatch](https://developer.android.com/develop/connectivity/nfc/nfc)

On an iPhone with background tag reading, wake and unlock the device, close Camera and Wallet if they are active, then hold the top edge over the card and tap the system banner. Apple documents background tag reading on iPhone XS and later and lists conditions that can suppress it. Use the QR or typed URL when a phone needs a manual reader or does not support background scans. On iPad, use the QR or direct URL as the primary route. [Apple Core NFC](https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading) · [Apple QR scanning](https://support.apple.com/en-us/102680)

| Step | Pass condition |
| --- | --- |
| Tap and open | The OS detects the tag, and the link opens the correct public identity page without an account. |
| Read and explore | The phone shows the name, role and first actions. Explore Portfolio opens the primary portfolio. |
| Save contact | The browser opens a contact preview or downloads `sanskar-tiwari.vcf`. Import it and verify the saved name, professional email and primary portfolio URL in Contacts. |
| Share | Share the card to another device and open the received URL. Test Copy Link separately when native sharing is unavailable. |
| Scan QR | Open the mobile camera on the receiving device. Scan both the on-screen code and a proof print and compare the decoded URL with the NFC record. |
| Repeat | Record phone model, OS, browser, network and result. Include an NFC-capable Android phone and an iPhone with background tag reading. |

**Physical status:** Tag family and writability, device detection, contact import and printed QR scanning are pending hands-on testing.

### Contact file handling

The **Save Contact** link serves a UTF-8 vCard 3.0. On Android, use the contact prompt if one appears. If the browser saves it to Downloads, open the file there or import it through the Contacts app and select the account where the contact belongs. On iPhone or iPad, use the contact preview where available. If the browser offers a downloaded file and the preview does not import it, send the file to yourself and tap the `.vcf` attachment in Mail or Messages. These options reflect platform guidance, with the deployed browser-to-Contacts handoff still pending device testing. [vCard 3.0 specification](https://www.rfc-editor.org/rfc/rfc2426.html) · [Google Contacts for Android](https://support.google.com/contacts/answer/15147365?co=GENIE.Platform%3DAndroid) · [Import contacts on iPhone](https://support.apple.com/en-gb/guide/iphone/iph356499f31/ios) · [Import contacts on iPad](https://support.apple.com/en-asia/guide/ipad/ipad3e95b18b/ipados)

## Prepare the QR fallback

Use the website’s sharing controls to display the code and download SVG for print or PNG for messaging. The local build generates both files under `/card-assets/` with a four-module white quiet zone. Keep the code square and black on white with its full margin. For a physical card, start with a 30 mm square and test a proof at the actual final size. Include the human-readable URL beside the code where practical. Print only after the phone camera resolves the same production page as the tap. [DENSO WAVE quiet zone guidance](https://www.qrcode.com/en/howto/code.html)

## Troubleshoot failed scans

| Symptom | What to check |
| --- | --- |
| Phone does not detect the tag | Confirm NFC support, wake and unlock the device, remove bulky or metal cases and other nearby cards, then try a different antenna position using one card. Test a known-good tag on the same phone. |
| NFC Tools sees the tag but cannot write | Check NDEF support, capacity and reported write access. Ask the original owner about a password if the tag is protected. Use a compatible writable replacement if the tag is permanently locked. |
| NFC Tools reads the URI but the browser never opens | Confirm that the decoded record is a standard NDEF URL/URI. Exit NFC Tools and Camera, keep the screen awake, and rescan. Try a phone known to support background scans. |
| The portfolio opens instead of the card | Type the exact NFC URL directly to isolate hosting from the tag. If it reproduces the issue, verify the `/card` route serves the dedicated page ahead of the portfolio’s SPA fallback. |
| An HTTPS or network error appears | Confirm mobile data or Wi-Fi, check the public certificate and domain, and try the printed URL. NFC and QR both depend on the web destination being reachable. |
| Printed QR scans poorly | Restore the four-module margin, remove nearby graphics, use the SVG at final size and check for glare. Scan the printed proof before distributing copies. |

## Update the website without reprogramming the card

Change the profile data or assets, rebuild, and deploy to the same public hostname and `/card` path. The existing NFC tag and printed QR will open the updated content. If hosting changes, keep the existing URL serving the card through DNS and routing you control, or preserve that URL with a maintained permanent redirect. If the old hostname is lost, writable NFC tags can be reprogrammed, and old printed codes must be replaced. [Deployment guide](DEPLOYMENT.md) · [Maintenance guide](MAINTENANCE.md)
