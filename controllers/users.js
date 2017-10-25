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


router.get('/:id/edit/:number', (req, res) => {
	Review.findById(req.params.id, (err, review) => {
		Ward.find((err, allWards) => {
			Ward.findOne({'reviews._id': req.params.id}, (err, foundWard) => {
				res.render('user/edit', {
											review: review,
											wards: allWards,
											reviewWard: foundWard,
											number: req.params.number
				})
			})
		})
	})
})

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

router.delete('/:id/:number', (req, res) => {
	Review.findByIdAndRemove(req.params.id, (err, review) => {
		Ward.findOne({'reviews._id': req.params.id}, (err, foundWard) => {
			foundWard.reviews.id(req.params.id).remove();
				foundWard.save((err, data) => {
					res.redirect('/profile/' + req.params.number)
				})
		})
	})
})


router.post('/:id/new', (req, res)=>{
	Ward.find((err, foundWard)=>{
		Review.create(req.body, (err, createdReview)=>{
			foundWard[req.params.id].reviews.push(createdReview);
			foundWard[req.params.id].save((err, data)=>{
				console.log(data.reviews[0].rating)
				res.redirect('/profile/' + req.params.id)
			})
		})
	})
})//Posting Reviews

router.put('/:id/:number', (req, res) => {
	Review.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedReview) => {
		Ward.findOne({'reviews._id': req.params.id}, (err, foundWard) => {
			foundWard.reviews.id(req.params.id).remove();
			foundWard.reviews.push(updatedReview);
			foundWard.save((err, data) => {
				res.redirect('/profile/' + req.params.number);
			})
			
		})
	})
})

module.exports = router;