## 모듈

### 서론

대규모 어플리케이션에서는 `store`를 적절하게 분리해야 가독성 및 유지보수성을 보장할 수 있습니다.

때문에 `vuex`에서는 `modules`를 통해 지원하고있습니다.

### module

- 선언 방식

```js
new Vuex.Store({
  modules: {
    ["moduleName"]: {
      namespaced: true, // namespaced : true 사용시 action, mutation, getter에 ${moduleName}이 PREFIX로 추가된다.
      state: {},
      mutations: {},
      actions: {},
      getters: {},
      modules: {}, // 중첩 가능한 구조
    },
  },
});
```

## 실습

`src/moduels/02_modules/index.js`

```js
import Vuex from "vuex";
import { module } from "../01_core";

const INIT_STATE = () => ({
  count: 0,
});

export default new Vuex.Store({
  modules: {
    A: {
      namespaced: false,
      ...module,
      state: INIT_STATE(),
    },
    B: {
      namespaced: true,
      ...module,
      state: INIT_STATE(),
    },
  },
});
```

`src/modules/02_module/ModuleView.vue`

```vue
<template>
  <div>
    <div>store.state.A.count : {{ count }}</div>
    <div>store.getters.zeroPadCount : {{ zeroPadCount }}</div>
    <div>
      <button type="button" @click="increment">
        store.commit('increment')
      </button>
      |
      <button type="button" @click="incrementAsync">
        store.dispatch("incrementAsync")
      </button>
    </div>

    <hr />

    <div>store.state.B.count : {{ countB }}</div>
    <div>store.getters['B/zeroPadCount'] : {{ zeroPadCountB }}</div>
    <div>
      <button type="button" @click="incrementB">
        store.commit('incrementB')
      </button>
      |
      <button type="button" @click="incrementAsyncB">
        store.dispatch("incrementAsyncB")
      </button>
    </div>
  </div>
</template>

<script>
import store from "./index";

export default {
  computed: {
    count() {
      return store.state.A.count;
    },
    zeroPadCount() {
      return store.getters.zeroPadCount;
    },
    countB() {
      return store.state.B.count;
    },
    zeroPadCountB() {
      return store.getters["B/zeroPadCount"];
    },
  },
  methods: {
    increment() {
      store.commit("increment");
    },
    incrementAsync() {
      store.dispatch("incrementAsync").then((count) => {
        // next step
      });
    },

    incrementB() {
      store.commit("B/increment");
    },
    incrementAsyncB() {
      store.dispatch("B/incrementAsync").then((count) => {
        // next step
      });
    },
  },
};
</script>
```

`src/module/index.js`

```js
import router from "@/router/index";
import CoreView from "./01_core/CoreView.vue";
import ModuleView from "./02_module/ModuleView.vue";

// 라우팅 추가
router.addRoute({
  path: "/core",
  name: "core",
  component: CoreView,
});

// 라우팅 추가
router.addRoute({
  path: "/module",
  name: "module",
  component: ModuleView,
});
```

`src/App.vue`

```html
<!-- module router-link 추가 -->
<router-link to="/module">Module</router-link>
```
