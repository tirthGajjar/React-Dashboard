const express = require('express');
var createError = require('http-errors');
const path = require('path');
const bodyParser = require('body-parser');
var app = express();
var http = require('http').createServer(app);
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var { PORT } = require('./setup');
const connect = require('./server/db');
var db = connect();

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require('./server/routes');
app.use('/', routes);
app.get('/dashboard', (req, res) => {
    // res.sendFile(path.join(__dirname,'./build/index.html'));
    res.send('Hello Word')
});

http.listen(PORT, (req, res) => {
    console.log("Server is running on PORT: ", PORT);
});

/*app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next(createError(404));
});*/

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});