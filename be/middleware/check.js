const admin = require('firebase-admin');
const db = admin.firestore();

exports.adExists = async (req, res, next) => {
  const adRef = db.collection('ads').doc(req.params.id);
  const doc = await adRef.get();
  if (!doc.exists) {
    res.status(404).send('ad not found');
  } else {
    req.ad = doc;
    next();
  }
};

exports.adExistsFromBody = async (req, res, next) => {
  const adRef = db.collection('ads').doc(req.body.adId);
  const doc = await adRef.get();
  if (!doc.exists) {
    res.status(404).send('ad not found');
  } else {
    req.ad = doc;
    next();
  }
};

exports.categoryExistsFromBody = async (req, res, next) => {
  const categoryRef = db.collection('categories').doc(req.body.categoryId);
  const doc = await categoryRef.get();
  if (!doc.exists) {
    res.status(404).send('Category not found');
  } else {
    next();
  }
};

exports.adOwner = async (req, res, next) => {
  const decodedToken = req.decodedToken;
  if (decodedToken) {
    const adRef = db.collection('ads').doc(req.params.id);
    const doc = await adRef.get();
    if (!doc.exists) {
      res.status(404).send('Ad not found');
      return;
    }
    console.log(doc.data().userId, decodedToken.uid);
    if (doc.data().userId !== decodedToken.uid) {
      res.status(403).send('Unauthorized uid');
      return;
    }
    next();
  } else {
    res.status(403).send('Unauthorized');
  }
};

exports.commentOwner = async (req, res, next) => {
  const decodedToken = req.decodedToken;
  if (decodedToken) {
    const commentRef = db.collection('comments').doc(req.params.id);
    const doc = await commentRef.get();
    if (!doc.exists) {
      res.status(404).send('comment not found');
      return;
    }
    console.log(doc.data().userId, decodedToken.uid);
    if (doc.data().userId !== decodedToken.uid) {
      res.status(403).send('Unauthorized uid');
      return;
    }
    next();
  } else {
    res.status(403).send('Unauthorized');
  }
};
