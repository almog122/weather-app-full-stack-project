const renderer = new Renderer();
const model = new Model();

const cityNameInput = $("#cityName-input");

const displayCitiesWeatherPage = function () {
  navigator.geolocation.getCurrentPosition((location) => {
    model
      .getCityWeatherByGeo(location.coords.latitude, location.coords.longitude)
      .then(function (cityWeather) {
        if(cityWeather){
          renderer.renderGeoCityWeatherData(cityWeather);
        }
      });
  });

  model.getCitiesWeather().then(function (citiesWeather) {
    renderer.renderCitiesWeatherData(citiesWeather);
  });
};

const displayCityWeather = function () {
  let cityName = cityNameInput.val();

  if (cityName != "") {
    model.getCityWeatherByName(cityName).then(function (cityWeather) {
      if(cityWeather){
        renderer.renderCityWeatherData(cityWeather);
      }
    });
  }
};

const saveCityWeather = function () {
  let parent = $(this).closest(".cityWeather");

  let cityData = model.getAndMapDataFromCityWeather(parent)

  model.saveCityWeatherData(cityData).then((savedCityWeather) => {
    if(savedCityWeather){
      renderer.renderRefreshCityWeatherData(parent, savedCityWeather);
    }
  });
};

const deleteCityWeather = function () {
  let parent = $(this).closest(".cityWeather");

  let cityData = model.getAndMapDataFromCityWeather(parent)

  model.deleteCityWeatherData(cityData.name).then((isDeleted) => {
    if (isDeleted) {
      renderer.renderRefreshCityWeatherData(parent, cityData);
    }
  });
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
