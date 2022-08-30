require('./env');
const { PORT } = process.env;
// app.js
const jsonServer = require('json-server');
// db.json를 조작하기 위해 lowdb를 사용
const low = require('lowdb');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
// path
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');

const dbJson = path.resolve(__dirname, 'db.json');
// express app 생성
const app = jsonServer.create();

// RESTFUL API 서버 구성을 위한 router 생성
const router = jsonServer.router(dbJson);

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

// 기본 RESTFUL 라우터 세팅 (db.json을 기준으로 REST한 API 라우트 필요시)


app.post("/process/login", (req, res) => {
  console.log("로그인 함수가 실행됩니다.");

  console.log(req.body.data);
  console.log(req.password);

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
 * @path /getTodoList
 * @description 할일 목록 응답
 * */
app.post('/getTodoList', (req, res) => {
  const sendData = db.get('todos').value();
  res.send(sendData);
});

/**
 * @method POST
 * @path /addTodoList
 * @description 할일 목록 추가
 * */
 app.post('/addTodoList', (req, res) => {
  const data = req.body;
  db.get('todos')
    .push(data)
    .write();

  res.send(data);
});

/**
 * @method POST
 * @path /editTodo
 * @description 할일 수정
 * */
 app.post('/editTodo', (req, res) => {
  const { id, content, completed } = req.body;
  const target = db.get('todos')
  .find({ id })
  .merge({
    id,
    content,
    completed
  })
  .write();
  res.send(db.get('todos').find({ id }).value());
});
/**
 * @method POST
 * @path /removeTodo
 * @description 할일 삭제
 * */
 app.post('/removeTodo', (req, res) => {
  const { id } = req.body;
  db.get('todos')
    .remove({ id })
    .write();

  res.send(db.get('todos').values());
});



app.use(router);
// 3000 port로 서버 구동
app.listen(PORT, () => {
  console.log('JSON Server is listening port - ', PORT);
});