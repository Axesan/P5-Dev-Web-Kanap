// All products
export async function getAllProducts() {
    var response = await fetch("http://localhost:3000/api/products");
    var AllProducts = await response.json();
    //AllProducts.forEach(data => { console.log('DATA::: ',data);});
    return AllProducts;
  }

  // on export notre fonction pour la rendre accessible a tous nos autre fichiers
export {getAllProducts};