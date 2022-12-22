const { Product } = require('../models');

const list = async (req, res, next) => {};

const create = async (req, res, next) => {
  try {
    const { body } = req;
    const newProduct = await Product.create({
      name: body.name,
    });
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {};

const remove = async (req, res, next) => {};

module.exports = {
  list,
  create,
  update,
  remove,
};
