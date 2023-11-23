const axios = require("axios");
const User = require("../models/User.model");
const apiRoutes = require("express").Router();

apiRoutes.get("/add-to-favorite-list/:drinkID", async (req, res, next) => {
  const { drinkID } = req.params;
  const { currentUser } = req.session;
  try {
    const foundUser = await User.findById(currentUser._id);
    if (!foundUser) {
      res.status(404).send("User not found");
      return;
    }
    foundUser.favourites.push(drinkID);
    await foundUser.save();
  } catch (err) {
    next(err);
  }
});

apiRoutes.get("/favourites", async (req, res, next) => {
  try {
    const { currentUser } = req.session;
    if (!currentUser) {
      res.redirect("/login");
      return;
    }
    const foundUser = await User.findById(currentUser._id).populate(
      "favourites"
    );
    if (!foundUser) {
      res.status(404).send("User not found");
      return;
    }

    const { favourites } = foundUser;
    const endPoints = favourites.map(
      (e) => "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + e
    );

    let result = await axios.all(
      endPoints.map((endpoint) => axios.get(endpoint))
    );
    result = result.map((e) => e.data.drinks);
    result = result.map(([e]) => e);
    // return res.send(result);
    // // console.log("sssssss", result);
    res.render("user/favourites", {
      layout: "search_layout",
      favourites: result,
    });
  } catch (err) {
    next(err);
  }
});

// url/user/posts?limit=40&range=20&sort=az
// url/user/1232342345
module.exports = apiRoutes;

// url/user/posts?limit=40&range=20&sort=az
// url/user/1232342345
module.exports = apiRoutes;
