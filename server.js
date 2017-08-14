// Load the express module (Where do you think this comes from?)
var express = require("express");

var session = require('express-session');

var multer  = require('multer')
var upload = multer({ dest: '../client/static/uploads/' })

// invoke var express and store the resulting application in var app
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(session({secret: 'ac91chandan'}));

var path = require("path");

var fs = require("fs");

// require body-parser
var bodyParser = require('body-parser');


// use it!
app.use(bodyParser.urlencoded({extended: true}));

// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(path.join(__dirname, './client/static')));

// two underscores before dirname
// try printing out __dirname using console.log to see what it is and why we use it

// This sets the location where express will look for the ejs views
app.set('views', path.join(__dirname, './client/views'));
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

require('./server/config/mongoose.js');

// store the function in a variable
var routes_setter = require('./server/config/routes.js');
// invoke the function stored in routes_setter and pass it the "app" variable
routes_setter(app);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

// Tell the express app to listen on port 8000
http.listen(8000, function() {
  console.log("listening on port 8000");
})
// this line will almost always be at the end of your server.js file (we only tell the server to listen after we have set up all of our rules)

