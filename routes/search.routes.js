const express = require('express');
const router = express.Router();
const hbs = require('hbs');
const axios = require('axios');

router.get('/search',(req,res)=> {
    //console.log('hello');
    res.render('user/search', {layout: 'search_layout'}); 
})



  router.get('/search-random',(req,res)=> {
    //console.log('hello');
    res.render('user/search-random', {layout: 'search_layout'}); 
})





module.exports = router;