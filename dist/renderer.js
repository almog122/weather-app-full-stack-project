class Renderer {
  constructor() {
    this.citiesWeatherSource = $("#citiesWeather-template").html();
    this.cityRefreshWeatherSource = $("#cityRefreshWeather-template").html();
    this.citiesWeatherContainer = $("#citiesWeather-container")
    this.myCityWeatherContainer = $("#myCityWeather-container")
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

  renderMyCityWeatherData(data){
    const template = Handlebars.compile(this.citiesWeatherSource);
    const newHTML = template(data);
    this.myCityWeatherContainer.append(newHTML);
  }

  renderRefreshCityWeatherData(cityWeatherContainer, data){
    cityWeatherContainer.empty();
    const template = Handlebars.compile(this.cityRefreshWeatherSource);
    const newHTML = template(data);
    cityWeatherContainer.append(newHTML);
  }

  renderPagesEmpty(){
    this.citiesWeatherContainer.empty();
  }

}