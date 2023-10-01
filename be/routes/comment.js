const express = require('express');
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');
const check = require('../middleware/check');

const router = express.Router();

router.get('/', commentController.getAllComments); // get by ad id
router.get('/:id', commentController.getComment);
router.post(
  '/',
  auth.isValidJWT,
  check.adExistsFromParams,
  commentController.createComment
);
router.put('/:id', auth.isValidJWT, commentController.updateComment);
router.delete('/:id', auth.isValidJWT, commentController.deleteComment);

module.exports = router;
