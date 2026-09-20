document.addEventListener('DOMContentLoaded', function () {

    ////// Live-preview scaling (iframe rendered at a fixed "desktop"
    ////// size - normally 1280x800, or a narrow mobile width for
    ////// .portfolio-card--mobile-preview cards, see PortfolioGrid.css -
    ////// then scaled down to fit each card) //////

    function scaleFrame(viewport) {
        var iframe = viewport.querySelector('.browser-frame__iframe');
        if (!iframe) return;
        var width = viewport.clientWidth;
        // offsetWidth reads the iframe's own CSS width (1280px default,
        // 390px for the mobile-preview variant) - unaffected by the
        // transform:scale already applied here on a previous call, so
        // this stays accurate across repeated resize recalculations
        // without needing a separate constant per variant.
        var frameWidth = iframe.offsetWidth;
        if (!width || !frameWidth) return;
        iframe.style.transform = 'scale(' + (width / frameWidth) + ')';
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
    // from ~13s to ~40s on desktop wifi, well past the ~2.5s originally
    // planned. Since none of these projects are actually blocked (verified
    // via response headers and a manual embed test - see project notes), a
    // short timeout would falsely swap nearly every card to its static
    // image. This is now a safety net against a genuinely stuck/blocked
    // embed, not a quality gate, so it can afford to be generous - the
    // card shows the loading bar (above) the whole time until the real
    // preview pops in.
    //
    // Mobile gets a longer budget on top of that: several of these
    // concurrent cross-origin loads competing over a slower/variable
    // cellular connection routinely blow past the desktop-measured 40s
    // ceiling even with nothing actually wrong, so the plain 20s timeout
    // was swapping cards to their static image on first load, not just
    // after the tab had been backgrounded (see the visibility handling
    // below, which is a separate issue). Keyed off viewport width rather
    // than a connection-speed API (Network Information isn't supported in
    // Safari, mobile's the reliable signal we actually have).
    var IS_NARROW_VIEWPORT = window.matchMedia('(max-width: 768px)').matches;
    var FALLBACK_TIMEOUT = IS_NARROW_VIEWPORT ? 45000 : 20000;

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

        // A plain setTimeout counts down in real wall-clock time even
        // while this browser tab sits in the background - but a
        // backgrounded tab is exactly when the browser itself
        // deprioritizes the iframe's own network/rendering, so it
        // legitimately needs longer than FALLBACK_TIMEOUT to finish.
        // Without this, leaving the tab unfocused for a while and
        // coming back showed every still-loading card suddenly
        // "reverting" to its static image - the countdown had quietly
        // burned through while nobody was watching. Pausing/resuming
        // the remaining budget around visibilitychange means only
        // time spent actually watching a stuck card counts against it.
        var timeLeft = FALLBACK_TIMEOUT;
        var timerStartedAt = null;
        var timer = null;

        function onTimeout() {
            if (settled) return;
            settled = true;
            card.classList.add('mode-image');
            iframe.remove();
            complete();
        }
        function startTimer() {
            timerStartedAt = Date.now();
            timer = setTimeout(onTimeout, timeLeft);
        }
        function pauseTimer() {
            if (!timer) return;
            clearTimeout(timer);
            timer = null;
            timeLeft -= Date.now() - timerStartedAt;
            if (timeLeft < 0) timeLeft = 0;
        }
        startTimer();
        document.addEventListener('visibilitychange', function () {
            if (settled) return;
            if (document.hidden) {
                pauseTimer();
            } else {
                startTimer();
            }
        });

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

    ////// Technology filters, with a "blocks scatter/reassemble"
    ////// transition between filter states - a FLIP animation (First/
    ////// Last/Invert/Play): cards leaving the filtered set slide off
    ////// past the edge of the page, cards joining it slide back in
    ////// from that same edge, and cards present in both the old and
    ////// new filter just glide from their old grid slot to their new
    ////// one - so switching between Wszystkie/Realizacje/Koncepcje
    ////// reads as one continuous rearrangement instead of an instant
    ////// jump-cut. //////

    var filterButtons = document.querySelectorAll('.portfolio-filter');
    // Scoped to the grid - the hero section reuses .portfolio-card for its
    // flagship-project preview (same browser-frame styling/JS), and isn't
    // part of the filterable set.
    var cards = document.querySelectorAll('.portfolio-grid .portfolio-card');
    var grid = document.querySelector('.portfolio-grid');
    var REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var MOVE_MS = 420;
    var EXIT_MS = 380;

    // Which edge a card flies out to / in from - whichever side of the
    // viewport it's already closer to, so cards scatter apart rather
    // than all funneling toward one edge.
    function exitOffset(rect) {
        var goRight = (rect.left + rect.width / 2) >= (window.innerWidth / 2);
        var distance = window.innerWidth + 200;
        return goRight ? distance : -distance;
    }

    function applyFilter(filter) {
        if (REDUCE_MOTION || !grid) {
            cards.forEach(function (card) {
                var tags = (card.getAttribute('data-tags') || '').split(',');
                var show = filter === 'all' || tags.indexOf(filter) !== -1;
                card.classList.toggle('is-hidden', !show);
            });
            scaleAllFrames();
            return;
        }

        // First: where every currently-visible card sits right now.
        var firstRects = new Map();
        cards.forEach(function (card) {
            if (!card.classList.contains('is-hidden')) {
                firstRects.set(card, card.getBoundingClientRect());
            }
        });

        var exiting = [], entering = [], staying = [];
        cards.forEach(function (card) {
            var tags = (card.getAttribute('data-tags') || '').split(',');
            var show = filter === 'all' || tags.indexOf(filter) !== -1;
            var wasHidden = card.classList.contains('is-hidden');
            if (wasHidden && show) entering.push(card);
            else if (!wasHidden && !show) exiting.push(card);
            else if (!wasHidden && show) staying.push(card);
        });

        // Pull exiting cards out of the grid's normal flow, pinned via
        // position:fixed to the exact screen spot they were already
        // occupying - so the grid reflows the remaining cards
        // immediately (as if they'd already left) with no visual jump,
        // while the exiting card itself stays put for now, ready to
        // slide off from there.
        exiting.forEach(function (card) {
            var rect = firstRects.get(card);
            card.style.position = 'fixed';
            card.style.margin = '0';
            card.style.top = rect.top + 'px';
            card.style.left = rect.left + 'px';
            card.style.width = rect.width + 'px';
            card.style.height = rect.height + 'px';
            card.style.zIndex = '5';
            card.style.transition = 'none';
            card.style.transform = 'translateX(0)';
        });

        // Bring entering cards into flow so the grid finalizes its new
        // layout (exiting cards already removed above, entering cards
        // added here - this is the complete "Last" arrangement).
        entering.forEach(function (card) {
            card.classList.remove('is-hidden');
        });

        // Force a layout flush so the reads below see the settled
        // final grid, not a stale pre-change one.
        void grid.offsetHeight;

        // Entering cards: offset them off past the page edge (Invert),
        // starting from the natural slot they'll animate into.
        entering.forEach(function (card) {
            var rect = card.getBoundingClientRect();
            card.style.transition = 'none';
            card.style.transform = 'translateX(' + exitOffset(rect) + 'px)';
        });

        // Staying cards: Invert - jump (visually, via transform) back
        // to their First position even though the DOM already placed
        // them at Last, so the upcoming transition can animate the
        // difference away.
        var stayingDeltas = staying.map(function (card) {
            var first = firstRects.get(card);
            var last = card.getBoundingClientRect();
            return { card: card, dx: first.left - last.left, dy: first.top - last.top };
        });
        stayingDeltas.forEach(function (item) {
            item.card.style.transition = 'none';
            item.card.style.transform = 'translate(' + item.dx + 'px,' + item.dy + 'px)';
        });

        // Force another flush so all the instant "start state" transforms
        // above are actually painted before transitions are enabled below -
        // otherwise the browser can coalesce start+end into one frame and
        // skip the animation entirely.
        void grid.offsetHeight;

        // Play: enable transitions and set the end state for each group.
        requestAnimationFrame(function () {
            exiting.forEach(function (card) {
                var rect = firstRects.get(card);
                card.style.transition = 'transform ' + EXIT_MS + 'ms cubic-bezier(.4,0,.8,1)';
                card.style.transform = 'translateX(' + exitOffset(rect) + 'px)';
            });
            entering.forEach(function (card) {
                card.style.transition = 'transform ' + MOVE_MS + 'ms cubic-bezier(.2,0,.2,1)';
                card.style.transform = 'translateX(0)';
            });
            stayingDeltas.forEach(function (item) {
                item.card.style.transition = 'transform ' + MOVE_MS + 'ms ease';
                item.card.style.transform = 'translate(0,0)';
            });
        });

        // Cleanup once each group's animation has finished - exiting
        // cards go back into normal display:none/grid flow (invisible,
        // ready to reappear correctly next time), everyone else just
        // loses the inline transform/transition so CSS (e.g. the hover
        // lift) is back in full control.
        setTimeout(function () {
            exiting.forEach(function (card) {
                card.classList.add('is-hidden');
                card.style.position = '';
                card.style.margin = '';
                card.style.top = '';
                card.style.left = '';
                card.style.width = '';
                card.style.height = '';
                card.style.zIndex = '';
                card.style.transition = '';
                card.style.transform = '';
            });
        }, EXIT_MS + 20);

        setTimeout(function () {
            entering.concat(staying).forEach(function (card) {
                card.style.transition = '';
                card.style.transform = '';
            });
        }, MOVE_MS + 20);

        // Cards hidden via display:none report clientWidth 0, so any
        // frame scaled while filtered out would be stuck at scale 0 -
        // entering cards already have their real layout width the
        // instant they're unhidden above, well before their slide-in
        // finishes, so this doesn't need to wait for the animation.
        scaleAllFrames();
    }

    filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterButtons.forEach(function (b) { b.classList.remove('is-active'); });
            btn.classList.add('is-active');
            applyFilter(btn.getAttribute('data-filter'));
        });
    });

});
