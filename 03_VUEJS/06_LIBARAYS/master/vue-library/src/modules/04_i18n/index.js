import router from "@/router";

router.addRoute({
  path: "/locale",
  name: "locale",
  component: () => import(/* webpackChunkName: "locale" */ "./LocaleView.vue"),
});
