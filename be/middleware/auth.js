const admin = require('firebase-admin');

exports.admin = async (req, res, next) => {
  const idToken = req.headers.authorization;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (decodedToken.role === 'admin') {
      req.decodedToken = decodedToken;
      next();
    } else {
      res.status(403).send('Unauthorized');
    }
  } catch (error) {
    console.log(error);
    res.status(401).send('Invalid token');
  }
};

exports.user = async (req, res, next) => {
  const idToken = req.headers.authorization;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (decodedToken) {
      req.decodedToken = decodedToken;
      next();
    } else {
      res.status(403).send('Unauthorized');
    }
  } catch (error) {
    res.status(401).send('Invalid token');
  }
};
