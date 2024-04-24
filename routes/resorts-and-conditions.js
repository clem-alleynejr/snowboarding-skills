var express = require("express");
var router = express.Router();
const passport = require("passport");

router.get("/", function (req, res, next) {
  
  // const resort = req.query.resort;
  
  const url = 'https://ski-resorts-and-conditions.p.rapidapi.com/v1/resort';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4e1e820731msh235cf838225aa6dp1dc113jsn8dd04336584a',
      'X-RapidAPI-Host': 'ski-resorts-and-conditions.p.rapidapi.com'
    }
  };
  
  fetch(url, options)
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })

  res.render("resorts-and-conditions/index", {
    title: 'Resorts and Conditions',
    viewType: 'Resorts and Conditions',
    user: req.user
  });
});

module.exports = router;