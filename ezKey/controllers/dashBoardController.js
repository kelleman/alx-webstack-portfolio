
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.dashBoard = async (req, res) => {
  try {
    const { userid, visitorsName } = req.body;

    // Set the expiration date to 5 hours from now
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 5);

    // Create a new Access code
    const newAccessCode = new AccessCode({ userid, expirationDate, visitorsName });

    // Create the access code by slicing the id to 6 characters
    newAccessCode.accessCode = newAccessCode._id.toString().slice(0, 6)

    const savedAccessCode = await newAccessCode.save();

    res.status(200).json({
      message: 'Access code created',
      accessCode: savedAccessCode.accessCode,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
