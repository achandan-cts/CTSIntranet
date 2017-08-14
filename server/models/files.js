var mongoose = require('mongoose');


var FileSchema = new mongoose.Schema({
	 filename:  { type: String, required: false},
	 path: { type: String, required: false},
	 department: { type: mongoose.Schema.Types.Mixed, required: false},
	 sticky: { type: String, required: false},
	 uploadedby: { type: String, required: false, unique: false}
})



var File = mongoose.model('File', FileSchema); // We are setting this Schema in our Models as 'User'
