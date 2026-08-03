//// Matches .hero-photo-card's height to .hero-preview-card's rendered
//// height on desktop (900px+, the two-column breakpoint - see
//// CSS/Landing.css's .hero-split) - the two live in separate flex
//// columns with different trailing content (CTAs vs caption/rotator),
//// so an exact match isn't expressible in pure CSS. Below 900px the
//// layout stacks to one column and no match is needed. ////

(function () {
  const card = document.querySelector('.hero-photo-card');
  const preview = document.querySelector('.hero-preview-card');
  if (!card || !preview) return;

  const desktopQuery = window.matchMedia('(min-width: 900px)');

  function syncHeight() {
    if (!desktopQuery.matches) {
      card.style.height = '';
      return;
    }
    card.style.height = preview.getBoundingClientRect().height + 'px';
  }

  window.addEventListener('load', syncHeight);
  window.addEventListener('resize', syncHeight);
  syncHeight();
})();
