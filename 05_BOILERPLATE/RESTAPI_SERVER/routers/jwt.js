const express = require("express");
const dbJson = require("../dbJson");
const router = express.Router(dbJson);
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(dbJson);
const db = low(adapter);
const jwtUtils = require("../jwt-util");

router.post("/login", (req, res) => {
  console.log("jwt 로그인 시도");
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);
  const target = db.get("users").find({ username }).value();
  console.log(target);
  if (username === target.username && password === target.password) {
    const accessToken = jwtUtils.sign(target);
    const refreshToken = jwtUtils.refresh(username, target.name);
    req.session.user = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    res
      .status(200)
      .send({ accessToken: accessToken, refreshToken: refreshToken });
    res.end();
  } else {
    res.end();
  }
});
/**
 * 1. accessToken만 만료 accessToken 재발급
 * 2. refreshToken도 만료 > 다시 로그인
 */
router.get("/refresh", (req, res) => {
  if (req.session.user) {
    const refreshToken = req.session.user.refreshToken; //
    jwtUtils.refreshVerify(refreshToken).then(function (decodeRefresh) {
      console.log(decodeRefresh);
      if (decodeRefresh.result === true) {
        const newAccessToken = jwtUtils.sign({
          username: decodeRefresh.username,
          name: decodeRefresh.name,
        });
        req.session.user = {
          accessToken: newAccessToken,
          refreshToken: refreshToken,
        };
        res.end();
      } else {
        res.status(403).send({ message: "login required" });
      }
    });
  }
});

router.post("/logout", (req, res) => {
  console.log("로그아웃");

  if (req.session.user) {
    console.log("로그아웃중입니다!");
    req.session.destroy((err) => {
      if (err) {
        console.log("세션 삭제시에 에러가 발생했습니다.");
        return;
      }
      console.log("세션이 삭제됐습니다.");
      res.redirect("/login.html");
    });
  } else {
    console.log("로그인이 안돼있으시네요?");
    res.redirect("/login.html");
  }
});

module.exports = router;
