var express = require("express");
var router = express.Router();
const passport = require("passport");

router.get("/", async function (req, res, next) {
  
  const searchedResort = encodeURIComponent(req.query.searchedResort);

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4e1e820731msh235cf838225aa6dp1dc113jsn8dd04336584a',
      'X-RapidAPI-Host': 'ski-resort-forecast.p.rapidapi.com'
    }
  };


  try {
    const fiveDayForecastRes = await fetch(`https://ski-resort-forecast.p.rapidapi.com/${searchedResort}/forecast?units=i&el=top`, options);
    const hourlyForecastRes = await fetch(`https://ski-resort-forecast.p.rapidapi.com/${searchedResort}/hourly?units=i&el=top&c=false`, options);
    const snowConditionsRes = await fetch(`https://ski-resort-forecast.p.rapidapi.com/${searchedResort}/snowConditions?units=i`, options);

    const fiveDayForecast = await fiveDayForecastRes.json();
    const hourlyForecast = await hourlyForecastRes.json();
    const snowConditions = await snowConditionsRes.json();

    console.log(fiveDayForecast, hourlyForecast, snowConditions);

    res.render("resorts-and-conditions/index", {
      title: 'Resorts and Conditions',
      viewType: 'Resorts and Conditions',
      user: req.user,
      fiveDayForecast,
      hourlyForecast,
      snowConditions
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    // Render an error page or handle the error appropriately
    res.render("error", { error });
  }
});

module.exports = router;