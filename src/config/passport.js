const passport = require('passport');
require('./strategies/local.strategy')();

function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // store session data
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // retrieve session data
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}

module.exports = passportConfig;
