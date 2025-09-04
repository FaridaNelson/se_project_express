const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};
// 1) Create Clothing Item body
const validateCreateClothingItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
  }),
});

// 2) Create User body
const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatarUrl" field must be filled in',
      "string.uri": 'the "avatarUrl" field must be a valid url',
    }),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

// 3) Login body
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

// 4) IDs in route params (24-char hex)
const hexId = Joi.string().hex().length(24).required();

const validateUserIdParam = celebrate({
  params: Joi.object().keys({ userId: hexId }),
  headers: Joi.object().keys({}).unknown(true),
  query: Joi.object().keys({}),
});

const validateItemIdParam = celebrate({
  params: Joi.object().keys({ itemId: hexId }),
  headers: Joi.object().keys({}).unknown(true),
  query: Joi.object().keys({}),
});

module.exports = {
  validateCreateClothingItem,
  validateCreateUser,
  validateLogin,
  validateUserIdParam,
  validateItemIdParam,
};
