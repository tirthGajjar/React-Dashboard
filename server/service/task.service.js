const Task = require('../model/task.model');

exports.addTask = async task => await Task.create(task);