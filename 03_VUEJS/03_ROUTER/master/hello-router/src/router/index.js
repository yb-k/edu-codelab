import Vue from "vue";
import VueRouter from "vue-router";
import ContainerView from "@/views/ContainerView";

Vue.use(VueRouter);

const INIT_PARAM_VIEW = () => ({
  template: `<div>
  <h3>query</h3>
  <pre>{{querysStr}}</pre>
  <h3>params</h3>
  <pre>{{paramsStr}}</pre></div>`,
  computed: {
    paramsStr() {
      return JSON.stringify(this.$route.params, "\t", 4);
    },
    querysStr() {
      return JSON.stringify(this.$route.query, "\t", 4);
    },
  },
});

const routes = [
  { path: "*", redirect: "/" },
  {
    path: "/",
    component: ContainerView,
    children: [
      {
        path: "",
        components: {
          default: { template: "<h1>First</h1>" },
          a: { template: "<h1>A</h1>" },
        },
        alias: "/first",
      },
      {
        path: "/second",
        name: "second",
        component: { template: "<h1>Second</h1>" },
      },
      {
        path: "/third",
        component: { template: "<h1>Third</h1>" },
      },
      {
        path: "/query",
        component: INIT_PARAM_VIEW(),
      },
      {
        name: "props", // 객체 전달시 꼭 선언
        path: "/props",
        props: true, // 객체 전달시에 꼭 선언
        component: INIT_PARAM_VIEW(),
      },
      {
        path: "/match/:key",
        component: INIT_PARAM_VIEW(),
      },
      {
        path: "/matchNum/:onlyNum(\\d+)",
        component: INIT_PARAM_VIEW(),
      },
      {
        path: "/echo",
        component: {
          template: "<h2>{{$route.query.value}}</h2>",
          beforeRouteEnter(to, from, next) {
            if (!to.query.value) {
              window.alert("value은 필수 입니다.");
              return next("/");
            }
            next();
          },
          beforeRouteUpdate(to, from, next) {
            if (!to.query.value) {
              window.alert("value은 필수 입니다.");
              return next("/");
            }
            next();
          },
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history", // or "hash"
  base: process.env.BASE_URL,
  routes,
});

const isAnonymous = ["/", "/first", "/third", "/match", "/echo"];
router.beforeEach((to, from, next) => {
  if (!isAnonymous.includes(to.path)) {
    alert("제한된 접근");
    return next("/first");
  }
  next();
});

export default router;
