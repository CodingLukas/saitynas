const validator = require('validator');

const validateRegisterFields = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !validator.isEmail(email)) {
    return res.status(422).json({ error: 'A valid email is required' });
  }

  if (!password || password.trim().length < 6) {
    return res
      .status(422)
      .json({ error: 'Password should be at least 6 characters long' });
  }

  next();
};

const validateLoginFields = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !validator.isEmail(email)) {
    return res.status(422).json({ error: 'A valid email is required' });
  }

  if (!password) {
    return res.status(422).json({ error: 'Password is required' });
  }

  next();
};

module.exports = { validateRegisterFields, validateLoginFields };
