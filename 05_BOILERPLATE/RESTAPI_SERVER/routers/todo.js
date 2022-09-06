const express = require("express");
const dbJson = require("../dbJson");
const router = express.Router(dbJson);
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(dbJson);
const db = low(adapter);
const authenticationRouter = require("../middlewares/authenticationRouter");

router.use(function (req, res, next) {
  next();
});

/**
 * @method POST
 * @path /getTodoList
 * @description 할일 목록 응답
 * */
router.post("/getTodoList", (req, res) => {
  const sendData = db.get("todos").value();
  res.send(sendData);
});
router.post("/*", authenticationRouter);
/**
 * @method POST
 * @path /addTodoList
 * @description 할일 목록 추가
 * */
router.post("/addTodoList", (req, res) => {
  const data = req.body;
  db.get("todos").push(data).write();
  res.send(data);
});

/**
 * @method POST
 * @path /editTodo
 * @description 할일 수정
 * */
router.post("/editTodo", (req, res) => {
  const { id, content, completed } = req.body;
  const target = db
    .get("todos")
    .find({ id })
    .merge({
      id,
      content,
      completed,
    })
    .write();
  res.send(db.get("todos").find({ id }).value());
});
/**
 * @method POST
 * @path /removeTodo
 * @description 할일 삭제
 * */
router.post("/removeTodo", (req, res) => {
  const { id } = req.body;
  db.get("todos").remove({ id }).write();
  res.send(db.get("todos").values());
});

module.exports = router;
