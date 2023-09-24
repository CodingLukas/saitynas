const admin = require('firebase-admin');

exports.isAdmin = async (req, res, next) => {
  const idToken = req.headers.authorization;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (decodedToken.role === 'admin') {
      next();
    } else {
      res.status(403).send('Unauthorized');
    }
  } catch (error) {
    res.status(401).send('Invalid token');
  }
};
