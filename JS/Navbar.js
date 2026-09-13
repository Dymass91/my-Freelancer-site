
const navbarLinks = document.querySelectorAll(".navbar a, .boxArrow a , .to-top, .AboutMe_hrefToContact, .hero-cta, .pricing-btn");

for (let i = 0; i < navbarLinks.length; i++) {
    navbarLinks[i].addEventListener("click", navbarLinkClick);
}

function navbarLinkClick(event) {
    smoothScroll(event); // Call the "smoothScroll" function
}

/////// Smooth-Scrolling ////////////

// Was a fixed 70px constant, sized for the navbar's single-row height.
// .navbar (Navbar.css) wraps onto a second row on narrow phones (it grew
// a link since that value was picked), nearly doubling its real height,
// so a flat number under- or over-shoots depending on how many rows it's
// currently wrapped to. Measuring .navbar's actual rendered height at
// click-time keeps this correct at any width without hardcoding a
// worst-case number. +24 clears each .section-marker's own ~22px
// straddle-the-seam offset (SectionHeader.css/CSS files' section markers
// intentionally sit above their section's own top edge) plus a small
// aesthetic gap. This function computes targetPosition manually and
// scrolls via its own rAF loop instead of scrollIntoView(), so CSS
// scroll-margin-top has no effect here - the offset has to be applied
// directly.
function getNavScrollOffset() {
    const nav = document.querySelector(".navbar");
    return (nav ? nav.getBoundingClientRect().height : 70) + 24;
}

function smoothScroll(event) {
    const href = event.currentTarget.getAttribute("href");
    // .navbar a (navbarLinks selector above) now also includes real links to
    // other pages (e.g. /realizacje/) and, on subpages, cross-page anchors
    // like /#Contact - only a same-page "#..." fragment should be
    // intercepted for the custom scroll; anything else must navigate
    // normally. document.querySelector() throws on a non-"#" string like
    // "/realizacje/" (not a valid CSS selector), so this check has to
    // happen before calling it, not just on a null href.
    if (!href || !href.startsWith("#")) return;
    const targetId = href === "#" ? "header" : href;
    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;
    event.preventDefault();
    const targetPosition = Math.max(0, targetEl.offsetTop - getNavScrollOffset());
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
