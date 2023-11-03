const express = require('express');
const router = express.Router();
const dashBoardController = require('../controllers/dashBoardController');
const { authenticateToken } = require('../middleware/authMiddleware.js');

router.get('/', (req, res) => {
    res.render('index'); // This will render 'views/index.ejs'
});

router.get('/login', (req, res) => {
    res.render('login'); // This will render 'views/login.ejs'
});

router.get('/signup', (req, res) => {
    res.render('signup'); // This will render 'views/signup.ejs'
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard'); // This will render 'views/dashboard.ejs'
});

router.get('/trackcode', (req, res) => {
    res.render('trackcode'); // This will render 'views/trackcode'ejs'
});

router.get('/dashboard', dashBoardController.dashBoard)



module.exports = router;