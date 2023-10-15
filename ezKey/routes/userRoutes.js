const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {authenticateToken} = require('../middleware/authMiddleware.js');

router.post('/register', userController.register);
router.post('/login', userController.login)


module.exports = router;