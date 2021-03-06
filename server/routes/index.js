var express = require('express');
var router = express.Router();
var taskController = require('../controller/task.controller');
var User = require('../model/user.model');


router.post('/post', (req, res, next) => {
    const data = req.body;
    console.log('data: ', data);
    res.status(200).send({ status:true, response: data });
});

router.get('/verifyIsAdmin', () => {
    console.log('GET ---- ')
});

router.post('/login', function (req, res, next) {
    let userName = req.body.userName;
    let email = req.body.email;
    let password = req.body.password;
    if(userName && email && password){
        User.authenticate(email, password, function (error, user) {
            if (error || !user) {
                res.status(200).send({ status:false, response: [] , msg: 'Wrong email or password.' });
            } else {
                // req.session.userId = user._id;
                // return res.redirect('/profile');
                res.status(200).send({ status:true, response: 'Suceess' });
            }
        });
    } else {
        res.status(200).send({ status:false, response: [] , msg: 'Please enter Valid First Name, Email or Password' });
    }
});

//POST route for updating data
router.post('/', function (req, res, next) {
    // confirm that user typed same password twice
    if (req.body.password !== req.body.passwordConf) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        res.send("passwords dont match");
        return next(err);
    }

    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {

        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordConf,
        }

        User.create(userData, function (error, user) {
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });

    } else if (req.body.logemail && req.body.logpassword) {
        User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
})

// GET route after registering
router.get('/profile', function (req, res, next) {
    User.findById(req.session.userId)
        .exec(function (error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    var err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    return next(err);
                } else {
                    return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
                }
            }
        });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

module.exports = router;