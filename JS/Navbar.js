
const navbarLinks = document.querySelectorAll(".navbar a, .boxArrow a , .to-top, .AboutMe_hrefToContact");

for (let i = 0; i < navbarLinks.length; i++) {
    navbarLinks[i].addEventListener("click", navbarLinkClick);
}

function navbarLinkClick(event) {
    smoothScroll(event); // Call the "smoothScroll" function
}

/////// Smooth-Scrolling ////////////

// Matches .navbar's own height (see Navbar.css) + a small margin - mirrors
// the scroll-margin-top on section ids (SectionHeader.css), which only
// covers native anchor jumps. This function computes targetPosition
// manually and scrolls via its own rAF loop instead of scrollIntoView(),
// so scroll-margin-top has no effect here - the offset has to be applied
// directly.
const NAV_SCROLL_OFFSET = 70;

function smoothScroll(event) {
    const targetId = event.currentTarget.getAttribute("href") === "#" ? "header" :
        event.currentTarget.getAttribute("href");
    // .navbar a (navbarLinks selector above) matches every anchor inside the
    // sticky navbar, including the language-switcher options, which have no
    // href at all (they carry a "language" attribute instead) - bail out
    // instead of crashing on document.querySelector(null).
    if (!targetId) return;
    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;
    event.preventDefault();
    const targetPosition = Math.max(0, targetEl.offsetTop - NAV_SCROLL_OFFSET);
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;


    window.requestAnimationFrame(step);

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
        if (progress < duration) window.requestAnimationFrame(step);
    }
}

////// Easing Function  /////////

function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
};
