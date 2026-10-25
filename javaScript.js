
const API_URL = "https://momo-api-dev-1.onrender.com/api"


const liste = document.querySelector(".notes");
const Titre = document.getElementById("inputTitre");
const Contenu = document.getElementById("inputcontenu");

function CreerNote(Titre, Contenu) {
    const carte = document.createElement('div');
    carte.className = "carte";

    carte.innerHTML = `<h2></h2>
  <p></p> 
  <button class = "effacer">Effacer</button>`
    carte.querySelector('h2').textContent = Titre;
    carte.querySelector("p").textContent = Contenu;

    //bouton pour supprimer
    carte.querySelector('button')
        .addEventListener("click", function () {
            carte.remove()
        })
    liste.appendChild(carte)
}



async function ChangeNote() {
    const reponse = await fetch(`${API_URL}/notes`, {
        headers: { "accept": "apllication/json" }
    })
    const data = await reponse.json()
    console.log(data);

    data.notes.forEach((element) => {
        CreerNote(element.title, element.content)
    });
}
ChangeNote()


//bouton pour ajouter une note
document.querySelector(".ajouter")
    .addEventListener("click", function () {
        let valueTitle = Titre.value.trim();
        let valueContent = Contenu.value.trim();

        if (valueContent === "" || valueTitle === "") {
            alert("Remplie les champ")
            return;
        }

        CreerNote(valueTitle, valueContent)
        Titre.value = ""
        Contenu.value = ""


    })














