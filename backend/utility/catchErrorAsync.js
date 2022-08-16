const AppError = require("./AppError");

const catchErrorAsyncPro = (funksiya) => {
  const catchFunc = (req, res, next, Model, options, options2) => {
    funksiya(req, res, next, Model, options, options2).catch((err) => {
      next(new AppError(err.message, 404));
    });
  };
  return catchFunc;
};
const catchErrorAsync = (funksiya) => {
  const catchFunc = (req, res, next) => {
    funksiya(req, res, next).catch((err) => {
      next(new AppError(err.message, 404));
    });
  };
  return catchFunc;
};

module.exports = {
  catchErrorAsync,
  catchErrorAsyncPro,
};
