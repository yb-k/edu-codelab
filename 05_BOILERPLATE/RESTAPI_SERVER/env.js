var path = require("path");
var dotenv = require("dotenv");

if (process.env.NODE_ENV === "production") {
  dotenv.config(); // for .env
  dotenv.config({ path: path.join(__dirname, ".env.production") }); // for .env.production
} else if (process.env.NODE_ENV === "development") {
  dotenv.config(); // for .env
  dotenv.config({ path: path.join(__dirname, ".env.development") }); // for .env.development
} else {
  dotenv.config(); // for .env
}
