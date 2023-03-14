class Model {
  constructor() {
    this.citiesWeather = [];
    this.LOCALHOST_URL = "http://localhost:3000/weather";
  }

  getCitiesWeather() {
    $.get(`${LOCALHOST_URL}`)
      .then((citiesWeatherArr) => {
        citiesWeatherArr.forEach((cityWeather) => {
          this.citiesWeather.push(cityWeather);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getCitiesWeather(cityName) {
    $.get(`${LOCALHOST_URL}/${cityName}`)
      .then((cityWeather) => {
        this.citiesWeather.push(cityWeather);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  saveCityWeatherData(cityData) {
    let data = { cityData: cityData };

    $.post(`${LOCALHOST_URL}`, data).catch((error) => {
      console.log(error);
    });
  }

  deleteCityWeatherData(cityName) {
    $.delete(`${LOCALHOST_URL}/${cityName}`).catch((error) => {
      console.log(error);
    });
  }
}
