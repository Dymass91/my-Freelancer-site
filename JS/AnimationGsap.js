var counterEl = document.querySelector('.counter-number');
var barFill = document.querySelector('.loader-bar-fill');
var duration = 1200;
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
        setTimeout(exitLoader, 200);
    }
}

function exitLoader() {
    TweenMax.to(".wrapper", 0.8, {
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

    // Hero subtitle rotator: reveal it once the loader clears, same timing
    // this used to share with the (now removed) header-1/2/3 letter reveal.
    setTimeout(function () {
        window.dispatchEvent(new Event('hero:reveal'));
    }, 700);

    TweenMax.staggerFrom(".hero-container > div", 1.5, {
        opacity: 0,
        y: 20,
        ease: Expo.easeInOut,
        delay: 0.9
    }, 0.1);
}

requestAnimationFrame(animateCounter);
