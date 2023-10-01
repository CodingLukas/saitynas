const express = require('express');
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategory);
router.post(
  '/',
  auth.isValidJWT,
  auth.isAdmin,
  categoryController.createCategory
);
router.put(
  '/:id',
  auth.isValidJWT,
  auth.isAdmin,
  categoryController.updateCategory
);
router.delete(
  '/:id',
  auth.isValidJWT,
  auth.isAdmin,
  categoryController.deleteCategory
);

module.exports = router;
