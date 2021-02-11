
const NavBar = document.querySelector('.navbar')
const navbarToggler = document.querySelector(".navbar-toggler");
const navbarMenu = document.querySelector(".navbar ul");
const navbarLinks = document.querySelectorAll(".navbar a, .boxArrow a , .to-top, .Header-pages a, .AboutMe-hrefToContact");

navbarToggler.addEventListener("click", navbarTogglerClick);

//////// function for RWD Navbar ///////////

function navbarTogglerClick() {
    navbarToggler.classList.toggle("open-navbar-toggler");
    navbarMenu.classList.toggle("open");
}

for (let i = 0; i < navbarLinks.length; i++) {
    navbarLinks[i].addEventListener("click", navbarLinkClick);
}

function navbarLinkClick(event) {

    smoothScroll(event); // Call the "smoothScroll" function

    if (navbarMenu.classList.contains("open")) { // Close navbarMenu in smaller screens
        navbarToggler.click();

    }

}

/////// Smooth-Scrolling ////////////

function smoothScroll(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href") === "#" ? "header" :
        event.currentTarget.getAttribute("href");
    const targetPosition = document.querySelector(targetId).offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;


    window.requestAnimationFrame(step);

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
        if (progress < duration) window.requestAnimationFrame(step);
    }
}

////// Easing Function  /////////

function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
};


////// Navbar show and hide function  /////////

window.addEventListener('scroll', function () {
    const top = this.scrollY;

    if (top > 300) {

        NavBar.classList.add('show');

    } else {

        NavBar.classList.remove('show');

    };
});