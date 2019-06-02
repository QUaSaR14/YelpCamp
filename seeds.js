var mongoose    = require("mongoose"),
    Campground  = require("./models/campgrounds"),
    Comment     = require("./models/comment")

var data = [
    {
        name: "cloud rest", 
        image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f5c07cafe4b1bf_340.jpg",
        description: "Esse dissentias te ius. Lobortis inimicus qualisque at sed, sit ea quem sonet antiopam, elit adipisci accommodare eu pri. Vel ad ipsum dolores blandit, his ei animal diceret instructior, sed natum volutpat ad. Pri mediocrem honestatis ex, his iracundia reformidans id. Te eum populo periculis, pri utamur euripidis cu, has et aperiam utroque praesent."
    }, 
    {
        name: "Desert Opsad", 
        image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104491f5c07cafe4b1bf_340.jpg",
        description:"Esse dissentias te ius. Lobortis inimicus qualisque at sed, sit ea quem sonet antiopam, elit adipisci accommodare eu pri. Vel ad ipsum dolores blandit, his ei animal diceret instructior, sed natum volutpat ad. Pri mediocrem honestatis ex, his iracundia reformidans id. Te eum populo periculis, pri utamur euripidis cu, has et aperiam utroque praesent."
    },
    {
        name: "caniyon lootiup", 
        image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg",
        description: "Esse dissentias te ius. Lobortis inimicus qualisque at sed, sit ea quem sonet antiopam, elit adipisci accommodare eu pri. Vel ad ipsum dolores blandit, his ei animal diceret instructior, sed natum volutpat ad. Pri mediocrem honestatis ex, his iracundia reformidans id. Te eum populo periculis, pri utamur euripidis cu, has et aperiam utroque praesent."
    }
];

function seedDB(){ 
    // REMOVE ALL CAMPGROUNDS
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("removed !");

            //ADD CAMPGROUNDS
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a capmground");
                    
                        //ADD COMMENTS
                        Comment.create(
                            {
                                text: "this is getting really hard to look at , hope to clean it up a little bit....",
                                author: "HomerAnu"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("new comment !");
                                }
                            }
                        )
                    }
                })
            });
        }
    });
}

module.exports = seedDB;
