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
////    original SVG is cloned inline as-is (unmodified appearance),
////    with one added radial-gradient rect inserted UNDER the square
////    layers and ABOVE the white base rect - so the glow only shows
////    through the gaps between squares, never recoloring a square
////    itself, and follows the cursor directly.
////
//// Both use a plain CSS opacity transition for smooth ramp up/down
//// rather than a hand-rolled per-frame easing loop, and both are
//// skipped entirely (leaving the plain background untouched) on
//// touch/coarse-pointer devices, devices without hover, and
//// prefers-reduced-motion. ////

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

  function supportsEffect() {
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
      if (!window.matchMedia('(hover: hover)').matches) return false;
      if (!window.matchMedia('(pointer: fine)').matches) return false;
      return true;
    } catch (e) {
      return false;
    }
  }

  if (!supportsEffect()) return;

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

    function onMove(e) {
      pendingX = e.clientX;
      pendingY = e.clientY;
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

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave, { passive: true });

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

    // Glow layer: a radial gradient following the cursor, inserted
    // right after the first (white base) rect and before every
    // pattern-filled square layer - so the squares draw on TOP of it
    // and occlude it wherever a square exists, leaving the glow
    // visible only in the gaps between them.
    var defs = svg.querySelector('defs') || svg.insertBefore(document.createElementNS(SVG_NS, 'defs'), svg.firstChild);
    var gradient = document.createElementNS(SVG_NS, 'radialGradient');
    var gradId = 'prism-cursor-glow';
    gradient.setAttribute('id', gradId);
    gradient.setAttribute('gradientUnits', 'userSpaceOnUse');
    gradient.setAttribute('cx', vbW / 2);
    gradient.setAttribute('cy', vbH / 2);
    [
      ['0%', '0.4'],
      ['55%', '0.16'],
      ['100%', '0'],
    ].forEach(function (s) {
      var stop = document.createElementNS(SVG_NS, 'stop');
      stop.setAttribute('offset', s[0]);
      stop.setAttribute('stop-color', '#64d3ff');
      stop.setAttribute('stop-opacity', s[1]);
      gradient.appendChild(stop);
    });
    defs.appendChild(gradient);

    var glowRect = document.createElementNS(SVG_NS, 'rect');
    glowRect.setAttribute('x', '0');
    glowRect.setAttribute('y', '0');
    glowRect.setAttribute('width', '100%');
    glowRect.setAttribute('height', '100%');
    glowRect.setAttribute('fill', 'url(#' + gradId + ')');
    glowRect.style.opacity = '0';
    glowRect.style.transition = 'opacity .35s ease';
    // First non-defs child of the source is the white base rect (see
    // pattern-randomized*.svg's structure) - insert right after it so
    // every subsequent pattern-filled rect (the squares) draws on top.
    var firstRect = svg.querySelector('rect');
    if (firstRect && firstRect.nextSibling) {
      svg.insertBefore(glowRect, firstRect.nextSibling);
    } else {
      svg.appendChild(glowRect);
    }

    var GLOW_SCREEN_RADIUS = 190; // px on screen - middle of the requested 150-220px range

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
      gradient.setAttribute('r', GLOW_SCREEN_RADIUS / currentScale());
    }
    updateRadius();

    var pendingX = null, pendingY = null, ticking = false, pointerInside = false;

    function onMove(e) {
      pendingX = e.clientX;
      pendingY = e.clientY;
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
        gradient.setAttribute('cx', pt[0]);
        gradient.setAttribute('cy', pt[1]);
        glowRect.style.opacity = '1';
      } else {
        glowRect.style.opacity = '0';
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave, { passive: true });

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateRadius, 150);
    });

    document.body.classList.add('prism-js-active');
  }
})();
