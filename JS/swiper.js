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
    watchSlidesProgress: true,
});

swiper.on('setTranslate', updateDepthFaces);
updateDepthFaces();

function updateDepthFaces() {
    Array.from(swiper.slides).forEach(function (slide) {
        if (!slide.querySelector('.depth-side-right')) {
            ['left', 'right'].forEach(function (dir) {
                var sideEl = document.createElement('div');
                sideEl.className = 'depth-face depth-side-' + dir;
                slide.appendChild(sideEl);
                var topEl = document.createElement('div');
                topEl.className = 'depth-face depth-top-' + dir;
                slide.appendChild(topEl);
            });
        }

        var progress = typeof slide.progress === 'number' ? slide.progress : 0;
        var absProgress = Math.abs(progress);
        var opacity = Math.min(1, absProgress);

        // Further slides get a shallower angle: max 45° at distance 1, decreasing beyond
        var angle = absProgress > 0 ? Math.min(45, Math.max(8, 45 / absProgress)) : 0;
        var offset = Math.round(12 * Math.tan(angle * Math.PI / 180));

        var leftSide  = slide.querySelector('.depth-side-left');
        var leftTop   = slide.querySelector('.depth-top-left');
        var rightSide = slide.querySelector('.depth-side-right');
        var rightTop  = slide.querySelector('.depth-top-right');

        rightSide.style.transform = 'skewY(-' + angle + 'deg)';
        leftSide.style.transform  = 'skewY(' + angle + 'deg)';
        rightTop.style.clipPath = 'polygon(0% 100%, ' + offset + 'px 0%, 100% 0%, calc(100% - ' + offset + 'px) 100%)';
        leftTop.style.clipPath  = 'polygon(0% 0%, ' + offset + 'px 100%, 100% 100%, calc(100% - ' + offset + 'px) 0%)';

        if (progress < 0) {
            rightSide.style.opacity = opacity;
            rightTop.style.opacity  = opacity;
            leftSide.style.opacity  = 0;
            leftTop.style.opacity   = 0;
        } else if (progress > 0) {
            leftSide.style.opacity  = opacity;
            leftTop.style.opacity   = opacity;
            rightSide.style.opacity = 0;
            rightTop.style.opacity  = 0;
        } else {
            leftSide.style.opacity  = 0;
            leftTop.style.opacity   = 0;
            rightSide.style.opacity = 0;
            rightTop.style.opacity  = 0;
        }
    });
}
