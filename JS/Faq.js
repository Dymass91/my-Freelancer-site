//// FAQ accordion: each question toggles its own answer independently
//// (not the "only one open at a time" pattern) - just an
//// aria-expanded flip, CSS/FAQ.css does the actual expand/collapse
//// animation off that attribute (grid-template-rows 0fr/1fr), no
//// height measuring needed here. ////

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.faq-question').forEach(function (question) {
        question.addEventListener('click', function () {
            var expanded = question.getAttribute('aria-expanded') === 'true';
            question.setAttribute('aria-expanded', String(!expanded));
        });
    });
});
