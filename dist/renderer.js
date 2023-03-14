class Renderer {
  constructor() {
    this.citiesWeatherSource = $("#citiesWeather-template").html();
    this.citiesWeatherContainer = $("#citiesWeather-container")

    this.cityWeatherSource = $("#cityWeather-template").html();
  }

  renderCitiesWeatherData(data){
    this.citiesWeatherContainer.empty();
    const template = Handlebars.compile(this.citiesWeatherSource);
    const newHTML = template(data);
    this.citiesWeatherContainer.append(newHTML);
  }

  renderCityWeatherData(data){
    const template = Handlebars.compile(this.cityWeatherSource);
    const newHTML = template(data);
    this.citiesWeatherContainer.append(newHTML);
  }

  renderPagesEmpty(){
    this.pagesContainer.empty();
  }

  renderRecipesPageEmpty(){
    this.recipesContainer.empty();
  }
}