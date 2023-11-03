
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.dashBoard = async (req, res) => {
  res.render('dashboard');
};
