const express = require('express');
const router = express.Router();
const Review = require('../models/reviews');
const Ward = require('../models/wards');



router.get('/', (req, res)=>{
	Ward.find((err, ward)=>{
		if(err){
			res.send('There has been an error with your database')
		} else{
			res.render('user/aldProfile', {ward: ward})
		}
	})
})//placeholder




router.get('/:id', (req, res)=>{
	Ward.find(req.params.id, (err, ward)=>{
		if (err){
			res.send('There has been an error with your database')
		} else{
			// console.log(req.params.id)
			res.render('user/aldProfile', {ward: ward[req.params.id],
											number: req.params.id
											})

		}
	})
})



router.post('/:id/new', (req, res)=>{
	Ward.find((err, foundWard)=>{
		Review.create(req.body, (err, createdReview)=>{
			foundWard[req.params.id].reviews.push(createdReview);
			foundWard[req.params.id].save((err, data)=>{
				console.log(data)
				res.redirect('/profile/' + req.params.id)
			})
		})
	})
})//Posting Reviews





module.exports = router;