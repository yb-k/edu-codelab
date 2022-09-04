require("./env");
const { PORT } = process.env;
// app.js
const jsonServer = require("json-server");
// db.json를 조작하기 위해 lowdb를 사용
const low = require("lowdb");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
// path
const path = require("path");
const FileSync = require("lowdb/adapters/FileSync");

const dbJson = path.resolve(__dirname, "db.json");
// express app 생성
const app = jsonServer.create();

// RESTFUL API 서버 구성을 위한 router 생성
const router = jsonServer.router(dbJson);
// json server auth
const auth = require("json-server-auth");
// cors
const cors = require("cors");
// JWT
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY =
  require("json-server-auth/dist/constants").JWT_SECRET_KEY;
const expiresIn = "1h";
// json-server에서 제공되는 기본 미들웨어 생성
const middlewares = jsonServer.defaults();

// db 역할의 JSON파일과 동기화를 위한 어댑터
const adapter = new FileSync(dbJson);
const db = low(adapter);

app.use(cookieParser());
app.use(
  expressSession({
    secret: "mysession",
    resave: true,
    saveUninitialized: true,
  })
);

// 기본 미들웨어 세팅 (logger, static, cors and no-cache)
app.use(middlewares);

// request 정보의 application/json 파싱을 위한 미들웨어 추가
app.use(jsonServer.bodyParser);

app.post("/process/login", (req, res) => {
  console.log("로그인 함수가 실행됩니다.");

  const paramID = req.body.id || req.query.id;
  const pw = req.body.password || req.query.password;

  if (req.session.user) {
    // 세션에 유저가 존재한다면
    res.end();
  } else {
    req.session.user = {
      id: paramID,
      pw: pw,
      name: "UsersNames!!!!!",
      authorized: true,
    };
    res.end();
  }
});

app.post("/process/token", (req, res) => {
  const id = req.body.id;
  const pw = req.body.password;
  console.log(id, pw);
  const target = db.get("users").find({ username: id }).value();
  console.log(target);
  if (id === target.username && pw === target.password) {
    const access_token = jwt.sign({ id, pw }, JWT_SECRET_KEY, { expiresIn });
    res.status(200).json({ access_token });
  }
});

app.get("/process/logout", (req, res) => {
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

/**
 * @method POST
 * @path /getBoardList
 * @description 공지사항 목록 응답
 * */
app.post("/board/getBoardList", (req, res) => {
  const sendData = db.get("board").value();
  res.send(sendData);
});

/**
 * @method POST
 * @path /addBoardList
 * @description 공지사항 목록 추가
 * */
app.post("/addBoardList", (req, res) => {
  const data = req.body;
  db.get("board").push(data).write();

  res.send(data);
});

/**
 * @method POST
 * @path /editTodo
 * @description 공지사항 수정
 * */
app.post("/editTodo", (req, res) => {
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
app.post("/removeBoard", (req, res) => {
  const { id } = req.body;
  db.get("board").remove({ id }).write();

  res.send(db.get("board").values());
});

/**
 * @method POST
 * @path /getTodoList
 * @description 할일 목록 응답
 * */
app.post("/getTodoList", (req, res) => {
  const sendData = db.get("todos").value();
  res.send(sendData);
});

/**
 * @method POST
 * @path /addTodoList
 * @description 할일 목록 추가
 * */
app.post("/addTodoList", (req, res) => {
  const data = req.body;
  db.get("todos").push(data).write();

  res.send(data);
});

/**
 * @method POST
 * @path /editTodo
 * @description 할일 수정
 * */
app.post("/editTodo", (req, res) => {
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
app.post("/removeTodo", (req, res) => {
  const { id } = req.body;
  db.get("todos").remove({ id }).write();

  res.send(db.get("todos").values());
});

app.get(`/users/me`, auth, (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).jsonp("Missing authorization header");
    return;
  }
  const [scheme, token] = authorization.split(" ");
  if (scheme !== "Bearer") {
    res.status(401).jsonp("Incorrect authorization scheme");
    return;
  }
  if (!token) {
    res.status(401).jsonp("Missing token");
    return;
  }

  try {
    const data = jwt.verify(token, JWT_SECRET_KEY);
    const { db } = req.app;
    // ... 은 그냥 나머지 property들
    const { id, username, password, name, role } = db
      .get("users")
      .find({ username: data.username, password: data.password })
      .value();
    res.status(200).json({ id, username, password, name, role });
  } catch (err) {
    res.status(401).jsonp(err.message);
  }
});

// app.use(router);
// 3000 port로 서버 구동
app.listen(PORT, () => {
  console.log("JSON Server is listening port - ", PORT);
});
