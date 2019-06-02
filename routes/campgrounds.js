  var express = require("express"),
      router  = express.Router(),
      Campground  = require("../models/campgrounds"),
      middleware = require("../middleware");

  //INDEX 
  router.get("/", function(req, res){
  //Get all the campgrounds from the DB
    Campground.find({}, function(err, allCampgrounds){
      if(err){
        console.log(err);
      } else {
        res.render("campgrounds/index", {campgrounds: allCampgrounds});
      }
    })
  });
  
  //CREATE
  router.post("/", middleware.isLoggedIn,function(req, res){
    var name = req.body.name;
    var image = req.body.imageurl;
    var desc = req.body.description;
    var author = {
      id: req.user._id,
      username: req.user.username
    }
    var newCampGround = {name: name, image: image, description: desc, author: author};
    Campground.create( newCampGround, function(err, newCamp){
      if(err){
        console.log(err);
      } else {
        res.redirect("/campgrounds");
      }
    });
  });

  //NEW
  router.get("/new", middleware.isLoggedIn ,function(req, res){
    res.render("campgrounds/new");
  });
  
  //SHOW
  router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
      if(err){
        console.log(err);
      } else {
        res.render("campgrounds/show", {campground: foundCamp});
      }
    });
  });

  //EDIT CAMPGROUND ROUTE
  router.get("/:id/edit", middleware.checkCampgroundOwnerShip, function(req, res){
    Campground.findById(req.params.id, function(err, foundCamp){
      res.render("campgrounds/edit", {campground: foundCamp});        
    });
  });

  //UPDATE CAMPGROUND ROUTE
  router.put("/:id", middleware.checkCampgroundOwnerShip, function(req, res){
    //find and update campground and

    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateCampground){
      if(err){
        res.redirect("/campgrounds");
      } else {
        //redirect to show page
        res.redirect("/campgrounds/"+ req.params.id);
      }
    }); 
  });

  //DESTROY CAMPGROUND ROUTE
  router.delete("/:id", middleware.checkCampgroundOwnerShip, function(req, res){
    Campground.findByIdAndDelete(req.params.id, function(err){
      if(err){
        res.redirect("/campgrounds")
      } else {
        res.redirect("/campgrounds");
      }
    });
  });

  module.exports = router;