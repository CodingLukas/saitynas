const express = require('express');
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');
const check = require('../middleware/check');

const router = express.Router({ mergeParams: true });

router.get(
  '/',
  check.categoryExistsFromParams,
  check.adExistsFromParams,
  check.adBelongsToCategory,
  commentController.getAllComments
);
router.get(
  '/:cid',
  check.categoryExistsFromParams,
  check.adExistsFromParams,
  check.adBelongsToCategory,
  check.commentExistsFromParams,
  commentController.getComment
);
router.post(
  '/',
  auth.isValidJWT,
  check.categoryExistsFromParams,
  check.adExistsFromParams,
  check.adBelongsToCategory,
  commentController.createComment
);
router.put(
  '/:cid',
  auth.isValidJWT,
  check.categoryExistsFromParams,
  check.adExistsFromParams,
  check.adBelongsToCategory,
  check.commentExistsFromParams,
  check.commentBelongsToAd,
  check.commentOwnerOrAdmin,
  commentController.updateComment
);
router.delete(
  '/:cid',
  auth.isValidJWT,
  check.categoryExistsFromParams,
  check.adExistsFromParams,
  check.adBelongsToCategory,
  check.commentExistsFromParams,
  check.commentBelongsToAd,
  check.commentOwnerOrAdmin,
  commentController.deleteComment
);

module.exports = router;
