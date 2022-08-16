const env = require("dotenv").config({ path: "./config.env" });
require("./config/db");
const app = require("./middleware/app");

app.listen(process.env.PORT, process.env.SERVER_URL, () => {
  console.log(`Api is listened on ${process.env.PORT} `);
});
