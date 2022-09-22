## 핵심 컨셉

![vuex](https://v3.vuex.vuejs.org/vuex.png)
[자료 출처](https://v3.vuex.vuejs.org/kr/guide/)

## 서론

`vuex`는 아래와 같은 구성을 하고 있습니다.

- `state` : 상태
- `getter` : 상태에 대한 가공 핸들러
- `mutation` : 상태에 대한 동기적 핸들러
- `action` : 상태에 대한 비동기적 핸들러

> 추가적으로 대규모 어플리케이션에서 적절히 store를 분리하여 사용할 수 있도록
> `module`을 지원합니다.

## 설명

### state

- 선언 방식

```js
new Vuex.Store({
  state: {
    // 초기화 및 선언
    count: 0,
  },
  ...
});
```

- 컴포넌트에서 사용시

```js
export default {
  computed: {
    count() {
      return store.state.count;
    },
  },
  ...
};
```

### mutation

동기적으로 상태를 변경하는 핸들러

- 선언

```js
new Vuex.Store({
  mutations: {
    // 동기적 핸들러
    increment(state, payload) {
      state.count++;
    },
  },
  ...
});
```

- 컴포넌트에서 사용시

```js
export default {
  methods: {
    increment() {
      // store.commit을 통해 호출
      store.commit("increment");
    },
  },
  ...
};
```

### action

비동기적으로 상태를 변경하는 핸들러

- 선언

```js
new Vuex.Store({
  actions: {
    // 비동기적 처리
    incrementAsync(context, payload) {
      return new Promise((resolve) => {
        setTimeout(() => {
          context.commit("increment");
          resolve(context.state.count);
        }, 1000);
      });
    },
  },
  ...
});
```

- 컴포넌트에서 사용시

```js
export default {
  methods: {
    incrementAsync() {
      // store.dispatch를 통해 호출
      store.dispatch("incrementAsync").then((count) => {
        // next step
      });
    },
  },
  ...
};
```

### getter

`state`를 필요에 따라 가공하기 위한 `getter`

- 선언 방식

```js
new Vuex.Store({
  getters: {
    zeroPadCount(state) {
      return state.count < 10 ? `0${state.count}` : `${state.count}`;
    },
  },
  ...
});
```

- 컴포넌트에서 사용시

```js
export default {
  computed: {
    zeroPadCount() {
      return store.getters.zeroPadCount;
    },
  },
  ...
};
```

## 실습

`src/modules/01_core/index.js`

```js
import Vuex from "vuex";

export const module = {
  state: {
    // 상태
    count: 0,
  },
  mutations: {
    // 동기적 처리
    increment(state, payload) {
      state.count++;
    },
  },
  actions: {
    // 비동기적 처리
    incrementAsync(context, payload) {
      return new Promise((resolve) => {
        setTimeout(() => {
          context.commit("increment");
          resolve(context.state.count);
        }, 1000);
      });
    },
  },
  getters: {
    // state를 필요에 따라 가공하기 위한 getter
    zeroPadCount(state) {
      return state.count < 10 ? `0${state.count}` : `${state.count}`;
    },
  },
};

export default new Vuex.Store(module);
```

`src/modules/01_core/CoreView.vue`

```vue
<template>
  <div>
    <div>store.state.count : {{ count }}</div>
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
  </div>
</template>

<script>
import store from "./index";
export default {
  computed: {
    // computed를 통해 state / getter에 대한 상태를 추가할 수 있다.
    count() {
      return store.state.count;
    },
    zeroPadCount() {
      return store.getters.zeroPadCount;
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
  },
};
</script>
```

`modules/index.js`

```js
import router from "@/router/index";
import CoreView from "./01_core/CoreView.vue";

// 라우팅 추가
router.addRoute({
  path: "/core",
  name: "core",
  component: CoreView,
});
```

`src/main.js`

```js
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/modules"; // modules/index.js

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
```

`src/App.vue`

```html
<!-- /core router-link 추가 -->
<router-link to="/core">Core</router-link>
```
