
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

const ProjectsTitleText = document.querySelector('.Projects_title_text');

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
        // el.classList.add('.active').sibilings().classList.remove('.active');;
        // langEl.querySelector('.active').classList.remove('.active');

        const attr = el.getAttribute('language');

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

        Serviceh2.textContent = data[attr].service_h2;
        Projectsh2.textContent = data[attr].Projects_h2;
        Contacth2.textContent = data[attr].Contact_h2;

        ServEl1.textContent = data[attr].titleService1;
        discrEl1.textContent = data[attr].descriptionService1;
        discrElSpan.textContent = data[attr].descriptionPriceSpan;
        ServPrice.textContent = data[attr].service_Price;
        PriceStr.textContent = data[attr].Price_strong;

        ProjectsTitleText.textContent = data[attr].Projects_title_text

        ServEl2.textContent = data[attr].titleService2;
        discServ2.textContent = data[attr].description_Service2;
        discServ2Bot.textContent = data[attr].description_Service2_Bottom;

        discServ3.textContent = data[attr].description_Service3;

        ContactFormTitle.textContent = data[attr].Contact_form_title;
        contactTitle.textContent = data[attr].contact_title;
        contactSocialTitle.textContent = data[attr].contact_title_social;
        informationCountry.textContent = data[attr].information_country
        contactInfoText.textContent = data[attr].text
        btn.textContent = data[attr].btn
        contactName.textContent = data[attr].contact_name
        contactMessage.textContent = data[attr].contact_message
        footerText.textContent = data[attr].footer_text
        aboutSpanText.textContent = data[attr].about_span_text
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

        "about_span_text": "Witam!",
        "descriptionAbout":
            "Witam! Od paru lat rozwijam sie w projektowaniu stron internetowych. Wykonuję strony statyczne jak i również dynamiczne, na podstawie dowolnego systemu zarządzania treścią. Systemy, z którymi mam najwięcej doświadczenia to HTML, CSS i JavaScript!, Ale zdarzyło mi się również kodować strony oparte na innych rozwiązaniach, takich jak React i Wordpress. I wciąż rozwijam swoją wiedzę o nowe języki programowania.",

        "titleService1": "Oferta",

        "service_Price": "od",

        "Price_strong": "599zl",

        "descriptionPriceSpan": "W mojej ofercie otrzymasz: ",

        "descriptionService1": " Kompletna strona internetową opartą o HTML, CSS, Javascript, WordPress lub React  wraz z wykupieniem hoistingu i domeny oraz z redagowaniem tekstow pod kątem wyników wyszukiwania w Google",

        "titleService2": "Usługi",

        "description_Service2": " - Buduje strony które są w pełni responsywne, dbam o to aby jej układ dostosowywał się samoczynnie do rozmiaru okna przeglądarki, na której jest wyświetlany np.  przeglądarki, smartfonów czy tabletów.",

        "description_Service2_Bottom": " - Jeśli nie posiadasz gotowego layoutu strony oferuję również usługę jego stworzenia. Do współpracy zapraszam wtedy grafika.",

        "description_Service3": "E-Commerce oferuje takie korzyści jak redukcja kosztów. Możliwość szybkiej aktualizacji oferty i zamieszczenia rozbudowanego opisu produktu. Dostęp do szerokiej bazy klientów. Lepsze wykorzystanie możliwości produkcyjnych oraz przyśpieszenie działań  biznesowych. Wzrost poziomu sprzedaży dzięki niższym nakładom i większym możliwościom dotarcia do klienta niż w przypadku sklepu tradycyjnego.",

        "Projects_title_text": "Poniżej reprezentuje wam moje portfolio w którym są wykonane przeze mnie projekty w czystym HTML,CSS,Js jak i również w frameworku React i systemie cms Wordpress które robiłem dla rozwoju własnych umiejetnosci jak i dla klientów.",

        "contact_title": "Skontaktuj się ze mną",
        "information_country": "Polska, Piła",
        "Contact_form_title": "Napisz do mnie",
        "contact_title_social": "Połącz się ze mną :",
        "text": "Jeśli chcesz ze mną współpracować, poniżej znajdziesz moje dane kontaktowe i linki do moich kont społecznościowych.",
        "btn": "Wyślij",
        "contact_name": "Imie",
        "contact_message": "Wiadomość",
        "footer_text": "Wszelkie prawa zastrzeżone"
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

        "about_span_text": "Hello!",
        "descriptionAbout":
            "Hello! I have been developing in website design for several years websites and I do both static pages as well as dynamic based on any content management system. The systems with which I have the most experience are HTML, CSS and JavaScript !, but in my career I also coded websites based on other solutions, such as React and Wordpress. And I am still developing my knowledge of new programming languages.",

        "titleService1": "Offer",

        "descriptionPriceSpan": "In my offer you will receive: ",

        "descriptionService1": "A complete website based on HTML, CSS, Javascript, WordPress or React with the purchase of a hoisting and domain and text editing in terms of Google search results",

        "service_Price": "from",
        "Price_strong": "125£",

        "titleService2": "Service",
        "description_Service2": " - I build websites that are fully responsive, I make sure that its layout automatically adjusts to the size of the browser window on which it is displayed, for example, of browsers, smartphones or tablets.",
        "description_Service2_Bottom": " - If you do not have a ready page layout, I also offer the service of creating it. Then I invite a graphic designer to cooperate.",
        "description_Service3": "E-Commerce offers such benefits as cost reduction. Ability to quickly update the offer and post an extensive product description. Access to a wide customer base. Better use of production possibilities and acceleration of business activities. Increased sales level. thanks to lower expenditures and greater opportunities to reach the customer than in the case of a traditional store.",

        "Projects_title_text": "Below I represent my portfolio in which my projects are made in pure HTML, CSS, Js as well as in the React framework and the Wordpress cms system which I did for the development of my own skills and for clients.",

        "contact_title": "Let's get in touch",
        "information_country": "Poland, Piła",
        "Contact_form_title": "Contact with me",
        "contact_title_social": "Connect with me :",
        "text": "If you want to co operate with me, Below are my contact details and links to my social accounts.",
        "btn": "Send",
        "contact_name": "Name",
        "contact_message": "Message",
        "footer_text": "All rights reserved"
    }
}