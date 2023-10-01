const Comment = require('../models/comment');
const validator = require('../utils/validator');

exports.getAllComments = async (req, res) => {
  const comments = await Comment.getAll();
  res.json(comments);
};

exports.getComment = async (req, res) => {
  const id = req.params.id;
  const comment = await Comment.get(id);
  if (!comment) {
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
  });
  res.status(201).json(comment);
};

exports.updateComment = async (req, res) => {
  const id = req.params.id;
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
  const id = req.params.id;
  const comment = await Comment.delete(id);
  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  res.json({ message: 'Comment deleted' });
};
