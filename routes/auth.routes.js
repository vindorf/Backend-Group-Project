const { Router } = require("express");
const router = new Router();
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const User = require("../models/User.model");
const mongoose = require("mongoose");
const { isLoggedIn, isIn, isLoggedOut } = require("../middleware/route-guard.js");
const fileUploader = require("../config/cloudinary.config");

router.get("/signup",  isIn,(req, res) => res.render("auth/signup"));
// hier war isLoggedOut
router.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) {
      console.log("user already exist");
      res.render("auth/signup", { errorMessage: "user already exist" });
      return;
    }
  });

  if (!username || !email || !password) {
    res.render("auth/signup", {
      errorMessage:
        "All fields are mandatory. Please provide your username, email and password.",
    });
    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(500).render("auth/signup", {
      errorMessage:
        "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      console.log(`Password hash: ${hashedPassword}`);
      return User.create({ username, email, password: hashedPassword });
    })
    .then((dataDB) => {
      //console.log("Newly created user is: ", dataDB);
      //res.status(201).send('User created successfully');
      res.redirect("/userProfile");
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/signup", { errorMessage: error.message });
      } else if (error.code === 11000) {
        console.log(
          " Username and email need to be unique. Either username or email is already used. "
        );

        res.status(500).render("auth/signup", {
          errorMessage: "User not found and/or incorrect password.",
        });
      } else {
        next(error);
      }
    });
});

router.get("/login", isIn, (req, res) => res.render("auth/login"));
// isLoggedOut
router.post("/login", (req, res, next) => {
  console.log("SESSION =====> ", req.session);
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.render("auth/login", {
      errorMessage: "Please enter both, email and password to login.",
    });
    return;
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        console.log("Email not registered. ");
        res.render("auth/login", {
          errorMessage: "User not found and/or incorrect password.",
        });
        return;
      } else if (bcryptjs.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.redirect("/userProfile");

        //res.render("user/user-profile", { user });
      } else {
        console.log("Incorrect password. ");
        res.render("auth/login", {
          errorMessage: "User not found and/or incorrect password.",
        });
      }
    })
    .catch((error) => next(error));
});

router.post("/logout", isLoggedIn, (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/");
  });
});

router.get("/userProfile", isLoggedIn, (req, res) => {
  //return res.send("Hello world!");

  res.render("user/user-profile", { userInSession: req.session.currentUser });
});

router.post(
  "/userProfile",
  fileUploader.single("user-prof-image"),
  (req, res) => {
    const userId = req.session.currentUser._id;
    console.log("1 =>", req.session.currentUser.imageURL);
    console.log("2 =>", req.file.path);
    User.findByIdAndUpdate(
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

router.post("/account-delete", (req, res) => {
  const userId = req.session.currentUser._id;

  User.deleteOne({ _id: userId })
    .then(() => {
      req.session.destroy((err) => {
        if (err) next(err);
        res.redirect("/");
      });
    })
    .catch(() => {
      console.log("blabla");
    });
});

module.exports = router;
