var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcrypt');   // or 'bcrypt' on some versions

var UserSchema = new mongoose.Schema({
	 firstname:  { type: String, required: true},
	 lastname: { type: String, required: true},
	 password: { type: String, required: true, minlength: 6 },
	 profilepic: { type:String, required: true},
	 dob: { type: String, required: true},
	 email: { type: String, required: true, unique: true},
	 department: { type: String, required: true},
	 val:{},
	 role:{}
})



UserSchema.plugin(uniqueValidator);

UserSchema.methods.addBcrypt= function(input){
	return bcrypt.hashSync(input, bcrypt.genSaltSync(8));
}

UserSchema.pre('update', function(done){
	this.password = this.addBcrypt(this.password);
	done();
})

UserSchema.pre('save', function(done){
	this.password = this.addBcrypt(this.password);
	done();
})

var User = mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
