// invenz-backend/src/middleware/error.js
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);

  // Default error
  let error = { ...err };
  error.message = err.message;

  // MySQL duplicate entry error
  if (err.code === 'ER_DUP_ENTRY') {
    const message = 'Duplicate entry. This record already exists.';
    return res.status(400).json({ success: false, message });
  }

  // MySQL foreign key error
  if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    const message = 'Referenced record does not exist.';
    return res.status(400).json({ success: false, message });
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid token. Please login again.' 
    });
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error'
  });
};

module.exports = errorHandler;