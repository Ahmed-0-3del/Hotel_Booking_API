export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // لو اللي جاي من Joi بيكون Array، فهنتعامل معاه
  const message = Array.isArray(err.message) ? err.message : [err.message];

  res.status(statusCode).json({
    success: false,
    message
  });
};