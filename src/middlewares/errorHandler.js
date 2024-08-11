
export const errorHandler = (err, req, res, next) => {

  if (err.status === 400 && err.errors) {
    return res.status(400).json({
      message: 'Validation Error',
      errors: err.errors,
    });
  }

  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong',
    error: err.error || 'Internal Server Error',
  });
};