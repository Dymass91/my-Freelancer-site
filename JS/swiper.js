if (window.innerWidth >= 768) {
    new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 15,
            stretch: 0,
            depth: 80,
            modifier: 1,
            slideShadows: false,
        },
        loop: true,
    });
}
