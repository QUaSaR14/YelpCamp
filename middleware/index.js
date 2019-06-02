var Campground  = require("../models/campgrounds"),
    Comment     = require("../models/comment");



//all middleware goes here
var middlewareObj = {}; 

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    req.flash("error", "PLEASE Login to continue !");
    res.redirect("/login");
};

middlewareObj.checkCampgroundOwnerShip = function(req, res, next){
    //is user logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCamp){
            if(err){
                req.flash("error", "Campground NOt FOUND !!!");
                req.redirect("back");
            } else {
                //does user owns campground?
                if(foundCamp.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise redirect   
                    req.flash("error", "PERMISSON DENIED !!");
                    res.redirect("back");
                }
            }
        });
    } else {
        //if not, redirect
        req.flash("error", "Please Login to continue !");
        res.redirect("/login");
    }
};

middlewareObj.checkCommentOwnerShip = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){ 
                req.redirect("back");
            } else {
                //does user owns comment?
                if(foundComment.author.id.equals(req.user._id)){
                next();
                } else {
                //otherwise redirect 
                req.flash("error", "PERMISSON DENIED !!");
                res.redirect("back");
                }
            }
        });
    } else {
        //if not, redirect
        req.flash("error", "Please Login to continue !");
        res.redirect("/login");
    }
};

module.exports = middlewareObj ;