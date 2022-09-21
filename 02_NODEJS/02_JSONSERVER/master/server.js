// server.js
const jsonServer = require("json-server");
// db.json를 조작하기 위해 lowdb를 사용
const low = require("lowdb");
// path
const path = require("path");
const FileSync = require("lowdb/adapters/FileSync");

const dbJson = path.resolve(__dirname, "db.json");
// express app 생성
const server = jsonServer.create();

// RESTFUL API 서버 구성을 위한 router 생성
const router = jsonServer.router(dbJson);

// json-server에서 제공되는 기본 미들웨어 생성
const middlewares = jsonServer.defaults();

// db 역할의 JSON파일과 동기화를 위한 어댑터
const adapter = new FileSync(dbJson);
const db = low(adapter);

// 기본 미들웨어 세팅 (logger, static, cors and no-cache)
server.use(middlewares);

// request 정보의 application/json 파싱을 위한 미들웨어 추가
server.use(jsonServer.bodyParser);

// 기본 RESTFUL 라우터 세팅 (db.json을 기준으로 REST한 API 라우트 필요시)

/**
 * @method POST
 * @path /getTodoList
 * @description 할일 목록 응답
 * */
server.post("/getTodoList", (req, res) => {
  const sendData = db.get("todos").value();
  res.send(sendData);
});

/**
 * @method POST
 * @path /addTodoList
 * @description 할일 목록 추가
 * */
server.post("/addTodoList", (req, res) => {
  const data = req.body;
  db.get("todos").push(data).write();

  res.send(data);
});

/**
 * @method POST
 * @path /editTodo
 * @description 할일 수정
 * */
server.post("/editTodo", (req, res) => {
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
server.post("/removeTodo", (req, res) => {
  const { id } = req.body;
  db.get("todos").remove({ id }).write();

  res.send(db.get("todos").values());
});

server.use(router);
// 3000 port로 서버 구동
server.listen(3000, () => {
  console.log("JSON Server is listening port - ", 3000);
});
