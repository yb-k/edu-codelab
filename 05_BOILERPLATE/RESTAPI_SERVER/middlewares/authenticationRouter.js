require("../env");
const { PORT, AUTHORIZATION, CORS } = process.env;

const authRouter = {
  session: require("./authSESSION"),
  jwt: require("./authJWT"),
};

module.exports = authRouter[AUTHORIZATION];
