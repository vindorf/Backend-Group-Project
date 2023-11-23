const { Schema, model } = require("mongoose");

const favouriteSchema = new Schema({
  favourites: [],
});

const Favourites = model("Favourites", userSchema);

module.exports = Favourites;
