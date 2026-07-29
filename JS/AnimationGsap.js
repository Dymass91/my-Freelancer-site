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

    // Same base delay (700) as header-1/header-2 above: "Tomasz Matyszczak",
    // "Front-end Developer" and the hero-rotator subtitle (dispatched below)
    // all start as one group instead of trailing each other.
    anime.timeline().add({
        targets: '.header-3 .letter',
        translateY: [100, 0],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1600,
        delay: function(el, i) { return 700 + 50 * i; }
    });

    // Hero subtitle rotator: reveal it at the same moment header-1/2/3's
    // letters start, so all three appear together as one group.
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
