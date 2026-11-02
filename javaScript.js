
const API_URL = "https://momo-api-dev-1.onrender.com/api"


const liste = document.querySelector(".notes");
const Titre = document.getElementById("inputTitre");
const Contenu = document.getElementById("inputcontenu");


async function ChangeNote() {
    const reponse = await fetch(`${API_URL}/notes`, {
        headers: {
            "accept": "apllication/json",
        }
    })
    const data = await reponse.json()
    console.log(data);
    data.notes.forEach((element) => {
        createNote(element.title, element.content)
    });
}
ChangeNote()


// Se connecter
async function login(email, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) return data.token;
}

console.log(login("ouattKarim017@gmail.com", "123456@"));





// Créer une note (token requis)
async function createNote(title, content) {
    const response = await fetch(`${API_URL}/notes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            // "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
    });

    const data = await response.json();
    

    const carte = document.createElement('div');
    carte.className = "carte";

    carte.innerHTML = `<h2></h2>
  <p></p> 
  <button class = "effacer">× </button>
  <button class = "modifier">Modifier</button>`
    carte.querySelector('h2').textContent = title;
    carte.querySelector("p").textContent = content;

    liste.appendChild(carte)

    if (!response.ok) throw new Error(data.message);
    return data.note;
}








// function CreerNote(titre, contenu) {
//     // bouton pour supprimer
//     carte.querySelector('button')
//         .addEventListener("click", function () {
//             carte.remove()
//         })
//     //bouton pour modifier
//     carte.querySelector('.modifier')
//         .addEventListener('click', function () {
//             Titre.value = titre
//             Contenu.value = contenu
//             carte.remove();
//         })
    
// }


//bouton pour ajouter une note
document.querySelector(".ajouter")
    .addEventListener("click", function () {
        let valueTitle = Titre.value.trim();
        let valueContent = Contenu.value.trim();

        if (valueContent === "" || valueTitle === "") {
            alert("Remplie les champs")
            return;
        }

        createNote(valueTitle, valueContent)
        Titre.value = ""
        Contenu.value = ""
    })














