//Wards
const mongoose = require('mongoose');
const Review = require('./reviews')

const wardSchema = new mongoose.Schema({
	name: String,
	image: String,
	email: String,
	phone: String,
	address: String,
	// compositeScore: String,
	// totalReviews: Number,
	reviews: [Review.schema]
});








module.exports = mongoose.model('Ward', wardSchema)



//remember to parseFloat the composite score