function updateEffects(slider) {
    var details = slider.track.details;
    if (!details) return;
    details.slides.forEach(function(slideDetail, idx) {
        var dist = Math.abs(slideDetail.distance);
        var scale = Math.max(0.82, 1 - dist * 0.1);
        var opacity = Math.max(0.45, 1 - dist * 0.28);
        slider.slides[idx].style.transform = 'scale(' + scale + ')';
        slider.slides[idx].style.opacity = opacity;
    });
}

function createDots(slider) {
    var dotsEl = document.querySelector('.portfolio-dots');
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    slider.slides.forEach(function(_, idx) {
        var dot = document.createElement('button');
        dot.classList.add('portfolio-dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', function() { slider.moveToIdx(idx); });
        dotsEl.appendChild(dot);
    });
}

function updateDots(slider) {
    var dots = document.querySelectorAll('.portfolio-dot');
    var rel = slider.track.details.rel;
    dots.forEach(function(dot, idx) {
        dot.classList.toggle('active', idx === rel);
    });
}

var slider = new KeenSlider('#portfolio-slider', {
    loop: true,
    mode: 'free-snap',
    slides: {
        perView: 1.35,
        spacing: 24,
        origin: 'center'
    },
    breakpoints: {
        '(max-width: 767px)': {
            slides: { perView: 1.08, spacing: 12, origin: 'center' }
        }
    },
    created: function(s) {
        updateEffects(s);
        createDots(s);
    },
    detailsChanged: function(s) {
        updateEffects(s);
    },
    slideChanged: function(s) {
        updateDots(s);
    }
});

document.querySelector('.portfolio-arrow--prev').addEventListener('click', function() {
    slider.prev();
});
document.querySelector('.portfolio-arrow--next').addEventListener('click', function() {
    slider.next();
});
