class Renderer {
  constructor() {
    this.cityWeatherSource = $("#cityWeather-template").html();
    this.cityWeatherContainer = $("#cityWeather-container")
  }

  renderCityWeatherData(data){
    this.cityWeatherSource.empty();
    const template = Handlebars.compile(this.cityWeatherSource);
    const newHTML = template(data);
    this.cityWeatherContainer.append(newHTML);
  }

  renderPagesEmpty(){
    this.pagesContainer.empty();
  }

  renderRecipesPageEmpty(){
    this.recipesContainer.empty();
  }
}