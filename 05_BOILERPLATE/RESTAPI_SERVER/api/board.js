const express = require("express");
const dbJson = require("../defualt");
const router = express.Router(dbJson.dbJson);
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(dbJson.dbJson);
const db = low(adapter);

// const isAuthorized = function (req, res) {
//   console.log("authentication check");
//   const token = req.headers["access-token"];
// };

router.use(function (req, res, next) {
  next();
});

/**
 * @method post
 * @path /getBoardList
 * @description 공지사항 목록 응답
 * */
router.post("/getBoardList", function (req, res) {
  const sendData = db.get("board").value();
  res.send(sendData);
});
/**
 * @method POST
 * @path /addBoardList
 * @description 공지사항 목록 추가
 */
router.post("/addBoardList", function (req, res) {
  const data = req.body;
  db.get("board").push(data).write();
  res.send(data);
});

/**
 * @method POST
 * @path /editTodo
 * @description 공지사항 수정
 * */
router.post("/editTodo", (req, res) => {
  const { id, username, title, content } = req.body;
  const target = db
    .get("todos")
    .find({ id })
    .merge({
      id,
      username,
      title,
      content,
    })
    .write();
  res.send(db.get("board").find({ id }).value());
});
/**
 * @method POST
 * @path /removeBoard
 * @description 공지사항 삭제
 * */
router.post("/removeBoard", (req, res) => {
  const { id } = req.body;
  db.get("board").remove({ id }).write();
  res.send(db.get("board").values());
});

module.exports = router;
