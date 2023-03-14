const renderer = new Renderer();
const model = new Model();

const cityNameInput = $("#cityName-input");

const renderCitiesWeatherPage = function () {
  let citiesWeather = model.getCitiesWeather()
  renderer.renderCitiesWeatherData(citiesWeather)
};

const renderCityWeatherPage = function () {
  let cityName = cityNameInput.val();
  //need to add asynchrounously
  model.getCityWeather(cityName).then(function (cityWeather) {
    renderer.renderCityWeatherData(cityWeather)
  })
};

renderCitiesWeatherPage()

$('#getCityName').on('click', renderCityWeatherPage);

// $("body").on("click", "img", firstIngredientAlert);
