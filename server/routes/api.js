const express = require("express");
const axios = require("axios");
const Weather = require("../model/weather-model");
const cityWeatherUtil = require("../utilities/city-weather-util");

const router = express.Router();
const API_KEY = "&appid=4cf10d1fa75b8b4135e60eba24753eb6";
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?`;
const UNIT = "&units=metric";

router.get("/weather/:cityName", function (req, res) {
  let cityName = req.params.cityName;

  axios
    .get(`${WEATHER_URL}q=${cityName}${API_KEY}${UNIT}`)
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
    .get(`${WEATHER_URL}lat=${latitude}&lon=${longitude}${API_KEY}${UNIT}`)
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

  Weather.deleteOne({ name: cityName }).then((deleted) => {
    if (deleted.deletedCount == 1) {
      res.send(`deleted ${cityName} from DB`);
    } else {
      res.status(400).send(`couldn't deleted ${cityName} from DB`);
    }
  });
});

module.exports = router;
