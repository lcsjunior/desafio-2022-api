const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../config/passport');
const { login, logout, show } = require('../controllers/auth');

router.get('/user', isAuthenticated, show);

router.post('/login', login);

router.all('/logout', logout);

module.exports = router;
