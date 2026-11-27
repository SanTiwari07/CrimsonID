const asset = "/card-assets/";
const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const html = (value) => String(value).replace(/[&<>"']/g, (char) => entities[char]);

function linkList(links) {
  return '<ul class="link-list">' + links.map(({ name, url, logo }) => {
    const mark = logo
      ? '<span class="link-logo"><img src="' + asset + html(logo) +
        '" width="24" height="24" alt="" loading="lazy" decoding="async"></span>'
      : "";
    return '<li><a class="link-entry' + (logo ? ' link-entry--with-logo' : '') + '" href="' + html(url) + '">' +
      mark + '<span class="link-title">' + html(name) +
      '</span></a></li>';
  }).join("") + '</ul>';
}

export function renderCard(profile) {
  const {
    name, monogram, username, role, school, graduation, city, biography, email,
    canonicalUrl, portfolioUrl, showcaseUrl, linkedInUrl, portrait, socialPreview,
    professionalProfiles, engineeringProfiles, socialProfiles
  } = profile;

  const title = name + " — Digital Identity";
  const description = role + " based in " + city + ". Open my profile, save my contact or find me on other platforms.";
  const preview = new URL(asset + socialPreview, canonicalUrl).href;
  const person = {
    "@type": "Person",
    "@id": canonicalUrl + "#person",
    name,
    alternateName: username,
    jobTitle: role,
    url: portfolioUrl,
    description: biography,
    image: new URL(asset + portrait.src, canonicalUrl).href,
    affiliation: { "@type": "CollegeOrUniversity", name: school },
    sameAs: [
      showcaseUrl, linkedInUrl,
      ...[...professionalProfiles, ...engineeringProfiles, ...socialProfiles]
        .filter((item) => !item.publication).map((item) => item.url)
    ]
  };
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: canonicalUrl,
    name: title,
    description,
    mainEntity: person
  }).replace(/</g, "\\u003c");

  return [
    "<!doctype html>",
    '<html lang="en"><head><meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
    '<meta name="theme-color" content="#0b0b0b">',
    "<title>" + html(title) + "</title>",
    '<meta name="description" content="' + html(description) + '">',
    '<meta name="robots" content="index, follow, max-image-preview:large">',
    '<link rel="canonical" href="' + html(canonicalUrl) + '">',
    '<meta property="og:type" content="profile">',
    '<meta property="og:site_name" content="' + html(title) + '">',
    '<meta property="og:title" content="' + html(title) + '">',
    '<meta property="og:description" content="' + html(description) + '">',
    '<meta property="og:url" content="' + html(canonicalUrl) + '">',
    '<meta property="og:image" content="' + html(preview) + '">',
    '<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">',
    '<meta property="og:image:alt" content="' + html(title) + ' preview with portrait">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<link rel="icon" href="' + asset + 'favicon.svg" type="image/svg+xml">',
    '<link rel="stylesheet" href="' + asset + 'card.css">',
    '<script type="application/ld+json">' + structuredData + "</script>",
    '<script src="' + asset + 'card.js" defer></script>',
    '</head><body><a class="skip" href="#main">Skip to main content</a>',
    '<div class="frame"><header class="masthead"><div class="brand"><span class="brand-mark" aria-hidden="true">' +
      html(monogram) + '</span><span>Digital Identity</span></div></header>',
    '<main id="main" class="layout">',
    '<section class="identity" aria-labelledby="identity-name">',
    '<div class="identity-lead"><div><p class="handle">@' + html(username) + '</p>' +
      '<h1 id="identity-name">' + html(name) + '</h1></div>' +
      '<div class="portrait"><img src="' + asset + html(portrait.src) +
      '" width="' + portrait.width + '" height="' + portrait.height +
      '" fetchpriority="high" alt="' + html(portrait.alt) + '"></div></div>',
    '<p class="role">' + html(role) + '</p>',
    '<p class="bio">' + html(biography) + '</p>',
    '<nav class="actions" aria-label="Primary actions"><a class="action action-primary" href="' +
      html(portfolioUrl) + '">Open profile</a><a class="action" href="' + asset +
      'sanskar-tiwari.vcf" download>Save profile</a><a class="action" href="' +
      html(showcaseUrl) + '">View projects</a></nav>',
    '<section class="other-profiles" aria-labelledby="other-profiles-title"><h2 id="other-profiles-title">Other profiles</h2>' +
      linkList([
        { name: "LinkedIn", url: linkedInUrl, logo: "logos/linkedin.svg" },
        ...professionalProfiles, ...engineeringProfiles, ...socialProfiles
      ]) + '</section>',
    '<p class="education">' + html(school) + ' · Class of ' + html(graduation) + '</p>',
    '<details class="share-panel" id="share-panel"><summary>Share and contact</summary>',
    '<div class="share-content"><div class="share-tools">',
    '<div class="share-buttons"><a class="action" href="mailto:' + html(email) + '">Email me</a><button class="action" id="native-share" type="button" hidden>Share digital card</button>' +
      '<button class="action" data-copy="card-address" type="button" hidden>Copy link</button>' +
      '<button class="action" data-copy="email-address" type="button" hidden>Copy email</button></div>',
    '<label for="card-address">Card URL</label><input id="card-address" value="' + html(canonicalUrl) + '" readonly>',
    '<label for="email-address">Email address</label><input id="email-address" value="' + html(email) + '" readonly>',
    '<p id="action-status" class="action-status" role="status"></p></div>',
    '<div class="share-qr"><img src="' + asset + 'card-qr.svg" width="168" height="168" loading="lazy" alt="QR code for the digital identity card">' +
      '<div class="downloads"><a href="' + asset + 'card-qr.png" download>Download PNG</a>' +
      '<a href="' + asset + 'card-qr.svg" download>Download SVG</a></div></div></div></details></section></main>',
    '<footer class="footer">' + html(city) + '</footer></div></body></html>'
  ].join("\n");
}
