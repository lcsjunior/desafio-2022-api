const { User } = require('../models');
const { messages } = require('../utils/messages');

const checkUsernameExists = async (username) => {
  const user = await User.findOne({
    raw: true,
    paranoid: false,
    attributes: ['id'],
    where: { username },
  });
  if (user) {
    return Promise.reject(messages.alreadyInUse);
  }
};

const create = async (req, res, next) => {
  try {
    const { body } = req;
    if (body.password !== body.passwordConfirmation) {
      res.status(400).json({ errors: messages.passwordDoesNotMatch });
    } else {
      const newUser = await User.create({
        username: body.username,
        password: body.password,
      });
      res.status(201).json(newUser);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkUsernameExists,
  create,
};
