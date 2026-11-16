import { API_URL } from "./config.js";
import { supprimeNote } from "./delete.js";

const token = localStorage.getItem("token");
export async function afficherNotes() {
    const statut = document.getElementById("statut");
    const liste = document.querySelector(".notes");
    try {
        const response = await fetch(`${API_URL}/notes`, {
            headers: {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },

            },
        });
        if (!response.ok) throw new Error(`Erreur ${response.status}`);
        const data = await response.json();
        console.log(data);

        statut.textContent = `${data.notes.length} note(s)`;

        liste.innerHTML = "";
        data.notes.forEach((note) => {
            const carte = document.createElement("div");
            carte.className = "note";
            carte.innerHTML = `<h2></h2><p></p><span class="auteur"></span> <button class="effacer">supprimer</button>`;
            carte.querySelector("h2").textContent = note.title;
            carte.querySelector("p").textContent = note.content;
            carte.querySelector(".auteur").textContent = `Par ${note.user.name}`;

            //btuton supprimer
            carte.querySelector("button")
                .addEventListener("click", async function () {
                    if (!confirm("vous voulez supprimer cette note?")) return;
                    try {
                        await supprimeNote(token, note.id);
                        afficherNotes();
                    } catch (error) {
                        statut.textContent = error.message
                    }
                })

            liste.appendChild(carte);
        });
    } catch (error) {
        statut.textContent = "Impossible de charger les notes !: " + error.message;
    }
}
afficherNotes();


















