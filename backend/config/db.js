const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);

mongoose
  .connect(DB, {})
  .then(() => {
    console.log("Databse is connected...");
  })
  .catch((err) => {
    console.log(`Error is ${err}`);
  });
