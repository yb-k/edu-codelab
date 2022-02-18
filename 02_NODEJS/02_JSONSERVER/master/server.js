// server.js
const jsonServer = require('json-server');
const commRes = require('./commonResponse.json');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// db.json를 조작하기 위해 lowdb를 사용
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
server.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json;charset=UTF-8');
  next();
});

// Use default router
server.use(router);

// Add custom routes before JSON Server router
// todos를 응답
server.post('/todos', (req, res) => {
  db.get('todos')
  
  const sendData = commRes;
  sendData.body = db.get('todos').values(); 
  res.send(sendData);
});

server.listen(3000, () => {
  console.log('JSON Server is running')
});