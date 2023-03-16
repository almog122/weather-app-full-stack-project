const renderer = new Renderer();
const model = new Model();

const cityNameInput = $("#cityName-input");

const displayCitiesWeatherPage = function () {
  navigator.geolocation.getCurrentPosition((location) => {
    model
      .getCityWeatherByGeo(location.coords.latitude, location.coords.longitude)
      .then(function (cityWeather) {
        renderer.renderMyCityWeatherData(cityWeather);
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
      renderer.renderCityWeatherData(cityWeather);
    });
  }
};

const saveCityWeather = function () {
  let parent = $(this).closest(".cityWeather");
  let childrens = parent.children();
  let cityName = childrens[0].textContent.trim();
  let conditionPic = childrens[1].dataset.icon;
  let condition = childrens[2].textContent.trim();
  let temperature = childrens[3].textContent.trim();;
  let date = childrens[4].textContent.trim();

  let cityData = {
    name: cityName,
    temperature: temperature,
    condition: condition,
    conditionPic: conditionPic,
    date: date,
  };

  model.saveCityWeatherData(cityData).then((cityWeather) => {
    renderer.renderRefreshCityWeatherData(parent, cityWeather);
  });
};

const deleteCityWeather = function () {
  let parent = $(this).closest(".cityWeather");
  let childrens = parent.children();
  let cityName = childrens[0].textContent.trim();
  let conditionPic = childrens[1].dataset.icon;
  let condition = childrens[2].textContent.trim();
  let temperature = childrens[3].textContent.trim();;
  let date = childrens[4].textContent.trim();

  let cityData = {
    name: cityName,
    temperature: temperature,
    condition: condition,
    conditionPic: conditionPic,
    date: date,
  };

  model.deleteCityWeatherData(cityName).then((isDeleted) => {
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
