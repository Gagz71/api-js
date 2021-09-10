//--------------------------  https://api.chucknorris.io/jokes/random   ------------------------------------------------------

//--------------------------  OBJET XMLHttpRequest()   ------------------------------------------------------

//Variables
const jokeBtn = document.querySelector("#jokebtn");
const localisationJoke = document.querySelector("#showJokes");
const localisationFiveJoke = document.querySelector("#showFiveJokes");
const jokeSBtn = document.querySelector("#jokeSbtn");
const catBtn = document.querySelector("#askCatJokeBtn");
const userChoice = document.querySelector("#askCat");
const categoriesBtns = document.querySelector("#categoriesBtn");
const divCat = document.querySelector("#divCat");


//Listener sur le bouton de génération d'une joke'
jokeBtn.addEventListener("click", () => {
        getARandomJoke();
})

//Listener sur le bouton de génération de 5 jokes
jokeSBtn.addEventListener("click", () => {
        getFiveRandomJokes();
})

catBtn.addEventListener("click", () => {
        getARandomJoke(userChoice.value);
})

//Demander à l'user une catégorie de blague
//récuperér une blague de cette catégorie
//demander une blague par catégorie => ajouter en param d'url de l'api "?category=animal" par exemple
function getARandomJoke(category = null){     //=null => valeur par défaut pour que l'on soit pas obligé de demander une catégorie de joke
        
        let url = "https://api.chucknorris.io/jokes/random";
        
        //Si l'user saisit une catégory
        if(category){
                url = "https://api.chucknorris.io/jokes/random?category="+category
        }
        
        //Etape1
        //Récupérer blague de chuck norris au hasard via XMLHttpRequest
        const maRequete = new XMLHttpRequest();
        
        //Etape2
        //Méthode de rédaction et préparation de la requête
        maRequete.open("GET", url);

        //Etape3
        //méthode qui explique ce que l'on veut faire avec la réponse reçues
        maRequete.onload = () => {
                let result = maRequete.responseText;   //Renvoie une string
                let dataResult = JSON.parse(result);    //Traduit la string en objet JSON
                // console.log(result);
                // console.log(dataResult);
                let resultJoke = dataResult.value;
        
                localisationJoke.innerHTML = resultJoke;
        }

        //Dernière étape
        //méthode qui envoie cette requête
        maRequete.send();
}

function getFiveRandomJokes(){
        
        let url = "https://api.chucknorris.io/jokes/random";
        
        localisationFiveJoke.innerHTML = "";
        
        for(let i =0; i< 5; i++){
                //Etape1
                //Récupérer blague de chuck norris au hasard via XMLHttpRequest
                const maRequete = new XMLHttpRequest();
                //Etape2
                //Méthode de rédaction et préparation de la requête
                maRequete.open("GET", url);
        
                //Etape3
                //méthode qui explique ce que l'on veut faire avec la réponse reçues
                maRequete.onload = () => {
                        let result = JSON.parse(maRequete.responseText);    //Traduit la string en objet JSON
                        localisationFiveJoke.innerHTML += ` <p class="lead">${result.value}</p>`;
                }
        
                //Dernière étape
                //méthode qui envoie cette requête
                maRequete.send();
        }
        
}

function getCategories(){
        
        let url = "https://api.chucknorris.io/jokes/categories";
        
        //Etape1
        //Récupérer blague de chuck norris au hasard via XMLHttpRequest
        const maRequete = new XMLHttpRequest();
        
        //Etape2
        //Méthode de rédaction et préparation de la requête
        maRequete.open("GET", url);
        
        //Etape3
        //méthode qui explique ce que l'on veut faire avec la réponse reçues
        maRequete.onload = () => {
                let categories = JSON.parse(maRequete.responseText);    //Traduit la string en objet JSON
        
                //Pour chaque catégorie
                categories.forEach(category =>{
                        //création d'un bouton de cette catégory
                        createCatBtns(category);
                } )
                
                //On récupère tout les boutons créer par le createCatBtns
                document.querySelectorAll(".categorie-btn").forEach(bouton => {
                        bouton.addEventListener('click', ()=> {
                                //On génère une joke en fonction du texte de son bouton = de sa catégorie
                                getARandomJoke(bouton.value);
                        })
                })
        }
        //Dernière étape
        //méthode qui envoie cette requête
        maRequete.send();
}

//Fonction qui créer les boutons des catégories
function createCatBtns(btnCatName){
        divCat.innerHTML += `<button type="button" class="btn btn-outline-secondary categorie-btn" id="${btnCatName}">${btnCatName}</button>`;
}
document.addEventListener('DOMContentLoaded', getCategories)
