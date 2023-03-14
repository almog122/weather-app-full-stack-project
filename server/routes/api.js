const express = require("express");
const axios = require("axios");
const Weather = require("../model/WeatherModel");

const router = express.Router();
const API_KEY = "&appid=4cf10d1fa75b8b4135e60eba24753eb6"
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=`;


router.get("/weather/:cityName", function (req, res) {
  let cityName = req.params.cityName;

  axios.get(`${WEATHER_URL}${cityName}${API_KEY}`)
    .then(function (response) {
      res.send(response.data);
    })
});

module.exports = router;