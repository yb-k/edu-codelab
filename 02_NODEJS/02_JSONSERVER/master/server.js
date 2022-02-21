// server.js
const jsonServer = require('json-server');
// db.json를 조작하기 위해 lowdb를 사용
const low = require('lowdb');
// path
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');

const dbJson = path.resolve(__dirname, 'db.json');
// express app 생성
const server = jsonServer.create();

// RESTFUL API 서버 구성을 위한 router 생성
// const router = jsonServer.router(dbJson);

// json-server에서 제공되는 기본 미들웨어 생성
const middlewares = jsonServer.defaults();

// db 역할의 JSON파일과 동기화를 위한 어댑터
const adapter = new FileSync(dbJson);
const db = low(adapter);

// 기본 미들웨어 세팅 (logger, static, cors and no-cache)
server.use(middlewares);

// request 정보의 application/json 파싱을 위한 미들웨어 추가
server.use(jsonServer.bodyParser);

// Morpheus GW 규격에 맞추어 처리되기 위한 커스텀 미들웨어 작성
server.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json;charset=UTF-8');
  const beforeSend = res.send;
  const reqBody = req.body;
  // set response interceptor
  res.send = function interceptor(body) {
    // 주의! res.send를 다시 override하여야 한다.
    console.log('BODY DATA ::');
    console.log(body);
    res.send = beforeSend;
    try {
      const sendData = reqBody;
      console.log('REQUEST DATA :: ');
      console.log(reqBody);
      sendData.head.result_code = '200';
      sendData.head.result_msg = 'Success';
      sendData.body = body;
      console.log('RESPONSE DATA :: ');
      console.log(sendData)

      res.json(sendData);
    } catch (e) {
      res.send(body)
    }
    
  }
  next();
});

// 기본 RESTFUL 라우터 세팅 (db.json을 기준으로 REST한 API 라우트 필요시)
// server.use(router);

/**
 * @method POST
 * @path /getTodoList
 * @description 할일 목록 응답
 * */
server.post('/getTodoList', (req, res) => {
  const sendData = db.get('todos').value();
  res.send(sendData);
});

/**
 * @method POST
 * @path /addTodoList
 * @description 할일 목록 추가
 * */
 server.post('/addTodoList', (req, res) => {
  const data = req.body;
  db.get('todos')
    .push(data)
    .write();

  res.send(data);
});



// 3000 port로 서버 구동
server.listen(3000, () => {
  console.log('JSON Server is listening port - ', 3000);
});