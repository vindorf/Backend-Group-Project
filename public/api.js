window.addEventListener("load", () => {
  function getSelectedLanguage() {
    const dropdown = document.getElementById("lang");
    const selectedValue = dropdown.options[dropdown.selectedIndex].value;
    return selectedValue;
  }

  const getCocktailInfo = (cName) => {
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
            cDetail.strIngredient5,
          ];

          items.forEach((itemText) => {
            const p = document.createElement("p");
            p.innerHTML = itemText;
            drinkDiv.appendChild(p);
          });

        

          if (selectedLanguage === "en") {
            console.log("en selected");
            const instructions = document.createElement("p");
            instructions.innerText = cDetail.strInstructions;
            drinkDiv.appendChild(instructions);
          } else if (selectedLanguage === "it") {
            console.log("it selected");
            const instructions = document.createElement("p");
            instructions.innerText = cDetail.strInstructionsIT;
            drinkDiv.appendChild(instructions);
          } else if (selectedLanguage === "de") {
            console.log("de selected");
            const instructions = document.createElement("p");
            instructions.innerText = cDetail.strInstructionsDE;
            drinkDiv.appendChild(instructions);
          }

          const addToFavoritesForm = document.createElement("form");
          addToFavoritesForm.action = `/add-to-favorite-list/${cDetail.idDrink}`;
          addToFavoritesForm.method = "post";
          const idInput = document.createElement("input");
          idInput.type = "hidden";
          idInput.name = "id";
          idInput.value = cDetail.idDrink;
          addToFavoritesForm.appendChild(idInput);
          const heartButton = document.createElement("button");
          heartButton.type = "submit";
          heartButton.innerText = "❤️ Add to favourites ❤️";
          addToFavoritesForm.appendChild(heartButton);
          const addToFavoritesDiv = document.createElement("div");
          addToFavoritesDiv.appendChild(addToFavoritesForm);

          heartButton.addEventListener("click", (req, res) => {
            heartButton.disabled = true;
            heartButton.style.backgroundColor = "gray";
            heartButton.innerHTML = " 🚀 Added to favourites 🚀";
            // console.log(req.session.currentUser._id);
            fetch(`/api/add-to-favorite-list/${cDetail.idDrink}`)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                console.log("ID stored successfully!");
              })
              .catch((error) => {
                console.error("Error storing ID:", error);
              });
          });

          drinkDiv.appendChild(addToFavoritesDiv);

          /* <div>
  <form action='/add-to-favorite-list/{{this.id}}' method='post'>
            <input type='hidden' name='id' value='{{this.id}}' />
            <input type='hidden' name='title' value='{{this.title}}' />
            <input type='hidden' name='posterPath' value='{{this.poster_path}}' />
            <button type='submit'> HEART</button>
          </form>
</div> */

          // const instructions = document.createElement('p');
          // instructions.innerText = cDetail.strInstructions;
          // drinkDiv.appendChild(instructions);

          cocktailContainer.appendChild(drinkDiv);
        });

        console.log("All cocktail details: ", drinks);
      })
      .catch((err) => {
        console.log(err);
        err.response.status === 404
          ? alert(`The cocktail ${cName} doesn't exist.`)
          : alert("Server error! Sorry.");
      });
  };

  document.getElementById("get-c-btn").addEventListener("click", () => {
    const userInput = document.getElementById("c-name-input").value;
    getCocktailInfo(userInput);
  });
});
