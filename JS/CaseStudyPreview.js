//// Big live-preview panel on case-study pages (.case-preview__frame).
//// Loads the real iframe as soon as the panel scrolls near the
//// viewport (IntersectionObserver) - on both desktop and mobile, since
//// the panel sits right below the hero and is visible on arrival, this
//// is effectively immediate: visitors land on the case study and see
//// the live site with no extra click needed. "Otwórz w nowej karcie"
//// always stays available regardless of iframe state. ////

document.addEventListener('DOMContentLoaded', function () {
  var panel = document.querySelector('.case-preview__frame[data-live-src]');
  if (!panel) return;

  var src = panel.getAttribute('data-live-src');

  function loadIframe() {
    if (panel.querySelector('iframe')) return;
    var iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.loading = 'lazy';
    iframe.title = panel.getAttribute('data-live-title') || 'Podgląd na żywo';
    iframe.setAttribute('allowfullscreen', '');

    // If the target blocks embedding (X-Frame-Options/CSP), the iframe
    // stays visually blank rather than erroring loudly - fall back to
    // the screenshot + a note instead of leaving an empty box.
    // 30s, not JS/Portfolio.js's 20s: measured directly (Playwright,
    // "load" event timing) that AeroGlass's heavy 60+-frame WebP hero
    // animation + video genuinely takes ~20s to finish loading on a
    // real connection - a 20s fallback was racing almost exactly
    // against that real load time and intermittently "won", falsely
    // flagging a perfectly embeddable site as blocked. 30s gives real
    // margin above the slowest real target measured so far.
    var settled = false;
    var fallbackTimer = setTimeout(function () {
      if (settled) return;
      settled = true;
      showBlockedFallback();
    }, 30000);
    iframe.addEventListener('load', function () {
      settled = true;
      clearTimeout(fallbackTimer);
    });

    panel.appendChild(iframe);
  }

  function showBlockedFallback() {
    var iframe = panel.querySelector('iframe');
    if (iframe) iframe.remove();
    var note = document.createElement('p');
    note.className = 'case-preview__note';
    note.style.cssText = 'position:absolute;inset:auto 0 12px 0;text-align:center;margin:0;';
    note.textContent = 'Podgląd osadzony nie jest dostępny — skorzystaj z linku poniżej.';
    panel.appendChild(note);

    // Promote the quiet "otwórz w nowej karcie" text link to a proper
    // button once the embed is actually confirmed unavailable - it's
    // now the only way to see the site, not a redundant second option.
    var openLink = panel.parentElement.querySelector('.case-preview__open-link');
    if (openLink) {
      openLink.classList.remove('case-preview__open-link');
      openLink.classList.add('hero-cta', 'hero-cta--secondary');
      openLink.textContent = 'Otwórz stronę w nowej karcie';
    }
  }

  // The hero CTA just scroll-links to this panel's section (#live-preview,
  // handled by Navbar.js) - wire it to also (re-)trigger loadIframe, in
  // case a visitor clicks it before the observer below has fired yet.
  var section = panel.closest('section[id]');
  if (section) {
    document.querySelectorAll('a[href="#' + section.id + '"]').forEach(function (link) {
      link.addEventListener('click', loadIframe);
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        loadIframe();
        observer.disconnect();
      }
    });
  }, { rootMargin: '200px' });
  observer.observe(panel);
});
