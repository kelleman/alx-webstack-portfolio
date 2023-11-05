
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AccessCode = require('../models/accessModel');

exports.createAccess = async (req, res) => {
  try {
    const {visitorsName, duration } = req.body;

    const token = JSON.parse(req.cookies.Auth || '{}');
    const user = jwt.verify(token, process.env.JWT_SECRET)
    const userid = user.userId
    // Set the expiration date to 5 hours from now
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + Number(duration));

    // Create a new Access code
    const newAccessCode = new AccessCode({ userid, expirationDate, visitorsName });

    // Create the access code by slicing the id to 6 characters
    newAccessCode.accessCode = newAccessCode._id.toString().slice(6, 12)

    const savedAccessCode = await newAccessCode.save();

    res.status(200).json({
      message: 'Access code created',
      visitorsName: savedAccessCode.visitorsName,
      accessCode: savedAccessCode.accessCode,
      expirationDate: savedAccessCode.expirationDate,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.validateAcces = async (req, res) => {
  try {
    const { accessCode } = req.body;

    // Retrive access code
    const getAccessCode = await AccessCode.findOne({ accessCode });

    if (!getAccessCode) {
      return res.status(401).json({ message: 'Invallied access code' });
    }

    // Compare the current date with the expiration date
    const currentDate = new Date();
    if (currentDate > getAccessCode.expirationDate) {
      return res.status(401).json({ message: 'Access code has expired' });
    }

    res.status(200).json({
      message: 'Access code is valid',
      expirationDate: getAccessCode.expirationDate,
      visitorsName: getAccessCode.visitorsName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



