var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { MONGODB_URI } = require('../../setup');

function connect() {
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true, uri_decode_auth: true });

  mongoose.connection.on("open", function () {
    console.log("MongoDB connection opened");
  });
  mongoose.connection.on("error", function (a, b) {
    console.log("Error connecting to MongoDB");
  });
  mongoose.connection.on("disconnected", function () {
    console.log("Disconnected from MongoDB");
  });
  mongoose.connection.on("reconnected", function () {
    console.log("Re-connected to MongoDB");
  });
}

module.exports = connect;