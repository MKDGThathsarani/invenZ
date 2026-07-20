// ============================================
// ERROR HANDLER
// ============================================

/**
 * Application Error Handler
 * Centralized error handling for the application
 */

// Error Types
export const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  API: 'API_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  AUTH: 'AUTH_ERROR',
  PERMISSION: 'PERMISSION_ERROR',
  NOT_FOUND: 'NOT_FOUND_ERROR',
  SERVER: 'SERVER_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR'
};

/**
 * Get error type based on status code or error object
 */
export const getErrorType = (error) => {
  if (!error) return ERROR_TYPES.UNKNOWN;

  // Network errors
  if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
    return ERROR_TYPES.NETWORK;
  }

  // API errors with status codes
  if (error.response) {
    const status = error.response.status;
    if (status === 401) return ERROR_TYPES.AUTH;
    if (status === 403) return ERROR_TYPES.PERMISSION;
    if (status === 404) return ERROR_TYPES.NOT_FOUND;
    if (status >= 500) return ERROR_TYPES.SERVER;
    if (status === 422) return ERROR_TYPES.VALIDATION;
    return ERROR_TYPES.API;
  }

  return ERROR_TYPES.UNKNOWN;
};

/**
 * Get user-friendly error message
 */
export const getErrorMessage = (error) => {
  const type = getErrorType(error);

  const messages = {
    [ERROR_TYPES.NETWORK]: 'Network error. Please check your internet connection.',
    [ERROR_TYPES.API]: 'Something went wrong. Please try again later.',
    [ERROR_TYPES.VALIDATION]: 'Please check the form for errors.',
    [ERROR_TYPES.AUTH]: 'Your session has expired. Please login again.',
    [ERROR_TYPES.PERMISSION]: 'You do not have permission to perform this action.',
    [ERROR_TYPES.NOT_FOUND]: 'The requested resource was not found.',
    [ERROR_TYPES.SERVER]: 'Server error. Please try again later.',
    [ERROR_TYPES.UNKNOWN]: 'An unexpected error occurred.'
  };

  // Try to get message from error response
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.message) {
    return error.message;
  }

  return messages[type] || messages[ERROR_TYPES.UNKNOWN];
};

/**
 * Get error details for logging
 */
export const getErrorDetails = (error) => {
  return {
    type: getErrorType(error),
    message: getErrorMessage(error),
    status: error?.response?.status || null,
    data: error?.response?.data || null,
    stack: error?.stack || null,
    timestamp: new Date().toISOString()
  };
};

/**
 * Log error to console and/or analytics service
 */
export const logError = (error, context = {}) => {
  const details = getErrorDetails(error);
  
  console.error('=== ERROR LOG ===');
  console.error('Type:', details.type);
  console.error('Message:', details.message);
  console.error('Status:', details.status);
  console.error('Context:', context);
  console.error('Stack:', details.stack);
  console.error('================');
  
  // You can add analytics/error tracking here
  // e.g., Sentry, LogRocket, etc.
};

/**
 * Handle error with callback
 */
export const handleError = (error, callbacks = {}) => {
  const type = getErrorType(error);
  const message = getErrorMessage(error);

  // Call specific callback based on error type
  switch (type) {
    case ERROR_TYPES.AUTH:
      callbacks.onAuthError?.();
      break;
    case ERROR_TYPES.VALIDATION:
      callbacks.onValidationError?.(error);
      break;
    case ERROR_TYPES.NETWORK:
      callbacks.onNetworkError?.();
      break;
    case ERROR_TYPES.PERMISSION:
      callbacks.onPermissionError?.();
      break;
    default:
      callbacks.onGeneralError?.(error);
  }

  // Call general error callback
  callbacks.onError?.(error);

  return { type, message };
};

/**
 * Validation error formatter
 * Converts validation errors to form-friendly object
 */
export const formatValidationErrors = (error) => {
  if (!error?.response?.data?.errors) {
    return {};
  }

  const errors = error.response.data.errors;
  const formatted = {};

  Object.keys(errors).forEach(key => {
    formatted[key] = Array.isArray(errors[key]) ? errors[key][0] : errors[key];
  });

  return formatted;
};

/**
 * Create custom error
 */
export const createError = (message, type = ERROR_TYPES.UNKNOWN, status = null) => {
  const error = new Error(message);
  error.type = type;
  error.status = status;
  return error;
};

/**
 * Safe async function wrapper
 * Wraps async functions with error handling
 */
export const withErrorHandler = (asyncFn, callbacks = {}) => {
  return async (...args) => {
    try {
      return await asyncFn(...args);
    } catch (error) {
      handleError(error, callbacks);
      throw error;
    }
  };
};

export default {
  ERROR_TYPES,
  getErrorType,
  getErrorMessage,
  getErrorDetails,
  logError,
  handleError,
  formatValidationErrors,
  createError,
  withErrorHandler
};