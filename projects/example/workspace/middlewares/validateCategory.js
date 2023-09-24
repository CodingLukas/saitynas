module.exports = (req, res, next) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string') {
    res.status(400).send('Invalid category data');
  } else {
    next();
  }
};
