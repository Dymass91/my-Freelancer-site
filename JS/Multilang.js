
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
const aboutText3 = document.querySelector('.aboutMe_text3');
const aboutText4 = document.querySelector('.aboutMe_text4');
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

const ProjectLiveButton = document.querySelector('.Project_Live_btn');

const footerText = document.querySelector('.footer_text');

const footerPolicyText = document.querySelector('.footer_policy_text');
const PolicyButton = document.querySelector('.Policy_button');

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
  
        aboutText1.textContent = data[attr].aboutMe_text1;
        aboutText2.textContent = data[attr].aboutMe_text2;
        aboutText3.textContent = data[attr].aboutMe_text3;
        aboutText4.textContent = data[attr].aboutMe_text4;
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

        ProjectsTitleText.textContent = data[attr].Projects_title_text
        ProjectLiveButton.textContent = data[attr].Project_Live_btn

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
        PolicyButton.textContent = data[attr].Policy_button
        footerPolicyText.textContent = data[attr].footer_policy_text
        
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

    
        "descriptionAbout":
             " Witam! Od paru lat rozwijam sie w projektowaniu stron internetowych. Wykonuję strony statyczne jak i również dynamiczne, na podstawie dowolnego systemu zarządzania treścią. Systemy, z którymi mam najwięcej doświadczenia to HTML, CSS i JavaScript!, Ale również buduje strony oparte na innych rozwiązaniach, takich jak React i Wordpress.",
        "aboutMe_text1":"Swoje usługi opieram na gotowych motywach, dzięki czemu masz pewność stabilnego i ciągle aktualizowanego rozwiązania.",
        "aboutMe_text2":"Stworzę dla Ciebie prostą w obsłudze, szybką i bezpieczną stronę, która będzie przyciągała użytkowników.",
        "aboutMe_text3":"Otrzymasz indywidualne wskazówki dotyczące funkcjonowania strony.",
        "aboutMe_text4":"Nauczę Cię podstawowych zasad pracy ze stroną internetową.",
        "aboutMe_text5":"Poniżej znajdziesz możliwe formy współpracy ze mną. Jeśli myślisz, że te rozwiązania są dla Ciebie, napisz do mnie. Jeśli Twoje potrzeby związane z działaniem strony  wybiegają poza te rozwiązania – skontaktuj się ze mną, znajdziemy wspólne rozwiązanie.",
        "AboutMe_hrefToContact":"napisz do mnie.",
        "titleService1": "Oferta",

        "service_Price": "od",

        "Price_strong": "549zl",

        "descriptionPriceSpan": "W mojej ofercie otrzymasz: ",

        "descriptionService1": " Kompletna strona internetową opartą o HTML, CSS, Javascript, WordPress lub React  wraz z wykupieniem hoistingu i domeny oraz z redagowaniem tekstow pod kątem wyników wyszukiwania w Google. Dodatkowo wdrążę cię w obsługę tej strony tak żebyś mógł sam edytować i dodawać treśći.",

        "titleService2": "Usługi",

        "description_Service2": " - Buduje strony które są w pełni responsywne, dbam o to aby jej układ dostosowywał się samoczynnie do rozmiaru okna przeglądarki, na której jest wyświetlany np.  przeglądarki, smartfonów czy tabletów.",

        "description_Service2_Bottom": " - Jeśli nie posiadasz gotowego layoutu strony oferuję również usługę jego stworzenia. Do współpracy zapraszam wtedy grafika.",

        "description_Service3": "E-Commerce oferuje takie korzyści jak redukcja kosztów. Możliwość szybkiej aktualizacji oferty i zamieszczenia rozbudowanego opisu produktu. Dostęp do szerokiej bazy klientów. Lepsze wykorzystanie możliwości produkcyjnych oraz przyśpieszenie działań  biznesowych. Wzrost poziomu sprzedaży dzięki niższym nakładom i większym możliwościom dotarcia do klienta niż w przypadku sklepu tradycyjnego.",

        "Projects_title_text": "Poniżej znajdziesz moje portfolio w którym są projekty wykonane dla przedstawienia moich umiejętności jak i dla moich pierwszych klientów do których wykonania użyłem czysty HTML,CSS,JS jak i również framework React i system cms Wordpress.",
        "Project_Live_btn": "Wejdż na stronę",

        "contact_title": "Skontaktuj się ze mną",
        "information_country": "Polska, Piła",
        "Contact_form_title": "Napisz do mnie",
        "contact_title_social": "Połącz się ze mną :",
        "text": "Jeśli chcesz ze mną współpracować, poniżej znajdziesz moje dane kontaktowe i linki do moich kont społecznościowych.",
        "btn": "Wyślij",
        "contact_name": "Imie",
        "contact_message": "Wiadomość",
        "footer_text": ". Wszelkie prawa zastrzeżone © 2021",
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

        "descriptionAbout": "Hello! I have been developing in web design for several years. I make static and dynamic websites, based on any content management system. The systems I have the most experience with are HTML, CSS and JavaScript !, but also build websites based on other solutions such as React and Wordpress.",
            "aboutMe_text1":"I base my services on ready-made themes, so you can be sure of a stable and constantly updated solution.",
            "aboutMe_text2":"I will create an easy-to-use, fast and secure website for you that will attract users.",
            "aboutMe_text3":" You will receive individual instructions on the functioning of the website. ",
            "aboutMe_text4":"I will teach you the basic principles of working with a website.",
            "aboutMe_text5":"Below you will find possible forms of cooperation with me. If you think that these solutions are for you, write to me. If your needs related to the operation of the website go beyond these solutions - contact me, we will find a joint solution.",
            "AboutMe_hrefToContact":"write to me.",
        "titleService1": "Offer",

        "descriptionPriceSpan": "In my offer you will receive: ",

        "descriptionService1": "A complete website based on HTML, CSS, Javascript, WordPress or React with the purchase of a hoisting and domain and text editing in terms of Google search results. In addition, I will implement you in handling this page so that you can edit and add content yourself.",

        "service_Price": "from",
        "Price_strong": "119£",

        "titleService2": "Service",
        "description_Service2": " - I build websites that are fully responsive, I make sure that its layout automatically adjusts to the size of the browser window on which it is displayed, for example, of browsers, smartphones or tablets.",
        "description_Service2_Bottom": " - If you do not have a ready page layout, I also offer the service of creating it. Then I invite a graphic designer to cooperate.",
        "description_Service3": "E-Commerce offers such benefits as cost reduction. Ability to quickly update the offer and post an extensive product description. Access to a wide customer base. Better use of production possibilities and acceleration of business activities. Increased sales level. thanks to lower expenditures and greater opportunities to reach the customer than in the case of a traditional store.",

        "Projects_title_text": "Below you will find my portfolio in which there are projects made to present my skills and for my first clients for which I used pure HTML, CSS, JS as well as the React framework and Wordpress cms system.",
        "Project_Live_btn": "Live",

        "contact_title": "Let's get in touch",
        "information_country": "Poland, Piła",
        "Contact_form_title": "Contact with me",
        "contact_title_social": "Connect with me :",
        "text": "If you want to co operate with me, Below are my contact details and links to my social accounts.",
        "btn": "Send",
        "contact_name": "Name",
        "contact_message": "Message",
        "footer_text": ". All rights reserved © 2021",
        "footer_policy_text": "When using this page, please read the  ",
        "Policy_button": " Privacy policy"

    }
}