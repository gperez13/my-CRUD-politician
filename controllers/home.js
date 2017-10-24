const express = require('express');
const router = express.Router();
const Review = require('../models/reviews');
const Ward = require('../models/wards');



router.get('/', (req, res)=>{
	Ward.find((err, ward)=>{
		if(err){
			res.send('There has been an error with your database')
		} else{
		
			res.render('user/index', {ward: ward})
		}
	})
})//end of home route

router.get('/about', (req, res)=>{
	res.render('user/about', {})
})








module.exports = router;