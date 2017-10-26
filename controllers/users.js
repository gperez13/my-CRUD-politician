const express = require('express');
const router = express.Router();
const Review = require('../models/reviews');
const Ward = require('../models/wards');
const User = require('../models/users');

router.get('/:id/edit/:number', (req, res) => {
	Review.findById(req.params.id, (err, review) => {
		Ward.find((err, allWards) => {
			Ward.findOne({'reviews._id': req.params.id}, (err, foundWard) => {
				res.render('user/edit', {
											review: review,
											wards: allWards,
											reviewWard: foundWard,
											message: '',
											logged: req.session.logged,
											username: req.session.username,
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
											number: req.params.id,
											message: '',
											username: req.session.username,
											logged: req.session.logged
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
		console.log(foundWard)
		Review.create(req.body, (err, createdReview)=>{
			foundWard[req.params.id].reviews.push(createdReview);
			foundWard[req.params.id].save((err, data)=>{

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

router.post('/login', (req, res) => {
  console.log(req.body)
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