const { Router } = require('express');
const userController = require('../controllers/userController');
const router = Router();

router.post('/addUser', userController.registerUser);

module.exports = router;