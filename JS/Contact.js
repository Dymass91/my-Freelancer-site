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
const status = form.querySelector(".form-status");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = form.querySelector(".name").value.trim();
    const email = form.querySelector(".email").value.trim();
    const message = form.querySelector(".message").value.trim();
    const btn = form.querySelector(".btn");

    if (!name || !email || !message) {
        status.textContent = "Wypełnij wszystkie pola.";
        status.style.color = "#f1948a";
        status.classList.add("visible");
        return;
    }

    btn.textContent = "Wysyłanie...";
    btn.disabled = true;
    status.textContent = "";
    status.classList.remove("visible");

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
            status.textContent = "Wiadomość wysłana! Odezwę się wkrótce.";
            status.style.color = "#a8e6cf";
            status.classList.add("visible");
            form.reset();
            inputs.forEach((input) => {
                input.parentNode.classList.remove("focus");
            });
        } else {
            status.textContent = "Błąd wysyłania. Spróbuj ponownie.";
            status.style.color = "#f1948a";
            status.classList.add("visible");
        }
    } catch {
        status.textContent = "Błąd połączenia. Spróbuj ponownie.";
        status.style.color = "#f1948a";
        status.classList.add("visible");
    }

    btn.textContent = "Wyślij";
    btn.disabled = false;
});
