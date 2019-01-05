const express = require('express');
var createError = require('http-errors');
const path = require('path');
const bodyParser = require('body-parser');
var app = express();
var http = require('http').createServer(app);
var session = require('express-session');
var cors= require('cors');
var MongoStore = require('connect-mongo')(session);
var { PORT } = require('./setup');
const connect = require('./server/db');
var db = connect();

app.use(cors())
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
// app.set('port', PORT);

const routes = require('./server/routes');
app.use('/api', routes);

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

http.listen(PORT, (req, res) => {
    console.log("Server is running on PORT: ", PORT);
});