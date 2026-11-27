const asset = "/card-assets/";
const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const html = (value) => String(value).replace(/[&<>"']/g, (char) => entities[char]);

function directory(heading, id, links) {
  return '<section class="directory" aria-labelledby="' + id + '"><h2 id="' + id + '">' +
    html(heading) + '</h2><ul class="link-list">' + links.map(({ name, description, url }) =>
      '<li><a href="' + html(url) + '"><span class="link-title">' + html(name) +
      '</span><span class="link-description">' + html(description) + '</span></a></li>'
    ).join("") + '</ul></section>';
}

function projectCard(project) {
  return '<li><a class="project" href="' + html(project.url) + '">' +
    '<span class="project-photo"><img src="' + asset + html(project.image) + '" alt="' +
      html(project.alt) + '" width="' + project.width + '" height="' + project.height + '" loading="lazy" decoding="async"></span>' +
    '<span class="project-copy"><span class="project-discipline">' + html(project.discipline) +
      '</span><span class="project-title">' + html(project.name) +
      '</span><span class="project-summary">' + html(project.summary) + '</span></span></a></li>';
}

export function renderCard(profile) {
  const {
    name, monogram, username, role, school, degree, graduation, city, biography, brandLine, email,
    canonicalUrl, portfolioUrl, showcaseUrl, linkedInUrl, portrait, socialPreview, achievement,
    projects, professionalProfiles, engineeringProfiles, socialProfiles
  } = profile;

  const title = name + " — Digital Identity";
  const description = role + " based in " + city + ". Explore my engineering work, connect or save my contact.";
  const preview = new URL(asset + socialPreview, canonicalUrl).href;
  const person = {
    "@type": "Person",
    "@id": canonicalUrl + "#person",
    name,
    alternateName: username,
    jobTitle: role,
    url: portfolioUrl,
    description: biography,
    image: new URL(asset + portrait.large, canonicalUrl).href,
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
    '<meta name="theme-color" content="#030303">',
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
      html(monogram) + '</span><span>Digital Identity</span></div>' +
      '<a href="#share-panel" class="masthead-share">Share card</a></header>',
    '<main id="main" class="layout">',
    '<section class="identity" aria-labelledby="identity-name">',
    '<div class="identity-top"><div class="identity-signature"><p class="handle">@' + html(username) +
      '</p><p class="location">' + html(city) + '</p></div>' +
      '<div class="portrait"><img src="' + asset + html(portrait.small) + '" srcset="' + asset +
      html(portrait.small) + ' 360w, ' + asset + html(portrait.large) + ' 720w" sizes="(min-width: 1050px) 340px, (min-width: 640px) 190px, 154px" ' +
      'width="' + portrait.width + '" height="' + portrait.height + '" fetchpriority="high" alt="' +
      html(portrait.alt) + '"></div></div>',
    '<h1 id="identity-name">' + html(name) + '</h1>',
    '<p class="role">' + html(role) + '</p>',
    '<p class="education">' + html(degree) + '<br>' + html(school) +
      ' <span class="education-year">· Class of ' + html(graduation) + '</span></p>',
    '<p class="bio">' + html(biography) + '</p>',
    '<a class="achievement" href="' + html(achievement.url) + '"><strong>' + html(achievement.rank) +
      '</strong><span>' + html(achievement.event) + '</span></a>',
    '<nav class="actions" aria-label="Primary actions"><a class="action action-primary" href="' +
      html(portfolioUrl) + '">Explore portfolio</a><a class="action" href="' + asset +
      'sanskar-tiwari.vcf" download>Save contact</a><a class="action action-plain" href="' +
      html(linkedInUrl) + '">Connect on LinkedIn</a><a class="action action-plain" href="mailto:' +
      html(email) + '">Email me</a></nav>',
    '<details class="share-panel" id="share-panel"><summary>Share &amp; contact options</summary>',
    '<div class="share-content"><div class="share-tools">',
    '<div class="share-buttons"><button class="action" id="native-share" type="button" hidden>Share digital card</button>' +
      '<button class="action" data-copy="card-address" type="button" hidden>Copy link</button>' +
      '<button class="action" data-copy="email-address" type="button" hidden>Copy email</button></div>',
    '<label for="card-address">Card URL</label><input id="card-address" value="' + html(canonicalUrl) + '" readonly>',
    '<label for="email-address">Email address</label><input id="email-address" value="' + html(email) + '" readonly>',
    '<p id="action-status" class="action-status" role="status"></p></div>',
    '<div class="share-qr"><img src="' + asset + 'card-qr.svg" width="168" height="168" loading="lazy" alt="QR code for the digital identity card">' +
      '<div class="downloads"><a href="' + asset + 'card-qr.png" download>Download PNG</a>' +
      '<a href="' + asset + 'card-qr.svg" download>Download SVG</a></div></div></div></details></section>',
    '<div class="content"><section class="work" aria-labelledby="work-title"><div class="section-head">' +
      '<h2 id="work-title">Selected engineering work</h2><a class="section-link" href="' +
      html(showcaseUrl) + '">Project showcase</a></div><ul class="projects">' + projects.map(projectCard).join("") +
      '</ul></section>',
    '<div class="directories">' +
      directory("Professional network", "network-title", [
        { name: "LinkedIn", description: "Professional profile and opportunities", url: linkedInUrl },
        ...professionalProfiles,
        { name: "Engineering showcase", description: "Project documentation and technical work", url: showcaseUrl }
      ]) +
      directory("Engineering & innovation", "engineering-title", engineeringProfiles) +
      directory("Building in public", "public-title", socialProfiles) +
    '</div></div></main>',
    '<footer class="footer"><div><strong>' + html(name) + '</strong><span>' + html(city) +
      '</span></div><p>' + html(brandLine) + '</p></footer></div></body></html>'
  ].join("\n");
}
