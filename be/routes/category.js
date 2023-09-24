const express = require('express');
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategory);
router.post('/', auth.admin, categoryController.createCategory);
router.put('/:id', auth.admin, categoryController.updateCategory);
router.delete('/:id', auth.admin, categoryController.deleteCategory);

module.exports = router;
