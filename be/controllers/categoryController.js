const Ad = require('../models/ad');
const Category = require('../models/category');
const validator = require('../utils/validator');

exports.getAllCategories = async (req, res) => {
  const categories = await Category.getAll();
  res.json(categories);
};

exports.getCategory = async (req, res) => {
  const id = req.params.id;
  const category = await Category.get(id);
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  res.json(category);
};

exports.createCategory = async (req, res) => {
  const data = req.body;
  if (!validator.validateCategory(data)) {
    return res.status(400).json({ error: 'Invalid data' });
  }
  const category = await Category.create(data);
  res.status(201).json(category);
};

exports.updateCategory = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  if (!validator.validateCategory(data)) {
    return res.status(400).json({ error: 'Invalid data' });
  }
  const category = await Category.update(id, data);
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  res.json(category);
};

exports.deleteCategory = async (req, res) => {
  const id = req.params.id;
  let category = await Category.get(id);
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }

  const ads = await Ad.getAllByCategoryId(id);
  if (ads.length > 0) {
    // console.log(
    //   'ids ',
    //   ads.map((ad) => ad.id)
    // );
    return res
      .status(409)
      .json({ error: 'Category cannot be deleted until its ads are removed' });
  }

  await Category.delete(id);

  res.json({ message: 'Category deleted' });
};
