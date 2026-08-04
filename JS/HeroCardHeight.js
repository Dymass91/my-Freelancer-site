//// Matches .hero-photo-card's height AND top position to
//// .hero-preview-card's (the browser-frame window with the live site
//// link) on desktop (900px+, the two-column breakpoint - see
//// CSS/Landing.css's .hero-split). The two live in separate flex
//// columns with different leading/trailing content (.hero-preview-
//// teaser sits above .hero-preview-card on that side, CTAs below the
//// photo card on this one), so neither match is expressible in pure
//// CSS - the teaser's own height must NOT factor into the alignment,
//// only .hero-preview-card's box itself. Below 900px the layout
//// stacks to one column and neither match is needed. ////

(function () {
  const card = document.querySelector('.hero-photo-card');
  const preview = document.querySelector('.hero-preview-card');
  if (!card || !preview) return;

  const desktopQuery = window.matchMedia('(min-width: 900px)');

  function syncHeight() {
    if (!desktopQuery.matches) {
      card.style.height = '';
      card.style.marginTop = '';
      return;
    }
    // Reset marginTop before measuring - a stale value from a previous
    // run would throw off both the height read and the offset below.
    card.style.marginTop = '0px';
    card.style.height = preview.getBoundingClientRect().height + 'px';

    const cardColumnTop = card.parentElement.getBoundingClientRect().top;
    const previewTop = preview.getBoundingClientRect().top;
    card.style.marginTop = Math.max(0, previewTop - cardColumnTop) + 'px';
  }

  window.addEventListener('load', syncHeight);
  window.addEventListener('resize', syncHeight);
  syncHeight();
})();
