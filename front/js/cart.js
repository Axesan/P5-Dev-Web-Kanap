async function getProducts(id) {
  let response = await fetch(`http://localhost:3000/api/products/${id}`);
  let allProducts = await response.json();
  console.log(allProducts);
  return allProducts;
  
}

 async function getCart(){
 
    let cart = JSON.parse(localStorage.getItem("cart"));  
    console.log("TOTO //",cart.length);

// Vérifie si la variable "cart" contient des données
if (cart && cart.length > 0) {
    // Parcours chaque élément du tableau "cart"
    for (var i = 0; i < cart.length; i++) {
      var {name,price,imageUrl} = await getProducts(cart[i].id);
      //console.log(urlImage);
      // Accède aux propriétés de l'objet "product" pour chaque élément du tableau
      console.log("Product ID:", cart[i].id);
      console.log("Product Color:", cart[i].color);
      console.log("Product Quantity:", cart[i].qty);

      TemplateCart(name, cart[i].color,imageUrl,price, cart[i].qty)

    }
  } else {
    console.log("Cart is empty.");
  }
} 

getCart();

// fonction template
function TemplateCart(productTitle,color,UrlImage,price,qty) {
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

    let nbArticle = document.querySelector('#totalQuantity')
    
   


    // Ajout de balise article dans section 
    selectSection.appendChild(elemArticle);
    elemArticle.appendChild(elemDivImg);
    elemArticle.appendChild(elemDivContent)
    elemDivImg.appendChild(elemImg);
    elemDivContent.appendChild(elemDivContentDescription);
    elemDivContent.appendChild(elemDivContentSetting)

    elemDivContentDescription.appendChild(titleProduct);
    elemDivContentDescription.appendChild(colorProduct);
    elemDivContentDescription.appendChild(priceProduct);
    elemDivContentSetting.appendChild(elemDivContentSettingQuantity);

    elemDivContentSettingQuantity.appendChild(qtyProduct);
    elemDivContentSettingQuantity.appendChild(inputQtyProduct);
    elemDivContentSetting.appendChild(elemDivContentSettingDelete)
    elemDivContentSettingDelete.appendChild(deleteProduct);
    

    // Ajout des attribut dans la balise article
    elemArticle.setAttribute("class", "cart__item");
    elemArticle.setAttribute("data-id", "{product-ID}");
    elemArticle.setAttribute("data-color", "{product-color}");

    elemDivImg.setAttribute("class", "cart__item__img");
    elemImg.setAttribute("src",UrlImage);
    elemImg.setAttribute("alt", "{product-color}");
    elemDivContentDescription.setAttribute("class", "cart__item__content__description");
    elemDivContent.setAttribute("class", "cart__item__content");
    elemDivContentSetting.setAttribute("class", "cart__item__content__settings");
    elemDivContentSettingQuantity.setAttribute("class", "cart__item__content__settings__quantity");
    elemDivContentSettingDelete.setAttribute("class", "cart__item__content__settings__delete");
    
    inputQtyProduct.setAttribute('type', 'number');
    inputQtyProduct.setAttribute("class","itemQuantity");
    deleteProduct.setAttribute('class', 'deleteItem')

    // Ajout du textes 
    titleProduct.innerText = productTitle;
    qtyProduct.innerText = "Qté:";
    deleteProduct.innerText = "Supprimer";
    priceProduct.innerText = price += "€"
    colorProduct.innerText = color
    nbArticle.innerText = "1"
    inputQtyProduct.value = qty;
  
}

/** - GESTION DES ERREUR
 * @param {string} input 
 * @param {string} message 
 */
function displayErrorMessage(input, message,selectBaliseMessage) {
  // Affiche un message d'erreur pour l'input spécifié
  const errorMsg = input.parentElement.querySelector(selectBaliseMessage);
  errorMsg.textContent = message;
  return false;
}


function VerifForms() {
  const buttonForm = document.querySelector('#order');
  // regexp 
  const firstNameRegexp = /^[A-Za-z]{4,15}$/;
  const lastNameRegexp = /^[A-Za-z]{3,20}$/;
  const addressRegexp = /^[0-9]{1,3}( [a-zA-Zàâäéèêëïîôöùûüç]+)+$/;
  const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
   
  const selectNameInput = document.querySelector('#firstName');
  const selectFirstNameInput = document.querySelector('#lastName');
  const selectAddressInput = document.querySelector('#address');
  const selectEmailInput = document.querySelector('#email');

  buttonForm.addEventListener('click', function() { 
    const nameIsValid = firstNameRegexp.test(selectNameInput.value); 
    const firstNameValid = lastNameRegexp.test(selectFirstNameInput.value); 
    const addressValid = addressRegexp.test(selectAddressInput.value); 
    const emailIsValid = emailRegexp.test(selectEmailInput.value); 
      if (!nameIsValid) {
        
        displayErrorMessage(selectNameInput,'Veuillez entrer un nom valide', '#firstNameErrorMsg')
        
      }

      if (!firstNameValid) {
        displayErrorMessage(selectFirstNameInput,"Veuillez entrer un prénom valide", '#lastNameErrorMsg')
        
      }
      if (!addressValid) {
          displayErrorMessage(selectAddressInput, "Veuillez entrer une adresse valide", '#addressErrorMsg')
      }
      if (!emailIsValid) {
        displayErrorMessage(selectEmailInput, "Veuillez entrer une adresse email valide", '#emailErrorMsg')
      }
  });
}

VerifForms()



