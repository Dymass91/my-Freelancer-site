var isMobileScreen = window.innerWidth < 1025;

var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: isMobileScreen ? 0 : 15,
        stretch: 0,
        depth: isMobileScreen ? 30 : 80,
        modifier: 1,
        slideShadows: false,
    },
    loop: true,
    lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 1,
    },
});
