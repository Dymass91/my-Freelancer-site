//// Rotating hero subtitle: cycles through 3 taglines (crossfade handled
//// entirely by CSS via the .is-active class), and separately fades the
//// whole element out while the fixed navbar visually overlaps it. ////

(function () {
  const ROTATE_INTERVAL_MS = 4000;
  // Matches .hero-rotator's own "transition: opacity 0.35s" in
  // HeroRotator.css - the fade-in from the reveal below.
  const ENTRANCE_FADE_MS = 350;

  const rotator = document.querySelector('.hero-rotator');
  if (!rotator) return;

  const lines = rotator.querySelectorAll('.hero-rotator__line');

  //// Entrance: stays invisible (opacity:0, see HeroRotator.css) until
  //// AnimationGsap.js's exitLoader() dispatches this, timed to match the
  //// "Tomasz Matyszczak" / "Front-end Developer" letter reveal - so all
  //// three appear together as one group instead of the rotator flashing
  //// in on its own. Text rotation only starts once this entrance fade has
  //// finished (not immediately on page load), so the two kinds of motion
  //// - the one-time entrance and the recurring crossfade - never overlap. ////
  window.addEventListener('hero:reveal', function () {
    rotator.classList.add('is-ready');

    if (lines.length > 1) {
      setTimeout(function () {
        let activeIndex = 0;
        setInterval(function () {
          lines[activeIndex].classList.remove('is-active');
          activeIndex = (activeIndex + 1) % lines.length;
          lines[activeIndex].classList.add('is-active');
        }, ROTATE_INTERVAL_MS);
      }, ENTRANCE_FADE_MS);
    }
  }, { once: true });

  //// Separate concern: fade the whole rotator out once the fixed navbar
  //// visually overlaps it, fade it back in once it doesn't. ////
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let ticking = false;

  function checkOverlap() {
    ticking = false;
    if (!navbar.classList.contains('show')) {
      rotator.classList.remove('is-hidden-by-menu');
      return;
    }
    const navbarBottom = navbar.getBoundingClientRect().bottom;
    const rotatorTop = rotator.getBoundingClientRect().top;
    rotator.classList.toggle('is-hidden-by-menu', rotatorTop < navbarBottom);
  }

  function requestOverlapCheck() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(checkOverlap);
  }

  window.addEventListener('scroll', requestOverlapCheck, { passive: true });
  window.addEventListener('resize', requestOverlapCheck);
  requestOverlapCheck();
})();
