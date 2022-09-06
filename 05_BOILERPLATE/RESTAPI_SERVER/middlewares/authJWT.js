const jwtUtils = require("../jwt-util");

const authJWT = (req, res, next) => {
  if (req.session.user) {
    const accessToken = req.session.user.accessToken;
    const isAccessTokenValid = jwtUtils.verify(accessToken); // accessToken 검증
    if (isAccessTokenValid.ok) {
      // token이 검증되었으면 req에 값을 세팅하고, 다음 콜백함수로 갑니다.

      next();
    } else {
      res.status(403).send({
        // accessToken Expired = 403
        ok: false,
        message: "token refresh required",
      });
    }
  }
};

module.exports = authJWT;
