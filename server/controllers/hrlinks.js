var mongoose = require('mongoose');
var Link = mongoose.model('Link') // We are retrieving this Schema from our Models, named 'User'
var File = mongoose.model('File') // We are retrieving this Schema from our Models, named 'User'


module.exports={

	
	createlink: function(req,res){
		// create a new User with the name and age corresponding to those from req.body
	

	
		
		var link = new Link({linkname: req.body.linkname, department: "HR", path: req.body.path, sticky: req.body.sticky, uploadedby: req.session.user});
		// Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
		link.save(function(err) {
	    	// if there is an error console.log that something went wrong!
	    	if(err) {
	    		console.log(err)
	    		console.log(file.errors)
	      		res.render('formupload', {title: 'you have errors!', errors: file.errors});
	    	} 

	    	else { // else console.log that we did well and then redirect to the root route
	      		console.log('successfully added a file!');
	      		res.redirect('/hr');
	      		}
	      	})

	},

	findlink: function(req,res){
		// console.log("POST DATA", req.body);
		

		Link.find({department: req.session.department }, function(err, links) {

			var links_array = links; console.log("Links", links)
			

		File.find({department: "HR" }, function(err, files){
			var files_array = files; console.log("Files", files)
			if(req.session.department="HR" || req.session.permissions==="Admin"){
			res.render('hradmin', {links: links_array, files:files_array})}
			else{res.render('hr', {links: links_array, files: files_array})}
		})	
			

			})   
	},

	hrfindlink: function(req,res){
		// console.log("POST DATA", req.body);
		

		Link.find({department: "HR" }, function(err, links) {

			var links_array = links; console.log("Links", links)
			

		File.find({department: "HR" }, function(err, files){
			var files_array = files; console.log("Files", files)
			if(req.session.department="HR" || req.session.permissions==="Admin"){
			res.render('hradmin', {links: links_array, files:files_array})}
			else{res.render('hr', {links: links_array, files: files_array})}
		})	
			

			})   
	},


	linkremove: function(req,res){

		Link.remove({_id: req.body._id}, function(error, user) {
			
			res.redirect("/hr")

		})

	},

}

