const express = require('express');
const router = express.Router();
const Review = require('../models/reviews');
const Ward = require('../models/wards');
const User = require('../models/users');




router.get('/', (req, res)=>{
	Ward.find((err, ward)=>{
		if(err){
			res.send('There has been an error with your database')
		} else{
			const message = req.session.logged ? 'Hey Your logged congrats' : '';
		
			res.render('user/index', {
										ward: ward,
										logged: req.session.logged,
										message: message,
										notLoggedInMessage: req.session.notLoggedMessage										})
		}
	})
})//end of home route

router.get('/about', (req, res)=>{
	res.render('user/about', {})
})



router.post('/login', (req, res)=>{
	req.session.notLoggedMessage = '';
	req.session.username = req.body.username;
	req.session.logged = true;


	res.redirect('/')
})





module.exports = router;