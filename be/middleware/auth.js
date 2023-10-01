const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const db = admin.firestore();

exports.isAdmin = async (req, res, next) => {
  try {
    const decodedToken = req.decodedToken;
    if (decodedToken.role === 'admin') {
      next();
    } else {
      res.status(403).send('Unauthorized');
    }
  } catch (error) {
    console.log('admin token: ' + error);
    res.status(401).send('Invalid token');
  }
};

exports.isValidJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({ error: 'token is required' });
  }

  try {
    // verifies exp date
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (decoded.iss !== process.env.JWT_ISSUER) {
      return res.status(401).json({ error: 'Invalid issuer' });
    }

    if (decoded.aud !== process.env.JWT_AUDIENCE) {
      return res.status(401).json({ error: 'Invalid audience' });
    }

    const userSnapshot = await db.collection('users').doc(decoded.userId).get();

    if (!userSnapshot.exists) {
      return res.status(401).send('Invalid token for snapshot');
    }

    const user = userSnapshot.data();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.decodedToken = decoded;
    next();
  } catch (error) {
    console.error('Error validating token:', error);

    return res.status(401).json({ error: 'Invalid token' });
  }
};
