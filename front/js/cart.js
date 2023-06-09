const cart = JSON.parse(localStorage.getItem("cart"));

/**
 * 
 * @param {String} id 
 * @returns all Items Product in Cart
 */
async function getProducts(id) {
  let response = await fetch(`http://localhost:3000/api/products/${id}`);
  let allProducts = await response.json();
 
  return allProducts;
}


/**
 * TEMPLATE CART
 * @param {Object} dataCart 
 * @param {Object} dataProductById 
 */
async function TemplateCart(dataCart, dataProductById) {
  // Decomposition de variable de notre panier
  const { qty, color } = dataCart;
  const { _id, name, price, imageUrl } = dataProductById;

  let selectSection = document.querySelector("#cart__items");
  let selectTotauPrice = document.querySelector("#totalPrice");
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
  elemImg.setAttribute("src", imageUrl);
  inputQtyProduct.value = qty;
  titleProduct.innerText = name;
  priceProduct.innerText = price + "€";
  colorProduct.innerText = color;

  qtyProduct.innerText = "Qté:";
  deleteProduct.innerText = "Supprimer";

  // Qty total + total price
  nbArticle.innerText = qtyTotalCart();
  const totaux = await totalPriceCart();
  selectTotauPrice.innerText = parseInt(totaux);

  //- DELETE ITEMS FROM CART
  let deleteItemCart = document.querySelectorAll(".deleteItem");
  // Parcoure tous les boutons "Supprimer" et ajoutez un gestionnaire d'événements click à chacun
  deleteItemCart.forEach((button) => {
    button.addEventListener("click", (event) => {
      // Récupérez l'article parent du bouton "Supprimer" pour obtenir l'ID et la couleur du produit
      const article = event.target.closest(".cart__item");
      const productId = article.getAttribute("data-id");
      const productColor = article.getAttribute("data-color");

      // Supprimez le produit du panier en créant un nouveau panier sans cet article
      let cart = JSON.parse(localStorage.getItem("cart"));
      cart = cart.filter(
        (product) => product.id !== productId || product.color !== productColor
      );
      localStorage.setItem("cart", JSON.stringify(cart));

      calculateTotalPriceDeleteProduct();

      var deleteProduct = event.target.closest(".cart__item");
      // Vérifier si l'élément a un parent avant de le supprimer
      if (deleteProduct.parentNode) {
        deleteProduct.parentNode.removeChild(deleteProduct);
      }
    });
  });

  // chang qty total to input
  // Sélectionnez l'élément de l'input de quantité
  const qtyInput = document.querySelectorAll(".itemQuantity");
  // Parcoure tous les inputs de quantité
  qtyInput.forEach((input, index) => {
    // Ajoute un gestionnaire d'événements pour l'événement "input"
    input.addEventListener("input", async (event) => {
      // Récupére la nouvelle quantité saisie dans l'input
      const newQty = parseInt(event.target.value);

      // On vérifie si la quantité n'est pas inférieure à 0
      input.style.border = "none";
      if (newQty <= 0) {
        input.style.border = "2px solid red";
        return false;
      }

      // Mettre à jour la quantité du produit dans le panier
      if (index >= 0 && index < cart.length) {
        cart[index].qty = newQty;
      }

      // Mettre à jour les données dans le localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      await calculateTotalPriceDeleteProduct();
      qtyTotalCart(); // MAJ FUNCTION
   
    });
  });
}

/**
 * PRINT CART IN LOCALSTORAGE
 */
async function getCart() {
  // Selections de notre boutons command
  const buttonOrder = document.querySelector("#order");

  // Vérifie si la variable "cart" contient des données
  if (cart && cart.length > 0) {
    // Parcours chaque élément du tableau "cart"
    for (var i = 0; i < cart.length; i++) {
      var allDataCart = cart[i];
      var dataProductId = await getProducts(cart[i].id);
      TemplateCart(allDataCart, dataProductId);
    }
  } else {
    // On retire le boutons si le panier est vide .
    buttonOrder.style.display = "none";
    alert('Votre panier est vide.')
  }
}
/** - GESTION DES ERREUR
 * @param {string} message
 * @param {string} selector
 */

function displayErrorMessage(message, selector) {
  const errorMsgElement = document.querySelector(selector);
  errorMsgElement.textContent = message;
}


/**
 * 
 * @returns total number quantity
 */

function qtyTotalCart() {
  // Initialiser une variable de total à 0
  let totalArticleQuantity = 0;

  // Parcourir la liste des produits et ajouter la quantité de chaque produit au total
  cart.forEach((product) => {
    // opération de mise à jour de la variable totalArticleQuantity
    totalArticleQuantity += product.qty;
  });
  return totalArticleQuantity;
}

/**
 * Print total Cart 
 * @returns totalPriceCart
 */
async function totalPriceCart() {
  let totalPriceCart = 0;

  for (const product of cart) {
    // Recup initial price products.
    const { price } = await getProducts(product.id);

    // Calculate total price + qty
    totalPriceCart += price * product.qty;
  }
  return parseInt(totalPriceCart);
}

/**
 * Function to calculate the total price in delete products
 */
async function calculateTotalPriceDeleteProduct() {
  const cartItems = JSON.parse(localStorage.getItem("cart"));
  //Initializa total price & totalQty in 0 
  let totalPrice = 0;
  let totalQty = 0;

  for (const product of cartItems) {
    const { qty, id } = product;

    const infoProduct = await getProducts(id);
    totalQty += parseInt(qty);
    totalPrice += parseInt(infoProduct.price) * parseInt(qty);
  }

  document.querySelector("#totalPrice").innerText = totalPrice;
  document.querySelector("#totalQuantity").innerText = totalQty;
}


/**
 * 
 * @returns Object FormData 
 */
function formData() {
  const form = document.querySelector("form");
  const formData = new FormData(form);
  const params = new URLSearchParams(formData);

  // Récupérer les valeurs des paramètres du formulaire
  const firstName = params.get("firstName");
  const lastName = params.get("lastName");
  const address = params.get("address");
  const city = params.get("city");
  const email = params.get("email");

  // Créer un objet avec les données récupérées GET 
  const formDataObject = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    email: email,
  };

  return formDataObject;
}

/**
 * Redirection for url getORder 
 * @param {Object} formDataCart 
 */
async function getOrder(formDataCart) {
  const response = await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataCart),
  });
  if (response.ok) {
    const result = await response.json();
    window.location.href = `./confirmation.html?orderId=${result.orderId}`;
  } else {
    console.log("Error:", response.status);
  }
}



// ---- Vérification du formualaire ----

const buttonForm = document.querySelector("#order");
// object regexp + msg error
const dataRegexp = {
  firstname: [/^[A-Za-zÀ-ÖØ-öø-ÿ]{2,15}$/, "Veuillez entrer un prénom valide"],
  lastname: [/^[A-Za-zÀ-ÖØ-öø-ÿ]{2,20}$/, "Veuillez entrer un nom valide"],
  address: [
    /^[0-9]{1,3}( [a-zA-Zàâäéèêëïîôöùûüç'-]+)+$/,
    "Veuillez entrer une adresse valide",
  ],
  email: [
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    "Veuillez entrer une adresse email valide",
  ],
  ville: [/^[A-Za-zÀ-ÖØ-öø-ÿ \-'’]+$/, "Veuillez entrer une ville valide"],
};

const selectFirstNameInput = document.querySelector("#firstName");
const selectNameInput = document.querySelector("#lastName");
const selectAddressInput = document.querySelector("#address");
const selectEmailInput = document.querySelector("#email");
const selectCityInput = document.querySelector("#city");

buttonForm.addEventListener("click", function (e) {
  e.preventDefault(); // Evite la soumission du formulaires 
  resetErrorMessages();

  let isValid = true; // variable pour suivre la validité du formulaire

  if (!dataRegexp.firstname[0].test(selectFirstNameInput.value)) {
    displayErrorMessage(dataRegexp.firstname[1], "#firstNameErrorMsg");
    isValid = false;
  }

  if (!dataRegexp.lastname[0].test(selectNameInput.value)) {
    displayErrorMessage(dataRegexp.lastname[1], "#lastNameErrorMsg");
    isValid = false;
  }

  if (!dataRegexp.address[0].test(selectAddressInput.value)) {
    displayErrorMessage(dataRegexp.address[1], "#addressErrorMsg");
    isValid = false;
  }

  if (!dataRegexp.ville[0].test(selectCityInput.value)) {
    displayErrorMessage(dataRegexp.ville[1], "#cityErrorMsg");
    isValid = false;
  }

  if (!dataRegexp.email[0].test(selectEmailInput.value)) {
    displayErrorMessage(dataRegexp.email[1], "#emailErrorMsg");
    isValid = false;
  }

  if (isValid) {
    // Le formulaire est valide

    let productConfirm = [];
    //Les variables doivent avoir le meme nom qui il y'a dans le back
    const contact = formData();
    const products = productConfirm;

    cart.forEach((elem) => {
      productConfirm.push(elem.id);
    });

    // ON fait passer la variable à notre fonction
    const requestBody = {
      contact,
      products,
    };
     

    getOrder(requestBody);
     //On vide le panier de commande 
     localStorage.removeItem('cart');
  } 
});
/**
 * RESET ALL MESSAGES ERRORS
 */
function resetErrorMessages() {
  document.getElementById("firstNameErrorMsg").textContent = "";
  document.getElementById("lastNameErrorMsg").textContent = "";
  document.getElementById("addressErrorMsg").textContent = "";
  document.getElementById("cityErrorMsg").textContent = "";
  document.getElementById("emailErrorMsg").textContent = "";
}


// Appel a nos fonctions
getCart();

