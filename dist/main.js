const renderer = new Renderer();
const model = new Model();

const cityNameInput = $("#cityName-input");

const displayCitiesWeatherPage = function () {

  navigator.geolocation.getCurrentPosition((location) =>{
    model.getCityWeatherByGeo(location.coords.latitude , location.coords.longitude ).then(function (cityWeather) {
      renderer.renderMyCityWeatherData(cityWeather);
    });
  })

  model.getCitiesWeather().then(function (citiesWeather) {
    renderer.renderCitiesWeatherData(citiesWeather);
  });
};

const displayCityWeather = function () {
  let cityName = cityNameInput.val();

  if(cityName != ""){
    model.getCityWeatherByName(cityName).then(function (cityWeather) {
      renderer.renderCityWeatherData(cityWeather);
    });
  }
};

const saveCityWeather = function () {
  let parent = $(this).closest(".cityWeather");
  let childrens = parent.children();
  let cityName = childrens[0];
  let conditionPic = childrens[1];
  let condition = childrens[2];
  let temperature = childrens[3];
  let date = childrens[4];

  let cityData = {
    name: cityName.textContent.trim(),
    temperature: temperature.textContent.trim(),
    condition: condition.textContent.trim(),
    conditionPic: conditionPic.dataset.icon.trim(),
    date : date.textContent.trim()
  };

  model.saveCityWeatherData(cityData);
};

const deleteCityWeather = function () {
  let parent = $(this).closest(".cityWeather");
  let childrens = parent.children();
  let cityName = childrens[0].textContent.trim();

  model.deleteCityWeatherData(cityName);
};

const refreshCityWeather = function () {
  let parent = $(this).closest(".cityWeather");
  let cityName = parent.children()[0].textContent.trim();

  model.getCityWeatherByName(cityName).then((cityWeather) => {
    renderer.renderRefreshCityWeatherData(parent, cityWeather);
  });
};

displayCitiesWeatherPage();

$(".buttonCityName").on("click", displayCityWeather);

$("body").on("click", ".saveCity", saveCityWeather);

$("body").on("click", ".deleteCity", deleteCityWeather);

$("body").on("click", ".refreshCity", refreshCityWeather);
