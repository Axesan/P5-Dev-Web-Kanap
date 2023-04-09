/**
 * 
 * @param {*} hrefLink Liens de l'image
 * @param {*} nameProduct Nom du produits
 * @param {*} altTxtImg Text Alternatif de l'image 
 * @param {*} imgUrl Parametre Url 
 * @param {*} descriptionProduct description du produits 
 */

function Template(hrefLink,nameProduct,altTxtImg,imgUrl,descriptionProduct) {
    // Template
    const elemSection = document.getElementById("items");
    const elemLinkProduct = document.createElement("a");
    const elemArticle = document.createElement("article");
    const elemImg = document.createElement("img");
    const elemTitle = document.createElement("h3");
    const elemParagraph = document.createElement("p");

    elemLinkProduct.setAttribute("href", hrefLink);
    elemLinkProduct.addEventListener("click", (event) => {
        event.preventDefault(); // empêche le lien de charger une nouvelle page
        window.location.href = elemLinkProduct.getAttribute("href"); // redirige vers la page que l'on a attribué comme attribut
      });

      elemImg.setAttribute("src", imgUrl);
      elemImg.setAttribute("alt", altTxtImg);
      elemTitle.innerText = nameProduct;
      elemParagraph.innerText = descriptionProduct;

    // On ajoute une balise "a" a notre section
    elemSection.appendChild(elemLinkProduct);
    // Balise articles
    elemLinkProduct.appendChild(elemArticle);
    // On entre dans la balise 'articles'
    elemArticle.appendChild(elemImg);
    elemArticle.appendChild(elemTitle);
    elemArticle.appendChild(elemParagraph);
}

/**
* getAllProducts() -> Affiche nos elements a partir du template
*/

async function getAllProducts() {

  var response = await fetch("http://localhost:3000/api/products");
  var AllProducts = await response.json();
  
    AllProducts.forEach(data => {
        // Décomposition de variable    
        const { _id, name, altTxt, imageUrl, description } = data;
        //Appel a la fonctions
        Template(`product.html?id=${_id}`,name,altTxt,imageUrl,description)
    });
        
}

getAllProducts()




