const express = require("express");
const dbJson = require("../defualt");
const router = express.Router(dbJson.dbJson);
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(dbJson.dbJson);
const db = low(adapter);

/** session login */
router.post("/login", (req, res) => {
  console.log("session 로그인 시도");
  const username = req.body.username;
  const password = req.body.password;
  const target = db.get("users").find({ username }).value();
  if (target.username === username && target.password === password) {
    console.log("session 로그인 성공");
    console.log(username, password);
    req.session.user = {
      username: username,
      password: password,
      name: target.name,
    };
    res.end();
  }
});

router.get("/logout", (req, res) => {
  console.log("로그아웃");
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        console.log("세션 삭제시에 에러가 발생했습니다.");
        return;
      }
      res.redirect("/");
    });
  } else {
    console.log("로그인이 안돼있으시네요?");
    res.redirect("/");
  }
});

module.exports = router;
