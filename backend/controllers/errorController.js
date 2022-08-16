const errController = (err, req, res, next) => {
  const message = err.message || "Not Found";
  const statusCode = err.statusCode || 404;
  const status = err.status || "Error";
  const error = err.stack || "";

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(statusCode).json({
      status,
      message,
      error,
    });
  } else if (process.env.NODE_ENV === "PRODUCTION") {
    res.status(statusCode).json({
      status,
      message,
    });
  }
  next();
};

module.exports = errController;
