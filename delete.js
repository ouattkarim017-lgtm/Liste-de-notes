import { API_URL } from "./config.js";

export async function supprimeNote(token, id) {
    const reponse = await fetch(`${API_URL}/notes/${id}`, {
        method: "DELETE",
        headers: {
            "accept": "application/json",
            "authorization": `Bearer ${token}`
        },
    })
    
    if (!reponse.ok) {
        const data = await reponse.json().catch(() => ({}));
        throw new Error(data.message)
    }

}
