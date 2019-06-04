var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//SHOW INDEX
router.get("/",function(req,res){
	// Get all campgrounds from DB
	Campground.find({},function(err,allcampgrounds){
		if(err ){
			console.log(err);
		}
		else{
			res.render("campgrounds/campgrounds",{campgrounds:allcampgrounds, currentuser: req.user});
		}
	});
	
});

//CREATE ROUTE
router.post("/", middleware.isLoggedIn,function(req,res){
	//get data from form and add to campground page
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground  = {name: name,price: price, image: image, description: desc, author: author};
	// Create new campground and save to DB
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/campgrounds");
		}
	});
});

// NEW ROUTE
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
});


//SHOW ROUTE
router.get("/:id",function(req,res){
	//find the campground with (provided id
		Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err || !foundCampground){
			req.flash("error","Campground not found");
			res.redirect("back");
		}
		else{
			res.render("campgrounds/show",{campground: foundCampground});
		}
	});
});

//EDIT Campground Route
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){

		Campground.findById(req.params.id,function(err,foundCampground){
			res.render("campgrounds/edit",{campground: foundCampground});
	});
});

//UPDATE Campground Route
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds/"+ req.params.id);
		}
	});
});

//DESTROY campground Route
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;