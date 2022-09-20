import router from "@/router";

router.addRoute({
  path: "/todos",
  name: "todos",
  component: () => import(/* webpackChunkName: "todo" */ "./TodoView.vue"),
});
