var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 20,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
    },
    loop: true,
});

swiper.on('slideChange', updateDepthFaces);
updateDepthFaces();

function updateDepthFaces() {
    var realCount = document.querySelectorAll(
        '.swiper-slide:not(.swiper-slide-duplicate)'
    ).length;

    var activeSlide = swiper.slides[swiper.activeIndex];
    var activeReal = parseInt(activeSlide.getAttribute('data-swiper-slide-index'));

    Array.from(swiper.slides).forEach(function (slide) {
        slide.querySelectorAll('.depth-face').forEach(function (el) { el.remove(); });

        var realIdx = parseInt(slide.getAttribute('data-swiper-slide-index'));
        if (isNaN(realIdx)) return;

        var diff = realIdx - activeReal;
        if (diff > realCount / 2)  diff -= realCount;
        if (diff < -realCount / 2) diff += realCount;
        if (diff === 0) return;

        var dir = diff < 0 ? 'left' : 'right';

        var side = document.createElement('div');
        side.className = 'depth-face depth-side-' + dir;
        slide.appendChild(side);

        var top = document.createElement('div');
        top.className = 'depth-face depth-top-' + dir;
        slide.appendChild(top);
    });
}
