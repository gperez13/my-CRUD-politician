//Reviews

const mongoose = require('mongoose');
const User = require('./users')


const reviewSchema = new mongoose.Schema({
	username: [User.schema],
	date: String,
	body: String,
	rating: Number
});





module.exports = mongoose.model('Review', reviewSchema)