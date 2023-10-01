const validator = require('validator');

exports.validateCategory = (data) => {
  if (!data.name || !validator.isLength(data.name, { min: 1, max: 100 })) {
    return false;
  }
  return true;
};

exports.validateAd = (data) => {
  let errors = [];

  if (!data.title || !validator.isLength(data.title, { min: 1, max: 100 })) {
    errors.push({
      field: 'title',
      message: 'Title must be between 1 and 100 characters long.',
    });
  }

  if (
    !data.description ||
    !validator.isLength(data.description, { min: 1, max: 500 })
  ) {
    errors.push({
      field: 'description',
      message: 'Description must be between 1 and 500 characters long.',
    });
  }

  if (
    !data.price ||
    !validator.isNumeric(data.price.toString()) ||
    data.price <= 0
  ) {
    errors.push({
      field: 'price',
      message: 'Price must be a positive number.',
    });
  }

  return errors.length > 0 ? errors : null;
};

exports.validateComment = (data) => {
  if (!data.text || !validator.isLength(data.text, { min: 1, max: 500 })) {
    return false;
  }
  return true;
};
