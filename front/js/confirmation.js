

// const id = new URL(window.location.href).searchParams.get("id");
// console.log('MonId',id);

function generateUniqueNumber() {
    // Génère un nombre aléatoire entre 0 et 1
    let randomNumber = Math.random();
  
    // Convertit le nombre en une chaîne de caractères
    let randomString = randomNumber.toString();
  
    // Extrait les caractères après la virgule pour augmenter l'unicité
    let uniqueString = randomString.substring(2);
  
    // Convertit la chaîne de caractères en un nombre entier
    let uniqueNumber = parseInt(uniqueString);
  
    return uniqueNumber;
  }

  let select = document.querySelector('#orderId');


// Vérifie si le panier contient des objets
let cart = JSON.parse(localStorage.getItem("cart")) || [];
if (cart.length <= 0) {
    // Attribue une valeur par défaut si le panier est vide
    select.innerHTML = "Panier Vide";
} else {
  
    // Génère un numéro de commande unique si le panier n'est pas vide
    select.innerHTML = generateUniqueNumber().toString();
}