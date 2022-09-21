# 디렉티브 활용

## 로깅용 디렉티브 작성

이벤트별 어떠한 값이 전달되는지 확인해보기 위한 테스트용 디렉티브입니다.

`src/modules/01_directive/DirectiveView.vue`

```vue
<template>
  <div>
    <div>
      <h1 v-if="toggleLogger" v-logging="toggleLogger ? 'TRUE' : 'FALSE'">
        {{ logger }}
      </h1>
      <input type="text" v-model="logger" />
      <button type="button" @click="toggleLogger = !toggleLogger">
        TOGGLE_LOGGER
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggleLogger: true,
      logger: "LOGGING",
    };
  },
};
</script>
```

`src/modules/01_directive/index.js`

```js
import Vue from "vue";
import router from "../router/index";

router.addRoute({
  path: "/directives",
  name: "directives",
  // which is lazy-loaded when the route is visited.
  component: () =>
    import(/* webpackChunkName: "directive" */ "./DirectiveView.vue"),
});

Vue.directive("logging", {
  bind(...args) {
    console.log("BIND :: \n", ...args);
  },
  inserted(...args) {
    console.log("INSERTED :: \n", ...args);
  },
  update(...args) {
    console.log("UPDATE :: \n", ...args);
  },
  componentUpdated(...args) {
    console.log("COMPONENT_UPDATE :: \n", ...args);
  },
  unbind(...args) {
    console.log("UNBIND :: \n", ...args);
  },
});
```

`src/modules/index.js`

```js
import "./01_directive";
```

`src/main.js`

```js
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./modules"; // #01. modules import

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
```

`src/App.vue`

```vue
<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <!-- <router-link> 추가  -->
      <router-link to="/directives">Directives</router-link> |
    </nav>
    <router-view />
  </div>
</template>
```

## 대문자 변환 디렉티브 작성

엘리먼드의 `textContent`를 변환할 수 있는 디렉티브를 작성해 봅니다.

`src/modules/01_directive.js`

```js
function onUpperCaseContent(el, binding, vnode) {
  el.textContent = binding.value.toUpperCase();
}
/**
 * v-upper
 * @description 컴포넌트 내 data를 upperCase한다.
 * @example
 * <h1 v-upper="upper"></h1>
 */
Vue.directive("upper", {
  bind: onUpperCaseContent,
  update: onUpperCaseContent,
});
```

`src/modules/01_directive/DirectiveView.vue`

```vue
<template>
  <div>
    <div>
      <h1 v-if="toggleLogger" v-logging="toggleLogger ? 'TRUE' : 'FALSE'">
        {{ logger }}
      </h1>
      <input type="text" v-model="logger" />
      <button type="button" @click="toggleLogger = !toggleLogger">
        TOGGLE_LOGGER
      </button>
    </div>
    <!-- #1 -->
    <div>
      <h1 v-upper="upper"></h1>
      <input type="text" v-model="upper" />
    </div>
    <!-- #1 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggleLogger: true,
      logger: "LOGGING",
      upper: "uppercase", // #2
    };
  },
};
</script>

<style></style>
```

## 뒤로가기 디렉티브 작성

뒤로가기 기능을 할 수 있는 디렉티브를 작성해 봅니다.

### 실습

`src/modules/01_directive/index.js`

```js
/**
 * v-back
 * @description 뒤로가기 디렉티브
 * @example
 * <button type="button" v-back>뒤로가기</button>
 */
Vue.directive("back", {
  bind(el, binding, vnode) {
    el.addEventListener("click", function () {
      router.back();
    });
  },
});
```

`src/App.vue`

```vue
<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |

      <router-link to="/directives">Directives</router-link> |
      <button type="button" v-back>Back</button>
      <!-- button 추가  -->
    </nav>
    <router-view />
  </div>
</template>
```
