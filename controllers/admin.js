const express = require('express');
const router = express.Router();
const Review = require('../models/reviews');
const Ward = require('../models/wards');


router.get('/', (req, res)=>{
	Ward.find((err, ward)=>{
		Review.find((err, review)=>{
			console.log(ward)
			res.render('admin/admin', {ward: ward,
										review: review

										})

		})
	})
})//admin landing page



router.get('/2', (req, res)=>{
	Ward.find((err, ward)=>{
		console.log(ward[0]._id)
			res.render('admin/admin2', {ward: ward,


										})
	})
})//admin landing page


router.get('/3', (req, res)=>{
	Ward.find((err, ward)=>{
		console.log(ward[0])
			res.render('admin/admin3', {ward: ward,


										})
	})
})//admin landing page




router.post('/create', (req,res)=>{
	Ward.create(req.body, (err, ward)=>{
		res.redirect('/admin')
	})
})// Posting Wards





router.post('/new', (req, res)=>{
	Ward.findById(req.body.wardId, (err, foundWard)=>{
		Review.create(req.body, (err, createdReview)=>{
			foundWard.reviews.push(createdReview);
			foundWard.save((err, data)=>{
				console.log(data)
				res.redirect('/admin/2')
			})
		})
	})
})//Posting Reviews







module.exports = router;