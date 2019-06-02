var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");
    port            = process.env.PORT || 3000;

//requiring routes
var commentRoutes = require("./routes/comments"),
    campgroundsRoutes = require("./routes/campgrounds"),
    authRoutes        = require("./routes/index");

//mongoose.connect("mongodb://localhost/yelp_camp_v10", { useNewUrlParser: true });
//mongodb+srv://madhur:M@dhur@my-milky-way-wyfzt.mongodb.net/test?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://madhur:M@dhur@my-milky-way-wyfzt.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use("/public/" ,express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

//PASSPORT CONFIG
app.use(require("express-session")({
  secret: "WELCOME YOU FOOL !!!",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middle ware
app.use(function(req ,res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(authRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(port, function(){
  console.log("server started at port 3000");
});
