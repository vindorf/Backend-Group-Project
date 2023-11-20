window.addEventListener('load', () => {
    const rdmBtn = document.getElementById('rdm-btn');
  rdmBtn.addEventListener('click', ()=>{

    const rdmContainer = document.getElementById('rdm-container');
     rdmContainer.innerHTML = ''; 
      axios
        .get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
        .then(response => {
          console.log(response.data);
          const cDetail = response.data.drinks[0];
          const h2 = document.createElement('h2');
          h2.innerHTML = cDetail.strDrink;
          rdmContainer.appendChild(h2);
        const p = document.createElement('p');
        p.innerHTML = cDetail.strAlcoholic;
        rdmContainer.appendChild(p);
          const img = document.createElement('img');
          img.setAttribute('src', cDetail.strDrinkThumb);
          rdmContainer.appendChild(img);
          const pInst = document.createElement('p');
          pInst.innerHTML = cDetail.strInstructions;
          rdmContainer.appendChild(pInst);
  
          console.log('a single c details: ', cDetail);  
      })
      
    
  })

});