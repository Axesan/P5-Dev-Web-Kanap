const id = new URL(window.location.href).searchParams.get("orderId");

let selectOrderId = document.querySelector('#orderId');


// Vérifie si le panier contient des objets
let cart = JSON.parse(localStorage.getItem("cart")) || [];

if (cart.length <= 0) {
    // Attribue une valeur par défaut si le panier est vide
    selectOrderId.innerHTML = "Panier Vide";
} else {
  
    // Génère un numéro de commande unique si le panier n'est pas vide
    selectOrderId.innerHTML = id;
    //On vide le panier de commande 
    localStorage.removeItem('cart');
}