var mongoose = require('mongoose');
var Link = mongoose.model('Link') // We are retrieving this Schema from our Models, named 'User'
var File = mongoose.model('File') // We are retrieving this Schema from our Models, named 'User'


module.exports={
	createlink: function(req,res){
		var link = new Link({linkname: req.body.linkname, department: "HR", path: req.body.path, sticky: req.body.sticky, uploadedby: req.session.user});
		link.save(function(err) {
	    	if(err) {
	      		res.render('formupload', {title: 'you have errors!', errors: file.errors});
	    	} 

	    	else { 
	      		res.redirect('/hr');
	      		}
	      	})
	},

	findlink: function(req,res){
		Link.find({department: req.session.department }, function(err, links) {
			var links_array = links; console.log("Links", links)
			File.find({department: "HR" }, function(err, files){
				var files_array = files; console.log("Files", files)
				if(req.session.department="HR" || req.session.permissions==="Admin"){
					res.render('hradmin', {links: links_array, files:files_array})
				}
				else{
					res.render('hr', {links: links_array, files: files_array})
				}
			})	
			

		})   
	},

	hrfindlink: function(req,res){
		Link.find({department: "HR" }, function(err, links) {
			var links_array = links; console.log("Links", links)
			File.find({department: "HR" }, function(err, files){
				var files_array = files; console.log("Files", files)
				if(req.session.department="HR" || req.session.permissions==="Admin"){
					res.render('hradmin', {links: links_array, files:files_array})
				}
				else{
					res.render('hr', {links: links_array, files: files_array})
				}
			})	
		})   
	},


	linkremove: function(req,res){
		Link.remove({_id: req.body._id}, function(error, user) {
			res.redirect("/hr")
		})
	},
}