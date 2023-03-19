const mongoose = require("mongoose");
const CONFIG = require("../config");

const connectToDb = function(){
    mongoose.connect(`${CONFIG.MONGO_DB_URL}${CONFIG.COLLECTION_NAME}`);
}

module.exports = {connectToDb}