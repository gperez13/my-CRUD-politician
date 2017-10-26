const express = require('express');
const router = express.Router();
const Review = require('../models/reviews');
const Ward = require('../models/wards');
const User = require('../models/users');
const bcrypt = require('bcrypt');




router.get('/', (req, res)=>{
	Ward.find((err, ward)=>{
		if(err){
			res.send('There has been an error with your database')
		} else{
			const message = req.session.logged ? 'Hey Your logged congrats' : '';

			res.render('user/index', {
										ward: ward,
										logged: req.session.logged,
										message: ''	
									})
		}
	})
})//end of home route

router.get('/about', (req, res)=>{
	res.render('user/about', {logged: req.session.logged, message: ''})
})


router.post('/register', (req, res) => {
  console.log(req.body)

  User.findOne({username: req.body.username}, (err, user) => {
    if(err){
      res.send(err)
    } else {

      if(!user){
          const password = req.body.password;
          const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
          // create object to put into database
          const userDBentry = {};
          userDBentry.username = req.body.username;
          userDBentry.password = passwordHash;

          User.create(userDBentry, (err, user) => {
            if(err){
              res.send('error creating user')
            } else {

              req.session.logged = true;
              req.session.username = user.username;
              res.redirect('/')
            }
          })
      } else {
        res.render('user/index', {message: 'username taken', logged: req.session.logged})
      }
    }
  })
})

router.post('/login', (req, res) => {
  console.log(req.body)
  console.log(req.body.username)
  User.findOne({username: req.body.username}, (err, user) => {
    if(err){
      res.send(err)
    } else {
      console.log(user)
            if(user){

                    if(bcrypt.compareSync(req.body.password, user.password)){
                      req.session.logged = true;
                      req.session.username = user.username;
                      res.redirect('/')
                    } else {
                      res.render('user/index', {message: 'INCORRECT USERNAME AND/OR PASSWORD', logged: req.session.logged})
                    }

            } else {
               res.render('user/index', {message: 'INCORRECT USERNAME AND/OR PASSWORD', logged: req.session.logged})
            }
    }
  })
})


router.post('/logout', (req, res)=>{

	req.session.destroy((err)=>{
		if(err){
			res.send('There has been an error, please try again')
		} else{
			res.redirect('/')
		}
	})
})

module.exports = router;