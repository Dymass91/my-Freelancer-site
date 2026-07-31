// Wraps each WORD in its own inline-block span (one atomic box per word,
// so the line can only wrap between words, same as plain text), with the
// per-letter animation spans nested inside it. Splitting straight into
// per-letter spans (the old approach) removed word boundaries entirely -
// every letter became its own independent inline-block box, so the
// browser could break a line between ANY two letters, not just at
// spaces. Invisible while this only ever held short single words
// ("Tomasz" / "Matyszczak"), but breaks visibly on longer text.
function splitIntoAnimatedLetters(el) {
    el.innerHTML = el.textContent.split(' ').map(function (word) {
        return "<span class='word-wrap' style='display:inline-block'>" +
            word.replace(/\S/g, "<span class='letter'>$&</span>") +
            "</span>";
    }).join(' ');
}

var textWrapper = document.querySelector('.header-1');
splitIntoAnimatedLetters(textWrapper);

var textWrapper2 = document.querySelector('.header-2');
splitIntoAnimatedLetters(textWrapper2);

var textWrapper3 = document.querySelector('.header-3');
splitIntoAnimatedLetters(textWrapper3);

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
