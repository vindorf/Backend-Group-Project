const express = require('express');
const router = express.Router();
const hbs = require('hbs');
const axios = require('axios');

router.get('/search',(req,res)=> {
    //console.log('hello');
    res.render('user/search', {layout: 'search_layout'}); 
})

router.get('/search', async (req, res) => {
  console.log(req.query['cocktail-input']);
  const cocktailName = req.query['cocktail-input'];
 
    try {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`);
      console.log(response);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Fehler beim Abrufen des Cocktails' });
    }
  });

  router.get('/search-random',(req,res)=> {
    //console.log('hello');
    res.render('user/search-random', {layout: 'search_layout'}); 
})



// router.get("/search", (req, res, next) => {
    
//     res.render('user/search')
//         axios
//           .get(`www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailInput}`)
//           .then(response => {
//             console.log(response.data);
//             const cDetail = response.data.drinks[0];
//             console.log('a single c details: ', cDetail);  
//         })
//           .catch(err => {
//             console.log(err);
//             err.response.status === 404 ? alert(`The cocktail ${cName} doesn't exist.`) : alert('Server error! Sorry.');
//           });
      
    

  
// });

module.exports = router;