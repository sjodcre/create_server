const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const fs = require('fs');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl:true,
  }
});

// db.select('*').from('users').then(data => {
// 	// console.log(data);
// });

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res)=>{
	res.send('This is the server end!');
});

app.post('/signin',signin.handleSignin(db, bcrypt));

app.post('/register',(req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.post('/submitform', (req,res) => {
	console.log(req.body);
	fs.appendFile('./messages.txt', req.body.name + '\t' + req.body['email-address'] + '\t' 
		+ req.body['contact-number'] + '\t' + req.body.subject + '\t' + req.body.message + '\n', err => {
		if (err) {
			console.log(err)
		}
	} );


	res.send('okay');
})


const PORT = process.env.PORT
app.listen(PORT || 3001, () =>{
	console.log(`app is running on port ${PORT}`);
	// console.log(process.env.PORT);
})