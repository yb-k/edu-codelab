const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

module.exports = {
  sign: (user) => {
    // access token 발급
    const payload = {
      // access token에 들어갈 payload
      username: user.username,
      name: user.name,
    };

    return jwt.sign(payload, secret, {
      // secret으로 sign하여 발급하고 return
      algorithm: "HS256", // 암호화 알고리즘
      expiresIn: "5m", // 유효기간
    });
  },
  verify: (token) => {
    // access token 검증
    let decoded = null;
    try {
      decoded = jwt.verify(token, secret);
      console.log(decoded);
      return {
        ok: true,
        username: decoded.username,
        name: decoded.name,
      };
    } catch (err) {
      console.log(err);
      return {
        ok: false,
        message: "access 만료!",
      };
    }
  },
  refresh: (username, name) => {
    // refresh token 발급
    return jwt.sign({ username, name }, secret, {
      // refresh token은 payload 없이 발급
      algorithm: "HS256",
      expiresIn: "14d",
    });
  },
  refreshVerify: async (refreshToken) => {
    try {
      try {
        const user = jwt.verify(refreshToken, secret);
        return {
          result: true,
          username: user.username,
          name: user.name,
        };
      } catch (err) {
        console.log(err);
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};
