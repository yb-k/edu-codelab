const express = require("express");
const dbJson = require("../dbJson");
const router = express.Router(dbJson);
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(dbJson);
const db = low(adapter);

const authSESSION = (req, res, next) => {
  if (req.session.user) {
    const user = req.session.user;
    const target = db.get("users").find({ username: user.username }).value();
    if (target.username === user.username && target.name === user.name) {
      req.session.user = {
        username: target.username,
        name: target.name,
      };
      next();
    } else {
      res.status(401).send({
        ok: false,
        message: "로그인이 필요합니다.",
      });
    }
  }
};

module.exports = authSESSION;
