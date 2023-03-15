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

  async getCityWeatherByName(cityName) {
    try {
      const cityWeather = await $.get(`${this.LOCALHOST_URL}/${cityName}`);
      this.citiesWeather.push(cityWeather);
      return [cityWeather];
    } catch (error) {
      alert(error.responseText);
    }
  }

  async getCityWeatherByGeo(lat,lon) {
    try {
      const cityWeather = await $.get(`${this.LOCALHOST_URL}/${lat}/${lon}`);
      this.citiesWeather.push(cityWeather);
      return [cityWeather];
    } catch (error) {
      alert(error.responseText);
    }
  }

  saveCityWeatherData(cityData) {
    $.post(`${this.LOCALHOST_URL}`, cityData).catch((error) => {
      alert(error.responseText);
    })
  }

  deleteCityWeatherData(cityName) {
    $.ajax({
      url: `${this.LOCALHOST_URL}/${cityName}`,
      type: "DELETE",
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown.responseText);
     }
    });
  }
}
