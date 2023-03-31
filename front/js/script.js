// All products
async function getAllProducts(){
    var response = await fetch('http://localhost:3000/api/products');
    var AllProducts = await response.json();
    return console.log(AllProducts);
}
getAllProducts(1)





// Test Template home
const sectionElement = document.createElement("section");
const linkProductItems = document.createElement("a");
const articleItem = document.createElement("article");
const ImgItem = document.createElement("img");
const TitleItem = document.createElement('h3');
const ParagrapheItems = document.createElement('p');

// Add Attribut for items
linkProductItems.setAttribute('href',"https://test.com");
sectionElement.setAttribute("id","items");
sectionElement.setAttribute("class","items");
ImgItem.setAttribute("src","./");
ImgItem.setAttribute("alt","text");
TitleItem.setAttribute('class',"productName")
ParagrapheItems.setAttribute('class','productDescription')

// Ajout des balises dans les balises nécessaire.
sectionElement.appendChild(linkProductItems);
linkProductItems.appendChild(articleItem);
articleItem.appendChild(ImgItem);
articleItem.appendChild(TitleItem);
articleItem.appendChild(ParagrapheItems)

//Add text 
ParagrapheItems.innerText = 'Product';

// Ajout de notre template
document.body.appendChild(sectionElement);
