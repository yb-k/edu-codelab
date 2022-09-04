const express = require("express");
const dbJson = require("../defualt");
const router = express.Router(dbJson.dbJson);
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(dbJson.dbJson);
const db = low(adapter);

const jwt = require("../jwt-util");

router.post("/login", (req, res) => {
  console.log("jwt 로그인 시도");
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);
  const target = db.get("users").find({ username }).value();
  console.log(target);
  if (username === target.username && password === target.password) {
    const accessToken = jwt.sign(targer);
    const refreshToken = jwt.refresh();

    redisClient.set(targer.username, refreshToken);
    res.status(200).send({
      ok: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } else {
    res.status(401).send({
      ok: false,
      message: "password is incorrect",
    });
  }
});

router.get("/logout", (req, res) => {
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
