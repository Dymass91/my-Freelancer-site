
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

const aboutLead = document.querySelector('.aboutMe_lead');
const aboutText3 = document.querySelector('.aboutMe_text3');
const aboutTechLine = document.querySelector('.aboutMe_techLine');
const aboutWhyLabel = document.querySelector('.aboutMe_whyLabel');
const aboutWhy1 = document.querySelector('.aboutMe_why1');
const aboutWhy2 = document.querySelector('.aboutMe_why2');
const aboutWhy3 = document.querySelector('.aboutMe_why3');
const aboutText5Before = document.querySelector('.aboutMe_text5_before');
const aboutText5After = document.querySelector('.aboutMe_text5_after');
const hrefToContact = document.querySelector('.AboutMe_hrefToContact');


const Serviceh2 = document.querySelector('.service_h2');
const ServiceSubtitle = document.querySelector('.service_subtitle');
const Projectsh2 = document.querySelector('.Projects_h2');

const ServEl1 = document.querySelector('.titleService1');
const discrEl1 = document.querySelector('.descriptionService1');

const discServ2 = document.querySelector('.description_Service2');
const ServEl2 = document.querySelector('.titleService2');

const ServEl3 = document.querySelector('.titleService3');
const discServ3 = document.querySelector('.description_Service3');

const ServEl4 = document.querySelector('.titleService4');
const discServ4 = document.querySelector('.descriptionService4');

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
        aboutLead, aboutText3, aboutTechLine, aboutWhyLabel, aboutWhy1, aboutWhy2, aboutWhy3,
        aboutText5Before, aboutText5After, hrefToContact,
        Serviceh2, ServiceSubtitle, Projectsh2,
        ServEl1, discrEl1,
        discServ2, ServEl2,
        ServEl3, discServ3,
        ServEl4, discServ4,
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

    aboutLead.textContent = data[attr].aboutMe_lead;
    aboutText3.textContent = data[attr].aboutMe_text3;
    aboutTechLine.textContent = data[attr].aboutMe_techLine;
    aboutWhyLabel.textContent = data[attr].aboutMe_whyLabel;
    aboutWhy1.textContent = data[attr].aboutMe_why1;
    aboutWhy2.textContent = data[attr].aboutMe_why2;
    aboutWhy3.textContent = data[attr].aboutMe_why3;
    aboutText5Before.textContent = data[attr].aboutMe_text5_before;
    aboutText5After.textContent = data[attr].aboutMe_text5_after;
    hrefToContact.textContent = data[attr].AboutMe_hrefToContact;

    Serviceh2.textContent = data[attr].service_h2;
    ServiceSubtitle.textContent = data[attr].service_subtitle;
    Projectsh2.textContent = data[attr].Projects_h2;

    ServEl1.textContent = data[attr].titleService1;
    discrEl1.textContent = data[attr].descriptionService1;

    ProjectsTitleText.textContent = data[attr].Projects_title_text;

    ServEl2.textContent = data[attr].titleService2;
    discServ2.textContent = data[attr].description_Service2;

    ServEl3.textContent = data[attr].titleService3;
    discServ3.textContent = data[attr].description_Service3;

    ServEl4.textContent = data[attr].titleService4;
    discServ4.textContent = data[attr].descriptionService4;

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

        "title": "Kim jestem i jak pracuję",
        "service_h2": "Czym się zajmuję",
        "Projects_h2": "Wybrane realizacje",


        "descriptionAbout": "Cześć, jestem Tomasz — front-end developer z Piły. Nie jestem agencją z dziesiątkami klientów naraz ani gotowym motywem WordPress za 49 zł z marketu. Każdą stronę piszę osobiście, od zera, w czystym kodzie — dlatego ładuje się błyskawicznie i nie ciągnie za sobą kilogramów wtyczek, których nikt nie używa.",
        "aboutMe_lead": "Nie kupujesz strony. Kupujesz narzędzie, które ma dla Ciebie pracować.",
        "aboutMe_text3": "Kilka lat pracowałem jako niezależny wykonawca za granicą — nauczyło mnie to patrzeć na biznes klienta z różnych stron, nie tylko przez pryzmat jednego rynku. Dziś realizuję strony dla firm o różnym profilu i skali — od prostych wizytówek po rozbudowane serwisy i sklepy internetowe.",
        "aboutMe_techLine": "Strony pisane ręcznie, bez gotowych kreatorów — dzięki temu działają szybciej.",
        "aboutMe_whyLabel": "Dlaczego warto pracować ze mną:",
        "aboutMe_why1": "Kod piszę ręcznie — strona jest szybsza niż z gotowych kreatorów stron",
        "aboutMe_why2": "Rozmawiasz bezpośrednio ze mną, nie z działem obsługi klienta",
        "aboutMe_why3": "Strona zostaje z Tobą — pełny dostęp do kodu, żadnego zamknięcia w platformie",
        "aboutMe_text5_before": "Sprawdź moją ofertę poniżej i ",
        "aboutMe_text5_after": " — odpowiadam osobiście.",
        "AboutMe_hrefToContact": "napisz do mnie",

        "service_subtitle": "Od prostej wizytówki po sklep internetowy — dopasowuję rozwiązanie do celu, nie odwrotnie.",

        "titleService1": "Strony wizytówkowe",
        "descriptionService1": "Szybka, responsywna strona, która buduje zaufanie od pierwszego wejrzenia. Dla usługodawców i lokalnych firm, które chcą być widoczne w Google.",

        "titleService2": "Sklepy internetowe",
        "description_Service2": "Sprzedawaj 24 godziny na dobę, bez ograniczeń godzin otwarcia. Integracja płatności i panel zarządzania produktami gotowe od pierwszego dnia.",

        "titleService3": "Modernizacja i redesign",
        "description_Service3": "Masz stronę, która wygląda jak sprzed dekady albo ładuje się wolno? Odświeżam istniejące strony — nowy design, szybszy kod, bez utraty pozycji w Google.",

        "titleService4": "Optymalizacja i SEO",
        "descriptionService4": "Strona, która ładuje się wolno, traci klientów, zanim zdążą ją zobaczyć. Dbam o szybkość i strukturę pod SEO od pierwszej linii kodu.",

        "Projects_title_text": "Poniżej znajdziesz wybrane realizacje — projekty komercyjne i demonstracyjne, każdy napisany ręcznie w HTML/CSS/JS oraz React, bez gotowych motywów i zbędnych wtyczek.",
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

        "title": "Who I am and how I work",
        "service_h2": "What I do",
        "Projects_h2": "Selected work",

        "descriptionAbout": "Hi, I'm Tomasz — a front-end developer based in Piła, Poland. I'm not an agency juggling dozens of clients at once, or a bargain-bin off-the-shelf WordPress theme. I build every website myself, from scratch, in clean code — that's why it loads instantly and doesn't drag along kilograms of plugins nobody uses.",
        "aboutMe_lead": "You're not buying a website. You're buying a tool that works for you.",
        "aboutMe_text3": "I spent a few years working as an independent contractor abroad - it taught me to look at a client's business from different angles, not just through the lens of one market. Today I build sites for businesses of different profiles and scales - from simple business cards to full-featured services and online stores.",
        "aboutMe_techLine": "Sites written by hand, no page builders - that's what makes them faster.",
        "aboutMe_whyLabel": "Why work with me:",
        "aboutMe_why1": "I write code by hand — your site is faster than one built with off-the-shelf website builders",
        "aboutMe_why2": "You talk directly to me, not to a customer service department",
        "aboutMe_why3": "The site stays with you — full access to the code, no lock-in to a platform",
        "aboutMe_text5_before": "Check out my offer below and ",
        "aboutMe_text5_after": " — I reply personally.",
        "AboutMe_hrefToContact": "get in touch",

        "service_subtitle": "From a simple business-card site to a full online store — I match the solution to the goal, not the other way around.",

        "titleService1": "Business-card websites",
        "descriptionService1": "A fast, responsive website that builds trust from the first visit. For service providers and local businesses who want to be visible on Google.",

        "titleService2": "Online stores",
        "description_Service2": "Sell 24 hours a day, with no opening-hours limits. Payment integration and a product management panel ready from day one.",

        "titleService3": "Modernization & redesign",
        "description_Service3": "Got a site that looks a decade old or loads slowly? I refresh existing websites — new design, faster code, without losing your Google rankings.",

        "titleService4": "Optimization & SEO",
        "descriptionService4": "A slow-loading site loses customers before they even see it. I take care of speed and SEO structure from the very first line of code.",

        "Projects_title_text": "A selection of my work — commercial and demo projects, each hand-coded in HTML/CSS/JS and React, no page builders or bloated plugins.",
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
