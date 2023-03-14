const express = require("express");
const axios = require("axios");
const Weather = require("../model/WeatherModel");

const router = express.Router();
const API_KEY = "&appid=4cf10d1fa75b8b4135e60eba24753eb6";
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=`;
const UNIT = "&units=metric";

router.get("/weather/:cityName", function (req, res) {
  let cityName = req.params.cityName;

  axios
    .get(`${WEATHER_URL}${cityName}${API_KEY}${UNIT}`)
    .then(function (weather) {

      let cityData = weather.data

      let cityWeather = {
        name: cityName,
        temperature: cityData.main.temp,
        condition: cityData.weather[0].description,
        conditionPic: cityData.weather[0].icon,
      };

      res.send(cityWeather);
    });
});

router.get("/weather", function (req, res) {
  Weather.find({}).then(function (weathers) {
    res.send(weathers);
  });
});

router.post("/weather", function (req, res) {
  let cityData = req.query.cityData;

  let cityWeather = new Weather({
    name: cityData.name,
    temperature: cityData.temperature,
    condition: cityData.condition,
    conditionPic: cityData.conditionPic,
  });

  cityWeather.save()

  res.end();
});

router.delete("/weather/:cityName", function (req, res) {
  let cityName = req.params.cityName;

  Weather.deleteOne({ name: cityName }).then((deleted) => {
    if (deleted.deletedCount == 1) {
      res.send(`deleted ${cityName} from DB`);
    } else {
      res.send(`couldn't deleted ${cityName} from DB`);
    }
  });
});

module.exports = router;
