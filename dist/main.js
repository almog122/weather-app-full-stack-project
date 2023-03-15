const renderer = new Renderer();
const model = new Model();

const cityNameInput = $("#cityName-input");

const displayCitiesWeatherPage = function () {
  model.getCitiesWeather().then(function (citiesWeather) {
    renderer.renderCitiesWeatherData(citiesWeather);
  });
};

const displayCityWeatherPage = function () {
  let cityName = cityNameInput.val();

  model.getCityWeather(cityName).then(function (cityWeather) {
    renderer.renderCityWeatherData(cityWeather);
  });
};

const saveCityWeather = function () {
  let parent = $(this).closest(".cityWeather");
  let childrens = parent.children();
  let cityName = childrens[0];
  let conditionPic = childrens[1];
  let condition = childrens[2];
  let temperature = childrens[3];

  let cityData = {
    name: cityName.textContent.trim(),
    temperature: temperature.textContent.trim(),
    condition: condition.textContent.trim(),
    conditionPic: conditionPic.dataset.icon.trim(),
  };

  model.saveCityWeatherData(cityData);
};

const deleteCityWeather = function () {
  let parent = $(this).closest(".cityWeather");
  let childrens = parent.children();
  let cityName = childrens[0].textContent.trim();

  model.deleteCityWeatherData(cityName);
};

displayCitiesWeatherPage();

$("#getCityName").on("click", displayCityWeatherPage);

$("body").on("click", ".saveCity", saveCityWeather);

$("body").on("click", ".deleteCity", deleteCityWeather);
