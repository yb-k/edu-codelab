require("./env");
const { PORT, AUTHORIZATION, CORS } = process.env;

const jsonServer = require("json-server");
const app = jsonServer.create();
const dbJson = require("./defualt");
const router = jsonServer.router(dbJson.dbJson);
const middlewares = jsonServer.defaults({ noCors: CORS });
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

const userRouter = {
  session: require("./api/session"),
  jwt: require("./api/jwt"),
};
// authentication 방식에 따라 달라짐
app.use("/user", userRouter[AUTHORIZATION]);
// board
const boardRouter = require("./api/board");
app.use("/board", boardRouter);
// todo
const todoRouter = require("./api/todo");
app.use("/todo", todoRouter);

app.use(router);
app.listen(PORT, () => {
  console.log("JSON Server is listening port - ", PORT);
});
