## 전역 이벤트 버스

### 서론

기본적으로 이벤트는 부모-자식 내로 공유 / 전달이 가능합니다.

때문에 최하위 컴포넌트가 높은 상위 레벨의 컴포넌트의 이벤트를 사용하기 위해서는 불필요한 이벤트 전달이 발생됩니다.

아래의 예시를 살펴봅니다.

```vue
<template>
  <Root>
    <level-1>
      <!-- 단순 이벤트 전파-->
      <level-2 @onLevel1="$emit('onLevel1')">
        <level-3 @onLevel1="$emit('onLevel1')">
          <level-4 @onLevel1="$emit('onLevel1')">
            <!-- 단순 이벤트 전파-->
            <level-5 @onLevel1="$emit('onLevel1')">
              <button @click="$emit('onLevel1')">CALL_LEVEL_1</button>
            </level-5>
          </level-4>
        </level-3>
      </level-2>
    </level-1>
  </Root>
</template>
```

이러한 문제점을 해결하기 위해 eventbus를 사용하여 전역적으로 이벤트를 공유 할 수 있습니다.

```vue
<template>
  <Root>
    <level-1>
      <level-2>
        <level-3>
          <level-4>
            <level-5>
              <button @click="$eventBus.$emit('onLevel1')">CALL_LEVEL_1</button>
            </level-5>
          </level-4>
        </level-3>
      </level-2>
    </level-1>
  </Root>
</template>
```

### 실습

`src/modules/02_eventbus/index.js`

```js
import Vue from "vue";

export default new Vue(); //비어있는 vue instance 내보내기
```

`src/modules/index.js`

```js
import "./01_directive";

export { default as eventBus } from "./02_eventbus";
```

`src/App.vue`

```vue
<template>
  <div id="app">
    <!-- #1 -->
    <h1>{{ title }}</h1>
    <!-- #1 -->
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/directives">Directives</router-link> |
      <button type="button" v-back>Back</button>
    </nav>
    <router-view />
  </div>
</template>

<script>
// #2
import { eventBus } from "@/modules";
export default {
  data() {
    return {
      title: "",
    };
  },
  created() {
    const self = this;
    // eventbus 활용
    eventBus.$on("setTitle", function (title) {
      self.title = title;
    });
  },
};
</script>
```

`src/views/HomeView.vue`

```vue
<script>
import { eventBus } from "@/modules";
export default {
  /**
   * event bus
   */
  mounted() {
    eventBus.$emit("setTitle", "Home");
  },
};
</script>
```

`src/views/AboutView.vue`

```vue
<script>
import { eventBus } from "@/modules";
export default {
  /**
   * event bus
   */
  mounted() {
    eventBus.$emit("setTitle", "About");
  },
};
</script>
```
