const express = require('express');
const router = express.Router();
const {
  validator: { validateAsync },
} = require('../middlewares');
const { body, param } = require('express-validator');
const { isAuthenticated } = require('../config/passport');
const { list, create, update, remove } = require('../controllers/product');

router.get('/', isAuthenticated, list);

router.post(
  '/',
  isAuthenticated,
  validateAsync([body('name').not().isEmpty()]),
  create
);

router.patch(
  '/:id',
  isAuthenticated,
  validateAsync(param('id').isInt().toInt()),
  update
);

router.delete(
  '/:id',
  isAuthenticated,
  validateAsync(param('id').isInt().toInt()),
  remove
);

module.exports = router;
