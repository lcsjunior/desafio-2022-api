const passport = require('passport');
const { Strategy: JwtStrategy } = require('passport-jwt');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

const deserializeUser = (jwtPayload) => {
  return User.findByPk(jwtPayload.sub, { raw: true });
};

const verify = async (jwtPayload, done) => {
  const { expiration } = jwtPayload;
  if (Date.now() > expiration) {
    return done(null, false);
  }
  const user = await deserializeUser(jwtPayload);
  return done(null, user);
};

const cookieExtractor = (req) => {
  let jwt = null;
  if (req && req.cookies) {
    jwt = req.cookies['jwt'];
  }
  return jwt;
};

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: secret,
    },
    verify
  )
);

const isAuthenticated = passport.authenticate('jwt', { session: false });

module.exports = {
  passport,
  isAuthenticated,
};
