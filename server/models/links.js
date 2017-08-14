var mongoose = require('mongoose');


var LinkSchema = new mongoose.Schema({
	 linkname:  { type: String, required: false},
	 path: { type: String, required: false},
	 sticky: { type: String, required: false},
	 department: { type: String, required: false},
	 uploadedby: { type: String, required: false, unique: false}
})



var File = mongoose.model('Link', LinkSchema); // We are setting this Schema in our Models as 'User'
