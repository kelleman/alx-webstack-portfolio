const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const dashBoardController = require('../controllers/dashBoardController');
const {authenticateToken} = require('../middleware/authMiddleware.js');

router.post('/register', userController.register);
router.post('/login', userController.login)
router.post('/dashboard', dashBoardController.dashBoard)


module.exports = router;