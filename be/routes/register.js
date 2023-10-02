const express = require('express');
const bcrypt = require('bcryptjs');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const e = require('express');
const db = admin.firestore();

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Users will be assigned a 'user' role by default
    const role = 'user';

    const userRecord = await db.collection('users').add({
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      {
        userId: userRecord.id,
        email,
        role: 'user',
        iss: process.env.JWT_ISSUER,
        aud: process.env.JWT_AUDIENCE,
        auth_time: Math.floor(Date.now() / 1000),
        sub: email,
        iat: Math.floor(Date.now() / 1000),
      },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Unable to register user');
  }
});

module.exports = router;
