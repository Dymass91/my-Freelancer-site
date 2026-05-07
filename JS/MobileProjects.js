document.addEventListener('DOMContentLoaded', function () {
    var imgboxes = document.querySelectorAll('.Project_wrapper .imgbox');

    document.addEventListener('click', function (e) {
        var box = e.target.closest('.Project_wrapper .imgbox');

        if (!box) {
            imgboxes.forEach(function (b) { b.classList.remove('active'); });
            return;
        }

        var isVisitButton = e.target.closest('.project-layer-button');

        // If the layer is already visible and user tapped the button — navigate
        if (box.classList.contains('active') && isVisitButton) {
            return;
        }

        // First tap: show the overlay, block default link behaviour
        if (!box.classList.contains('active')) {
            imgboxes.forEach(function (b) { b.classList.remove('active'); });
            box.classList.add('active');
            e.preventDefault();
        }
    });
});
