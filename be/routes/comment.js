const express = require('express');
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');
const check = require('../middleware/check');

const router = express.Router();

router.get('/', commentController.getAllComments); // get by ad id
router.get('/:id', commentController.getComment);
router.post(
  '/',
  auth.user,
  check.adExistsFromBody,
  commentController.createComment
);
router.put('/:id', auth.user, commentController.updateComment);
router.delete('/:id', auth.user, commentController.deleteComment);

module.exports = router;
