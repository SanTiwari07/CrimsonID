import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import QRCode from 'qrcode';

const CRLF = '\r\n';

function escapeText(value) {
  return value
    .replaceAll('\\', '\\\\')
    .replace(/\r\n|\r|\n/g, '\\n')
    .replaceAll(';', '\\;')
    .replaceAll(',', '\\,');
}

function foldLine(line) {
  let folded = '';
  let column = 0;
  for (const character of line) {
    const bytes = Buffer.byteLength(character, 'utf8');
    if (column + bytes > 75) {
      folded += `${CRLF} `;
      column = 1;
    }
    folded += character;
    column += bytes;
  }
  return folded;
}

export async function writeIntegrations(profile, outputDirectory) {
  const { name, givenName, familyName, role, biography, email, portfolioUrl, canonicalUrl, school, degree, graduation } = profile;
  const canonical = new URL(canonicalUrl);
  if (
    canonical.protocol !== 'https:' || canonical.username || canonical.password ||
    /[?#]/.test(canonicalUrl) || canonical.href !== canonicalUrl
  ) {
    throw new Error('The card URL must be a public HTTPS address without credentials, a query or a fragment.');
  }
  const portfolio = new URL(portfolioUrl);
  if (portfolio.protocol !== 'https:' || portfolio.username || portfolio.password) {
    throw new Error('The portfolio URL must be a public HTTPS address.');
  }

  const education = `${degree}, ${school} (expected ${graduation})`;
  const card = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${escapeText(name)}`,
    `N:${escapeText(familyName)};${escapeText(givenName)};;;`,
    `TITLE:${escapeText(role)}`,
    `EMAIL;TYPE=INTERNET,PREF:${escapeText(email)}`,
    `URL:${portfolio.href}`,
    `NOTE:${escapeText(`${biography}\n${education}`)}`,
    'END:VCARD',
    '',
  ].map(foldLine).join(CRLF);

  const qrOptions = {
    errorCorrectionLevel: 'M',
    margin: 4,
    scale: 12,
    color: { dark: '#000000', light: '#ffffff' },
  };
  const [svg, png] = await Promise.all([
    QRCode.toString(canonicalUrl, { ...qrOptions, type: 'svg' }),
    QRCode.toBuffer(canonicalUrl, { ...qrOptions, type: 'png' }),
  ]);

  await mkdir(outputDirectory, { recursive: true });
  await Promise.all([
    writeFile(join(outputDirectory, 'sanskar-tiwari.vcf'), card, 'utf8'),
    writeFile(join(outputDirectory, 'card-qr.svg'), svg, 'utf8'),
    writeFile(join(outputDirectory, 'card-qr.png'), png),
  ]);
}
