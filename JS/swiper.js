(function () {
    var slides = Array.from(document.querySelectorAll('.slide'));
    var dots = Array.from(document.querySelectorAll('.slider-dot'));
    var total = slides.length;
    var current = 0;

    function update() {
        slides.forEach(function (slide, i) {
            slide.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');
            var diff = (i - current + total) % total;
            if (diff === 0)            slide.classList.add('active');
            else if (diff === 1)       slide.classList.add('next');
            else if (diff === total-1) slide.classList.add('prev');
            else if (diff === 2)       slide.classList.add('far-next');
            else                       slide.classList.add('far-prev');
        });
        dots.forEach(function (dot, i) {
            dot.classList.toggle('active', i === current);
        });
    }

    document.querySelector('.slider-next').addEventListener('click', function () {
        current = (current + 1) % total;
        update();
    });

    document.querySelector('.slider-prev').addEventListener('click', function () {
        current = (current - 1 + total) % total;
        update();
    });

    slides.forEach(function (slide) {
        slide.addEventListener('click', function () {
            if (slide.classList.contains('next')) {
                current = (current + 1) % total;
                update();
            } else if (slide.classList.contains('prev')) {
                current = (current - 1 + total) % total;
                update();
            }
        });
    });

    dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
            current = i;
            update();
        });
    });

    update();
})();
