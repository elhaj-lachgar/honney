

const ErrorMiddleware = (err, req, res, next) => {
  const error = {};
  const env = process.env.NODE_ENV;
  if (env == "dev") {
    error.error = err.message;
    error.stack = err.stack;
    error.status = err.status;
  } else {
    error.error = err.message;
    error.status = err.status;
  }

  return res.status(err.StatusCode || 500).json({ ...error });
};

export default ErrorMiddleware;
