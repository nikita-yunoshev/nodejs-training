const passport = require('passport');
const passportJWT = require('passport-jwt');

const User = require('../models/UserModel');

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const jwtSecret = require('./jwtConfig');

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret.secret,
};

const strategy = new JWTStrategy(jwtOptions, (jwtPayload, next) => {
  const user = User.query().findById(jwtPayload.id);

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);
