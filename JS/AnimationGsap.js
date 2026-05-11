var textWrapper = document.querySelector('.header-1');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

var textWrapper2 = document.querySelector('.header-2');
textWrapper2.innerHTML = textWrapper2.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

var textWrapper3 = document.querySelector('.header-3');
textWrapper3.innerHTML = textWrapper3.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

var counterEl = document.querySelector('.counter-number');
var barFill = document.querySelector('.loader-bar-fill');
var duration = 2400;
var startTime = null;

function animateCounter(timestamp) {
    if (!startTime) startTime = timestamp;
    var elapsed = timestamp - startTime;
    var progress = Math.min(elapsed / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    var count = Math.floor(eased * 100);

    counterEl.textContent = count;
    barFill.style.width = count + '%';

    if (progress < 1) {
        requestAnimationFrame(animateCounter);
    } else {
        counterEl.textContent = 100;
        barFill.style.width = '100%';
        setTimeout(exitLoader, 400);
    }
}

function exitLoader() {
    TweenMax.to(".wrapper", 1.2, {
        y: "-100%",
        ease: Expo.easeInOut,
        onComplete: function() {
            document.querySelector('.wrapper').style.display = 'none';
        }
    });

    TweenMax.to(".box-header", 1.2, {
        y: "-100%",
        ease: Expo.easeInOut,
        delay: 0.3
    });

    anime.timeline().add({
        targets: '.header-1 .letter',
        translateY: [100, 0],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1600,
        delay: function(el, i) { return 700 + 50 * i; }
    });

    anime.timeline().add({
        targets: '.header-2 .letter',
        translateY: [100, 0],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1600,
        delay: function(el, i) { return 700 + 50 * i; }
    });

    anime.timeline().add({
        targets: '.header-3 .letter',
        translateY: [100, 0],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1600,
        delay: function(el, i) { return 1100 + 50 * i; }
    });

    var heroWrap = document.querySelector('.hero-photo-wrap');
    if (heroWrap) {
        var isMobile = window.innerWidth <= 801;
        if (!isMobile) {
            heroWrap.style.opacity = '0';
            heroWrap.style.transform = 'translate(-50%, -55%) translateY(120px)';
            anime({
                targets: { ty: 120, op: 0 },
                ty: 0,
                op: 1,
                easing: 'easeOutExpo',
                duration: 1800,
                delay: 800,
                update: function(anim) {
                    var s = anim.animatables[0].target;
                    heroWrap.style.transform = 'translate(-50%, -55%) translateY(' + s.ty + 'px)';
                    heroWrap.style.opacity   = s.op;
                }
            });
        }
    }

    TweenMax.staggerFrom(".menu > div", 1.5, {
        opacity: 0,
        y: 20,
        ease: Expo.easeInOut,
        delay: 0.9
    }, 0.1);

    TweenMax.staggerFrom(".hero-container > div", 1.5, {
        opacity: 0,
        y: 20,
        ease: Expo.easeInOut,
        delay: 0.9
    }, 0.1);
}

requestAnimationFrame(animateCounter);

// ── First scroll snaps to #About ──
(function () {
    var about = document.getElementById('About');
    if (!about) return;
    var snapping = false;

    window.addEventListener('wheel', function (e) {
        if (snapping) { e.preventDefault(); return; }
        if (window.scrollY > 80) return;
        if (e.deltaY <= 0) return;

        snapping = true;
        e.preventDefault();
        anime({
            targets: { y: window.scrollY },
            y: about.offsetTop,
            duration: 1600,
            easing: 'easeInOutQuart',
            update: function (anim) {
                window.scrollTo(0, anim.animatables[0].target.y);
            },
            complete: function () { snapping = false; }
        });
    }, { passive: false });
})();

// ── Hero scroll-out: fade + move up as user scrolls away ──
(function () {
  var wrap  = document.querySelector('.hero-photo-wrap');
  var title = document.querySelector('.header-text');
  var nav   = document.querySelector('.Header-pages');
  var lang  = document.querySelector('.container-header .langWrap');

  var isMobileScroll = window.innerWidth <= 801;
  window.addEventListener('scroll', function () {
    var ty = -(window.scrollY * 0.4);

    if (wrap && !isMobileScroll)  { wrap.style.transform  = 'translate(-50%, -55%) translateY(' + ty + 'px)'; }
    if (title) { title.style.transform = 'translate(-50%, -50%) translateY(' + ty + 'px)'; }
    if (nav)   { nav.style.transform   = 'translateY(' + ty + 'px)'; }
    if (lang)  { lang.style.transform  = 'translateY(' + ty + 'px)'; }
  }, { passive: true });
})();
