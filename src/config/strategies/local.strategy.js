const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');

function localStrategy() {
  passport.use(new Strategy( // set local strategy
    {
      usernameField: 'username', // username is the name attr of username field
      passwordField: 'password' // password is the name attr of the password field
    }, (username, password, done) => { // callback to run local strategy
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected');

          const db = client.db(dbName);

          const col = await db.collection('users');
          const user = await col.findOne({ username });

          if (user.password === password) {
            done(null, user); // set user as user and error as null
          } else {
            done(null, false); // set user as false since login failed and error as null
          }
        } catch (error) {
          debug(error.stack);
        }
        client.close();
      }());
    }
  ));
}

module.exports = localStrategy;
