// ============================================
// VALIDATORS - Form Validation Functions
// ============================================

import * as v from './validator';

/**
 * Create validation rule
 */
export const createRule = (validate, message) => ({
  validate,
  message
});

/**
 * Common validation rules
 */
export const rules = {
  required: (message = 'This field is required') => 
    createRule(v.isRequired, message),
  
  email: (message = 'Please enter a valid email address') => 
    createRule(v.isValidEmail, message),
  
  phone: (message = 'Please enter a valid phone number') => 
    createRule(v.isValidPhone, message),
  
  url: (message = 'Please enter a valid URL') => 
    createRule(v.isValidURL, message),
  
  sku: (message = 'Please enter a valid SKU') => 
    createRule(v.isValidSKU, message),
  
  number: (message = 'Please enter a valid number') => 
    createRule(v.isNumber, message),
  
  integer: (message = 'Please enter a valid integer') => 
    createRule(v.isInteger, message),
  
  min: (min, message = `Value must be at least ${min}`) => 
    createRule((value) => v.isInRange(value, min, Infinity), message),
  
  max: (max, message = `Value must be at most ${max}`) => 
    createRule((value) => v.isInRange(value, -Infinity, max), message),
  
  range: (min, max, message = `Value must be between ${min} and ${max}`) => 
    createRule((value) => v.isInRange(value, min, max), message),
  
  minLength: (length, message = `Must be at least ${length} characters`) => 
    createRule((value) => v.isMinLength(value, length), message),
  
  maxLength: (length, message = `Must be at most ${length} characters`) => 
    createRule((value) => v.isMaxLength(value, length), message),
  
  matches: (match, field, message = `Must match ${field}`) => 
    createRule((value) => v.matches(value, match), message),
  
  date: (message = 'Please enter a valid date') => 
    createRule(v.isValidDate, message),
  
  pastDate: (message = 'Date must be in the past') => 
    createRule(v.isPastDate, message),
  
  futureDate: (message = 'Date must be in the future') => 
    createRule(v.isFutureDate, message),
  
  price: (message = 'Please enter a valid price') => 
    createRule(v.isValidPrice, message),
  
  stock: (message = 'Please enter a valid stock quantity') => 
    createRule(v.isValidStockQuantity, message),
  
  rating: (message = 'Rating must be between 0 and 5') => 
    createRule(v.isValidRating, message)
};

/**
 * Validate a single field
 */
export const validateField = (value, rules) => {
  if (!Array.isArray(rules)) {
    rules = [rules];
  }

  for (const rule of rules) {
    if (!rule.validate(value)) {
      return rule.message;
    }
  }
  return null;
};

/**
 * Validate multiple fields
 */
export const validateForm = (data, schema) => {
  const errors = {};
  let isValid = true;

  Object.keys(schema).forEach((field) => {
    const value = data[field];
    const fieldRules = schema[field];
    const error = validateField(value, fieldRules);
    
    if (error) {
      errors[field] = error;
      isValid = false;
    }
  });

  return { isValid, errors };
};

/**
 * Create a validator for a form
 */
export const createValidator = (schema) => {
  return {
    validate: (data) => validateForm(data, schema),
    validateField: (field, value) => validateField(value, schema[field] || [])
  };
};

/**
 * Common form schemas
 */
export const schemas = {
  // Login form
  login: {
    email: [rules.required('Email is required'), rules.email()],
    password: [rules.required('Password is required'), rules.minLength(6, 'Password must be at least 6 characters')]
  },

  // Registration form
  register: {
    name: [rules.required('Name is required'), rules.minLength(2, 'Name must be at least 2 characters')],
    email: [rules.required('Email is required'), rules.email()],
    password: [rules.required('Password is required'), rules.minLength(6, 'Password must be at least 6 characters')],
    confirmPassword: [rules.required('Please confirm your password'), rules.matches((value) => value, 'password', 'Passwords do not match')]
  },

  // Product form
  product: {
    name: [rules.required('Product name is required')],
    sku: [rules.required('SKU is required'), rules.sku()],
    categoryId: [rules.required('Category is required')],
    supplierId: [rules.required('Supplier is required')],
    purchasePrice: [rules.price('Please enter a valid purchase price')],
    sellingPrice: [rules.price('Please enter a valid selling price')],
    currentStock: [rules.stock('Please enter a valid stock quantity')],
    minStock: [rules.stock('Please enter a valid minimum stock level')],
    maxStock: [rules.stock('Please enter a valid maximum stock level')]
  },

  // Supplier form
  supplier: {
    name: [rules.required('Supplier name is required')],
    email: [rules.email()],
    phone: [rules.phone()],
    website: [rules.url()],
    rating: [rules.rating()]
  },

  // Purchase Order form
  purchaseOrder: {
    supplierId: [rules.required('Supplier is required')],
    orderDate: [rules.required('Order date is required')],
    items: [rules.required('At least one item is required')]
  },

  // Stock Adjustment form
  stockAdjustment: {
    productId: [rules.required('Product is required')],
    quantity: [rules.required('Quantity is required'), rules.min(1, 'Quantity must be at least 1')],
    reason: [rules.required('Reason is required')]
  }
};

export default {
  rules,
  validateField,
  validateForm,
  createValidator,
  schemas
};