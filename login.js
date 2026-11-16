import { API_URL } from "./config.js";

const erreur = document.querySelector(".erreur");
const formulaire = document.querySelector("form");

// Se connecter
async function login(email, password) {
    const reponse = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },

        body: JSON.stringify({ email, password}),

    });
     

    const data = await reponse.json();
    if (!reponse.ok) throw new Error(data.message);
    return data.token;
}


formulaire.addEventListener("submit", async function (event) {
        event.preventDefault();

        try {
            const token = await login(
                document.getElementById("email").value,
                document.getElementById("password").value
            )
            localStorage.setItem("token", token);
            window.location.href = "index.html"; //permet de m'envoyer directement sur la page index.html
        } catch (error) {
            erreur.textContent = error.message;
        }

    });