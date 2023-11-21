
window.addEventListener('load',() => {

  function getSelectedLanguage() {
    const dropdown = document.getElementById("lang");
    const selectedValue = dropdown.options[dropdown.selectedIndex].value;
    return selectedValue;
  };
  
 
  
  
  const getCocktailInfo = cName => {

    const selectedLanguage = getSelectedLanguage();
      axios
        .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cName}`)
        .then(response => {
          console.log(response.data);
          const drinks = response.data.drinks; 
          const cocktailContainer = document.getElementById('cocktail-container');
          cocktailContainer.innerHTML = ''; 
    
          if (!drinks) {
            alert(`No cocktails found for ${cName}.`);
            return;
          }
    
          drinks.forEach(cDetail => {
            const drinkDiv = document.createElement('div');
            drinkDiv.classList.add('cocktail-info');
    
           
            const name = document.createElement('h2');
            name.innerText = cDetail.strDrink;
            drinkDiv.appendChild(name);
    
            const alcoholic = document.createElement('p');
            alcoholic.innerText = `is: ${cDetail.strAlcoholic}`;
            drinkDiv.appendChild(alcoholic);
    
            const image = document.createElement('img');
            image.src = cDetail.strDrinkThumb;
            drinkDiv.appendChild(image);
  
            
            const items = [
              cDetail.strIngredient1, 
              cDetail.strIngredient2, 
              cDetail.strIngredient4,
              cDetail.strIngredient5
            ];
  
            items.forEach((itemText) => {
              const p = document.createElement('p');
              p.innerHTML = itemText;
              drinkDiv.appendChild(p);
            });
  
           if(selectedLanguage === "en") {
            console.log('en selected');
            const instructions = document.createElement('p');
            instructions.innerText = cDetail.strInstructions;
            drinkDiv.appendChild(instructions);
           }else if(selectedLanguage === "it") {
            console.log('it selected');
            const instructions = document.createElement('p');
            instructions.innerText = cDetail.strInstructionsIT;
            drinkDiv.appendChild(instructions);
           }else if(selectedLanguage === "de") {
            console.log('de selected');
            const instructions = document.createElement('p');
            instructions.innerText = cDetail.strInstructionsDE;
            drinkDiv.appendChild(instructions);
           }

            const addToFavoritesButton = document.createElement("button");
            addToFavoritesButton.innerText = "Add to Favorites";
            drinkDiv.appendChild(addToFavoritesButton);
    
            // const instructions = document.createElement('p');
            // instructions.innerText = cDetail.strInstructions;
            // drinkDiv.appendChild(instructions);
    
            cocktailContainer.appendChild(drinkDiv); 
          });
    
          console.log('All cocktail details: ', drinks);  
      })
        .catch(err => {
          console.log(err);
          err.response.status === 404 ? alert(`The cocktail ${cName} doesn't exist.`) : alert('Server error! Sorry.');
        });
    };
    
    document.getElementById('get-c-btn').addEventListener('click', () => {
      const userInput = document.getElementById('c-name-input').value;
      getCocktailInfo(userInput);
    });

});



  

 

  