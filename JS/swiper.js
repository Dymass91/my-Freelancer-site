var DEPTH = 20;

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
            var rs = document.createElement('div');
            rs.className = 'depth-face depth-side-right';
            slide.appendChild(rs);

            var rt = document.createElement('div');
            rt.className = 'depth-face depth-top-right';
            rt.style.clipPath = 'polygon(0% 100%, ' + DEPTH + 'px 0%, 100% 0%, calc(100% - ' + DEPTH + 'px) 100%)';
            slide.appendChild(rt);

            var ls = document.createElement('div');
            ls.className = 'depth-face depth-side-left';
            slide.appendChild(ls);

            var lt = document.createElement('div');
            lt.className = 'depth-face depth-top-left';
            lt.style.clipPath = 'polygon(0% 0%, ' + DEPTH + 'px 100%, 100% 100%, calc(100% - ' + DEPTH + 'px) 0%)';
            slide.appendChild(lt);
        }

        var progress = typeof slide.progress === 'number' ? slide.progress : 0;
        var absProgress = Math.abs(progress);
        var opacity = Math.min(1, absProgress);

        var angle = absProgress > 0 ? Math.min(45, Math.max(8, 45 / absProgress)) : 0;
        // Top face height = DEPTH * tan(angle) so it meets the side face corner exactly
        var topH  = Math.round(DEPTH * Math.tan(angle * Math.PI / 180));

        var leftSide  = slide.querySelector('.depth-side-left');
        var leftTop   = slide.querySelector('.depth-top-left');
        var rightSide = slide.querySelector('.depth-side-right');
        var rightTop  = slide.querySelector('.depth-top-right');

        rightSide.style.transform = 'skewY(-' + angle + 'deg)';
        leftSide.style.transform  = 'skewY(' + angle + 'deg)';

        rightTop.style.height = topH + 'px';
        rightTop.style.top    = (-topH) + 'px';
        leftTop.style.height  = topH + 'px';
        leftTop.style.top     = (-topH) + 'px';

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
