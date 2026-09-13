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
    var settled = false;
    var fallbackTimer = setTimeout(function () {
      if (settled) return;
      settled = true;
      showBlockedFallback();
    }, 8000);
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
    note.textContent = 'Ta strona blokuje podgląd w ramce — otwórz ją w nowej karcie powyżej.';
    panel.appendChild(note);
  }

  if (launchBtn) {
    launchBtn.addEventListener('click', loadIframe);
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
