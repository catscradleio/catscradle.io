const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const keys = require('./keys');
const User = require('../models/User');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    User.findById(jwtPayload.id)
      .then(user => {
        if(user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
  }));
};
