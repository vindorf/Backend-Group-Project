const User = require("../models/User.model");
const mongoose = require("mongoose");

/* app.post("/add-to-favorites", async (req, res) => {
  try {
    const { userId, cocktailId } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: cocktailId } },
      { new: true }
    );

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}); */

// favorites.js

document.addEventListener("click", async (event) => {
  const target = event.target;
  console.log(target);

  if (target.classList.contains("fvt-cocktail")) {
    const cocktailId = target.dataset.cocktailId;

    try {
      console.log(response.data.user._id);
      target.innerText = "Added to Favorites";
      target.disabled = true;
    } catch (error) {
      console.error(error);
    }
  }
});

/* User.findByIdAndUpdate(
      userId,
      { $set: { imageURL: req.file.path } },
      { new: true }
    ).then((update) => {
      console.log(update);

      req.session.currentUser.imageURL = req.file.path;
      res.redirect("/userProfile"); // or use res.render if redirecting is not desired
    });
  }
);

module.exports = router;
 */
