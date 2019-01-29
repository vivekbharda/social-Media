var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
	firstName : { type: String, text: true },
	lastName : { type: String, text: true },
	dob : { type: String, text: true },
	password : { type: String, text: true },
	email : { type: String, text: true },
	post : [{ type: Schema.Types.ObjectId, ref:'post'}],
	friends : [{type: Schema.Types.ObjectId, ref:'user'}]

});



module.exports =  mongoose.model('user', userSchema); 
