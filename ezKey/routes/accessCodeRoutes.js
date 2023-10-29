const express = require('express');
const router = express.Router();
const accessController = require('../controllers/accessController');
const {authenticateToken} = require('../middleware/authMiddleware.js');

router.post('/createAccess', accessController.createAccess);
router.post('/validateAccess', accessController.validateAcces)


module.exports = router;