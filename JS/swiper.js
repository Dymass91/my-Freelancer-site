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
    on: {
        init: updateDepthFaces,
        slideChange: updateDepthFaces,
    }
});

function updateDepthFaces() {
    var realCount = document.querySelectorAll(
        '.swiper-slide:not(.swiper-slide-duplicate)'
    ).length;

    var activeSlide = swiper.slides[swiper.activeIndex];
    var activeReal = parseInt(activeSlide.getAttribute('data-swiper-slide-index'));

    Array.from(swiper.slides).forEach(function (slide) {
        // Remove old faces
        slide.querySelectorAll('.depth-face').forEach(function (el) { el.remove(); });

        var card = slide.querySelector('.card');
        if (!card) return;

        var realIdx = parseInt(slide.getAttribute('data-swiper-slide-index'));
        if (isNaN(realIdx)) return;

        // Shortest-path distance around the loop
        var diff = realIdx - activeReal;
        if (diff > realCount / 2)  diff -= realCount;
        if (diff < -realCount / 2) diff += realCount;
        if (diff === 0) return; // active slide — no faces

        var dir = diff < 0 ? 'left' : 'right';

        // Side face
        var side = document.createElement('div');
        side.className = 'depth-face depth-side-' + dir;
        card.appendChild(side);

        // Top face
        var top = document.createElement('div');
        top.className = 'depth-face depth-top-' + dir;
        card.appendChild(top);
    });
}
