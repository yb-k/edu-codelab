# computed 활용

## 서론

`computed`는 다양하게 사용이 가능합니다.

또한 컴포넌트 내의 `state` 가 일정한 조건에 해당되었을때에 대한 동적인 값을 편리하게 관리할 수 있으며

기본적으로 `vuex`의 `getter` 와 `state` 또한, `computed`로 활용할 수 있습니다.

간단한 예로 전체 체크를 처리할 수 있는 예제를 구현해봅니다.

`src/modules/03_computed/TodoView.vue`

```vue
<template>
  <div>
    <div>
      <span>전체 선택</span>
      <input type="checkbox" v-model="allSelected" />
    </div>
    <ul>
      <li v-for="(item, index) in todos" :key="item">
        <input type="checkbox" :value="item" v-model="selectedList" />
        <span>{{ index }} - {{ item }}</span>
      </li>
    </ul>
    <div>
      <span>선택한 TODO : {{ selectedList.join(",") }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: ["HTML5", "CSS3", "JAVASCRIPT", "ES6", "VUE", "NODEJS"],
      selectedList: [],
    };
  },
  computed: {
    allSelected: {
      //getter
      get: function () {
        return this.todos.length === this.selectedList.length;
      },
      //setter
      set: function (chekced) {
        this.selectedList = chekced ? [...this.todos] : [];
      },
    },
  },
};
</script>
```

`src/modules/03_computed/index.js`

```js
import router from "@/router";

router.addRoute({
  path: "/todos",
  name: "todos",
  component: () => import(/* webpackChunkName: "todo" */ "./TodoView.vue"),
});
```

`src/modules/index.js`

```js
import "./01_directive";
import "./03_computed";

export { default as eventBus } from "./02_eventbus";
```

`src/App.vue`

```html
<!-- 추가 -->
<router-link to="/todos">Todos</router-link> |
```
