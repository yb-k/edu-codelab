### Router Config 작성

`vue-cli`를 통해 router를 사용 체크시 자동으로 생성되지만, 원래는 아래와 같은 작업을 통해 라우터를 설정할 수 있습니다.

소스코드를 참고하여 아래 경로의 파일을 수정합니다.

`src/router/index.js`

```js
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [];

const router = new VueRouter({
  mode: "history", // or "hash"
  base: process.env.BASE_URL,
  routes,
});

export default router;
```

`src/main.js`

```js
import Vue from "vue";
import App from "./App.vue";
import router from "./router"; //  1. router 모듈을 불러와
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router, // 2. 적용
  store,
  render: (h) => h(App),
}).$mount("#app");
```

`src/App.vue`

```vue
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data: function () {
    return {};
  },
};
</script>
```
