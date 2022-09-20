import router from "@/router";

router.addRoute({
  path: "/vmodel",
  name: "vmodel",
  component: () => import(/* webpackChunkName: "vmodel" */ "./VModelView.vue"),
});
