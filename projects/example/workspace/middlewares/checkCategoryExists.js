const admin = require('firebase-admin');
const db = admin.firestore();

module.exports = async (req, res, next) => {
  const categoryRef = db.collection('categories').doc(req.params.id);
  const doc = await categoryRef.get();
  if (!doc.exists) {
    res.status(404).send('Category not found');
  } else {
    next();
  }
};
