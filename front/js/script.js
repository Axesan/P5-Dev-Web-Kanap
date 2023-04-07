// All products
export async function getAllProducts() {
  var response = await fetch("http://localhost:3000/api/products");
  var AllProducts = await response.json();
  //AllProducts.forEach(data => { console.log('DATA::: ',data);});
  return AllProducts;
}
// on export notre fonction pour la rendre accessible a tous nos autre fichiers
export {getAllProducts};

async function templateData(data) {

  const products = await data; // récupère la liste de produits

  // boucle à travers chaque produit pour les traiter individuellement
  products.forEach((product) => {
    // Template
    const elemSection = document.getElementById("items");
    const elemLinkProduct = document.createElement("a");
    const elemArticle = document.createElement("article");
    const elemImg = document.createElement("img");
    const elemTitle = document.createElement("h3");
    const elemParagraph = document.createElement("p");

    // Décomposition de variables
    const { _id, name, price, altTxt, colors, imageUrl, description } = product;
    // On traitre les données
    elemLinkProduct.setAttribute("href", `product.html?id=${_id}`);
    elemLinkProduct.addEventListener("click", (event) => {
      event.preventDefault(); // empêche le lien de charger une nouvelle page
      window.location.href = elemLinkProduct.getAttribute("href"); // redirige vers la page que l'on a attribué comme attribut
    });
    elemImg.setAttribute("src", `${imageUrl}`);
    elemTitle.innerText = name;
    elemParagraph.innerText = description;

    // On ajoute une balise "a" a notre section
    elemSection.appendChild(elemLinkProduct);
    // Balise articles
    elemLinkProduct.appendChild(elemArticle);
    // On entre dans la balise 'articles'
    elemArticle.appendChild(elemImg);
    elemArticle.appendChild(elemTitle);
    elemArticle.appendChild(elemParagraph);
  });
}
//Appel a la function templateData qui attend un arguments 'data'

templateData(getAllProducts());

