var mongoose = require('mongoose');
var bcrypt = require('bcrypt');   // or 'bcrypt' on some versions
var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'

module.exports={

	find: function(req,res){
		User.find({}, function(err, users) {
			var users_array = users; console.log(users)
			res.render('users', {users: users_array})
			})   
	},

	findadmin: function(req,res){

		User.find({}, function(err, users) {
			var users_array = users; console.log(users)
			res.render('useradmin', {users: users_array})
			})   

	},

	remove: function(req,res){

		User.remove({_id: req.body._id}, function(error, user) {
			User.find({}, function(err, users) {
					var users_array = users; console.log(users)
					res.render('useradmin', {users: users_array})
				})   
		})

	},

	edit: function(req,res){

		User.find({_id: req.body._id}, function(err, users){
			var users_array = users; console.log(users)
			res.render('edituser', {users: users_array})
		})
	},

	update: function(req,res){
		User.update({_id: req.body._id}, {$set: {firstname: req.body.firstname, lastname: req.body.lastname, dob:req.body.dob, email: req.body.email, department: req.body.department, role: req.body.role, val: req.body.val, profilepic: req.body.profilepic}}, function(err,user){
			User.find({}, function(errors, users) {
					var users_array = users; console.log(users)
					res.render('useradmin', {users: users_array})
				})   

		})
		

		
	},


	profileupdate: function(req,res){
		
		var newpath=""
		var pathwithoutspace= "";
		if(req.files[0]){
		newpath = req.files[0].path.slice(13);
		for(var i=0;i<newpath.length;i++){
			if(newpath[i]!=" " && newpath[i]!="undefined"){
				
				console.log(newpath[i]);
				pathwithoutspace+=newpath[i];
			}

			else if(newpath[i]===" " && newpath[i]!=undefined){pathwithoutspace+="%20"};
		}

		User.update({email: req.session.user}, {$set: {firstname: req.body.firstname, lastname: req.body.lastname, dob:req.body.dob, email: req.body.email, department: req.body.department, role: req.session.permissions, val: req.body.val, profilepic: pathwithoutspace}}, function(err,user){
			
			req.session.user = req.body.email;
			User.find({email: req.session.user}, function(errors, users) {
					var users_array = users; console.log(users)
					res.render('profile', {users: users_array})
				})   

		})



		}

		else{

			User.find({email: req.session.user}, function(errors, users) {
				console.log("matching users", users[0].profilepic);
					newpath=users[0].profilepic;
					pathwithoutspace=newpath
					console.log("newpath", newpath)

					User.update({email: req.session.user}, {$set: {firstname: req.body.firstname, lastname: req.body.lastname, dob:req.body.dob, email: req.body.email, department: req.body.department, role: req.session.permissions, val: req.body.val, profilepic: pathwithoutspace}}, function(err,user){
			
					req.session.user = req.body.email;
					User.find({email: req.session.user}, function(errors, users) {
							var users_array = users; console.log(users)
							res.render('profile', {users: users_array})
				})   

		})

				})   

		}
		// console.log(newpath);
		

		

		
		
		
		
	},

	findone: function(req,res){

		User.find({email: req.body.email}, function(err, users){

			if(req.body.password && users[0].password){
			var passtrue = bcrypt.compareSync(req.body.password, users[0].password)
			console.log(passtrue);}
			if(passtrue===true){

				req.session.loggedin = "true";
				req.session.permissions = users[0].role;
				req.session.user = users[0].email;
				req.session.department = users[0].department;		
				console.log(req.session.permissions);
				User.find({}, function(err, users) {
					var users_array = users; console.log(users)
					res.render('home', {users: users_array, logvar: req.session.loggedin})
				})}   

			else{res.render('incpass')}
		
		})
	},

	changepass: function(req,res){

		User.find({email: req.session.user}, function(err, users){

			if(req.body.password && users[0].password){
			var passtrue = bcrypt.compareSync(req.body.password, users[0].password)
			console.log(passtrue);}
			if(passtrue===true){
				User.remove({_id: users[0]._id}, function(error, user) {
				
				})

				var user = new User({firstname: users[0].firstname, lastname: users[0].lastname, password: req.body.newpassword, dob: users[0].dob, email: users[0].email,department: users[0].department, val:users[0].emailval, role: users[0].role, profilepic: users[0].profilepic });

					user.save(function(err) {
				    	// if there is an error console.log that something went wrong!
				    	if(err) {
				    		console.log(user.errors)
				      		res.render('changepass', {title: 'you have errors!', errors: user.errors});
				    	} 

				    	else { // else console.log that we did well and then redirect to the root route
				      		console.log('successfully added a user!');
				      		res.redirect('/profile');
				      		}
				    })
				 }  

			else{res.render('changepass')}
		
		})
	
},





	findme: function(req,res){

		User.find({email: req.session.user}, function(err, users){

			var users_array = users; console.log(users)
			res.render('profile', {users: users_array})
		
		})
	},

	create: function(req,res){
		// create a new User with the name and age corresponding to those from req.body
		var user = new User({firstname: req.body.firstname, lastname: req.body.lastname, password: req.body.password, dob: req.body.dob, email: req.body.email,department: req.body.department, val:req.body.emailval, role: req.body.role, profilepic: req.body.profilepic });
		
		// Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
		user.save(function(err) {
	    	// if there is an error console.log that something went wrong!
	    	if(err) {
	    		console.log(user.errors)
	      		res.render('register', {title: 'you have errors!', errors: user.errors});
	    	} 

	    	else { // else console.log that we did well and then redirect to the root route
	      		console.log('successfully added a user!');
	      		res.redirect('/users');
	      		}
	      	})

	},

	

}