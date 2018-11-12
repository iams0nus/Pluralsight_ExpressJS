const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
      debug(req.body);
      const { username, password } = req.body; // body-parser frames the req.body
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected');

          const db = client.db(dbName);

          const col = await db.collection('users');
          const user = { username, password };
          const result = await col.insertOne(user);

          req.login(result.ops[0], () => { // passport creates req.login and req.logout methods
            // which takes the usera nd the callback
            res.redirect('/auth/profile');
          });
        } catch (error) {
          debug(error.stack);
        }
        client.close();
      }());
    });

  authRouter.route('/signIn')
    .post(passport.authenticate('local', { // authenticate using local strategy
      successRedirect: '/auth/profile', // redirect to profile if login success
      failureRedirect: '/' // else back to home
    }));

  authRouter.route('/profile')
    .all((req, res, next) => { // middleware to intercept direct access of profile
      // without passport login
      if (req.user) { // if user exists, created by passport
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);// return json data
    });
  return authRouter;
}

module.exports = router;
