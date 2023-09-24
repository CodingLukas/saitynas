const admin = require('firebase-admin');
const db = admin.firestore();

exports.createCategory = async (req, res) => {
  const newCategory = req.body;
  const categoryRef = db.collection('categories').doc();
  await categoryRef.set(newCategory);
  res.status(201).send(`Created a new category: ${categoryRef.id}`);
};

exports.getCategory = async (req, res) => {
  const categoryRef = db.collection('categories').doc(req.params.id);
  const doc = await categoryRef.get();
  if (!doc.exists) {
    res.status(404).send('Category not found');
  } else {
    res.status(200).send(doc.data());
  }
};

exports.updateCategory = async (req, res) => {
  const categoryRef = db.collection('categories').doc(req.params.id);
  await categoryRef.update(req.body);
  res.status(200).send(`Updated the category: ${req.params.id}`);
};

exports.deleteCategory = async (req, res) => {
  const categoryRef = db.collection('categories').doc(req.params.id);
  await categoryRef.delete();
  res.status(200).send(`Deleted the category: ${req.params.id}`);
};

exports.getAllCategories = async (req, res) => {
  const categoriesRef = db.collection('categories');
  const snapshot = await categoriesRef.get();
  const categories = [];
  snapshot.forEach((doc) => {
    categories.push({ ...doc.data(), id: doc.id });
  });
  res.status(200).send(categories);
};
