
var users = require('../controllers/users.js');
var files = require('../controllers/files.js');
var links = require('../controllers/hrlinks.js');



var fs = require("fs");

var multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'client/static/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })



module.exports= function(app){

	// root route
	app.get('/', function (req, res){
		if(req.session.loggedin === "true"){
		res.render('home', {title: "my Express project"})}
	  else{res.render('index', {title: "my Express project"})}
	});

	app.get('/login', function (req, res){
	  res.render('login', {title: "my Express project"});
	});

	app.get('/register', function (req, res){
	  res.render('register', {title: "my Express project"});
	});

	app.get("/users", function (req, res){
	if(req.session.loggedin === "true"){

		if(req.session.permissions=="user"){
		users.find(req,res)}
		else if(req.session.permissions=="Admin"){
			users.findadmin(req,res)
		}

	}
	else{res.render('index', {title: "my Express project"})}
		
	})

	app.get("/adminusers", function (req, res){
	if(req.session.loggedin === "true"){

		if(req.session.permissions=="user"){
		users.find(req,res)}
		else if(req.session.permissions=="Admin"){
			users.findadmin(req,res)
		}

	}
	else{res.render('index', {title: "my Express project"})}
		
	})

	app.get("/regularusers", function (req, res){
	if(req.session.loggedin === "true"){
		req.body.departmentsort=req.session.department;
		users.findsort(req,res)}

	else{res.render('index', {title: "my Express project"})}
		
	})

	app.get("/hr", function (req, res){
			if(req.session.loggedin === "true"){

				links.hrfindlink(req,res)
		}
	  else{res.render('index', {title: "my Express project"})}
		
	})

		app.get("/hrlinkupload", function (req, res){
			if(req.session.loggedin === "true"){
				res.render('hrlinkupload', {title: "my Express project"})
		}
	  else{res.render('index', {title: "my Express project"})}
		
	})

	app.get("/home", function (req, res){

		if(req.session.loggedin === "true"){
		res.render('home', {title: "my Express project"});}
		else{res.render('index', {title: "my Express project"});}
		
	
	})

	app.get("/forms", function (req, res){

		if(req.session.loggedin === "true"){

		
			console.log(req.session.department);
			files.findfile(req,res);
		
		
		}

	
		else{res.render('index', {title: "my Express project"});}
		
	
	})

		app.get("/news", function (req, res){

		if(req.session.loggedin === "true"){

		
			res.render('news', {title: "my Express project"});
		
		
		}

	
		else{res.render('index', {title: "my Express project"});}
		
	
	})

		app.get("/calendar", function (req, res){

		if(req.session.loggedin === "true"){

		
			res.render('calendar', {title: "my Express project"});
		
		
		}

	
		else{res.render('index', {title: "my Express project"});}
		
	
	})

	app.get("/espp", function (req, res){

		if(req.session.loggedin === "true"){

		
			res.render('espp', {title: "my Express project"});
		
		
		}

	
		else{res.render('index', {title: "my Express project"});}
		
	
	})	

	app.get("/profile", function (req, res){

		if(req.session.loggedin === "true"){

		users.findme(req,res)

		}

	
		else{res.render('index', {title: "my Express project"});}
		
	
	})

	app.get("/changepass", function (req, res){

		if(req.session.loggedin === "true"){

		res.render('changepass', {title: "my Express project"});

		}

	
		else{res.render('index', {title: "my Express project"});}
		
	
	})

	app.get("/logout", function (req, res){

		req.session.loggedin = "false";
		req.session.permissions = "none"
		req.session.user = "none"
		req.session.department = "none"

		res.render('index', {title: "my Express project"})

	
	
	})

	app.get("/formupload", function (req, res){
		if(req.session.loggedin === "true" && (req.session.permissions=="Admin" || req.session.permissions=="Department Admin")){
			res.render('formupload', {title: "my Express project"});

		}

		else{res.render('index', {title: "my Express project"});}
	
	})

	app.get("/hrformupload", function (req, res){
		if(req.session.loggedin === "true" && (req.session.permissions=="Admin" || req.session.permissions=="Department Admin")){
			res.render('hrformupload', {title: "my Express project"});

		}

		else{res.render('index', {title: "my Express project"});}
	
	})

	app.post("/login", function (req, res){
		console.log(req.body)
		users.findone(req,res)
	})

	app.post('/users', function(req, res) {
		req.body.profilepic="/images/blankpic.png"
 		console.log("POST DATA", req.body);
		users.create(req,res)	
	})

	app.post('/adminusers', function(req, res) {
 		console.log("POST DATA", req.body);
		users.update(req,res)	
	})

	app.post('/filterusers', function(req, res) {
 		console.log("POST DATA", req.body);
		users.findsort(req,res)	
	})

	app.post('/changepass', function(req, res) {

		if(req.body.newpassword === req.body.confirmpassword){
 		console.log("POST DATA", req.body);
		users.changepass(req,res)	}

		else{res.render('changepass', {errors: ["New password doesn't match re-entered password"]});}


	})

	app.post('/editadmin', function(req, res) {
 		users.edit(req,res);

	
	})

	app.post('/removeuser', function(req, res) {
 		users.remove(req,res);

	
	})

	app.post('/removelink', function(req, res) {
 		links.linkremove(req,res);

	
	})

	app.post('/profileupdate',upload.any(), function(req, res) {
		console.log("files", req.files);
 		if(req.body.profilepic===""){req.body.profilepic="/images/blankpic.png"}
 		users.profileupdate(req,res);

	
	})



	app.post('/uploadfile',upload.any(), function(req, res,next) {
		
		if(req.session.loggedin === "true"){
 		// console.log(req.files);

		  	files.upload(req,res);
 		
		// fs.readFile(req.files[0].path, function (err, data) {

		//   var newPath = __dirname + "/uploads/uploadedFileName";

		//   fs.writeFile(newPath, data, function (err) {
		//     res.redirect("back");
		//   });
		// });
		}

		// else{res.render('index', {title: "my Express project"});}

	})


	app.post('/uploadhrlink',upload.any(), function(req, res,next) {
		
		if(req.session.loggedin === "true"){
 		// console.log(req.files);

		  	links.createlink(req,res);
 		
		// fs.readFile(req.files[0].path, function (err, data) {

		//   var newPath = __dirname + "/uploads/uploadedFileName";

		//   fs.writeFile(newPath, data, function (err) {
		//     res.redirect("back");
		//   });
		// });
		}

		// else{res.render('index', {title: "my Express project"});}

	})

}