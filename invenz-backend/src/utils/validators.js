// invenz-backend/src/utils/validators.js
const Joi = require('joi');

// Register validation
const validateRegister = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().allow('').optional()
  });
  return schema.validate(data);
};

// Login validation
const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });
  return schema.validate(data);
};

// Product validation
const validateProduct = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(200).required(),
    sku: Joi.string().min(3).max(50).required(),
    description: Joi.string().allow('').optional(),
    category_id: Joi.number().integer().allow(null).optional(),
    supplier_id: Joi.number().integer().allow(null).optional(),
    purchase_price: Joi.number().min(0).default(0),
    selling_price: Joi.number().min(0).default(0),
    min_stock_level: Joi.number().integer().min(0).default(5),
    max_stock_level: Joi.number().integer().min(0).default(100),
    current_stock: Joi.number().integer().min(0).default(0),
    unit: Joi.string().default('pcs'),
    barcode: Joi.string().allow('').optional(),
    image: Joi.string().allow('').optional()
  });
  return schema.validate(data);
};

module.exports = {
  validateRegister,
  validateLogin,
  validateProduct
};