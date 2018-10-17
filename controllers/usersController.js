
const models = require('../models');

exports.getUsers = (req, res) => {
	models.user.findAll().then( users => res.render('users', {'users': users }));	
}

exports.getUser = (req, res) => {
	models.user.findById(req.params.id).then( user => res.render('user', { 'user': user }));
}