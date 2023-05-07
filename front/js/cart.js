async function getProducts(id) {
  let response = await fetch(`http://localhost:3000/api/products/${id}`);
  let allProducts = await response.json();
  console.log(allProducts);
  return allProducts;
}

async function getCart() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  console.log("TOTO //", cart.length);

  // Vérifie si la variable "cart" contient des données
  if (cart && cart.length > 0) {
    // Parcours chaque élément du tableau "cart"
    for (var i = 0; i < cart.length; i++) {
      var { name, price, imageUrl } = await getProducts(cart[i].id);
      //console.log(urlImage);
      // Accède aux propriétés de l'objet "product" pour chaque élément du tableau
      console.log("Product ID:", cart[i].id);
      console.log("Product Color:", cart[i].color);
      console.log("Product Quantity:", cart[i].qty);

      TemplateCart(name, cart[i].color, imageUrl, price, cart[i].qty);
    }
  } else {
    console.log("Cart is empty.");
  }
}

getCart();

// fonction template
function TemplateCart(productTitle, color, UrlImage, price, qty) {
  let selectSection = document.querySelector("#cart__items");
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
  elemArticle.setAttribute("data-id", "{product-ID}");
  elemArticle.setAttribute("data-color", "{product-color}");

  elemDivImg.setAttribute("class", "cart__item__img");
  elemImg.setAttribute("src", UrlImage);
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
  titleProduct.innerText = productTitle;
  qtyProduct.innerText = "Qté:";
  deleteProduct.innerText = "Supprimer";
  priceProduct.innerText = price += "€";
  colorProduct.innerText = color;
  nbArticle.innerText = "1";
  inputQtyProduct.value = qty;
}

/** - GESTION DES ERREUR
 * @param {string} input
 * @param {string} message
 */
function displayErrorMessage(input, message, selectBaliseMessage) {
  // Affiche un message d'erreur pour l'input spécifié
  const errorMsg = input.parentElement.querySelector(selectBaliseMessage);
  errorMsg.textContent = message;
  return false;
}

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
        selectNameInput,
        dataRegexp.firstname[1],
        "#firstNameErrorMsg"
      );
    }

    if (!dataRegexp.lastname[0].test(selectFirstNameInput.value)) {
      displayErrorMessage(
        selectFirstNameInput,
        dataRegexp.lastname[1],
        "#lastNameErrorMsg"
      );
    }
    if (!dataRegexp.address[0].test(selectAddressInput.value)) {
      displayErrorMessage(
        selectAddressInput,
        dataRegexp.address[1],
        "#addressErrorMsg"
      );
    }
    if (!dataRegexp.ville[0].test(selectCityInput.value)) {
      displayErrorMessage(
        selectCityInput,
        dataRegexp.ville[1],
        "#cityErrorMsg"
      );
    }
    if (!dataRegexp.email[0].test(selectEmailInput.value)) {
      displayErrorMessage(
        selectEmailInput,
        dataRegexp.email[1],
        "#emailErrorMsg"
      );
    }
  });
}

VerifForms();
