const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const weatherSchema = new Schema({
  name: { type: String, required: true },
  temperature: Number,
  condition: String,
  conditionPic: String,
  date : { type: String, default: moment().locale('en-il').format('LLL') }
});

const Weather = mongoose.model("Weather", weatherSchema);
module.exports = Weather;