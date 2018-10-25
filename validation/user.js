const Joi = require('joi');

validateUser = value => {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(30)
      .required(),
    password: Joi.string()
      .min(8)
      .max(30)
      .required()
  };

  return Joi.validate(value, schema);
};

module.exports = validateUser;
