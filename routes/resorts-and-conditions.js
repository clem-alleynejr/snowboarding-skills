var express = require("express");
var router = express.Router();
const passport = require("passport");

router.get("/", async function (req, res, next) {
  
  const resort = req.query.searchedResort;
  const searchedResort = encodeURIComponent(req.query.searchedResort);
  
  // when resort page initially loaded (i.e not a search)
  if (!req.query.searchedResort) {
    console.log(searchedResort);
    res.render("resorts-and-conditions/index", {
      title: 'Resorts and Conditions',
      viewType: 'Resorts and Conditions',
      user: req.user
    });
  } 

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'ski-resort-forecast.p.rapidapi.com'
    }
  };
  
  
  try {
    const fiveDayForecastRes = await fetch(`https://ski-resort-forecast.p.rapidapi.com/${searchedResort}/forecast?units=m&el=top`, options);
    const hourlyForecastRes = await fetch(`https://ski-resort-forecast.p.rapidapi.com/${searchedResort}/hourly?units=m&el=top&c=false`, options);
    const snowConditionsRes = await fetch(`https://ski-resort-forecast.p.rapidapi.com/${searchedResort}/snowConditions?units=m`, options);


    const fiveDayForecast = await fiveDayForecastRes.json();
    const hourlyForecast = await hourlyForecastRes.json();
    const snowConditions = await snowConditionsRes.json();

    const resortTitle = hourlyForecast.basicInfo.name;

    res.render("resorts-and-conditions/index", {
      title: 'Resorts and Conditions',
      viewType: 'Resorts and Conditions',
      user: req.user,
      fiveDayForecast,
      hourlyForecast,
      snowConditions,
      resortTitle,
      resort
    });


  } catch (error) {
    console.error('Error fetching data:', error);
    // Render an error page or handle the error appropriately
    res.render("error", { error });
  }
  
});

module.exports = router;