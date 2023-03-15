class Renderer {
  constructor() {
    this.citiesWeatherSource = $("#citiesWeather-template").html();
    this.citiesWeatherContainer = $("#citiesWeather-container")
  }

  renderCitiesWeatherData(data){
    this.citiesWeatherContainer.empty();
    const template = Handlebars.compile(this.citiesWeatherSource);
    const newHTML = template(data);
    this.citiesWeatherContainer.append(newHTML);
  }

  renderCityWeatherData(data){
    const template = Handlebars.compile(this.citiesWeatherSource);
    const newHTML = template(data);
    this.citiesWeatherContainer.append(newHTML);
  }

  renderPagesEmpty(){
    this.citiesWeatherContainer.empty();
  }

}