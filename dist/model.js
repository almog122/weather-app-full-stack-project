class Model {
  constructor() {
    this.citiesWeather = [];
    this.LOCALHOST_URL = "http://localhost:3000/weather";
  }

  getCitiesWeather() {
    $.get(`${this.LOCALHOST_URL}`)
      .then((citiesWeatherArr) => {
        citiesWeatherArr.forEach((cityWeather) => {
          this.citiesWeather.push(cityWeather);
        });
        return this.citiesWeatherArr;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getCityWeather(cityName) {
    return $.get(`${this.LOCALHOST_URL}/${cityName}`)
      .then((cityWeather) => {
        this.citiesWeather.push(cityWeather);
        return cityWeather;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  saveCityWeatherData(cityData) {
    let data = { cityData: cityData };

    $.post(`${this.LOCALHOST_URL}`, data).catch((error) => {
      console.log(error);
    });
  }

  deleteCityWeatherData(cityName) {
    $.delete(`${this.LOCALHOST_URL}/${cityName}`).catch((error) => {
      console.log(error);
    });
  }
}
