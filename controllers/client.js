const { Client } = require('../models');

const list = async (req, res, next) => {};

const create = async (req, res, next) => {
  try {
    const { body } = req;
    const newClient = await Client.create({
      name: body.name,
      email: body.email,
    });
    res.status(201).json(newClient);
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
