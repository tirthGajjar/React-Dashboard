const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const JobSchema = new Schema({
  name: String,
});

module.exports = mongoose.model('Job', JobSchema);