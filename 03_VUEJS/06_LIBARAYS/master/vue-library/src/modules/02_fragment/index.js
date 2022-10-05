import Vue from "vue";
import VueFragment from "vue-fragment";
import router from "@/router";

Vue.use(VueFragment.Plugin);

router.addRoute({
  path: "/fragment",
  name: "fragment",
  component: () =>
    import(/* webpackChunkName: "fragment" */ "./FragmentView.vue"),
});
