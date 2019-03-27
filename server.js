const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

const app = express();

app.use(bodyParser.json());

const database ={
	users:[
	{
		id:'123',
		name: 'john',
		email : 'jotn@gmail.com',
		password: 'abctest',
		entries: 0,
		joined: new Date()
	},
	{
		id:'124',
		name: 'johnny',
		email : 'jotnny@gmail.com',
		password: 'abctest123',
		entries: 0,
		joined: new Date()
	},
	],
	login:[
		{
			id:'987',
			hash:'',
			email:'dcd@gmail.com'
		}
	]
}

app.get('/',(req,res)=>{
	res.send(database.users);
});

app.post('/signin',(req,res) =>{

});

app.post('/register',(req, res) =>{
	const { email, name, password } = req.body;	
	bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash);
});
	database.users.push({
		id: '126',
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
	const {id } = req.params;
	database.users.forEach(user =>{
		if (user.id === id) {
			found = true;
			return res.json(user);
		} 
	})
	if (!found) {
		res.status(400).json('not found');
	}
})

app.put('/image', (req, res) =>{
	const {id} = req.body;
	let found =false;
	database.users.forEach(user =>{
		if (user.id === id) {
			found = true;
			user.entries++
			return res.json(user.entries);
		} 
	})
	if (!found) {
		res.status(400).json('not found');
	}
})

app.listen(3000, () =>{
	console.log('app is running on port 3000');
})