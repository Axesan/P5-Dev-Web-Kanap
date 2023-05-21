// Obtenir l'URL actuelle de la page
const url = new URL(window.location.href);
// Obtenir les paramètres de requête de l'URL
let params = new URLSearchParams(url.search);
// Récupérer la valeur du paramètre "id"
let idProduct = params.get("id");


/**
 * @param {String} id ID Associer au produits
 */
async function getProductById(id) {
  let response = await fetch(`http://localhost:3000/api/products/${id}`);
  let allProducts = await response.json();
  console.log("Data //", allProducts);

  let { imageUrl, name, price, description, colors } = allProducts;
  // Appel à la fonction
  TemplatebyId(imageUrl, name, price, description, colors);

  // Appel a notre fonction Pour l'ajout au panier  
  let buttonAddToCart = document.getElementById("addToCart");
  // Quantity 
  let elemValueQuantity = document.querySelector('#quantity'); 
  let elemColor = document.querySelector("#colors")
 
  console.log(elemColor[0].value);
 
  buttonAddToCart.addEventListener("click",function () {
 
    let valid = true;
    elemColor.style.border = "none";
    elemValueQuantity.style.border = "none";

    if (elemValueQuantity.value <= 0) {
      elemValueQuantity.style.border = "2px solid red";
      valid = false;
    }
    if (elemColor.selectedIndex === 0) {
        elemColor.style.border = "2px solid red";
        valid = false;
    }
    if (valid) {
      alert("L'article "+name+" a été ajouté au panier");
      addToCart(id, elemValueQuantity.value, elemColor.options[elemColor.selectedIndex].text);
      console.log(elemColor);
      
      
    }

  })

}
/**
 * @param {String} linkImg Liens de l'image du produit
 * @param {String} nameProduct Nom du produit
 * @param {Int} priceProduct Prix de produit
 * @param {String} descProduct Description du produit
 * @param {Array} colorProduct Le coloration du produit
 */
function TemplatebyId(
  linkImg,
  nameProduct,
  priceProduct,
  descProduct,
  colorProduct
) {
  // Selector
  let selectClassImg = document.querySelector(".item__img");
  let selectTitleId = document.querySelector("#title");
  let selectPrice = document.querySelector("#price");
  let selectDescription = document.querySelector("#description");
  let selectColors = document.querySelector("#colors");

  // element
  let elemImg = document.createElement("img");

  elemImg.setAttribute("src", linkImg);

  selectClassImg.appendChild(elemImg);

  // Ajout du texte
  selectTitleId.innerText = nameProduct;
  selectPrice.innerText = priceProduct;
  selectDescription.innerText = descProduct;
 
  colorProduct.forEach((color, key) => {
    let option = document.createElement("option");
    //ajout d'attribut 
    option.setAttribute("value", key);
    option.innerText = color;
    selectColors.appendChild(option);
  });
}

//  Fonction pour ajouter au panier
function addToCart(productId, qty, selectedColor) {
  // Crée un objet qui représente le produit
  let product = {
    id: productId,
    qty: parseInt(qty),
    color: selectedColor
  };

  // Initialise le tableau du panier (cart) à partir du local storage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Vérifie si le produit est déjà présent dans le panier
  let existingProductIndex = -1;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === productId && cart[i].color === selectedColor) {
      existingProductIndex = i;
      break;
    }
  }

  // Si le produit est déjà présent dans le panier avec la même couleur, met à jour la quantité
  if (existingProductIndex !== -1) {
    cart[existingProductIndex].qty += product.qty;
  } else {
    // Sinon, ajoute le produit au panier
    cart.push(product);
  }

  // Sauvegarde le tableau du panier dans le local storage
  localStorage.setItem("cart", JSON.stringify(cart));
}

getProductById(idProduct);
