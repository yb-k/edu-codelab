# JSON-SERVER 패키지 활용하기

## 서론

`nodejs`는 브라우저 런타임 환경이 아닌, `V8`엔진 런타임 환경에서 동작하기때문에

기존 브라우저 환경에서 벗어나 파일을 관리하거나 서버를 구동할 수 있습니다.

이러한 장점을 활용하여 개발환경을 개선하기위해 이번 챕터를 준비하였습니다.

`json-server` 패키지는 json`파일로 간단한 API 서버를 구현할 수 있습니다.

때문에, API서버가 개발되지 않더라도 최소한의 개발환경을 보장받을 수 있습니다.

개발에 들어가기 앞서 `json-server`는 `express`패키지를 통해 `HTTP`서버를 구성합니다.
때문에 기본적으로 `express`에 대한 어느정도 이해도가 있다면 도움이 될 수 있습니다.

> [express 공식홈페이지](https://expressjs.com/ko/)

특정 패키지를 설치/사용한다면 꼭 관련 **공식문서**를 확인하시길 바랍니다.

> [json-server 깃허브 링크](https://github.com/typicode/json-server)

## 실습

아래의 요구사항은 practice 폴더에서 진행합니다.

1. practice 폴더에서 `npm install` 또는 `yarn install`을 통해 패키지 설치
2. `pacakge.json` 내 `serve:json`에 아래의 스크립트를 추가하여 실행해보기
3. `serve:json`을 실행한 상태에서 `postman`을 통해 `REST API` 호출
4. custom api 추가 작성 및 호출

## 설명

### 의존성 설치

실습에 필요한 패키지를 설치합니다.

설치 패키지는 pacakge.json에서 확인할 수 있습니다.

```bash
cd 02_NODEJS/02_JSONSERVER/parctice
npm i
#or
yarn i
```

### 간단한 실행

`json-server`를 간단하게 실행할 수 있는 스크립트를 작성합니다.

넘기는 `arguments`는 아래의 링크에서 확인할 수 있습니다.

> [json-server 깃허브 링크](https://github.com/typicode/json-server)

- --watch: DB역할의 JSON파일
- --static: 정적 리소스 경로
- --port: 서버를 실행할 포트

1. `pacakge.json` 내 `script` 작성

```json
{
  "scripts": {
    "serve:json": "json-server --watch db.json --static ./public --port 3000"
  }
}
```

2. 실행

```bash
npm run serve:json
#or
yarn run serve:json
```

3. `REST API` 호출
   `PostMan`을 사용하여 API를 호출해봅니다.

> `REST API`란, 기능에 따라 호출하는 `method`를 분류하는 방식으로
>
> 조회(`GET`), 수정(`PUT`), 삭제(`DELETE`), 등록(`POST`) 등이 있습니다.

- GET /todos
- POST /todos
  ```json
  {
    "id": 4,
    "content": "nodejs",
    "completed": false
  }
  ```
- GET /todos 추가된 목록을 확인

추가적으로 수정 또는 삭제 또한 진행해 볼수 있습니다.

### 확장 가능한 구조로 실행해보기 (express)

> 필수 진행 사항은 아니지만, 참고용 진행

`json-server`에서 기본적으로 `RESTFUL`한 API를 제공하긴 하지만, 실제 개발시 서버 규격에 따른 공통처리 또는 비즈니스 로직을 구현하기 위해서는 어느정도 커스텀이 필요할 수 있습니다.

이를 소스코드를 통해 구현해보도록 하겠습니다.

1. 기본 정적리소스로 구동
   server.js

```js
// json server 가져오기
const jsonServer = require("json-server");
// jsonserver에는 express가 포함되어있음.
const express = require("express");
// server 객체 생성 (express app 리턴)
const server = jsonServer.create();

// 정적 리소스 처리
server.use(express.static("public"));

// 3000 port로 서버 구동
server.listen(3000, () => {
  console.log("Server is listening port - ", 3000);
});
```

2. json server 기본 세팅
   server.js

```js
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
// public폴더에 대한 정적 리소스 선언이 포함되어있음
const middlewares = jsonServer.defaults();

// db 역할의 JSON파일과 동기화를 위한 어댑터
const adapter = new FileSync(dbJson);
const db = low(adapter);

// 기본 미들웨어 세팅 (logger, static, cors and no-cache)
server.use(middlewares);

// request 정보의 application/json 파싱을 위한 미들웨어 추가
server.use(jsonServer.bodyParser);

// 기본 RESTFUL 라우터 세팅 (db.json을 기준으로 REST한 API 라우트 필요시)
server.use(router);

// 3000 port로 서버 구동
server.listen(3000, () => {
  console.log("JSON Server is listening port - ", 3000);
});
```

3. 커스텀 API 추가하기

규격상 `POST` 메서드만을 지원하는 경우 아래와 같이 커스텀 API를 작성할 수 있습니다.

server.js

```js
// 중략

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

// custom api 이후에 호출되어야함
server.use(router);

// 3000 port로 서버 구동
server.listen(3000, () => {
  console.log("JSON Server is listening port - ", 3000);
});
```

4. 모피어스 GW 규격 미들웨어 추가 예제

master/server_morpheus_gw.js 참고

> 호출 시 테스트용 바디 데이터

```json
{
  "body": {},
  "head": {
    "screen_id": "0",
    "system_name": "Android",
    "phone_no": "1234567890",
    "app_version": "0",
    "appid": "kr.co.morpheus.mobile1",
    "device_md": "SM-N900S",
    "device_id": "257630051275603",
    "app_name": "Morpheus",
    "callback_request_data_flag": "n",
    "system_version": "19",
    "user_id": "user",
    "user_name": "name"
  }
}
```

## 선택적 실습

- `custom API` 및 `middleware` 추가해보기
- `express project structure` 키워드를 검색 / 참고하여 프로젝트 구조를 개선
- `server_morpheus_gw.js`로 실행한 서버를 `M.net.http.send`로 호출해보기(모피어스)
