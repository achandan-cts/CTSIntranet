var mongoose = require('mongoose');
var File = mongoose.model('File') // We are retrieving this Schema from our Models, named 'User'
var Link = mongoose.model('Link') // We are retrieving this Schema from our Models, named 'User'

module.exports={

	
	upload: function(req,res){
		newpath = req.files[0].path.slice(13);
		var file = new File({filename: req.body.filename, path: newpath, department: req.body.department, sticky: req.body.sticky, uploadedby: req.session.user});
		file.save(function(err) {
	    	if(err) {
	      		res.render('formupload', {title: 'you have errors!', errors: file.errors});
	    	} 

	    	else { 
	      		console.log('successfully added a file!');
	      		res.redirect('/forms');
	      	}
	    })
	},

	findfile: function(req,res){
		File.find({department: req.session.department }, function(err, files) {
			var files_array = files; console.log("Files", files)
			if(req.session.permissions==="Admin"){
				res.render('formsadmin', {files: files_array})
			}
			else if(req.session.permissions==="Department Admin"){
				res.render('formsdeptadmin', {files: files_array})
			}
			else{
				res.render('forms', {files: files_array})
			}

			})   
	},

	hrfindfile: function(req,res){
		File.find({department: "HR" }, function(err, files) {
			var files_array = files; console.log("Files", files)
			if(req.session.department === "HR" || req.session.permissions==="Admin"){
				res.render('hradmin', {files: files_array})
			}
			else{
				res.render('hr', {files: files_array})
			}
		})   
	},


	fileremove: function(req,res){
		File.remove({_id: req.body._id}, function(error, user) {
			res.redirect("/hr")
		})
	},


}

