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
    ////// homepage's own page loader (.wrapper, Landing.css - label,
    ////// counter, progress bar), scaled into each card. Injected here
    ////// rather than authored in every card's markup since
    ////// .browser-frame__viewport is one shared component (hero
    ////// preview, portfolio grid, realizacje grid). An iframe paints
    ////// an opaque blank box the moment it starts loading, well
    ////// before the embedded page itself appears, so the indicator
    ////// has to sit ABOVE it (z-index, not behind).
    //////
    ////// The percentage is simulated, exactly like the homepage's own
    ////// counter (AnimationGsap.js) - there is no browser API that
    ////// exposes real load progress for cross-origin iframe content,
    ////// so a genuinely accurate number isn't available here (or
    ////// anywhere an iframe embeds a page you don't control). Eases
    ////// toward CAP and keeps creeping slowly past it rather than
    ////// stalling dead, so it never looks frozen even on the slowest
    ////// real loads (measured 13-40s - see FALLBACK_TIMEOUT below).
    ////// finish() snaps it to 100 the moment we actually know the
    ////// card is ready (load/error/timeout), then that state fades
    ////// the whole layer out via CSS. //////

    var CARD_LOADERS = new WeakMap();

    function createFrameLoader(viewport) {
        var loading = document.createElement('div');
        loading.className = 'browser-frame__loading';
        loading.setAttribute('aria-hidden', 'true');
        loading.innerHTML =
            '<div class="browser-frame__loading-inner">' +
                '<div class="browser-frame__loading-label">Ładowanie</div>' +
                '<div class="browser-frame__loading-percent">' +
                    '<span class="browser-frame__loading-number">0</span>' +
                    '<span class="browser-frame__loading-percent-sign">%</span>' +
                '</div>' +
                '<div class="browser-frame__loading-track"><div class="browser-frame__loading-fill"></div></div>' +
            '</div>';
        viewport.insertBefore(loading, viewport.firstChild);

        var numberEl = loading.querySelector('.browser-frame__loading-number');
        var fillEl = loading.querySelector('.browser-frame__loading-fill');
        var CAP = 92;
        var TAU = 3.2; // seconds - controls how fast it approaches CAP
        var startTime = null;
        var finished = false;
        var rafId = null;

        function render(value) {
            numberEl.textContent = Math.round(value);
            fillEl.style.width = value + '%';
        }

        function tick(timestamp) {
            if (finished) return;
            if (startTime === null) startTime = timestamp;
            var elapsed = (timestamp - startTime) / 1000;
            render(CAP * (1 - Math.exp(-elapsed / TAU)));
            rafId = requestAnimationFrame(tick);
        }
        rafId = requestAnimationFrame(tick);

        return {
            finish: function () {
                if (finished) return;
                finished = true;
                if (rafId) cancelAnimationFrame(rafId);
                render(100);
            }
        };
    }

    document.querySelectorAll('.browser-frame__viewport').forEach(function (viewport) {
        if (!viewport.querySelector('.browser-frame__iframe')) return;
        CARD_LOADERS.set(viewport, createFrameLoader(viewport));
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
        var viewport = card.querySelector('.browser-frame__viewport');
        var loader = viewport && CARD_LOADERS.get(viewport);

        // Snaps the counter to 100% immediately, then holds it visible
        // for a beat before fading the loader away - without this the
        // layer would vanish the instant "load" fires and the jump
        // from ~92% straight to gone would read as a skipped number.
        function complete() {
            if (loader) loader.finish();
            setTimeout(function () {
                card.classList.add('is-frame-loaded');
            }, 260);
        }

        var settled = false;
        var timer = setTimeout(function () {
            if (settled) return;
            settled = true;
            card.classList.add('mode-image');
            iframe.remove();
            complete();
        }, FALLBACK_TIMEOUT);

        iframe.addEventListener('load', function () {
            settled = true;
            clearTimeout(timer);
            complete();
        });
        iframe.addEventListener('error', function () {
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            card.classList.add('mode-image');
            iframe.remove();
            complete();
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
