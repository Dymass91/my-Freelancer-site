const inputs = document.querySelectorAll(".input");

function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
}

function blurFunc() {
    let parent = this.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }
}

inputs.forEach((input) => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);
});

const form = document.querySelector("form.contact-form");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = form.querySelector(".name").value.trim();
    const email = form.querySelector(".email").value.trim();
    const message = form.querySelector(".message").value.trim();
    const btn = form.querySelector(".btn");

    if (!name || !email || !message) {
        alert("Wypełnij wszystkie pola.");
        return;
    }

    btn.textContent = "Wysyłanie...";
    btn.disabled = true;

    const data = {
        access_key: "e9e0c568-a4ad-46fe-b521-db7793560cd1",
        name,
        email,
        message,
        subject: "Nowa wiadomość z tomaszmatyszczak.pl",
    };

    try {
        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const json = await res.json();

        if (json.success) {
            alert("Wiadomość wysłana! Odezwę się wkrótce.");
            form.reset();
            inputs.forEach((input) => {
                input.parentNode.classList.remove("focus");
            });
        } else {
            alert("Błąd wysyłania. Spróbuj ponownie.");
        }
    } catch {
        alert("Błąd połączenia. Spróbuj ponownie.");
    }

    btn.textContent = "Wyślij";
    btn.disabled = false;
});
