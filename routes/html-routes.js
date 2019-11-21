var path = require("path");
//
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
//
module.exports = function(app) {
//
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
//
  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
//
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be 
  //redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/sleep/:username", isAuthenticated, function(req, res) {
    if (req.user) {
        console.log("username is " + req.user.username)
        res.redirect("/sleep.html");
      }
      res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/eat", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/eat.html"));
  });

  app.get("/vitals", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/vitals.html"));
  });
};