const express = require('express');
const bcrypt = require('bcrypt');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const db = admin.firestore();

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await db
      .collection('users')
      .where('email', '==', email)
      .get();

    if (users.empty) {
      return res.status(401).send('Invalid email or password');
    }

    const user = users.docs[0].data();

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send('Invalid email or password');
    }

    const token = jwt.sign(
      {
        userId: users.docs[0].id,
        email: user.email,
        role: user.role,
        iss: process.env.JWT_ISSUER,
        aud: process.env.JWT_AUDIENCE,
        auth_time: Math.floor(Date.now() / 1000),
        sub: user.email,
        iat: Math.floor(Date.now() / 1000),
      },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    await db.collection('users').doc(users.docs[0].id).update({
      jwtToken: token,
    });

    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Error during login');
  }
});

module.exports = router;
