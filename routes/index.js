
const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/users', usersController.getUsers);
router.get('/user', (req, res) => res.redirect('/users')); 
router.get('/user/:id', usersController.getUser); 

module.exports = router;