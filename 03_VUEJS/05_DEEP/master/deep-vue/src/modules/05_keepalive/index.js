import router from "@/router";

router.addRoute({
  path: "/keepalive",
  name: "keepalive",
  component: () =>
    import(/* webpackChunkName: "keepalive" */ "./KeepAliveView.vue"),
});
