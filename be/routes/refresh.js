const express = require('express');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const db = admin.firestore();

const router = express.Router();

router.post('/', async (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token is required' });
  }

  try {
    // verifies exp date
    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY);

    if (decoded.iss !== process.env.JWT_ISSUER) {
      return res.status(401).json({ error: 'Invalid issuer' });
    }

    if (decoded.aud !== process.env.JWT_AUDIENCE) {
      return res.status(401).json({ error: 'Invalid audience' });
    }

    const userSnapshot = await db.collection('users').doc(decoded.userId).get();

    if (!userSnapshot.exists) {
      return res.status(401).send('Invalid token');
    }

    const user = userSnapshot.data();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newToken = jwt.sign(
      {
        userId: decoded.userId,
        email: decoded.email,
        role: user.role,
        iss: process.env.JWT_ISSUER,
        aud: process.env.JWT_AUDIENCE,
        auth_time: decoded.auth_time,
        sub: decoded.email,
        iat: Math.floor(Date.now() / 1000),
      },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    return res.json({ token: newToken });
  } catch (error) {
    console.error('Error validating refresh token:', error);

    return res.status(401).json({ error: 'Invalid refresh token' });
  }
});

module.exports = router;
