// Obtenir l'URL actuelle de la page
const url = new URL(window.location.href);
// Obtenir les paramètres de requête de l'URL
const params = new URLSearchParams(url.search);
// Récupérer la valeur du paramètre "id"
const idProduct = params.get("id");

/**
 * @param {String} id ID Associer au produits
 */
async function getProductById(id) {
  const response = await fetch(`http://localhost:3000/api/products/${id}`);
  const allProducts = await response.json();
  console.log("Data //", allProducts);

  const { imageUrl, name, price, description, colors } = allProducts;
  // On met notre prix au bon formats
  // On utilise .replace('.',',') pour remplacer les points par des virgules
  const formattedPrice = (price / 100).toFixed(2).replace(".", ",");

  // Submit pour ajouter au panier
  const buttonAddToCart = document.getElementById("addToCart");

  buttonAddToCart.addEventListener("click", function () {
    // Recupération des données de notre input quantity.
    const inputQuantity = document.getElementById("quantity").value;

    // On récupere les données du produits
    console.log("click OK", price,name,inputQuantity);
    console.log(inputQuantity);

    // Test Local Storage 
    try {
        localStorage.setItem('name',name);
        localStorage.setItem('description',description);

       parseInt(localStorage.setItem('quantity',inputQuantity))

       // let priceParse = parseInt(localStorage.getItem("prixProduct"));
        

        
    } catch (error) {
        console.log("error",error);
    }

  });

  // Appel à la fonction
  TemplatebyId(imageUrl, name, formattedPrice, description, colors);
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
  const selectClassImg = document.getElementsByClassName("item__img")[0];
  const selectTitleId = document.getElementById("title");
  const selectPrice = document.getElementById("price");
  const selectDescription = document.getElementById("description");
  const selectColors = document.getElementById("colors");

  // element
  const elemImg = document.createElement("img");

  elemImg.setAttribute("src", linkImg);

  selectClassImg.appendChild(elemImg);

  // Ajout du texte
  selectTitleId.innerText = nameProduct;
  selectPrice.innerText = priceProduct;
  selectDescription.innerText = descProduct;

  colorProduct.forEach((color) => {
    const option = document.createElement("option");
    selectColors.value = color;
    option.innerText = color;
    selectColors.appendChild(option);
  });
}

// -TEST- Fonction pour ajouter au panier
function addToCart() {}
addToCart();
getProductById(idProduct);
