const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  // const token = req.header('Authorization');

  // if (!token) {
  //   console.log('Token not found in the request header');
  //   return res.status(401).json({ message: 'Authentication failed' });
  // }

  // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
  //   if (err) {
  //     console.log('Error verifying token:', err);
  //     return res.status(403).json({ message: 'Invalid token' });
  //   }

  //   req.userId = user.userId;
  //   next();
  // });

  const token = JSON.parse(req.cookies.Auth || false);
  if (!token) {
    console.log('Token not found in the request header');
    res.redirect(301, '/login');
    return res.status(401).json({ message: 'Authentication failed' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Error verifying token:');
      res.redirect(301, '/login');
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.userId = user.userId;
    next();
  })
};
