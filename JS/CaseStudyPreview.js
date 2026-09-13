//// Big live-preview panel on case-study pages (.case-preview__frame).
//// Desktop: loads the real iframe once the panel scrolls near the
//// viewport (IntersectionObserver), same lazy spirit as the homepage
//// portfolio cards' native loading="lazy", but explicit here since
//// this iframe is much larger (up to ~780px tall) and shouldn't force
//// a full external page load until it's actually about to be seen.
//// Mobile (<768px): stays on the screenshot until the visitor taps
//// "Uruchom podgląd na żywo" - avoids loading the whole external site
//// automatically on a metered mobile connection. "Otwórz w nowej
//// karcie" always stays available regardless of iframe state. ////

document.addEventListener('DOMContentLoaded', function () {
  var panel = document.querySelector('.case-preview__frame[data-live-src]');
  if (!panel) return;

  var src = panel.getAttribute('data-live-src');
  var launchBtn = panel.querySelector('.case-preview__launch');
  var isMobile = window.matchMedia('(max-width: 767px)').matches;

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

    if (launchBtn) launchBtn.remove();
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

  if (launchBtn) {
    launchBtn.addEventListener('click', loadIframe);
  }

  // The hero's own "Zobacz stronę na żywo" CTA just scroll-links to this
  // panel's section (#live-preview, handled by Navbar.js) - it doesn't
  // load the iframe on its own. Wire it up too, so both that button and
  // the in-panel "Uruchom podgląd na żywo" button actually start the
  // live preview, matching what each one's label promises.
  var section = panel.closest('section[id]');
  if (section) {
    document.querySelectorAll('a[href="#' + section.id + '"]').forEach(function (link) {
      link.addEventListener('click', loadIframe);
    });
  }

  if (!isMobile) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          loadIframe();
          observer.disconnect();
        }
      });
    }, { rootMargin: '200px' });
    observer.observe(panel);
  }
  // On mobile, no auto-load and no observer - stays on the screenshot
  // until the visitor taps the launch button.
});
