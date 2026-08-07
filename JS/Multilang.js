
const langEl = document.querySelector('.langWrap');
// Scoped to .btn_language only (was "input, a" - every link/input on the
// page, including hero CTAs, social icons, the contact form fields and
// the "to-top" arrow) - clicking any of those doesn't switch language
// (guarded further down by the `language` attribute check) but was still
// running the active-button bookkeeping every time, desyncing the PL/EN/NL
// indicator from the page's actual language whenever an unrelated link
// was clicked.
const link = document.querySelectorAll('.btn_language');

const navbarHeaderAbout = document.querySelector('.navbar_header_About');
const navbarHeaderService = document.querySelector('.navbar_header_Service');
const navbarHeaderCennik = document.querySelector('.navbar_header_Cennik');
const navbarHeaderProjects = document.querySelector('.navbar_header_Projects');
const navbarHeaderContact = document.querySelector('.navbar_header_Contact');

const loaderLabel = document.querySelector('.loader-label');

const heroCtaPrimary = document.querySelector('.hero-cta--primary');
const heroCtaSecondary = document.querySelector('.hero-cta--secondary');
const aboutPhotoIntro = document.querySelector('.about-photo-intro');
// Two instances (.hero-split__left, .hero-split__right - see index.html) -
// both always show the same text, so every match gets the same value.
const heroPreviewTeasers = document.querySelectorAll('.hero-preview-teaser');
// Contains inline <strong> markup, so these are set via innerHTML, not
// textContent (see applyTranslation below).
const heroRotatorLines = document.querySelectorAll('.hero-rotator__line');

const titleEl = document.querySelector('.title');
const descrEl = document.querySelector('.descriptionAbout');

const aboutText3 = document.querySelector('.aboutMe_text3');
const aboutTechLine = document.querySelector('.aboutMe_techLine');
const aboutWhyLabel = document.querySelector('.aboutMe_whyLabel');
const aboutWhy1 = document.querySelector('.aboutMe_why1');
const aboutWhy2 = document.querySelector('.aboutMe_why2');
const aboutWhy3 = document.querySelector('.aboutMe_why3');
const aboutText5Before = document.querySelector('.aboutMe_text5_before');
const aboutText5After = document.querySelector('.aboutMe_text5_after');
const hrefToContact = document.querySelector('.AboutMe_hrefToContact');

// .marker-label repeats once per section (About/Services/Pricing/
// Projects/Contact) with different text each time - a plain
// ".marker-label" query would only ever reach the first (About's) - each
// is scoped to its own section container instead.
const markerAbout = document.querySelector('.Aboutme .marker-label');
const markerServices = document.querySelector('.skills-bg-wrap .marker-label');
const markerPricing = document.querySelector('.pricing-section .marker-label');
const markerProjects = document.querySelector('.Projects .marker-label');
const markerContact = document.querySelector('.Contact_Social .marker-label');

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

const pricingH2 = document.querySelector('.pricing_h2');
const pricingSubtitle = document.querySelector('.pricing_subtitle');
// .pricing-name/.pricing-price/etc. each repeat once per card (3 cards) -
// scoped per-card below instead of via a page-wide querySelector.
const pricingCards = document.querySelectorAll('.pricing-card');

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
// Was ".title" - collided with the About section's <h2 class="title">
// (the first ".title" match in the DOM), so the modal's own title was
// silently never reached by applyTranslation() at all.
const policyModalTitle = document.querySelector('.policy-modal-title');

const ProjectsTitleText = document.querySelector('.Projects_title_text');

function applyTranslation(attr) {
    const t = data[attr];

    navbarHeaderAbout.textContent = t.navbar_header_About;
    navbarHeaderService.textContent = t.navbar_header_Service;
    navbarHeaderCennik.textContent = t.navbar_header_Cennik;
    navbarHeaderProjects.textContent = t.navbar_header_Projects;
    navbarHeaderContact.textContent = t.navbar_header_Contact;

    if (loaderLabel) loaderLabel.textContent = t.loader_label;

    if (heroCtaPrimary) heroCtaPrimary.textContent = t.hero_cta_primary;
    if (heroCtaSecondary) heroCtaSecondary.textContent = t.hero_cta_secondary;
    if (aboutPhotoIntro) aboutPhotoIntro.innerHTML = t.about_photo_intro.map(function (p) { return '<p>' + p + '</p>'; }).join('');
    heroPreviewTeasers.forEach(function (el) { el.textContent = t.hero_preview_teaser; });
    heroRotatorLines.forEach(function (el, i) {
        if (t.hero_rotator[i]) el.innerHTML = t.hero_rotator[i];
    });

    titleEl.textContent = t.title;
    descrEl.textContent = t.descriptionAbout;

    if (markerAbout) markerAbout.textContent = t.marker_about;
    if (markerServices) markerServices.textContent = t.marker_services;
    if (markerPricing) markerPricing.textContent = t.marker_pricing;
    if (markerProjects) markerProjects.textContent = t.marker_projects;
    if (markerContact) markerContact.textContent = t.marker_contact;

    aboutText3.textContent = t.aboutMe_text3;
    aboutTechLine.textContent = t.aboutMe_techLine;
    aboutWhyLabel.textContent = t.aboutMe_whyLabel;
    aboutWhy1.textContent = t.aboutMe_why1;
    aboutWhy2.textContent = t.aboutMe_why2;
    aboutWhy3.textContent = t.aboutMe_why3;
    aboutText5Before.textContent = t.aboutMe_text5_before;
    aboutText5After.textContent = t.aboutMe_text5_after;
    hrefToContact.textContent = t.AboutMe_hrefToContact;

    Serviceh2.textContent = t.service_h2;
    ServiceSubtitle.textContent = t.service_subtitle;
    Projectsh2.textContent = t.Projects_h2;

    ServEl1.textContent = t.titleService1;
    discrEl1.textContent = t.descriptionService1;

    ProjectsTitleText.textContent = t.Projects_title_text;

    ServEl2.textContent = t.titleService2;
    discServ2.textContent = t.description_Service2;

    ServEl3.textContent = t.titleService3;
    discServ3.textContent = t.description_Service3;

    ServEl4.textContent = t.titleService4;
    discServ4.textContent = t.descriptionService4;

    if (pricingH2) pricingH2.textContent = t.pricing_h2;
    if (pricingSubtitle) pricingSubtitle.textContent = t.pricing_subtitle;
    pricingCards.forEach(function (card, i) {
        const p = t.pricing[i];
        if (!p) return;
        var nameEl = card.querySelector('.pricing-name');
        var priceEl = card.querySelector('.pricing-price');
        var priceLabelEl = card.querySelector('.pricing-price-label');
        var badgeEl = card.querySelector('.pricing-badge');
        var descriptionEl = card.querySelector('.pricing-description');
        var featureEls = card.querySelectorAll('.pricing-features li');
        var timeEl = card.querySelector('.pricing-time');
        var btnEl = card.querySelector('.pricing-btn');

        if (nameEl) nameEl.textContent = p.name;
        if (priceEl) priceEl.textContent = p.price;
        if (priceLabelEl) priceLabelEl.textContent = p.priceLabel;
        if (badgeEl) badgeEl.textContent = p.badge;
        if (descriptionEl) descriptionEl.textContent = p.description;
        featureEls.forEach(function (li, j) {
            if (p.features[j] !== undefined) li.textContent = p.features[j];
        });
        if (timeEl) timeEl.textContent = p.time;
        if (btnEl) btnEl.textContent = p.btn;
    });

    ContactFormTitle.textContent = t.Contact_form_title;
    contactTitle.textContent = t.contact_title;
    contactSocialTitle.textContent = t.contact_title_social;
    informationCountry.textContent = t.information_country;
    contactInfoText.textContent = t.text;
    btn.textContent = t.btn;
    contactName.textContent = t.contact_name;
    contactMessage.textContent = t.contact_message;
    footerText.textContent = t.footer_text;
    PolicyButton.textContent = t.Policy_button;
    footerPolicyText.textContent = t.footer_policy_text;
    if (policyModalTitle) policyModalTitle.textContent = t.policy_modal_title;
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
        "navbar_header_Cennik": "Cennik",
        "navbar_header_Projects": "Portfolio",
        "navbar_header_Contact": "Kontakt",

        "loader_label": "Loading",

        "hero_cta_primary": "Napisz do mnie",
        "hero_cta_secondary": "Zobacz portfolio",
        "about_photo_intro": [
            "Cześć, jestem Tomasz",
            "Projektuję i tworzę strony internetowe dla małych firm, dbając o to, żeby były nie tylko estetyczne, ale przede wszystkim czytelne, szybkie i wygodne dla klientów.",
            "Zajmuję się całym procesem — od projektu i kodowania, przez wdrożenie, aż po uruchomienie strony.",
            "Współpracując ze mną, masz bezpośredni kontakt z osobą, która faktycznie tworzy Twoją stronę.",
            "Działam z Piły i współpracuję z firmami zarówno lokalnie, jak i zdalnie w całej Polsce."
        ],
        "hero_preview_teaser": "Poniżej zobaczysz mój ostatni projekt dla klienta z Holandii.",
        "hero_rotator": [
            "Od <strong>1599 zł</strong>. Gotowa strona w 1&ndash;2 tygodnie. Bez ukrytych kosztów.",
            "Buduję strony, które ładują się w <strong>2 sekundy</strong> i realnie <strong>przyciągają klientów</strong> &mdash; nie tylko ładnie wyglądają.",
            "Tworzę strony dla małych firm <strong>z Piły i okolic</strong> &mdash; od pomysłu do gotowej wizytówki w internecie."
        ],

        "title": "Kim jestem i jak pracuję",
        "service_h2": "Czym się zajmuję",
        "Projects_h2": "Wybrane realizacje",

        "marker_about": "o mnie",
        "marker_services": "usługi",
        "marker_pricing": "cennik",
        "marker_projects": "portfolio",
        "marker_contact": "kontakt",

        "descriptionAbout": "Jestem freelancerem z Piły, tworzę strony internetowe dla małych firm. Nie jestem agencją z dziesiątkami klientów naraz ani gotowym motywem WordPress za 49 zł z marketu. Każdą stronę piszę osobiście, od zera, w czystym kodzie — dlatego ładuje się błyskawicznie i nie ciągnie za sobą kilogramów wtyczek, których nikt nie używa.",
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

        "pricing_h2": "Ile kosztuje strona internetowa?",
        "pricing_subtitle": "Wybierz rozwiązanie dopasowane do potrzeb Twojej firmy. Jeśli nie wiesz, który wariant będzie odpowiedni, pomogę Ci wybrać najlepszą opcję.",
        "pricing": [
            {
                "name": "START",
                "price": "1599 zł",
                "priceLabel": "jednorazowo",
                "badge": "Najpopularniejszy",
                "description": "Dla małych firm i osób, które potrzebują prostej, profesjonalnej strony.",
                "features": ["strona główna + najważniejsze informacje", "responsywny projekt", "formularz kontaktowy", "podstawowa optymalizacja SEO", "wdrożenie pod własną domeną"],
                "time": "Realizacja: 1–2 tygodnie",
                "btn": "Zamów"
            },
            {
                "name": "FIRMA",
                "price": "3499 zł",
                "priceLabel": "jednorazowo",
                "badge": "",
                "description": "Dla firm, które potrzebują rozbudowanej prezentacji swojej oferty.",
                "features": ["kilka podstron", "indywidualny projekt", "formularze i dodatkowe funkcje", "podstawowe SEO", "pełna responsywność", "wdrożenie i konfiguracja"],
                "time": "Realizacja: 2–4 tygodnie",
                "btn": "Zamów"
            },
            {
                "name": "SKLEP",
                "price": "5999 zł",
                "priceLabel": "jednorazowo",
                "badge": "",
                "description": "Dla firm, które chcą sprzedawać produkty lub usługi online.",
                "features": ["sklep internetowy", "katalog produktów", "koszyk i zamówienia", "płatności online", "responsywny projekt", "konfiguracja i wdrożenie"],
                "time": "Realizacja: od 3–5 tygodni",
                "btn": "Zamów"
            }
        ],

        "contact_title": "Porozmawiajmy o Twoim projekcie",
        "information_country": "Polska, Piła",
        "Contact_form_title": "Napisz do mnie",
        "contact_title_social": "Połącz się ze mną:",
        "text": "Jeśli chcesz ze mną współpracować, poniżej znajdziesz moje dane kontaktowe i linki do moich kont społecznościowych. Realizuję projekty dla klientów z Piły i okolic (Trzcianka, Wyrzysk, Złotów, Chodzież) oraz zdalnie z całej Polski.",
        "btn": "Wyślij",
        "contact_name": "Imię",
        "contact_message": "Wiadomość",
        "footer_text": " Wszelkie prawa zastrzeżone © 2021",
        "footer_policy_text": "Korzystając z tej strony proszę zapoznać się z  ",
        "Policy_button": " Polityką prywatności",
        "policy_modal_title": "Polityka prywatności"
    },
    "english":
    {
        "menu_header_About": "About",
        "menu_header_Service": "Service",
        "menu_header_Projects": "Portfolio",
        "menu_header_Contact": "Contact",

        "navbar_header_About": "About",
        "navbar_header_Service": "Service",
        "navbar_header_Cennik": "Pricing",
        "navbar_header_Projects": "Portfolio",
        "navbar_header_Contact": "Contact",

        "loader_label": "Loading",

        "hero_cta_primary": "Get in touch",
        "hero_cta_secondary": "View portfolio",
        "about_photo_intro": [
            "Hi, I'm Tomasz",
            "I design and build websites for small businesses, making sure they're not just visually appealing but, above all, clear, fast, and easy for customers to use.",
            "I handle the whole process — from design and coding, through deployment, to launching the site.",
            "When you work with me, you're in direct contact with the person actually building your website.",
            "I'm based in Piła and work with businesses both locally and remotely across all of Poland."
        ],
        "hero_preview_teaser": "Below you'll see my latest project for a client from the Netherlands.",
        "hero_rotator": [
            "From <strong>1599 zł</strong>. A finished website in 1&ndash;2 weeks. No hidden costs.",
            "I build websites that load in <strong>2 seconds</strong> and actually <strong>attract customers</strong> &mdash; not just look pretty.",
            "I create websites for small businesses <strong>in Piła and the surrounding area</strong> &mdash; from idea to a finished online presence."
        ],

        "title": "Who I am and how I work",
        "service_h2": "What I do",
        "Projects_h2": "Selected work",

        "marker_about": "about",
        "marker_services": "services",
        "marker_pricing": "pricing",
        "marker_projects": "portfolio",
        "marker_contact": "contact",

        "descriptionAbout": "I'm a freelancer based in Piła, Poland, building websites for small businesses. I'm not an agency juggling dozens of clients at once, or a bargain-bin off-the-shelf WordPress theme. I build every website myself, from scratch, in clean code — that's why it loads instantly and doesn't drag along kilograms of plugins nobody uses.",
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

        "pricing_h2": "How much does a website cost?",
        "pricing_subtitle": "Choose the solution that fits your business needs. If you're not sure which option is right, I'll help you pick the best one.",
        "pricing": [
            {
                "name": "START",
                "price": "1599 zł",
                "priceLabel": "one-time",
                "badge": "Most popular",
                "description": "For small businesses and individuals who need a simple, professional website.",
                "features": ["homepage + key information", "responsive design", "contact form", "basic SEO optimization", "deployment on your own domain"],
                "time": "Delivery: 1–2 weeks",
                "btn": "Order"
            },
            {
                "name": "BUSINESS",
                "price": "3499 zł",
                "priceLabel": "one-time",
                "badge": "",
                "description": "For businesses that need a more extensive presentation of their offer.",
                "features": ["several subpages", "custom design", "forms and additional features", "basic SEO", "full responsiveness", "deployment and configuration"],
                "time": "Delivery: 2–4 weeks",
                "btn": "Order"
            },
            {
                "name": "STORE",
                "price": "5999 zł",
                "priceLabel": "one-time",
                "badge": "",
                "description": "For businesses that want to sell products or services online.",
                "features": ["online store", "product catalog", "cart and orders", "online payments", "responsive design", "configuration and deployment"],
                "time": "Delivery: from 3–5 weeks",
                "btn": "Order"
            }
        ],

        "contact_title": "Let's talk about your project",
        "information_country": "Poland, Piła",
        "Contact_form_title": "Contact me",
        "contact_title_social": "Connect with me:",
        "text": "If you'd like to work together, you'll find my contact details and social media links below. I take on projects for clients in Piła and the surrounding area (Trzcianka, Wyrzysk, Złotów, Chodzież), as well as remotely across Poland.",
        "btn": "Send",
        "contact_name": "Name",
        "contact_message": "Message",
        "footer_text": " All rights reserved © 2021",
        "footer_policy_text": "When using this page, please read the  ",
        "Policy_button": " Privacy policy",
        "policy_modal_title": "Privacy Policy"
    },
    "dutch":
    {
        "menu_header_About": "Over mij",
        "menu_header_Service": "Diensten",
        "menu_header_Projects": "Portfolio",
        "menu_header_Contact": "Contact",

        "navbar_header_About": "Over mij",
        "navbar_header_Service": "Diensten",
        "navbar_header_Cennik": "Tarieven",
        "navbar_header_Projects": "Portfolio",
        "navbar_header_Contact": "Contact",

        "loader_label": "Laden",

        "hero_cta_primary": "Neem contact op",
        "hero_cta_secondary": "Bekijk portfolio",
        "about_photo_intro": [
            "Hoi, ik ben Tomasz",
            "Ik ontwerp en bouw websites voor kleine bedrijven, met aandacht voor niet alleen esthetiek, maar vooral duidelijkheid, snelheid en gebruiksgemak voor klanten.",
            "Ik verzorg het hele proces — van ontwerp en codering, via implementatie, tot de lancering van de site.",
            "Als je met mij samenwerkt, heb je direct contact met de persoon die daadwerkelijk jouw website bouwt.",
            "Ik werk vanuit Piła en werk samen met bedrijven, zowel lokaal als op afstand in heel Polen."
        ],
        "hero_preview_teaser": "Hieronder zie je mijn laatste project voor een klant uit Nederland.",
        "hero_rotator": [
            "Vanaf <strong>1599 zł</strong>. Een kant-en-klare website in 1&ndash;2 weken. Geen verborgen kosten.",
            "Ik bouw websites die in <strong>2 seconden</strong> laden en echt <strong>klanten aantrekken</strong> &mdash; niet alleen mooi zijn.",
            "Ik maak websites voor kleine bedrijven <strong>in Piła en omgeving</strong> &mdash; van idee tot een kant-en-klare online aanwezigheid."
        ],

        "title": "Wie ik ben en hoe ik werk",
        "service_h2": "Wat ik doe",
        "Projects_h2": "Geselecteerd werk",

        "marker_about": "over mij",
        "marker_services": "diensten",
        "marker_pricing": "tarieven",
        "marker_projects": "portfolio",
        "marker_contact": "contact",

        "descriptionAbout": "Ik ben een freelancer uit Piła, Polen, en bouw websites voor kleine bedrijven. Ik ben geen bureau dat tientallen klanten tegelijk jongleert, of een goedkoop kant-en-klaar WordPress-thema. Ik bouw elke website zelf, vanaf nul, in schone code — daarom laadt hij razendsnel en sleept hij geen kilo's aan plugins mee die niemand gebruikt.",
        "aboutMe_text3": "Ik heb een paar jaar als zelfstandig contractor in het buitenland gewerkt — dat leerde me om het bedrijf van een klant vanuit verschillende invalshoeken te bekijken, niet alleen door de lens van één markt. Vandaag bouw ik sites voor bedrijven van verschillend profiel en schaal — van eenvoudige visitekaartjes tot volwaardige diensten en webshops.",
        "aboutMe_techLine": "Sites met de hand geschreven, geen page builders — daardoor zijn ze sneller.",
        "aboutMe_whyLabel": "Waarom met mij werken:",
        "aboutMe_why1": "Ik schrijf code met de hand — je site is sneller dan een met kant-en-klare websitebouwers",
        "aboutMe_why2": "Je spreekt direct met mij, niet met een klantenservice-afdeling",
        "aboutMe_why3": "De site blijft van jou — volledige toegang tot de code, geen platformafhankelijkheid",
        "aboutMe_text5_before": "Bekijk hieronder mijn aanbod en ",
        "aboutMe_text5_after": " — ik reageer persoonlijk.",
        "AboutMe_hrefToContact": "neem contact op",

        "service_subtitle": "Van een eenvoudige visitekaartjes-site tot een volledige webshop — ik stem de oplossing af op het doel, niet andersom.",

        "titleService1": "Visitekaartjes-websites",
        "descriptionService1": "Een snelle, responsieve website die vanaf het eerste bezoek vertrouwen wekt. Voor dienstverleners en lokale bedrijven die zichtbaar willen zijn op Google.",

        "titleService2": "Webshops",
        "description_Service2": "Verkoop 24 uur per dag, zonder openingstijden. Betaalintegratie en een productbeheerpaneel klaar vanaf dag één.",

        "titleService3": "Modernisering & redesign",
        "description_Service3": "Heb je een site die er tien jaar oud uitziet of traag laadt? Ik vernieuw bestaande websites — nieuw design, snellere code, zonder je Google-posities te verliezen.",

        "titleService4": "Optimalisatie & SEO",
        "descriptionService4": "Een traag ladende site verliest klanten voordat ze hem zelfs maar zien. Ik zorg voor snelheid en SEO-structuur vanaf de allereerste regel code.",

        "Projects_title_text": "Een selectie van mijn werk — commerciële en demoprojecten, elk met de hand gecodeerd in HTML/CSS/JS en React, geen page builders of opgeblazen plugins.",
        "Project_Live_btn": "Live",

        "pricing_h2": "Wat kost een website?",
        "pricing_subtitle": "Kies de oplossing die bij de behoeften van jouw bedrijf past. Weet je niet welke optie geschikt is? Dan help ik je de beste keuze te maken.",
        "pricing": [
            {
                "name": "START",
                "price": "1599 zł",
                "priceLabel": "eenmalig",
                "badge": "Meest populair",
                "description": "Voor kleine bedrijven en particulieren die een eenvoudige, professionele website nodig hebben.",
                "features": ["homepage + belangrijkste informatie", "responsief ontwerp", "contactformulier", "basis SEO-optimalisatie", "implementatie op je eigen domein"],
                "time": "Levertijd: 1–2 weken",
                "btn": "Bestellen"
            },
            {
                "name": "BEDRIJF",
                "price": "3499 zł",
                "priceLabel": "eenmalig",
                "badge": "",
                "description": "Voor bedrijven die een uitgebreidere presentatie van hun aanbod nodig hebben.",
                "features": ["meerdere subpagina's", "op maat gemaakt ontwerp", "formulieren en extra functies", "basis SEO", "volledig responsief", "implementatie en configuratie"],
                "time": "Levertijd: 2–4 weken",
                "btn": "Bestellen"
            },
            {
                "name": "WINKEL",
                "price": "5999 zł",
                "priceLabel": "eenmalig",
                "badge": "",
                "description": "Voor bedrijven die producten of diensten online willen verkopen.",
                "features": ["webshop", "productcatalogus", "winkelwagen en bestellingen", "online betalingen", "responsief ontwerp", "configuratie en implementatie"],
                "time": "Levertijd: vanaf 3–5 weken",
                "btn": "Bestellen"
            }
        ],

        "contact_title": "Laten we het over jouw project hebben",
        "information_country": "Polen, Piła",
        "Contact_form_title": "Neem contact op",
        "contact_title_social": "Verbind met mij:",
        "text": "Als je met mij wilt samenwerken, vind je hieronder mijn contactgegevens en links naar mijn sociale media. Ik neem projecten aan voor klanten in Piła en omgeving (Trzcianka, Wyrzysk, Złotów, Chodzież), en ook op afstand in heel Polen.",
        "btn": "Verzenden",
        "contact_name": "Naam",
        "contact_message": "Bericht",
        "footer_text": " Alle rechten voorbehouden © 2021",
        "footer_policy_text": "Lees bij het gebruik van deze pagina de  ",
        "Policy_button": " Privacyverklaring",
        "policy_modal_title": "Privacybeleid"
    }
}
