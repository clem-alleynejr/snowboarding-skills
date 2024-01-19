var express = require("express");
var router = express.Router();
const passport = require("passport");

router.get("/", function (req, res, next) {
  res.render("sample-skills-progression/index", {
    title: 'Sample Skills/Progression',
    viewType: 'Sample Skills/Progression',
    user: req.user,
  });
});

module.exports = router;
