const admin = require('firebase-admin');
const db = admin.firestore();

const checkDuplicateEmail = async (req, res, next) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const usersSnapshot = await db
      .collection('users')
      .where('email', '==', email)
      .get();

    if (!usersSnapshot.empty) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    next();
  } catch (error) {
    console.error('Error checking duplicate email:', error);
    res.status(500).send('Error occurred while checking email uniqueness');
  }
};

module.exports = checkDuplicateEmail;
