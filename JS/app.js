// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCQ9t9C-09SSB7DgZICFNB2rVfAHYwnzN0",
    authDomain: "email-4062c.firebaseapp.com",
    databaseURL: "https://email-4062c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "email-4062c",
    storageBucket: "email-4062c.appspot.com",
    messagingSenderId: "172884587669",
    appId: "1:172884587669:web:8e12d9e5f0b10c5c4bd79c",
    measurementId: "G-0EX1X4QDLX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Refernece contactInfo collections
let contactInfo = firebase.database().ref("infos");

// Listen for a submit
document.querySelector(".contact-form").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    //   Get input Values
    let name = document.querySelector(".name").value;
    let email = document.querySelector(".email").value;
    let message = document.querySelector(".message").value;

    saveContactInfo(name, email, message);

    // document.querySelector(".contact-form").reset();

    sendEmail(name, email, message);
}

// Save infos to Firebase
function saveContactInfo(name, email, message) {
    let newContactInfo = contactInfo.push();

    newContactInfo.set({
        name: name,
        email: email,
        message: message,
    });

    retrieveInfos();
}

//Retrieve Infos

function retrieveInfos() {
    let ref = firebase.database().ref("infos");
    ref.on("value", gotData);
}

function gotData(data) {
    let info = data.val();
    let keys = Object.keys(info);

    for (let i = 0; i < keys.length; i++) {
        let infoData = keys[i];
        let name = info[infoData].name;
        let email = info[infoData].email;
        let message = info[infoData].message;
        console.log(name, email, message);

        let infosResults = document.querySelector(".infosResults");

        infosResults.innerHTML += `<div>
      <p>${name}</p>
      <p>${email}</p>
      <p>${message}</p>
      </div>`
    }
}
retrieveInfos();

function sendEmail(name, email, message) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "matyszczak24@gmail.com",
        Password: "Omoplata9112",
        To: 'matyszczak24@gmail.com',
        From: "matyszczak24@gmail.com",
        Subject: `${name} sent you a message`,
        Body: `<strong>Name:</strong> ${name} <br/><strong> Email:</strong> ${email} <br/><strong> Message:</strong> ${message}`
    }).then((message) => alert("mail sent successfully"));
}