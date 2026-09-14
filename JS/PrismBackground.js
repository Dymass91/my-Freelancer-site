//// Interactive cursor-following glow for the site's background,
//// whatever pattern body { background: url(...) } in styles.css
//// currently points to. The source file on disk is never modified.
////
//// Two background "shapes" are supported, auto-detected from the
//// fetched markup:
////  - Triangle/polygon patterns (e.g. subtle-prism.svg): a <pattern>
////    fill can't be targeted per rendered instance, so the tile's
////    polygons are unrolled into real, individually addressable
////    <polygon> elements across the viewport (visually identical to
////    the plain pattern at rest). Each gets a cyan "glow" twin whose
////    opacity rises the closer the cursor's center is to that
////    triangle - nearest triangle brightest, falling off with
////    distance.
////  - Noise/square patterns (e.g. pattern-randomized*.svg): the whole
////    original SVG is cloned inline as-is (unmodified appearance) and
////    the square layers are left fully visible, untouched, everywhere
////    - nothing is ever erased/hidden. A second copy of just those
////    square shapes is layered on top, brightened + given a soft cyan
////    glow via a CSS filter (not a separately drawn shape or tint),
////    masked so that lit copy only shows through a soft circle that
////    follows the cursor/touch: squares right at the pointer glow
////    brightest, the glow itself fades out toward the edge of that
////    local radius. Lifting the finger/moving away just fades the
////    highlight back to nothing.
////
//// Both use a plain CSS opacity transition for smooth ramp up/down
//// rather than a hand-rolled per-frame easing loop, and follow a
//// single pointer (mouse, or tap-and-drag on touch; eases out on
//// mouseleave/release). Works on both desktop (mouse/trackpad) and
//// touch; prefers-reduced-motion disables this everywhere. ////

(function () {
  var SVG_NS = 'http://www.w3.org/2000/svg';

  // Reads whatever body { background: url(...) } currently points to
  // in styles.css, rather than hardcoding a filename - so trying a
  // different background pattern there doesn't leave this silently
  // fetching and overlaying a stale/unrelated file on top of it.
  function currentBackgroundUrl() {
    var bg = getComputedStyle(document.body).backgroundImage;
    var match = /url\(["']?([^"')]+)["']?\)/.exec(bg || '');
    return match ? match[1] : null;
  }

  var RADIUS = 190; // px - proximity radius for the glow falloff
  var CATCHMENT = RADIUS * 1.4; // slightly wider net so fade-out isn't clipped early
  var MAX_OPACITY = 0.55; // glow twin's peak opacity right at the cursor

  // Both desktop (mouse/trackpad) and touch get the effect;
  // prefers-reduced-motion is the only opt-out.
  function supportsEffect() {
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
      var mouseCapable = window.matchMedia('(pointer: fine)').matches || window.matchMedia('(hover: hover)').matches;
      var touchCapable = window.matchMedia('(pointer: coarse)').matches || ('ontouchstart' in window);
      return mouseCapable || touchCapable;
    } catch (e) {
      return false;
    }
  }

  if (!supportsEffect()) return;

  // Idle-activity fade: wraps the whole effect group (not the existing
  // per-triangle/per-mask proximity opacity, which is untouched) in an
  // extra opacity layer that fades in on movement and fades back out
  // ~1.2s after the pointer stops - so the effect is invisible at rest
  // and only appears while the mouse/finger is actually active. Call
  // .poke() from each mode's onMove; CSS transitions handle the actual
  // easing, so retargeting mid-transition (e.g. moving again during a
  // fade-out) just smoothly redirects from whatever the current
  // interpolated opacity is - no jump/flicker.
  var FADE_IN_MS = 300;    // squares/triangles fading IN after movement resumes
  var FADE_OUT_MS = 1200;  // fading OUT once idle
  var IDLE_DELAY_MS = 1200; // how long to wait after the last move before fading out

  function createActivityFade(el) {
    el.style.transition = 'opacity ' + FADE_IN_MS + 'ms ease-out';
    el.style.opacity = '0'; // invisible until the first movement
    var isActive = false;
    var idleTimer = null;

    function goIdle() {
      isActive = false;
      el.style.transition = 'opacity ' + FADE_OUT_MS + 'ms ease-out';
      el.style.opacity = '0';
    }

    return {
      poke: function () {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(goIdle, IDLE_DELAY_MS);
        if (!isActive) {
          isActive = true;
          el.style.transition = 'opacity ' + FADE_IN_MS + 'ms ease-out';
          el.style.opacity = '1';
        }
      },
    };
  }

  // Shared mouse+touch binding: onMove(x, y) gets called with the
  // pointer/first-touch position; onLeave() when the mouse leaves the
  // window or the touch is released/cancelled (the glow then eases
  // out via each mode's own CSS opacity transition).
  function bindPointer(onMove, onLeave) {
    window.addEventListener('mousemove', function (e) {
      onMove(e.clientX, e.clientY);
    }, { passive: true });
    window.addEventListener('mouseleave', onLeave, { passive: true });

    window.addEventListener('touchstart', function (e) {
      if (e.touches.length) onMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    window.addEventListener('touchmove', function (e) {
      if (e.touches.length) onMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    window.addEventListener('touchend', onLeave, { passive: true });
    window.addEventListener('touchcancel', onLeave, { passive: true });
  }

  // The source file's polygon points are plain space-separated numbers
  // ("90 150 0 300 180 300"), not the more common "x,y x,y" comma
  // form - handle both by splitting on any run of commas/whitespace
  // into a flat number list, then grouping into (x, y) pairs.
  function parsePoints(points) {
    var nums = points.trim().split(/[\s,]+/).map(Number);
    var pts = [];
    for (var i = 0; i + 1 < nums.length; i += 2) {
      pts.push([nums[i], nums[i + 1]]);
    }
    return pts;
  }

  function pointsToString(pts) {
    return pts.map(function (p) { return p[0] + ',' + p[1]; }).join(' ');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var url = currentBackgroundUrl();
    if (!url) return;
    fetch(url)
      .then(function (res) { return res.ok ? res.text() : null; })
      .then(function (text) { if (text) init(text); })
      .catch(function () {});
  });

  function init(svgText) {
    var doc = new DOMParser().parseFromString(svgText, 'image/svg+xml');
    var patternEl = doc.querySelector('pattern');
    if (!patternEl) return;

    if (patternEl.querySelector('polygon')) {
      initTriangleGlow(doc, patternEl);
    } else {
      initGapGlow(doc);
    }
  }

  function initTriangleGlow(doc, patternEl) {
    var tileW = parseFloat(patternEl.getAttribute('width'));
    var tileH = parseFloat(patternEl.getAttribute('height'));
    var vb = (patternEl.getAttribute('viewBox') || '').split(/\s+/).map(Number);
    var vbW = vb.length === 4 ? vb[2] : tileW;
    var scale = vbW ? (tileW / vbW) : 1;

    var sourcePolys = Array.prototype.slice.call(patternEl.querySelectorAll('polygon')).map(function (p) {
      var pts = parsePoints(p.getAttribute('points')).map(function (pt) {
        return [pt[0] * scale, pt[1] * scale];
      });
      var sx = 0, sy = 0;
      pts.forEach(function (pt) { sx += pt[0]; sy += pt[1]; });
      return {
        points: pts,
        center: [sx / pts.length, sy / pts.length],
        fill: p.getAttribute('fill') || null,
      };
    });
    if (!sourcePolys.length || !tileW || !tileH) return;

    var container = document.createElement('div');
    container.id = 'prism-bg';
    container.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(container, document.body.firstChild);

    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.display = 'block';
    container.appendChild(svg);

    var backdrop = document.createElementNS(SVG_NS, 'rect');
    backdrop.setAttribute('x', '0');
    backdrop.setAttribute('y', '0');
    backdrop.setAttribute('width', '100%');
    backdrop.setAttribute('height', '100%');
    backdrop.setAttribute('fill', '#ffffff');
    svg.appendChild(backdrop);

    var baseGroup = document.createElementNS(SVG_NS, 'g');
    baseGroup.setAttribute('fill-opacity', '0.1');
    svg.appendChild(baseGroup);

    var glowGroup = document.createElementNS(SVG_NS, 'g');
    svg.appendChild(glowGroup);

    var registry = []; // { cx, cy, el, opacity }
    var active = [];
    var activityFade = createActivityFade(glowGroup);

    function buildGrid() {
      var vw = window.innerWidth;
      var vh = window.innerHeight;
      svg.setAttribute('viewBox', '0 0 ' + vw + ' ' + vh);

      while (baseGroup.firstChild) baseGroup.removeChild(baseGroup.firstChild);
      while (glowGroup.firstChild) glowGroup.removeChild(glowGroup.firstChild);
      registry = [];
      active = [];

      var cols = Math.ceil(vw / tileW) + 1;
      var rows = Math.ceil(vh / tileH) + 1;

      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          var dx = c * tileW, dy = r * tileH;
          sourcePolys.forEach(function (p) {
            var translated = p.points.map(function (pt) { return [pt[0] + dx, pt[1] + dy]; });
            var pointsAttr = pointsToString(translated);

            var base = document.createElementNS(SVG_NS, 'polygon');
            base.setAttribute('points', pointsAttr);
            if (p.fill) base.setAttribute('fill', p.fill);
            baseGroup.appendChild(base);

            var glow = document.createElementNS(SVG_NS, 'polygon');
            glow.setAttribute('points', pointsAttr);
            glow.setAttribute('class', 'prism-glow-tri');
            glowGroup.appendChild(glow);

            registry.push({ cx: p.center[0] + dx, cy: p.center[1] + dy, el: glow, opacity: 0 });
          });
        }
      }
    }

    var pendingX = null, pendingY = null, ticking = false, pointerInside = false;

    function onMove(x, y) {
      activityFade.poke();
      pendingX = x;
      pendingY = y;
      pointerInside = true;
      schedule();
    }
    function onLeave() {
      pointerInside = false;
      schedule();
    }
    function schedule() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    function update() {
      ticking = false;
      var newActive = [];
      if (pointerInside && pendingX !== null) {
        for (var i = 0; i < registry.length; i++) {
          var item = registry[i];
          var dx = item.cx - pendingX, dy = item.cy - pendingY;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist <= CATCHMENT) {
            var t = Math.max(0, 1 - dist / RADIUS);
            var op = t * t * MAX_OPACITY;
            if (Math.abs(op - item.opacity) > 0.003) {
              item.el.style.opacity = op;
              item.opacity = op;
            }
            newActive.push(item);
          }
        }
      }
      active.forEach(function (item) {
        if (newActive.indexOf(item) === -1 && item.opacity !== 0) {
          item.el.style.opacity = 0;
          item.opacity = 0;
        }
      });
      active = newActive;
    }

    bindPointer(onMove, onLeave);

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildGrid, 150);
    });

    buildGrid();

    // The re-render is visually identical to the plain background at
    // rest (same points/colors/opacity) - swap it in now that it's built.
    document.body.classList.add('prism-js-active');
  }

  function initGapGlow(doc) {
    var sourceSvg = doc.documentElement;
    var vb = (sourceSvg.getAttribute('viewBox') || '').split(/\s+/).map(Number);
    if (vb.length !== 4) return; // no viewBox to map cursor coords onto - bail safely
    var vbW = vb[2], vbH = vb[3];

    var container = document.createElement('div');
    container.id = 'prism-bg';
    container.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(container, document.body.firstChild);

    var svg = document.importNode(sourceSvg, true);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    svg.style.display = 'block';
    container.appendChild(svg);

    // The squares themselves stay exactly as-is, always fully visible -
    // never hidden/erased. A second copy of them is layered on top,
    // brightened + given a soft cyan glow (a CSS filter on the SAME
    // square shapes, not a separately drawn shape/tint), and masked so
    // that copy is only visible in a soft circle around the cursor -
    // nearest squares glow brightest, the glow itself fades out toward
    // the edge of that local radius. Lifting the finger/moving away
    // just fades the highlight back down to nothing; the base squares
    // underneath never change.
    var defs = svg.querySelector('defs') || svg.insertBefore(document.createElementNS(SVG_NS, 'defs'), svg.firstChild);

    var firstRect = svg.querySelector('rect'); // the white base rect
    var squareRects = Array.prototype.slice.call(svg.querySelectorAll('rect')).filter(function (r) {
      return r !== firstRect;
    });

    var highlightGroup = document.createElementNS(SVG_NS, 'g');
    squareRects.forEach(function (r) {
      highlightGroup.appendChild(r.cloneNode(false));
    });
    svg.appendChild(highlightGroup);
    highlightGroup.style.filter = 'brightness(1.9) saturate(1.4) drop-shadow(0 0 3px rgba(100, 211, 255, 0.65))';

    var fadeGradId = 'prism-highlight-fade';
    var fadeGradient = document.createElementNS(SVG_NS, 'radialGradient');
    fadeGradient.setAttribute('id', fadeGradId);
    fadeGradient.setAttribute('gradientUnits', 'objectBoundingBox');
    [
      ['0%', '#ffffff'],
      ['70%', '#000000'],
      ['100%', '#000000'],
    ].forEach(function (s) {
      var stop = document.createElementNS(SVG_NS, 'stop');
      stop.setAttribute('offset', s[0]);
      stop.setAttribute('stop-color', s[1]);
      fadeGradient.appendChild(stop);
    });
    defs.appendChild(fadeGradient);

    var maskId = 'prism-highlight-mask';
    var mask = document.createElementNS(SVG_NS, 'mask');
    mask.setAttribute('id', maskId);
    mask.setAttribute('maskUnits', 'userSpaceOnUse');
    mask.setAttribute('x', '0');
    mask.setAttribute('y', '0');
    mask.setAttribute('width', vbW);
    mask.setAttribute('height', vbH);

    var highlightHole = document.createElementNS(SVG_NS, 'circle');
    highlightHole.setAttribute('cx', vbW / 2);
    highlightHole.setAttribute('cy', vbH / 2);
    highlightHole.setAttribute('fill', 'url(#' + fadeGradId + ')');
    highlightHole.style.opacity = '0';
    highlightHole.style.transition = 'opacity .4s ease-out';
    mask.appendChild(highlightHole);
    defs.appendChild(mask);

    highlightGroup.setAttribute('mask', 'url(#' + maskId + ')');

    var activityFade = createActivityFade(highlightGroup);

    var HIGHLIGHT_SCREEN_RADIUS = 170; // px on screen - the local zone squares light up within

    function currentScale() {
      var box = svg.getBoundingClientRect();
      var boxAspect = box.width / box.height;
      var vbAspect = vbW / vbH;
      return boxAspect > vbAspect ? (box.width / vbW) : (box.height / vbH); // slice/cover
    }

    function mapToUserSpace(clientX, clientY, scale) {
      var box = svg.getBoundingClientRect();
      var renderedW = vbW * scale, renderedH = vbH * scale;
      var offsetX = (box.width - renderedW) / 2;
      var offsetY = (box.height - renderedH) / 2;
      return [
        (clientX - box.left - offsetX) / scale,
        (clientY - box.top - offsetY) / scale,
      ];
    }

    function updateRadius() {
      highlightHole.setAttribute('r', HIGHLIGHT_SCREEN_RADIUS / currentScale());
    }
    updateRadius();

    var pendingX = null, pendingY = null, ticking = false, pointerInside = false;

    function onMove(x, y) {
      activityFade.poke();
      pendingX = x;
      pendingY = y;
      pointerInside = true;
      schedule();
    }
    function onLeave() {
      pointerInside = false;
      schedule();
    }
    function schedule() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }
    function update() {
      ticking = false;
      if (pointerInside && pendingX !== null) {
        var scale = currentScale();
        var pt = mapToUserSpace(pendingX, pendingY, scale);
        highlightHole.setAttribute('cx', pt[0]);
        highlightHole.setAttribute('cy', pt[1]);
        highlightHole.style.opacity = '1';
      } else {
        highlightHole.style.opacity = '0';
      }
    }

    bindPointer(onMove, onLeave);

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateRadius, 150);
    });

    document.body.classList.add('prism-js-active');
  }
})();
