# MapHelper

## 서론

`MapHelper`의 구성은 아래와 같다.

- `mapState`
- `mapGetters`
- `mapMutations`
- `mapActions`

각각 `vuex` 의 `state`, `getters`, `mutations`, `actions` 를 연결에 대한 도우미 함수입니다.

## 실습

`src/modules/03_map_helper/index.js`

```js
import store from "@/store";
import { module } from "../01_core";

store.registerModule("A", {
  namespaced: false,
  ...module,
});

export { default as MapHelperView } from "./MapHelperView.vue";
```

`src/modules/03_map_helper/MapHelperView.vue`

```vue
<template>
  <div>
    <div>count : {{ count }}</div>
    <div>zeroPadCount : {{ zeroPadCount }}</div>
    <div>
      <button type="button" @click="increment">increment</button>
      |
      <button type="button" @click="incrementAsync">incrementAsync</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      count: (state) => state.A.count,
    }),
    ...mapGetters(["zeroPadCount"]),
  },
  methods: {
    ...mapMutations({
      increment: "increment",
    }),
    ...mapActions(["incrementAsync"]),
  },
};
</script>
```

`src/modules/index.js`

```js
// .. 중략
import { MapHelperView } from "./03_map_helper";

// 라우팅 추가
router.addRoute({
  path: "/maphelper",
  name: "maphelper",
  component: MapHelperView,
});
```

`src/App.vue`

```html
<!-- 추가 -->
<router-link to="/maphelper">MapHelper</router-link>
```
