var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Cloud's Rest",
		image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
		description: "something interesting!!!"
	},
	{
		name: "Desert Palace",
		image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=698&q=80",
		description: "something interesting!!!"
	},
	{
		name: "Forest Peace",
		image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=959&q=80",
		description: "something interesting!!!"
	}
]

function seedDB(){
	//Remove all campgrounds
	Campground.remove({},function(err){
		if(err){
			console.log(err);
		}
		console.log("removed campgrounds!");

		// add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed,function(err,campground){
				if(err){
					console.log(err);
				}
				else{
					console.log("Added a campgrounds");
					//create a comment
					Comment.create(
					{
						text: "This place is great, but I wish there was internet",
						author: "Homer"
					}, function(err,comment){
						if(err){
							console.log(err);
						}
						else{
							campground.comments.push(comment);
							campground.save();
							console.log("Created new comments");
						}
					});
				}
			});
		});
	});

}

module.exports = seedDB;
