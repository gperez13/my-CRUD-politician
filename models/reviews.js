//Reviews

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
	username: String,
	date: String,
	body: String,
	rating: Number
});





module.exports = mongoose.model('Review', reviewSchema)