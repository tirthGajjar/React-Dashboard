var express = require('express');
var router = express.Router();

var taskController = require('../controller/task.controller');

router.post('/post', taskController.addTask);
router.get('/getAllClientDetails', () => { console.log('GET ---- ') });

module.exports = router;