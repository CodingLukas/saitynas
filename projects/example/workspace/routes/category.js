const express = require('express');
const categoryController = require('../controllers/categoryController');
const validateCategory = require('../middlewares/validateCategory');
const checkCategoryExists = require('../middlewares/checkCategoryExists');

const router = express.Router();

const auth = require('../middlewares/auth');

router.post(
  '/',
  auth.isAdmin,
  validateCategory,
  categoryController.createCategory
);
router.get('/:id', checkCategoryExists, categoryController.getCategory);
router.put(
  '/:id',
  auth.isAdmin,
  checkCategoryExists,
  validateCategory,
  categoryController.updateCategory
);
router.delete(
  '/:id',
  auth.isAdmin,
  checkCategoryExists,
  categoryController.deleteCategory
);
router.get('/', categoryController.getAllCategories);

module.exports = router;
