require("./env");
const { PORT, AUTHORIZATION, CORS, CONTEXT_ROOT } = process.env;
const express = require("express");
const jsonServer = require("json-server");
const app = jsonServer.create();
const dbJson = require("./dbJson");
const router = jsonServer.router(dbJson);
const middlewares = jsonServer.defaults({ noCors: CORS });
const fileUpload = require("express-fileupload");
// session 인증에 사용
const expressSession = require("express-session");
app.use(
  expressSession({
    secret: "mysession",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(middlewares);
app.use(jsonServer.bodyParser);
app.use(fileUpload());
const userRouter = {
  session: require("./routers/session"),
  jwt: require("./routers/jwt"),
};
// authentication 방식에 따라 달라짐
app.use("/user", userRouter[AUTHORIZATION]);
// board
const boardRouter = require("./routers/board");
app.use("/board", boardRouter);
// todo
const todoRouter = require("./routers/todo");
app.use("/todo", todoRouter);
// File upload
const fileRouter = require("./routers/file");
app.use("/upload", fileRouter);
// file download
// app.use("/static", express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/uploads"));

app.use(router);
app.listen(PORT, () => {
  console.log("JSON Server is listening port - ", PORT);
});

module.exports = AUTHORIZATION;
