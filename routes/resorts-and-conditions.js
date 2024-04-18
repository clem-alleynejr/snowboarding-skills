var express = require("express");
var router = express.Router();
const passport = require("passport");

router.get("/", function (req, res, next) {
  res.render("resorts-and-conditions/index", {
    title: 'Resorts and Conditions',
    viewType: 'Resorts and Conditions',
    user: req.user
  });
});

module.exports = router;