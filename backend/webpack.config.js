const path = require("path");

module.exports = {
  entry: "./public/assets/js/index.js",
  output: {
    path: path.resolve(__dirname, "./public/assets/js"),
    filename: "bundle.js",
  },
};
