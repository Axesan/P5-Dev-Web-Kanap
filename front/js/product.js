import { getAllProducts } from "./function";
console.log(getAllProducts);
// Methode GET ?? POUR RECUPERER L'id 
// A revoir. 
var url = window.location.href;
// Récupérer le paramètre de requête 'id' de l'URL
var id = new URL(url).searchParams.get('id');

// Utiliser l'ID récupéré
console.log('ID récupéré :', id);
