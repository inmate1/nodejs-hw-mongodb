
export const errorHandler = (err, req, res, next) => {
console.error('Error:', err);
  if (err.status === 400 && err.errors) {
    return res.status(400).json({
      status: 400,
      message: 'Validation Error',
      errors: err.errors,
    });
  }

  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || 'Something went wrong',
    errors: err.errors || 'Internal Server Error',
  });
};