import { API_URL } from "./config.js";
import { afficherNotes } from "./index.js";

async function creatNote(token, title, content) {
    const response = await fetch(`${API_URL}/notes`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data.note
}


const token = localStorage.getItem("token")
if (!token) window.location.href = "login.html"

document.getElementById("note-from").addEventListener("submit", async (event) => {
    event.preventDefault()
    try {
        await creatNote(
            token,
            document.getElementById("inputTitre").value,
            document.getElementById("inputContenu").value
        )
        event.target.reset()
        afficherNotes()

    } catch (error) {
        document.getElementById("erreur").textContent = error.message
    }
})