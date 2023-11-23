const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", { layout: "start_layout" });
});

router.get("/index2", (req, res) => res.render("index2"));

module.exports = router;
