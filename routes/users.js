const express = require('express');
const router = express.Router();
const {
  validator: { validateAsync },
} = require('../middlewares');
const { body } = require('express-validator');
const { checkUsernameExists, create } = require('../controllers/users');

router.post(
  '/',
  validateAsync([
    body('username').isLength({ min: 6 }).custom(checkUsernameExists),
    body('password').isLength({ min: 6 }),
  ]),
  create
);

module.exports = router;
