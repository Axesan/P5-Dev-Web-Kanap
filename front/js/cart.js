function getCart(){
    let cart =JSON.parse(localStorage.getItem("cart"));
    
   

// Vérifie si la variable "cart" contient des données
if (cart && cart.length > 0) {
    // Parcours chaque élément du tableau "cart"
    for (var i = 0; i < cart.length; i++) {
      // Accède aux propriétés de l'objet "product" pour chaque élément du tableau
      console.log("Product ID:", cart[i].id);
      console.log("Product Color:", cart[i].color);
      console.log("Product Quantity:", cart[i].qty);
    }
  } else {
    console.log("Cart is empty.");
  }
} 

getCart();

// fonction template
function TemplateCart() {
    let selectSection = document.querySelector("#cart__items");
    let elemArticle = document.createElement("article");
    let elemDivImg = document.createElement("div");
    let elemDivContent = document.createElement("div");
    let elemImg = document.createElement("img");


    // Ajout de balise article dans section 
    selectSection.appendChild(elemArticle);
    elemArticle.appendChild(elemDivImg);
    elemArticle.appendChild( elemDivContent )
    elemDivImg.appendChild(elemImg);

    //Ajout des attribut dans la balise article
    elemArticle.setAttribute("class", "cart__item");
    elemArticle.setAttribute("data-id", "{product-ID}");
    elemArticle.setAttribute("data-color", "{product-color}");

    elemDivImg.setAttribute("class", "cart__item__img");
    elemImg.setAttribute("src", "#");
    elemImg.setAttribute("alt", "{product-color}");

    

    elemDivContent.setAttribute("class", "cart__item__content");

  
}


// function VerifForm(form) {
 
  
//   // Selector
//   const elemForm = document.querySelector(form);

//   const elemValueEmail = document.querySelector('#email').value
//   const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
//   //SELECT INPUT ERROR
//   const elemErrorEmail = document.querySelector('#emailErrorMsg')


//   // Message error 
//   let errInput = "";
//   elemForm.addEventListener('submit', (event) => {
//     event.preventDefault();
//     console.log('Le formulaire a été soumis !');
//     if (emailRegExp.test(elemValueEmail)) {
      
//       console.log(`${elemValueEmail} est un email valide.`);

     

//     } else {
//       console.log(`${elemValueEmail} n'est pas un email valide.`);
//       elemErrorEmail.innerHTML = errInput="Email non valide";
//       return false;
//     }
//   });

// }



const form = document.querySelector('.cart__order__form');
const firstNameInput = document.querySelector('#firstName');
const lastNameInput = document.querySelector('#lastName');
const addressInput = document.querySelector('#address');
const cityInput = document.querySelector('#city');
const emailInput = document.querySelector('#email');

console.log(form);
// REGEXP EMAIL
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
form.addEventListener('submit', (event) => {
  // Empêche l'envoi du formulaire par défaut
  event.preventDefault();

  // Vérifie que tous les champs obligatoires sont remplis
  if (firstNameInput.value === '') {
    displayErrorMessage(firstNameInput, 'Veuillez entrer votre prénom.');
    return;
  }

  if (lastNameInput.value === '') {
    displayErrorMessage(lastNameInput, 'Veuillez entrer votre nom.');
    return;
  }

  if (addressInput.value === '') {
    displayErrorMessage(addressInput, 'Veuillez entrer votre adresse.');
    return;
  }

  if (cityInput.value === '') {
    displayErrorMessage(cityInput, 'Veuillez entrer votre ville.');
    return;
  }

  if (emailInput.value === '') {
    displayErrorMessage(emailInput, 'Veuillez entrer votre email.');
    return;
  }

  

  // Si tous les champs sont remplis, envoie le formulaire
  form.submit();
});


function displayErrorMessage(input, message) {
  // Affiche un message d'erreur pour l'input spécifié
  const errorMsg = input.parentElement.querySelector('.errorMsg');
  errorMsg.textContent = message;
}

//VerifForm(".cart__order__form")
TemplateCart()
console.log();

