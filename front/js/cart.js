const cart = JSON.parse(localStorage.getItem("cart"));

async function getProducts(id) {
  let response = await fetch(`http://localhost:3000/api/products/${id}`);
  let allProducts = await response.json();
  console.log(allProducts);
  return allProducts;
}

async function getCart() {
  // Selections de notre boutons command
  const buttonOrder = document.querySelector("#order")


  // Vérifie si la variable "cart" contient des données
  if (cart && cart.length > 0) {
    // Parcours chaque élément du tableau "cart"
    for (var i = 0; i < cart.length; i++) {
      TemplateCart(cart[i]);
    }
  } else {
   // On retire le boutons si le panier est vide .
    buttonOrder.style.display = 'none';
  }
}



async function TemplateCart(dataCart){
  // Decomposition de variable:
  console.log("Data Cart",dataCart);
  // Decomposition de variable de notre panier 
  const {qty,color} = await dataCart
  const {_id,name,price,imageUrl} = await getProducts(dataCart.id);

  let selectSection = document.querySelector("#cart__items");
  let selectTotauPrice = document.querySelector('#totalPrice');
  let elemArticle = document.createElement("article");
  let elemDivImg = document.createElement("div");
  let elemDivContent = document.createElement("div");
  let elemDivContentDescription = document.createElement("div");
  let elemDivContentSetting = document.createElement("div");
  let elemDivContentSettingQuantity = document.createElement("div");
  let elemDivContentSettingDelete = document.createElement("div");
  let elemImg = document.createElement("img");
  // Titre
  let titleProduct = document.createElement("h2");
  let colorProduct = document.createElement("p");
  let priceProduct = document.createElement("p");
  let qtyProduct = document.createElement("p");
  let inputQtyProduct = document.createElement("input");
  // SELECT ALL VALUE
  let deleteProduct = document.createElement("p");
  let nbArticle = document.querySelector("#totalQuantity");
 

  // Ajout de balise article dans section
  selectSection.appendChild(elemArticle);
  elemArticle.appendChild(elemDivImg);
  elemArticle.appendChild(elemDivContent);
  elemDivImg.appendChild(elemImg);
  elemDivContent.appendChild(elemDivContentDescription);
  elemDivContent.appendChild(elemDivContentSetting);
  elemDivContentDescription.appendChild(titleProduct);
  elemDivContentDescription.appendChild(colorProduct);
  elemDivContentDescription.appendChild(priceProduct);
  elemDivContentSetting.appendChild(elemDivContentSettingQuantity);
  elemDivContentSettingQuantity.appendChild(qtyProduct);
  elemDivContentSettingQuantity.appendChild(inputQtyProduct);
  elemDivContentSetting.appendChild(elemDivContentSettingDelete);
  elemDivContentSettingDelete.appendChild(deleteProduct);
  // Ajout des attribut dans la balise article
  elemArticle.setAttribute("class", "cart__item");
  elemArticle.setAttribute("data-id", _id);
  elemArticle.setAttribute("data-color", color);

  elemDivImg.setAttribute("class", "cart__item__img");
 
  elemImg.setAttribute("alt", "{product-color}");
  elemDivContentDescription.setAttribute(
    "class",
    "cart__item__content__description"
  );
  elemDivContent.setAttribute("class", "cart__item__content");
  elemDivContentSetting.setAttribute("class", "cart__item__content__settings");
  elemDivContentSettingQuantity.setAttribute(
    "class",
    "cart__item__content__settings__quantity"
  );
  elemDivContentSettingDelete.setAttribute(
    "class",
    "cart__item__content__settings__delete"
  );

  inputQtyProduct.setAttribute("type", "number");
  inputQtyProduct.setAttribute("class", "itemQuantity");
  deleteProduct.setAttribute("class", "deleteItem");

  // Ajout du textes
  elemImg.setAttribute("src",imageUrl);
  inputQtyProduct.value = qty;
  titleProduct.innerText = name;
  priceProduct.innerText = price + "€";
  colorProduct.innerText = color;

  qtyProduct.innerText = "Qté:";
  deleteProduct.innerText = "Supprimer";

 // Qty total + total price 
  nbArticle.innerText = qtyTotalCart();  
  selectTotauPrice.innerText = await totalPriceCart() ;


  //- DELETE ITEMS FROM CART
  let deleteItemCart = document.querySelectorAll('.deleteItem');
 // BOUCLE SUR TOUS LES BOUTONS 
 // Parcourez tous les boutons "Supprimer" et ajoutez un gestionnaire d'événements click à chacun
 deleteItemCart.forEach((button) => {
  button.addEventListener('click', (event) => {
    // Récupérez l'article parent du bouton "Supprimer" pour obtenir l'ID et la couleur du produit
    const article = event.target.closest('.cart__item');
    const productId = article.getAttribute('data-id');
    const productColor = article.getAttribute('data-color');

    // Supprimez le produit du panier en créant un nouveau panier sans cet article
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = cart.filter((product) => product.id !== productId || product.color !== productColor);
    localStorage.setItem('cart', JSON.stringify(cart));

    location.reload()
    // Mettez à jour l'affichage du panier
    //displayCart();
  });
});



  
}

/** - GESTION DES ERREUR
* @param {string} message
* @param {string} selectBaliseMessage
*/

function displayErrorMessage(message, selectBaliseMessage) {
  // Affiche un message d'erreur pour l'input spécifié
  const errorMsg = document.querySelector(selectBaliseMessage);
  errorMsg.textContent = message;
  return false;
}


/**
 * VERIF FORMS
 */
function VerifForms() {
  const buttonForm = document.querySelector("#order");
  // object regexp + msg error
  const dataRegexp = {
    firstname: [/^[A-Za-z]{2,15}$/, "Veuillez entrer un prénom valide"],
    lastname: [/^[A-Za-z]{2,20}$/, "Veuillez entrer un nom valide"],
    address: [
      /^[0-9]{1,3}( [a-zA-Zàâäéèêëïîôöùûüç'-]+)+$/,
      "Veuillez entrer une adresse valide",
    ],
    email: [
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      "Veuillez entrer une addresse email valide",
    ],
    ville: [/^[A-Za-zÀ-ÖØ-öø-ÿ -'’]+$/, "Veuillez entrer une ville valide"],
  };

  const selectNameInput = document.querySelector("#firstName");
  const selectFirstNameInput = document.querySelector("#lastName");
  const selectAddressInput = document.querySelector("#address");
  const selectEmailInput = document.querySelector("#email");
  const selectCityInput = document.querySelector("#city");

  buttonForm.addEventListener("click", function () {
    if (!dataRegexp.firstname[0].test(selectNameInput.value)) {
      displayErrorMessage(
        
        dataRegexp.firstname[1],
        "#firstNameErrorMsg"
      );
    }

    if (!dataRegexp.lastname[0].test(selectFirstNameInput.value)) {
      displayErrorMessage(
        
        dataRegexp.lastname[1],
        "#lastNameErrorMsg"
      );
    }
    if (!dataRegexp.address[0].test(selectAddressInput.value)) {
      displayErrorMessage(
        
        dataRegexp.address[1],
        "#addressErrorMsg"
      );
    }
    if (!dataRegexp.ville[0].test(selectCityInput.value)) {
      displayErrorMessage(
        
        dataRegexp.ville[1],
        "#cityErrorMsg"
      );
    }
    if (!dataRegexp.email[0].test(selectEmailInput.value)) {
      displayErrorMessage(
        
        dataRegexp.email[1],
        "#emailErrorMsg"
      );
    }
  });
}



function changeTotalPrice() {
  
  // Récupérer la valeur de la clé "maCle"
  var maValeur = localStorage.getItem("qty");
  console.log(cart.length);

// Afficher la valeur récupérée
console.log("Function ///",maValeur);
}


function qtyTotalCart(){

  // Initialiser une variable de total à 0
  let totalArticleQuantity = 0;

  // Parcourir la liste des produits et ajouter la quantité de chaque produit au total
  cart.forEach(product => {
    totalArticleQuantity += product.qty; 
  });
  return totalArticleQuantity;
}
/**
 * 
 * @returns totalPriceCart
 */
async function totalPriceCart(){
    // Initialiser une variable de total à 0 - TOTAL PRICES
    let totalPriceCart = 0;

   for (const product of cart) {
     const { price } = await getProducts(product.id);
     totalPriceCart += price * product.qty;
     console.log('TOTAL PANIER: ' + totalPriceCart);
   }
   return totalPriceCart;
  
}

// Appel a nos fonctions 
getCart();
//changeTotal()
VerifForms();