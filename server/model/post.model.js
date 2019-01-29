var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var postSchema = new Schema({
	content : String,
	datetime : String,
	publish : Boolean,
});




module.exports =  mongoose.model('post', postSchema);