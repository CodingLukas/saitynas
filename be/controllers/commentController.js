const Comment = require('../models/comment');
const validator = require('../utils/validator');

exports.getAllComments = async (req, res) => {
  const adId = req.params.adid;

  const comments = await Comment.getAllByAdId(adId); // Ensure to implement this function in your Comment model
  res.json(comments);
};

exports.getComment = async (req, res) => {
  const { adid, cid } = req.params;

  const comment = await Comment.get(cid);

  if (!comment || comment.adId !== adid) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  res.json(comment);
};

exports.createComment = async (req, res) => {
  const data = req.body;
  if (!validator.validateComment(data)) {
    return res.status(400).json({ error: 'Invalid data' });
  }
  const comment = await Comment.create({
    ...data,
    userId: req.decodedToken.userId,
    adId: req.params.adid,
  });
  res.status(201).json(comment);
};

exports.updateComment = async (req, res) => {
  const id = req.params.cid;
  const data = req.body;
  if (!validator.validateComment(data)) {
    return res.status(400).json({ error: 'Invalid data' });
  }
  const comment = await Comment.update(id, data);
  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  res.json(comment);
};

exports.deleteComment = async (req, res) => {
  const id = req.params.cid;
  const comment = await Comment.delete(id);
  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  res.json({ message: 'Comment deleted' });
};
