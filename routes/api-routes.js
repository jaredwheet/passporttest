// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
//
module.exports = function (app) {
    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
        // So we're sending the user back the route to the members page because the redirect will happen on the front end
        // They won't get this or even be able to access this page if they aren't authed
        res.json("/members");
    });
    //
    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", function (req, res) {
        console.log(req.body);
        db.User.create({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            babysName: req.body.babysName,
            babysBirthday: req.body.babysBirthday
        }).then(function () {
            res.redirect(307, "/api/login");
        }).catch(function (err) {
            console.log(err);
            res.json(err);
            // res.status(422).json(err.errors[0].message);
        });
    });
    //
    // Route for logging user out
    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });
    //
    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function (req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        }
        else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                username: req.user.username,
                email: req.user.email,
                id: req.user.id
            });
        }
    });

    app.post("/api/eatingData", function (req, res) {
        // req.body is available since we're using the body parsing middleware    
        // eatingArray.push(req.body);
        // res.json(true); 
        console.log(req.body);
        db.Eat.create({
            timeStart: req.body.timeStart,
            timeEnd: req.body.timeEnd,
            date: req.body.date,
            duration: req.body.duration,
            username: req.body.username
        })
            .then(function (dbEat) {
                res.json(dbEat);
            });

    });
    app.post("/api/sleepData", function (req, res) { 
        console.log(req.body);
        console.log(req.body.duration)
        db.Sleep.create({
            timeStart: req.body.timeStart,
            timeEnd: req.body.timeEnd,
            date: req.body.date,
            duration: req.body.duration,
            username: req.body.username
        })
            .then(function (dbSleep) {
                res.json(dbSleep);
            });
    });
    app.post("/api/vitalsData", function (req, res) {
        // // req.body is available since we're using the body parsing middleware    
        //   vitalsArray.push(req.body);
        //   res.json(true);   
        console.log(req.body);
        db.Vitals.create({
            time: req.body.timestamp,
            height: req.body.height,
            weight: req.body.weight,
            graphDate: req.body.graphDate,
            username: req.body.username
        })
            .then(function (dbSleep) {
                res.json(dbSleep);
            });
    })
    app.get("/api/sleepData/:username", function (req, res) {
        var username = req.params.username
        console.log("Username " + username)
        db.Sleep.findAll({
            where: {
                username: username
            }
        })
            .then(function (dbSleep) {
                res.json(dbSleep);
            });
    });


    app.get("/api/eatingData", function (req, res) {
        db.Eat.findAll({})
            .then(function (dbEat) {
                res.json(dbEat);
            });
    });

    app.get("/api/eatingData/:username", function (req, res) {
        var username = req.params.username
        console.log("Username " + username)
        db.Eat.findAll({
            where: {
                username: username
            }
        })
            .then(function (dbEat) {
                res.json(dbEat);
            });
    });

    app.get("/api/vitalsData", function (req, res) {
        db.Vitals.findAll({})
            .then(function (dbVitals) {
                res.json(dbVitals);
            });
    });

    app.get("/api/vitalsData/:username", function (req, res) {
        var username = req.params.username
        console.log("Username " + username)
        db.Vitals.findAll({
            where: {
                username: username
            }
        })
            .then(function (dbVitals) {
                res.json(dbVitals);
            });
    });
};