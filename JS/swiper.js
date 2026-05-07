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
                var side = document.createElement('div');
                side.className = 'depth-face depth-side-' + dir;
                slide.appendChild(side);
                var top = document.createElement('div');
                top.className = 'depth-face depth-top-' + dir;
                slide.appendChild(top);
            });
        }

        var progress = typeof slide.progress === 'number' ? slide.progress : 0;
        var opacity = Math.min(1, Math.abs(progress));

        var leftSide  = slide.querySelector('.depth-side-left');
        var leftTop   = slide.querySelector('.depth-top-left');
        var rightSide = slide.querySelector('.depth-side-right');
        var rightTop  = slide.querySelector('.depth-top-right');

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
