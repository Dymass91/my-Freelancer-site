
const langEl = document.querySelector('.langWrap');
const link = document.querySelectorAll('input, a');

const menuHeaderAbout = document.querySelector('.menu_header_About');
const menuHeaderService = document.querySelector('.menu_header_Service');
const menuHeaderProjects = document.querySelector('.menu_header_Projects');
const menuHeaderContact = document.querySelector('.menu_header_Contact');

const navbarHeaderAbout = document.querySelector('.navbar_header_About');
const navbarHeaderService = document.querySelector('.navbar_header_Service');
const navbarHeaderProjects = document.querySelector('.navbar_header_Projects');
const navbarHeaderContact = document.querySelector('.navbar_header_Contact');

const titleEl = document.querySelector('.title');
const descrEl = document.querySelector('.descriptionAbout');

const aboutText1 = document.querySelector('.aboutMe_text1');
const aboutText2 = document.querySelector('.aboutMe_text2');
const aboutText5 = document.querySelector('.aboutMe_text5');
const hrefToContact = document.querySelector('.AboutMe_hrefToContact');


const Serviceh2 = document.querySelector('.service_h2');
const Projectsh2 = document.querySelector('.Projects_h2');
const Contacth2 = document.querySelector('.Contact_h2');

const ServEl1 = document.querySelector('.titleService1');
const discrEl1 = document.querySelector('.descriptionService1');
const discrElSpan = document.querySelector('.descriptionPriceSpan');
const ServPrice = document.querySelector('.service_Price');
const PriceStr = document.querySelector('.Price_strong');

const discServ2 = document.querySelector('.description_Service2');
const discServ2Bot = document.querySelector('.description_Service2_Bottom');
const ServEl2 = document.querySelector('.titleService2');

const discServ3 = document.querySelector('.description_Service3');

const ContactFormTitle = document.querySelector('.Contact_form_title');
const contactTitle = document.querySelector('.contact_title');
const contactSocialTitle = document.querySelector('.contact_title_social');
const informationCountry = document.querySelector('.information_country');
const contactInfoText = document.querySelector('.text');
const btn = document.querySelector('.btn');
const contactName = document.querySelector('.contact_name');
const contactMessage = document.querySelector('.contact_message');


const footerText = document.querySelector('.footer_text');

const footerPolicyText = document.querySelector('.footer_policy_text');
const PolicyButton = document.querySelector('.Policy_button');

const ProjectsTitleText = document.querySelector('.Projects_title_text');

function getTranslatableElements() {
    return [
        menuHeaderAbout, menuHeaderService, menuHeaderProjects, menuHeaderContact,
        navbarHeaderAbout, navbarHeaderService, navbarHeaderProjects, navbarHeaderContact,
        titleEl, descrEl,
        aboutText1, aboutText2, aboutText5, hrefToContact,
        Serviceh2, Projectsh2, Contacth2,
        ServEl1, discrEl1, discrElSpan, ServPrice, PriceStr,
        discServ2, discServ2Bot, ServEl2,
        discServ3,
        ContactFormTitle, contactTitle, contactSocialTitle,
        informationCountry, contactInfoText, btn, contactName, contactMessage,
        footerText, footerPolicyText, PolicyButton,
        ProjectsTitleText
    ].filter(Boolean);
}

function applyTranslation(attr) {
    menuHeaderAbout.textContent = data[attr].menu_header_About;
    menuHeaderService.textContent = data[attr].menu_header_Service;
    menuHeaderProjects.textContent = data[attr].menu_header_Projects;
    menuHeaderContact.textContent = data[attr].menu_header_Contact;

    navbarHeaderAbout.textContent = data[attr].navbar_header_About;
    navbarHeaderService.textContent = data[attr].navbar_header_Service;
    navbarHeaderProjects.textContent = data[attr].navbar_header_Projects;
    navbarHeaderContact.textContent = data[attr].navbar_header_Contact;

    titleEl.textContent = data[attr].title;
    descrEl.textContent = data[attr].descriptionAbout;

    aboutText1.textContent = data[attr].aboutMe_text1;
    aboutText2.textContent = data[attr].aboutMe_text2;
    aboutText5.textContent = data[attr].aboutMe_text5;
    hrefToContact.textContent = data[attr].AboutMe_hrefToContact;

    Serviceh2.textContent = data[attr].service_h2;
    Projectsh2.textContent = data[attr].Projects_h2;
    Contacth2.textContent = data[attr].Contact_h2;

    ServEl1.textContent = data[attr].titleService1;
    discrEl1.textContent = data[attr].descriptionService1;
    discrElSpan.textContent = data[attr].descriptionPriceSpan;
    ServPrice.textContent = data[attr].service_Price;
    PriceStr.textContent = data[attr].Price_strong;

    ProjectsTitleText.textContent = data[attr].Projects_title_text;

    ServEl2.textContent = data[attr].titleService2;
    discServ2.textContent = data[attr].description_Service2;
    discServ2Bot.textContent = data[attr].description_Service2_Bottom;

    discServ3.textContent = data[attr].description_Service3;

    ContactFormTitle.textContent = data[attr].Contact_form_title;
    contactTitle.textContent = data[attr].contact_title;
    contactSocialTitle.textContent = data[attr].contact_title_social;
    informationCountry.textContent = data[attr].information_country;
    contactInfoText.textContent = data[attr].text;
    btn.textContent = data[attr].btn;
    contactName.textContent = data[attr].contact_name;
    contactMessage.textContent = data[attr].contact_message;
    footerText.textContent = data[attr].footer_text;
    PolicyButton.textContent = data[attr].Policy_button;
    footerPolicyText.textContent = data[attr].footer_policy_text;
}

link.forEach(el => {
    el.addEventListener('click', (event) => {
        var target = event.target || event.srcElement;
        var buttonList = document.querySelectorAll(".btn_language");
        buttonList.forEach(function (button) {
            if (button === target && !button.classList.contains("active")) {
                return button.classList.add("active");
            }
            return button.classList.remove("active");
        });

        const attr = el.getAttribute('language');
        if (!attr || !data[attr]) return;

        // Fade to black overlay
        var overlay = document.getElementById('lang-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'lang-overlay';
            overlay.style.cssText = 'position:fixed;inset:0;background:#000;opacity:0;transition:opacity 0.8s ease;z-index:99999;pointer-events:none;';
            document.body.appendChild(overlay);
        }
        overlay.style.pointerEvents = 'all';
        overlay.style.opacity = '1';

        setTimeout(function () {
            applyTranslation(attr);
            overlay.style.opacity = '0';
            setTimeout(function () { overlay.style.pointerEvents = 'none'; }, 850);
        }, 850);
    });
});

var data = {

    "Polish":
    {
        "menu_header_About": "O mnie",
        "menu_header_Service": "Usługi",
        "menu_header_Projects": "Portfolio",
        "menu_header_Contact": "Kontakt",

        "navbar_header_About": "O mnie",
        "navbar_header_Service": "Usługi",
        "navbar_header_Projects": "Portfolio",
        "navbar_header_Contact": "Kontakt",

        "title": "O mnie ",
        "service_h2": "Moje usługi",
        "Projects_h2": "Portfolio",
        "Contact_h2": "Kontakt",


        "descriptionAbout": "Cześć! Tworzę nowoczesne strony internetowe od kilku lat — statyczne i dynamiczne, szyte na miarę potrzeb każdego klienta. Specjalizuję się w HTML, CSS i JavaScript, a także realizuję projekty w React i WordPress.",
        "aboutMe_text1": "Każda strona, którą tworzę, jest responsywna, szybka i zoptymalizowana pod kątem Google — dbam o każdy detal, który przekłada się na Twoje wyniki w sieci.",
        "aboutMe_text2": "Projektuję z myślą o użytkowniku — intuicyjna nawigacja i estetyczny design to standard, nie dodatek.",
        "aboutMe_text3": "Po wdrożeniu przeprowadzam szkolenie z obsługi panelu, dzięki czemu samodzielnie zarządzasz swoimi treściami.",
        "aboutMe_text4": "Oferuję stałe wsparcie techniczne — jesteś pod dobrą opieką długo po uruchomieniu strony.",
        "aboutMe_text5": "Sprawdź moje usługi poniżej i napisz do mnie — wspólnie znajdziemy rozwiązanie dopasowane do Twojego biznesu.",
        "AboutMe_hrefToContact": "napisz do mnie",
        "titleService1": "Oferta",

        "service_Price": "od",

        "Price_strong": "1449zł",

        "descriptionPriceSpan": "W pakiecie otrzymasz:",

        "descriptionService1": "Kompleksową realizację: projekt graficzny, programowanie, optymalizację SEO, zakup hostingu i domeny oraz szkolenie z samodzielnej edycji treści.",

        "titleService2": "Responsywność",

        "description_Service2": "Każda strona działa perfekcyjnie na komputerach, tabletach i smartfonach. Układ automatycznie dostosowuje się do każdego rozmiaru ekranu — żaden klient Cię nie ominie.",

        "description_Service2_Bottom": "Nie masz jeszcze projektu graficznego? Zajmuję się również kreacją wizualną we współpracy ze sprawdzonym grafikiem.",

        "description_Service3": "Sklep internetowy to inwestycja, która pracuje na Ciebie przez całą dobę. Poszerz zasięg swojego biznesu, zautomatyzuj sprzedaż i docieraj do klientów z całej Polski — bez ograniczeń geograficznych sklepu stacjonarnego.",

        "Projects_title_text": "Poniżej znajdziesz wybrane realizacje — projekty komercyjne oraz demonstracyjne, zbudowane w HTML/CSS/JS, React i WordPress.",
        "Project_Live_btn": "Wejdź na stronę",

        "contact_title": "Porozmawiajmy o Twoim projekcie",
        "information_country": "Polska, Piła",
        "Contact_form_title": "Napisz do mnie",
        "contact_title_social": "Połącz się ze mną:",
        "text": "Masz pomysł na stronę lub sklep internetowy? Napisz do mnie — odpowiem w ciągu 24 godzin i ustalimy szczegóły współpracy.",
        "btn": "Wyślij",
        "contact_name": "Imię",
        "contact_message": "Wiadomość",
        "footer_text": " Wszelkie prawa zastrzeżone © 2021",
        "footer_policy_text": "Korzystając z tej strony proszę zapoznać się z  ",
        "Policy_button": " Polityką prywatności"
    },
    "english":
    {
        "menu_header_About": "About",
        "menu_header_Service": "Service",
        "menu_header_Projects": "Portfolio",
        "menu_header_Contact": "Contact",

        "navbar_header_About": "About",
        "navbar_header_Service": "Service",
        "navbar_header_Projects": "Portfolio",
        "navbar_header_Contact": "Contact",

        "title": "About me",
        "service_h2": "My service",
        "Projects_h2": "Portfolio",
        "Contact_h2": "Contact",

        "descriptionAbout": "Hi! I build modern, high-performance websites tailored to each client's needs. With several years of experience in HTML, CSS, JavaScript, React and WordPress, I deliver solutions that look great and drive real results.",
        "aboutMe_text1": "Every website I build is responsive, fast and SEO-optimised — every detail is crafted to boost your visibility online.",
        "aboutMe_text2": "I design with the user in mind — clean layouts, intuitive navigation and polished aesthetics that keep visitors engaged.",
        "aboutMe_text3": "After launch I walk you through managing your site, so you can update content independently from day one.",
        "aboutMe_text4": "I offer ongoing technical support — you're in good hands long after your site goes live.",
        "aboutMe_text5": "Browse my services below and get in touch — together we'll find the right solution for your business.",
        "AboutMe_hrefToContact": "get in touch",
        "titleService1": "Offer",

        "descriptionPriceSpan": "The package includes:",

        "descriptionService1": "Full delivery: design, development, SEO optimisation, hosting and domain setup, plus a hands-on training session so you can manage your content independently.",

        "service_Price": "from",
        "Price_strong": "1449zł",

        "titleService2": "Responsiveness",
        "description_Service2": "Every site works flawlessly on desktops, tablets and smartphones. The layout adapts automatically to every screen size — so no potential customer ever misses out.",
        "description_Service2_Bottom": "No design brief yet? I also handle the visual concept in collaboration with a trusted graphic designer.",
        "description_Service3": "An online store works for you around the clock. Expand your reach, automate your sales and connect with customers nationwide — without the limitations of a physical shop.",

        "Projects_title_text": "A selection of my work — commercial and demo projects built with HTML/CSS/JS, React and WordPress.",
        "Project_Live_btn": "Live",

        "contact_title": "Let's talk about your project",
        "information_country": "Poland, Piła",
        "Contact_form_title": "Contact me",
        "contact_title_social": "Connect with me:",
        "text": "Have an idea for a website or online store? Send me a message — I'll reply within 24 hours and we'll map out the details together.",
        "btn": "Send",
        "contact_name": "Name",
        "contact_message": "Message",
        "footer_text": " All rights reserved © 2021",
        "footer_policy_text": "When using this page, please read the  ",
        "Policy_button": " Privacy policy"

    }
}
