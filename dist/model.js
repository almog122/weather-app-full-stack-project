class Model {
  constructor() {
    this.citiesWeather = [];
    this.LOCALHOST_URL = "http://localhost:3000/weather";
  }

  async getCitiesWeather() {
    try {
      const citiesWeatherArr = await $.get(`${this.LOCALHOST_URL}`);
      citiesWeatherArr.forEach((cityWeather) => {
        this.citiesWeather.push(cityWeather);
      });
      return citiesWeatherArr;
    } catch (error) {
      alert(error.responseText);
    }
  }

  async getCityWeather(cityName) {
    try {
      const cityWeather = await $.get(`${this.LOCALHOST_URL}/${cityName}`);
      this.citiesWeather.push(cityWeather);
      return [cityWeather];
    } catch (error) {
      alert(error.responseText);
    }
  }

  saveCityWeatherData(cityData) {
    $.post(`${this.LOCALHOST_URL}`, cityData).catch((error) => {
      console.log(error);
    });
  }

  deleteCityWeatherData(cityName) {
    $.ajax({
      url: `${this.LOCALHOST_URL}/${cityName}`,
      type: "DELETE",
    });
  }
}
