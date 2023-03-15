Handlebars.registerHelper("correctSrcIcon", function (conditionPic) {
    return `http://openweathermap.org/img/w/${conditionPic}.png`
});