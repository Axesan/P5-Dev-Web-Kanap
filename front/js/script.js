var test = document.getElementById('productTest');
let obj ;
console.log(test);

fetch('http://localhost:3000/api/products')
  .then(response => response.json())
  .then(data => {
    // Traitement des données 
    console.log('VAR DATA',data[0]);
    data.forEach(item => {
        test.innerHTML = `${item.name} ID ${item._id}`
      }); 
      for (const i in data) {
           obj = data[i];

          const {_id,name,price,imageUrl,colors} = obj;
          console.log("ID:::",_id,'NAME :::',name,"PRIX :::",price);
          
          test.innerHTML = `ID /// ${_id} name /// ${name},PRIX:::${price},${imageUrl},${colors[0]}`
          
      
      }
      
  })
  .catch(error => {
    // Gestion des erreurs 
    console.log('erreur :',error);
  });
  console.log('SORTIE DE FETCH',obj);








