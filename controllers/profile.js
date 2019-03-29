 const handleProfileGet = (req, res, db) => {
	const {id } = req.params;
	// same as db('users').where('id', '=', id)
	db.select('*').from('users').where({id})
	.then(user =>{
		if(user.length){
			res.json(user[0])	
		} else {
			res.status(400).json('user not found')
		}
		
	})
	.catch(err => res.status(400).json('error getting user'))
	// if (!found) {
	// 	res.status(400).json('not found');
	// }
}

	module.exports = {
		handleProfileGet: handleProfileGet
	}