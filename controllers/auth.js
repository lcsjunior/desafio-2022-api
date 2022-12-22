const initials = require('initials');
var jwt = require('jsonwebtoken');
const { User } = require('../models');
const { messages } = require('../utils/messages');

const expirationtimeInMs = process.env.JWT_EXPIRATION_TIME;
const secret = process.env.JWT_SECRET;

const show = (req, res, next) => {
  const {
    user: { username },
  } = req;
  return res.json({
    username,
    initials: initials(username),
  });
};

const login = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.findOne({
      where: { username: body.username },
    });
    if (user) {
      const match = await user.comparePassword(body.password);
      if (match) {
        const payload = {
          sub: user.id,
          expiration: Date.now() + parseInt(expirationtimeInMs, 10),
        };
        const token = jwt.sign(JSON.stringify(payload), secret);
        return res
          .cookie('jwt', token, {
            httpOnly: true,
            secure: false,
          })
          .sendStatus(200);
      }
    }
    res.status(403).json({ error: messages.invalidLogin });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res, next) => {
  res.clearCookie('jwt').sendStatus(200);
};

module.exports = {
  show,
  login,
  logout,
};
