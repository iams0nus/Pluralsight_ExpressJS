const passport = require('passport');
require('./strategies/local.strategy')(); // execute local strategy

function passportConfig(app) {
  app.use(passport.initialize()); // passport initialize
  app.use(passport.session()); // use session to store user data

  // store session data
  passport.serializeUser((user, done) => {
    done(null, user); // call done to set error as null and user as user
  });

  // retrieve session data
  passport.deserializeUser((user, done) => {
    done(null, user); // retrieve eror as null and user as user
  });
}

module.exports = passportConfig;
