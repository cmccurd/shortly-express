const session = require('../models/session.js');

const parseCookies = (req, res, next) => {
  var cookies = req.get('Cookie') || '';
  var splitObj = {};
  if (cookies === '') {
    req.cookies = splitObj;
  } else {
    cookies = cookies.split('; ');
    cookies.forEach((item) => {
      var temp1 = item.split('=');
      splitObj[temp1[0]] = temp1[1];
    });

    req.cookies = splitObj;

  }
  next();
};

module.exports = parseCookies;