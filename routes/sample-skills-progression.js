var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/sample-skills-progression', function (req, res, next) {
    res.render('sample-skills-progression/index', {
      viewType: 'Sample Skills/Progression',
      user: req.user
    });
  });

  module.exports = router;