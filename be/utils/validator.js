const validator = require('validator');

exports.validateCategory = (data) => {
  if (!data.name || !validator.isLength(data.name, { min: 1, max: 100 })) {
    return false;
  }
  return true;
};

exports.validateAd = (data) => {
  if (!data.title || !validator.isLength(data.title, { min: 1, max: 100 })) {
    return false;
  }
  if (
    !data.description ||
    !validator.isLength(data.description, { min: 1, max: 500 })
  ) {
    return false;
  }
  if (!data.price || !validator.isNumeric(data.price)) {
    return false;
  }
  if (!data.categoryId || !validator.isLength(data.categoryId, { min: 1 })) {
    return false;
  }
  return true;
};

exports.validateComment = (data) => {
  if (!data.text || !validator.isLength(data.text, { min: 1, max: 500 })) {
    return false;
  }
  return true;
};
