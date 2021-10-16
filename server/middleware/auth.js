const models = require('../models');
const Promise = require('bluebird');
const Parser = require('./cookieParser.js');

module.exports.createSession = (req, res, next) => {

  models.Sessions.create()
    .then((value) => {
      models.Sessions.get({ id: value.insertId })
        .then((val) => {
          // val.username = value.username;
          models.Users.get({ id: value.insertId })
            .then((userInfo) => {
              // console.log('VAL.user.username', val);
              // console.log('value.username', value.username);
              val['user'] = { 'username': userInfo.username };
              val.userId = value.insertId;
              console.log('val INSIDE USers Then: ', val);
              // val.user.username = value.username;
              // done();
              req.session = val;
              res.cookies = {};
              res.cookies['shortlyid'] = { 'value': val.hash };
              // next();
            })
            .catch((err) => {
              // console.error('Err inside users.get: ', err);
              done();
            });
          // expect(session.user.username).to.eq(username);
          // expect(session.userId).to.eq(userId);
          // val.userId = value.insertId;
          // console.log('Right before session: ', val);
          req.session = val;
          res.cookies = {};
          res.cookies['shortlyid'] = { 'value': val.hash };
          next();
        })
        .catch((err) => {
          console.error('inside get :', err);
          done();
        });
    })
    .catch((err) => {
      console.error('outside get: ', err);
      done();
    });
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

