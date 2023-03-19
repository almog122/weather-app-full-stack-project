const express = require("express");
const axios = require("axios");
const Weather = require("../model/weather-model");
const cityWeatherUtil = require("../utilities/city-weather-util");
const CONFIG = require("../config");

const router = express.Router();

router.get("/weather/:cityName", function (req, res) {
  let cityName = req.params.cityName;

  axios
    .get(`${CONFIG.WEATHER_URL}q=${cityName}${CONFIG.API_KEY}${CONFIG.UNIT}`)
    .then(function (weather) {
      let cityWeather = cityWeatherUtil.getCityData(weather);
      res.send(cityWeather);
    })
    .catch(function (error) {
      res.status(404).send(`couldn't find ${cityName} in weather API`);
    });
});

router.get("/weather/:lat/:lon", function (req, res) {
  let latitude = req.params.lat;
  let longitude = req.params.lon;

  axios
    .get(`${CONFIG.WEATHER_URL}lat=${latitude}&lon=${longitude}${CONFIG.API_KEY}${CONFIG.UNIT}`)
    .then(function (weather) {
      let cityWeather = cityWeatherUtil.getCityData(weather);
      res.send(cityWeather);
    })
    .catch(function (error) {
      res
        .status(404)
        .send(`couldn't find latitude:${latitude} and longitude: ${longitude} in weather API`);
    });
});

router.get("/weather", function (req, res) {
  Weather.find({}).then(function (weathers) {
    res.send(weathers);
  })
  .catch(function (err) {
    res.status(500).send('Internal Server Error');
  });
});

router.post("/weather", function (req, res) {
  let cityData = req.body;

  let cityWeather = cityWeatherUtil.getCityDataSchema(cityData);

  cityWeather
    .save()
    .then((savedCityWeather) => {
      res.status(201).send(savedCityWeather);
    })
    .catch((error) => {
      res.status(400).send(`couldn't save ${cityWeather.name}`);
    });
});

router.delete("/weather/:cityName", function (req, res) {
  let cityName = req.params.cityName;
  let date = req.body.date;

  Weather.deleteOne({ name: cityName  , date : date}).then((deleted) => {
    if (deleted.deletedCount == 1) {
      res.send(`deleted ${cityName} from DB`);
    } else {
      res.status(400).send(`couldn't deleted ${cityName} from DB`);
    }
  })
  .catch(function (err) {
    res.status(500).send('Internal Server Error')
  });
});

module.exports = router;
