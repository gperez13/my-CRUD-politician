require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
require('./db/db');




app.use(session({
	secret: 'This is some string you create',
	resave: false,
	saveUninitialized: false
}))





//Controllers
const adminController = require('./controllers/admin');
const usersController = require('./controllers/users');
const homeController = require('./controllers/home');









app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(methodOverride('_method'));



const port = process.env.PORT || 3000;





app.use('/admin', adminController);
app.use('/profile', usersController);
app.use('/', homeController);


app.listen(port, () =>{
	console.log('Your server is running')
})