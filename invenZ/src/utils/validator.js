// ============================================
// VALIDATOR - Individual Validation Functions
// ============================================

import { PATTERNS } from './constants';

/**
 * Check if value is required (not empty)
 */
export const isRequired = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

/**
 * Check if value is a valid email
 */
export const isValidEmail = (email) => {
  if (!email) return true; // Allow empty (use with isRequired for mandatory)
  return PATTERNS.EMAIL.test(email);
};

/**
 * Check if value is a valid phone number
 */
export const isValidPhone = (phone) => {
  if (!phone) return true;
  return PATTERNS.PHONE.test(phone);
};

/**
 * Check if value is a valid URL
 */
export const isValidURL = (url) => {
  if (!url) return true;
  return PATTERNS.URL.test(url);
};

/**
 * Check if value is a valid SKU
 */
export const isValidSKU = (sku) => {
  if (!sku) return true;
  return PATTERNS.SKU.test(sku);
};

/**
 * Check if value is a valid tax number
 */
export const isValidTaxNumber = (taxNumber) => {
  if (!taxNumber) return true;
  return PATTERNS.TAX_NUMBER.test(taxNumber);
};

/**
 * Check if value is a number
 */
export const isNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

/**
 * Check if value is an integer
 */
export const isInteger = (value) => {
  return Number.isInteger(Number(value));
};

/**
 * Check if value is within range
 */
export const isInRange = (value, min, max) => {
  const num = parseFloat(value);
  if (isNaN(num)) return false;
  return num >= min && num <= max;
};

/**
 * Check if value is a valid date
 */
export const isValidDate = (date) => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
};

/**
 * Check if date is in the past
 */
export const isPastDate = (date) => {
  if (!isValidDate(date)) return false;
  return new Date(date) < new Date();
};

/**
 * Check if date is in the future
 */
export const isFutureDate = (date) => {
  if (!isValidDate(date)) return false;
  return new Date(date) > new Date();
};

/**
 * Check if value meets minimum length
 */
export const isMinLength = (value, length) => {
  if (!value) return false;
  return String(value).length >= length;
};

/**
 * Check if value meets maximum length
 */
export const isMaxLength = (value, length) => {
  if (!value) return true;
  return String(value).length <= length;
};

/**
 * Check if value matches a pattern
 */
export const matchesPattern = (value, pattern) => {
  if (!value) return true;
  return pattern.test(value);
};

/**
 * Check if two values match (e.g., password confirmation)
 */
export const matches = (value, matchValue) => {
  return value === matchValue;
};

/**
 * Check if value is a valid file type
 */
export const isValidFileType = (file, allowedTypes) => {
  if (!file) return true;
  return allowedTypes.includes(file.type);
};

/**
 * Check if file size is within limit
 */
export const isValidFileSize = (file, maxSize) => {
  if (!file) return true;
  return file.size <= maxSize;
};

/**
 * Check if value is a valid stock quantity
 */
export const isValidStockQuantity = (value) => {
  const num = parseInt(value);
  return !isNaN(num) && num >= 0 && Number.isInteger(num);
};

/**
 * Check if value is a valid price
 */
export const isValidPrice = (value) => {
  const num = parseFloat(value);
  return !isNaN(num) && num >= 0;
};

/**
 * Check if value is a valid rating (0-5)
 */
export const isValidRating = (value) => {
  const num = parseFloat(value);
  return !isNaN(num) && num >= 0 && num <= 5;
};

export default {
  isRequired,
  isValidEmail,
  isValidPhone,
  isValidURL,
  isValidSKU,
  isValidTaxNumber,
  isNumber,
  isInteger,
  isInRange,
  isValidDate,
  isPastDate,
  isFutureDate,
  isMinLength,
  isMaxLength,
  matchesPattern,
  matches,
  isValidFileType,
  isValidFileSize,
  isValidStockQuantity,
  isValidPrice,
  isValidRating
};