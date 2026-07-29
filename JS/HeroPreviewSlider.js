//// Hero live-preview slider: cross-fades between the 3 latest projects.
//// The crossfade itself is pure CSS (.hero-preview-slide.is-active,
//// see Landing.css) - this just walks the "which one is active" state
//// on an interval. Iframe scaling and the live/fallback-image swap for
//// each slide are handled generically by JS/Portfolio.js, since every
//// slide reuses .portfolio-card/.browser-frame__viewport. ////

(function () {
  const ROTATE_INTERVAL_MS = 6000;

  const slides = document.querySelectorAll('.hero-preview-slide');
  if (slides.length < 2) return;

  let activeIndex = Array.prototype.findIndex.call(slides, function (slide) {
    return slide.classList.contains('is-active');
  });
  if (activeIndex < 0) {
    activeIndex = 0;
    slides[0].classList.add('is-active');
  }

  setInterval(function () {
    slides[activeIndex].classList.remove('is-active');
    activeIndex = (activeIndex + 1) % slides.length;
    slides[activeIndex].classList.add('is-active');
  }, ROTATE_INTERVAL_MS);
})();
