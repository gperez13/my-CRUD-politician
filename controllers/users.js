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

			res.render('user/aldProfile', {ward: ward[req.params.id]
											
											})

		}
	})
})










module.exports = router;