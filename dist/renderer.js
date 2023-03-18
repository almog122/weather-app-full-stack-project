class Renderer {
  constructor() {
    this.citiesWeatherSource = $("#citiesWeather-template").html();

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
    const newHTML = template([data]);
    this.citiesWeatherContainer.append(newHTML);
  }

  renderGeoCityWeatherData(data){
    this.myCityWeatherContainer.empty();
    const template = Handlebars.compile(this.citiesWeatherSource);
    const newHTML = template([data]);
    this.myCityWeatherContainer.append(newHTML);
  }

  renderRefreshCityWeatherData(cityWeatherContainer, data){
    cityWeatherContainer.empty();
    const template = Handlebars.compile(this.citiesWeatherSource);
    data['isRefreshData'] = true;
    const newHTML = template([data]);
    cityWeatherContainer.append(newHTML);
  }

  renderPagesEmpty(){
    this.citiesWeatherContainer.empty();
  }

}