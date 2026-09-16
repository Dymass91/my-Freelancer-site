document.addEventListener('DOMContentLoaded', function () {

    ////// Live-preview scaling (iframe rendered at a fixed 1280x800
    ////// "desktop" size, then scaled down to fit each card) //////

    var FRAME_WIDTH = 1280;

    function scaleFrame(viewport) {
        var iframe = viewport.querySelector('.browser-frame__iframe');
        if (!iframe) return;
        var width = viewport.clientWidth;
        if (!width) return;
        iframe.style.transform = 'scale(' + (width / FRAME_WIDTH) + ')';
    }

    function scaleAllFrames() {
        document.querySelectorAll('.browser-frame__viewport').forEach(scaleFrame);
    }

    function debounce(fn, wait) {
        var timer;
        return function () {
            clearTimeout(timer);
            timer = setTimeout(fn, wait);
        };
    }

    scaleAllFrames();
    window.addEventListener('load', scaleAllFrames);
    window.addEventListener('resize', debounce(scaleAllFrames, 150));

    ////// Live-preview loading state: same visual language as the
    ////// homepage's own page loader (.wrapper, Landing.css), scaled
    ////// into each card. Injected here rather than authored in every
    ////// card's markup since .browser-frame__viewport is one shared
    ////// component (hero preview, portfolio grid, realizacje grid).
    ////// An iframe paints an opaque blank box the moment it starts
    ////// loading, well before the embedded page itself appears, so
    ////// the indicator has to sit ABOVE it (z-index, not behind) and
    ////// get explicitly hidden once we know the real page is ready -
    ////// that "ready" signal is the exact same load/error/timeout
    ////// logic the fallback-image handling below already tracks. //////

    document.querySelectorAll('.browser-frame__viewport').forEach(function (viewport) {
        if (!viewport.querySelector('.browser-frame__iframe')) return;
        var loading = document.createElement('div');
        loading.className = 'browser-frame__loading';
        loading.setAttribute('aria-hidden', 'true');
        var bar = document.createElement('div');
        bar.className = 'browser-frame__loading-bar';
        loading.appendChild(bar);
        viewport.insertBefore(loading, viewport.firstChild);
    });

    ////// Live-preview fallback: if a "live" card's iframe hasn't fired
    ////// "load" within FALLBACK_TIMEOUT, swap it for the static
    ////// screenshot. This is only a runtime safety net for issues an
    ////// X-Frame-Options/CSP header check can't catch (e.g. a site added
    ////// framebusting JS later) - the primary decision of live vs. image
    ////// is the data-mode set on each card. "load" firing isn't a
    ////// guarantee the page rendered (a blocked frame can still fire it),
    ////// so this is a best-effort heuristic, not a substitute for
    ////// checking response headers when adding new projects. //////

    // Measured in testing: with 6 concurrent cross-origin iframes (each a
    // full page load - separate DNS/TLS, some on cold Cloudflare Workers,
    // one embedding its own nested Google Maps iframe) "load" times ranged
    // from ~13s to ~40s, well past the ~2.5s originally planned. Since none
    // of these projects are actually blocked (verified via response headers
    // and a manual embed test - see project notes), a short timeout would
    // falsely swap nearly every card to its static image. This is now a
    // safety net against a genuinely stuck/blocked embed, not a quality
    // gate, so it can afford to be generous - the card shows the loading
    // bar (above) the whole time until the real preview pops in.
    var FALLBACK_TIMEOUT = 20000;

    document.querySelectorAll('.portfolio-card[data-mode="live"], .realizacje-card[data-mode="live"]').forEach(function (card) {
        var iframe = card.querySelector('.browser-frame__iframe');
        if (!iframe) return;

        var settled = false;
        var timer = setTimeout(function () {
            if (settled) return;
            settled = true;
            card.classList.add('mode-image', 'is-frame-loaded');
            iframe.remove();
        }, FALLBACK_TIMEOUT);

        iframe.addEventListener('load', function () {
            settled = true;
            clearTimeout(timer);
            card.classList.add('is-frame-loaded');
        });
        iframe.addEventListener('error', function () {
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            card.classList.add('mode-image', 'is-frame-loaded');
            iframe.remove();
        });
    });

    ////// Technology filters //////

    var filterButtons = document.querySelectorAll('.portfolio-filter');
    // Scoped to the grid - the hero section reuses .portfolio-card for its
    // flagship-project preview (same browser-frame styling/JS), and isn't
    // part of the filterable set.
    var cards = document.querySelectorAll('.portfolio-grid .portfolio-card');

    filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterButtons.forEach(function (b) { b.classList.remove('is-active'); });
            btn.classList.add('is-active');

            var filter = btn.getAttribute('data-filter');
            cards.forEach(function (card) {
                var tags = (card.getAttribute('data-tags') || '').split(',');
                var show = filter === 'all' || tags.indexOf(filter) !== -1;
                card.classList.toggle('is-hidden', !show);
            });

            // Cards hidden via display:none report clientWidth 0, so any
            // frame scaled while filtered out would be stuck at scale 0.
            scaleAllFrames();
        });
    });

});
