const admin = require('firebase-admin');
const Category = require('../models/category');
const Ad = require('../models/ad');
const db = admin.firestore();

exports.adExistsFromParams = async (req, res, next) => {
  const adRef = db.collection('ads').doc(req.params.adid);

  const doc = await adRef.get();
  if (!doc.exists) {
    res.status(404).send('ad not found');
  } else {
    req.ad = doc;
    next();
  }
};

exports.adBelongsToCategory = async (req, res, next) => {
  // console.log(req.ad.data().categoryId, req.params.id);
  if (req.ad.data().categoryId != req.params.id) {
    return res.status(404).send('ad does not belong to this category');
  }

  next();
};

exports.categoryExistsFromParams = async (req, res, next) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.get(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    req.category = category;
    next();
  } catch (error) {
    console.error('Error checking if category exists:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.adOwnerOrAdmin = async (req, res, next) => {
  const decodedToken = req.decodedToken;
  if (decodedToken) {
    const adRef = db.collection('ads').doc(req.params.adid);
    const doc = await adRef.get();
    if (!doc.exists) {
      res.status(404).send('ad not found');
      return;
    }
    // console.log(doc.data().userId, decodedToken.userId);
    if (
      doc.data().userId !== decodedToken.userId &&
      decodedToken.role !== 'admin'
    ) {
      res.status(403).send('Unauthorized uid');
      return;
    }
    next();
  } else {
    res.status(403).send('Unauthorized');
  }
};

exports.commentOwnerOrAdmin = async (req, res, next) => {
  const decodedToken = req.decodedToken;
  if (decodedToken) {
    const commentRef = db.collection('comments').doc(req.params.id);
    const doc = await commentRef.get();
    if (!doc.exists) {
      res.status(404).send('comment not found');
      return;
    }
    // console.log(doc.data().userId, decodedToken.userId);
    if (
      doc.data().userId !== decodedToken.userId &&
      decodedToken.role !== 'admin'
    ) {
      res.status(403).send('Unauthorized uid');
      return;
    }
    next();
  } else {
    res.status(403).send('Unauthorized');
  }
};
