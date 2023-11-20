const getCocktailInfo = cName => {
    axios
      .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cName}`)
      .then(response => {
        console.log(response.data);
        const drinks = response.data.drinks; // Alle Drinks in einer Variable speichern
        const cocktailContainer = document.getElementById('cocktail-container');
        cocktailContainer.innerHTML = ''; // Container leeren, um neue Ergebnisse anzuzeigen
  
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
  
          const instructions = document.createElement('p');
          instructions.innerText = cDetail.strInstructions;
          drinkDiv.appendChild(instructions);
  
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
  