    var express = require("express"),
        router  = express.Router(),
        passport = require("passport"),
        User     = require("../models/user")
        // middleware = require("../middleware");


    //Root Route
    router.get("/", function(req, res){
        res.render("landing");
    });

    
    //register form route
    router.get("/register", function(req, res){
        res.render("register");
    });
  
    //handle signup logic
    router.post("/register", function(req, res){
        var newUser = new User({username: req.body.username});
        User.register(newUser, req.body.password, function(err, user){
            if(err){
                req.flash("error", err.message);
                return res.render("register");
            }
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "WELCOME " + user.username);
                res.redirect("/campgrounds");
            });
        });
    });
    
    //show login form
    router.get("/login", function(req, res){
        res.render("login");
    });
    
    router.post("/login", passport.authenticate("local", 
        {
            successRedirect: "/campgrounds", 
            failureRedirect: "/login"
        }), function(req, res){
    });
    
    //logout route
    router.get("/logout", function(req, res){
        req.logout();
        req.flash("success", "Logged Out Successfully !");
        res.redirect("/campgrounds");
    });

    module.exports = router;